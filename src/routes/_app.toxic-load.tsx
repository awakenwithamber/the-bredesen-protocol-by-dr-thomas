import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Droplets,
  Flower2,
  Quote as QuoteIcon,
  Save,
  ShieldCheck,
  Sparkles,
  Users,
  Wind,
} from 'lucide-react'
import { Card } from '@/components/ui'
import { useCheckSet } from '@/lib/checkSet'

export const Route = createFileRoute('/_app/toxic-load')({
  component: ToxicLoadPage,
})

const SWAPS = [
  {
    id: 'plastic',
    title: 'Stop heating food in plastic',
    body: 'When plastic warms, it can release small amounts of compounds you would rather not eat. Microwave on a ceramic plate or a glass dish instead.',
  },
  {
    id: 'storage',
    title: 'Store leftovers in glass when you can',
    body: 'Glass jars and containers are inexpensive, dishwasher-safe, and last for years. Yogurt jars and salsa jars work beautifully.',
  },
  {
    id: 'water',
    title: 'Filter your drinking water if possible',
    body: 'Even a simple pitcher filter is a meaningful upgrade. If a filter is not in the budget right now, that is okay — start with the others.',
  },
  {
    id: 'air',
    title: 'Open a window for fresh air',
    body: 'Five minutes of cross-breeze, especially after cooking, clears the indoor air more than most people expect.',
  },
  {
    id: 'fragrance',
    title: 'Reduce artificial fragrance',
    body: 'Plug-ins, scented candles, and heavy laundry perfumes give the brain extra work. Fresh air and unscented soap are often kinder.',
  },
  {
    id: 'cleaners',
    title: 'Choose simpler cleaners',
    body: 'Vinegar and water clean countertops. Castile soap cleans almost anything. You do not need a cabinet of bottles.',
  },
] as const

function ToxicLoadPage() {
  const swaps = useCheckSet('toxic.swaps')
  const finished = useCheckSet('toxic.finished')

  const swapsDone = SWAPS.filter((s) => swaps.isChecked(s.id)).length
  const target = 3
  const reachedTarget = swapsDone >= target

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
        Day 2 · Module · Read in 2 minutes, do in 5
      </div>
      <h1
        className="font-display mt-1"
        style={{
          fontSize: 'clamp(1.6rem, 1.1rem + 1.8vw, 2.2rem)',
          lineHeight: 1.15,
          color: 'var(--ink-900)',
        }}
      >
        Simple Ways to Reduce Toxic Load
      </h1>
      <p className="mt-2" style={{ color: 'var(--ink-700)', fontSize: '1.05rem' }}>
        Small changes at home that quietly take some pressure off the brain.
        Pick three. Three is plenty.
      </p>

      {/* Quote */}
      <Card variant="warm" className="mt-4">
        <div className="flex items-start gap-3">
          <QuoteIcon
            className="w-5 h-5 mt-1 shrink-0"
            style={{ color: 'var(--sand-700)' }}
          />
          <div>
            <p
              className="font-display"
              style={{ fontSize: '1.05rem', lineHeight: 1.4, color: 'var(--ink-900)' }}
            >
              "What is good for the body is good for the brain."
            </p>
            <p
              className="mt-1"
              style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}
            >
              — Dr. Dale Bredesen
            </p>
          </div>
        </div>
      </Card>

      {/* 1. Why this matters */}
      <Section eyebrow="Why this matters" title="Your home is the air your brain breathes.">
        <p>
          Most days, the brain is doing one job: filtering. Filtering ideas,
          conversation, and yes — the chemicals in our food, water, and air.
          When some of that load is reduced at home, the brain has more energy
          for the things you love.
        </p>
        <p className="mt-2">
          You do not need a perfect house. You need a calmer one.
        </p>
      </Section>

      {/* 2. Six simple swaps with progress save */}
      <Section
        eyebrow="Pick three"
        title="Six simple swaps. Three is plenty for this week."
      >
        <ul className="mt-2 space-y-2">
          {SWAPS.map((s) => (
            <SwapRow
              key={s.id}
              checked={swaps.isChecked(s.id)}
              onToggle={() => swaps.toggle(s.id)}
              title={s.title}
              body={s.body}
            />
          ))}
        </ul>
        <div
          className="mt-3 rounded-xl p-3"
          style={{
            background: reachedTarget ? 'rgba(122, 158, 122, 0.1)' : 'var(--cream-50)',
            border: `1px solid ${reachedTarget ? 'var(--sage-300)' : 'var(--sage-200)'}`,
            color: 'var(--ink-700)',
            fontSize: '0.95rem',
          }}
        >
          {reachedTarget ? (
            <span>
              <Sparkles className="inline w-4 h-4 mr-1" style={{ color: 'var(--sage-700)' }} />
              You picked {swapsDone}. That is enough for a real change. Saved.
            </span>
          ) : (
            <span>
              {swapsDone}/{target} chosen so far. Saved as you go.
            </span>
          )}
        </div>
      </Section>

      {/* 3. Progress not perfection */}
      <Card variant="sage" className="mt-5">
        <div className="flex items-start gap-3">
          <ShieldCheck
            className="w-5 h-5 mt-0.5 shrink-0"
            style={{ color: 'var(--sage-700)' }}
          />
          <div>
            <div
              className="eyebrow"
              style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
            >
              A note on tone
            </div>
            <p
              className="mt-1"
              style={{ color: 'var(--ink-900)', fontSize: '0.98rem', lineHeight: 1.55 }}
            >
              Progress, not perfection. You are not aiming for a chemical-free
              home. You are taking three calm steps toward a kinder one. That
              is the whole assignment.
            </p>
          </div>
        </div>
      </Card>

      {/* 4. Caregiver helper */}
      <Card className="mt-5">
        <div className="flex items-start gap-3">
          <Users
            className="w-5 h-5 mt-0.5 shrink-0"
            style={{ color: 'var(--teal-700)' }}
          />
          <div>
            <div
              className="eyebrow"
              style={{ color: 'var(--teal-700)', fontSize: '0.78rem' }}
            >
              Caregiver help ideas
            </div>
            <ul
              className="mt-2 space-y-1.5"
              style={{ color: 'var(--ink-700)', fontSize: '0.95rem' }}
            >
              <li className="flex items-start gap-2">
                <Wind className="w-4 h-4 mt-1 shrink-0" style={{ color: 'var(--teal-700)' }} />
                <span>Open the windows after cooking — five quiet minutes.</span>
              </li>
              <li className="flex items-start gap-2">
                <Droplets className="w-4 h-4 mt-1 shrink-0" style={{ color: 'var(--teal-700)' }} />
                <span>Keep a clean glass bottle of filtered water within reach.</span>
              </li>
              <li className="flex items-start gap-2">
                <Flower2 className="w-4 h-4 mt-1 shrink-0" style={{ color: 'var(--teal-700)' }} />
                <span>Switch one scented item for an unscented version.</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* 5. Completion */}
      <Card variant="warm" className="mt-5">
        <div
          className="eyebrow"
          style={{ color: 'var(--sand-700)', fontSize: '0.78rem' }}
        >
          Today's completion
        </div>
        <ul className="mt-2 space-y-2">
          <CheckRow
            checked={finished.isChecked('picked-three')}
            onToggle={() => finished.toggle('picked-three')}
            label="I chose three small swaps to start with."
          />
          <CheckRow
            checked={finished.isChecked('opened-window')}
            onToggle={() => finished.toggle('opened-window')}
            label="I opened a window for fresh air."
          />
          <CheckRow
            checked={finished.isChecked('was-kind')}
            onToggle={() => finished.toggle('was-kind')}
            label="I was kind to myself while doing it."
          />
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/today"
            className="btn-primary"
            style={{ minHeight: 48, padding: '0.7rem 1rem', fontSize: '1rem' }}
          >
            <Save className="w-4 h-4" /> Save and return to Today
          </Link>
          <Link
            to="/movement"
            className="btn-secondary"
            style={{ minHeight: 48, padding: '0.7rem 1rem', fontSize: '0.95rem' }}
          >
            Next: today's 5-minute workout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p
          className="mt-3 text-caption"
          style={{ color: 'var(--sage-700)', fontSize: '0.88rem' }}
        >
          <Sparkles className="inline w-3.5 h-3.5 mr-1" />
          You are making progress. Ready for the next small step?
        </p>
      </Card>
    </div>
  )
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-6">
      <div
        className="eyebrow"
        style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
      >
        {eyebrow}
      </div>
      <h2
        className="font-display mt-1"
        style={{ fontSize: '1.25rem', lineHeight: 1.25, color: 'var(--ink-900)' }}
      >
        {title}
      </h2>
      <div
        className="mt-2"
        style={{ color: 'var(--ink-700)', fontSize: '1rem', lineHeight: 1.55 }}
      >
        {children}
      </div>
    </section>
  )
}

function SwapRow({
  checked,
  onToggle,
  title,
  body,
}: {
  checked: boolean
  onToggle: () => void
  title: string
  body: string
}) {
  return (
    <li>
      <button
        onClick={onToggle}
        className="w-full text-left rounded-xl p-3 flex items-start gap-3 transition-colors"
        style={{
          border: '1px solid',
          borderColor: checked ? 'rgba(122, 158, 122, 0.45)' : 'var(--sage-200)',
          background: checked ? 'rgba(122, 158, 122, 0.08)' : 'white',
        }}
        aria-pressed={checked}
      >
        <span
          className="rounded-full shrink-0 flex items-center justify-center mt-0.5"
          style={{
            width: 28,
            height: 28,
            background: checked ? 'var(--sage-600)' : 'white',
            border: `2px solid ${checked ? 'var(--sage-600)' : 'var(--sage-400)'}`,
            color: 'white',
          }}
          aria-hidden
        >
          {checked && <Check className="w-4 h-4" />}
        </span>
        <span className="flex-1">
          <span
            className="font-display block"
            style={{ color: 'var(--ink-900)', fontSize: '1rem', lineHeight: 1.3 }}
          >
            {title}
          </span>
          <span
            className="block mt-1"
            style={{
              color: 'var(--ink-700)',
              fontSize: '0.92rem',
              lineHeight: 1.5,
            }}
          >
            {body}
          </span>
        </span>
      </button>
    </li>
  )
}

function CheckRow({
  checked,
  onToggle,
  label,
}: {
  checked: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <li>
      <button
        onClick={onToggle}
        className="w-full text-left rounded-xl p-3 flex items-start gap-3 transition-colors"
        style={{
          border: '1px solid',
          borderColor: checked ? 'rgba(122, 158, 122, 0.45)' : 'var(--sage-200)',
          background: checked ? 'rgba(122, 158, 122, 0.08)' : 'white',
        }}
        aria-pressed={checked}
      >
        <span
          className="rounded-full shrink-0 flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            background: checked ? 'var(--sage-600)' : 'white',
            border: `2px solid ${checked ? 'var(--sage-600)' : 'var(--sage-400)'}`,
            color: 'white',
          }}
          aria-hidden
        >
          {checked && <Check className="w-4 h-4" />}
        </span>
        <span
          style={{ color: 'var(--ink-900)', fontSize: '0.98rem', lineHeight: 1.5 }}
        >
          {label}
        </span>
      </button>
    </li>
  )
}
