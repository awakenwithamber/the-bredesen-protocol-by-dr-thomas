import { createFileRoute, Link } from '@tanstack/react-router'
import { usePreferences } from '@/lib/preferences'
import { useWorkbook, formatFriendly } from '@/lib/program'
import { Card, SectionHeading, Banner } from '@/components/ui'
import { Calendar, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/_app/program-dates')({
  component: ProgramDatesPage,
})

function ProgramDatesPage() {
  const { prefs } = usePreferences()
  const { state, ready } = useWorkbook(prefs.startDate, prefs.patientName)
  if (!ready) return null

  const daysRemaining = Math.max(0, state.totalDays - state.daysCompleted)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="Program dates"
        title="Your self-paced 6-month window"
        description="These dates are a reference, not a deadline. Your workbook advances only when you mark a day complete — so nothing is lost if life slows you down."
      />

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="text-sm" style={{ color: 'var(--color-ink-500)' }}>Start date</div>
          <div className="font-display text-xl mt-1">{formatFriendly(state.startDate)}</div>
        </Card>
        <Card>
          <div className="text-sm" style={{ color: 'var(--color-ink-500)' }}>Reference end date</div>
          <div className="font-display text-xl mt-1">{formatFriendly(state.endDate)}</div>
        </Card>
        <Card variant="sage">
          <div className="text-sm" style={{ color: 'var(--color-ink-500)' }}>Workbook days remaining</div>
          <div className="font-display text-3xl mt-1" style={{ color: 'var(--color-sage-700)' }}>
            {daysRemaining}
          </div>
          <div className="text-sm mt-1" style={{ color: 'var(--color-ink-500)' }}>
            of {state.totalDays} · self-paced
          </div>
        </Card>
      </div>

      {state.status === 'not-started' && (
        <Banner tone="sage" title="Ready when you are">
          Your workbook opens at Week 1 · Phase 1 · Day 1. There is no rush.
        </Banner>
      )}
      {state.status === 'paused' && (
        <Banner tone="sand" title="Your program is paused">
          Nothing is lost. Resume whenever you are ready — the next page is still Day {state.currentDay}.
        </Banner>
      )}
      {state.status === 'active' && (
        <Banner tone="sage" title="You are in the guided window">
          Keep going at your own pace. We will send small, kind reminders at 30 days
          and 14 days before your reference end date, and then again on that date.
        </Banner>
      )}
      {state.status === 'final-month' && (
        <Banner tone="sand" title="Final month">
          {state.statusNotice}
        </Banner>
      )}
      {state.status === 'final-14-days' && (
        <Banner tone="sand" title="Final 14 days">
          {state.statusNotice}
        </Banner>
      )}
      {state.status === 'completed' && (
        <Banner tone="sky" title="Program complete">
          {state.statusNotice}
        </Banner>
      )}

      <div className="mt-8 grid md:grid-cols-2 gap-5">
        <Card variant="warm">
          <h3 className="font-display text-xl mb-2">What stays with you after 6 months</h3>
          <ul className="space-y-2">
            <li>Access to your recipes, movement, breathwork, games, and lessons.</li>
            <li>Your progress history and notes.</li>
            <li>Monthly check-in option if you enable it.</li>
          </ul>
        </Card>
        <Card variant="sky">
          <h3 className="font-display text-xl mb-2">What changes after 6 months</h3>
          <ul className="space-y-2">
            <li>Clinical follow-up visits become standard paid follow-up appointments.</li>
            <li>Daily reminder frequency quietly reduces.</li>
            <li>You can request a follow-up visit anytime from the portal.</li>
          </ul>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/appointments/request" className="btn-primary">
          <Calendar className="w-5 h-5" /> Request follow-up visit <ArrowRight className="w-5 h-5" />
        </Link>
        <Link to="/appointments" className="btn-secondary">
          View appointments
        </Link>
      </div>

      <div className="mt-10 rounded-2xl p-5 border" style={{ borderColor: 'rgba(122, 158, 122, 0.25)' }}>
        <h3 className="font-display text-lg mb-2">Timeline of what we send you</h3>
        <ul className="space-y-2 text-sm">
          <li><strong>30 days before reference end:</strong> Gentle email + dashboard notice.</li>
          <li><strong>14 days before reference end:</strong> Firmer but kind reminder, with follow-up option.</li>
          <li><strong>On reference end date:</strong> Thank-you + explanation that clinical follow-up is now a standard paid visit.</li>
          <li><strong>2 weeks after reference end:</strong> Follow-up invitation email.</li>
        </ul>
      </div>
    </div>
  )
}
