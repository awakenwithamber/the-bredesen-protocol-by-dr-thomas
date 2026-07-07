import { useEffect, useState, useCallback } from 'react'

export type DisplayMode = 'standard' | 'simple' | 'large-print'

export type Preferences = {
  displayMode: DisplayMode
  audioEnabled: boolean
  emailReminders: boolean
  smsReminders: boolean
  caregiverEnabled: boolean
  printFriendly: boolean
  patientName: string
  patientId: string
  startDate: string // ISO
  timezone: string
}

const DEFAULTS: Preferences = {
  displayMode: 'standard',
  audioEnabled: false,
  emailReminders: true,
  smsReminders: false,
  caregiverEnabled: true,
  printFriendly: false,
  patientName: 'Friend',
  patientId: '',
  // New patients start today. The workbook engine is self-paced and
  // completion-based, so this date is only used for display and for
  // computing the 6-month reference end date.
  startDate: new Date().toISOString().slice(0, 10),
  timezone:
    typeof Intl !== 'undefined'
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : 'America/Los_Angeles',
}

const KEY = 'bredesen.prefs.v1'
const PATIENT_ID_KEY = 'bredesen.patientId'

function ensurePatientId(prefs: Preferences): Preferences {
  if (prefs.patientId) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PATIENT_ID_KEY, prefs.patientId)
    }
    return prefs
  }
  if (typeof window === 'undefined') return prefs
  // Reuse a stable id across sessions. Generated client-side so it also
  // works when the clinic hasn't explicitly enrolled the patient yet;
  // the admin page can later reconcile these ids with formal enrollments.
  const existing = window.localStorage.getItem(PATIENT_ID_KEY)
  const id =
    existing ??
    (typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? `pt-${crypto.randomUUID()}`
      : `pt-${Math.random().toString(36).slice(2)}-${Date.now()}`)
  window.localStorage.setItem(PATIENT_ID_KEY, id)
  return { ...prefs, patientId: id }
}

export function loadPreferences(): Preferences {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS
    return ensurePatientId(parsed)
  } catch {
    return ensurePatientId(DEFAULTS)
  }
}

export function savePreferences(prefs: Preferences) {
  if (typeof window === 'undefined') return
  const ensured = ensurePatientId(prefs)
  window.localStorage.setItem(KEY, JSON.stringify(ensured))
  document.documentElement.setAttribute('data-display-mode', ensured.displayMode)
}

export function usePreferences() {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULTS)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const loaded = loadPreferences()
    setPrefs(loaded)
    // Persist any newly minted patientId back to storage.
    if (loaded.patientId) savePreferences(loaded)
    document.documentElement.setAttribute(
      'data-display-mode',
      loaded.displayMode,
    )
    setReady(true)
  }, [])

  const update = useCallback((patch: Partial<Preferences>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch }
      savePreferences(next)
      return next
    })
  }, [])

  return { prefs, update, ready }
}
