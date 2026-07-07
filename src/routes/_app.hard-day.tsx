import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Heart, ArrowLeft, Check } from 'lucide-react'
import { Card, SectionHeading } from '@/components/ui'
import { hardDaySteps } from '@/content/journalLibrary'
import { useJournal } from '@/lib/journal'

export const Route = createFileRoute('/_app/hard-day')({
  component: HardDay,
})

function HardDay() {
  const [done, setDone] = useState<Set<number>>(new Set())
  const { today, updateEntry, entryFor } = useJournal()
  const [thought, setThought] = useState(entryFor(today).thoughts)

  const toggle = (i: number) => {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const complete = done.size >= hardDaySteps.length

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'radial-gradient(800px 500px at 50% -10%, var(--sand-50) 0%, transparent 60%), var(--cream)',
      }}
    >
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 mb-5"
          style={{ color: 'var(--ink-500)' }}
        >
          <ArrowLeft className="w-4 h-4" /> Back when you're ready
        </Link>

        <div className="text-center mb-8">
          <div
            className="rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4"
            style={{
              background:
                'linear-gradient(135deg, var(--rose-200) 0%, var(--sand-300) 100%)',
            }}
          >
            <Heart className="w-8 h-8" style={{ color: '#7a3b33' }} />
          </div>
          <SectionHeading
            title="Today feels hard. That is allowed."
            description="Forget the full plan. Just these five small things. Do what you can — skip the rest."
          />
        </div>

        <div className="space-y-4 mb-8">
          {hardDaySteps.map((s, i) => {
            const isDone = done.has(i)
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggle(i)}
                className="card card-warm w-full text-left flex items-start gap-4"
                style={{
                  borderColor: isDone
                    ? 'var(--sage-500)'
                    : 'rgba(214, 185, 140, 0.38)',
                  background: isDone
                    ? 'linear-gradient(150deg, var(--sage-100) 0%, var(--cream-soft) 100%)'
                    : undefined,
                }}
              >
                <div
                  aria-hidden
                  className="rounded-full w-12 h-12 flex items-center justify-center shrink-0 font-display text-xl"
                  style={{
                    background: isDone ? 'var(--sage-600)' : 'white',
                    color: isDone ? 'white' : 'var(--sage-800)',
                    border: '2px solid var(--sage-500)',
                  }}
                >
                  {isDone ? <Check className="w-6 h-6" /> : i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-cardtitle">{s.title}</div>
                  <div className="text-body mt-1">{s.body}</div>
                </div>
              </button>
            )
          })}
        </div>

        <Card variant="sage" className="mb-8">
          <div className="eyebrow mb-2">One thought</div>
          <label className="sr-only" htmlFor="hard-thought">
            One thought
          </label>
          <textarea
            id="hard-thought"
            rows={3}
            className="input"
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            onBlur={() => updateEntry(today, { thoughts: thought })}
            placeholder="Any thought. One word is enough."
          />
        </Card>

        {complete ? (
          <Card variant="sage" className="text-center">
            <div className="text-cardtitle mb-2">
              You still made today matter.
            </div>
            <p className="text-body">
              Rest now. Tomorrow is a new opportunity. We will be right here.
            </p>
            <div className="mt-4 flex justify-center gap-3 flex-wrap">
              <Link to="/dashboard" className="btn-primary">
                Back to dashboard
              </Link>
              <Link to="/journal" className="btn-secondary">
                Open journal
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="text-center">
            <p className="text-body">
              You do not need to finish all five. Even one counts as today.
            </p>
            <Link
              to="/dashboard"
              className="btn-secondary mt-4 inline-flex"
            >
              I'm done for now
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}
