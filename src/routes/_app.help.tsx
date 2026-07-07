import { createFileRoute } from '@tanstack/react-router'
import {
  Phone,
  ExternalLink,
  MapPin,
  FlaskConical,
  HandHelping,
  Frown,
  AlertTriangle,
  HelpCircle,
  Monitor,
  CalendarDays,
  Printer,
  Lock,
} from 'lucide-react'
import { CLINIC, telHref } from '@/lib/clinic'
import { HealthieReminder } from '@/components/HealthieReminder'

export const Route = createFileRoute('/_app/help')({
  component: HelpPage,
})

const reasons = [
  {
    icon: HandHelping,
    text: "You feel stuck or don't know what to do next",
  },
  {
    icon: Frown,
    text: 'Your symptoms feel worse or something feels wrong',
  },
  {
    icon: AlertTriangle,
    text: 'You feel overwhelmed or are thinking about stopping',
  },
  {
    icon: HelpCircle,
    text: "You don't understand a step, lesson, or recommendation",
  },
  {
    icon: Monitor,
    text: 'You need help with the Healthie patient portal',
  },
  {
    icon: CalendarDays,
    text: 'You need to schedule or change an appointment',
  },
]

function HelpPage() {
  function onPrint() {
    if (typeof window !== 'undefined') window.print()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Heading */}
      <header className="mb-6">
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(1.9rem, 1.2rem + 2.2vw, 2.6rem)',
            lineHeight: 1.1,
            color: 'var(--ink-900)',
            letterSpacing: '-0.01em',
          }}
        >
          Need Help?
        </h1>
        <p
          className="mt-2"
          style={{ fontSize: '1.15rem', lineHeight: 1.55, color: 'var(--ink-700)' }}
        >
          We are always here for you. Please never hesitate to reach out.
        </p>
      </header>

      {/* When to ask for help */}
      <section
        className="rounded-2xl p-5 sm:p-6 mb-6"
        style={{
          background: 'var(--cream-soft)',
          border: '1px solid var(--sage-200)',
        }}
        aria-label="When to ask for help"
      >
        <h2
          className="font-display"
          style={{ fontSize: '1.25rem', color: 'var(--ink-900)', lineHeight: 1.25 }}
        >
          Any of these reasons is enough to reach out.
        </h2>
        <ul className="mt-3 space-y-2.5 list-none p-0 m-0">
          {reasons.map((r) => {
            const Icon = r.icon
            return (
              <li
                key={r.text}
                className="rounded-xl p-3 flex items-start gap-3"
                style={{
                  background: 'white',
                  border: '1px solid var(--sage-200)',
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{
                    width: 40,
                    height: 40,
                    background: 'var(--sage-100)',
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: 'var(--sage-800)' }}
                    aria-hidden
                  />
                </div>
                <div
                  className="flex-1"
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.5,
                    color: 'var(--ink-800)',
                    paddingTop: 8,
                  }}
                >
                  {r.text}
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Action buttons 2x2 grid */}
      <section className="mb-7">
        <div
          className="eyebrow mb-2"
          style={{ color: 'var(--ink-500)', fontSize: '0.82rem' }}
        >
          Quick actions
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={telHref}
            className="rounded-2xl flex items-start gap-3 p-4"
            style={{
              minHeight: 80,
              background: 'var(--sand-700)',
              color: 'white',
              border: '1px solid var(--sand-700)',
            }}
            aria-label={`Call the clinic at ${CLINIC.phoneDisplay}`}
          >
            <div
              className="rounded-full flex items-center justify-center shrink-0"
              style={{
                width: 44,
                height: 44,
                background: 'rgba(255,255,255,0.18)',
              }}
            >
              <Phone className="w-5 h-5" aria-hidden />
            </div>
            <div className="flex-1">
              <div className="font-display" style={{ fontSize: '1.1rem' }}>
                Call the Clinic
              </div>
              <div style={{ fontSize: '0.95rem', opacity: 0.92 }}>
                {CLINIC.phoneDisplay}
              </div>
            </div>
          </a>

          <a
            href={CLINIC.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl flex items-start gap-3 p-4"
            style={{
              minHeight: 80,
              background: 'var(--sage-800)',
              color: 'white',
              border: '1px solid var(--sage-900)',
            }}
          >
            <div
              className="rounded-full flex items-center justify-center shrink-0"
              style={{
                width: 44,
                height: 44,
                background: 'rgba(255,255,255,0.18)',
              }}
            >
              <Lock className="w-5 h-5" aria-hidden />
            </div>
            <div className="flex-1">
              <div className="font-display" style={{ fontSize: '1.1rem' }}>
                Open Secure Portal
              </div>
              <div style={{ fontSize: '0.95rem', opacity: 0.92 }}>
                secure.gethealthie.com
              </div>
            </div>
          </a>

          <a
            href={CLINIC.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl flex items-start gap-3 p-4"
            style={{
              minHeight: 80,
              background: 'white',
              border: '1px solid var(--sage-200)',
            }}
          >
            <div
              className="rounded-full flex items-center justify-center shrink-0"
              style={{
                width: 44,
                height: 44,
                background: 'var(--sage-100)',
              }}
            >
              <MapPin
                className="w-5 h-5"
                style={{ color: 'var(--sage-800)' }}
                aria-hidden
              />
            </div>
            <div className="flex-1">
              <div
                className="font-display"
                style={{ fontSize: '1.1rem', color: 'var(--ink-900)' }}
              >
                Get Directions
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--ink-500)' }}>
                {CLINIC.address.oneLine}
              </div>
            </div>
          </a>

          <a
            href="https://labs.functionalneurologyslc.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl flex items-start gap-3 p-4"
            style={{
              minHeight: 80,
              background: 'white',
              border: '1px solid var(--sage-200)',
            }}
          >
            <div
              className="rounded-full flex items-center justify-center shrink-0"
              style={{
                width: 44,
                height: 44,
                background: 'var(--teal-100)',
              }}
            >
              <FlaskConical
                className="w-5 h-5"
                style={{ color: 'var(--teal-700)' }}
                aria-hidden
              />
            </div>
            <div className="flex-1">
              <div
                className="font-display"
                style={{ fontSize: '1.1rem', color: 'var(--ink-900)' }}
              >
                Order Your Labs
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--ink-500)' }}>
                labs.functionalneurologyslc.com
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Healthie session notes — full reminder */}
      <div className="mb-7">
        <HealthieReminder variant="full" />
        <p
          className="mt-3"
          style={{
            fontSize: '0.95rem',
            color: 'var(--ink-500)',
            lineHeight: 1.5,
          }}
        >
          If you have any trouble finding your notes or Action Plan, just call
          us at <strong>{CLINIC.phoneDisplay}</strong> and we will walk you
          through it step by step.
        </p>
      </div>

      {/* Clinic info card */}
      <section
        className="rounded-2xl p-5 sm:p-6 mb-6"
        style={{
          background: 'var(--ink-900)',
          color: 'white',
        }}
      >
        <div
          className="font-display"
          style={{ fontSize: '1.15rem', color: 'white', lineHeight: 1.25 }}
        >
          Functional Neurology &amp; Sleep Medicine
        </div>
        <div
          className="mt-1"
          style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}
        >
          Dr. Maya Thomas, MD · Board-Certified Neurologist
        </div>
        <ul
          className="mt-4 space-y-1.5 list-none p-0 m-0"
          style={{ fontSize: '0.98rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}
        >
          <li>
            <Phone className="w-4 h-4 inline-block mr-2 align-text-bottom" />
            <a href={telHref} style={{ color: 'white' }}>
              {CLINIC.phoneDisplay}
            </a>
          </li>
          <li>
            <span className="inline-block mr-2" aria-hidden>
              📠
            </span>
            Fax: {CLINIC.faxDisplay}
          </li>
          <li>
            <MapPin className="w-4 h-4 inline-block mr-2 align-text-bottom" />
            {CLINIC.address.oneLine}
          </li>
          <li>
            <Lock className="w-4 h-4 inline-block mr-2 align-text-bottom" />
            <a
              href={CLINIC.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'white', textDecoration: 'underline' }}
            >
              secure.gethealthie.com
            </a>
          </li>
          <li>
            <ExternalLink className="w-4 h-4 inline-block mr-2 align-text-bottom" />
            <a
              href="https://www.functionalneurologyslc.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'white', textDecoration: 'underline' }}
            >
              functionalneurologyslc.com
            </a>
          </li>
        </ul>
      </section>

      {/* Print button */}
      <div className="mb-8">
        <button
          type="button"
          onClick={onPrint}
          className="rounded-2xl inline-flex items-center gap-2 px-5"
          style={{
            background: 'var(--cream-warm)',
            color: 'var(--ink-800)',
            border: '1px solid var(--sage-200)',
            minHeight: 52,
            fontSize: '1.05rem',
            fontWeight: 600,
          }}
        >
          <Printer className="w-5 h-5" />
          Print Today's Plan
        </button>
      </div>
    </div>
  )
}
