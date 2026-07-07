import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'
import { lessons } from '@/content/lessons'
import { Card, SectionHeading, Chip } from '@/components/ui'

export const Route = createFileRoute('/_app/learning/')({
  component: LearningIndex,
})

function LearningIndex() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="Learning Library"
        title="Short lessons on brain health"
        description="Each lesson has a simple version and a deeper version. Choose what fits today."
      />

      <div className="grid md:grid-cols-2 gap-5">
        {lessons.map((l) => (
          <Link key={l.id} to="/learning/$id" params={{ id: l.id }} className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4" style={{ color: 'var(--color-sage-600)' }} />
                <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-sage-600)' }}>
                  {l.category}
                </div>
              </div>
              <h3 className="font-display text-xl mb-2">{l.title}</h3>
              <p style={{ color: 'var(--color-ink-500)' }}>{l.summary}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <Chip tone="sand">{l.estimatedMinutes} min</Chip>
                <Chip tone="ivory">for {l.audience}</Chip>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
