import { createFileRoute } from '@tanstack/react-router'
import { usePreferences } from '@/lib/preferences'
import { Card, SectionHeading } from '@/components/ui'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/_app/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const { prefs, update } = usePreferences()
  const [name, setName] = useState(prefs.patientName)
  const [startDate, setStartDate] = useState(prefs.startDate)

  useEffect(() => {
    setName(prefs.patientName)
    setStartDate(prefs.startDate)
  }, [prefs.patientName, prefs.startDate])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <SectionHeading
        eyebrow="Settings"
        title="Your preferences"
        description="All of these can be changed any time. Small choices, kept safely."
      />

      <div className="space-y-5">
        <Card>
          <h3 className="font-display text-lg mb-3">Display</h3>
          <div className="mb-4">
            <div className="text-caption mb-2">View size</div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { key: 'standard', label: 'Standard', caption: 'All features' },
                  { key: 'simple', label: 'Simple', caption: 'Fewer cards, bigger text' },
                  { key: 'large-print', label: 'Large Print', caption: '125% larger text' },
                ] as const
              ).map((opt) => {
                const active = prefs.displayMode === opt.key
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => update({ displayMode: opt.key })}
                    aria-pressed={active}
                    className="mood-btn"
                    style={{
                      background: active ? 'var(--sage-100)' : 'white',
                      borderColor: active ? 'var(--sage-500)' : 'var(--sage-200)',
                      color: active ? 'var(--sage-900)' : 'var(--ink-700)',
                    }}
                  >
                    <div className="text-left">
                      <div style={{ fontWeight: 700 }}>{opt.label}</div>
                      <div className="text-caption" style={{ fontSize: '0.95rem' }}>
                        {opt.caption}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          <Toggle
            label="Read-to-me audio support"
            checked={prefs.audioEnabled}
            onChange={(v) => update({ audioEnabled: v })}
          />
          <Toggle
            label="Print-friendly pages by default"
            checked={prefs.printFriendly}
            onChange={(v) => update({ printFriendly: v })}
          />
        </Card>

        <Card>
          <h3 className="font-display text-lg mb-3">Reminders</h3>
          <Toggle
            label="Email reminders"
            checked={prefs.emailReminders}
            onChange={(v) => update({ emailReminders: v })}
          />
          <Toggle
            label="Text message reminders"
            checked={prefs.smsReminders}
            onChange={(v) => update({ smsReminders: v })}
          />
        </Card>

        <Card>
          <h3 className="font-display text-lg mb-3">Caregiver</h3>
          <Toggle
            label="Allow a caregiver to see my weekly focus"
            checked={prefs.caregiverEnabled}
            onChange={(v) => update({ caregiverEnabled: v })}
          />
        </Card>

        <Card>
          <h3 className="font-display text-lg mb-3">Your details</h3>
          <label className="block mb-4">
            <span className="block text-sm font-semibold mb-1">Preferred name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => update({ patientName: name || 'Friend' })}
              className="w-full p-3 rounded-xl border"
              style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
            />
          </label>
          <label className="block mb-2">
            <span className="block text-sm font-semibold mb-1">
              Program start date (for demo)
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onBlur={() => update({ startDate })}
              className="w-full p-3 rounded-xl border"
              style={{ borderColor: 'rgba(122, 158, 122, 0.35)' }}
            />
            <span className="block text-xs mt-1" style={{ color: 'var(--color-ink-500)' }}>
              In production this is set by the clinic. Here, change the date to see
              how warnings appear at 30, 14, and 0 days remaining.
            </span>
          </label>
        </Card>
      </div>
    </div>
  )
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'rgba(122, 158, 122, 0.15)' }}>
      <span className="pr-4">{label}</span>
      <span className="relative inline-block">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <span
          className="block w-12 h-7 rounded-full transition-colors"
          style={{ backgroundColor: checked ? 'var(--color-sage-500)' : '#d6d6d6' }}
        >
          <span
            className="block w-5 h-5 bg-white rounded-full shadow transform transition-transform mt-1"
            style={{ transform: checked ? 'translateX(1.6rem)' : 'translateX(0.25rem)' }}
          />
        </span>
      </span>
    </label>
  )
}
