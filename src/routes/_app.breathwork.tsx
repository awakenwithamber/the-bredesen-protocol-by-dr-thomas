import { createFileRoute } from '@tanstack/react-router'
import { HeartPulse, Clock, Volume2 } from 'lucide-react'
import { breathwork } from '@/content/breathwork'
import { Card, SectionHeading, Chip } from '@/components/ui'

export const Route = createFileRoute('/_app/breathwork')({
  component: BreathworkLibrary,
})

function BreathworkLibrary() {
  function speak(text: string) {
    if (typeof window === 'undefined') return
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.9
    window.speechSynthesis.speak(u)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="Breathwork"
        title="Calming the nervous system"
        description="Short practices that settle the body. Use them morning, midday, before bed, or when things feel big."
      />

      <div className="grid md:grid-cols-2 gap-5">
        {breathwork.map((b) => (
          <Card key={b.id} className="h-full">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="w-4 h-4" style={{ color: 'var(--color-sage-600)' }} />
              <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-sage-600)' }}>
                {b.category}
              </div>
            </div>
            <h3 className="font-display text-xl mb-2">{b.title}</h3>

            <div className="flex items-center gap-2 flex-wrap mb-3">
              <Chip tone="sand"><Clock className="w-3 h-3" /> {b.duration} min</Chip>
              <Chip tone="sky">{b.bestTime}</Chip>
              {b.lowEnergy && <Chip tone="ivory">low energy friendly</Chip>}
            </div>

            <ol className="space-y-2 mb-4">
              {b.instructions.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold shrink-0" style={{ backgroundColor: 'var(--color-sage-100)', color: 'var(--color-sage-800)' }}>
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>

            <button
              onClick={() => speak(b.audioScript)}
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.9rem' }}
            >
              <Volume2 className="w-4 h-4" /> Read to me
            </button>

            <div className="mt-3 text-sm" style={{ color: 'var(--color-ink-500)' }}>
              <div><strong>With caregiver:</strong> {b.caregiverAssisted}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
