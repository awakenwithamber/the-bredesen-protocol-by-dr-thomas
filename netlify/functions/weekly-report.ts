import type { Context } from '@netlify/functions'
import { getStore } from '@netlify/blobs'
import {
  daysSince,
  listPatients,
  position,
  type PatientRecord,
} from './_shared/patients'
import { CLINIC_EMAIL, sendEmail, siteOrigin } from './_shared/email'

/*
 * Weekly per-patient progress report
 * ----------------------------------
 * Cron: Friday 22:00 UTC. For every patient profile that exists, the
 * clinic gets ONE email with that patient's weekly summary. The clinic
 * never receives a single consolidated digest — they receive one email
 * per patient so each can be triaged independently.
 *
 * Sources of "this week":
 *   - completions blob (`completions/{patientId}/{weekStartIso}.json`)
 *     gives per-task events with timestamps (lesson/journal/food/etc.)
 *   - patient.progress.journalEntries / foodLogs carry their own
 *     timestamps and are filtered to the report window.
 *   - For lists without per-item timestamps (recipes, brain games,
 *     videos, handouts) the function diffs the current totals against
 *     a snapshot saved at the end of the previous run.
 *
 * Storage:
 *   - weekly-reports-history/{patientId}/{reportDate}.json
 *       full per-patient report record (engagement status, sent flag, etc.)
 *   - weekly-snapshots/{patientId}.json
 *       last-run totals used to diff the next week
 *   - weekly-reports/{weekStartIso}.json
 *       roll-up index of every patient processed for that week
 */

type Engagement = 'Strong' | 'Moderate' | 'Needs Help' | 'Inactive'

type WeeklyCounts = {
  daysCompleted: number
  lessonsCompleted: number
  journalEntries: number
  mealsLogged: number
  brainGames: number
  movementBreathwork: number
  videosWatched: number
  handoutsOpened: number
}

type Snapshot = {
  generatedAtIso: string
  completedDays: number
  journalEntries: number
  foodLogs: number
  recipesViewed: number
  brainGames: number
  videos: number
  handouts: number
}

type PatientReport = {
  reportDate: string
  weekStartIso: string
  patientId: string
  patientName: string
  email: string
  currentPhase: number
  currentWeek: number
  currentDay: number
  daysCompleted: number
  totalDays: number
  percentComplete: number
  weekly: WeeklyCounts
  lastActiveIso: string | null
  engagement: Engagement
  suggestedAction: string
  emailSent: boolean
  emailReason?: string
  followUpNeeded?: boolean
}

const REPORT_WINDOW_DAYS = 7

function reportWindow(): { startIso: string; endIso: string; reportDate: string } {
  const now = new Date()
  const reportDate = now.toISOString().slice(0, 10)
  const start = new Date(now)
  start.setDate(start.getDate() - REPORT_WINDOW_DAYS)
  return {
    startIso: start.toISOString(),
    endIso: now.toISOString(),
    reportDate,
  }
}

function startOfWeekMondayIso(reference: Date): string {
  const base = new Date(reference)
  const day = base.getDay()
  const diff = (day + 6) % 7
  base.setDate(base.getDate() - diff)
  return base.toISOString().slice(0, 10)
}

function withinWindow(iso: string | null | undefined, startIso: string, endIso: string): boolean {
  if (!iso) return false
  return iso >= startIso && iso <= endIso
}

function snapshotFor(p: PatientRecord): Snapshot {
  return {
    generatedAtIso: new Date().toISOString(),
    completedDays: p.progress.completedDays.length,
    journalEntries: p.progress.journalEntries.length,
    foodLogs: p.progress.foodLogs.length,
    recipesViewed: p.progress.recipesViewed.length,
    brainGames: p.progress.brainGamesCompleted.length,
    videos: p.progress.videosWatched.length,
    handouts: p.progress.handoutsOpened.length,
  }
}

type CompletionEvent = { day: number; task: string; completedAtIso: string }

async function readCompletionsForWindow(
  patientId: string,
  startIso: string,
  endIso: string,
): Promise<CompletionEvent[]> {
  const store = getStore('completions')
  // Scan keys for this patient and pull events that fall in the window.
  const out: CompletionEvent[] = []
  try {
    const { blobs } = await store.list({ prefix: `${patientId}/` })
    for (const b of blobs) {
      const log = (await store.get(b.key, { type: 'json' })) as
        | { events?: CompletionEvent[] }
        | null
      if (!log?.events) continue
      for (const e of log.events) {
        if (withinWindow(e.completedAtIso, startIso, endIso)) out.push(e)
      }
    }
  } catch {
    /* no completions log yet */
  }
  return out
}

function determineEngagement(daysCompletedThisWeek: number, idleDays: number | null): Engagement {
  if (idleDays === null || idleDays >= 7) return 'Inactive'
  if (daysCompletedThisWeek >= 4) return 'Strong'
  if (daysCompletedThisWeek >= 2) return 'Moderate'
  return 'Needs Help'
}

function suggestedActionFor(engagement: Engagement): string {
  switch (engagement) {
    case 'Strong':
      return 'No action needed'
    case 'Moderate':
      return 'Send encouragement'
    case 'Needs Help':
      return 'Check in with patient'
    case 'Inactive':
      return 'Discuss at next appointment'
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function formatLastActive(iso: string | null): string {
  if (!iso) return 'Never'
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function buildEmail(report: PatientReport, adminLink: string): { subject: string; html: string; text: string } {
  const subject = `Weekly Bredesen Workbook Progress: ${report.patientName}`
  const lines = [
    `Patient:`,
    report.patientName,
    ``,
    `Email:`,
    report.email,
    ``,
    `Current location:`,
    `Phase ${report.currentPhase} • Week ${report.currentWeek} • Day ${report.currentDay}`,
    ``,
    `This week:`,
    `- Days completed: ${report.weekly.daysCompleted}`,
    `- Lessons completed: ${report.weekly.lessonsCompleted}`,
    `- Journal entries completed: ${report.weekly.journalEntries}`,
    `- Meals logged/viewed: ${report.weekly.mealsLogged}`,
    `- Brain games completed: ${report.weekly.brainGames}`,
    `- Movement/breathwork completed: ${report.weekly.movementBreathwork}`,
    `- Videos watched: ${report.weekly.videosWatched}`,
    `- Handouts opened: ${report.weekly.handoutsOpened}`,
    ``,
    `Last active:`,
    formatLastActive(report.lastActiveIso),
    ``,
    `Engagement status:`,
    report.engagement,
    ``,
    `Suggested clinic action:`,
    report.suggestedAction,
    ``,
    `View Patient Progress: ${adminLink}`,
  ]
  const text = lines.join('\n')
  const html = [
    `<p><strong>Patient:</strong><br>${escapeHtml(report.patientName)}</p>`,
    `<p><strong>Email:</strong><br>${escapeHtml(report.email)}</p>`,
    `<p><strong>Current location:</strong><br>Phase ${report.currentPhase} • Week ${report.currentWeek} • Day ${report.currentDay}</p>`,
    `<p><strong>This week:</strong></p>`,
    `<ul>`,
    `<li>Days completed: ${report.weekly.daysCompleted}</li>`,
    `<li>Lessons completed: ${report.weekly.lessonsCompleted}</li>`,
    `<li>Journal entries completed: ${report.weekly.journalEntries}</li>`,
    `<li>Meals logged/viewed: ${report.weekly.mealsLogged}</li>`,
    `<li>Brain games completed: ${report.weekly.brainGames}</li>`,
    `<li>Movement/breathwork completed: ${report.weekly.movementBreathwork}</li>`,
    `<li>Videos watched: ${report.weekly.videosWatched}</li>`,
    `<li>Handouts opened: ${report.weekly.handoutsOpened}</li>`,
    `</ul>`,
    `<p><strong>Last active:</strong><br>${escapeHtml(formatLastActive(report.lastActiveIso))}</p>`,
    `<p><strong>Engagement status:</strong> ${report.engagement}</p>`,
    `<p><strong>Suggested clinic action:</strong> ${escapeHtml(report.suggestedAction)}</p>`,
    `<p><a href="${adminLink}">View Patient Progress</a></p>`,
  ].join('')
  return { subject, html, text }
}

async function buildReportForPatient(
  p: PatientRecord,
  windowStartIso: string,
  windowEndIso: string,
  reportDate: string,
  weekStartIso: string,
): Promise<{ report: PatientReport; nextSnapshot: Snapshot }> {
  const pos = position(p)
  const idle = daysSince(p.lastActiveIso)

  const snapshotStore = getStore('weekly-snapshots')
  const previous = ((await snapshotStore.get(`${p.id}.json`, { type: 'json' })) as Snapshot | null) ?? null
  const diff = (current: number, prev: number) => Math.max(0, current - prev)

  const events = await readCompletionsForWindow(p.id, windowStartIso, windowEndIso)
  const eventsByTask = (task: string) => events.filter((e) => e.task === task).length
  const distinctDayCompletes = new Set(
    events.filter((e) => e.task === 'day-complete' || e.task === 'lesson').map((e) => e.day),
  ).size

  const journalThisWeek = p.progress.journalEntries.filter((j) =>
    withinWindow(j.createdAt, windowStartIso, windowEndIso),
  ).length
  const foodThisWeek = p.progress.foodLogs.filter((f) =>
    withinWindow(f.loggedAtIso, windowStartIso, windowEndIso),
  ).length

  const daysCompletedFromCompletions = events.filter((e) => e.task === 'day-complete').length
  const daysCompletedThisWeek =
    daysCompletedFromCompletions ||
    distinctDayCompletes ||
    (previous ? diff(p.progress.completedDays.length, previous.completedDays) : 0)

  const lessonsCompletedThisWeek = eventsByTask('lesson')
  const movementBreathworkThisWeek =
    eventsByTask('movement') + eventsByTask('breathwork')

  const brainGamesThisWeek =
    eventsByTask('game') ||
    (previous ? diff(p.progress.brainGamesCompleted.length, previous.brainGames) : p.progress.brainGamesCompleted.length)

  const videosThisWeek = previous
    ? diff(p.progress.videosWatched.length, previous.videos)
    : p.progress.videosWatched.length
  const handoutsThisWeek = previous
    ? diff(p.progress.handoutsOpened.length, previous.handouts)
    : p.progress.handoutsOpened.length

  const weekly: WeeklyCounts = {
    daysCompleted: daysCompletedThisWeek,
    lessonsCompleted: lessonsCompletedThisWeek,
    journalEntries: journalThisWeek || eventsByTask('journal'),
    mealsLogged: foodThisWeek || eventsByTask('food'),
    brainGames: brainGamesThisWeek,
    movementBreathwork: movementBreathworkThisWeek,
    videosWatched: videosThisWeek,
    handoutsOpened: handoutsThisWeek,
  }

  const engagement = determineEngagement(weekly.daysCompleted, idle)
  const suggestedAction = suggestedActionFor(engagement)

  const report: PatientReport = {
    reportDate,
    weekStartIso,
    patientId: p.id,
    patientName: p.name,
    email: p.email,
    currentPhase: pos.currentPhase,
    currentWeek: pos.currentWeek,
    currentDay: pos.currentDay,
    daysCompleted: pos.daysCompleted,
    totalDays: pos.totalDays,
    percentComplete: pos.percentComplete,
    weekly,
    lastActiveIso: p.lastActiveIso,
    engagement,
    suggestedAction,
    emailSent: false,
  }

  return { report, nextSnapshot: snapshotFor(p) }
}

export default async (req: Request, _context: Context) => {
  const { startIso, endIso, reportDate } = reportWindow()
  const weekStartIso = startOfWeekMondayIso(new Date(endIso))
  const origin = siteOrigin(req)

  const patients = await listPatients()
  const historyStore = getStore('weekly-reports-history')
  const snapshotStore = getStore('weekly-snapshots')
  const indexStore = getStore('weekly-reports')

  const reports: PatientReport[] = []

  for (const p of patients) {
    const { report, nextSnapshot } = await buildReportForPatient(
      p,
      startIso,
      endIso,
      reportDate,
      weekStartIso,
    )

    const adminLink = `${origin}/admin?patient=${encodeURIComponent(p.id)}`
    const { subject, html, text } = buildEmail(report, adminLink)

    const result = await sendEmail({
      to: CLINIC_EMAIL,
      subject,
      html,
      text,
    })
    report.emailSent = result.ok
    if (!result.ok) report.emailReason = result.reason

    await historyStore.setJSON(`${p.id}/${reportDate}.json`, report)
    await snapshotStore.setJSON(`${p.id}.json`, nextSnapshot)
    reports.push(report)
  }

  await indexStore.setJSON(`${reportDate}.json`, {
    reportDate,
    weekStartIso,
    windowStartIso: startIso,
    windowEndIso: endIso,
    generatedAt: new Date().toISOString(),
    patientCount: reports.length,
    reports: reports.map((r) => ({
      patientId: r.patientId,
      patientName: r.patientName,
      email: r.email,
      engagement: r.engagement,
      daysCompleted: r.weekly.daysCompleted,
      lastActiveIso: r.lastActiveIso,
      emailSent: r.emailSent,
    })),
  })

  return new Response(
    JSON.stringify(
      {
        reportDate,
        weekStartIso,
        patientCount: reports.length,
        emailsSent: reports.filter((r) => r.emailSent).length,
        engagementBreakdown: {
          Strong: reports.filter((r) => r.engagement === 'Strong').length,
          Moderate: reports.filter((r) => r.engagement === 'Moderate').length,
          'Needs Help': reports.filter((r) => r.engagement === 'Needs Help').length,
          Inactive: reports.filter((r) => r.engagement === 'Inactive').length,
        },
      },
      null,
      2,
    ),
    { headers: { 'content-type': 'application/json' } },
  )
}

export const config = {
  schedule: '0 22 * * 5',
}
