import type { Context } from '@netlify/functions'
import {
  daysSince,
  listPatients,
  position,
  savePatient,
  type PatientRecord,
} from './_shared/patients'
import { CLINIC_EMAIL, sendEmail, siteOrigin } from './_shared/email'

/*
 * Daily reminder engine
 * ---------------------
 * Cron-triggered (defaults to 13:00 UTC ≈ 7am MT). For every patient who
 * is opted in, sends ONE email per day pointing to their next unfinished
 * day. Falls back to a gentler re-entry message after 3+ inactive days.
 *
 * Rules implemented (matches the requirement spec):
 *   - one reminder per patient per day
 *   - if patient completed today, link still resolves to next unlocked day
 *   - if patient did not complete today, email points to the same day
 *   - 3-day inactivity triggers a softer re-entry copy
 *   - 7-day inactivity also notifies the clinic (once)
 *   - unsubscribed patients are skipped
 *
 * Pass ?dryRun=1 to preview without sending; pass ?force=1 to ignore the
 * once-per-day guard (helpful when ad-hoc invoking from the admin panel).
 */

const SUBJECTS = [
  'Your Bredesen Workbook Day Is Ready',
  'Continue Your Brain Health Workbook',
  'Your Next Small Step Is Ready',
] as const

function pickSubject(record: PatientRecord, daysIdle: number): string {
  if (daysIdle >= 3) return 'We are still here when you are ready'
  const idx = Math.abs(hashCode(record.id + new Date().toISOString().slice(0, 10))) % SUBJECTS.length
  return SUBJECTS[idx]
}

function hashCode(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0
  return h
}

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url)
  const dryRun = url.searchParams.get('dryRun') === '1'
  const force = url.searchParams.get('force') === '1'
  const todayIso = new Date().toISOString().slice(0, 10)
  const origin = siteOrigin(req)

  const patients = await listPatients()
  const sent: string[] = []
  const skipped: { email: string; reason: string }[] = []
  const clinicAlerts: string[] = []

  for (const p of patients) {
    if (!p.preferences.emailReminders || p.preferences.unsubscribed) {
      skipped.push({ email: p.email, reason: 'opted-out' })
      continue
    }
    if (p.preferences.pausedUntilIso && p.preferences.pausedUntilIso > todayIso) {
      skipped.push({ email: p.email, reason: 'paused' })
      continue
    }
    if (p.status === 'completed') {
      skipped.push({ email: p.email, reason: 'completed' })
      continue
    }

    if (!force && p.lastReminderSentIso?.slice(0, 10) === todayIso) {
      skipped.push({ email: p.email, reason: 'already-sent-today' })
      continue
    }

    const pos = position(p)
    const idle = daysSince(p.lastActiveIso) ?? 999
    const isReentry = idle >= 3
    const resumeUrl = `${origin}/r?t=${p.resumeToken}`
    const unsubUrl = `${origin}/api/patient-unsubscribe?email=${encodeURIComponent(p.email)}&t=${p.resumeToken}`

    const body = isReentry
      ? [
          `Hi ${p.firstName || 'there'},`,
          '',
          `It has been a few days since your last workbook step. That is okay — there is no penalty for taking a pause. Whenever you are ready, your workbook is right where you left it.`,
          '',
          'You are currently on:',
          `Phase ${pos.currentPhase} • Week ${pos.currentWeek} • Day ${pos.currentDay}`,
          '',
          'Click here to continue where you left off:',
          resumeUrl,
          '',
          'One small step today is enough.',
          '',
          'Functional Neurology & Sleep Medicine',
          'Phone: 801-266-5559',
          'Healthie Portal: https://secure.gethealthie.com',
          '',
          `If you would like to pause these reminders: ${unsubUrl}`,
        ].join('\n')
      : [
          `Hi ${p.firstName || 'there'},`,
          '',
          'Your next Bredesen workbook step is ready.',
          '',
          'You are currently on:',
          `Phase ${pos.currentPhase} • Week ${pos.currentWeek} • Day ${pos.currentDay}`,
          '',
          'Click here to continue where you left off:',
          resumeUrl,
          '',
          'One small step today is enough.',
          '',
          'Functional Neurology & Sleep Medicine',
          'Phone: 801-266-5559',
          'Healthie Portal: https://secure.gethealthie.com',
          '',
          `Pause reminders: ${unsubUrl}`,
        ].join('\n')

    if (dryRun) {
      sent.push(`${p.email} (dry-run)`)
      continue
    }

    const result = await sendEmail({
      to: p.email,
      subject: pickSubject(p, idle),
      text: body,
    })
    if (result.ok) {
      sent.push(p.email)
      p.lastReminderSentIso = new Date().toISOString()
      p.lastReminderKind = isReentry ? 'reentry' : 'daily'
      await savePatient(p)
    } else {
      skipped.push({ email: p.email, reason: result.reason ?? 'send-failed' })
    }

    // Clinic alert when a patient crosses 7 inactive days — fire once.
    if (idle >= 7 && p.lastReminderKind !== 'inactive-7-clinic') {
      sendEmail({
        to: CLINIC_EMAIL,
        subject: `Bredesen Workbook: ${p.name} has been inactive 7+ days`,
        text: [
          `${p.name} has not made progress in ${idle} days.`,
          '',
          `Patient: ${p.name}`,
          `Email: ${p.email}`,
          `Phone: ${p.phone ?? '—'}`,
          `Phase ${pos.currentPhase} • Week ${pos.currentWeek} • Day ${pos.currentDay}`,
          `Last active: ${p.lastActiveIso ?? 'never'}`,
          `Resume link: ${resumeUrl}`,
        ].join('\n'),
      }).catch(() => {})
      p.lastReminderKind = 'inactive-7-clinic'
      await savePatient(p)
      clinicAlerts.push(p.email)
    }
  }

  return new Response(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        todayIso,
        sentCount: sent.length,
        sent,
        skippedCount: skipped.length,
        skipped,
        clinicAlerts,
        dryRun,
      },
      null,
      2,
    ),
    { headers: { 'content-type': 'application/json' } },
  )
}

export const config = {
  // Daily at 13:00 UTC ≈ 7am MT in summer / 6am MT in winter.
  schedule: '0 13 * * *',
}
