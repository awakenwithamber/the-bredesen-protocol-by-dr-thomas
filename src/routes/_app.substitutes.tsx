import { createFileRoute } from '@tanstack/react-router'
  import { SectionHeading, Card } from '@/components/ui'
  import { Leaf, Droplet, CheckCircle } from 'lucide-react'

  export const Route = createFileRoute('/_app/substitutes')({
    component: SubstitutesPage,
  })

  const sugarSubs = [
    { name: 'Raw Local Honey', note: 'Use sparingly. Rich in antioxidants. Best drizzled — not baked at high heat.' },
    { name: 'Pure Maple Syrup', note: 'Small amounts only (Grade A dark). Has trace minerals. Great on oatmeal.' },
    { name: 'Medjool Dates', note: 'Blend into smoothies or energy bites. Naturally sweet with fiber that slows sugar absorption.' },
    { name: 'Monk Fruit Sweetener', note: 'Zero glycemic impact. Use 1:1 in most recipes. No bitter aftertaste — excellent for baking.' },
    { name: 'Stevia Leaf', note: 'Use green stevia powder (not white/processed). A tiny pinch goes a long way.' },
    { name: 'Mashed Ripe Banana', note: 'In baking, replace 3/4 cup sugar with 1 ripe banana. Adds potassium too.' },
  ]

  const glutenSubs = [
    { name: 'Almond Flour', note: 'Best for muffins, pancakes, and cookies. Use 1:1 for most recipes. Moist and rich.' },
    { name: 'Coconut Flour', note: 'Very absorbent — use 1/4 the amount of regular flour. Always add extra eggs to bind.' },
    { name: 'Cassava Flour', note: 'Closest feel to all-purpose flour. Best for tortillas, flatbreads, and biscuits.' },
    { name: 'Certified GF Oat Flour', note: 'Buy certified gluten-free oats. Blend rolled oats yourself. Mild flavor.' },
    { name: 'Rice Flour', note: 'Light and neutral. Great for breading or thickening soups and gravies.' },
    { name: 'Arrowroot Powder', note: 'Perfect thickener for soups and sauces. Use half the amount you would use for cornstarch.' },
  ]

  const oilSubs = [
    { name: 'Extra Virgin Olive Oil', note: 'Best for salad dressings, low-heat cooking, and drizzling. Deeply anti-inflammatory.' },
    { name: 'Avocado Oil', note: 'High smoke point — safe for sauteing, roasting, and stir-fry. Mild, neutral taste.' },
    { name: 'Coconut Oil', note: 'Medium-chain fats that feed the brain directly. Great for baking and medium-heat cooking.' },
    { name: 'Ghee (Clarified Butter)', note: 'Lactose-free, high smoke point. Wonderful for high-heat cooking and rich flavor.' },
    { name: 'Walnut Oil', note: 'Rich in omega-3 fatty acids. Always use cold — drizzle on salads or roasted vegetables.' },
    { name: 'Toasted Sesame Oil', note: 'Use as a finishing drizzle, not for frying. A small amount adds big, warm flavor.' },
  ]

  function SubSection({ icon: Icon, title, subtitle, accentColor, items }: {
    icon: any; title: string; subtitle: string; accentColor: string; items: { name: string; note: string }[]
  }) {
    return (
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-5 h-5" style={{ color: accentColor }} />
          <h2 className="font-display text-xl" style={{ color: 'var(--ink-900)' }}>{title}</h2>
        </div>
        <p className="mb-4 text-sm" style={{ color: 'var(--ink-500)' }}>{subtitle}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map((item) => (
            <div key={item.name} className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid var(--sage-200)' }}>
              <div className="font-display text-base mb-1" style={{ color: 'var(--ink-900)' }}>{item.name}</div>
              <p className="text-sm" style={{ color: 'var(--ink-600)', lineHeight: 1.6 }}>{item.note}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  function SubstitutesPage() {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <SectionHeading
          eyebrow="Food Substitutes"
          title="Sugar, Gluten & Oil Substitutes"
          description="Simple, brain-friendly swaps for everyday cooking. You do not have to change everything at once — try one new swap each week."
        />
        <Card variant="sage" className="mt-4 mb-8">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--sage-600)' }} />
            <p style={{ color: 'var(--ink-900)', lineHeight: 1.65 }}>
              <strong>Dr. Thomas's tip:</strong> Start with just one substitute from each section this week.
              Small changes are lasting changes. Your brain benefits from every good swap — even the tiny ones.
            </p>
          </div>
        </Card>
        <SubSection icon={Leaf} title="Sugar Substitutes"
          subtitle="Replace refined white sugar with one of these gentler, lower-glycemic options."
          accentColor="var(--sage-600)" items={sugarSubs} />
        <SubSection icon={Leaf} title="Gluten-Free Flour Substitutes"
          subtitle="Wheat flour can trigger inflammation. These alternatives are delicious and easy to use."
          accentColor="var(--sand-600)" items={glutenSubs} />
        <SubSection icon={Droplet} title="Healthy Oil Substitutes"
          subtitle="Replace canola, vegetable, or soybean oils with these brain-friendly fats."
          accentColor="var(--sage-600)" items={oilSubs} />
        <Card variant="warm" className="mt-2">
          <p style={{ color: 'var(--ink-900)', lineHeight: 1.65 }}>
            <strong>Remember:</strong> Progress, not perfection. Even swapping vegetable oil
            for avocado oil is a real, meaningful step for your brain health. You are doing wonderfully.
          </p>
        </Card>
      </div>
    )
  }
  