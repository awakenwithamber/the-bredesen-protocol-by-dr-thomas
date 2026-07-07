import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, Printer } from 'lucide-react'
import { brainGames } from '@/content/brainGames'
import { Card, SectionHeading, Chip } from '@/components/ui'

export const Route = createFileRoute('/_app/brain-games/$id')({
  component: GameDetail,
  loader: ({ params }) => {
    const game = brainGames.find((g) => g.id === params.id)
    if (!game) throw notFound()
    return { game }
  },
})

function GameDetail() {
  const { game } = Route.useLoaderData()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/brain-games" className="inline-flex items-center gap-1.5 text-sm mb-5 no-print" style={{ color: 'var(--color-ink-500)' }}>
        <ArrowLeft className="w-4 h-4" /> Back to brain games
      </Link>

      <SectionHeading
        eyebrow={game.category}
        title={game.title}
        description={game.objective}
      />

      <div className="flex items-center gap-2 flex-wrap mb-6">
        <Chip>{game.difficulty.replace('-', ' ')}</Chip>
        <Chip tone="sand">{game.duration} min</Chip>
        {game.printable && (
          <button
            onClick={() => window.print()}
            className="btn-secondary no-print ml-auto"
            style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.9rem' }}
          >
            <Printer className="w-4 h-4" /> Print
          </button>
        )}
      </div>

      <Card className="mb-5">
        <h3 className="font-display text-xl mb-3">How to play</h3>
        <ol className="space-y-3">
          {game.instructions.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold shrink-0" style={{ backgroundColor: 'var(--color-sage-100)', color: 'var(--color-sage-800)' }}>
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid md:grid-cols-2 gap-5">
        <Card variant="sage">
          <h3 className="font-display text-lg mb-2">With a caregiver</h3>
          <p>{game.caregiverVersion}</p>
        </Card>
        <Card variant="warm">
          <h3 className="font-display text-lg mb-2">Encouragement</h3>
          <p>{game.lowScoreEncouragement}</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <Card>
          <h3 className="font-display text-lg mb-2">Easier version</h3>
          <p>{game.adaptiveEasier}</p>
        </Card>
        <Card>
          <h3 className="font-display text-lg mb-2">Harder version</h3>
          <p>{game.adaptiveHarder}</p>
        </Card>
      </div>
    </div>
  )
}
