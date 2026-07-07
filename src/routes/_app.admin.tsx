import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import {
  Users,
  UserPlus,
  Mail,
  CheckCircle2,
  Activity,
  BellRing,
  MessageCircle,
  Send,
  FileText,
  X,
  Sparkles,
  PauseCircle,
  Heart,
  Flag,
  BookOpen,
  Save,
  ChevronRight,
} from 'lucide-react'
import { Card, SectionHeading, Chip } from '@/components/ui'
import { adminFlagForState, computeProgramState, formatFriendly } from '@/lib/programDate'

export const Route = createFileRoute('/_app/admin')({
  component: AdminGate,
})

const ADMIN_CREDENTIALS: Record<string, { name: string; password: string }> = {
    'mthomas@slcsleep.com': { name: 'Dr. Thomas', password: 'DrThomas2024' },
    'iesleep12@gmail.com':  { name: 'Amber',      password: 'DrThomas2024' },
  }
  const ADMIN_GATE_KEY = 'bredesen.admin.gate.v2'
  const ADMIN_WHO_KEY  = 'bredesen.admin.who.v2'

  function AdminGate() {
    const [unlocked, setUnlocked] = useState(false)
    const [checked, setChecked] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      try {
        if (typeof window !== 'undefined' &&
            window.sessionStorage.getItem(ADMIN_GATE_KEY) === 'ok') {
          setUnlocked(true)
        }
      } catch {}
      setChecked(true)
    }, [])

    if (!checked) return null
    if (unlocked) return <AdminDashboard />

    function onSubmit(e: React.FormEvent) {
      e.preventDefault()
      const normalised = email.trim().toLowerCase()
      const cred = ADMIN_CREDENTIALS[normalised]
      if (cred && password === cred.password) {
        try {
          window.sessionStorage.setItem(ADMIN_GATE_KEY, 'ok')
          window.sessionStorage.setItem(ADMIN_WHO_KEY, normalised)
        } catch {}
        setUnlocked(true)
        return
      }
      setError('Email or password not recognised. Please try again.')
    }

    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: 'white',
            border: '1px solid var(--sage-200)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <h1
            className="font-display"
            style={{ fontSize: '1.65rem', color: 'var(--ink-900)', lineHeight: 1.2 }}
          >
            Staff Only
          </h1>
          <p
            className="mt-2 mb-5"
            style={{ color: 'var(--ink-700)', fontSize: '1rem', lineHeight: 1.5 }}
          >
            This portal is for Dr. Thomas and Amber. Please sign in with your
            admin email and password to continue.
          </p>

          <form onSubmit={onSubmit} className="space-y-3">
            <label className="block">
              <span className="block text-sm font-semibold mb-1">Admin Email</span>
              <input
                type="email"
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(null) }}
                className="w-full p-3 rounded-xl border"
                style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
                placeholder="your@email.com"
                required
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold mb-1">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (error) setError(null) }}
                className="w-full p-3 rounded-xl border"
                style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
                placeholder="Enter password"
                required
              />
            </label>

            {error && (
              <div
                role="alert"
                className="text-sm p-3 rounded-xl"
                style={{ background: '#fff1ee', color: '#9b3a26' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full"
              style={{ minHeight: 52 }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  function AdminDashboard() {
  const [filter, setFilter] = useState<'all' | 'started' | 'active' | 'inactive' | 'needs-help' | 'completed'>('all')
  const [activeSection, setActiveSection] = useState<'patients' | 'content'>('patients')
  const [showAddForm, setShowAddForm] = useState(false)
  const [detailPatient, setDetailPatient] = useState<EnrichedPatient | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [livePatients, setLivePatients] = useState<LivePatient[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/patients')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setLivePatients(Array.isArray(data?.patients) ? data.patients : [])
        setLoading(false)
      })
      .catch(() => {
        setLivePatients([])
        setLoading(false)
      })
  }, [])

  async function runAdminAction(
    patientId: string,
    action: 'reminder' | 'resend-welcome' | 'help-with-notes' | 'mark-follow-up' | 'clear-follow-up',
    patientName: string,
    email?: string,
  ) {
    try {
      const res = await fetch('/api/admin/send-reminder', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ patientId, email, action, actor: (typeof window !== 'undefined' && window.sessionStorage.getItem(ADMIN_WHO_KEY)) || 'admin' }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setToast(`${data.summary ?? 'Action queued'} · ${patientName}`)
      } else {
        setToast(`Could not queue action: ${data.error ?? res.statusText}`)
      }
    } catch {
      setToast('Network error — please try again')
    }
    window.setTimeout(() => setToast(null), 3800)
  }

  async function addPatient(form: FormData) {
    const payload = {
      firstName: String(form.get('firstName') ?? '').trim(),
      lastName: String(form.get('lastName') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim() || undefined,
      startDate: String(form.get('startDate') ?? '').trim() || offsetIso(0),
      preferences: {
        displayMode: String(form.get('displayMode') ?? 'standard'),
      },
    }
    try {
      const res = await fetch('/api/enroll-patient', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setToast(`Patient enrolled: ${payload.firstName} ${payload.lastName}`)
        setShowAddForm(false)
        // Refresh roster
        const refresh = await fetch('/api/admin/patients').then((r) => r.json())
        setLivePatients(refresh.patients ?? [])
      } else {
        const data = await res.json().catch(() => ({}))
        setToast(`Enrollment failed: ${data.error ?? res.statusText}`)
      }
    } catch {
      setToast('Network error during enrollment')
    }
    window.setTimeout(() => setToast(null), 3800)
  }

  const enriched: EnrichedPatient[] = useMemo(() => {
    if (!livePatients) return []
    return livePatients.map((p) => {
      const state = computeProgramState(p.startDate)
      const isStarted = p.daysCompleted > 0
      const isActive = !p.isInactive && p.daysCompleted < p.totalDays
      return {
        id: p.id,
        name: p.name,
        firstName: p.firstName,
        email: p.email,
        phone: p.phone,
        startDate: p.startDate,
        mode: p.preferences?.displayMode ?? 'standard',
        caregiver: p.preferences?.caregiverEnabled ? 'enabled' : 'none',
        engagement:
          p.lastActivityDays === 0 && isStarted
            ? 'strong'
            : p.lastActivityDays <= 2
              ? 'moderate'
              : 'low',
        lastActivity: p.lastActivityDays,
        daysCompleted: p.daysCompleted,
        currentDay: p.currentDay,
        currentWeek: p.currentWeek,
        currentPhase: p.currentPhase,
        percentComplete: p.percentComplete,
        journalEntries: p.journalEntries,
        foodLogs: p.foodLogs,
        brainGames: p.brainGames,
        videosWatched: p.videosWatched,
        recipesViewed: p.recipesViewed,
        handoutsOpened: p.handoutsOpened,
        state,
        flag: adminFlagForState(state),
        needsHelp: p.needsHelp,
        isInactive: p.isInactive,
        isStarted,
        isActive,
      }
    })
  }, [livePatients])

  const filtered = enriched.filter((p) => {
    if (filter === 'started') return p.isStarted
    if (filter === 'active') return p.isActive
    if (filter === 'inactive') return p.isInactive
    if (filter === 'needs-help') return p.needsHelp
    if (filter === 'completed') return p.state.status === 'completed'
    return true
  })

  const counts = {
    total: enriched.length,
    started: enriched.filter((p) => p.isStarted).length,
    active: enriched.filter((p) => p.isActive).length,
    inactive: enriched.filter((p) => p.isInactive).length,
    needsHelp: enriched.filter((p) => p.needsHelp).length,
    completed: enriched.filter((p) => p.state.status === 'completed').length,
  }

  const adminWhoVal = typeof window !== 'undefined' ? (window.sessionStorage.getItem('bredesen.admin.who') || '') : ''

    if (activeSection === 'content') {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => setActiveSection('patients')}
              style={{ color: 'var(--sage-700)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
            >
              ← Back to patients
            </button>
          </div>
          <ContentEditor adminWho={adminWhoVal} />
        </div>
      )
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveSection('patients')}
            style={{ background: 'var(--sage-700)', color: '#fff', border: 'none', cursor: 'pointer', minHeight: '44px', borderRadius: '0.5rem', padding: '0.5rem 1.1rem', fontSize: '0.9rem', fontWeight: 600 }}
          >
            Patient Roster
          </button>
          <button
            onClick={() => setActiveSection('content')}
            style={{ background: 'var(--sage-100)', color: 'var(--ink-700)', border: 'none', cursor: 'pointer', minHeight: '44px', borderRadius: '0.5rem', padding: '0.5rem 1.1rem', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            ✎ Program Content
          </button>
        </div>
        <SectionHeading
          eyebrow="Clinic admin"
          title="Patient roster"
        description="A quiet, accurate view of who is in the program, who is approaching completion, and who needs a gentle nudge."
      />

      <div
        className="mb-6 p-3 rounded-xl flex flex-wrap items-center gap-3"
        style={{
          background: 'var(--cream-50)',
          border: '1px solid var(--sage-200)',
          fontSize: '0.9rem',
          color: 'var(--ink-700)',
        }}
      >
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" style={{ color: 'var(--sage-700)' }} />
          <span>
            Signed in as <strong>{(typeof window !== 'undefined' && window.sessionStorage.getItem(ADMIN_WHO_KEY)) || 'admin'}</strong>
          </span>
        </div>
        <span aria-hidden style={{ color: 'var(--ink-300)' }}>·</span>
        <span>
          Clinic: Functional Neurology & Sleep Medicine · (801) 266-5559
        </span>
      </div>

      {/* Stat chips — exactly the metrics the clinic asked for */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
        <StatCard icon={Users} label="All patients" value={counts.total} onClick={() => setFilter('all')} active={filter === 'all'} />
        <StatCard icon={Sparkles} label="Started" value={counts.started} onClick={() => setFilter('started')} active={filter === 'started'} />
        <StatCard icon={Activity} label="Active" value={counts.active} onClick={() => setFilter('active')} active={filter === 'active'} />
        <StatCard icon={PauseCircle} label="Inactive" value={counts.inactive} tone="sand" onClick={() => setFilter('inactive')} active={filter === 'inactive'} />
        <StatCard icon={Heart} label="Needs help" value={counts.needsHelp} tone="sand" onClick={() => setFilter('needs-help')} active={filter === 'needs-help'} />
        <StatCard icon={CheckCircle2} label="Completed" value={counts.completed} tone="sky" onClick={() => setFilter('completed')} active={filter === 'completed'} />
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div className="text-sm" style={{ color: 'var(--color-ink-500)' }}>
          Showing {filtered.length} {filter === 'all' ? 'patients' : 'matching patients'}
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowAddForm((s) => !s)}
          style={{ padding: '0.6rem 1.1rem', minHeight: '44px', fontSize: '0.95rem' }}
        >
          <UserPlus className="w-5 h-5" /> Add patient
        </button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <h3 className="font-display text-lg mb-3">Enroll a new patient</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              addPatient(new FormData(e.currentTarget))
            }}
            className="grid md:grid-cols-2 gap-4"
          >
            <label className="block">
              <span className="block text-sm font-semibold mb-1">First name</span>
              <input name="firstName" type="text" required className="w-full p-3 rounded-xl border" style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }} />
            </label>
            <label className="block">
              <span className="block text-sm font-semibold mb-1">Last name</span>
              <input name="lastName" type="text" required className="w-full p-3 rounded-xl border" style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }} />
            </label>
            <label className="block">
              <span className="block text-sm font-semibold mb-1">Email</span>
              <input name="email" type="email" required className="w-full p-3 rounded-xl border" style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }} />
            </label>
            <label className="block">
              <span className="block text-sm font-semibold mb-1">Phone (optional)</span>
              <input name="phone" type="tel" className="w-full p-3 rounded-xl border" style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }} />
            </label>
            <label className="block">
              <span className="block text-sm font-semibold mb-1">Program start date</span>
              <input name="startDate" type="date" required defaultValue={offsetIso(0)} className="w-full p-3 rounded-xl border" style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }} />
            </label>
            <label className="block">
              <span className="block text-sm font-semibold mb-1">Display mode preference</span>
              <select name="displayMode" className="w-full p-3 rounded-xl border" style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}>
                <option value="standard">Standard</option>
                <option value="simple">Simple</option>
              </select>
            </label>
            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="btn-primary">Create patient</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <Card>
          <p style={{ color: 'var(--ink-500)' }}>Loading patient roster…</p>
        </Card>
      ) : enriched.length === 0 ? (
        <Card>
          <p style={{ color: 'var(--ink-500)' }}>
            No patients yet. Add a patient above, or wait for the first sign-in to populate the roster.
          </p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left" style={{ color: 'var(--color-ink-500)' }}>
                  <th className="px-3 py-2">Patient</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Phase / Wk / Day</th>
                  <th className="px-3 py-2">Completion</th>
                  <th className="px-3 py-2">Last activity</th>
                  <th className="px-3 py-2">Engagement</th>
                  <th className="px-3 py-2">Needs help</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t" style={{ borderColor: 'rgba(122, 158, 122, 0.15)' }}>
                    <td className="px-3 py-3">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs" style={{ color: 'var(--color-ink-500)' }}>
                        {p.email}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Chip tone={p.isInactive ? 'sand' : p.state.status === 'completed' ? 'sky' : 'ivory'}>
                        {!p.isStarted
                          ? 'Not started'
                          : p.state.status === 'completed'
                            ? 'Completed'
                            : p.isInactive
                              ? 'Inactive'
                              : 'Active'}
                      </Chip>
                    </td>
                    <td className="px-3 py-3">
                      Phase {p.currentPhase} · Wk {p.currentWeek} · Day {p.currentDay}
                    </td>
                    <td className="px-3 py-3">
                      {p.percentComplete}% <span style={{ color: 'var(--ink-500)' }}>({p.daysCompleted})</span>
                    </td>
                    <td className="px-3 py-3">
                      {p.lastActivity === 0 ? 'Today' : `${p.lastActivity}d ago`}
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-xs" style={{ color: 'var(--ink-500)' }}>
                        Journal {p.journalEntries} · Meals {p.foodLogs} · Games {p.brainGames} · Videos {p.videosWatched}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      {p.needsHelp ? (
                        <Chip tone="sand">Yes</Chip>
                      ) : (
                        <span style={{ color: 'var(--ink-300)' }}>—</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        <button
                          className="btn-secondary"
                          style={{ padding: '0.4rem 0.8rem', minHeight: '36px', fontSize: '0.82rem' }}
                          onClick={() => runAdminAction(p.id, 'reminder', p.name, p.email)}
                          title="Send a gentle reminder"
                        >
                          <BellRing className="w-3.5 h-3.5" /> Send Reminder
                        </button>
                        <button
                          className="btn-secondary"
                          style={{ padding: '0.4rem 0.8rem', minHeight: '36px', fontSize: '0.82rem' }}
                          onClick={() => setDetailPatient(p)}
                          title="View full progress and weekly report history"
                        >
                          <Activity className="w-3.5 h-3.5" /> View Full Progress
                        </button>
                        <button
                          className="btn-secondary"
                          style={{ padding: '0.4rem 0.8rem', minHeight: '36px', fontSize: '0.82rem' }}
                          onClick={() => runAdminAction(p.id, 'mark-follow-up', p.name, p.email)}
                          title="Flag this patient for clinic follow-up"
                        >
                          <Flag className="w-3.5 h-3.5" /> Mark Follow-Up Needed
                        </button>
                        {p.phone && (
                          <a
                            href={'sms:' + p.phone.replace(/\D/g, '') + '?&body=' + encodeURIComponent(`Hi ${p.firstName}, this is the clinic checking in — how can we support you today?`)}
                            className="btn-secondary"
                            style={{ padding: '0.4rem 0.8rem', minHeight: '36px', fontSize: '0.82rem' }}
                            title="Text patient with a supportive check-in"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> Text
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        <Card variant="sage">
          <h3 className="font-display text-lg mb-2">Automation status</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-sage-600)' }} /> Daily reminder emails: scheduled 8:00am local time</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-sage-600)' }} /> Weekly per-patient progress reports: Friday afternoon (one email per patient to {ADMIN_EMAIL})</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-sage-600)' }} /> 30/14-day warnings: running on end_date offset</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-sage-600)' }} /> Missed-day re-entry: at 3 and 7 days</li>
          </ul>
        </Card>
        <Card variant="warm">
          <h3 className="font-display text-lg mb-2">Quick actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/.netlify/functions/weekly-report"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.6rem 1rem', minHeight: '44px', fontSize: '0.9rem' }}
            >
              <FileText className="w-4 h-4" /> Run weekly reports now
            </a>
            <button
              className="btn-secondary"
              onClick={async () => {
                setToast('Sending reminders to active patients…')
                try {
                  const res = await fetch('/.netlify/functions/reminder-engine?force=1')
                  const data = await res.json()
                  setToast(`Reminders processed: ${data.sentCount ?? 0} sent · ${data.skippedCount ?? 0} skipped`)
                } catch {
                  setToast('Could not run reminder engine')
                }
                window.setTimeout(() => setToast(null), 4000)
              }}
              style={{ padding: '0.6rem 1rem', minHeight: '44px', fontSize: '0.9rem' }}
            >
              <BellRing className="w-4 h-4" /> Remind everyone
            </button>
            <Link to="/admin/resources" className="btn-secondary" style={{ padding: '0.6rem 1rem', minHeight: '44px', fontSize: '0.9rem' }}>
              <FileText className="w-4 h-4" /> Content manager
            </Link>
            <button
              className="btn-secondary"
              onClick={() => setToast('Reminder rules — coming from the clinic ops settings')}
              style={{ padding: '0.6rem 1rem', minHeight: '44px', fontSize: '0.9rem' }}
            >
              <Mail className="w-4 h-4" /> Reminder rules
            </button>
          </div>
        </Card>
      </div>

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-4 py-2 shadow-lg"
          style={{
            background: 'var(--sage-700)',
            color: 'white',
            fontSize: '0.92rem',
            maxWidth: '90vw',
          }}
          role="status"
        >
          {toast}
        </div>
      )}

      {detailPatient && (
        <PatientDetailModal
          patient={detailPatient}
          onClose={() => setDetailPatient(null)}
          onAction={(a) => runAdminAction(detailPatient.id, a, detailPatient.name, detailPatient.email)}
        />
      )}
    </div>
  )
}

type EnrichedPatient = {
  id: string
  name: string
  firstName: string
  email: string
  phone: string
  startDate: string
  mode: string
  caregiver: string
  engagement: string
  lastActivity: number
  daysCompleted: number
  currentDay: number
  currentWeek: number
  currentPhase: number
  percentComplete: number
  journalEntries: number
  foodLogs: number
  brainGames: number
  videosWatched: number
  recipesViewed: number
  handoutsOpened: number
  needsHelp: boolean
  isInactive: boolean
  isStarted: boolean
  isActive: boolean
  state: ReturnType<typeof computeProgramState>
  flag: string | null
}



  /* ─────────────────────────────────────────────────────────────
     CONTENT EDITOR  ·  lets Dr. Thomas edit phase and lesson
     content without redeploying the site.
     Overrides are stored in Netlify Blobs via content-set.ts.
  ───────────────────────────────────────────────────────────── */

  const PHASE_KEYS = [
    { key: 'phase:phase-1', label: 'Phase 1 · Foundations, Reset & Orientation (Weeks 1–4)' },
    { key: 'phase:phase-2', label: 'Phase 2 · Food, Blood Sugar & Sleep (Weeks 5–8)' },
    { key: 'phase:phase-3', label: 'Phase 3 · Detox, Inflammation & Energy (Weeks 9–12)' },
    { key: 'phase:phase-4', label: 'Phase 4 · Movement, Brain Training & Stress Recovery (Weeks 13–16)' },
    { key: 'phase:phase-5', label: 'Phase 5 · Consistency & Cognitive Growth (Weeks 17–20)' },
    { key: 'phase:phase-6', label: 'Phase 6 · Long-term Maintenance & Graduation (Weeks 21–24)' },
  ]

  const LESSON_KEYS = [
    { key: 'lesson:welcome', label: 'Welcome to the Program' },
    { key: 'lesson:phase-1-overview', label: 'Phase 1 Overview' },
    { key: 'lesson:kitchen-reset', label: 'Kitchen Reset' },
    { key: 'lesson:healthy-brain-foods', label: 'Healthy Brain Foods' },
    { key: 'lesson:sleep-baseline', label: 'Sleep Baseline' },
    { key: 'lesson:blood-sugar-stability', label: 'Blood Sugar Stability' },
    { key: 'lesson:phase-2-overview', label: 'Phase 2 Overview' },
    { key: 'lesson:phase-3-overview', label: 'Phase 3 Overview' },
    { key: 'lesson:movement-progression', label: 'Movement Progression' },
    { key: 'lesson:cognitive-training', label: 'Cognitive Training' },
    { key: 'lesson:phase-4-overview', label: 'Phase 4 Overview' },
    { key: 'lesson:what-to-continue', label: 'What to Continue' },
    { key: 'lesson:what-to-celebrate', label: 'What to Celebrate' },
    { key: 'lesson:month-3', label: 'Month 3 Content' },
    { key: 'lesson:month-4', label: 'Month 4 Content' },
    { key: 'lesson:month-5', label: 'Month 5 Content' },
    { key: 'lesson:month-6', label: 'Month 6 Content' },
  ]

  type ContentItem = { key: string; label: string }

  function ContentEditor({ adminWho }: { adminWho: string }) {
    const [category, setCategory] = useState<'phase' | 'lesson'>('phase')
    const [selected, setSelected] = useState<ContentItem | null>(null)
    const [blob, setBlob] = useState<Record<string, string> | null>(null)
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saveMsg, setSaveMsg] = useState<string | null>(null)
    const [draft, setDraft] = useState<Record<string, string>>({})

    const items = category === 'phase' ? PHASE_KEYS : LESSON_KEYS

    async function loadContent(item: ContentItem) {
      setSelected(item)
      setBlob(null)
      setDraft({})
      setLoading(true)
      try {
        const res = await fetch(`/.netlify/functions/content-get?key=${encodeURIComponent(item.key)}`)
        const data = await res.json()
        if (data.found && data.data) {
          setBlob(data.data)
          setDraft(data.data)
        } else {
          setBlob({})
          setDraft({})
        }
      } catch {
        setBlob({})
        setDraft({})
      } finally {
        setLoading(false)
      }
    }

    async function saveContent() {
      if (!selected) return
      setSaving(true)
      setSaveMsg(null)
      // extract admin credentials from session
      const email = adminWho || ''
      try {
        const res = await fetch('/.netlify/functions/content-set', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            key: selected.key,
            data: draft,
            adminEmail: email,
            adminPassword: 'DrThomas2024',
          }),
        })
        const data = await res.json()
        if (data.ok) {
          setSaveMsg('Saved successfully.')
        } else {
          setSaveMsg('Error: ' + (data.error || 'Unknown error'))
        }
      } catch (err: any) {
        setSaveMsg('Save failed: ' + err.message)
      } finally {
        setSaving(false)
      }
    }

    const phaseFields: { key: string; label: string; multiline?: boolean }[] = [
      { key: 'tagline', label: 'Tagline (short phrase under the title)' },
      { key: 'overview', label: 'Overview (2–3 sentences for patients)', multiline: true },
      { key: 'weeklyIntention', label: 'Weekly intention (one guiding sentence)' },
      { key: 'caregiverGuidance', label: 'Caregiver guidance', multiline: true },
      { key: 'successMarker', label: 'Success marker (what tells them it is working)' },
    ]

    const lessonFields: { key: string; label: string; multiline?: boolean }[] = [
      { key: 'todaysFocus', label: 'Today's focus (one sentence)' },
      { key: 'whyThisMatters', label: 'Why this matters (1–2 paragraphs)', multiline: true },
      { key: 'supportiveNote', label: 'Supportive note (encouragement)', multiline: true },
      { key: 'reflection', label: 'Reflection prompt (one question)' },
      { key: 'caregiverNote', label: 'Caregiver note (optional)', multiline: true },
    ]

    const fields = category === 'phase' ? phaseFields : lessonFields

    return (
      <div>
        <div
          className="mb-4 p-4 rounded-xl"
          style={{ background: 'var(--cream-50)', border: '1px solid var(--sage-200)', fontSize: '0.9rem', color: 'var(--ink-600)' }}
        >
          <p style={{ margin: 0 }}>
            <strong>How this works:</strong> Select a phase or lesson, fill in any fields you want to customise, then click Save.
            Your changes are stored in the cloud and patients see them immediately — no rebuild needed.
            Fields you leave blank will continue to show the built-in program default.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-4">
          {(['phase', 'lesson'] as const).map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setSelected(null); setBlob(null); setDraft({}) }}
              className="px-3 py-2 rounded-lg text-sm font-medium"
              style={{
                background: category === c ? 'var(--sage-700)' : 'var(--sage-100)',
                color: category === c ? '#fff' : 'var(--ink-700)',
                border: 'none', cursor: 'pointer', minHeight: '40px',
              }}
            >
              {c === 'phase' ? 'Phases' : 'Lessons'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Item list */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--sage-200)', background: '#fff' }}
          >
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => loadContent(item)}
                className="w-full text-left px-4 py-3 flex items-center justify-between gap-2"
                style={{
                  background: selected?.key === item.key ? 'var(--sage-50)' : '#fff',
                  borderBottom: '1px solid var(--sage-100)',
                  border: 'none', borderBottom: '1px solid var(--sage-100)',
                  cursor: 'pointer', fontSize: '0.875rem', color: 'var(--ink-700)',
                }}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--ink-300)' }} />
              </button>
            ))}
          </div>

          {/* Edit panel */}
          <div className="md:col-span-2">
            {!selected && (
              <div
                className="rounded-xl p-8 text-center"
                style={{ border: '1px solid var(--sage-200)', color: 'var(--ink-400)', fontSize: '0.9rem' }}
              >
                Select a {category} from the list to edit its content.
              </div>
            )}
            {selected && loading && (
              <div className="rounded-xl p-8 text-center" style={{ color: 'var(--ink-400)' }}>
                Loading…
              </div>
            )}
            {selected && !loading && blob !== null && (
              <div className="rounded-xl p-5" style={{ border: '1px solid var(--sage-200)', background: '#fff' }}>
                <div className="text-base font-semibold mb-4" style={{ color: 'var(--ink-800)' }}>
                  {selected.label}
                </div>
                {fields.map((f) => (
                  <div key={f.key} className="mb-4">
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ink-700)' }}>
                      {f.label}
                    </label>
                    {f.multiline ? (
                      <textarea
                        value={draft[f.key] ?? ''}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                        rows={4}
                        placeholder="Leave blank to use the program default"
                        className="w-full rounded-lg px-3 py-2 text-sm"
                        style={{
                          border: '1px solid var(--sage-300)', resize: 'vertical',
                          fontFamily: 'inherit', color: 'var(--ink-800)', lineHeight: '1.5',
                        }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={draft[f.key] ?? ''}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                        placeholder="Leave blank to use the program default"
                        className="w-full rounded-lg px-3 py-2 text-sm"
                        style={{ border: '1px solid var(--sage-300)', color: 'var(--ink-800)' }}
                      />
                    ))}
                  </div>
                ))}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={saveContent}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{
                      background: 'var(--sage-700)', color: '#fff', border: 'none',
                      cursor: saving ? 'not-allowed' : 'pointer', minHeight: '44px', opacity: saving ? 0.7 : 1,
                    }}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving…' : 'Save changes'}
                  </button>
                  {saveMsg && (
                    <span
                      className="text-sm"
                      style={{ color: saveMsg.startsWith('Error') ? 'var(--red-600)' : 'var(--sage-700)' }}
                    >
                      {saveMsg}
                    </span>
                  )}
                </div>
                {blob._updatedAt && (
                  <p className="text-xs mt-3" style={{ color: 'var(--ink-400)' }}>
                    Last saved {new Date(blob._updatedAt as string).toLocaleString()} by {blob._updatedBy as string}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  function PatientDetailModal({
  patient,
  onClose,
  onAction,
}: {
  patient: EnrichedPatient
  onClose: () => void
  onAction: (action: 'reminder' | 'resend-welcome' | 'help-with-notes' | 'mark-follow-up' | 'clear-follow-up') => void
}) {
  type HistoryRow = {
    reportDate: string
    engagement: string
    daysCompleted: number
    lastActiveIso: string | null
    emailSent: boolean
  }
  const [history, setHistory] = useState<HistoryRow[] | null>(null)
  const [followUp, setFollowUp] = useState<{ needed: boolean; markedAtIso?: string } | null>(null)

  useEffect(() => {
    fetch(`/api/admin/patient-history?patientId=${encodeURIComponent(patient.id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setHistory(Array.isArray(data?.history) ? data.history : [])
        setFollowUp(data?.followUp ?? { needed: false })
      })
      .catch(() => {
        setHistory([])
        setFollowUp({ needed: false })
      })
  }, [patient.id])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-6 max-w-2xl w-full bg-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: 'var(--shadow-lift)' }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div
              className="eyebrow"
              style={{ color: 'var(--sage-700)', fontSize: '0.78rem' }}
            >
              Patient progress
            </div>
            <h3
              className="font-display"
              style={{ fontSize: '1.4rem', color: 'var(--ink-900)' }}
            >
              {patient.name}
            </h3>
            <div
              className="text-caption mt-0.5"
              style={{ color: 'var(--ink-500)', fontSize: '0.85rem' }}
            >
              {patient.email} · {patient.phone || 'no phone'} · Mode: {patient.mode}
            </div>
            {followUp?.needed && (
              <div
                className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                style={{ background: 'var(--color-sand-50)', border: '1px solid var(--color-sand-300, #e9d8a6)', color: 'var(--ink-700)' }}
              >
                <Flag className="w-3 h-3" /> Follow-up flagged{followUp.markedAtIso ? ` · ${formatFriendly(followUp.markedAtIso.slice(0, 10))}` : ''}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
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

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Stat label="Current phase" value={String(patient.currentPhase)} />
          <Stat label="Current week" value={String(patient.currentWeek)} />
          <Stat label="Current day" value={String(patient.currentDay)} />
          <Stat label="Percent complete" value={`${patient.percentComplete}%`} />
          <Stat label="Days completed" value={String(patient.daysCompleted)} />
          <Stat label="Last activity" value={patient.lastActivity === 0 ? 'Today' : `${patient.lastActivity}d ago`} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Stat label="Journal entries" value={String(patient.journalEntries)} />
          <Stat label="Meals logged" value={String(patient.foodLogs)} />
          <Stat label="Brain games" value={String(patient.brainGames)} />
          <Stat label="Videos watched" value={String(patient.videosWatched)} />
          <Stat label="Recipes viewed" value={String(patient.recipesViewed)} />
          <Stat label="Handouts opened" value={String(patient.handoutsOpened)} />
        </div>

        <div
          className="mt-4 p-3 rounded-xl text-sm"
          style={{ background: 'var(--cream-50)', border: '1px solid var(--sage-200)' }}
        >
          Start date: {formatFriendly(patient.startDate)} · End date:{' '}
          {formatFriendly(patient.state.endDate)}
        </div>

        <div className="mt-5">
          <h4 className="font-display mb-2" style={{ fontSize: '1.05rem', color: 'var(--ink-900)' }}>
            Weekly report history
          </h4>
          {history === null ? (
            <p className="text-sm" style={{ color: 'var(--ink-500)' }}>Loading…</p>
          ) : history.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--ink-500)' }}>
              No weekly reports for this patient yet. The first report will appear after the next Friday run.
            </p>
          ) : (
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--sage-200)' }}
            >
              <table className="w-full text-sm">
                <thead style={{ background: 'var(--cream-50)' }}>
                  <tr className="text-left" style={{ color: 'var(--color-ink-500)' }}>
                    <th className="px-3 py-2">Report date</th>
                    <th className="px-3 py-2">Engagement</th>
                    <th className="px-3 py-2">Days</th>
                    <th className="px-3 py-2">Last active</th>
                    <th className="px-3 py-2">Email sent</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h.reportDate} className="border-t" style={{ borderColor: 'rgba(122, 158, 122, 0.15)' }}>
                      <td className="px-3 py-2">{h.reportDate}</td>
                      <td className="px-3 py-2">{h.engagement}</td>
                      <td className="px-3 py-2">{h.daysCompleted}</td>
                      <td className="px-3 py-2">{h.lastActiveIso ? h.lastActiveIso.slice(0, 10) : '—'}</td>
                      <td className="px-3 py-2">{h.emailSent ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            className="btn-primary"
            style={{ minHeight: 44, padding: '0.6rem 1rem', fontSize: '0.92rem' }}
            onClick={() => onAction('reminder')}
          >
            <BellRing className="w-4 h-4" /> Send Reminder
          </button>
          <button
            className="btn-secondary"
            style={{ minHeight: 44, padding: '0.6rem 1rem', fontSize: '0.92rem' }}
            onClick={() => onAction('resend-welcome')}
          >
            <Send className="w-4 h-4" /> Resend welcome
          </button>
          <button
            className="btn-secondary"
            style={{ minHeight: 44, padding: '0.6rem 1rem', fontSize: '0.92rem' }}
            onClick={() => {
              const next = !followUp?.needed
              setFollowUp({ needed: next, markedAtIso: new Date().toISOString() })
              onAction(next ? 'mark-follow-up' : 'clear-follow-up')
            }}
          >
            <Flag className="w-4 h-4" />
            {followUp?.needed ? 'Clear Follow-Up' : 'Mark Follow-Up Needed'}
          </button>
          <button
            className="btn-secondary"
            style={{ minHeight: 44, padding: '0.6rem 1rem', fontSize: '0.92rem' }}
            onClick={() => onAction('help-with-notes')}
          >
            <MessageCircle className="w-4 h-4" /> Help with notes
          </button>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl p-3"
      style={{ background: 'var(--cream-50)', border: '1px solid var(--sage-200)' }}
    >
      <div
        className="eyebrow"
        style={{ color: 'var(--sage-700)', fontSize: '0.72rem' }}
      >
        {label}
      </div>
      <div
        className="font-display mt-0.5"
        style={{ fontSize: '1.2rem', color: 'var(--ink-900)' }}
      >
        {value}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, tone, onClick, active }: { icon: any; label: string; value: number; tone?: 'sand' | 'sky'; onClick?: () => void; active?: boolean }) {
  const bg = tone === 'sand' ? 'var(--color-sand-50)' : tone === 'sky' ? 'var(--color-sky-soft)' : 'white'
  return (
    <button
      onClick={onClick}
      className="rounded-2xl p-4 border text-left transition-shadow hover:shadow-md"
      style={{
        backgroundColor: bg,
        borderColor: active ? 'var(--color-sage-500)' : 'rgba(122, 158, 122, 0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4" style={{ color: 'var(--color-sage-700)' }} />
        <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-ink-500)' }}>
          {label}
        </div>
      </div>
      <div className="font-display text-3xl">{value}</div>
    </button>
  )
}
