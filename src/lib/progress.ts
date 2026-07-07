import { useEffect, useState, useCallback } from 'react'

export type TaskKind =
  | 'lesson'
  | 'recipe'
  | 'movement'
  | 'breathwork'
  | 'game'
  | 'checkin'
  | 'journal'
  | 'food'

export type CompletionRecord = {
  day: number
  task: TaskKind
  completedAtIso: string
}

export type ProgressStore = {
  completions: CompletionRecord[]
  streakDays: number
  lastCompletedDayIso: string | null
  notes: { id: string; createdAt: string; text: string }[]
}

const KEY = 'bredesen.progress.v1'

const DEFAULTS: ProgressStore = {
  completions: [],
  streakDays: 0,
  lastCompletedDayIso: null,
  notes: [],
}

export function loadProgress(): ProgressStore {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return DEFAULTS
  }
}

export function saveProgress(p: ProgressStore) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(KEY, JSON.stringify(p))
}

function isoToday() {
  const d = new Date()
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tz).toISOString().slice(0, 10)
}

/* Fire-and-forget sync to clinic backend. Errors are swallowed so a network
 * problem never blocks the patient's local progress. The server aggregates
 * silently and only emits a single weekly summary. */
function syncCompletion(payload: {
  day: number
  task: TaskKind
  completedAtIso: string
}) {
  if (typeof window === 'undefined') return
  try {
    const patientId = window.localStorage.getItem('bredesen.patientId')
    const patientName = (() => {
      try {
        const prefsRaw = window.localStorage.getItem('bredesen.prefs.v1')
        if (!prefsRaw) return 'Friend'
        return JSON.parse(prefsRaw).patientName ?? 'Friend'
      } catch {
        return 'Friend'
      }
    })()
    if (!patientId) return // anonymous session — skip sync until enrolled
    fetch('/api/log-completion', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({ patientId, patientName, ...payload }),
    }).catch(() => {})
  } catch {
    /* swallow */
  }
}

export function useProgress() {
  const [store, setStore] = useState<ProgressStore>(DEFAULTS)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setStore(loadProgress())
    setReady(true)
  }, [])

  const markComplete = useCallback((day: number, task: TaskKind) => {
    setStore((prev) => {
      const already = prev.completions.find(
        (c) => c.day === day && c.task === task,
      )
      if (already) return prev
      const today = isoToday()

      let streak = prev.streakDays
      if (prev.lastCompletedDayIso !== today) {
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .slice(0, 10)
        streak =
          prev.lastCompletedDayIso === yesterday ? prev.streakDays + 1 : 1
      }

      const next: ProgressStore = {
        ...prev,
        completions: [
          ...prev.completions,
          { day, task, completedAtIso: today },
        ],
        streakDays: streak,
        lastCompletedDayIso: today,
      }
      saveProgress(next)
      syncCompletion({ day, task, completedAtIso: today })
      return next
    })
  }, [])

  const unmarkComplete = useCallback((day: number, task: TaskKind) => {
    setStore((prev) => {
      const next: ProgressStore = {
        ...prev,
        completions: prev.completions.filter(
          (c) => !(c.day === day && c.task === task),
        ),
      }
      saveProgress(next)
      return next
    })
  }, [])

  const addNote = useCallback((text: string) => {
    setStore((prev) => {
      const next: ProgressStore = {
        ...prev,
        notes: [
          {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            text,
          },
          ...prev.notes,
        ],
      }
      saveProgress(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    saveProgress(DEFAULTS)
    setStore(DEFAULTS)
  }, [])

  const isTaskDone = useCallback(
    (day: number, task: TaskKind) =>
      store.completions.some((c) => c.day === day && c.task === task),
    [store.completions],
  )

  const countForDay = useCallback(
    (day: number) =>
      store.completions.filter((c) => c.day === day).length,
    [store.completions],
  )

  return {
    store,
    ready,
    markComplete,
    unmarkComplete,
    addNote,
    reset,
    isTaskDone,
    countForDay,
  }
}
