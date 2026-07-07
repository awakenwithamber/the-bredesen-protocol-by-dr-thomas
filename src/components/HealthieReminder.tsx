import { ExternalLink, Lock } from 'lucide-react'
import { CLINIC } from '@/lib/clinic'

/**
 * Healthie portal reminder. The Bredesen Protocol clinic posts patient session
 * notes and personalised Action Plans into Healthie after every appointment.
 * Patients consistently miss these because they don't know to look in the
 * Documents section, so the reminder appears on every key page.
 */
export function HealthieReminder({
  variant = 'full',
}: {
  variant?: 'full' | 'compact'
}) {
  if (variant === 'compact') {
    return (
      <section
        className="rounded-2xl p-4 sm:p-5"
        style={{
          background: 'var(--sage-800)',
          color: 'white',
          border: '1px solid var(--sage-900)',
        }}
        aria-label="Healthie portal reminder"
      >
        <div className="flex items-start gap-3">
          <div
            className="rounded-full flex items-center justify-center shrink-0"
            style={{
              width: 36,
              height: 36,
              background: 'rgba(255,255,255,0.15)',
            }}
          >
            <Lock className="w-4 h-4" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              <strong>Reminder:</strong> Check your Healthie portal for your
              latest session notes. Go to <em>Documents</em>, scroll down to
              your <em>Action Plan</em>, and take care of any next steps Dr.
              Thomas has listed. The sooner you do, the sooner we can help you
              even more.
            </p>
            <a
              href={CLINIC.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 rounded-xl font-semibold"
              style={{
                background: 'white',
                color: 'var(--sage-900)',
                padding: '0.7rem 1.1rem',
                fontSize: '1rem',
                minHeight: 48,
              }}
            >
              Open Healthie Portal
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: 'var(--sage-800)',
        color: 'white',
        border: '1px solid var(--sage-900)',
        boxShadow: 'var(--shadow-card)',
      }}
      aria-label="Healthie portal reminder"
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="rounded-full flex items-center justify-center shrink-0"
          style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.15)',
          }}
        >
          <Lock className="w-5 h-5" aria-hidden />
        </div>
        <div>
          <h2
            className="font-display"
            style={{
              fontSize: '1.25rem',
              lineHeight: 1.25,
              color: 'white',
            }}
          >
            Check Your Session Notes &amp; Action Plan
          </h2>
          <p
            className="mt-1"
            style={{
              fontSize: '1rem',
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            After every appointment, Dr. Thomas adds your personal session
            notes and a custom Action Plan to your Healthie portal.
          </p>
        </div>
      </div>

      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        <div
          className="font-semibold mb-2"
          style={{ fontSize: '1rem', color: 'white' }}
        >
          Here's how to find it:
        </div>
        <ol
          className="space-y-1.5 list-decimal pl-5"
          style={{
            fontSize: '0.98rem',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.92)',
          }}
        >
          <li>Open your Healthie portal (button below).</li>
          <li>
            Go to the <strong>Documents</strong> section.
          </li>
          <li>
            Scroll down until you see your most recent{' '}
            <strong>Action Plan</strong> or session notes.
          </li>
          <li>Review any labs, tests, or next steps listed there.</li>
        </ol>
      </div>

      <p
        style={{
          fontSize: '0.95rem',
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.85)',
        }}
      >
        You can complete these at your own pace — but the sooner you take care
        of them, the sooner Dr. Thomas can find more answers and build even
        better support for you.
      </p>

      <a
        href={CLINIC.portalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-4 rounded-xl font-semibold"
        style={{
          background: 'white',
          color: 'var(--sage-900)',
          padding: '0.85rem 1.25rem',
          fontSize: '1.05rem',
          minHeight: 52,
        }}
      >
        <Lock className="w-4 h-4" />
        Open My Healthie Portal
        <ExternalLink className="w-4 h-4" />
      </a>
    </section>
  )
}
