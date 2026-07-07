import { createFileRoute, Link } from '@tanstack/react-router'
import { usePreferences } from '@/lib/preferences'
import { useProgress } from '@/lib/progress'
import { useWorkbook } from '@/lib/program'
import { getPhaseForWeek, phases } from '@/content/phases'
import { planForDay } from '@/content/curriculum'
import { Card, SectionHeading, ProgressBar } from '@/components/ui'
import { CheckCircle2, Calendar } from 'lucide-react'

export const Route = createFileRoute('/_app/week')({
  component: WeekOverview,
})

function WeekOverview() {
  const { prefs } = usePreferences()
  const { isTaskDone } = useProgress()
  const { state, ready } = useWorkbook(prefs.startDate, prefs.patientName)
  if (!ready) return null
  const phase = getPhaseForWeek(state.currentWeek)

  const weekStartDay = (state.currentWeek - 1) * 7 + 1
  const weekDays = Array.from({ length: 7 }).map((_, i) => weekStartDay + i)

  const tasksPerDay = 6
  const weekDoneCount = weekDays.reduce((sum, d) => {
    const kinds = ['lesson', 'recipe', 'movement', 'breathwork', 'game', 'journal'] as const
    return sum + kinds.filter((k) => isTaskDone(d, k)).length
  }, 0)
  const weekPercent = Math.round((weekDoneCount / (tasksPerDay * 7)) * 100)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow={`Phase ${phase.number}`}
        title={`Week ${state.currentWeek} — ${phase.title}`}
        description={phase.tagline}
      />

      <Card variant="sage" className="mb-6">
        <div className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-sage-700)' }}>
          This week's intention
        </div>
        <div className="font-display text-xl mb-4">{phase.weeklyIntention}</div>
        <ProgressBar percent={weekPercent} />
        <div className="text-sm mt-2" style={{ color: 'var(--color-ink-500)' }}>
          {weekDoneCount} of {tasksPerDay * 7} small steps complete this week
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <Card>
          <h3 className="font-display text-lg mb-2">Key habits</h3>
          <ul className="space-y-2">
            {phase.keyHabits.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-sage-500)' }} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-display text-lg mb-2">Caregiver focus</h3>
          <p>{phase.caregiverGuidance}</p>
        </Card>
        <Card>
          <h3 className="font-display text-lg mb-2">Success looks like</h3>
          <p>{phase.successMarker}</p>
        </Card>
      </div>

      <SectionHeading title="Day by day" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {weekDays.map((d) => {
          const plan = planForDay(d)
          const isToday = d === state.currentDay
          const isCompleted = state.isDayComplete(d)
          const isLocked = d > state.currentDay
          return (
            <Link
              key={d}
              to="/today"
              className={`card tap-large transition-shadow ${isToday ? 'soft-pulse' : ''}`}
              style={{
                borderColor: isToday
                  ? 'var(--color-sage-500)'
                  : isCompleted
                    ? 'var(--sage-400)'
                    : 'rgba(122, 158, 122, 0.2)',
                opacity: isLocked ? 0.5 : 1,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" style={{ color: 'var(--color-sage-600)' }} />
                <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-sage-600)' }}>
                  Day {d} {isCompleted ? '· done' : isLocked ? '· locked' : ''}
                </div>
              </div>
              <div className="font-display text-base">{plan.title}</div>
              <div className="text-sm mt-1" style={{ color: 'var(--color-ink-500)' }}>
                {plan.theme}
              </div>
            </Link>
          )
        })}
      </div>

      <SectionHeading title="All phases" />
      <div className="space-y-3">
        {phases.map((p) => (
          <div
            key={p.id}
            className={`rounded-2xl p-4 border flex items-center justify-between`}
            style={{
              backgroundColor: p.number === phase.number ? 'var(--color-sage-50)' : 'white',
              borderColor: p.number === phase.number ? 'var(--color-sage-400)' : 'rgba(122, 158, 122, 0.2)',
            }}
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-sage-600)' }}>
                Phase {p.number} · Weeks {p.weekRange[0]}–{p.weekRange[1]}
              </div>
              <div className="font-display text-lg">{p.title}</div>
            </div>
            <div className="text-sm" style={{ color: 'var(--color-ink-500)' }}>
              {p.tagline}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
