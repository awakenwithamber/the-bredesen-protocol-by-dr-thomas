import { ExternalLink, FileText, FolderOpen, Presentation, Link as LinkIcon } from 'lucide-react'

type DocKind = 'doc' | 'pdf' | 'slides' | 'folder' | 'link'

type ClinicDoc = {
  kind: DocKind
  title: string
  week: number
  href: string
}

type PhaseGroup = {
  number: number
  title: string
  items: ClinicDoc[]
}

const phaseDocs: PhaseGroup[] = [
  {
    number: 1,
    title: 'Foundation',
    items: [
      {
        kind: 'doc',
        title: 'Kitchen Reset Guide',
        week: 1,
        href: 'https://docs.google.com/document/d/1Yxs2WUawQ65k7CAheQlls9SFF84ASlCInvZqKcx-IO8',
      },
      {
        kind: 'pdf',
        title: 'Pantry Audit Checklist PDF',
        week: 1,
        href: 'https://drive.google.com/file/d/1Yk0UC2pMWYDoNW7_tbJk9S-Cq5kkDHzP',
      },
      {
        kind: 'doc',
        title: 'Phase 1 Program Document',
        week: 1,
        href: 'https://docs.google.com/document/d/1Q3IiNQqFtZmUK46DdQicSG-eZFm_G9VjyCFuU1ITFd8',
      },
      {
        kind: 'doc',
        title: 'Week 1 Brain Health Plan',
        week: 1,
        href: 'https://docs.google.com/document/d/1xKD54AM6rvajyZopOzzzzh1nJ8pUrGZiC9rvIcqvBW4',
      },
      {
        kind: 'pdf',
        title: 'Welcome Letter — Bredesen',
        week: 1,
        href: 'https://drive.google.com/file/d/104RirGYAGsz-IKjIjfusAmHzT0_gGnEn',
      },
      {
        kind: 'slides',
        title: 'Intro Slides — Bredesen Overview',
        week: 1,
        href: 'https://docs.google.com/presentation/d/1cJy-iwr7iYLojNl84JLKCSKZjiqs-8ZdBcqL5KH7h08',
      },
    ],
  },
  {
    number: 2,
    title: 'Sleep & Stress',
    items: [
      {
        kind: 'doc',
        title: 'Phase 2 Program Document',
        week: 4,
        href: 'https://docs.google.com/document/d/1vqhHHe2JrSmqByc_qAOf4Zf_FQQYV7yMq8b2ILJyaiY',
      },
    ],
  },
  {
    number: 3,
    title: 'Detoxification',
    items: [
      {
        kind: 'pdf',
        title: 'Phase 3 Detox Program',
        week: 9,
        href: 'https://drive.google.com/file/d/1C1-dggGtm_5Mlz2EQbnRL-4Q-APyZQVQ',
      },
      {
        kind: 'pdf',
        title: '24-Week Layout Overview',
        week: 9,
        href: 'https://drive.google.com/file/d/18yEc41YNz9yDxGMIjHNagHOzcM_x0s7E',
      },
    ],
  },
  {
    number: 5,
    title: 'Advanced Protocols',
    items: [
      {
        kind: 'link',
        title: 'Apollo Health Bredesen Overview',
        week: 16,
        href: 'https://www.apollohealthco.com/bredesen-protocol/',
      },
      {
        kind: 'folder',
        title: 'Program Modules Folder',
        week: 20,
        href: 'https://drive.google.com/drive/folders/1oUc8Y_y4yQzWKqTYPqJ3_RgAzYSXzWAe',
      },
      {
        kind: 'link',
        title: 'Dr. Dale Bredesen Profile',
        week: 20,
        href: 'https://www.pacificneuroscienceinstitute.org/brain-health/people/dale-bredesen/',
      },
    ],
  },
  {
    number: 6,
    title: 'Completion',
    items: [
      {
        kind: 'pdf',
        title: 'Program Completion Email',
        week: 24,
        href: 'https://drive.google.com/file/d/1XVBG8Wl6U66NGe0vk5l6SMFG_eTCYiJX',
      },
    ],
  },
]

const externalResources = [
  {
    title: 'Harvard: Foods That Fight Inflammation',
    href: 'https://www.health.harvard.edu/staying-healthy/foods-that-fight-inflammation',
  },
  {
    title: 'Cleveland Clinic: Brain-Healthy Foods',
    href: 'https://health.clevelandclinic.org/foods-for-brain-health/',
  },
  {
    title: "Alzheimer's Association: Brain Health",
    href: 'https://www.alz.org/help-support/brain_health',
  },
  {
    title: 'Harvard Healthy Sleep Guide',
    href: 'https://healthysleep.med.harvard.edu/',
  },
  {
    title: 'NHLBI Sleep Health',
    href: 'https://www.nhlbi.nih.gov/health/sleep',
  },
  {
    title: 'NIH Mind and Body Practices',
    href: 'https://www.nccih.nih.gov/health/mind-and-body-practices',
  },
  {
    title: 'NCCIH Relaxation Techniques',
    href: 'https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know',
  },
  {
    title: 'Go4Life Senior Fitness (NIH)',
    href: 'https://go4life.nia.nih.gov/',
  },
  {
    title: 'NIA Exercise & Physical Activity',
    href: 'https://www.nia.nih.gov/health/exercise-physical-activity',
  },
  {
    title: 'BrainHQ Brain Training',
    href: 'https://www.brainhq.com/',
  },
  {
    title: 'AARP Brain Games',
    href: 'https://games.aarp.org/category/brain-games',
  },
  {
    title: 'Memozor Memory Games',
    href: 'https://www.memozor.com/',
  },
]

const phaseColors: Record<number, string> = {
  1: 'var(--sage-600)',
  2: 'var(--teal-700)',
  3: 'var(--sand-700)',
  4: '#7d6398',
  5: 'var(--sand-500)',
  6: 'var(--sage-800)',
}

function iconFor(kind: DocKind) {
  switch (kind) {
    case 'pdf':
    case 'doc':
      return FileText
    case 'slides':
      return Presentation
    case 'folder':
      return FolderOpen
    case 'link':
    default:
      return LinkIcon
  }
}

export function ClinicDocuments() {
  return (
    <section className="mb-8" aria-label="Clinic documents by phase">
      <h2
        className="font-display mb-4"
        style={{
          fontSize: '1.5rem',
          color: 'var(--ink-900)',
          lineHeight: 1.2,
        }}
      >
        Clinic Documents by Phase
      </h2>

      <div className="space-y-5">
        {phaseDocs.map((phase) => (
          <div
            key={phase.number}
            className="rounded-2xl p-4 sm:p-5"
            style={{
              background: 'white',
              border: '1px solid var(--sage-200)',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="rounded-full font-semibold flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  background: phaseColors[phase.number],
                  color: 'white',
                  fontSize: '0.85rem',
                }}
                aria-hidden
              >
                P{phase.number}
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: '1.15rem',
                  color: 'var(--ink-900)',
                  lineHeight: 1.2,
                }}
              >
                Phase {phase.number} — {phase.title}
              </h3>
            </div>

            <ul className="space-y-2 list-none p-0 m-0">
              {phase.items.map((item) => {
                const Icon = iconFor(item.kind)
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl p-3"
                      style={{
                        background: 'var(--cream-soft)',
                        border: '1px solid var(--sage-200)',
                        minHeight: 56,
                        textDecoration: 'none',
                        color: 'var(--ink-900)',
                      }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center shrink-0"
                        style={{
                          width: 36,
                          height: 36,
                          background: 'var(--sage-100)',
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: 'var(--sage-800)' }}
                          aria-hidden
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            lineHeight: 1.3,
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontSize: '0.85rem',
                            color: 'var(--ink-500)',
                            marginTop: 2,
                          }}
                        >
                          Week {item.week}
                        </div>
                      </div>
                      <ExternalLink
                        className="w-4 h-4 shrink-0"
                        style={{ color: 'var(--ink-500)' }}
                        aria-hidden
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ExternalResources() {
  return (
    <section className="mb-8" aria-label="Trusted external resources">
      <h2
        className="font-display mb-3"
        style={{
          fontSize: '1.4rem',
          color: 'var(--ink-900)',
          lineHeight: 1.2,
        }}
      >
        Trusted External Resources
      </h2>
      <p
        className="mb-4"
        style={{
          color: 'var(--ink-700)',
          fontSize: '1rem',
          lineHeight: 1.5,
        }}
      >
        Vetted external links for nutrition, sleep, movement, and brain games.
      </p>
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none p-0 m-0"
      >
        {externalResources.map((r) => (
          <li key={r.href}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl p-3"
              style={{
                background: 'white',
                border: '1px solid var(--sage-200)',
                minHeight: 56,
                textDecoration: 'none',
                color: 'var(--ink-900)',
              }}
            >
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  background: 'var(--teal-100)',
                }}
              >
                <LinkIcon
                  className="w-3.5 h-3.5"
                  style={{ color: 'var(--teal-700)' }}
                  aria-hidden
                />
              </div>
              <div
                className="flex-1 min-w-0"
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.35,
                  fontWeight: 500,
                }}
              >
                {r.title}
              </div>
              <ExternalLink
                className="w-4 h-4 shrink-0"
                style={{ color: 'var(--ink-500)' }}
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
