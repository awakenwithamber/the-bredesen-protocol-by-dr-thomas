import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui'
import {
  phaseLessonGroups,
  lessonsForGroup,
} from '@/content/phaseLessons'

export const Route = createFileRoute('/_app/phases/')({
  component: PhasesIndex,
})

function PhasesIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div
        className="eyebrow"
        style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
      >
        Built-in lessons
      </div>
      <h1
        className="font-display mt-1"
        style={{
          fontSize: 'clamp(1.7rem, 1.1rem + 2vw, 2.3rem)',
          lineHeight: 1.15,
          color: 'var(--ink-900)',
        }}
      >
        Phases & Months — read here, not downloaded
      </h1>
      <p
        className="mt-2"
        style={{ color: 'var(--ink-700)', fontSize: '1.05rem', lineHeight: 1.55 }}
      >
        Every page is built into the workbook. There are no PDFs to download
        and no documents to find. Open any lesson below and read it where you
        are.
      </p>

      <div className="mt-6 space-y-6">
        {phaseLessonGroups.map((g) => {
          const lessons = lessonsForGroup(g.key)
          return (
            <section key={g.key}>
              <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
                <div>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: '1.3rem',
                      color: 'var(--ink-900)',
                      lineHeight: 1.2,
                    }}
                  >
                    {g.title}
                  </h2>
                  <p
                    style={{
                      color: 'var(--ink-700)',
                      fontSize: '0.95rem',
                      marginTop: 2,
                      lineHeight: 1.5,
                    }}
                  >
                    {g.blurb}
                  </p>
                </div>
                <span
                  className="eyebrow"
                  style={{ color: 'var(--ink-500)', fontSize: '0.72rem' }}
                >
                  {lessons.length} lesson{lessons.length === 1 ? '' : 's'}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {lessons.map((l) => (
                  <Link
                    key={l.slug}
                    to="/phases/$slug"
                    params={{ slug: l.slug }}
                    className="block rounded-2xl p-3.5"
                    style={{
                      background: 'white',
                      border: '1px solid var(--sage-200)',
                      textDecoration: 'none',
                    }}
                  >
                    <div
                      className="eyebrow"
                      style={{ color: 'var(--sage-700)', fontSize: '0.7rem' }}
                    >
                      {l.eyebrow}
                    </div>
                    <div
                      className="font-display mt-0.5"
                      style={{
                        fontSize: '1rem',
                        color: 'var(--ink-900)',
                        lineHeight: 1.3,
                      }}
                    >
                      {l.title}
                    </div>
                    <p
                      className="mt-1"
                      style={{
                        color: 'var(--ink-700)',
                        fontSize: '0.88rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {l.todaysFocus}
                    </p>
                    <div
                      className="mt-2 inline-flex items-center gap-1 font-semibold"
                      style={{ color: 'var(--sage-700)', fontSize: '0.85rem' }}
                    >
                      Open <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <Card className="mt-8">
        <div
          className="eyebrow mb-1"
          style={{ color: 'var(--ink-500)', fontSize: '0.72rem' }}
        >
          A note on external links
        </div>
        <p style={{ color: 'var(--ink-700)', fontSize: '0.95rem', lineHeight: 1.55 }}>
          Some lessons include a small "supplemental" section with a verified
          external link. Those are extras. The lessons are complete on their
          own. You should never need to leave the workbook to know what to do
          next.
        </p>
      </Card>
    </div>
  )
}
