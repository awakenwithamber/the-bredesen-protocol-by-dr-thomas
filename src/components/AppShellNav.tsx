import { Link, useRouterState } from '@tanstack/react-router'
  import {
    Home,
    Sparkles,
    BookOpen,
    Flower2,
    Menu,
    X,
    Brain,
    NotebookPen,
    Apple,
    Footprints,
    LibraryBig,
    FileText,
    Settings2,
    ShieldCheck,
    ClipboardList,
    Leaf,
    ChevronDown,
    ChevronUp,
  } from 'lucide-react'
  import { useState } from 'react'

  const primary = [
    { to: '/', label: 'Home', icon: Home, exact: true },
    { to: '/today', label: "Today's Plan", icon: Sparkles, exact: false },
    { to: '/education', label: 'Education', icon: BookOpen, exact: false },
    { to: '/progress', label: 'My Progress', icon: Flower2, exact: false },
  ]

  const more = [
    { to: '/pantry-audit', label: 'Pantry Audit', icon: ClipboardList },
    { to: '/brain-games', label: 'Brain Game', icon: Brain },
    { to: '/journal', label: 'My Journal', icon: NotebookPen },
    { to: '/recipes', label: 'Meals & Recipes', icon: Apple },
    { to: '/movement', label: 'Movement', icon: Footprints },
    { to: '/substitutes', label: 'Food Substitutes', icon: Leaf },
    { to: '/hemp', label: 'Hemp & CBD', icon: Leaf },
    { to: '/resources', label: 'Resources', icon: LibraryBig },
    { to: '/handouts', label: 'Handouts', icon: FileText },
    { to: '/settings', label: 'Settings', icon: Settings2 },
    { to: '/admin', label: 'Admin', icon: ShieldCheck },
  ]

  export function AppShellNav() {
    const [open, setOpen] = useState(false)
    const [moreOpen, setMoreOpen] = useState(false)
    const { location } = useRouterState()

    const isActive = (to: string, exact = false) =>
      exact ? location.pathname === to : (location.pathname === to || location.pathname.startsWith(to + '/'))

    const NavLink = ({ to, label, icon: Icon, exact = false, size = 'lg' }: {
      to: string; label: string; icon: any; exact?: boolean; size?: 'lg' | 'sm'
    }) => {
      const active = isActive(to, exact)
      const height = size === 'lg' ? 52 : 46
      const fontSize = size === 'lg' ? '1.05rem' : '0.95rem'
      const iconSize = size === 'lg' ? 22 : 19
      return (
        <Link
          to={to}
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-xl px-3 transition-colors w-full"
          style={{
            height,
            fontSize,
            fontWeight: active ? 600 : 400,
            color: active ? 'var(--sage-800)' : 'var(--ink-700)',
            background: active ? 'var(--sage-100)' : 'transparent',
            textDecoration: 'none',
            border: 'none',
          }}
        >
          <Icon style={{ width: iconSize, height: iconSize, flexShrink: 0, color: active ? 'var(--sage-700)' : 'var(--ink-400)' }} />
          {label}
        </Link>
      )
    }

    return (
      <>
        {/* Mobile hamburger — large touch target for seniors */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="lg:hidden rounded-full bg-white fixed top-2 left-2 z-40 no-print flex items-center justify-center"
          style={{
            border: '1px solid var(--sage-200)',
            boxShadow: 'var(--shadow-soft)',
            width: 48,
            height: 48,
          }}
        >
          <Menu style={{ width: 24, height: 24, color: 'var(--sage-700)' }} />
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
          } lg:translate-x-0 no-print flex flex-col`}
          style={{
            background: 'var(--sage-50)',
            borderColor: 'var(--sage-200)',
          }}
        >
          {/* Mobile header row */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2 lg:hidden">
            <span className="font-display text-base" style={{ color: 'var(--ink-900)' }}>Menu</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center rounded-full"
              style={{ width: 40, height: 40, color: 'var(--ink-500)', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <X style={{ width: 22, height: 22 }} />
            </button>
          </div>

          {/* Logo — desktop only */}
          <div className="px-5 pt-6 pb-3 hidden lg:block">
            <div className="font-display text-sm leading-tight" style={{ color: 'var(--ink-900)' }}>
              Bredesen Protocol
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-500)', marginTop: 2 }}>
              Dr. Thomas · Brain Health
            </div>
          </div>

          {/* Scrollable nav body */}
          <nav className="flex-1 overflow-y-auto px-3 pb-6">
            {/* Primary links */}
            <div className="space-y-0.5">
              {primary.map(({ to, label, icon, exact }) => (
                <NavLink key={to} to={to} label={label} icon={icon} exact={exact} size="lg" />
              ))}
            </div>

            {/* Divider */}
            <div className="my-3 mx-1" style={{ borderTop: '1px solid var(--sage-200)' }} />

            {/* More toggle */}
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className="flex items-center justify-between w-full rounded-xl px-3"
              style={{
                height: 44,
                color: 'var(--ink-500)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.9rem',
              }}
            >
              <span>More options</span>
              {moreOpen
                ? <ChevronUp style={{ width: 16, height: 16 }} />
                : <ChevronDown style={{ width: 16, height: 16 }} />}
            </button>

            {moreOpen && (
              <div className="space-y-0.5 mt-1">
                {more.map(({ to, label, icon }) => (
                  <NavLink key={to} to={to} label={label} icon={icon} size="sm" />
                ))}
              </div>
            )}
          </nav>

          {/* Clinic footer */}
          <div
            className="px-5 py-4 border-t text-xs"
            style={{ borderColor: 'var(--sage-200)', color: 'var(--ink-400)' }}
          >
            <div>Dr. Maya Thomas</div>
            <div style={{ marginTop: 2 }}>
              <a href="tel:+18012665559" style={{ color: 'var(--sage-600)', textDecoration: 'none' }}>
                (801) 266-5559
              </a>
            </div>
          </div>
        </aside>
      </>
    )
  }
  