import { createFileRoute, Link } from '@tanstack/react-router'
import { Printer, FileText } from 'lucide-react'
import { Card, SectionHeading } from '@/components/ui'
import { usePreferences } from '@/lib/preferences'
import { useWorkbook } from '@/lib/program'
import { phases } from '@/content/phases'
import { planForDay } from '@/content/curriculum'

export const Route = createFileRoute('/_app/print-center')({
  component: PrintCenter,
})

function PrintCenter() {
  const { prefs } = usePreferences()
  const { state, ready } = useWorkbook(prefs.startDate, prefs.patientName)
  if (!ready) return null

  const phase = phases.find((p) => p.number === state.currentPhase) ?? phases[0]
  const todayPlan = planForDay(state.currentDay)

  const items = [
    { title: "Today's checklist", body: "A one-page overview of today's plan — perfect for the fridge.", print: () => window.print() },
    { title: "This week's sheet", body: 'Weekly intention, three key habits, and caregiver focus.', print: () => window.print() },
    { title: 'Grocery simplifier', body: "A short list matched to this week's meals.", print: () => window.print() },
    { title: 'Movement cards', body: 'Print-friendly cards for seated, walking, and balance practices.', print: () => window.print() },
    { title: 'Breath cards', body: 'Quick reference cards for daily breath practices.', print: () => window.print() },
    { title: 'Caregiver weekly plan', body: 'Three clear ways to help this week.', print: () => window.print() },
    { title: 'Program timeline', body: 'Start date, reference end date, and what happens after 6 months.', print: () => window.print() },
    { title: 'Brain game cards', body: 'Printable, large-print brain games.', print: () => window.print() },
  ]

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8 no-print">
        <SectionHeading
          eyebrow="Print Center"
          title="Print what matters most"
          description="Every sheet is large-print and caregiver-friendly. Print and stick it on the fridge."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((i) => (
            <Card key={i.title} className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5" style={{ color: 'var(--color-sage-600)' }} />
                <h3 className="font-display text-lg">{i.title}</h3>
              </div>
              <p className="flex-1" style={{ color: 'var(--color-ink-500)' }}>
                {i.body}
              </p>
              <button
                onClick={i.print}
                className="btn-secondary mt-4 self-start"
                style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.9rem' }}
              >
                <Printer className="w-4 h-4" /> Print this sheet
              </button>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/dashboard" className="text-sm" style={{ color: 'var(--color-sage-700)' }}>
            ← Back to dashboard
          </Link>
        </div>
      </div>

      {/* Hidden printable content — shows ONLY when printing */}
      <div className="hidden print:block p-8">
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>
          Today's plan — Week {state.currentWeek} · Day {state.currentDay}
        </h1>
        <p style={{ marginBottom: 16 }}>{todayPlan.focus}</p>
        <h2>Phase {phase.number}: {phase.title}</h2>
        <p>Weekly intention: {phase.weeklyIntention}</p>
        <h2 style={{ marginTop: 16 }}>Today's small steps</h2>
        <ul>
          {todayPlan.checklist.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <h2 style={{ marginTop: 16 }}>Meals</h2>
        <ul>
          <li><strong>Breakfast:</strong> {todayPlan.meals.breakfast.name}</li>
          <li><strong>AM snack:</strong> {todayPlan.meals.amSnack.name}</li>
          <li><strong>Lunch:</strong> {todayPlan.meals.lunch.name}</li>
          <li><strong>PM snack:</strong> {todayPlan.meals.pmSnack.name}</li>
          <li><strong>Dinner:</strong> {todayPlan.meals.dinner.name}</li>
          {todayPlan.meals.dessert && (
            <li><strong>Friday dessert:</strong> {todayPlan.meals.dessert.name}</li>
          )}
        </ul>
        <h2 style={{ marginTop: 16 }}>Movement, breath, and brain</h2>
        <ul>
          <li><strong>Move:</strong> {todayPlan.movement}</li>
          <li><strong>Breathe:</strong> {todayPlan.breathwork}</li>
          <li><strong>Train:</strong> {todayPlan.game.title} — {todayPlan.game.howTo}</li>
        </ul>
        <h2 style={{ marginTop: 16 }}>Caregiver tip</h2>
        <p>{todayPlan.caregiverTip}</p>
      </div>
    </>
  )
}
