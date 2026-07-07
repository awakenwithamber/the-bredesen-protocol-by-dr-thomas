import { useEffect, useState, useCallback, useMemo } from 'react'
import { addMonths, formatFriendly } from '@/lib/programDate'

/**
 * The Workbook Engine
 * -------------------
 * Progress is driven by COMPLETION, never by elapsed calendar days.
 *
 * A new patient always begins on Week 1, Phase 1, Day 1 — regardless of
 * how long ago they set their start date. The program only advances when
 * the patient marks the current day complete.
 *
 * Everything the UI needs to show "Phase X · Week Y · Day Z" flows from
 * a single list of completed day numbers kept in local storage and
 * mirrored (silently) to the clinic backend.
 */

export const TOTAL_DAYS = 168 // 24 weeks × 7 days
export const TOTAL_WEEKS = 24
export const TOTAL_PHASES = 6

export type ProgramStatus =
  | 'not-started'
  | 'active'
  | 'paused'
  | 'completed'
  | 'pre-start'
  | 'final-month'
  | 'final-14-days'

export type WorkbookState = {
  patientId: string
  startDate: string
  endDate: string
  currentDay: number
  currentWeek: number
  currentPhase: number
  completedDays: number[]
  daysCompleted: number
  totalDays: number
  totalWeeks: number
  percentComplete: number
  isPaused: boolean
  streak: number
  lastCompletedAt: string | null
  status: ProgramStatus
  statusNotice: string
  selfPacedMode: true
  // Helpers that the UI uses in a dozen places
  isUnlocked: (day: number) => boolean
  isDayComplete: (day: number) => boolean
  nextDay: number | null
  previousDay: number | null
}

export type WorkbookStore = {
  completedDays: number[]
  lastCompletedAt: string | null
  streak: number
  isPaused: boolean
  startDate: string | null
  repeatedDays: number[]
}

const KEY = 'bredesen.workbook.v1'

const DEFAULTS: WorkbookStore = {
  completedDays: [],
  lastCompletedAt: null,
  streak: 0,
  isPaused: false,
  startDate: null,
  repeatedDays: [],
}

export function phaseForWeek(week: number): number {
  if (week <= 4) return 1
  if (week <= 8) return 2
  if (week <= 12) return 3
  if (week <= 16) return 4
  if (week <= 20) return 5
  return 6
}

export function weekForDay(day: number): number {
  if (day < 1) return 1
  if (day > TOTAL_DAYS) return TOTAL_WEEKS
  return Math.ceil(day / 7)
}

export function dayOfWeek(day: number): number {
  // 1..7 within the current week
  return ((day - 1) % 7) + 1
}

export function phaseForDay(day: number): number {
  return phaseForWeek(weekForDay(day))
}

/**
 * The heart of the sequencing fix.
 *
 * currentDay is ALWAYS one more than the highest completed day,
 * starting at 1. It does not look at the calendar, elapsed time, or
 * the patient's start date. Day 2 only unlocks when Day 1 is marked
 * complete. Day 3 only unlocks when Day 2 is marked complete. Etc.
 */
export function deriveCurrentDay(completedDays: number[]): number {
  if (completedDays.length === 0) return 1
  const highest = Math.max(...completedDays)
  return Math.min(TOTAL_DAYS, highest + 1)
}

function loadStore(): WorkbookStore {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULTS,
      ...parsed,
      completedDays: Array.isArray(parsed.completedDays)
        ? parsed.completedDays.filter((n: unknown) => typeof n === 'number')
        : [],
      repeatedDays: Array.isArray(parsed.repeatedDays) ? parsed.repeatedDays : [],
    }
  } catch {
    return DEFAULTS
  }
}

function saveStore(s: WorkbookStore) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(KEY, JSON.stringify(s))
}

function todayIso(): string {
  const d = new Date()
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tz).toISOString().slice(0, 10)
}

function yesterdayIso(): string {
  const d = new Date(Date.now() - 86400000)
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tz).toISOString().slice(0, 10)
}

/**
 * Status notice for the UI — self-paced, so it is driven by completion,
 * not by calendar dates.
 */
function deriveStatus(store: WorkbookStore): {
  status: ProgramStatus
  statusNotice: string
} {
  if (store.isPaused) {
    return {
      status: 'paused',
      statusNotice:
        'Your program is paused. Nothing is lost. Resume whenever you are ready.',
    }
  }
  const done = store.completedDays.length
  if (done === 0) {
    return {
      status: 'not-started',
      statusNotice:
        'Welcome. Your workbook begins at Week 1 · Phase 1 · Day 1. One page at a time.',
    }
  }
  if (done >= TOTAL_DAYS) {
    return {
      status: 'completed',
      statusNotice:
        'You completed all 24 weeks. These tools stay with you for the long road ahead.',
    }
  }
  const remaining = TOTAL_DAYS - done
  if (remaining <= 14) {
    return {
      status: 'final-14-days',
      statusNotice: `You have ${remaining} workbook days remaining. Beautiful consistency — keep it gentle.`,
    }
  }
  if (remaining <= 30) {
    return {
      status: 'final-month',
      statusNotice: `You are in the final month of the guided workbook. Carry forward the habits that are serving you.`,
    }
  }
  return { status: 'active', statusNotice: '' }
}

function syncDayComplete(payload: {
  patientId: string
  patientName: string
  day: number
  completedAtIso: string
}) {
  if (typeof window === 'undefined') return
  try {
    fetch('/api/log-completion', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        patientId: payload.patientId,
        patientName: payload.patientName,
        day: payload.day,
        task: 'day-complete',
        completedAtIso: payload.completedAtIso,
      }),
    }).catch(() => {})
  } catch {
    /* swallow */
  }
}

function syncWorkbookSnapshot() {
  if (typeof window === 'undefined') return
  try {
    const sessionRaw = window.localStorage.getItem('bredesen.session.v1')
    if (!sessionRaw) return
    const session = JSON.parse(sessionRaw)
    if (!session?.email) return
    const wbRaw = window.localStorage.getItem('bredesen.workbook.v1')
    const wb = wbRaw ? JSON.parse(wbRaw) : {}
    const progress = {
      completedDays: Array.isArray(wb.completedDays) ? wb.completedDays : [],
      lastCompletedAt: wb.lastCompletedAt ?? null,
      streak: typeof wb.streak === 'number' ? wb.streak : 0,
      isPaused: !!wb.isPaused,
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

export function useWorkbook(startDateInput?: string, patientName?: string) {
  const [store, setStore] = useState<WorkbookStore>(DEFAULTS)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const loaded = loadStore()
    // Seed startDate once. A brand-new patient gets "today" — not
    // 4 days ago, not a far-future clinic date. That way the
    // dashboard never says "Day 5" on first load.
    if (!loaded.startDate) {
      loaded.startDate = startDateInput ?? todayIso()
      saveStore(loaded)
    }
    setStore(loaded)
    setReady(true)
  }, [])

  const completeDay = useCallback(
    (day: number) => {
      setStore((prev) => {
        // Patient must be on this day or repeating it. Completing a
        // future day silently is not allowed — the skip flow goes
        // through skipToDay().
        const currentDay = deriveCurrentDay(prev.completedDays)
        if (day > currentDay) return prev
        if (prev.completedDays.includes(day)) return prev

        const now = todayIso()
        const nextStreak =
          prev.lastCompletedAt === now
            ? prev.streak
            : prev.lastCompletedAt === yesterdayIso()
              ? prev.streak + 1
              : 1

        const next: WorkbookStore = {
          ...prev,
          completedDays: [...prev.completedDays, day].sort((a, b) => a - b),
          lastCompletedAt: now,
          streak: nextStreak,
          isPaused: false,
        }
        saveStore(next)

        try {
          const patientId =
            window.localStorage.getItem('bredesen.patientId') ?? ''
          if (patientId) {
            syncDayComplete({
              patientId,
              patientName: patientName ?? 'Friend',
              day,
              completedAtIso: now,
            })
          }
          syncWorkbookSnapshot()
        } catch {
          /* swallow */
        }

        return next
      })
    },
    [patientName],
  )

  const repeatDay = useCallback((day: number) => {
    setStore((prev) => {
      if (!prev.completedDays.includes(day)) return prev
      const next: WorkbookStore = {
        ...prev,
        completedDays: prev.completedDays.filter((d) => d !== day),
        repeatedDays: prev.repeatedDays.includes(day)
          ? prev.repeatedDays
          : [...prev.repeatedDays, day],
      }
      saveStore(next)
      return next
    })
  }, [])

  const skipToDay = useCallback((day: number) => {
    setStore((prev) => {
      const clamped = Math.max(1, Math.min(TOTAL_DAYS, day))
      const currentDay = deriveCurrentDay(prev.completedDays)
      if (clamped <= currentDay) return prev
      // To "unlock" a future day we mark every day up to clamped-1 as complete.
      // This preserves the invariant currentDay = max(completed) + 1.
      const all = new Set(prev.completedDays)
      for (let d = 1; d < clamped; d++) all.add(d)
      const next: WorkbookStore = {
        ...prev,
        completedDays: Array.from(all).sort((a, b) => a - b),
      }
      saveStore(next)
      return next
    })
  }, [])

  const setPaused = useCallback((paused: boolean) => {
    setStore((prev) => {
      const next = { ...prev, isPaused: paused }
      saveStore(next)
      return next
    })
  }, [])

  const setStartDate = useCallback((iso: string) => {
    setStore((prev) => {
      const next = { ...prev, startDate: iso }
      saveStore(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    saveStore({ ...DEFAULTS, startDate: todayIso() })
    setStore({ ...DEFAULTS, startDate: todayIso() })
  }, [])

  const state: WorkbookState = useMemo(() => {
    const start = store.startDate ?? startDateInput ?? todayIso()
    const end = addMonths(start, 6)
    const currentDay = deriveCurrentDay(store.completedDays)
    const currentWeek = weekForDay(currentDay)
    const currentPhase = phaseForWeek(currentWeek)
    const daysCompleted = store.completedDays.length
    const percentComplete = Math.round((daysCompleted / TOTAL_DAYS) * 100)
    const { status, statusNotice } = deriveStatus(store)

    const completedSet = new Set(store.completedDays)
    const isDayComplete = (d: number) => completedSet.has(d)
    const isUnlocked = (d: number) => d <= currentDay

    return {
      patientId: (typeof window !== 'undefined'
        ? window.localStorage.getItem('bredesen.patientId')
        : '') ?? '',
      startDate: start,
      endDate: end,
      currentDay,
      currentWeek,
      currentPhase,
      completedDays: store.completedDays,
      daysCompleted,
      totalDays: TOTAL_DAYS,
      totalWeeks: TOTAL_WEEKS,
      percentComplete,
      isPaused: store.isPaused,
      streak: store.streak,
      lastCompletedAt: store.lastCompletedAt,
      status,
      statusNotice,
      selfPacedMode: true,
      isUnlocked,
      isDayComplete,
      nextDay: currentDay < TOTAL_DAYS ? currentDay + 1 : null,
      previousDay: currentDay > 1 ? currentDay - 1 : null,
    }
  }, [store, startDateInput])

  return {
    state,
    ready,
    completeDay,
    repeatDay,
    skipToDay,
    setPaused,
    setStartDate,
    reset,
  }
}

// Pure derivation — handy in places that already have the store but need a state.
export function deriveState(
  store: WorkbookStore,
  fallbackStartIso?: string,
): WorkbookState {
  const start = store.startDate ?? fallbackStartIso ?? todayIso()
  const end = addMonths(start, 6)
  const currentDay = deriveCurrentDay(store.completedDays)
  const currentWeek = weekForDay(currentDay)
  const currentPhase = phaseForWeek(currentWeek)
  const daysCompleted = store.completedDays.length
  const percentComplete = Math.round((daysCompleted / TOTAL_DAYS) * 100)
  const { status, statusNotice } = deriveStatus(store)
  const completedSet = new Set(store.completedDays)

  return {
    patientId: '',
    startDate: start,
    endDate: end,
    currentDay,
    currentWeek,
    currentPhase,
    completedDays: store.completedDays,
    daysCompleted,
    totalDays: TOTAL_DAYS,
    totalWeeks: TOTAL_WEEKS,
    percentComplete,
    isPaused: store.isPaused,
    streak: store.streak,
    lastCompletedAt: store.lastCompletedAt,
    status,
    statusNotice,
    selfPacedMode: true,
    isUnlocked: (d: number) => d <= currentDay,
    isDayComplete: (d: number) => completedSet.has(d),
    nextDay: currentDay < TOTAL_DAYS ? currentDay + 1 : null,
    previousDay: currentDay > 1 ? currentDay - 1 : null,
  }
}

export { formatFriendly }
