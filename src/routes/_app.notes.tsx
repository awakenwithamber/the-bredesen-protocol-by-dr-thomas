import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useProgress } from '@/lib/progress'
import { Card, SectionHeading, BigButton } from '@/components/ui'
import { StickyNote } from 'lucide-react'

export const Route = createFileRoute('/_app/notes')({
  component: NotesPage,
})

function NotesPage() {
  const { store, addNote } = useProgress()
  const [text, setText] = useState('')

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="My notes"
        title="A quiet place to write"
        description="Use this space to write whatever feels helpful — a win, a worry, a question for the clinic."
      />

      <Card className="mb-6">
        <label className="block mb-3">
          <span className="block text-sm font-semibold mb-2">Write a note</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl border"
            style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
            placeholder="Today I noticed..."
          />
        </label>
        <BigButton
          onClick={() => {
            if (!text.trim()) return
            addNote(text.trim())
            setText('')
          }}
          disabled={!text.trim()}
        >
          Save note
        </BigButton>
      </Card>

      <div className="space-y-4">
        {store.notes.length === 0 ? (
          <Card variant="warm">
            <StickyNote className="w-6 h-6 mb-2" style={{ color: 'var(--color-sage-600)' }} />
            <p>No notes yet. Whatever you write stays private, just for you.</p>
          </Card>
        ) : (
          store.notes.map((n) => (
            <Card key={n.id}>
              <div className="text-xs mb-2" style={{ color: 'var(--color-ink-500)' }}>
                {new Date(n.createdAt).toLocaleString()}
              </div>
              <p style={{ whiteSpace: 'pre-wrap' }}>{n.text}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
