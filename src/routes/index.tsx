import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Heart,
  ArrowRight,
  Flower2,
  Phone,
  ExternalLink,
} from 'lucide-react'
import { deriveState } from '@/lib/program'
import { CLINIC, telHref } from '@/lib/clinic'
import {
  applySession,
  consumeResumeFromUrl,
  loadSession,
} from '@/lib/session'

export const Route = createFileRoute('/')({
  component: Landing,
})

type LocalState = {
  ready: boolean
  isReturning: boolean
  patientName: string
  currentDay: number
  currentWeek: number
}

const DEFAULT_LOCAL: LocalState = {
  ready: false,
  isReturning: false,
  patientName: 'Friend',
  currentDay: 1,
  currentWeek: 1,
}

function readLocalState(): LocalState {
  if (typeof window === 'undefined') return DEFAULT_LOCAL
  try {
    const prefsRaw = window.localStorage.getItem('bredesen.prefs.v1')
    const workbookRaw = window.localStorage.getItem('bredesen.workbook.v1')
    const patientName =
      prefsRaw && JSON.parse(prefsRaw).patientName
        ? JSON.parse(prefsRaw).patientName
        : 'Friend'

    if (!workbookRaw) {
      return { ...DEFAULT_LOCAL, ready: true, patientName }
    }
    const store = JSON.parse(workbookRaw)
    const state = deriveState({
      completedDays: Array.isArray(store.completedDays) ? store.completedDays : [],
      lastCompletedAt: store.lastCompletedAt ?? null,
      streak: store.streak ?? 0,
      isPaused: !!store.isPaused,
      startDate: store.startDate ?? null,
      repeatedDays: Array.isArray(store.repeatedDays) ? store.repeatedDays : [],
    })
    return {
      ready: true,
      isReturning: state.daysCompleted > 0,
      patientName,
      currentDay: state.currentDay,
      currentWeek: state.currentWeek,
    }
  } catch {
    return { ...DEFAULT_LOCAL, ready: true }
  }
}

function Landing() {
  const [s, setS] = useState<LocalState>(DEFAULT_LOCAL)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    // Honour a /r resume redirect: pull the email/name/token out of the
    // URL, write it into localStorage, then fetch the latest server-side
    // progress so the dashboard reflects whatever was completed on
    // another device.
    const resumed = consumeResumeFromUrl()
    if (resumed) {
      applySession(resumed)
      fetch(`/api/patient-progress?email=${encodeURIComponent(resumed.email)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data?.found) applySession(data.patient)
          setS(readLocalState())
          setHasSession(true)
        })
        .catch(() => {
          setS(readLocalState())
          setHasSession(true)
        })
      return
    }
    setS(readLocalState())
    setHasSession(!!loadSession()?.email)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Slim header — branding + clinic phone */}
      <header
        className="px-4 sm:px-6 flex items-center justify-between max-w-4xl mx-auto"
        style={{ minHeight: 56, paddingTop: 12, paddingBottom: 12 }}
      >
        <Link to="/" className="flex items-center gap-2" aria-label="Home">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 30,
              height: 30,
              background:
                'linear-gradient(135deg, var(--sage-300) 0%, var(--sage-600) 100%)',
            }}
          >
            <Flower2 className="w-4 h-4" style={{ color: 'white' }} />
          </div>
          <div className="leading-tight">
            <div
              className="font-display"
              style={{
                color: 'var(--sage-900)',
                fontSize: '1rem',
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
              }}
            >
              The Bredesen Protocol
            </div>
            <div
              style={{ color: 'var(--ink-500)', fontSize: '0.75rem', lineHeight: 1.2 }}
            >
              Dr. Thomas
            </div>
          </div>
        </Link>
        <a
          href={telHref}
          className="btn-quiet"
          style={{ minHeight: 40, padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
          aria-label={`Call the clinic at ${CLINIC.phoneDisplay}`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{CLINIC.phoneDisplay}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </header>

      {/* Hero — minimal, one CTA */}
      <section
        className="px-4 sm:px-6 max-w-2xl mx-auto text-center"
        style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold mb-4"
          style={{
            backgroundColor: 'var(--sand-100)',
            color: 'var(--sand-700)',
            fontSize: '0.85rem',
          }}
        >
          <Heart className="w-3.5 h-3.5" /> You are welcome here.
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(1.9rem, 1.2rem + 2.5vw, 2.8rem)',
            lineHeight: 1.1,
            color: 'var(--ink-900)',
            letterSpacing: '-0.01em',
          }}
        >
          {s.ready && s.isReturning ? (
            <>Welcome back, {s.patientName}.</>
          ) : (
            <>A gentle, guided workbook for brain health.</>
          )}
        </h1>

        <p
          className="mt-4 mx-auto"
          style={{
            maxWidth: '36ch',
            fontSize: '1.15rem',
            lineHeight: 1.55,
            color: 'var(--ink-700)',
          }}
        >
          {s.ready && s.isReturning ? (
            <>
              You are on <strong>Week {s.currentWeek}</strong> ·{' '}
              <strong>Day {s.currentDay}</strong>. We will tell you exactly what
              to do today.
            </>
          ) : (
            <>
              Each day, we tell you exactly what to do. About 15 gentle minutes
              — one small step at a time.
            </>
          )}
        </p>

        <div className="mt-7 flex flex-col items-center gap-3">
          <Link
            to={hasSession ? '/dashboard' : '/sign-in'}
            className="btn-primary"
            style={{
              minHeight: 64,
              padding: '1.1rem 2rem',
              fontSize: '1.15rem',
              fontWeight: 700,
            }}
          >
            {hasSession
              ? s.isReturning
                ? `Continue My Workbook · Day ${s.currentDay}`
                : 'Continue My Workbook'
              : 'Sign in or create my account'}
            <ArrowRight className="w-5 h-5" />
          </Link>
          {hasSession && (
            <Link
              to="/sign-in"
              className="text-sm"
              style={{ color: 'var(--ink-500)' }}
            >
              Switch account
            </Link>
          )}
        </div>

        <p
          className="mt-4"
          style={{ color: 'var(--ink-500)', fontSize: '0.92rem' }}
        >
          You're doing great. Progress beats perfection.
        </p>
      </section>

      {/* Single quiet support footer */}
      <section className="px-4 sm:px-6 pb-10">
        <div
          className="max-w-xl mx-auto rounded-2xl p-5 sm:p-6"
          style={{
            background: 'var(--cream-soft)',
            border: '1px solid rgba(141, 170, 145, 0.3)',
            textAlign: 'center',
          }}
        >
          <h3
            className="font-display"
            style={{ fontSize: '1.1rem', color: 'var(--ink-900)', lineHeight: 1.2 }}
          >
            We are here when you need us.
          </h3>
          <p className="mt-1" style={{ color: 'var(--ink-700)', fontSize: '0.95rem' }}>
            {CLINIC.name} · {CLINIC.hours}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <a
              href={telHref}
              className="btn-secondary"
              style={{ minHeight: 48, padding: '0.65rem 1rem', fontSize: '0.95rem' }}
            >
              <Phone className="w-4 h-4" /> Call {CLINIC.phoneDisplay}
            </a>
            <a
              href={CLINIC.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quiet"
              style={{ minHeight: 48, padding: '0.65rem 1rem', fontSize: '0.95rem' }}
            >
              Open Healthie <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center" style={{ color: 'var(--ink-500)' }}>
        <div style={{ fontSize: '0.85rem' }}>
          {CLINIC.name} · © 2026 · Made with care.
        </div>
      </footer>
    </div>
  )
}
