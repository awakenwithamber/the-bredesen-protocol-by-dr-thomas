import type { Context } from '@netlify/functions'
import { getPatient, newPatientRecord, savePatient } from './_shared/patients'
import { CLINIC_EMAIL, sendEmail, siteOrigin } from './_shared/email'

/*
 * Patient enrollment (clinic-initiated).
 *
 * POST /api/enroll-patient
 * Body: { firstName, lastName, email, phone?, startDate, preferences? }
 *
 * Creates a patient record exactly like the self-serve sign-in path, but
 * keyed on the clinic's start date. Sends a clinic notification on
 * creation. Idempotent on email.
 */

type Body = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  startDate?: string
  // Older callers may pass a single full name field.
  name?: string
  preferences?: Record<string, unknown>
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

  if (!body.email || !body.startDate) {
    return new Response('Missing required fields: email, startDate', { status: 400 })
  }

  let firstName = body.firstName ?? ''
  let lastName = body.lastName ?? ''
  if (!firstName && !lastName && body.name) {
    const parts = body.name.trim().split(/\s+/)
    firstName = parts[0] ?? ''
    lastName = parts.slice(1).join(' ')
  }
  if (!firstName) firstName = body.email.split('@')[0]

  const existing = await getPatient(body.email)
  if (existing) {
    return new Response(
      JSON.stringify({ ok: true, alreadyExists: true, patient: existing }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    )
  }

  const record = newPatientRecord({
    email: body.email,
    firstName,
    lastName,
    phone: body.phone,
    startDate: body.startDate,
    preferences: body.preferences as any,
  })
  record.milestones.welcomeSentAt = new Date().toISOString()
  await savePatient(record)

  const origin = siteOrigin(req)
  const resumeUrl = `${origin}/r?t=${record.resumeToken}`

  // Clinic notification.
  sendEmail({
    to: CLINIC_EMAIL,
    subject: `New Bredesen Workbook Activity: ${record.name}`,
    text: [
      `${record.name} was just enrolled in the Bredesen workbook.`,
      '',
      `Patient: ${record.name}`,
      `Email: ${record.email}`,
      `Phone: ${record.phone ?? '—'}`,
      `Program start: ${record.startDate}`,
      `Resume link: ${resumeUrl}`,
    ].join('\n'),
  }).catch(() => {})

  // Patient welcome email.
  if (record.preferences.emailReminders) {
    sendEmail({
      to: record.email,
      subject: 'Welcome to your Bredesen Workbook',
      text: [
        `Hi ${record.firstName},`,
        '',
        'Your Bredesen workbook is ready. One small step today is enough.',
        '',
        `Click here to start: ${resumeUrl}`,
        '',
        'Functional Neurology & Sleep Medicine',
        'Phone: 801-266-5559',
        'Healthie Portal: https://secure.gethealthie.com',
      ].join('\n'),
    }).catch(() => {})
  }

  return new Response(JSON.stringify(record), {
    status: 201,
    headers: { 'content-type': 'application/json' },
  })
}

export const config = {
  path: '/api/enroll-patient',
}
