import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import {
  NotebookPen,
  Flame,
  Quote as QuoteIcon,
  Heart,
  Sparkles,
  Sunrise,
  Utensils,
  Droplet,
  Minus,
  Plus,
  CalendarRange,
} from 'lucide-react'
import { Card, SectionHeading } from '@/components/ui'
import { useJournal } from '@/lib/journal'
import type { Mood } from '@/lib/journal'
import { usePreferences } from '@/lib/preferences'
import { useWorkbook } from '@/lib/program'
import {
  moodCopy,
  winSuggestions,
  gentleGoalSuggestions,
  quoteForDay,
} from '@/content/journalLibrary'

export const Route = createFileRoute('/_app/journal')({
  component: JournalPage,
})

const MOODS: Mood[] = ['calm', 'tired', 'worried', 'hopeful', 'frustrated', 'okay']

function JournalPage() {
  const { prefs } = usePreferences()
  const { today, entryFor, updateEntry, journalStreak, totalEntries, startOfWeekIso, weeklyFor, updateWeekly } = useJournal()
  const { state, ready } = useWorkbook(prefs.startDate, prefs.patientName)
  const entry = entryFor(today)
  const weekIso = startOfWeekIso(today)
  const weekly = weeklyFor(weekIso)
  const quote = useMemo(() => quoteForDay(state.currentDay), [state.currentDay])
  const streak = journalStreak()

  const [showWeekly, setShowWeekly] = useState(false)

  if (!ready) return null

  const moodResponse = entry.mood ? moodCopy[entry.mood].response : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow={`Day ${state.currentDay} · ${new Date(today + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}`}
        title={`Today's Reflection`}
        description="A quiet place to put your day down. Nothing here is graded. One sentence is a whole journal."
      />

      {/* Quote of the day */}
      <Card variant="warm" className="mb-6">
        <div className="flex items-start gap-4">
          <div
            className="rounded-2xl w-12 h-12 flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
          >
            <QuoteIcon className="w-6 h-6" style={{ color: 'var(--sand-700)' }} />
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'var(--sand-700)' }}>
              Quote of the day
            </div>
            <div className="text-cardtitle mt-1" style={{ fontFamily: 'var(--font-display)' }}>
              "{quote.text}"
            </div>
          </div>
        </div>
      </Card>

      {/* Streak */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Card variant="sage">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6" style={{ color: 'var(--sand-500)' }} />
            <div>
              <div className="eyebrow">Journal streak</div>
              <div className="text-cardtitle">
                {streak} day{streak === 1 ? '' : 's'} in a row
              </div>
            </div>
          </div>
          <p className="text-caption mt-3">
            {streak === 0
              ? 'Every streak starts with one day. Today can be that day.'
              : 'A lovely rhythm. Even a sentence keeps it alive.'}
          </p>
        </Card>

        <Card variant="sky">
          <div className="flex items-center gap-3">
            <NotebookPen className="w-6 h-6" style={{ color: 'var(--teal-700)' }} />
            <div>
              <div className="eyebrow" style={{ color: 'var(--teal-700)' }}>
                Entries so far
              </div>
              <div className="text-cardtitle">
                {totalEntries} reflection{totalEntries === 1 ? '' : 's'}
              </div>
            </div>
          </div>
          <p className="text-caption mt-3">
            A quiet collection of your days. Kept just for you.
          </p>
        </Card>
      </div>

      {/* 1. How I Feel Today */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5" style={{ color: 'var(--sage-700)' }} />
          <h2 className="text-section">How I feel today</h2>
        </div>
        <Card>
          <div className="flex flex-wrap gap-3">
            {MOODS.map((m) => {
              const meta = moodCopy[m]
              const pressed = entry.mood === m
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => updateEntry(today, { mood: pressed ? undefined : m })}
                  className="mood-btn"
                >
                  <span aria-hidden className="text-2xl">
                    {meta.emoji}
                  </span>
                  <span>{meta.label}</span>
                </button>
              )
            })}
          </div>
          {moodResponse && (
            <p
              className="mt-5 p-4 rounded-2xl"
              style={{
                backgroundColor: 'var(--sage-50)',
                color: 'var(--ink-700)',
                fontSize: '1.15rem',
              }}
            >
              {moodResponse}
            </p>
          )}
        </Card>
      </section>

      {/* 2. Clear the Clutter */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" style={{ color: 'var(--sage-700)' }} />
          <h2 className="text-section">Clear the clutter</h2>
        </div>
        <Card>
          <label htmlFor="thoughts" className="text-caption block mb-2">
            Write anything on your mind today. It does not need to make sense.
          </label>
          <textarea
            id="thoughts"
            className="input"
            rows={5}
            placeholder="A thought. A worry. A note. Whatever is there."
            value={entry.thoughts}
            onChange={(e) => updateEntry(today, { thoughts: e.target.value })}
          />
          <div className="text-caption mt-2 flex items-center gap-1.5" style={{ color: 'var(--sage-700)', fontSize: '0.9rem' }}>
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: 999,
                background: 'var(--sage-500)',
              }}
            />
            Saved automatically on this device. Kept just for you.
          </div>
        </Card>
      </section>

      {/* 3. Food Log */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Utensils className="w-5 h-5" style={{ color: 'var(--sage-700)' }} />
          <h2 className="text-section">Food log</h2>
        </div>
        <Card>
          <div className="grid sm:grid-cols-2 gap-4">
            <MealField
              label="Breakfast"
              value={entry.food.breakfast}
              onChange={(v) => updateEntry(today, { food: { ...entry.food, breakfast: v } })}
            />
            <MealField
              label="Lunch"
              value={entry.food.lunch}
              onChange={(v) => updateEntry(today, { food: { ...entry.food, lunch: v } })}
            />
            <MealField
              label="Dinner"
              value={entry.food.dinner}
              onChange={(v) => updateEntry(today, { food: { ...entry.food, dinner: v } })}
            />
            <MealField
              label="Snacks"
              value={entry.food.snacks}
              onChange={(v) => updateEntry(today, { food: { ...entry.food, snacks: v } })}
            />
          </div>
          <hr className="divider-soft" />
          <div className="flex items-center gap-4 flex-wrap">
            <Droplet className="w-6 h-6" style={{ color: 'var(--teal-500)' }} />
            <div className="text-body" style={{ fontWeight: 600 }}>
              Water today
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Remove one glass"
                className="tap-large rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: 'var(--sage-300)', width: 48, height: 48, background: 'white' }}
                onClick={() =>
                  updateEntry(today, {
                    food: {
                      ...entry.food,
                      waterGlasses: Math.max(0, entry.food.waterGlasses - 1),
                    },
                  })
                }
              >
                <Minus className="w-5 h-5" />
              </button>
              <div
                className="font-display text-2xl"
                style={{ minWidth: 48, textAlign: 'center', color: 'var(--teal-700)' }}
              >
                {entry.food.waterGlasses}
              </div>
              <button
                aria-label="Add one glass"
                className="tap-large rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: 'var(--sage-300)', width: 48, height: 48, background: 'white' }}
                onClick={() =>
                  updateEntry(today, {
                    food: {
                      ...entry.food,
                      waterGlasses: entry.food.waterGlasses + 1,
                    },
                  })
                }
              >
                <Plus className="w-5 h-5" />
              </button>
              <span className="text-caption ml-1">glasses</span>
            </div>
          </div>
        </Card>
      </section>

      {/* 4. Today's Wins */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sunrise className="w-5 h-5" style={{ color: 'var(--sage-700)' }} />
          <h2 className="text-section">Today's wins</h2>
        </div>
        <Card>
          <label htmlFor="wins" className="text-caption block mb-2">
            What did I do well today? Even the smallest thing counts.
          </label>
          <textarea
            id="wins"
            className="input"
            rows={3}
            placeholder="I showed up. I rested. I drank water…"
            value={entry.wins}
            onChange={(e) => updateEntry(today, { wins: e.target.value })}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {winSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="btn-quiet"
                onClick={() =>
                  updateEntry(today, {
                    wins: entry.wins
                      ? entry.wins.trimEnd() + '\n' + s
                      : s,
                  })
                }
              >
                + {s}
              </button>
            ))}
          </div>
        </Card>
      </section>

      {/* 5. Gentle Goal */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" style={{ color: 'var(--sage-700)' }} />
          <h2 className="text-section">One gentle goal</h2>
        </div>
        <Card variant="sage">
          <label htmlFor="goal" className="text-caption block mb-2">
            What is one small thing I'd like to do tomorrow?
          </label>
          <input
            id="goal"
            type="text"
            className="input"
            placeholder="Step outside for five minutes…"
            value={entry.gentleGoal}
            onChange={(e) => updateEntry(today, { gentleGoal: e.target.value })}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {gentleGoalSuggestions.map((g) => (
              <button
                key={g}
                type="button"
                className="btn-quiet"
                onClick={() => updateEntry(today, { gentleGoal: g })}
              >
                {g}
              </button>
            ))}
          </div>
        </Card>
      </section>

      {/* Weekly reflection toggle */}
      <section className="mb-8">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div className="flex items-center gap-2">
            <CalendarRange className="w-5 h-5" style={{ color: 'var(--sage-700)' }} />
            <h2 className="text-section">Weekly reflection</h2>
          </div>
          <button className="btn-quiet" onClick={() => setShowWeekly((v) => !v)}>
            {showWeekly ? 'Hide' : 'Open this week'}
          </button>
        </div>
        {showWeekly && (
          <Card variant="sky">
            <div className="text-caption mb-4">
              Once a week is enough. No need to fill every line.
            </div>
            <label className="text-caption block mb-1" htmlFor="w1">
              What felt good this week?
            </label>
            <textarea
              id="w1"
              rows={3}
              className="input"
              value={weekly.whatFeltGood}
              onChange={(e) => updateWeekly(weekIso, { whatFeltGood: e.target.value })}
              placeholder="Something warm. Something small."
            />
            <label className="text-caption block mb-1 mt-4" htmlFor="w2">
              What was hard?
            </label>
            <textarea
              id="w2"
              rows={3}
              className="input"
              value={weekly.whatWasHard}
              onChange={(e) => updateWeekly(weekIso, { whatWasHard: e.target.value })}
              placeholder="It is okay to name it."
            />
            <label className="text-caption block mb-1 mt-4" htmlFor="w3">
              One intention for next week
            </label>
            <input
              id="w3"
              type="text"
              className="input"
              value={weekly.oneIntention}
              onChange={(e) => updateWeekly(weekIso, { oneIntention: e.target.value })}
              placeholder="Walk after lunch three times."
            />
          </Card>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link to="/today" className="btn-primary">
          Take Today's Next Step
        </Link>
        <Link to="/progress" className="btn-secondary">
          See my garden
        </Link>
        <button className="btn-secondary" onClick={() => window.print()}>
          Print this page
        </button>
      </div>
    </div>
  )
}

function MealField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="text-caption block mb-1">{label}</label>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label === 'Snacks' ? 'An apple, a handful of nuts…' : 'A warm bowl, some greens…'}
      />
    </div>
  )
}
