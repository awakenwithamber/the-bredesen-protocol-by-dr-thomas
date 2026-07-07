import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  Coffee,
  Moon,
  Sun,
  CalendarDays,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui'
import { useCheckSet } from '@/lib/checkSet'

export const Route = createFileRoute('/_app/routines')({
  component: RoutinesPage,
})

const MORNING = [
  'Drink a glass of water before anything else.',
  'Step outside for a minute of morning light.',
  'A simple breakfast, kind to the brain.',
  'One gratitude thought, said out loud.',
  'Five minutes of gentle movement.',
  'Read your daily plan in the workbook.',
]

const MIDDAY = [
  'A balanced lunch — slow, no screens.',
  'A short walk, or a seated movement break.',
  'Refill your water.',
  'Three slow breaths to reset.',
  'Tidy one small thing — a counter, a desk.',
]

const EVENING = [
  'A calm dinner.',
  'Dim the lights as the sun sets.',
  'Reduce screens for the last hour.',
  'Note one win from today, however small.',
  'Set out tomorrow’s plan.',
  'Sleep wind-down: warmth, quiet, kindness.',
]

const WEEKLY = [
  'Pantry refresh — one shelf at a time.',
  'Plan groceries before the week starts.',
  'A little meal prep — even one tray of vegetables helps.',
  'Review your progress with kindness, not judgment.',
  'Write down questions for Dr. Thomas.',
  'Reset one habit that is drifting.',
]

function RoutinesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
      <Link
        to="/today"
        className="inline-flex items-center gap-1.5 text-sm mb-3"
        style={{ color: 'var(--ink-500)' }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Today
      </Link>

      <div
        className="eyebrow"
        style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
      >
        Daily and weekly routines
      </div>
      <h1
        className="font-display mt-1"
        style={{
          fontSize: 'clamp(1.6rem, 1.1rem + 1.8vw, 2.2rem)',
          lineHeight: 1.15,
          color: 'var(--ink-900)',
        }}
      >
        Calm, brain-kind routines
      </h1>
      <p className="mt-2" style={{ color: 'var(--ink-700)', fontSize: '1.05rem' }}>
        These are gentle defaults. Use what helps. Skip what does not. Tick a
        box and it stays ticked.
      </p>

      <Routine
        storage="routine.morning"
        title="Morning"
        subtitle="A soft start"
        icon={<Sun className="w-5 h-5" style={{ color: 'var(--sand-700)' }} />}
        items={MORNING}
      />
      <Routine
        storage="routine.midday"
        title="Midday"
        subtitle="A small reset"
        icon={<Coffee className="w-5 h-5" style={{ color: 'var(--sage-700)' }} />}
        items={MIDDAY}
      />
      <Routine
        storage="routine.evening"
        title="Evening"
        subtitle="A quieter wind-down"
        icon={<Moon className="w-5 h-5" style={{ color: 'var(--teal-700)' }} />}
        items={EVENING}
      />
      <Routine
        storage="routine.weekly"
        title="Weekly"
        subtitle="A few habits, kept tidy"
        icon={
          <CalendarDays
            className="w-5 h-5"
            style={{ color: 'var(--sand-700)' }}
          />
        }
        items={WEEKLY}
      />

      <p
        className="mt-6"
        style={{
          color: 'var(--sage-700)',
          fontSize: '0.95rem',
          fontStyle: 'italic',
        }}
      >
        <Sparkles className="inline w-4 h-4 mr-1" /> Saved automatically.
        Routines beat motivation — and you do not have to do all of them today.
      </p>
    </div>
  )
}

function Routine({
  storage,
  title,
  subtitle,
  icon,
  items,
}: {
  storage: string
  title: string
  subtitle: string
  icon: React.ReactNode
  items: string[]
}) {
  const set = useCheckSet(storage)
  const done = items.filter((_, i) => set.isChecked(String(i))).length

  return (
    <Card className="mt-5">
      <div className="flex items-center gap-2">
        {icon}
        <div className="flex-1">
          <div
            className="font-display"
            style={{ color: 'var(--ink-900)', fontSize: '1.1rem' }}
          >
            {title}
          </div>
          <div
            className="text-caption"
            style={{ color: 'var(--ink-500)', fontSize: '0.82rem' }}
          >
            {subtitle} · {done}/{items.length} checked
          </div>
        </div>
      </div>
      <ul className="mt-3 space-y-1.5">
        {items.map((t, i) => {
          const checked = set.isChecked(String(i))
          return (
            <li key={t}>
              <button
                onClick={() => set.toggle(String(i))}
                className="w-full text-left rounded-xl px-3 py-2 flex items-start gap-3 transition-colors"
                style={{
                  border: '1px solid',
                  borderColor: checked
                    ? 'rgba(122, 158, 122, 0.4)'
                    : 'var(--sage-200)',
                  background: checked ? 'rgba(122, 158, 122, 0.08)' : 'white',
                }}
                aria-pressed={checked}
              >
                <span
                  className="rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    width: 22,
                    height: 22,
                    background: checked ? 'var(--sage-600)' : 'white',
                    border: `2px solid ${
                      checked ? 'var(--sage-600)' : 'var(--sage-400)'
                    }`,
                  }}
                  aria-hidden
                >
                  {checked && (
                    <span
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      ✓
                    </span>
                  )}
                </span>
                <span
                  style={{
                    color: 'var(--ink-900)',
                    fontSize: '0.96rem',
                    lineHeight: 1.5,
                  }}
                >
                  {t}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
