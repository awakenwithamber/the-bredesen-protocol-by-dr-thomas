import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowLeft, Printer, Clock, Bookmark, BookmarkCheck } from 'lucide-react'
import {
  resources as curatedResources,
  categoryLabels,
  typeLabels,
  type Resource,
} from '@/content/library'
import { Card, Chip } from '@/components/ui'

export const Route = createFileRoute('/_app/resources/$id')({
  component: ResourceDetail,
})

const SAVED_KEY = 'bredesen.resources.saved.v1'

function ResourceDetail() {
  const { id } = useParams({ from: '/_app/resources/$id' })
  const [resource, setResource] = useState<Resource | undefined>(
    curatedResources.find((r) => r.id === id),
  )
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY)
      if (raw) setSaved((JSON.parse(raw) as string[]).includes(id))
    } catch {}
  }, [id])

  useEffect(() => {
    // Fall back to Drive-synced resources if not found locally.
    if (resource) return
    fetch('/api/drive-resources')
      .then((r) => (r.ok ? r.json() : { resources: [] }))
      .then((data: { resources: Resource[] }) => {
        const match = data.resources.find((r) => r.id === id)
        if (match) setResource(match)
      })
      .catch(() => {
        /* noop */
      })
  }, [id, resource])

  const toggleSaved = () => {
    try {
      const raw = localStorage.getItem(SAVED_KEY)
      const current = raw ? (JSON.parse(raw) as string[]) : []
      const next = saved
        ? current.filter((x) => x !== id)
        : [...current, id]
      localStorage.setItem(SAVED_KEY, JSON.stringify(next))
      setSaved(!saved)
    } catch {}
  }

  if (!resource) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card>
          <p style={{ color: 'var(--ink-700)' }}>
            Hmm — we couldn't find that resource. It may have been removed or not
            approved yet.
          </p>
          <Link to="/resources" className="btn-secondary mt-4 inline-block">
            Back to library
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <Link
        to="/resources"
        className="inline-flex items-center gap-1.5 text-sm mb-4 no-print"
        style={{ color: 'var(--sage-700)' }}
      >
        <ArrowLeft className="w-4 h-4" /> All resources
      </Link>

      <div className="eyebrow mb-2">{typeLabels[resource.type]}</div>
      <h1
        className="font-display mb-2"
        style={{ fontSize: '1.75rem', color: 'var(--ink-900)', lineHeight: 1.2 }}
      >
        {resource.title}
      </h1>
      <p
        className="mb-4"
        style={{ fontSize: '1.05rem', color: 'var(--ink-700)', lineHeight: 1.5 }}
      >
        {resource.summary}
      </p>

      <div className="flex items-center gap-2 flex-wrap mb-5">
        {resource.estMinutes > 0 && (
          <Chip tone="ivory">
            <Clock className="w-3 h-3 inline mr-1" />
            {resource.estMinutes} min
          </Chip>
        )}
        <Chip tone="ivory">{categoryLabels[resource.category]}</Chip>
        {resource.beginnerFriendly && <Chip tone="sky">Beginner friendly</Chip>}
        {resource.caregiverFriendly && <Chip tone="sky">Caregiver friendly</Chip>}
        {resource.printable && <Chip tone="sand">Printable</Chip>}
      </div>

      <Card className="mb-5">
        <div className="eyebrow mb-1">Why this matters</div>
        <p style={{ color: 'var(--ink-700)', fontSize: '1rem' }}>
          {resource.whyItMatters}
        </p>
      </Card>

      {resource.type === 'video' && (
        <Card variant="sage" className="mb-5">
          <p style={{ color: 'var(--ink-700)' }}>
            {resource.href ? (
              <a
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Watch video
              </a>
            ) : (
              <>This clinic-curated video will open here once your clinic adds the link.</>
            )}
          </p>
        </Card>
      )}

      {resource.body && (
        <Card className="mb-5">
          <div
            style={{
              color: 'var(--ink-700)',
              fontSize: '1.02rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}
          >
            {resource.body}
          </div>
        </Card>
      )}

      {!resource.body &&
        (resource.type === 'handout' ||
          resource.type === 'guide' ||
          resource.type === 'checklist' ||
          resource.type === 'worksheet' ||
          resource.type === 'tracker' ||
          resource.type === 'grocery-list' ||
          resource.type === 'printable') && (
          <Card className="mb-5">
            <p style={{ color: 'var(--ink-700)' }}>
              This is a printable clinic handout. Print it to take to your kitchen
              or bedroom — or tap <strong>Save for later</strong> to find it
              quickly in your library.
            </p>
          </Card>
        )}

      {resource.source === 'drive' && resource.href && (
        <Card variant="warm" className="mb-5">
          <p style={{ color: 'var(--ink-700)' }}>
            This resource is stored in your clinic's Google Drive.
          </p>
          <a
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-3 inline-block"
          >
            Open in Drive
          </a>
        </Card>
      )}

      <div className="flex items-center gap-2 flex-wrap no-print">
        <button onClick={toggleSaved} className="btn-secondary">
          {saved ? (
            <>
              <BookmarkCheck className="w-4 h-4 inline mr-1.5" />
              Saved
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4 inline mr-1.5" />
              Save for later
            </>
          )}
        </button>
        {resource.printable && (
          <button onClick={() => window.print()} className="btn-secondary">
            <Printer className="w-4 h-4 inline mr-1.5" />
            Print
          </button>
        )}
      </div>
    </div>
  )
}
