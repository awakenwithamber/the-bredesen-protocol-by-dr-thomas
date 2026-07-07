import { createFileRoute, Link } from '@tanstack/react-router'
  import {
    BookOpen, ArrowRight, GraduationCap, Leaf, Brain, Video, LibraryBig,
  } from 'lucide-react'
  import { Card, SectionHeading } from '@/components/ui'
  import { phases } from '@/content/phases'

  export const Route = createFileRoute('/_app/education')({
    component: EducationPage,
  })

  const sections = [
    {
      icon: BookOpen,
      label: 'Start Here',
      title: 'What is the Bredesen Protocol?',
      description: 'A gentle introduction to why this program works and what to expect. Perfect for day one.',
      href: '/start-here',
      tone: 'sage' as const,
    },
    {
      icon: GraduationCap,
      label: '6 Phases',
      title: 'Your 6-Phase Journey',
      description: 'See each phase of the 24-week program — what it covers and why it matters.',
      href: '/phases',
      tone: 'warm' as const,
    },
    {
      icon: Leaf,
      label: 'Food Swaps',
      title: 'Sugar, Gluten & Oil Substitutes',
      description: 'Simple kitchen swaps for a brain-friendly diet. Easy to read, easy to use.',
      href: '/substitutes',
      tone: 'sage' as const,
    },
    {
      icon: Brain,
      label: 'Hemp & CBD',
      title: 'Hemp, CBD & Brain Health',
      description: "Dr. Thomas's plain-English guide to hemp products that support your brain.",
      href: '/hemp',
      tone: 'warm' as const,
    },
    {
      icon: Video,
      label: 'Videos',
      title: 'Video Library',
      description: 'Short videos to watch at your own pace. Each one is under 10 minutes.',
      href: '/videos',
      tone: 'sage' as const,
    },
    {
      icon: LibraryBig,
      label: 'Resource Library',
      title: 'Articles & Guides',
      description: 'Handouts, articles, and checklists organized by topic. Browse when you are ready.',
      href: '/resources',
      tone: 'warm' as const,
    },
  ]

  function EducationPage() {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <SectionHeading
          eyebrow="Education"
          title="Learn at your own pace"
          description="Everything here is written in plain English. You only need to read a little each day — there is no rush."
        />

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {sections.map(({ icon: Icon, label, title, description, href, tone }) => (
            <Link key={href} to={href} style={{ textDecoration: 'none' }}>
              <Card variant={tone} className="h-full cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    className="w-5 h-5"
                    style={{ color: tone === 'sage' ? 'var(--sage-700)' : 'var(--sand-700)' }}
                  />
                  <span
                    className="eyebrow"
                    style={{
                      fontSize: '0.72rem',
                      color: tone === 'sage' ? 'var(--sage-700)' : 'var(--sand-700)',
                    }}
                  >
                    {label}
                  </span>
                </div>
                <h3
                  className="font-display text-lg mb-1"
                  style={{ color: 'var(--ink-900)', lineHeight: 1.25 }}
                >
                  {title}
                </h3>
                <p style={{ color: 'var(--ink-700)', fontSize: '0.95rem', lineHeight: 1.55 }}>
                  {description}
                </p>
                <div
                  className="flex items-center gap-1 mt-3"
                  style={{
                    color: tone === 'sage' ? 'var(--sage-700)' : 'var(--sand-700)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                  }}
                >
                  Open <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Phase overview strip — links to /phases index */}
        <h2 className="font-display text-xl mt-10 mb-4" style={{ color: 'var(--ink-900)' }}>
          The 6 phases at a glance
        </h2>
        <div className="space-y-2">
          {phases.map((p) => (
            <Link
              key={p.number}
              to="/phases"
              className="flex items-center gap-4 rounded-2xl p-4"
              style={{ background: 'white', border: '1px solid var(--sage-200)', textDecoration: 'none' }}
            >
              <div
                className="rounded-full flex items-center justify-center shrink-0 font-display"
                style={{
                  width: 38, height: 38,
                  background: 'var(--sage-100)',
                  color: 'var(--sage-800)',
                  fontWeight: 700, fontSize: '0.95rem',
                }}
              >
                {p.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-base" style={{ color: 'var(--ink-900)' }}>
                  {p.title}
                </div>
                <div className="text-sm mt-0.5" style={{ color: 'var(--ink-500)' }}>
                  Weeks {p.weekRange[0]}–{p.weekRange[1]} &middot; {p.tagline}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" style={{ color: 'var(--ink-300)' }} />
            </Link>
          ))}
        </div>

        <Card variant="sage" className="mt-8">
          <p style={{ color: 'var(--ink-900)', lineHeight: 1.65, fontSize: '1rem' }}>
            <strong>You are doing great.</strong> Even reading one page today counts.
            Your brain benefits from every small step. Come back whenever you are ready.
          </p>
        </Card>
      </div>
    )
  }
  