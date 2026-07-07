import type { PhaseLesson } from '@/content/phaseLessons'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  HelpCircle,
  ListChecks,
  MessageCircleQuestion,
  Sparkles,
  Stethoscope,
  Target,
  Users,
} from 'lucide-react'
import { Card } from './ui'
import { useState } from 'react'

const BUILT_IN_TRACKER_KEY = 'bredesen.builtInLesson.v1'

function readTracked(): Record<string, boolean> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(BUILT_IN_TRACKER_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeTracked(state: Record<string, boolean>) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(BUILT_IN_TRACKER_KEY, JSON.stringify(state))
  } catch {}
}

export function LessonView({ lesson }: { lesson: PhaseLesson }) {
  const [tracked, setTracked] = useState<Record<string, boolean>>(() =>
    readTracked(),
  )
  const [checks, setChecks] = useState<boolean[]>(() =>
    lesson.checklist.map(() => false),
  )

  function toggleCheck(i: number) {
    setChecks((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  function markLessonComplete() {
    const next = { ...tracked, [lesson.slug]: true }
    setTracked(next)
    writeTracked(next)
  }

  const isComplete = !!tracked[lesson.slug]

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Eyebrow */}
      <div
        className="eyebrow"
        style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
      >
        {lesson.eyebrow}
      </div>

      {/* Title */}
      <h1
        className="font-display mt-1"
        style={{
          fontSize: 'clamp(1.6rem, 1rem + 1.8vw, 2.25rem)',
          lineHeight: 1.15,
          color: 'var(--ink-900)',
        }}
      >
        {lesson.title}
      </h1>

      {/* Today's focus */}
      <Card variant="sage" className="mt-4">
        <div className="flex items-start gap-3">
          <Target
            className="w-5 h-5 mt-0.5 shrink-0"
            style={{ color: 'var(--sage-700)' }}
          />
          <div>
            <div
              className="eyebrow"
              style={{ color: 'var(--sage-700)', fontSize: '0.72rem' }}
            >
              Today's focus
            </div>
            <p
              className="mt-1"
              style={{ fontSize: '1.05rem', lineHeight: 1.5, color: 'var(--ink-900)' }}
            >
              {lesson.todaysFocus}
            </p>
          </div>
        </div>
      </Card>

      {/* Why this matters */}
      <section className="mt-5">
        <div className="flex items-center gap-2 mb-1">
          <HelpCircle className="w-4 h-4" style={{ color: 'var(--teal-700)' }} />
          <h2
            className="font-display"
            style={{ fontSize: '1.2rem', color: 'var(--ink-900)' }}
          >
            Why this matters
          </h2>
        </div>
        <p style={{ color: 'var(--ink-700)', fontSize: '1rem', lineHeight: 1.6 }}>
          {lesson.whyThisMatters}
        </p>
      </section>

      {/* Step-by-step */}
      <section className="mt-5">
        <div className="flex items-center gap-2 mb-2">
          <ListChecks className="w-4 h-4" style={{ color: 'var(--sage-700)' }} />
          <h2
            className="font-display"
            style={{ fontSize: '1.2rem', color: 'var(--ink-900)' }}
          >
            Step-by-step
          </h2>
        </div>
        <ol className="space-y-2.5 list-none p-0 m-0">
          {lesson.steps.map((step, i) => (
            <li
              key={i}
              className="rounded-2xl p-3.5 flex items-start gap-3"
              style={{
                background: 'white',
                border: '1px solid var(--sage-200)',
              }}
            >
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  background: 'var(--sage-100)',
                  color: 'var(--sage-800)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
                aria-hidden
              >
                {i + 1}
              </div>
              <p
                style={{
                  color: 'var(--ink-700)',
                  fontSize: '0.98rem',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Supportive note */}
      <Card variant="warm" className="mt-5">
        <div className="flex items-start gap-3">
          <Heart
            className="w-5 h-5 mt-0.5 shrink-0"
            style={{ color: 'var(--sand-700)' }}
          />
          <div>
            <div
              className="eyebrow"
              style={{ color: 'var(--sand-700)', fontSize: '0.72rem' }}
            >
              A gentle note
            </div>
            <p
              className="mt-1"
              style={{ color: 'var(--ink-900)', fontSize: '1rem', lineHeight: 1.55 }}
            >
              {lesson.supportiveNote}
            </p>
          </div>
        </div>
      </Card>

      {/* Checklist */}
      <section className="mt-5">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--sage-700)' }} />
          <h2
            className="font-display"
            style={{ fontSize: '1.2rem', color: 'var(--ink-900)' }}
          >
            Checklist
          </h2>
        </div>
        <ul className="space-y-2 list-none p-0 m-0">
          {lesson.checklist.map((item, i) => (
            <li key={i}>
              <button
                onClick={() => toggleCheck(i)}
                className="w-full text-left flex items-start gap-3 rounded-xl p-3 transition-colors"
                style={{
                  background: checks[i] ? 'rgba(122, 158, 122, 0.10)' : 'white',
                  border: `1px solid ${
                    checks[i] ? 'rgba(122, 158, 122, 0.35)' : 'var(--sage-200)'
                  }`,
                  cursor: 'pointer',
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{
                    width: 24,
                    height: 24,
                    background: checks[i] ? 'var(--sage-600)' : 'white',
                    border: '2px solid var(--sage-500)',
                    color: 'white',
                    fontSize: '0.8rem',
                    marginTop: 2,
                  }}
                  aria-hidden
                >
                  {checks[i] ? '✓' : ''}
                </div>
                <span
                  style={{
                    color: 'var(--ink-700)',
                    fontSize: '0.98rem',
                    lineHeight: 1.5,
                    textDecoration: checks[i] ? 'line-through' : 'none',
                  }}
                >
                  {item}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Caregiver note */}
      {lesson.caregiverNote && (
        <Card className="mt-5">
          <div className="flex items-start gap-3">
            <Users
              className="w-5 h-5 mt-0.5 shrink-0"
              style={{ color: 'var(--teal-700)' }}
            />
            <div>
              <div
                className="eyebrow"
                style={{ color: 'var(--teal-700)', fontSize: '0.72rem' }}
              >
                Caregiver note
              </div>
              <p
                className="mt-1"
                style={{ color: 'var(--ink-700)', fontSize: '0.98rem', lineHeight: 1.55 }}
              >
                {lesson.caregiverNote}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Reflection */}
      <Card variant="sky" className="mt-5">
        <div className="flex items-start gap-3">
          <MessageCircleQuestion
            className="w-5 h-5 mt-0.5 shrink-0"
            style={{ color: 'var(--teal-700)' }}
          />
          <div>
            <div
              className="eyebrow"
              style={{ color: 'var(--teal-700)', fontSize: '0.72rem' }}
            >
              Reflection
            </div>
            <p
              className="font-display mt-1"
              style={{ color: 'var(--ink-900)', fontSize: '1.1rem', lineHeight: 1.45 }}
            >
              {lesson.reflection}
            </p>
            <Link
              to="/journal"
              className="btn-secondary mt-3 inline-flex"
              style={{ minHeight: 40, fontSize: '0.9rem' }}
            >
              Open journal
            </Link>
          </div>
        </div>
      </Card>

      {/* Bring to Dr. Thomas */}
      {lesson.drThomasQuestion && (
        <Card className="mt-5">
          <div className="flex items-start gap-3">
            <Stethoscope
              className="w-5 h-5 mt-0.5 shrink-0"
              style={{ color: 'var(--sand-700)' }}
            />
            <div>
              <div
                className="eyebrow"
                style={{ color: 'var(--sand-700)', fontSize: '0.72rem' }}
              >
                Bring this to Dr. Thomas
              </div>
              <p
                className="mt-1"
                style={{ color: 'var(--ink-900)', fontSize: '1rem', lineHeight: 1.55 }}
              >
                {lesson.drThomasQuestion}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Tracker / completion */}
      <Card variant="sage" className="mt-5 text-center">
        <div className="eyebrow" style={{ color: 'var(--sage-700)', fontSize: '0.72rem' }}>
          Tracker
        </div>
        <div
          className="font-display mt-1"
          style={{ fontSize: '1.05rem', color: 'var(--ink-900)' }}
        >
          {lesson.tracker}
        </div>
        <button
          onClick={markLessonComplete}
          className={isComplete ? 'btn-secondary mt-3' : 'btn-primary mt-3'}
          style={{ minHeight: 48 }}
        >
          {isComplete ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Marked complete
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Mark this lesson complete
            </>
          )}
        </button>
      </Card>

      {/* Optional supplemental external links */}
      {lesson.supplemental && lesson.supplemental.length > 0 && (
        <section className="mt-6">
          <div
            className="eyebrow mb-1"
            style={{ color: 'var(--ink-500)', fontSize: '0.72rem' }}
          >
            Supplemental — optional, not required
          </div>
          <p
            style={{ color: 'var(--ink-500)', fontSize: '0.85rem' }}
          >
            These external resources are extras. The lesson above is complete on its
            own — you do not need to open them.
          </p>
          <div className="mt-2 space-y-2">
            {lesson.supplemental.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl p-3"
                style={{
                  background: 'white',
                  border: '1px solid var(--sage-200)',
                  textDecoration: 'none',
                }}
              >
                <div
                  className="font-display"
                  style={{ color: 'var(--ink-900)', fontSize: '1rem' }}
                >
                  {s.title}
                </div>
                <div
                  style={{ color: 'var(--ink-700)', fontSize: '0.88rem', marginTop: 2 }}
                >
                  {s.description}
                </div>
                <div
                  style={{ color: 'var(--ink-500)', fontSize: '0.75rem', marginTop: 4 }}
                >
                  {s.source} · last verified {s.lastVerified}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Next step */}
      <div className="mt-6">
        <Link
          to="/phases/$slug"
          params={{ slug: lesson.nextStep.slug }}
          className="btn-primary"
          style={{
            width: '100%',
            minHeight: 56,
            padding: '1rem 1.25rem',
            fontSize: '1.05rem',
            fontWeight: 700,
          }}
        >
          Next: {lesson.nextStep.label}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Related routes */}
      {lesson.relatedRoutes && lesson.relatedRoutes.length > 0 && (
        <div className="mt-4">
          <div
            className="eyebrow mb-2"
            style={{ color: 'var(--ink-500)', fontSize: '0.72rem' }}
          >
            Go deeper
          </div>
          <div className="flex flex-wrap gap-2">
            {lesson.relatedRoutes.map((r) => (
              <a
                key={r.to}
                href={r.to}
                className="btn-secondary"
                style={{ minHeight: 40, fontSize: '0.9rem' }}
              >
                {r.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
