import { Link } from '@tanstack/react-router'
import { ChevronDown, Eye } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { usePreferences } from '@/lib/preferences'

type Props = {
  currentPhase: number
  currentWeek: number
  currentDay: number
  daysRemaining: number
  patientName: string
  isPaused?: boolean
}

export function OrientationBar({
  currentPhase,
  currentWeek,
  currentDay,
  daysRemaining,
  isPaused,
}: Props) {
  const { prefs, update } = usePreferences()
  const [viewOpen, setViewOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setViewOpen(false)
      }
    }
    if (viewOpen) window.addEventListener('mousedown', handle)
    return () => window.removeEventListener('mousedown', handle)
  }, [viewOpen])

  const viewLabel =
    prefs.displayMode === 'simple'
      ? 'Simple'
      : prefs.displayMode === 'large-print'
      ? 'Large'
      : 'Standard'

  return (
    <div className="orientation-bar sticky top-0 z-30 no-print">
      <div
        className="max-w-6xl mx-auto flex items-center gap-2 justify-between"
        style={{ padding: '0.25rem 1rem' }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="hidden sm:inline-flex chip"
            style={{
              padding: '0.15rem 0.55rem',
              fontSize: '0.75rem',
              background: 'var(--sand-100)',
              color: 'var(--sand-700)',
            }}
          >
            Phase {currentPhase}
          </span>
          <span
            className="chip"
            style={{
              padding: '0.15rem 0.55rem',
              fontSize: '0.75rem',
              background: 'var(--teal-100)',
              color: 'var(--teal-900)',
            }}
          >
            Wk {currentWeek}
          </span>
          <span
            className="chip"
            style={{
              padding: '0.15rem 0.55rem',
              fontSize: '0.75rem',
            }}
          >
            Day {currentDay}
          </span>
          {isPaused && (
            <span
              className="chip"
              style={{
                padding: '0.15rem 0.55rem',
                fontSize: '0.75rem',
                background: 'var(--sand-100)',
                color: 'var(--sand-700)',
                fontWeight: 600,
              }}
            >
              Paused
            </span>
          )}
          <span
            className="hidden md:inline hide-in-simple"
            style={{
              color: 'var(--ink-500)',
              fontSize: '0.78rem',
              marginLeft: 4,
            }}
          >
            · {daysRemaining} days left
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Link
            to="/today"
            className="hidden sm:inline-flex items-center gap-1 rounded-full"
            style={{
              padding: '0.25rem 0.7rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--sage-900)',
              background: 'var(--sage-100)',
              textDecoration: 'none',
            }}
          >
            Today's step
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setViewOpen((v) => !v)}
              className="inline-flex items-center gap-1 rounded-full"
              style={{
                padding: '0.25rem 0.55rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--ink-700)',
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid var(--sage-200)',
              }}
              aria-haspopup="menu"
              aria-expanded={viewOpen}
              title="Change view mode"
            >
              <Eye style={{ width: 13, height: 13 }} />
              <span className="hidden sm:inline">{viewLabel}</span>
              <ChevronDown style={{ width: 11, height: 11 }} />
            </button>
            {viewOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 rounded-2xl p-2 z-40"
                style={{
                  background: 'white',
                  border: '1px solid var(--sage-200)',
                  boxShadow: 'var(--shadow-lift)',
                }}
              >
                {(
                  [
                    { key: 'standard', label: 'Standard view', note: 'All features' },
                    { key: 'simple', label: 'Simple view', note: 'Fewer cards' },
                    { key: 'large-print', label: 'Large print', note: '125% larger text' },
                  ] as const
                ).map((opt) => {
                  const active = prefs.displayMode === opt.key
                  return (
                    <button
                      key={opt.key}
                      role="menuitemradio"
                      aria-checked={active}
                      onClick={() => {
                        update({ displayMode: opt.key })
                        setViewOpen(false)
                      }}
                      className="w-full text-left rounded-xl px-3 py-2 flex items-start justify-between gap-2"
                      style={{
                        background: active ? 'var(--sage-100)' : 'transparent',
                        color: active ? 'var(--sage-900)' : 'var(--ink-800)',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                          {opt.label}
                        </div>
                        <div
                          className="text-caption"
                          style={{ fontSize: '0.85rem' }}
                        >
                          {opt.note}
                        </div>
                      </div>
                      {active && (
                        <span
                          aria-hidden
                          className="rounded-full"
                          style={{
                            width: 8,
                            height: 8,
                            background: 'var(--sage-600)',
                            marginTop: 6,
                          }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
