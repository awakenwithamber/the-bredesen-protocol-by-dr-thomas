import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import {
  CloudUpload,
  RefreshCcw,
  CheckCircle2,
  EyeOff,
  Star,
  Search,
  FolderSync,
  ExternalLink,
} from 'lucide-react'
import { Card, SectionHeading, Chip } from '@/components/ui'
import {
  categoryLabels,
  typeLabels,
  type Resource,
  type ResourceCategory,
} from '@/content/library'
import { clinicTools, clinicToolLabels } from '@/content/clinicTools'

export const Route = createFileRoute('/_app/admin/resources')({
  component: AdminResources,
})

type DriveResource = Resource & { approved?: boolean; modifiedTime?: string }

function AdminResources() {
  const [items, setItems] = useState<DriveResource[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'featured'>(
    'pending',
  )
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/drive-resources?admin=1')
      if (!res.ok) {
        setItems([])
        setMessage('Drive sync not configured yet. See the integration guide below.')
      } else {
        const data = (await res.json()) as { resources: DriveResource[] }
        setItems(data.resources ?? [])
      }
    } catch (e) {
      setItems([])
      setMessage('Could not reach the sync API.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const sync = async () => {
    setSyncing(true)
    setMessage('Pulling files from Google Drive…')
    try {
      const res = await fetch('/api/drive-sync', { method: 'POST' })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setMessage(`Sync could not run: ${data.reason ?? res.status}`)
      } else {
        setMessage(
          `Synced ${data.total} files — ${data.added} new, ${data.updated} updated.`,
        )
        await load()
      }
    } catch (e) {
      setMessage('Sync failed. Check the service account + folder id.')
    } finally {
      setSyncing(false)
    }
  }

  const patch = async (id: string, updates: Partial<DriveResource>) => {
    const res = await fetch('/api/drive-resources', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    })
    if (res.ok) {
      setItems((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...updates } : r)),
      )
    }
  }

  const filtered = useMemo(() => {
    let list = items
    if (filter === 'pending') list = list.filter((r) => !r.approved)
    else if (filter === 'approved') list = list.filter((r) => r.approved)
    else if (filter === 'featured') list = list.filter((r) => r.featured)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q)),
      )
    }
    return list
  }, [items, filter, search])

  const counts = useMemo(
    () => ({
      total: items.length,
      pending: items.filter((r) => !r.approved).length,
      approved: items.filter((r) => r.approved).length,
      featured: items.filter((r) => r.featured).length,
    }),
    [items],
  )

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <SectionHeading
        eyebrow="Clinic admin · Content"
        title="Drive-synced resources"
        description="Files synced from the clinic Google Drive. Approve what patients should see, feature the essentials, hide the rest."
      />

      <div className="flex items-center gap-2 flex-wrap mb-4">
        <button
          onClick={sync}
          disabled={syncing}
          className="btn-primary"
          style={{ minHeight: 44 }}
        >
          {syncing ? (
            <>
              <RefreshCcw className="w-4 h-4 animate-spin inline mr-1.5" />
              Syncing…
            </>
          ) : (
            <>
              <FolderSync className="w-4 h-4 inline mr-1.5" />
              Sync now
            </>
          )}
        </button>
        <Link to="/admin" className="btn-secondary">
          ← Back to admin
        </Link>
        <div className="ml-auto text-sm" style={{ color: 'var(--ink-500)' }}>
          {counts.total} synced · {counts.pending} pending · {counts.approved}{' '}
          approved · {counts.featured} featured
        </div>
      </div>

      {message && (
        <Card variant="warm" className="mb-4">
          <p style={{ color: 'var(--ink-700)' }}>{message}</p>
        </Card>
      )}

      {/* Clinic tools — staff-only tracker files. Not shown to patients. */}
      <div className="mb-5">
        <div className="eyebrow mb-2">Clinic tools · staff only</div>
        <div className="grid md:grid-cols-2 gap-3">
          {clinicTools.map((t) => (
            <Card key={t.id}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex-1 min-w-0">
                  <div className="eyebrow" style={{ fontSize: '0.7rem' }}>
                    {clinicToolLabels[t.kind]}
                  </div>
                  <h3
                    className="font-display"
                    style={{ fontSize: '1rem', color: 'var(--ink-900)' }}
                  >
                    {t.title}
                  </h3>
                </div>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full"
                  style={{ color: 'var(--ink-500)' }}
                  aria-label="Open in Drive"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p
                className="mb-2"
                style={{ fontSize: '0.9rem', color: 'var(--ink-700)' }}
              >
                {t.summary}
              </p>
              <p
                style={{ fontSize: '0.85rem', color: 'var(--ink-500)' }}
              >
                {t.whenToUse}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        {(['pending', 'approved', 'featured', 'all'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="rounded-full px-3 py-1.5 text-sm"
            style={{
              backgroundColor:
                filter === f ? 'var(--sage-700)' : 'white',
              color: filter === f ? 'white' : 'var(--ink-700)',
              border:
                filter === f
                  ? '1px solid var(--sage-700)'
                  : '1px solid var(--sage-200)',
              fontWeight: filter === f ? 600 : 500,
            }}
          >
            {f === 'pending'
              ? 'Pending approval'
              : f === 'approved'
                ? 'Approved'
                : f === 'featured'
                  ? 'Featured'
                  : 'Everything'}
          </button>
        ))}
        <div
          className="flex items-center gap-2 rounded-full px-3 py-1.5 ml-auto"
          style={{ backgroundColor: 'white', border: '1px solid var(--sage-200)' }}
        >
          <Search className="w-4 h-4" style={{ color: 'var(--ink-500)' }} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="outline-none text-sm"
            style={{ minWidth: 180 }}
          />
        </div>
      </div>

      {loading ? (
        <Card>
          <p style={{ color: 'var(--ink-500)' }}>Loading…</p>
        </Card>
      ) : items.length === 0 ? (
        <GetStartedCard />
      ) : filtered.length === 0 ? (
        <Card>
          <p style={{ color: 'var(--ink-500)' }}>
            Nothing matches that filter.
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <AdminResourceCard
              key={r.id}
              resource={r}
              onToggleApproved={() =>
                patch(r.id, { approved: !r.approved })
              }
              onToggleFeatured={() =>
                patch(r.id, { featured: !r.featured })
              }
              onChangeCategory={(category) =>
                patch(r.id, { category: category as ResourceCategory })
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

function AdminResourceCard({
  resource,
  onToggleApproved,
  onToggleFeatured,
  onChangeCategory,
}: {
  resource: DriveResource
  onToggleApproved: () => void
  onToggleFeatured: () => void
  onChangeCategory: (c: string) => void
}) {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="eyebrow" style={{ fontSize: '0.7rem' }}>
            {typeLabels[resource.type]}
            {resource.modifiedTime && (
              <span> · updated {resource.modifiedTime.slice(0, 10)}</span>
            )}
          </div>
          <h3
            className="font-display"
            style={{ fontSize: '1.05rem', color: 'var(--ink-900)' }}
          >
            {resource.title}
          </h3>
        </div>
        {resource.href && (
          <a
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full"
            style={{ color: 'var(--ink-500)' }}
            aria-label="Open in Drive"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-3">
        <Chip tone={resource.approved ? 'sky' : 'sand'}>
          {resource.approved ? 'Approved' : 'Pending'}
        </Chip>
        {resource.featured && <Chip tone="sand">Featured</Chip>}
        {resource.weeks?.slice(0, 3).map((w) => (
          <Chip key={`w-${w}`} tone="ivory">
            Week {w}
          </Chip>
        ))}
      </div>

      <label className="block mb-3">
        <span
          className="block text-xs font-semibold mb-1"
          style={{ color: 'var(--ink-500)' }}
        >
          Category
        </span>
        <select
          value={resource.category}
          onChange={(e) => onChangeCategory(e.target.value)}
          className="w-full p-2 rounded-xl border text-sm"
          style={{ borderColor: 'var(--sage-200)' }}
        >
          {(Object.keys(categoryLabels) as ResourceCategory[]).map((c) => (
            <option key={c} value={c}>
              {categoryLabels[c]}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onToggleApproved}
          className={resource.approved ? 'btn-secondary' : 'btn-primary'}
          style={{ minHeight: 40, fontSize: '0.9rem' }}
        >
          {resource.approved ? (
            <>
              <EyeOff className="w-4 h-4 inline mr-1.5" />
              Unapprove
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 inline mr-1.5" />
              Approve
            </>
          )}
        </button>
        <button
          onClick={onToggleFeatured}
          className="btn-secondary"
          style={{ minHeight: 40, fontSize: '0.9rem' }}
        >
          <Star
            className="w-4 h-4 inline mr-1.5"
            style={{ color: resource.featured ? 'var(--sand-700)' : undefined }}
          />
          {resource.featured ? 'Unfeature' : 'Feature'}
        </button>
      </div>
    </Card>
  )
}

function GetStartedCard() {
  return (
    <Card className="mb-4">
      <div className="flex items-start gap-3">
        <CloudUpload
          className="w-8 h-8 shrink-0"
          style={{ color: 'var(--sage-700)' }}
        />
        <div>
          <h3 className="font-display text-lg mb-1">
            Connect your Google Drive in 4 steps
          </h3>
          <ol
            className="list-decimal pl-5 space-y-1"
            style={{ color: 'var(--ink-700)', fontSize: '0.95rem' }}
          >
            <li>
              In Google Cloud Console, create a project and enable the{' '}
              <em>Drive API</em>. Create a service account and download its
              JSON key.
            </li>
            <li>
              Signed in as <code>iesleep12@gmail.com</code>, create a Drive
              folder — e.g. <em>Bredesen Protocol — Resources</em> — and share
              it with the service account email as <em>Viewer</em>.
            </li>
            <li>
              In Netlify <em>Site settings → Environment variables</em>, add{' '}
              <code>GOOGLE_SERVICE_ACCOUNT_JSON</code> (paste the key contents)
              and <code>GOOGLE_DRIVE_RESOURCES_FOLDER_ID</code> (the folder id
              from the Drive URL).
            </li>
            <li>
              Return here and tap <strong>Sync now</strong>. Files will be
              classified, appear below, and go live for patients once you
              approve them.
            </li>
          </ol>
        </div>
      </div>
    </Card>
  )
}
