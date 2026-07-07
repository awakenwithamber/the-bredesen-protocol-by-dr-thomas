import { createFileRoute } from '@tanstack/react-router'
  import { SectionHeading, Card } from '@/components/ui'
  import { Leaf, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react'

  export const Route = createFileRoute('/_app/hemp')({
    component: HempPage,
  })

  const faqs = [
    {
      q: 'What is the difference between hemp and marijuana?',
      a: 'Hemp and marijuana are both cannabis plants, but hemp contains almost no THC — the compound that causes a "high." Hemp products are legal everywhere and will not affect your thinking or judgment.',
    },
    {
      q: 'What is CBD?',
      a: 'CBD (cannabidiol) is a natural compound found in hemp. It does not make you high. Research suggests it may help reduce brain inflammation, support sleep, ease anxiety, and protect nerve cells.',
    },
    {
      q: 'How might CBD help with brain health?',
      a: "CBD interacts with your body's endocannabinoid system — a natural network that helps regulate inflammation, stress, sleep, and mood. Reducing brain inflammation is a central goal of the Bredesen Protocol.",
    },
    {
      q: 'Is CBD safe for me to take?',
      a: 'CBD is generally well tolerated. The most common side effects are mild drowsiness or dry mouth. Always start with a very low dose and talk to Dr. Thomas before starting — especially if you take blood thinners or seizure medications.',
    },
    {
      q: 'Will it show up on a drug test?',
      a: 'A pure CBD isolate product will not. However, full-spectrum products contain trace THC that could appear on a very sensitive test. If this matters to you, choose "broad-spectrum" or "CBD isolate" labeled products.',
    },
    {
      q: 'Do I have to use hemp products for this program?',
      a: 'No — hemp and CBD are completely optional. They are one tool that some patients find helpful for sleep and anxiety. The core Bredesen Protocol does not require them.',
    },
  ]

  const whatToLook = [
    'Third-party lab tested — look for a "Certificate of Analysis" (COA) on the website',
    'Organic hemp grown in the USA',
    'Full-spectrum or broad-spectrum (usually more beneficial than isolate alone)',
    'No artificial additives, fillers, or artificial sweeteners',
    'Clear CBD milligram (mg) content listed per serving on the label',
  ]

  const howToStart = [
    { step: '1. Start very low', detail: 'Begin with 5–10 mg of CBD per day. With CBD, less is often more — especially when starting out.' },
    { step: '2. Choose your form', detail: 'Oil/tincture (placed under the tongue) absorbs the fastest. Capsules are more convenient. Gummies are easiest but take longer to work.' },
    { step: '3. Be consistent', detail: 'CBD works best when taken daily at the same time, not just occasionally. Give it 2–4 weeks before judging results.' },
    { step: '4. Time it right', detail: 'At night supports sleep. In the morning supports daytime calm. Try what feels right for your body.' },
    { step: '5. Adjust slowly', detail: "If you notice no difference after 2 weeks, increase by 5 mg. Always increase slowly. If you notice side effects, decrease or stop and call Dr. Thomas." },
  ]

  function HempPage() {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <SectionHeading
          eyebrow="Hemp & CBD"
          title="Hemp, CBD & Brain Health"
          description="A calm, clear guide from Dr. Thomas on how hemp products may support your brain during the Bredesen Protocol."
        />

        <Card variant="sage" className="mt-4 mb-8">
          <div className="flex items-start gap-3">
            <Leaf className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--sage-700)' }} />
            <p style={{ color: 'var(--ink-900)', lineHeight: 1.65 }}>
              <strong>From Dr. Thomas:</strong> Hemp and CBD are not required for this program.
              They are an optional tool that some patients find genuinely helpful for sleep, anxiety,
              and brain inflammation. As with anything new, please talk with your care team before starting.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <h2 className="font-display text-xl mb-4" style={{ color: 'var(--ink-900)' }}>
          Common questions
        </h2>
        <div className="space-y-3 mb-10">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl p-4"
              style={{ background: 'white', border: '1px solid var(--sage-200)' }}
            >
              <div className="flex items-start gap-2 mb-2">
                <HelpCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--sage-500)' }} />
                <div className="font-display text-base" style={{ color: 'var(--ink-900)' }}>
                  {faq.q}
                </div>
              </div>
              <p
                className="text-sm pl-6"
                style={{ color: 'var(--ink-600)', lineHeight: 1.65 }}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* What to look for */}
        <h2 className="font-display text-xl mb-3" style={{ color: 'var(--ink-900)' }}>
          What to look for when buying
        </h2>
        <Card variant="sage" className="mb-8">
          <ul className="space-y-2.5">
            {whatToLook.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: 'var(--sage-600)' }}
                />
                <span style={{ color: 'var(--ink-900)', fontSize: '0.95rem', lineHeight: 1.55 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* How to start */}
        <h2 className="font-display text-xl mb-4" style={{ color: 'var(--ink-900)' }}>
          How to start (if you choose to)
        </h2>
        <div className="space-y-4 mb-8">
          {howToStart.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl p-4"
              style={{ background: 'white', border: '1px solid var(--sage-200)' }}
            >
              <div className="font-display text-base mb-1" style={{ color: 'var(--sage-800)' }}>
                {item.step}
              </div>
              <p className="text-sm" style={{ color: 'var(--ink-600)', lineHeight: 1.6 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Safety note */}
        <Card variant="warm">
          <div className="flex items-start gap-3">
            <AlertCircle
              className="w-5 h-5 mt-0.5 shrink-0"
              style={{ color: 'var(--sand-700)' }}
            />
            <p style={{ color: 'var(--ink-900)', lineHeight: 1.65, fontSize: '0.95rem' }}>
              <strong>Important safety note:</strong> Always let Dr. Thomas and your other doctors know
              you are using CBD, especially if you take any prescription medications.
              CBD can interact with blood thinners, some antidepressants, and anti-seizure medications.
              Call the clinic at{' '}
              <a href="tel:+18012665559" style={{ color: 'var(--sage-700)' }}>
                (801) 266-5559
              </a>{' '}
              with any questions.
            </p>
          </div>
        </Card>
      </div>
    )
  }
  