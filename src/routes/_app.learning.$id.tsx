import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, Printer, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { lessons } from '@/content/lessons'
import { Card, SectionHeading, Chip } from '@/components/ui'

export const Route = createFileRoute('/_app/learning/$id')({
  component: LessonDetail,
  loader: ({ params }) => {
    const lesson = lessons.find((l) => l.id === params.id)
    if (!lesson) throw notFound()
    return { lesson }
  },
})

function LessonDetail() {
  const { lesson } = Route.useLoaderData()
  const [depth, setDepth] = useState<'simple' | 'deeper'>('simple')

  function speak(text: string) {
    if (typeof window === 'undefined') return
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.95
    window.speechSynthesis.speak(u)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/learning" className="inline-flex items-center gap-1.5 text-sm mb-5 no-print" style={{ color: 'var(--color-ink-500)' }}>
        <ArrowLeft className="w-4 h-4" /> Back to learning
      </Link>

      <SectionHeading
        eyebrow={lesson.category}
        title={lesson.title}
        description={lesson.summary}
      />

      <div className="flex items-center gap-2 flex-wrap mb-6 no-print">
        <Chip>{lesson.estimatedMinutes} min</Chip>
        <Chip tone="ivory">for {lesson.audience}</Chip>
        <button
          onClick={() => setDepth(depth === 'simple' ? 'deeper' : 'simple')}
          className="btn-secondary"
          style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.9rem' }}
        >
          {depth === 'simple' ? 'Read deeper version' : 'Back to simple version'}
        </button>
        <button
          onClick={() => speak(depth === 'simple' ? lesson.simpleVersion : lesson.deeperVersion)}
          className="btn-secondary"
          style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.9rem' }}
        >
          <Volume2 className="w-4 h-4" /> Read to me
        </button>
        <button
          onClick={() => window.print()}
          className="btn-secondary ml-auto"
          style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.9rem' }}
        >
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>

      <Card className="mb-5">
        <h3 className="font-display text-lg mb-3">
          {depth === 'simple' ? 'Simple version' : 'Deeper version'}
        </h3>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.75 }}>
          {depth === 'simple' ? lesson.simpleVersion : lesson.deeperVersion}
        </p>
      </Card>

      <Card variant="warm">
        <h3 className="font-display text-lg mb-2">One thing to remember</h3>
        <p>{lesson.printTakeaway}</p>
      </Card>
    </div>
  )
}
