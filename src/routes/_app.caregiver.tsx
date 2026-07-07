import { createFileRoute, Link } from '@tanstack/react-router'
import { usePreferences } from '@/lib/preferences'
import { useWorkbook } from '@/lib/program'
import { phases } from '@/content/phases'
import { planForDay } from '@/content/curriculum'
import { Card, SectionHeading, ProgressBar, Chip } from '@/components/ui'
import {
  Apple,
  CheckCircle2,
  Heart,
  MessageCircle,
  Printer,
  Phone,
  ExternalLink,
  MapPin,
  LifeBuoy,
} from 'lucide-react'
import { CLINIC, telHref } from '@/lib/clinic'

export const Route = createFileRoute('/_app/caregiver')({
  component: CaregiverDashboard,
})

function CaregiverDashboard() {
  const { prefs } = usePreferences()
  const { state, ready } = useWorkbook(prefs.startDate, prefs.patientName)
  if (!ready) return null

  const phase = phases.find((p) => p.number === state.currentPhase) ?? phases[0]
  const plan = planForDay(state.currentDay)
  const daysRemaining = Math.max(0, state.totalDays - state.daysCompleted)

  const threeActions = [
    'Cook one meal together this week — no phone, no TV.',
    'Take one short walk together when the weather allows.',
    'Read one lesson aloud over tea. Then sit in silence for a moment.',
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="Caregiver View"
        title={`Supporting ${prefs.patientName}`}
        description="This is your quiet view into their workbook. You are a companion, not a coach."
      />

      {/* Clinic support — visible first, always a tap away */}
      <Card className="mb-6" variant="sage">
        <div className="flex items-start gap-3 flex-col sm:flex-row sm:items-center">
          <div
            className="rounded-full w-12 h-12 flex items-center justify-center shrink-0"
            style={{ background: 'white' }}
          >
            <LifeBuoy className="w-5 h-5" style={{ color: 'var(--sage-800)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="eyebrow"
              style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
            >
              Clinic support
            </div>
            <div
              className="font-display"
              style={{ fontSize: '1.2rem', color: 'var(--ink-900)', lineHeight: 1.2 }}
            >
              {CLINIC.name}
            </div>
            <div style={{ color: 'var(--ink-700)', fontSize: '0.95rem', marginTop: 2 }}>
              {CLINIC.address.oneLine} · {CLINIC.hours}
            </div>
            <div
              style={{ color: 'var(--ink-500)', fontSize: '0.85rem', marginTop: 1 }}
            >
              Phone {CLINIC.phoneDisplay} · Fax {CLINIC.faxDisplay}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={telHref}
            className="btn-primary"
            style={{ minHeight: 48, padding: '0.7rem 1.1rem', fontSize: '0.98rem' }}
          >
            <Phone className="w-4 h-4" /> Call clinic
          </a>
          <a
            href={CLINIC.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ minHeight: 48, padding: '0.7rem 1.1rem', fontSize: '0.98rem' }}
          >
            Open secure portal <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={CLINIC.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-quiet"
            style={{ minHeight: 48, padding: '0.7rem 1.1rem', fontSize: '0.98rem' }}
          >
            <MapPin className="w-4 h-4" /> Directions
          </a>
          <Link
            to="/appointments/request"
            className="btn-quiet"
            style={{ minHeight: 48, padding: '0.7rem 1.1rem', fontSize: '0.98rem' }}
          >
            Request appointment
          </Link>
        </div>

        <div
          className="mt-4 p-3 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.7)',
            fontSize: '0.9rem',
            color: 'var(--ink-700)',
            lineHeight: 1.5,
          }}
        >
          <div className="font-semibold mb-1" style={{ color: 'var(--ink-900)' }}>
            Please reach out if…
          </div>
          <ul className="pl-5 list-disc space-y-0.5">
            <li>You feel stuck or unsure what to do next.</li>
            <li>Symptoms are getting worse.</li>
            <li>You feel overwhelmed or worn down.</li>
            <li>You need help using the portal or booking a visit.</li>
          </ul>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        <Card variant="sage" className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5" style={{ color: 'var(--color-sage-600)' }} />
            <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-sage-700)' }}>
              Where they are right now
            </div>
          </div>
          <div className="font-display text-xl">
            Phase {phase.number} · Week {state.currentWeek} · Day {state.currentDay}
          </div>
          <p className="mt-2" style={{ color: 'var(--color-ink-700)' }}>
            Intention: <em>{phase.weeklyIntention}</em>
          </p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <Chip>Phase {phase.number}</Chip>
            <Chip tone="sand">Day {state.currentDay} of {state.totalDays}</Chip>
            <Chip tone="sky">{state.percentComplete}% complete</Chip>
            {state.isPaused && <Chip tone="sand">Paused</Chip>}
          </div>
        </Card>
        <Card variant="warm">
          <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: '#7a5c29' }}>
            Today's tip for you
          </div>
          <p>{plan.caregiverTip}</p>
        </Card>
      </div>

      <SectionHeading title="Three clear ways to help this week" />
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {threeActions.map((a, i) => (
          <Card key={i}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--color-sage-500)' }} />
              <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-sage-600)' }}>
                Helpful action #{i + 1}
              </div>
            </div>
            <p>{a}</p>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Apple className="w-5 h-5" style={{ color: 'var(--color-sage-600)' }} />
            <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-sage-600)' }}>
              Today's meals
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li><strong>Breakfast:</strong> {plan.meals.breakfast.name}</li>
            <li><strong>AM snack:</strong> {plan.meals.amSnack.name}</li>
            <li><strong>Lunch:</strong> {plan.meals.lunch.name}</li>
            <li><strong>PM snack:</strong> {plan.meals.pmSnack.name}</li>
            <li><strong>Dinner:</strong> {plan.meals.dinner.name}</li>
            {plan.meals.dessert && (
              <li><strong>Friday dessert:</strong> {plan.meals.dessert.name}</li>
            )}
          </ul>
          <Link to="/today" className="btn-secondary mt-4" style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.9rem' }}>
            Open today's workbook
          </Link>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5" style={{ color: 'var(--color-sage-600)' }} />
            <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-sage-600)' }}>
              A gentle conversation starter
            </div>
          </div>
          <p className="mb-2">
            <strong>{plan.game.title}</strong> — play it together. {plan.game.howTo}
          </p>
          <p className="text-sm" style={{ color: 'var(--color-ink-500)' }}>
            {plan.game.encouragement}
          </p>
        </Card>
      </div>

      <SectionHeading title="Their progress, softly" />
      <Card className="mb-5">
        <ProgressBar percent={state.percentComplete} />
        <div className="mt-2 text-sm" style={{ color: 'var(--color-ink-500)' }}>
          {state.daysCompleted} days completed · {daysRemaining} days remaining · Streak: {state.streak}
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => window.print()} className="btn-primary">
          <Printer className="w-5 h-5" /> Print caregiver sheet
        </button>
        <Link to="/learning/caregiver-role" className="btn-secondary">
          Read: Your role, gently
        </Link>
      </div>
    </div>
  )
}
