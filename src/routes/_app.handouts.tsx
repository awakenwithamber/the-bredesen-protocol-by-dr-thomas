import { createFileRoute, Link } from '@tanstack/react-router'
  import {
    FileText, Printer, ArrowRight, Brain, Apple, Footprints,
    HeartPulse, NotebookPen, Calendar, Leaf,
  } from 'lucide-react'
  import { SectionHeading, Card } from '@/components/ui'

  export const Route = createFileRoute('/_app/handouts')({
    component: HandoutsPage,
  })

  type Handout = { title: string; description: string; icon: any; action: 'Print' | 'Read' | 'View'; href: string }

  const printable: Handout[] = [
    { title: "Today's Checklist", description: "Print and stick on your fridge. Shows your 5 gentle tasks for today.", icon: FileText, action: 'Print', href: '/print-center' },
    { title: 'Weekly Plan Sheet', description: "This week's intention, three habits to focus on, and a caregiver tip — all on one page.", icon: Calendar, action: 'Print', href: '/print-center' },
    { title: 'Grocery Shopping Guide', description: 'A short, simple list of brain-healthy foods for your next shopping trip.', icon: Apple, action: 'Print', href: '/print-center' },
    { title: 'Movement Cards', description: 'Large-print cards for seated, walking, and balance exercises. Easy to follow.', icon: Footprints, action: 'Print', href: '/print-center' },
    { title: 'Breathwork Cards', description: 'Quick reference cards for your daily breathing practices.', icon: HeartPulse, action: 'Print', href: '/print-center' },
    { title: 'Brain Game Cards', description: 'Printable, large-print brain games to do at the table with a caregiver.', icon: Brain, action: 'Print', href: '/print-center' },
    { title: 'Journal Prompt Sheet', description: "This week's reflection questions, printed large for easy reading.", icon: NotebookPen, action: 'Print', href: '/print-center' },
    { title: 'Caregiver Weekly Plan', description: 'Three clear ways a caregiver can help this week. Easy to hand to a family member.', icon: FileText, action: 'Print', href: '/caregiver' },
  ]

  const guides: Handout[] = [
    { title: 'Sugar, Gluten & Oil Substitutes', description: 'A visual guide to brain-friendly cooking swaps. Keep one on your refrigerator.', icon: Leaf, action: 'Read', href: '/substitutes' },
    { title: 'Hemp & CBD Guide', description: "Dr. Thomas's plain-English guide to hemp products that support brain health.", icon: Leaf, action: 'Read', href: '/hemp' },
    { title: 'Pantry Audit Checklist', description: 'Step through your kitchen and replace brain-harmful items with better options.', icon: FileText, action: 'View', href: '/pantry-audit' },
    { title: 'Program Timeline', description: 'Your start date, 24-week end date, and what happens after 6 months.', icon: Calendar, action: 'View', href: '/program-dates' },
    { title: 'Full Resource Library', description: 'Browse all articles, guides, and checklists organized by topic.', icon: FileText, action: 'View', href: '/resources' },
  ]

  function HandoutRow({ h }: { h: Handout }) {
    return (
      <Link to={h.href} style={{ textDecoration: 'none', display: 'block' }}>
        <div className="flex items-start gap-4 rounded-2xl p-4" style={{ background: 'white', border: '1px solid var(--sage-200)' }}>
          <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 44, height: 44, background: 'var(--sage-100)' }}>
            <h.icon className="w-5 h-5" style={{ color: 'var(--sage-700)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display text-base" style={{ color: 'var(--ink-900)' }}>{h.title}</div>
            <p className="text-sm mt-0.5" style={{ color: 'var(--ink-600)', lineHeight: 1.55 }}>{h.description}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-sm font-medium mt-0.5" style={{ color: 'var(--sage-700)' }}>
            {h.action === 'Print' ? <Printer className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            <span>{h.action}</span>
          </div>
        </div>
      </Link>
    )
  }

  function HandoutsPage() {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <SectionHeading eyebrow="Handouts" title="Print what matters most"
          description="Every sheet is large-print and caregiver-friendly. Print the ones that help you most and keep them nearby." />
        <Card variant="sage" className="mt-4 mb-8">
          <p style={{ color: 'var(--ink-900)', lineHeight: 1.65 }}>
            <strong>Tip:</strong> The "Today's Checklist" is the most popular handout.
            Print one each week and put it on your refrigerator so you always know what to do next.
          </p>
        </Card>
        <h2 className="font-display text-xl mb-3" style={{ color: 'var(--ink-900)' }}>Printable sheets</h2>
        <div className="space-y-3 mb-8">{printable.map((h) => <HandoutRow key={h.title} h={h} />)}</div>
        <h2 className="font-display text-xl mb-3" style={{ color: 'var(--ink-900)' }}>On-screen guides</h2>
        <div className="space-y-3 mb-8">{guides.map((h) => <HandoutRow key={h.title} h={h} />)}</div>
        <div className="mt-6 text-center">
          <Link to="/print-center" style={{ color: 'var(--sage-700)', fontSize: '0.95rem', fontWeight: 500 }}>
            Open the full Print Center
          </Link>
        </div>
      </div>
    )
  }
  