import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { LessonView } from '@/components/LessonView'
import { getLesson } from '@/content/phaseLessons'

export const Route = createFileRoute('/_app/phases/$slug')({
  component: PhaseLessonPage,
})

function PhaseLessonPage() {
  const { slug } = useParams({ from: '/_app/phases/$slug' })
  const lesson = getLesson(slug)

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="font-display" style={{ fontSize: '1.5rem' }}>
          Lesson not found
        </h1>
        <p className="mt-2" style={{ color: 'var(--ink-700)' }}>
          We could not find that lesson. It may have been renamed.
        </p>
        <Link
          to="/phases"
          className="btn-primary mt-4 inline-flex"
          style={{ minHeight: 44 }}
        >
          Back to all phases
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        <Link
          to="/phases"
          className="inline-flex items-center gap-1.5 text-sm"
          style={{ color: 'var(--ink-500)' }}
        >
          <ArrowLeft className="w-4 h-4" /> All phases
        </Link>
      </div>
      <LessonView lesson={lesson} />
    </div>
  )
}
