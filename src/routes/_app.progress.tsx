import { createFileRoute, Link } from '@tanstack/react-router'
import { usePreferences } from '@/lib/preferences'
import { useProgress } from '@/lib/progress'
import { useJournal } from '@/lib/journal'
import { useWorkbook, formatFriendly } from '@/lib/program'
import { Card, SectionHeading, Leaves } from '@/components/ui'
import {
  Flame,
  Sparkles,
  BookOpen,
  Apple,
  Footprints,
  HeartPulse,
  Brain,
  ClipboardList,
  NotebookPen,
  Sunrise,
  TreePine,
} from 'lucide-react'
import { milestones } from '@/content/library'

export const Route = createFileRoute('/_app/progress')({
  component: ProgressPage,
})

function ProgressPage() {
  const { prefs } = usePreferences()
  const { store } = useProgress()
  const { journalStreak, totalEntries } = useJournal()
  const { state, ready } = useWorkbook(prefs.startDate, prefs.patientName)
  if (!ready) return null

  const byKind = (kind: string) =>
    store.completions.filter((c) => c.task === kind).length

  const stats = [
    { icon: BookOpen, label: 'Lessons read', value: byKind('lesson') },
    { icon: Apple, label: 'Meals logged', value: byKind('recipe') },
    { icon: Footprints, label: 'Movement sessions', value: byKind('movement') },
    { icon: HeartPulse, label: 'Breath practices', value: byKind('breathwork') },
    { icon: Brain, label: 'Brain games', value: byKind('game') },
    { icon: ClipboardList, label: 'Check-ins', value: byKind('checkin') },
    { icon: NotebookPen, label: 'Journal entries', value: totalEntries },
  ]

  const reached = milestones.filter((m) => state.daysCompleted >= m.day)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="Your progress"
        title="You are building consistency."
        description="This is not a scoreboard. It is a quiet way to see everything you have shown up for."
      />

      {/* Sunrise meter */}
      <Card variant="warm" className="mb-6 overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Sunrise className="w-5 h-5" style={{ color: 'var(--sand-700)' }} />
          <div className="eyebrow" style={{ color: 'var(--sand-700)' }}>
            Your sunrise
          </div>
        </div>
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div
              className="font-display"
              style={{
                fontSize: '3.75rem',
                color: 'var(--sand-700)',
                lineHeight: 1,
              }}
            >
              {state.percentComplete}%
            </div>
            <div className="text-caption mt-1">
              of your 6-month journey · Day {state.daysCompleted} of{' '}
              {state.totalDays}
            </div>
            <div className="mt-4 progress-track">
              <div
                className="progress-fill"
                style={{ width: `${state.percentComplete}%` }}
              />
            </div>
            <div className="mt-3 text-body">
              Small steps are adding up. Keep going — at your own pace.
            </div>
          </div>
          <SunriseVisual percent={state.percentComplete} />
        </div>
      </Card>

      {/* Streak + Journal streak */}
      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <Card variant="sage">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5" style={{ color: 'var(--sand-500)' }} />
            <div className="eyebrow">Current streak</div>
          </div>
          <div
            className="font-display"
            style={{ fontSize: '3rem', color: 'var(--sage-800)', lineHeight: 1 }}
          >
            {store.streakDays}
          </div>
          <div className="text-caption mt-1">
            {store.streakDays === 0
              ? 'Ready to begin again? Every streak starts with today.'
              : store.streakDays < 7
              ? 'A lovely start. Keep the rhythm gentle.'
              : 'A real rhythm is here. Beautiful.'}
          </div>
        </Card>

        <Card variant="sky">
          <div className="flex items-center gap-2 mb-2">
            <NotebookPen className="w-5 h-5" style={{ color: 'var(--teal-700)' }} />
            <div className="eyebrow" style={{ color: 'var(--teal-700)' }}>
              Journal streak
            </div>
          </div>
          <div
            className="font-display"
            style={{ fontSize: '3rem', color: 'var(--teal-700)', lineHeight: 1 }}
          >
            {journalStreak()}
          </div>
          <div className="text-caption mt-1">
            {journalStreak() === 0
              ? 'One line in your journal starts the streak.'
              : 'You are keeping a quiet record of your days.'}
          </div>
        </Card>
      </div>

      {/* The growing tree */}
      <SectionHeading title="Your growing tree" />
      <Card variant="sage" className="mb-8">
        <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center">
          <GrowingTree days={state.daysCompleted} />
          <div>
            <p className="text-body">
              Your tree grows with every day you show up. Leaves unfold as the
              weeks pass — then small blossoms, then quiet fruit.
            </p>
            <div className="mt-4 flex gap-4 flex-wrap text-caption">
              <span>
                <strong>{state.daysCompleted}</strong> days of care
              </span>
              <span>
                <strong>{store.completions.length}</strong> small actions logged
              </span>
              <span>
                <strong>{reached.length}</strong> milestones reached
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Counts */}
      <SectionHeading title="What you have done" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-5 h-5" style={{ color: 'var(--sage-700)' }} />
              <div className="eyebrow">{s.label}</div>
            </div>
            <div
              className="font-display"
              style={{
                fontSize: '2.25rem',
                color: 'var(--ink-900)',
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Garden */}
      <SectionHeading title="Your garden of leaves" />
      <Card variant="sky" className="mb-8">
        <p className="text-body mb-4">
          A leaf for every day you have shown up. {state.daysCompleted} leaves so
          far, of 180.
        </p>
        <Leaves
          count={Math.min(180, Math.max(14, state.daysCompleted + 6))}
          lit={state.daysCompleted}
        />
        <div className="text-caption mt-4">
          Program dates:{' '}
          <strong>{formatFriendly(state.startDate)}</strong> →{' '}
          <strong>{formatFriendly(state.endDate)}</strong>
        </div>
      </Card>

      {/* Milestones */}
      <SectionHeading title="Milestones along the way" />
      <div className="grid md:grid-cols-2 gap-4">
        {milestones.map((m) => {
          const isReached = reached.includes(m)
          return (
            <div
              key={m.day}
              className="rounded-2xl p-5 border flex items-start gap-3"
              style={{
                backgroundColor: isReached ? 'var(--sage-100)' : 'white',
                borderColor: isReached
                  ? 'var(--sage-500)'
                  : 'rgba(141, 170, 145, 0.22)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <Sparkles
                className="w-5 h-5 mt-1 shrink-0"
                style={{
                  color: isReached ? 'var(--sage-700)' : 'var(--ink-300)',
                }}
              />
              <div>
                <div className="eyebrow">Day {m.day}</div>
                <div className="text-cardtitle" style={{ fontSize: '1.25rem' }}>
                  {m.title}
                </div>
                <div className="text-body mt-1" style={{ fontSize: '1.05rem' }}>
                  {m.message}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/today" className="btn-primary">
          Take today's next step
        </Link>
        <Link to="/journal" className="btn-secondary">
          Open my journal
        </Link>
        <button className="btn-secondary" onClick={() => window.print()}>
          Print this page
        </button>
      </div>
    </div>
  )
}

function SunriseVisual({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent))
  // The sun sits lower (more hidden) at low %, higher at high %
  const bottomVh = -18 + (clamped / 100) * 70 // from -18% to +52%
  return (
    <div
      aria-hidden
      className="sunrise-wrap"
      style={{ width: 220, paddingBottom: '100px', position: 'relative' }}
    >
      <div className="sunrise-sun" style={{ bottom: `${bottomVh}%` }} />
      <div className="sunrise-horizon" />
    </div>
  )
}

function GrowingTree({ days }: { days: number }) {
  // Canopy fills green and grows as days progress
  const stage = Math.min(6, Math.floor(days / 30)) // 0..6
  const canopyColor =
    stage === 0
      ? 'rgba(141,170,145,0.25)'
      : stage === 1
      ? 'var(--sage-300)'
      : stage === 2
      ? 'var(--sage-400)'
      : stage === 3
      ? 'var(--sage-500)'
      : stage === 4
      ? 'var(--sage-600)'
      : stage === 5
      ? 'var(--sage-700)'
      : 'var(--sage-800)'

  const trunkHeight = 60 + stage * 12 // 60..132
  const canopyScale = 0.7 + stage * 0.08

  return (
    <div
      aria-hidden
      className="tree"
      style={{ minWidth: 220, height: 240 }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <TreePine
          style={{
            width: 140 * canopyScale,
            height: 140 * canopyScale,
            color: canopyColor,
            marginBottom: -12,
            filter: 'drop-shadow(0 8px 16px rgba(88,115,95,0.25))',
          }}
        />
        <div
          style={{
            width: 14,
            height: trunkHeight,
            background:
              'linear-gradient(180deg, #a98760 0%, #6b4e2e 100%)',
            borderRadius: 6,
          }}
        />
        <div
          style={{
            width: 120,
            height: 10,
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(88,115,95,0.35) 0%, transparent 70%)',
            marginTop: 4,
          }}
        />
      </div>
    </div>
  )
}
