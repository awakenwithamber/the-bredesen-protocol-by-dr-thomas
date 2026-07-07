import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen, Heart, Sparkles, Users } from 'lucide-react'
import { Card } from '@/components/ui'
import { lessonsForGroup } from '@/content/phaseLessons'

export const Route = createFileRoute('/_app/start-here')({
  component: StartHere,
})

function StartHere() {
  const lessons = lessonsForGroup('start-here')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div
        className="eyebrow"
        style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
      >
        Start Here
      </div>
      <h1
        className="font-display mt-1"
        style={{
          fontSize: 'clamp(1.7rem, 1.1rem + 2vw, 2.4rem)',
          lineHeight: 1.15,
          color: 'var(--ink-900)',
        }}
      >
        Welcome to the Bredesen Program
      </h1>
      <p
        className="mt-2"
        style={{ color: 'var(--ink-700)', fontSize: '1.1rem', lineHeight: 1.55 }}
      >
        Everything you need is built into this workbook. There are no PDFs to
        download, no Drive folders to find, and no documents to chase. Each page
        below is a real lesson you can read here, on any device.
      </p>

      <Card variant="sage" className="mt-5">
        <div className="flex items-start gap-3">
          <Sparkles
            className="w-5 h-5 mt-0.5 shrink-0"
            style={{ color: 'var(--sage-700)' }}
          />
          <div>
            <div
              className="eyebrow"
              style={{ color: 'var(--sage-700)', fontSize: '0.72rem' }}
            >
              Read these in order
            </div>
            <p
              className="mt-1"
              style={{ color: 'var(--ink-900)', fontSize: '1rem', lineHeight: 1.55 }}
            >
              Each page takes 3–6 minutes. You can stop any time and pick up
              where you left off. Nothing here is required all at once.
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        {lessons.map((l, i) => (
          <Link
            key={l.slug}
            to="/phases/$slug"
            params={{ slug: l.slug }}
            className="block rounded-2xl p-4"
            style={{
              background: 'white',
              border: '1px solid var(--sage-200)',
              textDecoration: 'none',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  background: 'var(--sage-100)',
                  color: 'var(--sage-800)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
                aria-hidden
              >
                {i + 1}
              </div>
              <span
                className="eyebrow"
                style={{ color: 'var(--sage-700)', fontSize: '0.72rem' }}
              >
                Step {i + 1}
              </span>
            </div>
            <div
              className="font-display"
              style={{ fontSize: '1.05rem', color: 'var(--ink-900)', lineHeight: 1.3 }}
            >
              {l.title}
            </div>
            <p
              className="mt-1"
              style={{ color: 'var(--ink-700)', fontSize: '0.92rem', lineHeight: 1.5 }}
            >
              {l.todaysFocus}
            </p>
            <div
              className="mt-2 inline-flex items-center gap-1 font-semibold"
              style={{ color: 'var(--sage-700)', fontSize: '0.88rem' }}
            >
              Open <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick paths */}
      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        <Link
          to="/phases"
          className="rounded-2xl p-4 block"
          style={{
            background: 'var(--cream-50)',
            border: '1px solid var(--sand-300)',
            textDecoration: 'none',
          }}
        >
          <BookOpen
            className="w-5 h-5"
            style={{ color: 'var(--sand-700)' }}
          />
          <div
            className="font-display mt-1"
            style={{ fontSize: '1rem', color: 'var(--ink-900)' }}
          >
            All Phases
          </div>
          <p
            style={{ color: 'var(--ink-700)', fontSize: '0.88rem', marginTop: 4, lineHeight: 1.5 }}
          >
            See every built-in phase, week, and month at a glance.
          </p>
        </Link>
        <Link
          to="/caregiver"
          className="rounded-2xl p-4 block"
          style={{
            background: 'var(--teal-50)',
            border: '1px solid var(--teal-200)',
            textDecoration: 'none',
          }}
        >
          <Users
            className="w-5 h-5"
            style={{ color: 'var(--teal-700)' }}
          />
          <div
            className="font-display mt-1"
            style={{ fontSize: '1rem', color: 'var(--ink-900)' }}
          >
            Caregiver Hub
          </div>
          <p
            style={{ color: 'var(--ink-700)', fontSize: '0.88rem', marginTop: 4, lineHeight: 1.5 }}
          >
            Tools, observations, and a hard-day page for the people walking with you.
          </p>
        </Link>
        <Link
          to="/hard-day"
          className="rounded-2xl p-4 block"
          style={{
            background: 'var(--sand-100)',
            border: '1px solid var(--sand-300)',
            textDecoration: 'none',
          }}
        >
          <Heart
            className="w-5 h-5"
            style={{ color: 'var(--sand-700)' }}
          />
          <div
            className="font-display mt-1"
            style={{ fontSize: '1rem', color: 'var(--ink-900)' }}
          >
            Hard Day Page
          </div>
          <p
            style={{ color: 'var(--ink-700)', fontSize: '0.88rem', marginTop: 4, lineHeight: 1.5 }}
          >
            For when the program feels too big. One small step counts.
          </p>
        </Link>
      </div>
    </div>
  )
}
