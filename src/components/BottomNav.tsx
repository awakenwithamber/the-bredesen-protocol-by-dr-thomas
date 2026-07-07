import { Link, useRouterState } from '@tanstack/react-router'
  import { Home, Sparkles, Flower2, BookOpen, LifeBuoy } from 'lucide-react'

  const items = [
    { to: '/', label: 'Home', icon: Home, exact: true },
    { to: '/today', label: 'Today', icon: Sparkles, exact: false },
    { to: '/progress', label: 'Progress', icon: Flower2, exact: false },
    { to: '/education', label: 'Education', icon: BookOpen, exact: false },
    { to: '/help', label: 'Help', icon: LifeBuoy, exact: false },
  ]

  export function BottomNav() {
    const { location } = useRouterState()
    return (
      <nav className="bottom-nav no-print" aria-label="Primary">
        <div className="bottom-nav-row">
          {items.map(({ to, label, icon: Icon, exact }) => {
            const active = exact
              ? location.pathname === to
              : location.pathname === to || location.pathname.startsWith(to + '/')
            return (
              <Link
                key={to}
                to={to}
                className={active ? 'active' : ''}
                aria-current={active ? 'page' : undefined}
              >
                <Icon aria-hidden />
                <span>{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    )
  }
  