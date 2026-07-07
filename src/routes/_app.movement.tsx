import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Footprints,
  ShieldCheck,
} from 'lucide-react'
import { movements } from '@/content/movements'
import {
  SEATED_WORKOUTS,
  WORKOUT_SAFETY_NOTE,
  workoutForDay,
} from '@/content/seatedWorkouts'
import { useWorkbook } from '@/lib/program'
import { useProgress } from '@/lib/progress'
import { usePreferences } from '@/lib/preferences'
import { Card, Chip, SectionHeading } from '@/components/ui'

export const Route = createFileRoute('/_app/movement')({
  component: MovementLibrary,
})

function MovementLibrary() {
  const { prefs } = usePreferences()
  const { state, ready } = useWorkbook(prefs.startDate, prefs.patientName)
  const { isTaskDone, markComplete, unmarkComplete } = useProgress()

  if (!ready) return null

  const day = state.currentDay
  const todays = workoutForDay(day)
  const done = isTaskDone(day, 'movement')

  function toggleDone() {
    if (done) unmarkComplete(day, 'movement')
    else markComplete(day, 'movement')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <Link
        to="/today"
        className="inline-flex items-center gap-1.5 text-sm mb-3"
        style={{ color: 'var(--ink-500)' }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Today
      </Link>

      {/* Today's 5-minute workout — featured */}
      <div
        className="eyebrow"
        style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
      >
        Today · Workout {todays.letter} · {todays.durationMinutes} minutes
      </div>
      <h1
        className="font-display mt-1"
        style={{
          fontSize: 'clamp(1.6rem, 1.1rem + 1.8vw, 2.2rem)',
          lineHeight: 1.15,
          color: 'var(--ink-900)',
        }}
      >
        {todays.title}
      </h1>
      <p className="mt-1" style={{ color: 'var(--ink-700)', fontSize: '1.02rem' }}>
        {todays.focus}
      </p>

      <Card variant="sage" className="mt-4">
        <ol className="space-y-2.5">
          {todays.exercises.map((ex, i) => (
            <li key={ex.name} className="flex gap-3">
              <span
                className="rounded-full shrink-0 flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  background: 'white',
                  border: '2px solid var(--sage-500)',
                  color: 'var(--sage-700)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.02rem',
                    color: 'var(--ink-900)',
                    lineHeight: 1.3,
                  }}
                >
                  {ex.name}
                  {ex.reps && (
                    <span
                      className="ml-2"
                      style={{
                        color: 'var(--sage-700)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                      }}
                    >
                      · {ex.reps}
                    </span>
                  )}
                </div>
                <div
                  className="mt-0.5"
                  style={{
                    color: 'var(--ink-700)',
                    fontSize: '0.92rem',
                    lineHeight: 1.5,
                  }}
                >
                  {ex.cue}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <div
        className="mt-4 rounded-xl p-3 flex items-start gap-2"
        style={{
          background: 'var(--sand-50)',
          border: '1px solid var(--sand-300)',
          color: 'var(--ink-700)',
          fontSize: '0.9rem',
          lineHeight: 1.5,
        }}
      >
        <ShieldCheck
          className="w-4 h-4 mt-0.5 shrink-0"
          style={{ color: 'var(--sand-700)' }}
        />
        <span>{WORKOUT_SAFETY_NOTE}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={toggleDone}
          className={done ? 'btn-secondary' : 'btn-primary'}
          style={{ minHeight: 48, padding: '0.7rem 1rem', fontSize: '1rem' }}
        >
          <Check className="w-4 h-4" />
          {done ? "I'll mark it not done" : "I finished today's movement"}
        </button>
        <Link
          to="/today"
          className="btn-secondary"
          style={{ minHeight: 48, padding: '0.7rem 1rem', fontSize: '0.95rem' }}
        >
          Back to Today <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Other workouts in the rotation — collapsed by default */}
      <details className="mt-8">
        <summary
          className="cursor-pointer rounded-xl px-3 py-2"
          style={{
            background: 'var(--cream-50)',
            border: '1px solid var(--sage-200)',
            color: 'var(--sage-800)',
            fontSize: '0.95rem',
            fontWeight: 600,
          }}
        >
          See all five rotating seated workouts
        </summary>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {SEATED_WORKOUTS.map((w) => (
            <div
              key={w.id}
              className="rounded-2xl p-4"
              style={{
                background: w.id === todays.id ? 'var(--sage-50)' : 'white',
                border: `1px solid ${w.id === todays.id ? 'var(--sage-300)' : 'var(--sage-200)'}`,
              }}
            >
              <div
                className="eyebrow"
                style={{ color: 'var(--sage-700)', fontSize: '0.72rem' }}
              >
                Workout {w.letter} · {w.durationMinutes} min
              </div>
              <div
                className="font-display mt-1"
                style={{ fontSize: '1.05rem', color: 'var(--ink-900)', lineHeight: 1.3 }}
              >
                {w.title}
              </div>
              <p className="mt-1" style={{ color: 'var(--ink-700)', fontSize: '0.9rem' }}>
                {w.focus}
              </p>
              <ul
                className="mt-2 space-y-0.5"
                style={{ color: 'var(--ink-500)', fontSize: '0.85rem' }}
              >
                {w.exercises.map((ex) => (
                  <li key={ex.name}>· {ex.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>

      {/* Reference library — kept here for completeness */}
      <details className="mt-4">
        <summary
          className="cursor-pointer rounded-xl px-3 py-2"
          style={{
            background: 'var(--cream-50)',
            border: '1px solid var(--sage-200)',
            color: 'var(--sage-800)',
            fontSize: '0.95rem',
            fontWeight: 600,
          }}
        >
          Movement library — longer practices and walks
        </summary>
        <div className="mt-4">
          <SectionHeading
            title="The full movement library"
            description="Longer practices for days when you want a little more. Every practice has a seated option and a low-energy option."
          />
          <div className="grid md:grid-cols-2 gap-5">
            {movements.map((m) => (
              <Card key={m.id} className="h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Footprints
                    className="w-4 h-4"
                    style={{ color: 'var(--color-sage-600)' }}
                  />
                  <div
                    className="text-xs uppercase tracking-wider font-semibold"
                    style={{ color: 'var(--color-sage-600)' }}
                  >
                    {m.category}
                  </div>
                </div>
                <h3 className="font-display text-xl mb-2">{m.title}</h3>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <Chip tone="sand">
                    <Clock className="w-3 h-3" /> {m.duration} min
                  </Chip>
                  <Chip>{m.bodyArea}</Chip>
                  {m.balanceSupport && <Chip tone="ivory">balance support</Chip>}
                </div>
                <ol className="space-y-2 mb-3 text-sm">
                  {m.instructions.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold shrink-0"
                        style={{
                          backgroundColor: 'var(--color-sage-100)',
                          color: 'var(--color-sage-800)',
                        }}
                      >
                        {i + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <div
                  className="mt-2 text-sm"
                  style={{ color: 'var(--color-ink-500)' }}
                >
                  <div>
                    <strong>Caregiver:</strong> {m.caregiverAssist}
                  </div>
                  <div className="mt-1">
                    <strong>Caution:</strong> {m.caution}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
