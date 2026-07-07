import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, SectionHeading, BigButton } from '@/components/ui'
import { Calendar } from 'lucide-react'

export const Route = createFileRoute('/_app/appointments/')({
  component: AppointmentsPage,
})

function AppointmentsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="Appointments"
        title="Your clinic visits"
        description="During the guided 6 months, your scheduled clinic visits are shown here."
      />

      <Card className="mb-5">
        <h3 className="font-display text-lg mb-2">Upcoming</h3>
        <div className="py-5 text-center" style={{ color: 'var(--color-ink-500)' }}>
          No upcoming appointments. Your clinic will add any new visits here.
        </div>
      </Card>

      <Card variant="sage">
        <h3 className="font-display text-xl mb-2">Need a follow-up?</h3>
        <p className="mb-4" style={{ color: 'var(--color-ink-700)' }}>
          During the 6-month guided program, follow-ups are coordinated by your clinic.
          After the program ends, follow-up visits are scheduled at the clinic's standard follow-up rate.
        </p>
        <Link to="/appointments/request" className="btn-primary inline-flex">
          <Calendar className="w-5 h-5" /> Request follow-up visit
        </Link>
      </Card>
    </div>
  )
}
