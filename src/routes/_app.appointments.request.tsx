import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, SectionHeading, BigButton } from '@/components/ui'
import { CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/_app/appointments/request')({
  component: RequestFollowUp,
})

function RequestFollowUp() {
  const [submitted, setSubmitted] = useState(false)
  const [reason, setReason] = useState('')
  const [preferredTime, setPreferredTime] = useState('')

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <Card variant="sage" className="text-center">
          <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-sage-600)' }} />
          <h2 className="font-display text-2xl mb-2">Request received</h2>
          <p>The clinic will reach out within 1–2 business days to schedule your follow-up visit.</p>
          <Link to="/dashboard" className="btn-secondary mt-5 inline-flex">
            Back to dashboard
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="Appointment request"
        title="Request a follow-up visit"
        description="The clinic will contact you to schedule. Follow-up visits after your 6-month program are billed at the clinic's standard follow-up rate."
      />

      <Card>
        <form
          name="followup-request"
          method="POST"
          data-netlify="true"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="space-y-4"
        >
          <input type="hidden" name="form-name" value="followup-request" />
          <label className="block">
            <span className="block text-sm font-semibold mb-1">What would you like to discuss?</span>
            <textarea
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-xl border"
              style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
              required
            />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold mb-1">Preferred time of day</span>
            <select
              name="preferredTime"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full p-3 rounded-xl border"
              style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
            >
              <option value="">Choose one</option>
              <option value="morning">Morning</option>
              <option value="midday">Midday</option>
              <option value="afternoon">Afternoon</option>
            </select>
          </label>
          <BigButton type="submit">Submit request</BigButton>
        </form>
      </Card>
    </div>
  )
}
