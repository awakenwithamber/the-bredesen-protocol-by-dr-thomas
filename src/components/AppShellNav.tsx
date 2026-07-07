import { Link, useRouterState } from '@tanstack/react-router'
import {
  Menu,
  X,
  Home,
  Calendar,
  Sparkles,
  BookOpen,
  Apple,
  Brain,
  HeartPulse,
  Footprints,
  Printer,
  Users,
  Settings2,
  ShieldCheck,
  Video,
  NotebookPen,
  Flower2,
  LibraryBig,
  ClipboardList,
  Compass,
  GraduationCap,
} from 'lucide-react'
import { useState } from 'react'

const primary = [
  { to: '/start-here', label: 'Start Here', icon: Compass },
  { to: '/today', label: 'Today', icon: Sparkles },
  { to: '/phases', label: 'Phases', icon: GraduationCap },
  { to: '/progress', label: 'Progress', icon: Flower2 },
  { to: '/journal', label: 'Journal', icon: NotebookPen },
  { to: '/caregiver', label: 'Help', icon: Users },
]

const more = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/routines', label: 'Daily Routines', icon: Calendar },
  { to: '/movement', label: 'Movement (today)', icon: Footprints },
  { to: '/brain-games', label: 'Brain game (today)', icon: Brain },
  { to: '/recipes', label: 'Meals', icon: Apple },
  { to: '/pantry-audit', label: 'Pantry Audit', icon: ClipboardList },
  { to: '/toxic-load', label: 'Toxic Load', icon: ClipboardList },
  { to: '/breathwork', label: 'Breathwork', icon: HeartPulse },
  { to: '/learning', label: 'Learning', icon: BookOpen },
  { to: '/videos', label: 'Videos', icon: Video },
  { to: '/action-plan', label: 'My Action Plan', icon: ClipboardList },
  { to: '/resources', label: 'Resources', icon: LibraryBig },
  { to: '/week', label: 'This Week', icon: Calendar },
  { to: '/program-dates', label: 'Program Dates', icon: Calendar },
  { to: '/print-center', label: 'Print Center', icon: Printer },
  { to: '/settings', label: 'Settings', icon: Settings2 },
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
]

export function AppShellNav() {
  const [open, setOpen] = useState(false)
  const { location } = useRouterState()

  const isActive = (to: string) =>
    location.pathname === to || location.pathname.startsWith(to + '/')

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="lg:hidden rounded-full p-1.5 bg-white fixed top-1.5 left-1.5 z-40 no-print"
        style={{
          border: '1px solid var(--sage-200)',
          boxShadow: 'var(--shadow-soft)',
          minWidth: 36,
          minHeight: 36,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Menu style={{ width: 18, height: 18, color: 'var(--sage-700)' }} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 z-50 lg:z-0 h-screen w-64 border-r transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 no-print`}
        style={{
          background:
            'linear-gradient(180deg, var(--cream-soft) 0%, var(--cream) 100%)',
          borderColor: 'rgba(141, 170, 145, 0.25)',
        }}
      >
        <div
          className="flex items-center justify-between px-3 py-2 border-b"
          style={{ borderColor: 'rgba(141, 170, 145, 0.22)', minHeight: 48 }}
        >
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 no-underline"
            style={{ color: 'var(--ink-900)' }}
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 24,
                height: 24,
                background:
                  'linear-gradient(135deg, var(--sage-300) 0%, var(--sage-600) 100%)',
              }}
              aria-hidden
            >
              <span
                className="font-display"
                style={{ color: 'white', fontSize: 12, lineHeight: 1 }}
              >
                B
              </span>
            </div>
            <div className="leading-tight">
              <div
                className="font-display"
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--sage-900)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.15,
                }}
              >
                Bredesen Protocol
              </div>
              <div
                style={{ fontSize: '0.7rem', color: 'var(--ink-500)', lineHeight: 1.2 }}
              >
                Dr. Thomas · Patient portal
              </div>
            </div>
          </Link>
          <button
            aria-label="Close menu"
            className="lg:hidden tap-large rounded-full"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav
          className="px-2 py-2 overflow-y-auto"
          style={{ height: 'calc(100vh - 3rem)' }}
        >
          <div
            className="eyebrow px-2 mb-1"
            style={{ fontSize: '0.7rem', color: 'var(--sage-700)' }}
          >
            Core
          </div>
          {primary.map((item) => {
            const active = isActive(item.to)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: active ? 'var(--sage-100)' : 'transparent',
                  color: active ? 'var(--sage-900)' : 'var(--ink-700)',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.92rem',
                  marginBottom: 1,
                }}
              >
                <Icon className="shrink-0" style={{ width: 16, height: 16 }} />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div
            className="eyebrow px-2 mt-3 mb-1"
            style={{ fontSize: '0.7rem', color: 'var(--ink-500)' }}
          >
            More
          </div>
          {more.map((item) => {
            const active = isActive(item.to)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: active ? 'var(--sage-100)' : 'transparent',
                  color: active ? 'var(--sage-900)' : 'var(--ink-700)',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.9rem',
                  marginBottom: 1,
                }}
              >
                <Icon style={{ width: 16, height: 16 }} className="shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
