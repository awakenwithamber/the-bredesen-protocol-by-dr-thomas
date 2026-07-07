import type { Context } from '@netlify/functions'
import {
  getPatient,
  position,
  savePatient,
  type PatientProgress,
  type PatientRecord,
} from './_shared/patients'
import { CLINIC_EMAIL, sendEmail, siteOrigin } from './_shared/email'

/*
 * Patient progress sync
 * ---------------------
 * GET  /api/patient-progress?email=...      → returns saved progress
 * POST /api/patient-progress                → upserts the patient's progress
 *   Body: { email, progress: { ... }, partial? }
 *
 * The client mirrors localStorage to this endpoint after meaningful state
 * changes (day complete, journal entry, video watched, etc.). The endpoint
 * also fires milestone notifications to the clinic when a patient crosses
 * a week boundary, enters their final month, or finishes the program.
 */

type Body = {
  email?: string
  progress?: Partial<PatientProgress>
  patientName?: string
  firstName?: string
  lastName?: string
}

export default async (req: Request, _context: Context) => {
  if (req.method === 'GET') {
    const url = new URL(req.url)
    const email = url.searchParams.get('email') ?? ''
    if (!email) return json({ error: 'email is required' }, 400)
    const record = await getPatient(email)
    if (!record) return json({ found: false }, 404)
    return json({
      found: true,
      patient: publicShape(record),
    })
  }

  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  if (!body.email) return json({ error: 'email is required' }, 400)
  const record = await getPatient(body.email)
  if (!record) return json({ error: 'patient not found' }, 404)

  const before = position(record)

  // Merge fields. Lists are replaced when supplied (client is the
  // authoritative copy of its own progress), but missing fields are kept.
  const incoming = body.progress ?? {}
  record.progress = {
    completedDays: Array.isArray(incoming.completedDays)
      ? Array.from(new Set(incoming.completedDays.filter((n) => typeof n === 'number'))).sort(
          (a, b) => a - b,
        )
      : record.progress.completedDays,
    lastCompletedAt: incoming.lastCompletedAt ?? record.progress.lastCompletedAt,
    streak: typeof incoming.streak === 'number' ? incoming.streak : record.progress.streak,
    isPaused: typeof incoming.isPaused === 'boolean' ? incoming.isPaused : record.progress.isPaused,
    partial: incoming.partial ?? record.progress.partial,
    journalEntries: Array.isArray(incoming.journalEntries)
      ? incoming.journalEntries
      : record.progress.journalEntries,
    foodLogs: Array.isArray(incoming.foodLogs) ? incoming.foodLogs : record.progress.foodLogs,
    recipesViewed: Array.isArray(incoming.recipesViewed)
      ? incoming.recipesViewed
      : record.progress.recipesViewed,
    brainGamesCompleted: Array.isArray(incoming.brainGamesCompleted)
      ? incoming.brainGamesCompleted
      : record.progress.brainGamesCompleted,
    videosWatched: Array.isArray(incoming.videosWatched)
      ? incoming.videosWatched
      : record.progress.videosWatched,
    handoutsOpened: Array.isArray(incoming.handoutsOpened)
      ? incoming.handoutsOpened
      : record.progress.handoutsOpened,
  }

  if (body.firstName) record.firstName = body.firstName
  if (body.lastName) record.lastName = body.lastName
  if (body.firstName || body.lastName) {
    record.name = `${record.firstName} ${record.lastName}`.trim() || record.email
  }

  record.lastActiveIso = new Date().toISOString()

  const after = position(record)

  // Milestones — clinic notifications.
  await maybeNotifyMilestones(req, record, before, after)

  if (after.daysCompleted >= after.totalDays) record.status = 'completed'
  else if (record.progress.isPaused) record.status = 'paused'
  else record.status = 'active'

  await savePatient(record)

  return json({ ok: true, patient: publicShape(record) })
}

function publicShape(record: PatientRecord) {
  return {
    id: record.id,
    email: record.email,
    firstName: record.firstName,
    lastName: record.lastName,
    name: record.name,
    phone: record.phone ?? '',
    startDate: record.startDate,
    endDate: record.endDate,
    resumeToken: record.resumeToken,
    preferences: record.preferences,
    progress: record.progress,
    position: position(record),
    lastActiveIso: record.lastActiveIso,
    status: record.status,
  }
}

async function maybeNotifyMilestones(
  req: Request,
  record: PatientRecord,
  before: ReturnType<typeof position>,
  after: ReturnType<typeof position>,
) {
  const origin = siteOrigin(req)
  const resumeUrl = `${origin}/r?t=${record.resumeToken}`

  const newWeekFinished = (() => {
    if (after.daysCompleted === 0) return null
    const beforeWeeksDone = Math.floor(before.daysCompleted / 7)
    const afterWeeksDone = Math.floor(after.daysCompleted / 7)
    if (afterWeeksDone > beforeWeeksDone) return afterWeeksDone
    return null
  })()

  if (newWeekFinished && !record.milestones.weeksCompletedNotified.includes(newWeekFinished)) {
    record.milestones.weeksCompletedNotified.push(newWeekFinished)
    sendEmail({
      to: CLINIC_EMAIL,
      subject: `Bredesen Workbook: ${record.name} completed Week ${newWeekFinished}`,
      text: [
        `${record.name} just finished Week ${newWeekFinished} of the Bredesen workbook.`,
        '',
        `Patient: ${record.name}`,
        `Email: ${record.email}`,
        `Phone: ${record.phone ?? '—'}`,
        `Phase ${after.currentPhase} • Week ${after.currentWeek} • Day ${after.currentDay}`,
        `Resume link: ${resumeUrl}`,
      ].join('\n'),
    }).catch(() => {})
  }

  // Final month — once.
  const remainingAfter = after.totalDays - after.daysCompleted
  if (
    remainingAfter <= 30 &&
    remainingAfter > 0 &&
    !record.milestones.finalMonthNotifiedAt
  ) {
    record.milestones.finalMonthNotifiedAt = new Date().toISOString()
    sendEmail({
      to: CLINIC_EMAIL,
      subject: `Bredesen Workbook: ${record.name} reached the final month`,
      text: [
        `${record.name} is now in the final month of their Bredesen workbook.`,
        '',
        `Patient: ${record.name}`,
        `Email: ${record.email}`,
        `Days remaining: ${remainingAfter}`,
        `Phase ${after.currentPhase} • Week ${after.currentWeek} • Day ${after.currentDay}`,
        `Resume link: ${resumeUrl}`,
      ].join('\n'),
    }).catch(() => {})
  }

  // Completion — once.
  if (
    after.daysCompleted >= after.totalDays &&
    !record.milestones.completedNotifiedAt
  ) {
    record.milestones.completedNotifiedAt = new Date().toISOString()
    sendEmail({
      to: CLINIC_EMAIL,
      subject: `Bredesen Workbook: ${record.name} completed the program`,
      text: [
        `${record.name} just completed the full Bredesen workbook program.`,
        '',
        `Patient: ${record.name}`,
        `Email: ${record.email}`,
        `Phone: ${record.phone ?? '—'}`,
        `Days completed: ${after.daysCompleted}/${after.totalDays}`,
      ].join('\n'),
    }).catch(() => {})
  }
}

function json(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

export const config = {
  path: '/api/patient-progress',
}
