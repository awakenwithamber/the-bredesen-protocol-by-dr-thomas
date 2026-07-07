/*
 * Patient session helpers — bridge between server records and the
 * existing localStorage-keyed UI. We don't run a real auth cookie for
 * this MVP; the session is a plain JSON document on the device.
 *
 * Keys touched:
 *   bredesen.session.v1     — the session payload (id, email, names, token, startDate)
 *   bredesen.prefs.v1       — patientName for downstream UI
 *   bredesen.patientId      — used by progress sync on existing code paths
 *   bredesen.workbook.v1    — completed days, etc. (managed by program.ts)
 */

export type PatientSession = {
  id: string
  email: string
  firstName: string
  lastName: string
  name: string
  phone?: string
  startDate: string
  endDate?: string
  resumeToken: string
  preferences?: {
    emailReminders?: boolean
    smsReminders?: boolean
    caregiverEnabled?: boolean
    displayMode?: string
    unsubscribed?: boolean
  }
}

const SESSION_KEY = 'bredesen.session.v1'

export function loadSession(): PatientSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PatientSession
  } catch {
    return null
  }
}

export function saveSession(s: PatientSession) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(s))
}

export function clearSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(SESSION_KEY)
  window.localStorage.removeItem('bredesen.patientId')
}

/**
 * Apply a session returned from the server: persist it, sync companion
 * keys (patientId, prefs.patientName, workbook.startDate), and merge
 * server-side progress into the local workbook so the dashboard reflects
 * server state immediately.
 */
export function applySession(p: PatientSession & { progress?: any }) {
  saveSession({
    id: p.id,
    email: p.email,
    firstName: p.firstName,
    lastName: p.lastName,
    name: p.name,
    phone: p.phone,
    startDate: p.startDate,
    endDate: p.endDate,
    resumeToken: p.resumeToken,
    preferences: p.preferences,
  })
  try {
    window.localStorage.setItem('bredesen.patientId', p.id)
    const prefsRaw = window.localStorage.getItem('bredesen.prefs.v1')
    const prefs = prefsRaw ? JSON.parse(prefsRaw) : {}
    prefs.patientName = p.firstName || p.name
    prefs.patientId = p.id
    prefs.startDate = p.startDate
    if (p.preferences?.emailReminders !== undefined) {
      prefs.emailReminders = p.preferences.emailReminders
    }
    window.localStorage.setItem('bredesen.prefs.v1', JSON.stringify(prefs))

    const wbRaw = window.localStorage.getItem('bredesen.workbook.v1')
    const wb = wbRaw ? JSON.parse(wbRaw) : {}
    if (p.progress) {
      wb.completedDays = Array.isArray(p.progress.completedDays) ? p.progress.completedDays : wb.completedDays ?? []
      wb.lastCompletedAt = p.progress.lastCompletedAt ?? wb.lastCompletedAt ?? null
      wb.streak = typeof p.progress.streak === 'number' ? p.progress.streak : wb.streak ?? 0
      wb.isPaused = !!p.progress.isPaused
    }
    if (!wb.startDate) wb.startDate = p.startDate
    window.localStorage.setItem('bredesen.workbook.v1', JSON.stringify(wb))
  } catch {
    /* swallow */
  }
}

/**
 * Read any pending resume payload from the URL (set by the /r function)
 * and convert it into a PatientSession, then clean the URL.
 */
export function consumeResumeFromUrl(): PatientSession | null {
  if (typeof window === 'undefined') return null
  try {
    const url = new URL(window.location.href)
    const raw = url.searchParams.get('resume')
    if (!raw) return null
    const params = new URLSearchParams(raw)
    const s: PatientSession = {
      id: params.get('pid') ?? '',
      email: params.get('e') ?? '',
      firstName: params.get('fn') ?? '',
      lastName: params.get('ln') ?? '',
      name: params.get('n') ?? '',
      startDate: params.get('sd') ?? '',
      resumeToken: params.get('rt') ?? '',
    }
    if (!s.email || !s.resumeToken) return null
    url.searchParams.delete('resume')
    window.history.replaceState({}, '', url.toString())
    return s
  } catch {
    return null
  }
}

/**
 * Push the local workbook progress to the server so the admin dashboard
 * and weekly report reflect the patient's latest state.
 */
export function syncProgressToServer(extra?: Partial<{
  recipesViewed: string[]
  brainGamesCompleted: string[]
  videosWatched: string[]
  handoutsOpened: string[]
  journalEntries: { id: string; createdAt: string; text: string }[]
  foodLogs: { id: string; loggedAtIso: string; meal: string; notes?: string }[]
}>) {
  if (typeof window === 'undefined') return
  const session = loadSession()
  if (!session?.email) return
  try {
    const wbRaw = window.localStorage.getItem('bredesen.workbook.v1')
    const wb = wbRaw ? JSON.parse(wbRaw) : {}
    const progressSummaryRaw = window.localStorage.getItem('bredesen.progress.v1')
    const ps = progressSummaryRaw ? JSON.parse(progressSummaryRaw) : null
    const journalRaw = window.localStorage.getItem('bredesen.journal.v1')
    const journal = journalRaw ? JSON.parse(journalRaw) : null
    const foodRaw = window.localStorage.getItem('bredesen.food.v1')
    const food = foodRaw ? JSON.parse(foodRaw) : null
    const collectedRaw = window.localStorage.getItem('bredesen.collected.v1')
    const collected = collectedRaw ? JSON.parse(collectedRaw) : null

    const journalEntries =
      extra?.journalEntries ??
      (Array.isArray(journal?.entries) ? journal.entries : Array.isArray(ps?.notes) ? ps.notes : [])
    const foodLogs =
      extra?.foodLogs ?? (Array.isArray(food?.logs) ? food.logs : [])

    const progress = {
      completedDays: Array.isArray(wb.completedDays) ? wb.completedDays : [],
      lastCompletedAt: wb.lastCompletedAt ?? null,
      streak: typeof wb.streak === 'number' ? wb.streak : 0,
      isPaused: !!wb.isPaused,
      partial: wb.partial ?? {},
      journalEntries,
      foodLogs,
      recipesViewed: extra?.recipesViewed ?? collected?.recipes ?? [],
      brainGamesCompleted: extra?.brainGamesCompleted ?? collected?.brainGames ?? [],
      videosWatched: extra?.videosWatched ?? collected?.videos ?? [],
      handoutsOpened: extra?.handoutsOpened ?? collected?.handouts ?? [],
    }

    fetch('/api/patient-progress', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        email: session.email,
        firstName: session.firstName,
        lastName: session.lastName,
        progress,
      }),
    }).catch(() => {})
  } catch {
    /* swallow */
  }
}

/**
 * Append an item to a tracked collection (recipes, brain games, videos,
 * handouts) and push the new state to the server. Used by individual
 * pages so the admin dashboard reflects engagement detail.
 */
export function recordEngagement(kind: 'recipes' | 'brainGames' | 'videos' | 'handouts', id: string) {
  if (typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem('bredesen.collected.v1')
    const data = raw ? JSON.parse(raw) : { recipes: [], brainGames: [], videos: [], handouts: [] }
    data[kind] = Array.isArray(data[kind]) ? data[kind] : []
    if (!data[kind].includes(id)) data[kind].push(id)
    window.localStorage.setItem('bredesen.collected.v1', JSON.stringify(data))
    syncProgressToServer()
  } catch {
    /* swallow */
  }
}
