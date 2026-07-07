import type { Context } from '@netlify/functions'
import { getStore } from '@netlify/blobs'
import { getPatient, getPatientById, position, savePatient } from './_shared/patients'
import { sendEmail, siteOrigin } from './_shared/email'

/*
 * POST /api/admin/send-reminder
 * Body: { patientId? | email?, action, note?, actor }
 *   action: 'reminder' | 'resend-welcome' | 'help-with-notes' | 'log-touch'
 *
 * Logs the action to the "admin-actions" store and, when meaningful,
 * sends the corresponding email to the patient.
 */

type Action =
  | 'reminder'
  | 'resend-welcome'
  | 'help-with-notes'
  | 'log-touch'
  | 'mark-follow-up'
  | 'clear-follow-up'

type AdminAction = {
  id: string
  patientId: string
  action: Action
  note?: string
  createdAt: string
  actor: string
}

function randomId() {
  return 'act_' + Math.random().toString(36).slice(2, 10)
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

  const { patientId, email, action, note, actor } = body ?? {}
  const allowedActions: Action[] = [
    'reminder',
    'resend-welcome',
    'help-with-notes',
    'log-touch',
    'mark-follow-up',
    'clear-follow-up',
  ]

  if ((!patientId && !email) || !allowedActions.includes(action)) {
    return json({ error: 'Missing patientId/email or unknown action' }, 400)
  }

  const record = email ? await getPatient(email) : await getPatientById(patientId)
  const record_id = record?.id ?? patientId ?? 'unknown'

  const adminRecord: AdminAction = {
    id: randomId(),
    patientId: record_id,
    action,
    note: typeof note === 'string' ? note.slice(0, 1_000) : undefined,
    createdAt: new Date().toISOString(),
    actor: typeof actor === 'string' ? actor : 'clinic-admin',
  }
  const adminStore = getStore('admin-actions')
  await adminStore.setJSON(`${record_id}/${adminRecord.id}.json`, adminRecord)

  let summary: string
  let emailDelivery: { sent: boolean; reason?: string } = { sent: false }

  if (record) {
    const origin = siteOrigin(req)
    const resumeUrl = `${origin}/r?t=${record.resumeToken}`
    const pos = position(record)

    if (action === 'reminder') {
      const result = await sendEmail({
        to: record.email,
        subject: 'Your Bredesen Workbook Day Is Ready',
        text: [
          `Hi ${record.firstName || 'there'},`,
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
        ].join('\n'),
      })
      emailDelivery = { sent: result.ok, reason: result.reason }
      summary = result.ok
        ? `Gentle reminder sent to ${record.email}`
        : `Reminder logged (email skipped: ${result.reason ?? 'unknown'})`
      record.lastReminderSentIso = new Date().toISOString()
      record.lastReminderKind = 'manual-reminder'
      await savePatient(record)
    } else if (action === 'resend-welcome') {
      const result = await sendEmail({
        to: record.email,
        subject: 'Welcome to your Bredesen Workbook',
        text: [
          `Hi ${record.firstName || 'there'},`,
          '',
          'The clinic has resent your welcome email. Your workbook is here whenever you are ready.',
          '',
          'You are currently on:',
          `Phase ${pos.currentPhase} • Week ${pos.currentWeek} • Day ${pos.currentDay}`,
          '',
          'Click here to start (or continue):',
          resumeUrl,
          '',
          'Functional Neurology & Sleep Medicine',
          'Phone: 801-266-5559',
        ].join('\n'),
      })
      emailDelivery = { sent: result.ok, reason: result.reason }
      summary = result.ok
        ? `Welcome email resent to ${record.email}`
        : `Welcome resend logged (email skipped: ${result.reason ?? 'unknown'})`
    } else if (action === 'help-with-notes') {
      summary = 'Clinic-assist note logged — staff will follow up'
    } else if (action === 'mark-follow-up') {
      const followStore = getStore('follow-ups')
      await followStore.setJSON(`${record.id}.json`, {
        needed: true,
        markedAtIso: new Date().toISOString(),
        markedBy: typeof actor === 'string' ? actor : 'clinic-admin',
        note: typeof note === 'string' ? note.slice(0, 1_000) : undefined,
      })
      summary = `Marked follow-up needed for ${record.name}`
    } else if (action === 'clear-follow-up') {
      const followStore = getStore('follow-ups')
      await followStore.setJSON(`${record.id}.json`, {
        needed: false,
        markedAtIso: new Date().toISOString(),
        markedBy: typeof actor === 'string' ? actor : 'clinic-admin',
      })
      summary = `Follow-up flag cleared for ${record.name}`
    } else {
      summary = 'Touchpoint logged'
    }
  } else {
    summary =
      action === 'reminder'
        ? 'Reminder logged — patient record not found, no email sent'
        : 'Action logged'
  }

  return json({ ok: true, summary, actionId: adminRecord.id, email: emailDelivery })
}

function json(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

export const config = {
  path: '/api/admin/send-reminder',
}
