import type { Context } from '@netlify/functions'
import { getStore } from '@netlify/blobs'

/*
 * GET /api/admin/patient-history?patientId=...
 *
 * Returns the weekly progress report history for one patient: each
 * entry contains report date, engagement status, completed days, last
 * active date, and whether the email was sent. Backed by the
 * `weekly-reports-history` blob store, which the weekly-report cron
 * writes once per patient per run.
 *
 * Also returns the patient's current follow-up flag from `follow-ups`.
 */

type HistoryRow = {
  reportDate: string
  engagement: string
  daysCompleted: number
  lastActiveIso: string | null
  emailSent: boolean
}

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url)
  const patientId = url.searchParams.get('patientId') ?? ''
  if (!patientId) {
    return json({ error: 'patientId is required' }, 400)
  }

  const historyStore = getStore('weekly-reports-history')
  const followStore = getStore('follow-ups')

  const rows: HistoryRow[] = []
  try {
    const { blobs } = await historyStore.list({ prefix: `${patientId}/` })
    for (const b of blobs) {
      const r = (await historyStore.get(b.key, { type: 'json' })) as
        | (HistoryRow & { weekly?: { daysCompleted: number } })
        | null
      if (!r) continue
      rows.push({
        reportDate: r.reportDate,
        engagement: r.engagement,
        daysCompleted: r.weekly?.daysCompleted ?? r.daysCompleted ?? 0,
        lastActiveIso: r.lastActiveIso ?? null,
        emailSent: !!r.emailSent,
      })
    }
  } catch {
    /* no history yet */
  }
  rows.sort((a, b) => b.reportDate.localeCompare(a.reportDate))

  const followUp = (await followStore.get(`${patientId}.json`, { type: 'json' })) as {
    needed: boolean
    markedAtIso?: string
    markedBy?: string
    note?: string
  } | null

  return json({ patientId, history: rows, followUp: followUp ?? { needed: false } })
}

function json(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

export const config = {
  path: '/api/admin/patient-history',
}
