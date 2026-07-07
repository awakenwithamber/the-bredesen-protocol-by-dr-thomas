import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, Clock, Printer } from 'lucide-react'
import { recipes } from '@/content/recipes'
import { Card, SectionHeading, Chip } from '@/components/ui'

export const Route = createFileRoute('/_app/recipes/$id')({
  component: RecipeDetail,
  loader: ({ params }) => {
    const recipe = recipes.find((r) => r.id === params.id)
    if (!recipe) throw notFound()
    return { recipe }
  },
})

function RecipeDetail() {
  const { recipe } = Route.useLoaderData()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/recipes" className="inline-flex items-center gap-1.5 text-sm mb-5 no-print" style={{ color: 'var(--color-ink-500)' }}>
        <ArrowLeft className="w-4 h-4" /> Back to recipes
      </Link>

      <SectionHeading
        eyebrow={recipe.mealType.toUpperCase()}
        title={recipe.title}
        description={recipe.summary}
      />

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Chip tone="sand">
          <Clock className="w-3 h-3" /> {recipe.totalTime} min
        </Chip>
        <Chip>{recipe.effort.replace('-', ' ')}</Chip>
        {recipe.tags.map((t) => (
          <Chip key={t} tone="ivory">{t}</Chip>
        ))}
        <button
          onClick={() => window.print()}
          className="btn-secondary no-print ml-auto"
          style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.9rem' }}
        >
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Card>
          <h3 className="font-display text-xl mb-3">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2.5 block w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-sage-500)' }} />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="font-display text-xl mb-3">How to cook it</h3>
          <ol className="space-y-3">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold shrink-0"
                  style={{ backgroundColor: 'var(--color-sage-100)', color: 'var(--color-sage-800)' }}
                >
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <Card variant="warm">
          <h3 className="font-display text-lg mb-2">Minimum-effort version</h3>
          <p>{recipe.minimumEffortVersion}</p>
        </Card>

        <Card variant="sage">
          <h3 className="font-display text-lg mb-2">For caregivers</h3>
          <p>{recipe.caregiverNote}</p>
        </Card>
      </div>

      {recipe.substitutions.length > 0 && (
        <Card className="mt-5">
          <h3 className="font-display text-lg mb-2">Substitutions</h3>
          <ul className="space-y-2">
            {recipe.substitutions.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-2.5 block w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-sand-400)' }} />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {recipe.textureNotes && (
        <Card className="mt-5">
          <h3 className="font-display text-lg mb-2">Texture notes</h3>
          <p>{recipe.textureNotes}</p>
        </Card>
      )}
    </div>
  )
}
