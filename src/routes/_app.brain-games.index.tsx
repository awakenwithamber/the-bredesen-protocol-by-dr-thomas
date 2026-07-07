import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Clock,
  Sparkles,
} from 'lucide-react'
import { brainGames } from '@/content/brainGames'
import { DAILY_GAMES, dailyGameForDay } from '@/content/dailyGames'
import { useWorkbook } from '@/lib/program'
import { useProgress } from '@/lib/progress'
import { usePreferences } from '@/lib/preferences'
import { Card, Chip, SectionHeading } from '@/components/ui'

export const Route = createFileRoute('/_app/brain-games/')({
  component: GamesIndex,
})

function GamesIndex() {
  const { prefs } = usePreferences()
  const { state, ready } = useWorkbook(prefs.startDate, prefs.patientName)
  const { isTaskDone, markComplete, unmarkComplete } = useProgress()

  const [seconds, setSeconds] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (!running || seconds === null) return
    if (seconds <= 0) {
      setRunning(false)
      return
    }
    const t = setTimeout(() => setSeconds((s) => (s ?? 1) - 1), 1000)
    return () => clearTimeout(t)
  }, [running, seconds])

  if (!ready) return null

  const day = state.currentDay
  const todays = dailyGameForDay(day)
  const done = isTaskDone(day, 'game')

  function startTimer() {
    if (!todays.timerSeconds) return
    setSeconds(todays.timerSeconds)
    setRunning(true)
  }

  function markGameDone() {
    if (done) {
      unmarkComplete(day, 'game')
      setShowCelebration(false)
    } else {
      markComplete(day, 'game')
      setShowCelebration(true)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
      <Link
        to="/today"
        className="inline-flex items-center gap-1.5 text-sm mb-3"
        style={{ color: 'var(--ink-500)' }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Today
      </Link>

      {/* Today's game — featured */}
      <div
        className="eyebrow"
        style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
      >
        Today's brain game · {todays.category}
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
        {todays.shortIntro}
      </p>

      <Card variant="sage" className="mt-4">
        <ol className="space-y-2.5">
          {todays.instructions.map((s, i) => (
            <li key={i} className="flex gap-3">
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
              <span
                style={{
                  color: 'var(--ink-900)',
                  fontSize: '1rem',
                  lineHeight: 1.55,
                }}
              >
                {s}
              </span>
            </li>
          ))}
        </ol>

        {todays.timerSeconds && (
          <div
            className="mt-4 rounded-xl p-3 flex items-center gap-3"
            style={{
              background: 'white',
              border: '1px solid var(--sage-300)',
            }}
          >
            <Clock className="w-5 h-5 shrink-0" style={{ color: 'var(--sage-700)' }} />
            <div className="flex-1">
              <div
                className="font-display"
                style={{ color: 'var(--ink-900)', fontSize: '0.98rem' }}
              >
                Optional timer · {todays.timerSeconds} seconds
              </div>
              {seconds !== null && (
                <div
                  style={{
                    color: 'var(--sage-700)',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                  }}
                >
                  {seconds > 0 ? `${seconds} seconds left` : 'Time! Take a slow breath.'}
                </div>
              )}
            </div>
            <button
              onClick={startTimer}
              className="btn-secondary"
              style={{ minHeight: 40, padding: '0.45rem 0.85rem', fontSize: '0.88rem' }}
            >
              {running ? 'Restart' : 'Start'}
            </button>
          </div>
        )}

        {todays.scoringHint && (
          <p
            className="mt-3"
            style={{ color: 'var(--ink-500)', fontSize: '0.88rem' }}
          >
            <Sparkles className="inline w-3.5 h-3.5 mr-1" /> {todays.scoringHint}
          </p>
        )}

        {todays.caregiverTip && (
          <div
            className="mt-3 rounded-xl p-3"
            style={{
              background: 'var(--cream-50)',
              border: '1px solid var(--ink-200)',
              fontSize: '0.92rem',
              color: 'var(--ink-700)',
            }}
          >
            <strong>Caregiver:</strong> {todays.caregiverTip}
          </div>
        )}
      </Card>

      {showCelebration && (
        <Card variant="warm" className="mt-4">
          <div
            className="eyebrow"
            style={{ color: 'var(--sand-700)', fontSize: '0.78rem' }}
          >
            Beautifully done
          </div>
          <p
            className="font-display mt-1"
            style={{ color: 'var(--ink-900)', fontSize: '1.1rem', lineHeight: 1.4 }}
          >
            {todays.encouragement}
          </p>
        </Card>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={markGameDone}
          className={done ? 'btn-secondary' : 'btn-primary'}
          style={{ minHeight: 48, padding: '0.7rem 1rem', fontSize: '1rem' }}
        >
          <Check className="w-4 h-4" />
          {done ? "I'll mark it not done" : "I finished today's game"}
        </button>
        <Link
          to="/today"
          className="btn-secondary"
          style={{ minHeight: 48, padding: '0.7rem 1rem', fontSize: '0.95rem' }}
        >
          Back to Today <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

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
          See the rotating set of ten daily games
        </summary>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {DAILY_GAMES.map((g) => (
            <div
              key={g.id}
              className="rounded-2xl p-3"
              style={{
                background: g.id === todays.id ? 'var(--sage-50)' : 'white',
                border: `1px solid ${g.id === todays.id ? 'var(--sage-300)' : 'var(--sage-200)'}`,
              }}
            >
              <div
                className="eyebrow"
                style={{ color: 'var(--sage-700)', fontSize: '0.72rem' }}
              >
                {g.category}
              </div>
              <div
                className="font-display mt-1"
                style={{ fontSize: '1rem', color: 'var(--ink-900)', lineHeight: 1.3 }}
              >
                {g.title}
              </div>
              <p
                className="mt-1"
                style={{
                  color: 'var(--ink-700)',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                }}
              >
                {g.shortIntro}
              </p>
            </div>
          ))}
        </div>
      </details>

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
          Browse the full brain-games library
        </summary>
        <div className="mt-4">
          <SectionHeading
            title="Brain games library"
            description="Participation matters more than score. Every game has an easier and harder version."
          />
          <div className="grid md:grid-cols-2 gap-5">
            {brainGames.map((g) => (
              <Link
                key={g.id}
                to="/brain-games/$id"
                params={{ id: g.id }}
                className="block"
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain
                      className="w-4 h-4"
                      style={{ color: 'var(--color-sage-600)' }}
                    />
                    <div
                      className="text-xs uppercase tracking-wider font-semibold"
                      style={{ color: 'var(--color-sage-600)' }}
                    >
                      {g.category}
                    </div>
                  </div>
                  <h3 className="font-display text-xl mb-2">{g.title}</h3>
                  <p
                    className="mb-3"
                    style={{ color: 'var(--color-ink-500)' }}
                  >
                    {g.objective}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Chip tone="sand">
                      <Clock className="w-3 h-3" /> {g.duration} min
                    </Chip>
                    <Chip>{g.difficulty.replace('-', ' ')}</Chip>
                    {g.printable && <Chip tone="ivory">printable</Chip>}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
