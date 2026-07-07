import { useCallback, useEffect, useState } from 'react'

export type Mood = 'calm' | 'tired' | 'worried' | 'hopeful' | 'frustrated' | 'okay'

export type FoodLog = {
  breakfast: string
  lunch: string
  dinner: string
  snacks: string
  waterGlasses: number
}

export type JournalEntry = {
  dayIso: string
  mood?: Mood
  thoughts: string
  food: FoodLog
  wins: string
  gentleGoal: string
  updatedAt: string
}

export type WeeklyReflection = {
  weekStartIso: string
  whatFeltGood: string
  whatWasHard: string
  oneIntention: string
  updatedAt: string
}

export type JournalStore = {
  entries: Record<string, JournalEntry>
  weekly: Record<string, WeeklyReflection>
}

const KEY = 'bredesen.journal.v1'

const EMPTY_FOOD: FoodLog = {
  breakfast: '',
  lunch: '',
  dinner: '',
  snacks: '',
  waterGlasses: 0,
}

const DEFAULTS: JournalStore = { entries: {}, weekly: {} }

function isoToday() {
  const d = new Date()
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tz).toISOString().slice(0, 10)
}

function startOfWeekIso(dateIso?: string) {
  const base = dateIso ? new Date(dateIso + 'T00:00:00') : new Date()
  const day = base.getDay() // 0 Sun..6 Sat
  const diff = (day + 6) % 7 // Monday start
  base.setDate(base.getDate() - diff)
  const tz = base.getTimezoneOffset() * 60000
  return new Date(base.getTime() - tz).toISOString().slice(0, 10)
}

export function loadJournal(): JournalStore {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return DEFAULTS
  }
}

export function saveJournal(store: JournalStore) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(KEY, JSON.stringify(store))
}

export function emptyEntry(dayIso: string): JournalEntry {
  return {
    dayIso,
    mood: undefined,
    thoughts: '',
    food: { ...EMPTY_FOOD },
    wins: '',
    gentleGoal: '',
    updatedAt: new Date().toISOString(),
  }
}

export function useJournal() {
  const [store, setStore] = useState<JournalStore>(DEFAULTS)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setStore(loadJournal())
    setReady(true)
  }, [])

  const today = isoToday()

  const entryFor = useCallback(
    (dayIso: string): JournalEntry => store.entries[dayIso] ?? emptyEntry(dayIso),
    [store.entries],
  )

  const weeklyFor = useCallback(
    (weekIso: string): WeeklyReflection =>
      store.weekly[weekIso] ?? {
        weekStartIso: weekIso,
        whatFeltGood: '',
        whatWasHard: '',
        oneIntention: '',
        updatedAt: new Date().toISOString(),
      },
    [store.weekly],
  )

  const updateEntry = useCallback(
    (dayIso: string, patch: Partial<JournalEntry>) => {
      setStore((prev) => {
        const prior = prev.entries[dayIso] ?? emptyEntry(dayIso)
        const next: JournalStore = {
          ...prev,
          entries: {
            ...prev.entries,
            [dayIso]: {
              ...prior,
              ...patch,
              food: { ...prior.food, ...(patch.food ?? {}) },
              updatedAt: new Date().toISOString(),
            },
          },
        }
        saveJournal(next)
        return next
      })
    },
    [],
  )

  const updateWeekly = useCallback(
    (weekIso: string, patch: Partial<WeeklyReflection>) => {
      setStore((prev) => {
        const prior = prev.weekly[weekIso] ?? {
          weekStartIso: weekIso,
          whatFeltGood: '',
          whatWasHard: '',
          oneIntention: '',
          updatedAt: new Date().toISOString(),
        }
        const next: JournalStore = {
          ...prev,
          weekly: {
            ...prev.weekly,
            [weekIso]: {
              ...prior,
              ...patch,
              updatedAt: new Date().toISOString(),
            },
          },
        }
        saveJournal(next)
        return next
      })
    },
    [],
  )

  const journalStreak = useCallback(() => {
    let count = 0
    const d = new Date()
    for (;;) {
      const tz = d.getTimezoneOffset() * 60000
      const iso = new Date(d.getTime() - tz).toISOString().slice(0, 10)
      const entry = store.entries[iso]
      const written =
        entry &&
        (entry.mood || entry.thoughts.trim() || entry.wins.trim() || entry.gentleGoal.trim())
      if (!written) break
      count += 1
      d.setDate(d.getDate() - 1)
      if (count > 365) break
    }
    return count
  }, [store.entries])

  const totalEntries = Object.keys(store.entries).length

  return {
    store,
    ready,
    today,
    startOfWeekIso,
    entryFor,
    weeklyFor,
    updateEntry,
    updateWeekly,
    journalStreak,
    totalEntries,
  }
}
