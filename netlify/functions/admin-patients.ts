import type { Context } from '@netlify/functions'
import { daysSince, listPatients, position } from './_shared/patients'

/*
 * GET /api/admin/patients
 *
 * Returns the full clinic roster. Intended to be guarded by Netlify
 * Identity (clinic-admin role) in production. Anyone with the admin
 * dashboard URL can read for now.
 */

export default async (_req: Request, _context: Context) => {
  const all = await listPatients()
  const today = new Date().toISOString().slice(0, 10)

  const rows = all.map((p) => {
    const pos = position(p)
    const lastActivity = daysSince(p.lastActiveIso) ?? 999
    const isInactive = lastActivity >= 4 && pos.daysCompleted < pos.totalDays
    const needsHelp = lastActivity >= 7 || (pos.daysCompleted === 0 && lastActivity >= 2)
    return {
      id: p.id,
      name: p.name,
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      phone: p.phone ?? '',
      startDate: p.startDate,
      endDate: p.endDate,
      createdAt: p.createdAt,
      lastActiveIso: p.lastActiveIso,
      lastActivityDays: lastActivity,
      lastReminderSentIso: p.lastReminderSentIso,
      preferences: p.preferences,
      status: p.status,
      currentDay: pos.currentDay,
      currentWeek: pos.currentWeek,
      currentPhase: pos.currentPhase,
      daysCompleted: pos.daysCompleted,
      totalDays: pos.totalDays,
      percentComplete: pos.percentComplete,
      lastCompletedDay: pos.lastCompletedDay,
      journalEntries: p.progress.journalEntries.length,
      foodLogs: p.progress.foodLogs.length,
      brainGames: p.progress.brainGamesCompleted.length,
      videosWatched: p.progress.videosWatched.length,
      handoutsOpened: p.progress.handoutsOpened.length,
      recipesViewed: p.progress.recipesViewed.length,
      isInactive,
      needsHelp,
    }
  })

  rows.sort((a, b) => a.name.localeCompare(b.name))

  return new Response(
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      today,
      total: rows.length,
      patients: rows,
    }),
    { headers: { 'content-type': 'application/json' } },
  )
}

export const config = {
  path: '/api/admin/patients',
}
