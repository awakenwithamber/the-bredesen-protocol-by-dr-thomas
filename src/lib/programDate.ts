import { getPhaseForWeek } from '@/content/phases'

export type ProgramStatus =
  | 'pre-start'
  | 'active'
  | 'final-month'
  | 'final-14-days'
  | 'completed'
  | 'maintenance'

export type ProgramState = {
  startDate: string // ISO date (YYYY-MM-DD)
  endDate: string
  currentDay: number
  currentWeek: number
  currentPhase: number
  daysRemaining: number
  daysCompleted: number
  totalDays: number
  percentComplete: number
  status: ProgramStatus
  statusNotice: string
}

const TOTAL_DAYS = 180

export function addMonths(dateIso: string, months: number): string {
  const d = new Date(dateIso + 'T00:00:00')
  d.setMonth(d.getMonth() + months)
  return d.toISOString().slice(0, 10)
}

export function daysBetween(fromIso: string, toIso: string): number {
  const from = new Date(fromIso + 'T00:00:00')
  const to = new Date(toIso + 'T00:00:00')
  return Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
}

export function todayIso(): string {
  const d = new Date()
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tz).toISOString().slice(0, 10)
}

export function formatFriendly(dateIso: string): string {
  const d = new Date(dateIso + 'T00:00:00')
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function computeProgramState(startDateIso: string): ProgramState {
  const today = todayIso()
  const endDate = addMonths(startDateIso, 6)

  const daysSinceStart = daysBetween(startDateIso, today)
  const daysRemaining = Math.max(0, daysBetween(today, endDate))

  const daysCompleted = Math.max(0, Math.min(TOTAL_DAYS, daysSinceStart))
  const currentDay = Math.max(1, Math.min(TOTAL_DAYS, daysSinceStart + 1))
  const currentWeek = Math.max(1, Math.min(24, Math.ceil(currentDay / 7)))
  const currentPhase = getPhaseForWeek(currentWeek).number
  const percentComplete = Math.min(
    100,
    Math.round((daysCompleted / TOTAL_DAYS) * 100),
  )

  let status: ProgramStatus = 'active'
  let statusNotice = ''

  if (daysSinceStart < 0) {
    status = 'pre-start'
    statusNotice = `Your guided program begins on ${formatFriendly(
      startDateIso,
    )}. See you then.`
  } else if (daysRemaining === 0 && daysSinceStart >= TOTAL_DAYS) {
    status = 'completed'
    statusNotice = `Your original 6-month guided program ended on ${formatFriendly(
      endDate,
    )}. You still have access to your guided learning tools, recipes, and support materials. Any future follow-up appointments beyond this period are scheduled at the clinic's standard paid follow-up rate.`
  } else if (daysRemaining <= 14) {
    status = 'final-14-days'
    statusNotice = `Your 6-month guided program ends on ${formatFriendly(
      endDate,
    )}. You can still use your educational tools and daily support resources afterward. Any follow-up visits after that date are billed at the clinic's regular follow-up rate.`
  } else if (daysRemaining <= 30) {
    status = 'final-month'
    statusNotice = `Your guided 6-month program is entering its final month. You may continue using your educational tools after completion. Follow-up medical visits after your program completion date are scheduled as standard paid follow-up appointments.`
  }

  return {
    startDate: startDateIso,
    endDate,
    currentDay,
    currentWeek,
    currentPhase,
    daysRemaining,
    daysCompleted,
    totalDays: TOTAL_DAYS,
    percentComplete,
    status,
    statusNotice,
  }
}

// Derive an admin-facing tag for the patient roster
export function adminFlagForState(state: ProgramState): string | null {
  if (state.status === 'final-14-days') return '14-day warning'
  if (state.status === 'final-month') return '30-day warning'
  if (state.status === 'completed') return 'follow-up opportunity'
  return null
}
