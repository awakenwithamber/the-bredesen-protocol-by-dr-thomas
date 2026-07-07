import type { ReactNode } from 'react'

export function Card({
  children,
  variant,
  className,
}: {
  children: ReactNode
  variant?: 'default' | 'warm' | 'sage' | 'sky'
  className?: string
}) {
  const classes =
    'card ' +
    (variant === 'warm'
      ? 'card-warm '
      : variant === 'sage'
      ? 'card-sage '
      : variant === 'sky'
      ? 'card-sky '
      : '') +
    (className ?? '')
  return <div className={classes}>{children}</div>
}

export function Chip({
  children,
  tone,
}: {
  children: ReactNode
  tone?: 'sand' | 'sky' | 'ivory' | 'default'
}) {
  const cls =
    tone === 'sand'
      ? 'chip chip-sand'
      : tone === 'sky'
      ? 'chip chip-sky'
      : tone === 'ivory'
      ? 'chip chip-ivory'
      : 'chip'
  return <span className={cls}>{children}</span>
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div
          className="uppercase tracking-wider text-xs font-semibold mb-2"
          style={{ color: 'var(--color-sage-600)' }}
        >
          {eyebrow}
        </div>
      )}
      <h1
        className="font-display text-3xl sm:text-4xl"
        style={{ color: 'var(--color-ink-900)' }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="mt-2 text-base sm:text-lg"
          style={{ color: 'var(--color-ink-500)', maxWidth: '60ch' }}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="progress-track"
    >
      <div className="progress-fill" style={{ width: `${percent}%` }} />
    </div>
  )
}

export function Leaves({ count, lit }: { count: number; lit: number }) {
  return (
    <div className="flex flex-wrap gap-2" aria-label={`${lit} of ${count} leaves`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`leaf ${i < lit ? 'on' : ''}`} />
      ))}
    </div>
  )
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string
  body: string
  action?: ReactNode
}) {
  return (
    <Card variant="warm">
      <h3 className="font-display text-xl mb-2">{title}</h3>
      <p style={{ color: 'var(--color-ink-500)' }}>{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </Card>
  )
}

export function Banner({
  tone,
  title,
  children,
}: {
  tone: 'sage' | 'sand' | 'sky'
  title: string
  children?: ReactNode
}) {
  const style =
    tone === 'sand'
      ? { backgroundColor: 'var(--color-sand-100)', borderColor: 'rgba(212, 179, 116, 0.5)' }
      : tone === 'sky'
      ? { backgroundColor: 'var(--color-sky-soft)', borderColor: 'rgba(184, 208, 220, 0.6)' }
      : { backgroundColor: 'var(--color-sage-50)', borderColor: 'rgba(122, 158, 122, 0.4)' }

  return (
    <div
      className="rounded-2xl p-5 border"
      style={style}
      role="status"
    >
      <div className="font-semibold mb-1" style={{ color: 'var(--color-ink-900)' }}>
        {title}
      </div>
      <div style={{ color: 'var(--color-ink-700)' }}>{children}</div>
    </div>
  )
}

export function BigButton({
  children,
  onClick,
  disabled,
  tone = 'primary',
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  tone?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      className={`${tone === 'primary' ? 'btn-primary' : 'btn-secondary'} btn-big`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
