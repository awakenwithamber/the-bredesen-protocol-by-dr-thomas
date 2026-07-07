import { Link, useRouterState } from '@tanstack/react-router'
import { Home, Sparkles, Flower2, FolderOpen, LifeBuoy } from 'lucide-react'

const items = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/today', label: 'Today', icon: Sparkles },
  { to: '/progress', label: 'Progress', icon: Flower2 },
  { to: '/resources', label: 'Resources', icon: FolderOpen },
  { to: '/help', label: 'Help', icon: LifeBuoy },
]

export function BottomNav() {
  const { location } = useRouterState()
  return (
    <nav className="bottom-nav no-print" aria-label="Primary">
      <div className="bottom-nav-row">
        {items.map((i) => {
          const active =
            location.pathname === i.to ||
            location.pathname.startsWith(i.to + '/')
          const Icon = i.icon
          return (
            <Link
              key={i.to}
              to={i.to}
              className={active ? 'active' : ''}
              aria-current={active ? 'page' : undefined}
            >
              <Icon aria-hidden />
              <span>{i.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
