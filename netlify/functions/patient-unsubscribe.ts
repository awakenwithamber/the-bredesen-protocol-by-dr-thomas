import type { Context } from '@netlify/functions'
import { listPatients, savePatient } from './_shared/patients'

/*
 * GET /api/patient-unsubscribe?email=...&t=resumeToken
 *
 * Lets a patient pause daily reminder emails by following a link in the
 * email footer. Token must match so a casual scraper can't unsubscribe
 * other people.
 */

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url)
  const email = (url.searchParams.get('email') ?? '').toLowerCase()
  const token = url.searchParams.get('t') ?? ''
  if (!email || !token) {
    return html('Missing email or token.', 400)
  }
  const all = await listPatients()
  const found = all.find((p) => p.email === email && p.resumeToken === token)
  if (!found) {
    return html('That unsubscribe link is no longer valid. Call (801) 266-5559 if you need help.', 404)
  }
  found.preferences.unsubscribed = true
  found.preferences.emailReminders = false
  await savePatient(found)
  return html(
    `<h1>Reminders paused</h1><p>Hi ${found.firstName || 'there'} — daily reminders are paused for ${found.email}. You can still sign back in any time at <a href="${url.origin}/sign-in">${url.origin}/sign-in</a>.</p>`,
  )
}

function html(body: string, status = 200): Response {
  const doc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Bredesen Workbook</title><style>body{font-family:system-ui,sans-serif;max-width:520px;margin:6vh auto;padding:24px;color:#1f2a23;background:#faf7f0}h1{font-size:1.5rem}</style></head><body>${body}</body></html>`
  return new Response(doc, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

export const config = {
  path: '/api/patient-unsubscribe',
}
