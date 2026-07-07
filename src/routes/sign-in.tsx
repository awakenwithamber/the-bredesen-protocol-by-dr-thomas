import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Leaf, Mail } from 'lucide-react'
import { applySession, type PatientSession } from '@/lib/session'
import { todayIso } from '@/lib/programDate'

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})

type SignInResponse = {
  ok: boolean
  isNew: boolean
  patient: PatientSession & {
    progress?: any
    position?: { currentDay: number; currentWeek: number; currentPhase: number }
  }
  error?: string
}

function SignInPage() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [startDate, setStartDate] = useState(todayIso())
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/patient-signin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          startDate,
        }),
      })
      const data = (await res.json()) as SignInResponse
      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Sorry, we could not sign you in. Please try again.')
        setSubmitting(false)
        return
      }
      applySession(data.patient)
      navigate({ to: '/dashboard' })
    } catch {
      setError('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background:
          'linear-gradient(160deg, var(--color-sand-50) 0%, var(--color-sage-50) 100%)',
      }}
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
            style={{ backgroundColor: 'white' }}
          >
            <Leaf className="w-7 h-7" style={{ color: 'var(--color-sage-600)' }} />
          </div>
          <h1 className="font-display text-3xl">Welcome</h1>
          <p className="mt-2" style={{ color: 'var(--color-ink-500)' }}>
            Sign in or create your account to continue your 6-month guided program.
          </p>
        </div>

        <div
          className="rounded-2xl p-6 border"
          style={{ backgroundColor: 'white', borderColor: 'rgba(122, 158, 122, 0.2)' }}
        >
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="block text-sm font-semibold mb-1">First name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 rounded-xl border"
                  style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
                  required
                  placeholder="Margaret"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-semibold mb-1">Last name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 rounded-xl border"
                  style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
                  required
                  placeholder="Reyes"
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-sm font-semibold mb-1">Email</span>
              <div className="relative">
                <Mail
                  className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-ink-300)' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 rounded-xl border"
                  style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="block text-sm font-semibold mb-1">Phone (optional)</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-xl border"
                style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
                placeholder="(801) 555-1212"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold mb-1">Program start date</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 rounded-xl border"
                style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
              />
              <span className="block text-xs mt-1" style={{ color: 'var(--color-ink-500)' }}>
                If the clinic has not assigned a start date, today is fine.
              </span>
            </label>

            {error && (
              <div
                className="text-sm p-3 rounded-xl"
                style={{ background: '#fff1ee', color: '#9b3a26' }}
                role="alert"
              >
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary btn-big w-full" disabled={submitting}>
              {submitting ? 'Signing you in…' : 'Enter my program'}
            </button>
          </form>
          <p className="text-xs mt-5 text-center" style={{ color: 'var(--color-ink-500)' }}>
            Your progress is saved under your email so you can resume from any device.
          </p>
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="text-sm" style={{ color: 'var(--color-ink-500)' }}>
            ← Back to welcome
          </Link>
        </div>
      </div>
    </div>
  )
}
