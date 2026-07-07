import { createFileRoute } from '@tanstack/react-router'
import { Video as VideoIcon } from 'lucide-react'
import { videos } from '@/content/library'
import { Card, SectionHeading, Chip } from '@/components/ui'

export const Route = createFileRoute('/_app/videos')({
  component: VideoLibrary,
})

function VideoLibrary() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="Video Library"
        title="Clinic-curated short videos"
        description="Short, beginner-friendly videos. Your clinic adds new ones as the program grows."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((v) => (
          <Card key={v.id} className="h-full">
            <div
              className="rounded-xl mb-3 aspect-video flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-sky-soft)' }}
            >
              <VideoIcon className="w-10 h-10" style={{ color: 'var(--color-sky-deep)' }} />
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--color-sage-600)' }}>
              {v.category}
            </div>
            <h3 className="font-display text-lg mb-2">{v.title}</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--color-ink-500)' }}>{v.summary}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Chip tone="sand">{v.duration}</Chip>
              {v.labels.map((l) => (
                <Chip key={l} tone="ivory">{l}</Chip>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
