import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ClipboardList,
  ExternalLink,
  FileText,
  FolderOpen,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { Card, SectionHeading } from '@/components/ui'
import { CLINIC, telHref } from '@/lib/clinic'

export const Route = createFileRoute('/_app/action-plan')({
  component: ActionPlanHelp,
})

const smsHref =
  'sms:' +
  CLINIC.phoneRaw +
  '?&body=' +
  encodeURIComponent(
    'Hi Amber, I need help understanding my action plan and next steps in Healthie.',
  )

function ActionPlanHelp() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm mb-3"
        style={{ color: 'var(--ink-500)' }}
      >
        <ArrowLeft className="w-4 h-4" /> Dashboard
      </Link>

      <SectionHeading
        eyebrow="Your action plan"
        title="Where can I find my action plan?"
        description="Your personalized next steps from your visit live in Healthie — here is exactly where to look."
      />

      <Card variant="sage" className="mb-5">
        <div className="flex items-start gap-3">
          <div
            className="rounded-full w-11 h-11 flex items-center justify-center shrink-0"
            style={{
              background: 'white',
              border: '1px solid var(--sage-300)',
            }}
          >
            <FolderOpen
              className="w-5 h-5"
              style={{ color: 'var(--sage-700)' }}
            />
          </div>
          <div>
            <div
              className="eyebrow"
              style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
            >
              Step 1
            </div>
            <h3
              className="font-display mt-0.5"
              style={{ fontSize: '1.2rem', color: 'var(--ink-900)' }}
            >
              Open your secure Healthie portal
            </h3>
            <p
              className="mt-1"
              style={{ color: 'var(--ink-700)', fontSize: '1rem' }}
            >
              Use the email the clinic has on file. If this is your first time
              signing in, Healthie will email you a set-up link.
            </p>
            <a
              href={CLINIC.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-3"
              style={{ minHeight: 48, padding: '0.75rem 1.25rem' }}
            >
              Open secure Healthie portal
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Card>

      <Card className="mb-5">
        <div className="flex items-start gap-3">
          <div
            className="rounded-full w-11 h-11 flex items-center justify-center shrink-0"
            style={{
              background: 'var(--cream-50)',
              border: '1px solid var(--sage-200)',
            }}
          >
            <FileText
              className="w-5 h-5"
              style={{ color: 'var(--sage-700)' }}
            />
          </div>
          <div>
            <div
              className="eyebrow"
              style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
            >
              Step 2
            </div>
            <h3
              className="font-display mt-0.5"
              style={{ fontSize: '1.2rem', color: 'var(--ink-900)' }}
            >
              Go to <em>Documents → Session Notes</em>
            </h3>
            <p
              className="mt-1"
              style={{ color: 'var(--ink-700)', fontSize: '1rem' }}
            >
              Your most recent visit notes and recommendations from Dr. Thomas
              are in the <strong>Session Notes</strong> folder. Open the newest
              one at the top.
            </p>
            <ul
              className="mt-2 pl-5 list-disc"
              style={{ color: 'var(--ink-700)', fontSize: '0.98rem' }}
            >
              <li>Look for the visit date you remember.</li>
              <li>Scroll down to the "Plan" or "Recommendations" section.</li>
              <li>That is your action plan.</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card variant="warm" className="mb-5">
        <div className="flex items-start gap-3">
          <div
            className="rounded-full w-11 h-11 flex items-center justify-center shrink-0"
            style={{
              background: 'white',
              border: '1px solid var(--sand-300)',
            }}
          >
            <ClipboardList
              className="w-5 h-5"
              style={{ color: 'var(--sand-700)' }}
            />
          </div>
          <div className="flex-1">
            <div
              className="eyebrow"
              style={{ color: 'var(--sand-700)', fontSize: '0.78rem' }}
            >
              Need a hand?
            </div>
            <h3
              className="font-display mt-0.5"
              style={{ fontSize: '1.2rem', color: 'var(--ink-900)' }}
            >
              Help me with my notes
            </h3>
            <p
              className="mt-1"
              style={{ color: 'var(--ink-700)', fontSize: '1rem' }}
            >
              If you cannot find your notes, or if something does not make
              sense, text Amber at the clinic. She will walk you through it
              and answer any questions.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={smsHref}
                className="btn-primary"
                style={{ minHeight: 48, padding: '0.7rem 1.15rem' }}
              >
                <MessageCircle className="w-4 h-4" />
                Text Amber for help
              </a>
              <a
                href={telHref}
                className="btn-secondary"
                style={{ minHeight: 48, padding: '0.7rem 1.15rem' }}
              >
                <Phone className="w-4 h-4" />
                Call clinic · {CLINIC.phoneDisplay}
              </a>
            </div>
            <p
              className="mt-2 text-caption"
              style={{ color: 'var(--ink-500)', fontSize: '0.85rem' }}
            >
              {CLINIC.hours}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-display" style={{ fontSize: '1.1rem' }}>
          When to ask for help
        </h3>
        <ul
          className="mt-2 pl-5 list-disc space-y-1"
          style={{ color: 'var(--ink-700)', fontSize: '0.98rem' }}
        >
          <li>You feel stuck, or you are not sure what to do next.</li>
          <li>You cannot find your action plan in Healthie.</li>
          <li>Your symptoms feel worse than usual.</li>
          <li>You feel overwhelmed by the program.</li>
          <li>You need help using the portal or scheduling an appointment.</li>
        </ul>
        <p
          className="mt-3 text-caption"
          style={{ color: 'var(--ink-500)', fontSize: '0.88rem' }}
        >
          If this is a medical emergency, call <strong>911</strong> right away.
        </p>
      </Card>
    </div>
  )
}
