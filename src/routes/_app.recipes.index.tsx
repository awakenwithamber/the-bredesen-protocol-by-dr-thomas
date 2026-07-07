import { createFileRoute, Link } from '@tanstack/react-router'
import { Clock, Apple } from 'lucide-react'
import { recipes } from '@/content/recipes'
import { Card, SectionHeading, Chip } from '@/components/ui'

export const Route = createFileRoute('/_app/recipes/')({
  component: RecipesIndex,
})

function RecipesIndex() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="Recipes"
        title="Simple, supportive meals"
        description="Realistic meals for real kitchens. Every recipe includes a minimum-effort version for low-energy days."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recipes.map((r) => (
          <Link key={r.id} to="/recipes/$id" params={{ id: r.id }} className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Apple className="w-4 h-4" style={{ color: 'var(--color-sage-600)' }} />
                <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-sage-600)' }}>
                  {r.mealType}
                </div>
              </div>
              <h3 className="font-display text-xl mb-2">{r.title}</h3>
              <p className="mb-3" style={{ color: 'var(--color-ink-500)' }}>
                {r.summary}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Chip tone="sand">
                  <Clock className="w-3 h-3" /> {r.totalTime} min
                </Chip>
                <Chip>{r.effort.replace('-', ' ')}</Chip>
                {r.tags.slice(0, 2).map((t) => (
                  <Chip key={t} tone="ivory">{t}</Chip>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
