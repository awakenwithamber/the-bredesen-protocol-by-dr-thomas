import type { Context } from '@netlify/functions'
import { getStore } from '@netlify/blobs'

/*
 * Silent completion logger
 * -------------------------
 * POST /api/log-completion
 * Body: { patientId, patientName, day, task, completedAtIso }
 *
 * Writes a per-patient, per-week event list into the "completions" blob
 * store. This is deliberately silent — no email, no push, no staff
 * notification. Events are aggregated once per week by
 * `weekly-report.ts` into a single consolidated progress report.
 *
 * Store layout:
 *   completions/{patientId}/{weekStartIso}.json
 *   => {
 *        patientId, patientName, weekStartIso,
 *        events: [ { day, task, completedAtIso } ... ],
 *        lastUpdated
 *      }
 *
 * Keys also shard on week so reports only need to read one file per
 * patient per run.
 */

type Event = {
  day: number
  task: string
  completedAtIso: string
}

type WeekLog = {
  patientId: string
  patientName: string
  weekStartIso: string
  events: Event[]
  lastUpdated: string
}

function isoToday(): string {
  return new Date().toISOString().slice(0, 10)
}

function startOfWeekIso(dateIso: string): string {
  const base = new Date(dateIso + 'T00:00:00')
  const dayNum = base.getDay() // 0 Sun .. 6 Sat
  const diff = (dayNum + 6) % 7 // ISO Monday-start
  base.setDate(base.getDate() - diff)
  return base.toISOString().slice(0, 10)
}

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const { patientId, patientName, day, task, completedAtIso } = body ?? {}
  if (!patientId || typeof day !== 'number' || !task) {
    return new Response('Missing required fields', { status: 400 })
  }

  const when = (completedAtIso as string) || isoToday()
  const weekStartIso = startOfWeekIso(when)

  const store = getStore('completions')
  const key = `${patientId}/${weekStartIso}.json`

  const prior: WeekLog = ((await store.get(key, {
    type: 'json',
  })) as WeekLog | null) ?? {
    patientId,
    patientName: patientName ?? 'Patient',
    weekStartIso,
    events: [],
    lastUpdated: new Date().toISOString(),
  }

  // De-dupe: same day+task shouldn't double-count.
  const exists = prior.events.some(
    (e) => e.day === day && e.task === task,
  )
  if (!exists) {
    prior.events.push({ day, task, completedAtIso: when })
  }
  prior.patientName = patientName ?? prior.patientName
  prior.lastUpdated = new Date().toISOString()

  await store.setJSON(key, prior)

  return new Response(
    JSON.stringify({ ok: true, weekStartIso, total: prior.events.length }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  )
}

export const config = {
  path: '/api/log-completion',
}
