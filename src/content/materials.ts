/**
 * External program materials
 * --------------------------
 * Curated, optional, *supplemental* references to videos, articles, and
 * handouts. The patient path is never required to leave the workbook —
 * every Bredesen phase document has been rebuilt as a built-in lesson
 * (see `src/content/phaseLessons.ts` and the `/phases` and
 * `/start-here` routes). External links here:
 *
 *  - are clearly labeled "supplemental"
 *  - carry a `lastVerified` date so old/expiring links can be retired
 *  - point to a built-in route via `builtinPath` whenever a built-in
 *    version of the same content exists
 *
 * Drive-only handouts (which were the broken-link complaints) now point
 * at the built-in lessons rather than the Drive PDFs.
 */

export type Material = {
  id: string
  title: string
  kind: 'video' | 'article' | 'pdf' | 'handout' | 'worksheet' | 'slides' | 'lesson'
  source: string
  url: string
  description: string
  /** Estimated time in minutes. */
  minutes?: number
  /** External sources open in new tab. */
  external?: boolean
  /**
   * If set, prefer the in-portal route over the external URL. The Today
   * page will surface this as the primary action and treat the external
   * link as supplemental.
   */
  builtinPath?: string
  /** ISO date the link was last verified to load successfully. */
  lastVerified?: string
  /** True if this is an extra resource, not a required step. */
  supplemental?: boolean
}

const LV = '2026-04-25'

export const MATERIALS = {
  // -------- Built-in lessons (preferred) --------
  welcomeVideo: {
    id: 'welcome-video',
    title: 'Welcome to the Bredesen Program',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/start-here',
    description:
      'A warm welcome you can read here in the workbook. No download, no link to chase — just open the page.',
    minutes: 4,
    external: false,
    builtinPath: '/start-here',
    lastVerified: LV,
  },
  pantryAudit: {
    id: 'pantry-audit',
    title: 'Pantry Audit Worksheet',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/pantry-audit',
    description:
      'A built-in Keep / Replace / Remove worksheet. Walk one shelf at a time, no PDF needed.',
    minutes: 12,
    external: false,
    builtinPath: '/phases/pantry-audit',
    lastVerified: LV,
  },
  kitchenReset: {
    id: 'kitchen-reset',
    title: 'Kitchen Reset Lesson',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/kitchen-reset',
    description:
      'The full Kitchen Reset, in plain language, inside your workbook. No external file required.',
    minutes: 8,
    external: false,
    builtinPath: '/phases/kitchen-reset',
    lastVerified: LV,
  },
  toxicLoadEbook: {
    id: 'toxic-load-ebook',
    title: 'Microplastics & Toxin Reduction',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/making-meals-without-microplastics',
    description:
      'A built-in lesson on plastics, water, fragrance, and air — written for your workbook.',
    minutes: 10,
    external: false,
    builtinPath: '/phases/making-meals-without-microplastics',
    lastVerified: LV,
  },
  phase1Guide: {
    id: 'phase-1-guide',
    title: 'Phase 1 — Foundations & Baseline',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/phase-1-overview',
    description:
      'Phase 1 in your workbook: baseline trackers, kitchen reset, healthy brain foods, gentle movement. No PDF.',
    minutes: 10,
    external: false,
    builtinPath: '/phases/phase-1-overview',
    lastVerified: LV,
  },
  phase2Guide: {
    id: 'phase-2-guide',
    title: 'Phase 2 — Understanding Your Signals',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/phase-2-overview',
    description:
      'Phase 2 in your workbook: blood-sugar habits, cooking oils, supplement safety, nervous-system care.',
    minutes: 10,
    external: false,
    builtinPath: '/phases/phase-2-overview',
    lastVerified: LV,
  },
  phase3Guide: {
    id: 'phase-3-guide',
    title: 'Phase 3 — Deeper Habit Building',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/phase-3-overview',
    description:
      'Phase 3 in your workbook: movement progression, sleep consistency, brain games, troubleshooting.',
    minutes: 12,
    external: false,
    builtinPath: '/phases/phase-3-overview',
    lastVerified: LV,
  },
  phase4Guide: {
    id: 'phase-4-guide',
    title: 'Phase 4 — Integration',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/phase-4-overview',
    description:
      'Phase 4 in your workbook: what to continue, adjust, celebrate, and bring to Dr. Thomas.',
    minutes: 10,
    external: false,
    builtinPath: '/phases/phase-4-overview',
    lastVerified: LV,
  },
  howToStartYourDay: {
    id: 'how-to-start-your-day',
    title: 'How to Start Your Day',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/first-day',
    description:
      'A short, brain-friendly morning, built into the workbook. No slide download needed.',
    minutes: 5,
    external: false,
    builtinPath: '/phases/first-day',
    lastVerified: LV,
  },
  ketoflexModules: {
    id: 'ketoflex-modules',
    title: 'Healthy Brain Foods',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/healthy-brain-foods',
    description:
      'The Bredesen approach to plant-rich, blood-sugar-friendly eating, written into the workbook.',
    minutes: 8,
    external: false,
    builtinPath: '/phases/healthy-brain-foods',
    lastVerified: LV,
  },
  ketoflexRecipes: {
    id: 'ketoflex-recipes',
    title: 'Phase 1 Recipe Cards',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/phase-1-recipes',
    description:
      'Three brain-friendly starter recipes built into the workbook, plus the full recipe library.',
    minutes: 6,
    external: false,
    builtinPath: '/phases/phase-1-recipes',
    lastVerified: LV,
  },
  histamineAllergies: {
    id: 'histamine-allergies',
    title: 'Symptoms as Clues',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/symptoms-as-clues',
    description:
      'How to read your symptoms — including allergies and inflammation — as patterns, not problems.',
    minutes: 5,
    external: false,
    builtinPath: '/phases/symptoms-as-clues',
    lastVerified: LV,
  },
  module2: {
    id: 'module-2',
    title: 'Kitchen & Food Reset (Module 2)',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/keep-replace-remove',
    description:
      'The Keep / Replace / Remove tables built into the workbook — no Drive folder to chase.',
    external: false,
    builtinPath: '/phases/keep-replace-remove',
    lastVerified: LV,
  },
  module3: {
    id: 'module-3',
    title: 'Blood Sugar Stability (Module 3)',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/blood-sugar-stability',
    description:
      'Simple steps to control blood sugar — built into the workbook, no PDF.',
    external: false,
    builtinPath: '/phases/blood-sugar-stability',
    lastVerified: LV,
  },
  module4: {
    id: 'module-4',
    title: 'Detox & Drainage (Module 4)',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/month-4',
    description:
      'A built-in walkthrough of microplastics, water, fragrance, and air swaps.',
    external: false,
    builtinPath: '/phases/month-4',
    lastVerified: LV,
  },
  module5: {
    id: 'module-5',
    title: 'Nervous System & Resilience (Module 5)',
    kind: 'lesson',
    source: 'Built-in workbook',
    url: '/phases/nervous-system-regulation',
    description:
      'Built-in nervous-system care — extended exhales, humming, grounding.',
    external: false,
    builtinPath: '/phases/nervous-system-regulation',
    lastVerified: LV,
  },

  // -------- Verified external sources (supplemental only) --------
  bredesenBrainHealthTalk: {
    id: 'bredesen-brain-health-talk',
    title: 'Dr. Dale Bredesen — Reversing Cognitive Decline (TEDx)',
    kind: 'video',
    source: 'TEDx Talks · YouTube',
    url: 'https://www.youtube.com/watch?v=R4WPEQwjBBM',
    description:
      'A reputable, public TEDx talk from Dr. Bredesen. Optional supplemental viewing.',
    minutes: 18,
    external: true,
    supplemental: true,
    lastVerified: LV,
  },
  functionalMedicineIntro: {
    id: 'functional-medicine-intro',
    title: 'What Is Functional Medicine?',
    kind: 'article',
    source: 'Institute for Functional Medicine',
    url: 'https://www.ifm.org/functional-medicine/what-is-functional-medicine/',
    description: 'A plain-language introduction to the medicine model this program is built on.',
    minutes: 6,
    external: true,
    supplemental: true,
    lastVerified: LV,
  },
  rootCauseMedicine: {
    id: 'root-cause-medicine',
    title: 'Root Cause Medicine',
    kind: 'article',
    source: 'Institute for Functional Medicine',
    url: 'https://www.ifm.org/',
    description: 'Why we look beyond symptoms — a short, hopeful read.',
    minutes: 7,
    external: true,
    supplemental: true,
    lastVerified: LV,
  },
  mindBodyPractices: {
    id: 'mind-body-practices',
    title: 'Mind and Body Practices',
    kind: 'article',
    source: 'NIH · NCCIH',
    url: 'https://www.nccih.nih.gov/health/mind-and-body-practices',
    description: 'Research-backed overview of breathwork, tai chi, yoga, and more.',
    minutes: 10,
    external: true,
    supplemental: true,
    lastVerified: LV,
  },
  labTestsOnline: {
    id: 'lab-tests-online',
    title: 'Understanding Your Lab Tests',
    kind: 'article',
    source: 'Testing.com (formerly Lab Tests Online)',
    url: 'https://www.testing.com/tests/',
    description: 'A friendly encyclopedia. Look up any lab your clinic has ordered.',
    external: true,
    supplemental: true,
    lastVerified: LV,
  },
  understandingSymptoms: {
    id: 'understanding-symptoms',
    title: 'Symptoms — Cleveland Clinic',
    kind: 'article',
    source: 'Cleveland Clinic',
    url: 'https://my.clevelandclinic.org/health/symptoms',
    description: 'Listening to symptoms without panic — a grounded read.',
    minutes: 6,
    external: true,
    supplemental: true,
    lastVerified: LV,
  },
  foodsThatFightInflammation: {
    id: 'foods-fight-inflammation',
    title: 'Foods That Fight Inflammation',
    kind: 'article',
    source: 'Harvard Health',
    url: 'https://www.health.harvard.edu/staying-healthy/foods-that-fight-inflammation',
    description: 'A practical grocery list disguised as a kind article.',
    minutes: 8,
    external: true,
    supplemental: true,
    lastVerified: LV,
  },
  supplementFactSheets: {
    id: 'supplement-fact-sheets',
    title: 'Dietary Supplement Fact Sheets',
    kind: 'article',
    source: 'NIH · ODS',
    url: 'https://ods.od.nih.gov/factsheets/list-all/',
    description: 'Trustworthy reference for anything the clinic recommends.',
    external: true,
    supplemental: true,
    lastVerified: LV,
  },
  detoxesAndCleanses: {
    id: 'detoxes-cleanses',
    title: 'Detoxes and Cleanses — What the Science Says',
    kind: 'article',
    source: 'NIH · NCCIH',
    url: 'https://www.nccih.nih.gov/health/detoxes-and-cleanses-what-you-need-to-know',
    description: 'A calm, accurate look at detox claims — how to know what is safe.',
    minutes: 7,
    external: true,
    supplemental: true,
    lastVerified: LV,
  },
  stressAndNervousSystem: {
    id: 'stress-nervous-system',
    title: 'Understanding the Stress Response',
    kind: 'article',
    source: 'Harvard Health',
    url: 'https://www.health.harvard.edu/staying-healthy/understanding-the-stress-response',
    description: 'A gentle primer — and one small practice you can try today.',
    minutes: 9,
    external: true,
    supplemental: true,
    lastVerified: LV,
  },
} satisfies Record<string, Material>

export type MaterialKey = keyof typeof MATERIALS

export function getMaterial(key: MaterialKey): Material {
  return MATERIALS[key]
}
