import { getStore } from '@netlify/blobs'

/*
 * Patient record helpers.
 *
 * Source of truth lives in the "patients" blob store. Records are keyed
 * by lowercased email so login is a direct lookup. A separate id-index
 * maps patientId -> email for legacy callers that only have an id.
 *
 * Workbook progress lives on the same record under `progress` so the
 * dashboard, reminder engine, weekly report, and admin view all read a
 * single document per patient.
 */

const TOTAL_DAYS = 168
const TOTAL_WEEKS = 24

export type PatientPrefs = {
  emailReminders: boolean
  smsReminders: boolean
  caregiverEnabled: boolean
  displayMode: 'standard' | 'simple' | 'large-print'
  unsubscribed?: boolean
  pausedUntilIso?: string | null
}

export type PatientProgress = {
  completedDays: number[]
  lastCompletedAt: string | null
  streak: number
  isPaused: boolean
  partial: Record<string, unknown>
  journalEntries: { id: string; createdAt: string; text: string; promptId?: string }[]
  foodLogs: { id: string; loggedAtIso: string; meal: string; notes?: string }[]
  recipesViewed: string[]
  brainGamesCompleted: string[]
  videosWatched: string[]
  handoutsOpened: string[]
}

export type PatientRecord = {
  id: string
  email: string
  firstName: string
  lastName: string
  name: string
  phone?: string
  startDate: string
  endDate: string
  createdAt: string
  lastActiveIso: string | null
  lastReminderSentIso: string | null
  lastReminderKind: string | null
  resumeToken: string
  preferences: PatientPrefs
  progress: PatientProgress
  milestones: {
    welcomeSentAt: string | null
    firstStartLoggedAt: string | null
    weeksCompletedNotified: number[]
    finalMonthNotifiedAt: string | null
    completedNotifiedAt: string | null
  }
  status: 'active' | 'completed' | 'paused'
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function patientKey(email: string): string {
  return `email/${normalizeEmail(email)}.json`
}

export function indexKey(id: string): string {
  return `id-index/${id}.json`
}

function addMonthsIso(dateIso: string, months: number): string {
  const d = new Date(dateIso + 'T00:00:00')
  d.setMonth(d.getMonth() + months)
  return d.toISOString().slice(0, 10)
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function randomToken(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().replace(/-/g, '') + Math.random().toString(36).slice(2, 8)
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export async function getPatient(email: string): Promise<PatientRecord | null> {
  const store = getStore('patients')
  return ((await store.get(patientKey(email), { type: 'json' })) as PatientRecord | null) ?? null
}

export async function getPatientById(id: string): Promise<PatientRecord | null> {
  const store = getStore('patients')
  const idx = (await store.get(indexKey(id), { type: 'json' })) as { email: string } | null
  if (idx?.email) {
    const found = (await store.get(patientKey(idx.email), { type: 'json' })) as PatientRecord | null
    if (found) return found
  }
  // Fallback: legacy records may be stored at the bare id key.
  const legacy = (await store.get(id, { type: 'json' })) as PatientRecord | null
  return legacy
}

export async function savePatient(record: PatientRecord): Promise<PatientRecord> {
  const store = getStore('patients')
  await store.setJSON(patientKey(record.email), record)
  await store.setJSON(indexKey(record.id), { email: record.email, id: record.id })
  return record
}

export async function listPatients(): Promise<PatientRecord[]> {
  const store = getStore('patients')
  const { blobs } = await store.list({ prefix: 'email/' })
  const out: PatientRecord[] = []
  for (const b of blobs) {
    const rec = (await store.get(b.key, { type: 'json' })) as PatientRecord | null
    if (rec) out.push(rec)
  }
  return out
}

export function defaultProgress(): PatientProgress {
  return {
    completedDays: [],
    lastCompletedAt: null,
    streak: 0,
    isPaused: false,
    partial: {},
    journalEntries: [],
    foodLogs: [],
    recipesViewed: [],
    brainGamesCompleted: [],
    videosWatched: [],
    handoutsOpened: [],
  }
}

export function defaultPrefs(): PatientPrefs {
  return {
    emailReminders: true,
    smsReminders: false,
    caregiverEnabled: false,
    displayMode: 'standard',
    unsubscribed: false,
    pausedUntilIso: null,
  }
}

export function newPatientRecord(input: {
  email: string
  firstName: string
  lastName: string
  phone?: string
  startDate?: string
  preferences?: Partial<PatientPrefs>
}): PatientRecord {
  const startDate = input.startDate || todayIso()
  const endDate = addMonthsIso(startDate, 6)
  const id = `pt-${randomToken().slice(0, 16)}`
  const name = `${input.firstName} ${input.lastName}`.trim() || input.email
  return {
    id,
    email: normalizeEmail(input.email),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    name,
    phone: input.phone?.trim() || undefined,
    startDate,
    endDate,
    createdAt: new Date().toISOString(),
    lastActiveIso: null,
    lastReminderSentIso: null,
    lastReminderKind: null,
    resumeToken: randomToken(),
    preferences: { ...defaultPrefs(), ...(input.preferences ?? {}) },
    progress: defaultProgress(),
    milestones: {
      welcomeSentAt: null,
      firstStartLoggedAt: null,
      weeksCompletedNotified: [],
      finalMonthNotifiedAt: null,
      completedNotifiedAt: null,
    },
    status: 'active',
  }
}

/* --- progress derivations --- */

export function deriveCurrentDay(completedDays: number[]): number {
  if (!completedDays.length) return 1
  const highest = Math.max(...completedDays)
  return Math.min(TOTAL_DAYS, highest + 1)
}

export function weekForDay(day: number): number {
  if (day < 1) return 1
  if (day > TOTAL_DAYS) return TOTAL_WEEKS
  return Math.ceil(day / 7)
}

export function phaseForWeek(week: number): number {
  if (week <= 4) return 1
  if (week <= 8) return 2
  if (week <= 12) return 3
  if (week <= 16) return 4
  if (week <= 20) return 5
  return 6
}

export type PatientPosition = {
  currentDay: number
  currentWeek: number
  currentPhase: number
  daysCompleted: number
  totalDays: number
  percentComplete: number
  lastCompletedDay: number | null
}

export function position(record: PatientRecord): PatientPosition {
  const days = record.progress.completedDays
  const currentDay = deriveCurrentDay(days)
  const currentWeek = weekForDay(currentDay)
  const currentPhase = phaseForWeek(currentWeek)
  const daysCompleted = days.length
  const lastCompletedDay = daysCompleted ? Math.max(...days) : null
  return {
    currentDay,
    currentWeek,
    currentPhase,
    daysCompleted,
    totalDays: TOTAL_DAYS,
    percentComplete: Math.round((daysCompleted / TOTAL_DAYS) * 100),
    lastCompletedDay,
  }
}

export function daysSince(iso: string | null | undefined): number | null {
  if (!iso) return null
  const today = new Date(todayIso() + 'T00:00:00').getTime()
  const then = new Date(iso.slice(0, 10) + 'T00:00:00').getTime()
  return Math.round((today - then) / 86400000)
}
