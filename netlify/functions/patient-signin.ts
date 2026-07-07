import type { Context } from '@netlify/functions'
import {
  getPatient,
  newPatientRecord,
  normalizeEmail,
  position,
  savePatient,
  type PatientRecord,
} from './_shared/patients'
import { CLINIC_EMAIL, sendEmail, siteOrigin } from './_shared/email'

/*
 * POST /api/patient-signin
 * Body: { firstName, lastName, email, phone?, startDate? }
 *
 * Creates or finds the patient by email, refreshes lastActive, and sends
 * a clinic notification on every login. Always returns the patient
 * record so the client can store id/resumeToken/startDate locally.
 */

type Body = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  startDate?: string
}

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const email = body.email ? normalizeEmail(body.email) : ''
  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'A valid email is required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const existing = await getPatient(email)
  let record: PatientRecord
  let isNew = false
  let isFirstStart = false

  if (existing) {
    record = existing
    // Patch in any newly-supplied fields so the dashboard stays accurate
    if (body.firstName && !record.firstName) record.firstName = body.firstName.trim()
    if (body.lastName && !record.lastName) record.lastName = body.lastName.trim()
    if (body.phone && !record.phone) record.phone = body.phone.trim()
    if (body.firstName || body.lastName) {
      record.name = `${record.firstName} ${record.lastName}`.trim() || record.email
    }
    if (body.startDate && !record.startDate) record.startDate = body.startDate
  } else {
    if (!body.firstName || !body.lastName) {
      return new Response(
        JSON.stringify({ error: 'First and last name are required for new patients' }),
        { status: 400, headers: { 'content-type': 'application/json' } },
      )
    }
    record = newPatientRecord({
      email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      startDate: body.startDate,
    })
    isNew = true
    isFirstStart = true
  }

  const now = new Date().toISOString()
  const wasInactive7 = (() => {
    if (!record.lastActiveIso) return false
    const days = Math.round(
      (Date.parse(now.slice(0, 10) + 'T00:00:00') -
        Date.parse(record.lastActiveIso.slice(0, 10) + 'T00:00:00')) /
        86400000,
    )
    return days >= 7
  })()
  record.lastActiveIso = now
  if (!record.milestones.firstStartLoggedAt) {
    record.milestones.firstStartLoggedAt = now
    isFirstStart = true
  }
  if (!record.milestones.welcomeSentAt && isNew) {
    record.milestones.welcomeSentAt = now
  }

  await savePatient(record)

  const origin = siteOrigin(req)
  const resumeUrl = `${origin}/r?t=${record.resumeToken}`
  const pos = position(record)

  // Clinic notification on every login (per spec).
  const subject = `New Bredesen Workbook Activity: ${record.name}`
  const reasons: string[] = []
  if (isNew) reasons.push('created their account')
  else if (isFirstStart) reasons.push('started the workbook')
  else if (wasInactive7) reasons.push('resumed after 7+ inactive days')
  else reasons.push('logged in or returned to the workbook')

  const lastDayLine =
    pos.lastCompletedDay != null
      ? `Last completed day: ${pos.lastCompletedDay}`
      : 'Last completed day: none yet'

  const text = [
    `${record.name} has logged in or started working on their Bredesen workbook.`,
    '',
    `Patient: ${record.name}`,
    `Email: ${record.email}`,
    `Phone: ${record.phone ?? '—'}`,
    `Date/time: ${new Date(now).toLocaleString('en-US', { timeZone: 'America/Denver' })} MT`,
    `Current phase/week/day: Phase ${pos.currentPhase} • Week ${pos.currentWeek} • Day ${pos.currentDay}`,
    lastDayLine,
    `Activity: ${reasons.join(', ')}`,
    `Resume link: ${resumeUrl}`,
  ].join('\n')

  // Fire-and-forget; we don't block the patient's login on email delivery.
  sendEmail({ to: CLINIC_EMAIL, subject, text }).catch(() => {})

  // Patients receive a quick welcome / re-entry email so they have a
  // resume link in their inbox immediately.
  if (record.preferences.emailReminders && !record.preferences.unsubscribed) {
    const patientSubject = isNew
      ? 'Welcome to your Bredesen Workbook'
      : 'Continue your Bredesen Workbook'
    const patientText = [
      `Hi ${record.firstName || 'there'},`,
      '',
      isNew
        ? 'Your Bredesen workbook is ready. One small step today is enough.'
        : 'Welcome back. Your workbook is right where you left it.',
      '',
      `You are currently on:`,
      `Phase ${pos.currentPhase} • Week ${pos.currentWeek} • Day ${pos.currentDay}`,
      '',
      `Click here to continue where you left off:`,
      resumeUrl,
      '',
      'Functional Neurology & Sleep Medicine',
      'Phone: 801-266-5559',
      'Healthie Portal: https://secure.gethealthie.com',
    ].join('\n')
    sendEmail({ to: record.email, subject: patientSubject, text: patientText }).catch(() => {})
  }

  return new Response(
    JSON.stringify({
      ok: true,
      isNew,
      patient: {
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
        position: pos,
      },
    }),
    { status: isNew ? 201 : 200, headers: { 'content-type': 'application/json' } },
  )
}

export const config = {
  path: '/api/patient-signin',
}
