import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState, useEffect } from 'react'
import {
  BookOpen,
  Video as VideoIcon,
  FileText,
  ClipboardCheck,
  ShoppingBag,
  Heart,
  Apple,
  Droplet,
  Brain,
  Printer,
  Bookmark,
  BookmarkCheck,
  Search,
  Clock,
  ArrowRight,
} from 'lucide-react'
import {
  resources as curatedResources,
  categoryLabels,
  typeLabels,
  type Resource,
  type ResourceCategory,
  type ResourceType,
} from '@/content/library'
import { Card, SectionHeading, Chip } from '@/components/ui'
import { HealthieReminder } from '@/components/HealthieReminder'
import { ClinicDocuments, ExternalResources } from '@/components/ClinicDocuments'
import { useWorkbook } from '@/lib/program'
import { usePreferences } from '@/lib/preferences'

export const Route = createFileRoute('/_app/resources/')({
  component: ResourceLibrary,
})

const categoryIcons: Record<ResourceCategory, any> = {
  'start-here': BookOpen,
  'bredesen-basics': BookOpen,
  'brain-health': Brain,
  sleep: Heart,
  nutrition: Apple,
  'blood-sugar': Droplet,
  detox: Droplet,
  movement: Heart,
  stress: Heart,
  cognition: Brain,
  recipes: Apple,
  grocery: ShoppingBag,
  caregiver: Heart,
  pantry: Apple,
  supplements: ClipboardCheck,
  journaling: FileText,
  printables: Printer,
}

const typeIcons: Record<ResourceType, any> = {
  video: VideoIcon,
  article: FileText,
  handout: FileText,
  guide: BookOpen,
  checklist: ClipboardCheck,
  worksheet: FileText,
  tracker: ClipboardCheck,
  'grocery-list': ShoppingBag,
  recipe: Apple,
  'caregiver-tool': Heart,
  'brain-game': Brain,
  printable: Printer,
}

const SAVED_KEY = 'bredesen.resources.saved.v1'

function useSaved() {
  const [saved, setSaved] = useState<string[]>([])
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY)
      if (raw) setSaved(JSON.parse(raw))
    } catch {}
  }, [])
  const toggle = (id: string) => {
    setSaved((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }
  return { saved, toggle, isSaved: (id: string) => saved.includes(id) }
}

type FilterKey =
  | 'all'
  | ResourceCategory
  | 'saved'
  | 'video'
  | 'article'
  | 'handout'
  | 'this-week'
  | 'beginner'
  | 'caregiver'
  | 'printable'
  | 'quick'

const categoryChips: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Everything' },
  { key: 'start-here', label: 'Start Here' },
  { key: 'this-week', label: 'This Week' },
  { key: 'saved', label: 'Saved' },
  { key: 'video', label: 'Videos' },
  { key: 'article', label: 'Articles' },
  { key: 'handout', label: 'Handouts' },
  { key: 'recipes', label: 'Recipes' },
  { key: 'grocery', label: 'Grocery' },
  { key: 'sleep', label: 'Sleep' },
  { key: 'detox', label: 'Detox' },
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'blood-sugar', label: 'Blood Sugar' },
  { key: 'movement', label: 'Movement' },
  { key: 'stress', label: 'Breathwork' },
  { key: 'caregiver', label: 'Caregiver' },
  { key: 'journaling', label: 'Journal' },
  { key: 'printable', label: 'Printable' },
  { key: 'beginner', label: 'Beginner' },
  { key: 'quick', label: 'Quick 5 min' },
]

function ResourceLibrary() {
  const { prefs } = usePreferences()
  const { state } = useWorkbook(prefs.startDate, prefs.patientName)
  const { isSaved, toggle } = useSaved()

  const [filter, setFilter] = useState<FilterKey>('all')
  const [search, setSearch] = useState('')
  const [driveResources, setDriveResources] = useState<Resource[]>([])

  // Load any admin-approved Google Drive resources. Falls back gracefully
  // if the function is not deployed yet or the Drive folder is empty.
  useEffect(() => {
    let cancelled = false
    fetch('/api/drive-resources')
      .then((r) => (r.ok ? r.json() : { resources: [] }))
      .then((data: { resources: Resource[] }) => {
        if (!cancelled && Array.isArray(data.resources)) {
          setDriveResources(data.resources)
        }
      })
      .catch(() => {
        /* noop — Drive is optional */
      })
    return () => {
      cancelled = true
    }
  }, [])

  const allResources = useMemo(
    () => [...curatedResources, ...driveResources],
    [driveResources],
  )

  const todaysPick = useMemo(() => {
    const weekMatches = allResources.filter((r) =>
      r.weeks.includes(state.currentWeek),
    )
    const phaseMatches = allResources.filter((r) =>
      r.phases.includes(state.currentPhase),
    )
    const featured = allResources.filter((r) => r.featured)
    const pool =
      weekMatches.length > 0
        ? weekMatches
        : phaseMatches.length > 0
          ? phaseMatches
          : featured.length > 0
            ? featured
            : allResources
    if (pool.length === 0) return undefined
    return pool[Math.abs(state.currentDay) % pool.length]
  }, [allResources, state.currentDay, state.currentWeek, state.currentPhase])

  const filtered = useMemo(() => {
    let list = allResources

    if (filter === 'saved') list = list.filter((r) => isSaved(r.id))
    else if (filter === 'this-week')
      list = list.filter((r) => r.weeks.includes(state.currentWeek))
    else if (filter === 'video') list = list.filter((r) => r.type === 'video')
    else if (filter === 'article')
      list = list.filter((r) => r.type === 'article')
    else if (filter === 'handout')
      list = list.filter((r) =>
        ['handout', 'guide', 'checklist', 'worksheet', 'tracker'].includes(r.type),
      )
    else if (filter === 'printable') list = list.filter((r) => r.printable)
    else if (filter === 'beginner')
      list = list.filter((r) => r.beginnerFriendly)
    else if (filter === 'quick') list = list.filter((r) => r.estMinutes <= 5)
    else if (filter !== 'all') list = list.filter((r) => r.category === filter)

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }

    return list
  }, [allResources, filter, search, state.currentWeek, isSaved])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <SectionHeading
        eyebrow="Resource Library"
        title="Everything you need, in the right order"
        description="Short videos, printable guides, articles, and grocery helpers — sorted for where you are in the program."
      />

      {/* Healthie portal reminder — top of resources page */}
      <div className="mb-6">
        <HealthieReminder variant="full" />
      </div>

      {/* Clinic documents by phase */}
      <ClinicDocuments />

      {/* Trusted external resources */}
      <ExternalResources />

      {/* Today's pick */}
      {todaysPick && (
        <Card variant="sage" className="mb-5">
          <div className="flex items-start gap-4 flex-col sm:flex-row">
            <div className="flex-1 min-w-0">
              <div className="eyebrow mb-1">Today's helpful resource</div>
              <h3 className="font-display" style={{ fontSize: '1.25rem', color: 'var(--ink-900)' }}>
                {todaysPick.title}
              </h3>
              <p className="mt-1" style={{ color: 'var(--ink-700)' }}>
                {todaysPick.whyItMatters}
              </p>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <Chip tone="ivory">{typeLabels[todaysPick.type]}</Chip>
                {todaysPick.estMinutes > 0 && (
                  <Chip tone="ivory">{todaysPick.estMinutes} min</Chip>
                )}
                {todaysPick.beginnerFriendly && (
                  <Chip tone="sky">Beginner friendly</Chip>
                )}
              </div>
            </div>
            <Link
              to="/resources/$id"
              params={{ id: todaysPick.id }}
              className="btn-primary inline-flex items-center gap-2"
            >
              Open <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Card>
      )}

      {/* Search */}
      <div className="mb-3">
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2"
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--sage-200)',
          }}
        >
          <Search className="w-4 h-4" style={{ color: 'var(--ink-500)' }} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources — try 'sleep' or 'pantry'"
            className="w-full bg-transparent outline-none text-base"
            style={{ color: 'var(--ink-900)' }}
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 flex-wrap mb-4 no-print">
        {categoryChips.map((c) => {
          const active = filter === c.key
          return (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className="rounded-full px-3 py-1.5 text-sm transition-colors"
              style={{
                backgroundColor: active ? 'var(--sage-700)' : 'white',
                color: active ? 'white' : 'var(--ink-700)',
                border: active
                  ? '1px solid var(--sage-700)'
                  : '1px solid var(--sage-200)',
                fontWeight: active ? 600 : 500,
              }}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      <div className="text-sm mb-3" style={{ color: 'var(--ink-500)' }}>
        {filtered.length} resource{filtered.length === 1 ? '' : 's'}
        {driveResources.length > 0 && (
          <span>
            {' '}
            · including {driveResources.length} from Google Drive
          </span>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card>
          <p style={{ color: 'var(--ink-700)' }}>
            Nothing matches that filter yet. Try <em>Everything</em> or a different
            category.
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <ResourceCard
              key={r.id}
              resource={r}
              saved={isSaved(r.id)}
              onToggleSaved={() => toggle(r.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ResourceCard({
  resource,
  saved,
  onToggleSaved,
}: {
  resource: Resource
  saved: boolean
  onToggleSaved: () => void
}) {
  const TypeIcon = typeIcons[resource.type]
  const CatIcon = categoryIcons[resource.category]

  const isExternal = resource.source === 'drive' || resource.source === 'public'

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div
            className="rounded-lg flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              backgroundColor: 'var(--sage-100)',
            }}
          >
            <TypeIcon
              className="w-4 h-4"
              style={{ color: 'var(--sage-700)' }}
            />
          </div>
          <div className="eyebrow" style={{ fontSize: '0.7rem' }}>
            {typeLabels[resource.type]}
          </div>
        </div>
        <button
          onClick={onToggleSaved}
          aria-label={saved ? 'Remove from saved' : 'Save for later'}
          className="rounded-full p-1"
          style={{ color: saved ? 'var(--sage-700)' : 'var(--ink-500)' }}
        >
          {saved ? (
            <BookmarkCheck className="w-5 h-5" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      <h3 className="font-display mb-1" style={{ fontSize: '1.1rem', color: 'var(--ink-900)' }}>
        {resource.title}
      </h3>
      <p
        className="mb-3 flex-1"
        style={{ fontSize: '0.92rem', color: 'var(--ink-700)', lineHeight: 1.5 }}
      >
        {resource.whyItMatters}
      </p>

      <div className="flex items-center gap-1.5 flex-wrap mb-3">
        {resource.estMinutes > 0 && (
          <Chip tone="ivory">
            <Clock className="w-3 h-3 inline mr-1" />
            {resource.estMinutes} min
          </Chip>
        )}
        <Chip tone="ivory">
          <CatIcon className="w-3 h-3 inline mr-1" />
          {categoryLabels[resource.category]}
        </Chip>
        {resource.beginnerFriendly && <Chip tone="sky">Beginner</Chip>}
        {resource.caregiverFriendly && <Chip tone="sky">Caregiver ok</Chip>}
        {resource.printable && <Chip tone="sand">Printable</Chip>}
        {resource.source === 'drive' && <Chip tone="sand">Clinic Drive</Chip>}
      </div>

      <div className="flex items-center gap-2">
        {resource.href && resource.href.startsWith('/') ? (
          <a href={resource.href} className="btn-secondary flex-1 text-center">
            Open
          </a>
        ) : isExternal && resource.href ? (
          <a
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary flex-1 text-center"
          >
            Open
          </a>
        ) : (
          <Link
            to="/resources/$id"
            params={{ id: resource.id }}
            className="btn-secondary flex-1 text-center"
          >
            Open
          </Link>
        )}
        {resource.printable && (
          <button
            className="tap-large rounded-xl px-3"
            style={{
              border: '1px solid var(--sage-200)',
              backgroundColor: 'white',
              color: 'var(--ink-700)',
            }}
            onClick={() => window.print()}
            aria-label="Print this resource"
          >
            <Printer className="w-4 h-4" />
          </button>
        )}
      </div>
    </Card>
  )
}
