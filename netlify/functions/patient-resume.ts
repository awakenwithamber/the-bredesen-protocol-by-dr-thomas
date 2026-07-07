import type { Context } from '@netlify/functions'
import { listPatients, position } from './_shared/patients'

/*
 * GET /r?t={resumeToken}
 *
 * Resolves a patient's resume token and redirects to the dashboard with
 * a one-time payload that the client picks up in localStorage. We don't
 * issue a real session cookie for the demo — the client identifies
 * itself by email on subsequent calls.
 */

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url)
  const token = url.searchParams.get('t') ?? ''
  if (!token) {
    return Response.redirect(new URL('/sign-in', url.origin), 302)
  }

  // Token-to-patient lookup. The patient list is small enough that a
  // linear scan is fine; if it grows we can add a token-index store.
  const all = await listPatients()
  const found = all.find((p) => p.resumeToken === token)
  if (!found) {
    return Response.redirect(new URL('/sign-in?expired=1', url.origin), 302)
  }

  const pos = position(found)
  const params = new URLSearchParams({
    e: found.email,
    n: found.name,
    fn: found.firstName,
    ln: found.lastName,
    sd: found.startDate,
    pid: found.id,
    cd: String(pos.currentDay),
    cw: String(pos.currentWeek),
    rt: found.resumeToken,
  })
  return Response.redirect(`${url.origin}/?resume=${encodeURIComponent(params.toString())}`, 302)
}

export const config = {
  path: '/r',
}
