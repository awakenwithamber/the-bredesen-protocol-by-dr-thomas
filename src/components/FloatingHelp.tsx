import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  LifeBuoy,
  Phone,
  X,
  HeartPulse,
  ClipboardList,
  Eye,
  ExternalLink,
  MapPin,
  AlertCircle,
  MessageCircle,
} from 'lucide-react'
import { CLINIC, telHref } from '@/lib/clinic'

const smsHref =
  'sms:' +
  CLINIC.phoneRaw +
  '?&body=' +
  encodeURIComponent(
    'Hi Amber, I need help understanding my action plan and next steps in Healthie.',
  )

export function FloatingHelp() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="help-fab no-print"
        aria-label="Need help?"
        title="Need help?"
      >
        <LifeBuoy style={{ width: 18, height: 18 }} aria-hidden />
        <span className="help-fab-label">Help</span>
      </button>

      {open && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Help options"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="modal-card" style={{ padding: '1.5rem' }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div
                  className="eyebrow"
                  style={{ color: 'var(--sand-700)', fontSize: '0.85rem' }}
                >
                  Here to help
                </div>
                <h2
                  className="text-section mt-1"
                  style={{ fontSize: '1.35rem' }}
                >
                  How can we support you?
                </h2>
                <p
                  className="mt-1"
                  style={{ color: 'var(--ink-500)', fontSize: '0.9rem', lineHeight: 1.45 }}
                >
                  {CLINIC.name} · {CLINIC.hours}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  background: 'white',
                  border: '1px solid var(--sage-200)',
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              <a
                href={telHref}
                className="help-row"
                style={{ background: 'var(--sage-50)' }}
              >
                <div className="help-row-icon" style={{ background: 'var(--sage-200)' }}>
                  <Phone className="w-4 h-4" style={{ color: 'var(--sage-800)' }} />
                </div>
                <div className="flex-1">
                  <div className="help-row-title">Call the clinic</div>
                  <div className="help-row-sub">
                    {CLINIC.phoneDisplay} · {CLINIC.hours}
                  </div>
                </div>
              </a>

              <a
                href={CLINIC.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="help-row"
                style={{ background: 'var(--teal-50)' }}
              >
                <div className="help-row-icon" style={{ background: 'var(--teal-100)' }}>
                  <ExternalLink className="w-4 h-4" style={{ color: 'var(--teal-700)' }} />
                </div>
                <div className="flex-1">
                  <div className="help-row-title">Open secure portal</div>
                  <div className="help-row-sub">
                    Messages, records &amp; appointments — opens Healthie
                  </div>
                </div>
              </a>

              <Link
                to="/action-plan"
                onClick={() => setOpen(false)}
                className="help-row"
                style={{ background: 'var(--sage-50)' }}
              >
                <div className="help-row-icon" style={{ background: 'var(--sage-200)' }}>
                  <ClipboardList className="w-4 h-4" style={{ color: 'var(--sage-800)' }} />
                </div>
                <div className="flex-1">
                  <div className="help-row-title">Where is my action plan?</div>
                  <div className="help-row-sub">
                    Healthie → Documents → Session Notes folder
                  </div>
                </div>
              </Link>

              <a
                href={smsHref}
                className="help-row"
                style={{ background: 'var(--cream-warm)' }}
              >
                <div className="help-row-icon" style={{ background: 'var(--sand-100)' }}>
                  <MessageCircle className="w-4 h-4" style={{ color: 'var(--sand-700)' }} />
                </div>
                <div className="flex-1">
                  <div className="help-row-title">Help me with my notes</div>
                  <div className="help-row-sub">
                    Text Amber · prefilled message ready to send
                  </div>
                </div>
              </a>

              <a
                href={CLINIC.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="help-row"
                style={{ background: 'var(--cream-warm)' }}
              >
                <div className="help-row-icon" style={{ background: 'var(--sand-100)' }}>
                  <MapPin className="w-4 h-4" style={{ color: 'var(--sand-700)' }} />
                </div>
                <div className="flex-1">
                  <div className="help-row-title">Directions to clinic</div>
                  <div className="help-row-sub">{CLINIC.address.oneLine}</div>
                </div>
              </a>

              <Link
                to="/appointments/request"
                onClick={() => setOpen(false)}
                className="help-row"
                style={{ background: 'var(--sage-50)' }}
              >
                <div
                  className="help-row-icon"
                  style={{ background: 'var(--sage-200)' }}
                >
                  <ClipboardList
                    className="w-4 h-4"
                    style={{ color: 'var(--sage-800)' }}
                  />
                </div>
                <div className="flex-1">
                  <div className="help-row-title">Request an appointment</div>
                  <div className="help-row-sub">The clinic will call you back</div>
                </div>
              </Link>

              <Link
                to="/hard-day"
                onClick={() => setOpen(false)}
                className="help-row"
                style={{ background: 'var(--rose-200)' }}
              >
                <div className="help-row-icon" style={{ background: 'white' }}>
                  <HeartPulse className="w-4 h-4" style={{ color: '#7a3b33' }} />
                </div>
                <div className="flex-1">
                  <div className="help-row-title">Today feels hard</div>
                  <div className="help-row-sub">Switch to the gentle 5-step view</div>
                </div>
              </Link>

              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="help-row"
                style={{ background: 'var(--teal-50)' }}
              >
                <div
                  className="help-row-icon"
                  style={{ background: 'var(--teal-100)' }}
                >
                  <Eye className="w-4 h-4" style={{ color: 'var(--teal-700)' }} />
                </div>
                <div className="flex-1">
                  <div className="help-row-title">Simple view</div>
                  <div className="help-row-sub">Fewer cards, bigger text</div>
                </div>
              </Link>
            </div>

            <div
              className="mt-4 p-3 rounded-xl"
              style={{
                background: 'rgba(141,170,145,0.1)',
                fontSize: '0.88rem',
                color: 'var(--ink-700)',
                lineHeight: 1.5,
              }}
            >
              <div
                className="flex items-center gap-1.5 mb-1 font-semibold"
                style={{ color: 'var(--ink-900)' }}
              >
                <LifeBuoy className="w-3.5 h-3.5" /> Please call the clinic if…
              </div>
              <ul className="pl-5 list-disc space-y-0.5">
                <li>You feel stuck or unsure what to do next.</li>
                <li>Your symptoms feel worse than usual.</li>
                <li>You are overwhelmed and need a gentler plan.</li>
                <li>You need help using the portal or an appointment.</li>
              </ul>
            </div>

            <div
              className="mt-3 p-3 rounded-xl flex items-start gap-2"
              style={{
                background: 'rgba(201, 142, 132, 0.18)',
                fontSize: '0.85rem',
                color: '#7a3b33',
                lineHeight: 1.5,
              }}
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                If this is a medical emergency, call <strong>911</strong> right
                away.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
