import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Brain,
  Check,
  ChevronRight,
  ClipboardList,
  Footprints,
  Heart,
  Home,
  Leaf,
  Moon,
  NotebookPen,
  Pause,
  Play,
  Quote as QuoteIcon,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react'
import { usePreferences } from '@/lib/preferences'
import { useProgress } from '@/lib/progress'
import type { TaskKind } from '@/lib/progress'
import { useWorkbook } from '@/lib/program'
import { planForDay } from '@/content/curriculum'
import { useJournal } from '@/lib/journal'
import { workoutForDay } from '@/content/seatedWorkouts'
import { dailyGameForDay } from '@/content/dailyGames'
import { Card } from '@/components/ui'

export const Route = createFileRoute('/_app/today')({
  component: TodayPage,
})

function TodayPage() {
  const { prefs } = usePreferences()
  const {
    state,
    ready,
    completeDay,
    repeatDay,
    setPaused,
  } = useWorkbook(prefs.startDate, prefs.patientName)
  const { isTaskDone, markComplete, unmarkComplete } = useProgress()
  const { today, updateEntry, entryFor } = useJournal()

  const [quickNote, setQuickNote] = useState('')

  if (!ready) return null

  const day = state.currentDay
  const plan = planForDay(day)
  const workout = workoutForDay(day)
  const game = dailyGameForDay(day)
  const dayIsComplete = state.isDayComplete(day)
  const entry = entryFor(today)
  const journalText = quickNote || entry.thoughts || ''

  function toggleTask(task: TaskKind) {
    if (isTaskDone(day, task)) unmarkComplete(day, task)
    else markComplete(day, task)
  }

  function speak(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.95
    window.speechSynthesis.speak(u)
  }

  // The patient's six daily steps. Day 1 routes the lesson task to the
  // Pantry Audit module; Day 2 routes it to the Toxic Load module.
  type StepKey = 'lesson' | 'movement' | 'recipe' | 'game' | 'journal'
  const lessonHref =
    day === 1 ? '/pantry-audit' : day === 2 ? '/toxic-load' : '/learning'
  const lessonTitle =
    day === 1
      ? 'Day 1 — Kitchen Pantry Audit'
      : day === 2
        ? 'Day 2 — Simple Ways to Reduce Toxic Load'
        : plan.lessonTitle
  const lessonBlurb =
    day === 1
      ? 'A calm look at one shelf, in your own kitchen, on your own schedule.'
      : day === 2
        ? 'Six small swaps for a kinder home. Pick three.'
        : plan.lessonSummary

  const requiredTasks: TaskKind[] = ['lesson', 'movement', 'recipe', 'game', 'journal']
  const doneCount = requiredTasks.filter((t) => isTaskDone(day, t)).length
  const allCoreDone = doneCount === requiredTasks.length
  const ringPercent = Math.round((doneCount / requiredTasks.length) * 100)

  // The "next step" — the first incomplete task. Drives the big CTA so the
  // patient always sees one button: "do the next thing."
  const nextStep: StepKey | null = (() => {
    if (!isTaskDone(day, 'lesson')) return 'lesson'
    if (!isTaskDone(day, 'movement')) return 'movement'
    if (!isTaskDone(day, 'recipe')) return 'recipe'
    if (!isTaskDone(day, 'game')) return 'game'
    if (!isTaskDone(day, 'journal')) return 'journal'
    return null
  })()

  const nextStepCopy: Record<StepKey, { label: string; href: string }> = {
    lesson: { label: lessonTitle, href: lessonHref },
    movement: { label: `5-minute seated workout · ${workout.title}`, href: '/movement' },
    recipe: { label: 'Eat one brain-kind meal today', href: '/recipes' },
    game: { label: `Today's brain game · ${game.title}`, href: '/brain-games' },
    journal: { label: 'Reflect — one sentence is enough', href: '/journal' },
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
      {/* Quiet header — phase / week / day */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm mb-3"
        style={{ color: 'var(--ink-500)' }}
      >
        <ArrowLeft className="w-4 h-4" /> Dashboard
      </Link>

      <div
        className="eyebrow"
        style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
      >
        Week {plan.week} · Day {plan.day} of 168 · {plan.theme}
      </div>
      <h1
        className="font-display mt-1"
        style={{
          fontSize: 'clamp(1.6rem, 1.1rem + 1.8vw, 2.2rem)',
          lineHeight: 1.15,
          color: 'var(--ink-900)',
        }}
      >
        {dayIsComplete ? `Day ${day} — beautifully done.` : `Today, ${prefs.patientName ?? 'friend'}.`}
      </h1>
      <p
        className="mt-2"
        style={{ color: 'var(--ink-700)', fontSize: '1.02rem' }}
      >
        {dayIsComplete
          ? 'You finished today. The next day will unlock when you are ready.'
          : plan.welcomeMessage}
      </p>

      {/* The single Next Step CTA — the heart of the page */}
      {!dayIsComplete && nextStep && (
        <Card variant="sage" className="mt-4">
          <div
            className="eyebrow"
            style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
          >
            Your next small step
          </div>
          <div
            className="font-display mt-1"
            style={{
              fontSize: '1.18rem',
              lineHeight: 1.3,
              color: 'var(--ink-900)',
            }}
          >
            {nextStepCopy[nextStep].label}
          </div>
          <Link
            to={nextStepCopy[nextStep].href}
            className="btn-primary mt-3"
            style={{
              minHeight: 56,
              padding: '0.9rem 1.2rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              width: '100%',
              justifyContent: 'center',
            }}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p
            className="mt-2 text-caption"
            style={{ color: 'var(--ink-500)', fontSize: '0.85rem' }}
          >
            {doneCount} of {requiredTasks.length} done · about{' '}
            {Math.max(5, 25 - doneCount * 5)} minutes left today
          </p>
        </Card>
      )}

      {/* Today's quote */}
      <Card variant="warm" className="mt-4">
        <div className="flex items-start gap-3">
          <QuoteIcon
            className="w-4 h-4 mt-1 shrink-0"
            style={{ color: 'var(--sand-700)' }}
          />
          <div>
            <p
              className="font-display"
              style={{ fontSize: '1.02rem', lineHeight: 1.4, color: 'var(--ink-900)' }}
            >
              "{plan.quote.text}"
            </p>
            {plan.quote.attribution && (
              <p
                className="mt-1"
                style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}
              >
                — {plan.quote.attribution}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Today's checklist — six small steps */}
      <section className="mt-5">
        <div
          className="flex items-end justify-between mb-2"
        >
          <div>
            <div
              className="eyebrow"
              style={{ color: 'var(--ink-500)', fontSize: '0.78rem' }}
            >
              Today's checklist
            </div>
            <h2
              className="font-display"
              style={{ fontSize: '1.2rem', color: 'var(--ink-900)' }}
            >
              Five small steps
            </h2>
          </div>
          <ProgressRing percent={ringPercent} />
        </div>

        <ul className="space-y-2.5">
          <Step
            n={1}
            icon={<ClipboardList className="w-4 h-4" />}
            title={lessonTitle}
            blurb={lessonBlurb}
            href={lessonHref}
            done={isTaskDone(day, 'lesson')}
            onToggle={() => toggleTask('lesson')}
          />
          <Step
            n={2}
            icon={<Footprints className="w-4 h-4" />}
            title={`5-minute seated workout · ${workout.title}`}
            blurb={workout.focus}
            href="/movement"
            done={isTaskDone(day, 'movement')}
            onToggle={() => toggleTask('movement')}
          />
          <Step
            n={3}
            icon={<Leaf className="w-4 h-4" />}
            title="One brain-kind meal"
            blurb={`${plan.meals.breakfast.name} · ${plan.meals.lunch.name} · ${plan.meals.dinner.name}`}
            href="/recipes"
            done={isTaskDone(day, 'recipe')}
            onToggle={() => toggleTask('recipe')}
          />
          <Step
            n={4}
            icon={<Brain className="w-4 h-4" />}
            title={`Brain game · ${game.title}`}
            blurb={game.shortIntro}
            href="/brain-games"
            done={isTaskDone(day, 'game')}
            onToggle={() => toggleTask('game')}
          />
          <Step
            n={5}
            icon={<NotebookPen className="w-4 h-4" />}
            title="Reflect — one sentence is enough"
            blurb={plan.journalPrompt.prompt}
            href="/journal"
            done={isTaskDone(day, 'journal')}
            onToggle={() => toggleTask('journal')}
          />
        </ul>
      </section>

      {/* Tiny inline journal — saves as you type */}
      {!dayIsComplete && (
        <Card variant="sky" className="mt-5">
          <div className="flex items-center gap-2 mb-1">
            <NotebookPen
              className="w-4 h-4"
              style={{ color: 'var(--teal-700)' }}
            />
            <div
              className="eyebrow"
              style={{ color: 'var(--teal-700)', fontSize: '0.78rem' }}
            >
              A note for today (saves as you type)
            </div>
          </div>
          <p
            className="font-display"
            style={{ fontSize: '1rem', color: 'var(--ink-900)' }}
          >
            {plan.journalPrompt.prompt}
          </p>
          <textarea
            className="mt-2 w-full rounded-xl p-3"
            style={{
              border: '1px solid var(--sage-200)',
              background: 'white',
              fontSize: '1rem',
              minHeight: 80,
              lineHeight: 1.5,
              color: 'var(--ink-900)',
            }}
            placeholder="One sentence is a whole entry."
            value={journalText}
            onChange={(e) => {
              const v = e.target.value
              setQuickNote(v)
              updateEntry(today, { thoughts: v })
            }}
          />
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {journalText.trim() && (
              <button
                onClick={() => markComplete(day, 'journal')}
                className="btn-secondary"
                style={{
                  padding: '0.45rem 0.85rem',
                  minHeight: 38,
                  fontSize: '0.88rem',
                }}
              >
                Mark journal done
              </button>
            )}
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '0.78rem',
                color: 'var(--ink-500)',
              }}
            >
              Saved automatically
            </span>
          </div>
        </Card>
      )}

      {/* Complete-day button (appears when patient is ready) */}
      {!dayIsComplete && (
        <div className="mt-5">
          <button
            onClick={() => completeDay(day)}
            className={allCoreDone ? 'btn-primary' : 'btn-secondary'}
            style={{
              width: '100%',
              minHeight: 52,
              padding: '0.85rem 1.2rem',
              fontSize: '1rem',
              fontWeight: 700,
              justifyContent: 'center',
            }}
          >
            <Check className="w-5 h-5" />
            {allCoreDone
              ? `I finished today — complete Day ${day}`
              : `I'm done for today — save my progress`}
          </button>
          <p
            className="mt-2 text-caption text-center"
            style={{ color: 'var(--ink-500)', fontSize: '0.85rem' }}
          >
            Partial days count. You can return anytime.
          </p>
        </div>
      )}

      {dayIsComplete && (
        <Card variant="sage" className="mt-5 text-center">
          <div
            className="rounded-full mx-auto flex items-center justify-center"
            style={{
              width: 72,
              height: 72,
              background:
                'radial-gradient(circle, var(--sand-100) 0%, var(--sage-100) 80%)',
              border: '3px solid var(--sage-500)',
            }}
          >
            <Award className="w-9 h-9" style={{ color: 'var(--sage-700)' }} />
          </div>
          <div
            className="eyebrow mt-3"
            style={{ color: 'var(--sand-700)', fontSize: '0.82rem' }}
          >
            {day === 1 ? 'Your first win' : `Day ${day} complete`}
          </div>
          <h3
            className="font-display mt-1"
            style={{ fontSize: '1.3rem', color: 'var(--ink-900)' }}
          >
            {day === 1 ? 'Beautiful — Day 1 is done.' : `Day ${day} complete.`}
          </h3>
          <p
            className="mt-2"
            style={{
              color: 'var(--ink-700)',
              fontSize: '1rem',
              maxWidth: '40ch',
              margin: '0.5rem auto 0',
            }}
          >
            {plan.tomorrowPreview}
          </p>
          {state.nextDay && (
            <Link
              to="/today"
              className="btn-primary mt-4"
              style={{ minHeight: 48 }}
            >
              Open Day {state.nextDay}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </Card>
      )}

      {/* Tomorrow preview */}
      {!dayIsComplete && (
        <Card className="mt-5">
          <div
            className="eyebrow"
            style={{ color: 'var(--ink-500)', fontSize: '0.78rem' }}
          >
            Tomorrow
          </div>
          <p
            className="mt-1"
            style={{ color: 'var(--ink-700)', fontSize: '0.95rem' }}
          >
            {plan.tomorrowPreview}
          </p>
        </Card>
      )}

      {/* Caregiver tip — collapsed by default */}
      <details className="mt-5">
        <summary
          className="cursor-pointer rounded-xl px-3 py-2"
          style={{
            background: 'var(--cream-50)',
            border: '1px solid var(--sage-200)',
            color: 'var(--sage-800)',
            fontSize: '0.92rem',
            fontWeight: 600,
          }}
        >
          For a caregiver helping today
        </summary>
        <div
          className="mt-2 rounded-xl p-3"
          style={{ background: 'white', border: '1px solid var(--sage-200)' }}
        >
          <p style={{ color: 'var(--ink-700)', fontSize: '0.95rem' }}>
            {plan.caregiverTip}
          </p>
          <Link
            to="/caregiver"
            className="mt-2 inline-flex items-center gap-1 font-semibold"
            style={{ color: 'var(--teal-700)', fontSize: '0.9rem' }}
          >
            Open caregiver mode <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </details>

      {/* Helpful actions — small, calm */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Link
          to="/routines"
          className="btn-secondary"
          style={{ minHeight: 42, fontSize: '0.85rem' }}
        >
          <Moon className="w-4 h-4" /> Routines
        </Link>
        <Link
          to="/notes"
          className="btn-secondary"
          style={{ minHeight: 42, fontSize: '0.85rem' }}
        >
          <NotebookPen className="w-4 h-4" /> Notes for Dr. Thomas
        </Link>
        <button
          onClick={() => speak(`${plan.welcomeMessage}. ${plan.lessonTitle}. ${plan.lessonSummary}`)}
          className="btn-secondary"
          style={{ minHeight: 42, fontSize: '0.85rem' }}
        >
          <Volume2 className="w-4 h-4" /> Listen
        </button>
        <Link
          to="/dashboard"
          className="btn-secondary"
          style={{ minHeight: 42, fontSize: '0.85rem' }}
        >
          <Home className="w-4 h-4" /> Dashboard
        </Link>
      </div>

      {/* Patient controls — also collapsed */}
      <details className="mt-3">
        <summary
          className="cursor-pointer text-caption px-2 py-1"
          style={{
            color: 'var(--ink-500)',
            fontSize: '0.85rem',
          }}
        >
          More options
        </summary>
        <div className="mt-2 grid sm:grid-cols-3 gap-2">
          {dayIsComplete && (
            <button
              onClick={() => {
                if (
                  confirm(
                    `Repeat Day ${day}? Your completion will be cleared so you can work through today again.`,
                  )
                ) {
                  repeatDay(day)
                }
              }}
              className="btn-secondary"
              style={{ minHeight: 42, fontSize: '0.85rem' }}
            >
              <RotateCcw className="w-4 h-4" /> Repeat today
            </button>
          )}
          <button
            onClick={() => setPaused(!state.isPaused)}
            className="btn-secondary"
            style={{ minHeight: 42, fontSize: '0.85rem' }}
          >
            {state.isPaused ? (
              <>
                <Play className="w-4 h-4" /> Resume program
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" /> Pause program
              </>
            )}
          </button>
        </div>
      </details>

      {/* "I am having a hard day" — never aggressive, always present */}
      <div className="mt-6 text-center">
        <Link
          to="/hard-day"
          className="inline-flex items-center gap-1.5"
          style={{
            color: 'var(--sage-700)',
            fontSize: '0.92rem',
            textDecoration: 'underline',
          }}
        >
          <Heart className="w-4 h-4" /> Today feels heavy — open kind support
        </Link>
      </div>
    </div>
  )
}

function Step({
  n,
  icon,
  title,
  blurb,
  href,
  done,
  onToggle,
}: {
  n: number
  icon: React.ReactNode
  title: string
  blurb: string
  href: string
  done: boolean
  onToggle: () => void
}) {
  return (
    <li
      className="rounded-2xl p-3 flex items-start gap-3"
      style={{
        background: done ? 'rgba(122, 158, 122, 0.07)' : 'white',
        border: `1px solid ${done ? 'rgba(122, 158, 122, 0.4)' : 'var(--sage-200)'}`,
      }}
    >
      <button
        onClick={onToggle}
        aria-label={done ? `Mark ${title} not done` : `Mark ${title} done`}
        className="rounded-full w-10 h-10 flex items-center justify-center shrink-0"
        style={{
          background: done ? 'var(--sage-600)' : 'white',
          color: done ? 'white' : 'var(--sage-700)',
          border: '2px solid var(--sage-500)',
          fontWeight: 700,
          fontSize: '0.95rem',
        }}
      >
        {done ? <Check className="w-4 h-4" /> : n}
      </button>
      <div className="flex-1 min-w-0">
        <div
          className="flex items-center gap-1.5"
          style={{ color: 'var(--sage-700)' }}
        >
          {icon}
          <div
            className="eyebrow"
            style={{ color: 'var(--sage-700)', fontSize: '0.7rem' }}
          >
            Step {n}
          </div>
        </div>
        <Link
          to={href}
          className="block"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="font-display mt-0.5"
            style={{
              fontSize: '1rem',
              color: 'var(--ink-900)',
              lineHeight: 1.3,
            }}
          >
            {title}
          </div>
          <p
            className="mt-1"
            style={{
              color: 'var(--ink-700)',
              fontSize: '0.9rem',
              lineHeight: 1.5,
            }}
          >
            {blurb}
          </p>
          <div
            className="mt-1 inline-flex items-center gap-1 font-semibold"
            style={{ color: 'var(--sage-700)', fontSize: '0.85rem' }}
          >
            Open <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </li>
  )
}

function ProgressRing({ percent }: { percent: number }) {
  const size = 56
  const stroke = 6
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (percent / 100) * c
  return (
    <div
      style={{ position: 'relative', width: size, height: size }}
      aria-label={`${percent}% of today's checklist done`}
      role="img"
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(122, 158, 122, 0.18)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--sage-600)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.85rem',
          color: 'var(--sage-800)',
          fontWeight: 700,
        }}
      >
        {percent}%
        <Sparkles
          className="ml-0.5"
          style={{ width: 10, height: 10, color: 'var(--sand-700)' }}
        />
      </div>
    </div>
  )
}
