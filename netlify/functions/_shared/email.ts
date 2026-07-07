/*
 * Email helper. Uses Resend if RESEND_API_KEY is configured. Falls back
 * to logging the message into a Netlify Blob ("email-log") so we have a
 * trail in dev and so callers can always treat this as fire-and-forget.
 */
import { getStore } from '@netlify/blobs'

export const CLINIC_EMAIL = process.env.CLINIC_EMAIL ?? 'iesleep12@gmail.com'
const FROM = process.env.CLINIC_EMAIL_FROM ?? 'Bredesen Workbook <workbook@bredesen.clinic>'

export type SendArgs = {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  replyTo?: string
}

export type SendResult = {
  ok: boolean
  status: number
  reason?: string
  id?: string
}

export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const recipients = Array.isArray(args.to) ? args.to : [args.to]
  const html = args.html ?? (args.text ? `<pre>${escapeHtml(args.text)}</pre>` : '')
  const text = args.text ?? stripHtml(args.html ?? '')

  const log = {
    to: recipients,
    subject: args.subject,
    text,
    html,
    sentAt: new Date().toISOString(),
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    await logEmail(log, 'no-api-key')
    return { ok: false, status: 0, reason: 'RESEND_API_KEY not set (logged only)' }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: recipients,
        subject: args.subject,
        html,
        text,
        reply_to: args.replyTo,
      }),
    })
    const data = (await res.json().catch(() => ({}))) as { id?: string; message?: string }
    await logEmail(log, res.ok ? 'sent' : `error:${res.status}`)
    return { ok: res.ok, status: res.status, id: data.id, reason: data.message }
  } catch (err) {
    await logEmail(log, 'network-error')
    return { ok: false, status: 0, reason: err instanceof Error ? err.message : String(err) }
  }
}

async function logEmail(payload: unknown, status: string) {
  try {
    const store = getStore('email-log')
    const id = `${new Date().toISOString().replace(/[:.]/g, '-')}-${Math.random().toString(36).slice(2, 8)}.json`
    await store.setJSON(id, { ...(payload as object), status })
  } catch {
    /* swallow */
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

export function siteOrigin(req?: Request): string {
  if (process.env.URL) return process.env.URL
  if (process.env.DEPLOY_PRIME_URL) return process.env.DEPLOY_PRIME_URL
  if (req) {
    try {
      return new URL(req.url).origin
    } catch {
      /* fallthrough */
    }
  }
  return 'https://example.netlify.app'
}
