import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Sparkles,
  Apple,
  Brain,
  Footprints,
  NotebookPen,
  BookOpen,
  Phone,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  Award,
  Heart,
  ClipboardList,
  Compass,
} from 'lucide-react'
import { usePreferences } from '@/lib/preferences'
import { useProgress } from '@/lib/progress'
import { useJournal } from '@/lib/journal'
import { useWorkbook } from '@/lib/program'
import { planForDay } from '@/content/curriculum'
import { CLINIC, telHref } from '@/lib/clinic'
import { HealthieReminder } from '@/components/HealthieReminder'

export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
})

const smsAmberHref =
  'sms:' +
  CLINIC.phoneRaw +
  '?&body=' +
  encodeURIComponent(
    'Hi Amber, I need help understanding my action plan and next steps in Healthie.',
  )

function Dashboard() {
  const { prefs } = usePreferences()
  const { isTaskDone } = useProgress()
  const { today, entryFor } = useJournal()
  const { state, ready } = useWorkbook(prefs.startDate, prefs.patientName)

  if (!ready) return null

  const plan = planForDay(state.currentDay)
  const firstTime = state.daysCompleted === 0
  const entry = entryFor(today)

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  // The 5 visible steps shown on the dashboard preview.
  // (The Today page also includes Breathwork as a quiet 6th micro-step,
  // and Completion as the closing reward.)
  const steps = [
    {
      n: 1,
      icon: BookOpen,
      label: "Today's lesson",
      title: plan.lessonTitle,
      done: isTaskDone(state.currentDay, 'lesson'),
    },
    {
      n: 2,
      icon: Apple,
      label: 'Eat a brain-kind meal',
      title: plan.meals.breakfast.name,
      done: isTaskDone(state.currentDay, 'recipe'),
    },
    {
      n: 3,
      icon: Brain,
      label: 'Play a brain game',
      title: plan.game.title,
      done: isTaskDone(state.currentDay, 'game'),
    },
    {
      n: 4,
      icon: Footprints,
      label: 'Move gently',
      title: plan.movement,
      done: isTaskDone(state.currentDay, 'movement'),
    },
    {
      n: 5,
      icon: NotebookPen,
      label: 'Write one sentence',
      title: plan.journalPrompt.prompt,
      done: isTaskDone(state.currentDay, 'journal'),
    },
  ]

  const doneCount = steps.filter((s) => s.done).length
  const allDone = doneCount === 5

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Welcome */}
      <div className="mb-3">
        <div
          className="eyebrow"
          style={{ color: 'var(--sage-700)', fontSize: '0.82rem' }}
        >
          {greeting}
        </div>
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(1.7rem, 1.1rem + 2vw, 2.4rem)',
            lineHeight: 1.12,
            color: 'var(--ink-900)',
            letterSpacing: '-0.01em',
          }}
        >
          {firstTime ? `Welcome, ${prefs.patientName}.` : `Welcome back, ${prefs.patientName}.`}
        </h1>
        <p
          className="mt-2"
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.5,
            color: 'var(--ink-700)',
          }}
        >
          You are on{' '}
          <strong style={{ color: 'var(--ink-900)' }}>
            Week {state.currentWeek}
          </strong>{' '}
          ·{' '}
          <strong style={{ color: 'var(--ink-900)' }}>
            Day {state.currentDay}
          </strong>
          .
        </p>
      </div>

      {/* This is what we're working on today */}
      <section
        className="rounded-3xl p-5 sm:p-6 mb-5"
        style={{
          background:
            'linear-gradient(160deg, var(--sand-50) 0%, var(--cream) 50%, var(--sage-100) 100%)',
          border: '1px solid rgba(141,170,145,0.35)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div
          className="eyebrow mb-1"
          style={{ color: 'var(--sage-700)', fontSize: '0.82rem' }}
        >
          This is what we're working on today
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(1.35rem, 1rem + 1.4vw, 1.8rem)',
            lineHeight: 1.2,
            color: 'var(--ink-900)',
          }}
        >
          {plan.title.split('—')[0].trim()}
        </h2>
        <p
          className="mt-2"
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.55,
            color: 'var(--ink-700)',
          }}
        >
          {plan.welcomeMessage}
        </p>
        {firstTime && (
          <div
            className="mt-3 rounded-xl p-3"
            style={{
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid var(--sage-200)',
              fontSize: '0.95rem',
              color: 'var(--ink-700)',
              lineHeight: 1.5,
            }}
          >
            Day 1 starts gently: a warm welcome from the clinic, your first
            Pantry Audit, one small step to lighten your home, and your first
            healthy meals. You will earn your first progress badge today.
          </div>
        )}
        {firstTime && (
          <Link
            to="/start-here"
            className="btn-secondary mt-3 inline-flex"
            style={{ minHeight: 44 }}
          >
            <Compass className="w-4 h-4" />
            Read "Start Here" first (3 min)
          </Link>
        )}
      </section>

      {/* Today's 5 steps */}
      <section className="mb-5">
        <div className="flex items-baseline justify-between mb-3">
          <h2
            className="font-display"
            style={{
              fontSize: '1.3rem',
              color: 'var(--ink-900)',
              lineHeight: 1.2,
            }}
          >
            Today's 5 steps
          </h2>
          <div
            style={{
              fontSize: '0.88rem',
              color: 'var(--ink-500)',
            }}
          >
            {doneCount} of 5 done
          </div>
        </div>

        <ol className="space-y-2.5 list-none p-0 m-0">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl p-4 flex items-start gap-3"
              style={{
                background: s.done ? 'rgba(122, 158, 122, 0.08)' : 'white',
                border: s.done
                  ? '1px solid rgba(122, 158, 122, 0.35)'
                  : '1px solid var(--sage-200)',
              }}
            >
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  background: s.done ? 'var(--sage-600)' : 'white',
                  color: s.done ? 'white' : 'var(--sage-800)',
                  border: '2px solid var(--sage-500)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-display)',
                }}
                aria-hidden
              >
                {s.done ? '✓' : s.n}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="eyebrow"
                  style={{ color: 'var(--sage-600)', fontSize: '0.72rem' }}
                >
                  Step {s.n} · {s.label}
                </div>
                <div
                  className="font-display mt-0.5"
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--ink-900)',
                    lineHeight: 1.3,
                  }}
                >
                  {s.title}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* The single primary CTA */}
      <Link
        to="/today"
        className="btn-primary"
        style={{
          width: '100%',
          minHeight: 64,
          padding: '1.1rem 1.4rem',
          fontSize: '1.15rem',
          fontWeight: 700,
          marginBottom: '1.25rem',
        }}
      >
        <Sparkles className="w-5 h-5" />
        {firstTime
          ? 'Start Today'
          : allDone
            ? 'Finish Today'
            : doneCount > 0
              ? `Continue Day ${state.currentDay}`
              : 'Start Today'}
        <ArrowRight className="w-5 h-5" />
      </Link>

      {/* Encouragement */}
      <p
        className="text-center mb-6"
        style={{
          color: 'var(--sage-800)',
          fontSize: '1rem',
          fontStyle: 'italic',
          lineHeight: 1.5,
        }}
      >
        {firstTime
          ? "You're doing great. One step today matters."
          : entry.thoughts
            ? "Progress beats perfection. We're here to help."
            : "You're doing great. One step today matters."}
      </p>

      {/* Progress + badge */}
      <div
        className="rounded-2xl p-4 sm:p-5 mb-6"
        style={{
          background: 'white',
          border: '1px solid var(--sage-200)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="rounded-full flex items-center justify-center shrink-0"
            style={{
              width: 44,
              height: 44,
              background: 'var(--sand-100)',
            }}
          >
            <Award className="w-5 h-5" style={{ color: 'var(--sand-700)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="eyebrow"
              style={{ color: 'var(--sand-700)', fontSize: '0.78rem' }}
            >
              Your progress
            </div>
            <div
              className="font-display"
              style={{ fontSize: '1.15rem', color: 'var(--ink-900)', lineHeight: 1.2 }}
            >
              {state.daysCompleted} of {state.totalDays} days · {state.percentComplete}%
            </div>
          </div>
        </div>
        <div className="progress-track" style={{ height: 12 }}>
          <div
            className="progress-fill"
            style={{ width: `${state.percentComplete}%` }}
          />
        </div>
        <p
          className="mt-3"
          style={{
            fontSize: '0.95rem',
            color: 'var(--ink-700)',
            lineHeight: 1.5,
          }}
        >
          {state.daysCompleted === 0
            ? 'Finish Day 1 to earn your first progress badge.'
            : state.streak > 1
              ? `${state.streak} days in a row — beautifully consistent.`
              : 'Every day you show up, a leaf grows in your garden.'}
        </p>
      </div>

      {/* Healthie portal reminder — Action Plan + Session Notes */}
      <div className="mb-6">
        <HealthieReminder variant="full" />
      </div>

      {/* Patient help — quiet, single row */}
      <div className="mb-2">
        <div
          className="eyebrow mb-2"
          style={{ color: 'var(--ink-500)', fontSize: '0.78rem' }}
        >
          We're here to help
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <a href={telHref} className="help-tile" style={{ background: 'var(--sage-50)' }}>
            <div className="help-tile-icon" style={{ background: 'var(--sage-200)' }}>
              <Phone className="w-4 h-4" style={{ color: 'var(--sage-800)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="help-tile-title">Call Clinic</div>
              <div className="help-tile-sub">{CLINIC.phoneDisplay}</div>
            </div>
          </a>
          <a
            href={smsAmberHref}
            className="help-tile"
            style={{ background: 'var(--cream-warm)' }}
          >
            <div
              className="help-tile-icon"
              style={{ background: 'var(--sand-100)' }}
            >
              <MessageCircle className="w-4 h-4" style={{ color: 'var(--sand-700)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="help-tile-title">Text Amber</div>
              <div className="help-tile-sub">A real person, fast</div>
            </div>
          </a>
          <Link
            to="/action-plan"
            className="help-tile"
            style={{ background: 'var(--sage-50)' }}
          >
            <div
              className="help-tile-icon"
              style={{ background: 'var(--sage-200)' }}
            >
              <ClipboardList className="w-4 h-4" style={{ color: 'var(--sage-800)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="help-tile-title">Help With My Notes</div>
              <div className="help-tile-sub">Find your action plan</div>
            </div>
          </Link>
          <a
            href={CLINIC.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="help-tile"
            style={{ background: 'var(--teal-50)' }}
          >
            <div
              className="help-tile-icon"
              style={{ background: 'var(--teal-100)' }}
            >
              <ExternalLink className="w-4 h-4" style={{ color: 'var(--teal-700)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="help-tile-title">Open Healthie</div>
              <div className="help-tile-sub">Secure portal</div>
            </div>
          </a>
        </div>
      </div>

      {/* Reassurance footer */}
      <div
        className="mt-6 text-center"
        style={{ color: 'var(--ink-500)', fontSize: '0.92rem', lineHeight: 1.55 }}
      >
        <Heart
          className="w-4 h-4 inline-block mr-1 align-text-bottom"
          style={{ color: 'var(--sand-500)' }}
        />
        We're here to help. Progress beats perfection.
      </div>
    </div>
  )
}
