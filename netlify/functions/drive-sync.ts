import type { Context } from '@netlify/functions'
import { getStore } from '@netlify/blobs'
import {
  loadServiceAccount,
  getAccessToken,
  listDriveFolder,
  type DriveFile,
} from './_shared/google'

/*
 * Google Drive -> Resource Library Sync
 * -------------------------------------
 * Reads every file inside the clinic-owned Drive folder (shared with the
 * service account) and turns each file into a `Resource` record stored in
 * the "resources" Netlify Blobs store.
 *
 * Environment variables required:
 *   GOOGLE_SERVICE_ACCOUNT_JSON  — service account JSON key
 *   GOOGLE_DRIVE_RESOURCES_FOLDER_ID — the Drive folder id to sync
 *     (falls back to GOOGLE_DRIVE_FOLDER_ID if the resources-specific one
 *      is not set, which lets the clinic use one folder for reports + resources
 *      or split them as they prefer.)
 *
 * Files are classified by filename using a small rules table. The admin
 * can override any classification later from /admin/resources.
 *
 * Blob layout:
 *   resources/index.json           — array of Resource records (canonical list)
 *   resources/approved/<id>.json    — per-resource override (approved / tags / etc.)
 *   resources/pending/<id>.json     — Drive items waiting for admin approval
 *
 * This endpoint is safe to trigger on demand (admin "Sync Now" button).
 * For a hands-off schedule, add to netlify.toml under [[scheduled.functions]].
 *
 * POST /api/drive-sync
 *   body: (none)
 *   response: { ok, added, updated, total }
 */

type Resource = {
  id: string
  title: string
  type:
    | 'video'
    | 'article'
    | 'handout'
    | 'guide'
    | 'checklist'
    | 'worksheet'
    | 'tracker'
    | 'grocery-list'
    | 'recipe'
    | 'caregiver-tool'
    | 'brain-game'
    | 'printable'
  category: string
  summary: string
  whyItMatters: string
  estMinutes: number
  beginnerFriendly: boolean
  caregiverFriendly: boolean
  printable: boolean
  weeks: number[]
  phases: number[]
  tags: string[]
  href?: string
  source: 'drive'
  driveFileId?: string
  approved?: boolean
  synced?: string
  modifiedTime?: string
  mimeType?: string
}

// ---------------------------------------------------------------------------
// Classifier — maps a Drive filename to a Resource's type/category/tags.
// The clinic admin can override any of these later without re-syncing.
// ---------------------------------------------------------------------------

const TYPE_RULES: { match: RegExp; type: Resource['type'] }[] = [
  { match: /\b(checklist|check.?list)\b/i, type: 'checklist' },
  { match: /\b(worksheet|work.?sheet|journal prompt)\b/i, type: 'worksheet' },
  { match: /\b(tracker|log|hydration)\b/i, type: 'tracker' },
  { match: /\b(grocery|shopping list)\b/i, type: 'grocery-list' },
  { match: /\brecipe\b|brain.?healthy|dinner|breakfast|snack/i, type: 'recipe' },
  { match: /\b(caregiver|care.?partner|support sheet)\b/i, type: 'caregiver-tool' },
  { match: /\b(brain game|memory|puzzle)\b/i, type: 'brain-game' },
  { match: /\b(video|youtube|webinar|talk)\b/i, type: 'video' },
  { match: /\b(article|read|summary|overview)\b/i, type: 'article' },
  { match: /\b(guide|handbook|manual|welcome)\b/i, type: 'guide' },
  { match: /\bpantry\b|\baudit\b/i, type: 'handout' },
]

const CATEGORY_RULES: { match: RegExp; category: string }[] = [
  { match: /\b(welcome|start here|orientation|phase.?1)\b/i, category: 'start-here' },
  { match: /\bbredesen|recode|cognoscopy\b/i, category: 'bredesen-basics' },
  { match: /\bsleep|bedtime|circadian|evening\b/i, category: 'sleep' },
  { match: /\bblood.?sugar|glucose|insulin|a1c\b/i, category: 'blood-sugar' },
  { match: /\bdetox|toxin|mold|fragrance|cleaner|filter\b/i, category: 'detox' },
  { match: /\bmovement|walking|exercise|strength|balance\b/i, category: 'movement' },
  { match: /\bstress|breath|meditat|calm\b/i, category: 'stress' },
  { match: /\bcogniti|memory|brain game|neuro\b/i, category: 'cognition' },
  { match: /\brecipe|meal|dinner|breakfast|snack|dessert\b/i, category: 'recipes' },
  { match: /\bgrocery|shopping|pantry\b/i, category: 'grocery' },
  { match: /\bcaregiver|care.?partner|spouse|family\b/i, category: 'caregiver' },
  { match: /\bpantry\b/i, category: 'pantry' },
  { match: /\bsupplement|vitamin|mineral\b/i, category: 'supplements' },
  { match: /\bjournal|reflection|prompt\b/i, category: 'journaling' },
  { match: /\bnutrition|food|diet\b/i, category: 'nutrition' },
  { match: /\bbrain health\b/i, category: 'brain-health' },
]

const WEEK_TAG_RULES: { match: RegExp; weeks: number[]; phases: number[] }[] = [
  { match: /\bweek.?1\b|\bphase.?1\b|welcome|orientation|pantry.?audit/i, weeks: [1, 2], phases: [1] },
  { match: /\bweek.?2\b/i, weeks: [2], phases: [1] },
  { match: /\bweek.?3\b/i, weeks: [3], phases: [1] },
  { match: /\bweek.?4\b/i, weeks: [4], phases: [1] },
  { match: /\bphase.?2\b|sleep.?reset|blood.?sugar/i, weeks: [5, 6, 7, 8], phases: [2] },
  { match: /\bphase.?3\b|detox|inflammation/i, weeks: [9, 10, 11, 12], phases: [3] },
  { match: /\bphase.?4\b|movement|brain.?training/i, weeks: [13, 14, 15, 16], phases: [4] },
  { match: /\bphase.?5\b/i, weeks: [17, 18, 19, 20], phases: [5] },
  { match: /\bphase.?6\b|maintenance/i, weeks: [21, 22, 23, 24], phases: [6] },
]

function classify(file: DriveFile): Omit<Resource, 'id' | 'source'> {
  const name = file.name
  const lower = name.toLowerCase()

  let type: Resource['type'] = 'handout'
  for (const r of TYPE_RULES) {
    if (r.match.test(name)) {
      type = r.type
      break
    }
  }
  if (file.mimeType?.startsWith('video/')) type = 'video'
  if (file.mimeType === 'application/vnd.google-apps.spreadsheet')
    type = 'tracker'
  if (file.mimeType === 'application/vnd.google-apps.presentation')
    type = 'guide'

  let category = 'brain-health'
  for (const r of CATEGORY_RULES) {
    if (r.match.test(name)) {
      category = r.category
      break
    }
  }

  let weeks: number[] = []
  let phases: number[] = []
  for (const r of WEEK_TAG_RULES) {
    if (r.match.test(name)) {
      weeks = r.weeks
      phases = r.phases
      break
    }
  }
  // Fallback: if we matched a category but no week, use Phase 1 so
  // content at least surfaces somewhere until admin refines it.
  if (weeks.length === 0) {
    weeks = [1, 2, 3, 4]
    phases = [1]
  }

  const tags: string[] = []
  if (/print/.test(lower)) tags.push('printable')
  if (/beginner/.test(lower)) tags.push('beginner')
  if (/caregiver/.test(lower)) tags.push('caregiver')
  if (/quick|5.?min/.test(lower)) tags.push('quick')
  if (/audio|podcast/.test(lower)) tags.push('audio')
  tags.push('drive')

  // Best-effort time estimate from filename.
  let estMinutes = 5
  const mm = name.match(/(\d+)\s*(min|minute)/i)
  if (mm) estMinutes = Math.max(1, parseInt(mm[1], 10))
  else if (type === 'video') estMinutes = 8
  else if (type === 'article') estMinutes = 5
  else if (type === 'handout' || type === 'guide') estMinutes = 10

  const cleanTitle = name
    .replace(/\.(pdf|docx?|pptx?|xlsx?|mp4|mov|png|jpg|jpeg)$/i, '')
    .replace(/[-_]+/g, ' ')
    .trim()

  const printable =
    type === 'handout' ||
    type === 'guide' ||
    type === 'checklist' ||
    type === 'worksheet' ||
    type === 'tracker' ||
    type === 'grocery-list' ||
    type === 'printable' ||
    file.mimeType === 'application/pdf'

  return {
    title: cleanTitle || name,
    type,
    category,
    summary: `Clinic-provided ${type.replace('-', ' ')}.`,
    whyItMatters: 'Shared by the clinic to support this week.',
    estMinutes,
    beginnerFriendly: true,
    caregiverFriendly: /caregiver/i.test(name),
    printable,
    weeks,
    phases,
    tags,
    href: file.webViewLink,
    driveFileId: file.id,
    approved: false,
    synced: new Date().toISOString(),
    modifiedTime: file.modifiedTime,
    mimeType: file.mimeType,
  }
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 })
  }

  const key = loadServiceAccount()
  if (!key) {
    return json(503, {
      ok: false,
      reason: 'Google service account not configured. Set GOOGLE_SERVICE_ACCOUNT_JSON in Netlify env.',
    })
  }

  const folderId =
    process.env.GOOGLE_DRIVE_RESOURCES_FOLDER_ID ||
    process.env.GOOGLE_DRIVE_FOLDER_ID
  if (!folderId) {
    return json(503, {
      ok: false,
      reason: 'Drive folder not configured. Set GOOGLE_DRIVE_RESOURCES_FOLDER_ID in Netlify env.',
    })
  }

  const accessToken = await getAccessToken(key, [
    'https://www.googleapis.com/auth/drive.readonly',
  ])

  const files = await listDriveFolder({
    accessToken,
    folderId,
    recursive: true,
    pageSize: 200,
  })

  const store = getStore('resources')
  const prior = ((await store.get('index.json', { type: 'json' })) as
    | Resource[]
    | null) ?? []
  const priorById = new Map(prior.map((r) => [r.id, r]))

  let added = 0
  let updated = 0
  const nextIndex: Resource[] = []

  for (const file of files) {
    const id = `drive-${slugify(file.name)}-${file.id.slice(0, 6)}`
    const prev = priorById.get(id)
    const classified = classify(file)
    const merged: Resource = {
      id,
      source: 'drive',
      ...classified,
      // Preserve any admin overrides that were saved previously.
      approved: prev?.approved ?? false,
      title: prev?.title ?? classified.title,
      category: prev?.category ?? classified.category,
      weeks: prev?.weeks?.length ? prev.weeks : classified.weeks,
      phases: prev?.phases?.length ? prev.phases : classified.phases,
      tags: prev?.tags?.length ? prev.tags : classified.tags,
      whyItMatters: prev?.whyItMatters ?? classified.whyItMatters,
      summary: prev?.summary ?? classified.summary,
    }
    if (!prev) added += 1
    else updated += 1
    nextIndex.push(merged)
  }

  // Keep curated records if any sneak into the index in future; this pass
  // only manages drive records.
  await store.setJSON('index.json', nextIndex)

  return json(200, {
    ok: true,
    total: nextIndex.length,
    added,
    updated,
    folderId,
  })
}

function json(status: number, payload: any): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

export const config = {
  path: '/api/drive-sync',
}
