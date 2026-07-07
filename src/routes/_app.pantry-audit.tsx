import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Apple,
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Leaf,
  Quote as QuoteIcon,
  Save,
  ShoppingBasket,
  Sparkles,
  Users,
} from 'lucide-react'
import { Card } from '@/components/ui'
import { useCheckSet } from '@/lib/checkSet'

export const Route = createFileRoute('/_app/pantry-audit')({
  component: PantryAuditPage,
})

const SHELVES = [
  { id: 'shelf-snack', label: 'One snack shelf or cabinet' },
  { id: 'shelf-fridge', label: 'One shelf in the refrigerator' },
  { id: 'shelf-pantry', label: 'One pantry shelf' },
  { id: 'shelf-counter', label: 'The counter (cooking oils, salt, sugar)' },
  { id: 'shelf-freezer', label: 'One freezer shelf' },
] as const

const KEEP = [
  'Whole foods you can name (eggs, broccoli, brown rice, salmon, olive oil)',
  'Plain frozen vegetables and frozen berries',
  'Nuts and seeds in their plain form',
  'Herbs, spices, and tea you reach for',
]

const REPLACE = [
  'Sugary cereals → plain oats with cinnamon and berries',
  'Vegetable-oil dressings → olive oil + lemon + salt',
  'White bread → sprouted-grain or sourdough',
  'Snack crackers → a small handful of nuts',
  'Sweetened yogurt → plain yogurt with fresh fruit',
]

const REDUCE = [
  'Sugary drinks (soda, sweet tea, juice) — replace with water',
  'Highly processed snacks with long ingredient lists',
  'Anything labeled "low-fat" with added sugar',
  'Margarine and hydrogenated oils',
]

const LABEL_BASICS = [
  'Look at the first three ingredients — that is most of what you are eating.',
  'Watch for added sugar (it has many names: cane juice, syrup, dextrose).',
  'Watch for hydrogenated oils.',
  'If the list is long and full of words you do not recognize, that is information, not a verdict.',
]

const EASY_SWAPS = [
  'Replace one bottle of vegetable oil with extra-virgin olive oil.',
  'Replace one sugary breakfast item with plain oats and berries.',
  'Replace one snack-aisle item with a handful of nuts.',
]

const BUDGET_SWAPS = [
  'Frozen organic berries cost less and last longer than fresh.',
  'Buy a bigger bag of plain oats — pennies per serving.',
  'Eggs are one of the most affordable brain-friendly foods.',
  'Lentils and beans (dry or canned) are inexpensive and nourishing.',
  'Buy spinach or kale frozen if fresh feels expensive.',
]

function PantryAuditPage() {
  const shelves = useCheckSet('pantry.shelves')
  const swaps = useCheckSet('pantry.swaps')
  const finished = useCheckSet('pantry.finished')

  const shelvesDone = SHELVES.filter((s) => shelves.isChecked(s.id)).length

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
        style={{ color: 'var(--sand-700)', fontSize: '0.78rem' }}
      >
        Day 1 · Module · Read in 2 minutes, do in 5
      </div>
      <h1
        className="font-display mt-1"
        style={{
          fontSize: 'clamp(1.6rem, 1.1rem + 1.8vw, 2.2rem)',
          lineHeight: 1.15,
          color: 'var(--ink-900)',
        }}
      >
        Kitchen Pantry Audit
      </h1>
      <p className="mt-2" style={{ color: 'var(--ink-700)', fontSize: '1.05rem' }}>
        A calm look at what is on your shelves. Nothing is thrown out in a
        rush. There is no shame here — only noticing.
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
              "Let food be thy medicine and medicine be thy food."
            </p>
            <p
              className="mt-1"
              style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}
            >
              — Hippocrates
            </p>
          </div>
        </div>
      </Card>

      {/* 1. Why kitchen environment matters */}
      <Section
        eyebrow="Why this matters"
        title="The kitchen is the room your brain lives in."
      >
        <p>
          What is at eye level becomes what you eat most. Most decisions about
          food are made in seconds — by what is closest, easiest, and already
          open. A small change to the kitchen can quietly change weeks of
          meals.
        </p>
        <p className="mt-2">
          You do not need a new kitchen. You need a kinder one.
        </p>
      </Section>

      {/* 2. Keep / Replace / Reduce */}
      <Section
        eyebrow="The three categories"
        title="Keep · Replace · Reduce"
      >
        <p>As you look around, sort gently into three groups.</p>
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          <CategoryCard tone="sage" title="Keep" subtitle="These already serve you" items={KEEP} />
          <CategoryCard tone="sand" title="Replace" subtitle="A kinder version exists" items={REPLACE} />
          <CategoryCard tone="quiet" title="Reduce" subtitle="Less of these, slowly" items={REDUCE} />
        </div>
      </Section>

      {/* 3. Start with one shelf */}
      <Section
        eyebrow="Start small"
        title="One shelf is enough for today."
      >
        <p>
          Pick one shelf. Tick it off when you have walked through it slowly.
          That is the whole task.
        </p>
        <ul className="mt-3 space-y-2">
          {SHELVES.map((s) => (
            <CheckRow
              key={s.id}
              checked={shelves.isChecked(s.id)}
              onToggle={() => shelves.toggle(s.id)}
              label={s.label}
            />
          ))}
        </ul>
        <p
          className="mt-3 text-caption"
          style={{ color: 'var(--ink-500)', fontSize: '0.88rem' }}
        >
          Saved automatically. {shelvesDone} of {SHELVES.length} shelves looked
          at.
        </p>
      </Section>

      {/* 4. Label reading basics */}
      <Section
        eyebrow="Label reading"
        title="The four-line cheat sheet"
      >
        <ul className="mt-1 space-y-2" style={{ fontSize: '0.98rem' }}>
          {LABEL_BASICS.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Leaf
                className="w-4 h-4 mt-1 shrink-0"
                style={{ color: 'var(--sage-600)' }}
              />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Three easiest swaps */}
      <Section
        eyebrow="Try these"
        title="Three easiest swaps"
      >
        <p>Tick whichever you would like to try this week. No pressure.</p>
        <ul className="mt-3 space-y-2">
          {EASY_SWAPS.map((s, i) => (
            <CheckRow
              key={i}
              checked={swaps.isChecked(`easy-${i}`)}
              onToggle={() => swaps.toggle(`easy-${i}`)}
              label={s}
            />
          ))}
        </ul>
      </Section>

      {/* 6. Budget-friendly swaps */}
      <Section
        eyebrow="Budget-friendly"
        title="Brain-kind food does not have to cost more."
      >
        <ul className="mt-1 space-y-2" style={{ fontSize: '0.98rem' }}>
          {BUDGET_SWAPS.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <ShoppingBasket
                className="w-4 h-4 mt-1 shrink-0"
                style={{ color: 'var(--sand-700)' }}
              />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. No shame language */}
      <Card variant="sage" className="mt-5">
        <div className="flex items-start gap-3">
          <Heart
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
              There is nothing in your kitchen that makes you a bad person.
              Foods that no longer serve you served you for a long time. We
              are not throwing things out in a rush. We are quietly making
              room for what helps now.
            </p>
          </div>
        </div>
      </Card>

      {/* 8. Caregiver support */}
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
              Caregiver support
            </div>
            <p
              className="mt-1"
              style={{ color: 'var(--ink-700)', fontSize: '0.96rem', lineHeight: 1.55 }}
            >
              If you are helping a parent or partner, sit with them at the
              kitchen table and read this together. Hold the list. Make the
              tea. Let them choose what to keep. Decisions feel kinder when
              they are theirs.
            </p>
          </div>
        </div>
      </Card>

      {/* 9. Completion */}
      <Card variant="warm" className="mt-5">
        <div
          className="eyebrow"
          style={{ color: 'var(--sand-700)', fontSize: '0.78rem' }}
        >
          Today's completion
        </div>
        <ul className="mt-2 space-y-2">
          <CheckRow
            checked={finished.isChecked('walked-one-shelf')}
            onToggle={() => finished.toggle('walked-one-shelf')}
            label="I walked one shelf today."
          />
          <CheckRow
            checked={finished.isChecked('picked-one-swap')}
            onToggle={() => finished.toggle('picked-one-swap')}
            label="I picked one easy swap to try."
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

function CategoryCard({
  tone,
  title,
  subtitle,
  items,
}: {
  tone: 'sage' | 'sand' | 'quiet'
  title: string
  subtitle: string
  items: string[]
}) {
  const bg = tone === 'sage' ? 'var(--sage-50)' : tone === 'sand' ? 'var(--sand-50)' : 'var(--cream-50)'
  const border = tone === 'sage' ? 'var(--sage-300)' : tone === 'sand' ? 'var(--sand-300)' : 'var(--ink-200)'
  const accent = tone === 'sage' ? 'var(--sage-700)' : tone === 'sand' ? 'var(--sand-700)' : 'var(--ink-500)'
  const Icon = tone === 'sage' ? Apple : tone === 'sand' ? Leaf : Heart
  return (
    <div
      className="rounded-2xl p-3"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <div className="flex items-center gap-1.5">
        <Icon className="w-4 h-4" style={{ color: accent }} />
        <div className="font-display" style={{ fontSize: '1rem', color: 'var(--ink-900)' }}>
          {title}
        </div>
      </div>
      <div
        className="text-caption mt-0.5"
        style={{ color: accent, fontSize: '0.78rem' }}
      >
        {subtitle}
      </div>
      <ul className="mt-2 space-y-1.5" style={{ fontSize: '0.9rem' }}>
        {items.map((t) => (
          <li key={t} className="flex items-start gap-1.5">
            <span style={{ color: accent }}>•</span>
            <span style={{ color: 'var(--ink-700)' }}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
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
          style={{
            color: 'var(--ink-900)',
            fontSize: '0.98rem',
            lineHeight: 1.5,
          }}
        >
          {label}
        </span>
      </button>
    </li>
  )
}
