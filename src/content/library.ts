/**
 * Resource Library
 * ----------------
 * A unified catalog of every educational resource the Bredesen Protocol
 * clinic surfaces to patients: videos, articles, handouts, guides,
 * grocery lists, caregiver tools, brain games, recipes as references,
 * and printables.
 *
 * The goal is a single schema so that:
 *   - The Resources page can render every resource with one card component
 *   - The Daily Resource engine can pick one resource per day from this list
 *   - Each resource can be anchored to a week / phase / goal so content
 *     shows up at the right moment in the 24-week program
 *   - Admins can approve Drive-synced files (stored in Netlify Blobs) and
 *     have them appear alongside these curated entries using the same
 *     shape.
 *
 * Drive-synced resources are stored in the "resources" Netlify Blobs
 * store under the same `Resource` shape with `source: 'drive'` and an
 * `approved` flag. The /resources page merges both sources.
 */

export type ResourceType =
  | 'video'
  | 'article'
  | 'handout'
  | 'guide'
  | 'checklist'
  | 'worksheet'
  | 'tracker'
  | 'grocery-list'
  | 'recipe'
  | 'caregiver-tool'
  | 'brain-game'
  | 'printable'

export type ResourceCategory =
  | 'start-here'
  | 'bredesen-basics'
  | 'brain-health'
  | 'sleep'
  | 'nutrition'
  | 'blood-sugar'
  | 'detox'
  | 'movement'
  | 'stress'
  | 'cognition'
  | 'recipes'
  | 'grocery'
  | 'caregiver'
  | 'pantry'
  | 'supplements'
  | 'journaling'
  | 'printables'

export type Resource = {
  id: string
  title: string
  type: ResourceType
  category: ResourceCategory
  summary: string
  /** One-line "why this matters today" the patient sees on the card */
  whyItMatters: string
  /** Estimated read/watch/do time in minutes. 0 for "reference" items. */
  estMinutes: number
  beginnerFriendly: boolean
  caregiverFriendly: boolean
  printable: boolean
  /** Week numbers (1-24) this resource is most relevant for */
  weeks: number[]
  /** Phase numbers (1-6) this resource supports */
  phases: number[]
  /** Free-form tags used by search/filter chips */
  tags: string[]
  /** External URL, internal route, or blob key for the underlying asset */
  href?: string
  /** Longer body for in-portal articles; markdown-ish plain text */
  body?: string
  /** When origin is Drive, set to 'drive' and include driveFileId */
  source: 'curated' | 'drive' | 'public'
  driveFileId?: string
  /** Admins can feature resources so they rise to the top of the library */
  featured?: boolean
}

// ---------------------------------------------------------------------------
// VIDEOS
// ---------------------------------------------------------------------------

export const videoResources: Resource[] = [
  {
    id: 'video-welcome',
    title: 'Welcome to Your 6-Month Program',
    type: 'video',
    category: 'start-here',
    summary: 'A short welcome from the clinic team.',
    whyItMatters: 'Start here. A gentle orientation to the workbook.',
    estMinutes: 3,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [1],
    phases: [1],
    tags: ['start here', 'quick watch'],
    source: 'curated',
    featured: true,
  },
  {
    id: 'video-bredesen-causes',
    title: 'Dr. Dale Bredesen — What Causes Cognitive Decline?',
    type: 'video',
    category: 'bredesen-basics',
    summary: 'An overview of the many contributors to cognitive change and why they matter.',
    whyItMatters: 'Understand the "why" behind every step of the workbook.',
    estMinutes: 12,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [1, 2],
    phases: [1],
    tags: ['best for beginners', 'bredesen'],
    source: 'curated',
  },
  {
    id: 'video-brain-healthy-grocery-tour',
    title: 'Brain Healthy Grocery Tour',
    type: 'video',
    category: 'nutrition',
    summary: 'A short walkthrough of the brain-supportive aisles of the grocery store.',
    whyItMatters: 'Know what to put in your cart before you go.',
    estMinutes: 8,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [2, 3, 6],
    phases: [1, 2],
    tags: ['food', 'shopping'],
    source: 'curated',
  },
  {
    id: 'video-chair-exercise',
    title: '5-Minute Chair Exercise',
    type: 'video',
    category: 'movement',
    summary: 'A gentle seated movement routine you can do anywhere.',
    whyItMatters: 'Movement is medicine. Five minutes counts.',
    estMinutes: 5,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [3, 7, 13, 14],
    phases: [1, 2, 4],
    tags: ['easy', 'seated', 'quick'],
    source: 'curated',
  },
  {
    id: 'video-walking-after-meals',
    title: 'Walking After Meals — Why 10 Minutes Matters',
    type: 'video',
    category: 'blood-sugar',
    summary: 'How a short post-meal walk steadies blood sugar and supports the brain.',
    whyItMatters: 'One small habit with outsized benefit.',
    estMinutes: 4,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [3, 5, 6],
    phases: [1, 2],
    tags: ['blood sugar', 'quick'],
    source: 'curated',
  },
  {
    id: 'video-better-sleep-tonight',
    title: 'Better Sleep Tonight — 5 Simple Moves',
    type: 'video',
    category: 'sleep',
    summary: 'Five small choices you can make before bed to protect deep sleep.',
    whyItMatters: 'Deep sleep is when the brain cleans itself.',
    estMinutes: 6,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [2, 7],
    phases: [1, 2],
    tags: ['sleep', 'evening'],
    source: 'curated',
  },
  {
    id: 'video-calming-breath',
    title: 'Calm Breathing for Stress',
    type: 'video',
    category: 'stress',
    summary: 'A 3-minute extended-exhale breath practice you can do sitting or lying down.',
    whyItMatters: 'Calm nervous system = clearer thinking.',
    estMinutes: 3,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [4, 8, 13, 15],
    phases: [1, 2, 4],
    tags: ['breathwork', 'quick'],
    source: 'curated',
  },
  {
    id: 'video-cooking-brain-dinner',
    title: 'Cooking a Brain-Healthy Dinner in 20 Minutes',
    type: 'video',
    category: 'recipes',
    summary: 'A short cooking tutorial for a simple weeknight brain-healthy meal.',
    whyItMatters: 'One dinner you already know how to cook.',
    estMinutes: 10,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [5, 6, 10],
    phases: [2, 3],
    tags: ['cooking', 'dinner'],
    source: 'curated',
  },
  {
    id: 'video-caregiver-welcome',
    title: 'Welcome — For Caregivers',
    type: 'video',
    category: 'caregiver',
    summary: 'A warm welcome for caregivers supporting a loved one in the program.',
    whyItMatters: 'You matter too. Start here.',
    estMinutes: 4,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [1],
    phases: [1],
    tags: ['caregiver', 'start here'],
    source: 'curated',
  },
]

// ---------------------------------------------------------------------------
// ARTICLES
// ---------------------------------------------------------------------------

export const articleResources: Resource[] = [
  {
    id: 'article-brain-health-nutrition',
    title: 'Brain Health Nutrition — The Simple Version',
    type: 'article',
    category: 'nutrition',
    summary: 'What to eat most days, in plain language.',
    whyItMatters: 'You don\'t need a complicated diet. You need a pattern.',
    estMinutes: 5,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [2, 3, 5, 6],
    phases: [1, 2],
    tags: ['food', 'beginner'],
    source: 'curated',
    body:
      'Brain-healthy eating is not a diet you start on Monday. It is a pattern you build. ' +
      'Most plates have color from vegetables, a palm of protein, and a fat your body recognises: ' +
      'olive oil, avocado, nuts, or fish. Blood sugar stays steady when meals start with fiber and ' +
      'protein, and when water is on the table before coffee. Sugar, ultra-processed snacks, and ' +
      'seed oils are the foods to quietly reduce — not to banish, not to obsess over.\n\n' +
      'Key takeaway: color, protein, fat, water. Repeat most days.',
  },
  {
    id: 'article-sleep-and-cognition',
    title: 'Sleep and the Brain',
    type: 'article',
    category: 'sleep',
    summary: 'Why deep sleep matters for cognition, and three small changes that protect it.',
    whyItMatters: 'The brain cleans itself at night. Protect that.',
    estMinutes: 4,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [2, 7],
    phases: [1, 2],
    tags: ['sleep'],
    source: 'curated',
    body:
      'Deep sleep is when the brain flushes metabolic waste through its glymphatic system. When ' +
      'we chronically shortchange sleep, that cleanup slows. Three small choices protect deep sleep: ' +
      'a dark room, a consistent wake time, and no heavy meals within three hours of bed.\n\n' +
      'Key takeaway: same wake time + dark room + light dinner = a better brain by morning.',
  },
  {
    id: 'article-blood-sugar-brain',
    title: 'Blood Sugar and the Brain',
    type: 'article',
    category: 'blood-sugar',
    summary: 'Why steady blood sugar is brain medicine.',
    whyItMatters: 'Steady blood sugar is steady thinking.',
    estMinutes: 4,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [3, 5, 6],
    phases: [1, 2],
    tags: ['blood sugar', 'food'],
    source: 'curated',
    body:
      'Blood sugar spikes and crashes are hard on the brain over time. Three habits that smooth ' +
      'the curve: eat protein first, include fiber in every meal, and walk for ten minutes after ' +
      'eating.\n\nKey takeaway: protein first + fiber always + a short walk after meals.',
  },
  {
    id: 'article-movement-neuroplasticity',
    title: 'Movement and Neuroplasticity',
    type: 'article',
    category: 'movement',
    summary: 'How daily movement keeps the brain learning.',
    whyItMatters: 'Movement grows the brain at every age.',
    estMinutes: 4,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [13, 14, 15],
    phases: [4],
    tags: ['movement', 'cognition'],
    source: 'curated',
    body:
      'Movement releases BDNF, a protein that supports new neural connections. You do not need ' +
      'a gym. A daily 20-minute walk, some light strength, and a few minutes of balance work is ' +
      'enough.\n\nKey takeaway: walk most days, strength twice a week, balance for one minute daily.',
  },
  {
    id: 'article-detox-basics',
    title: 'Gentle Detox — The Basics',
    type: 'article',
    category: 'detox',
    summary: 'A realistic, low-drama introduction to reducing your household toxin load.',
    whyItMatters: 'Less input = less for your body to clean up.',
    estMinutes: 5,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [9, 10, 11],
    phases: [3],
    tags: ['detox', 'home'],
    source: 'curated',
    body:
      'Detox is not a cleanse. It is a set of quiet swaps you make over time: fragrance-free ' +
      'laundry, a filtered water pitcher, glass storage, open windows, and fewer plastics in the ' +
      'kitchen.\n\nKey takeaway: reduce the inputs and your liver does the rest.',
  },
  {
    id: 'article-caregiver-support',
    title: 'A Note for Caregivers',
    type: 'article',
    category: 'caregiver',
    summary: 'Three gentle principles for supporting someone without taking over.',
    whyItMatters: 'Your presence is the treatment.',
    estMinutes: 3,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [1, 4, 8, 12],
    phases: [1, 2, 3],
    tags: ['caregiver'],
    source: 'curated',
    body:
      'You cannot do the program for them. You can show up, sit beside them, and mark one thing ' +
      'done together. That is the whole job. Protect your rest. Ask questions instead of giving ' +
      'reminders.\n\nKey takeaway: presence, not pressure.',
  },
  {
    id: 'article-memory-habits',
    title: 'Daily Habits That Support Memory',
    type: 'article',
    category: 'cognition',
    summary: 'Five habits the brain thanks you for.',
    whyItMatters: 'Small habits, stacked daily, protect memory.',
    estMinutes: 4,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [1, 5, 13, 17],
    phases: [1, 2, 4, 5],
    tags: ['cognition', 'habits'],
    source: 'curated',
    body:
      '(1) Same wake time. (2) Ten minutes of daylight in the morning. (3) A walk after at least ' +
      'one meal. (4) A short brain game. (5) Lights dim two hours before bed.\n\nKey takeaway: ' +
      'five easy habits beat one heroic effort.',
  },
]

// ---------------------------------------------------------------------------
// HANDOUTS & GUIDES (printable PDFs / in-portal pages)
// ---------------------------------------------------------------------------

export const handoutResources: Resource[] = [
  {
    id: 'handout-kitchen-pantry-audit',
    title: 'Kitchen Pantry Audit',
    type: 'handout',
    category: 'pantry',
    summary: 'A one-page checklist to walk through the pantry and flag what to quietly retire.',
    whyItMatters: 'You cannot eat what is not in the house.',
    estMinutes: 20,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [1, 2],
    phases: [1],
    tags: ['pantry', 'printable', 'start here'],
    source: 'curated',
    featured: true,
  },
  {
    id: 'handout-pantry-reset',
    title: 'Pantry Reset Checklist',
    type: 'checklist',
    category: 'pantry',
    summary: 'The swap-in list: what to replace with after the audit.',
    whyItMatters: 'Know what to buy before you go to the store.',
    estMinutes: 10,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [2, 3],
    phases: [1],
    tags: ['pantry', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-detox-your-life',
    title: 'Detox Your Life — Home Guide',
    type: 'guide',
    category: 'detox',
    summary: 'A room-by-room guide to reducing household toxin exposure.',
    whyItMatters: 'Your home is the environment your brain lives in.',
    estMinutes: 15,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [9, 10, 11],
    phases: [3],
    tags: ['detox', 'home', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-better-sleep-tonight',
    title: 'Better Sleep Tonight — Checklist',
    type: 'checklist',
    category: 'sleep',
    summary: 'A before-bed checklist you can laminate and stick to the fridge.',
    whyItMatters: 'One glance before bed is enough.',
    estMinutes: 5,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [2, 7],
    phases: [1, 2],
    tags: ['sleep', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-low-sugar-snacks',
    title: 'Low-Sugar Snack List',
    type: 'handout',
    category: 'blood-sugar',
    summary: '20 simple, blood-sugar-friendly snacks to keep on hand.',
    whyItMatters: 'Grab-and-go snacks that do not crash you.',
    estMinutes: 5,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [3, 5, 6],
    phases: [1, 2],
    tags: ['snacks', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-brain-healthy-grocery',
    title: 'Brain-Healthy Grocery Guide',
    type: 'grocery-list',
    category: 'grocery',
    summary: 'A categorized shopping list you can bring to any store.',
    whyItMatters: 'Shopping is easier with a list in your hand.',
    estMinutes: 5,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [2, 3, 6, 10],
    phases: [1, 2, 3],
    tags: ['shopping', 'grocery', 'printable'],
    source: 'curated',
    featured: true,
  },
  {
    id: 'handout-morning-routine',
    title: 'Morning Routine Sheet',
    type: 'worksheet',
    category: 'brain-health',
    summary: 'A one-page sheet with the 6 small morning anchors.',
    whyItMatters: 'A calm morning sets the day.',
    estMinutes: 5,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [1, 4, 17],
    phases: [1, 5],
    tags: ['routine', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-evening-wind-down',
    title: 'Evening Wind-Down Sheet',
    type: 'worksheet',
    category: 'sleep',
    summary: 'A soft, repeatable evening routine.',
    whyItMatters: 'The evening you plan is the sleep you get.',
    estMinutes: 5,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [2, 7, 17],
    phases: [1, 2, 5],
    tags: ['routine', 'evening', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-caregiver-support',
    title: 'Caregiver Support Sheet',
    type: 'caregiver-tool',
    category: 'caregiver',
    summary: 'A short, printable encouragement sheet for caregivers.',
    whyItMatters: 'You pouring yourself out is not the plan.',
    estMinutes: 3,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [1, 4, 8, 12, 16, 20, 24],
    phases: [1, 2, 3, 4, 5, 6],
    tags: ['caregiver', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-weekly-meal-planner',
    title: 'Weekly Meal Planner',
    type: 'worksheet',
    category: 'recipes',
    summary: 'Plan the week\'s meals and a small shopping list on one page.',
    whyItMatters: 'A plan beats willpower every time.',
    estMinutes: 15,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [2, 5, 6, 10, 17],
    phases: [1, 2, 3, 5],
    tags: ['meal planning', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-journal-reflection',
    title: 'Journal Reflection Sheet',
    type: 'worksheet',
    category: 'journaling',
    summary: 'A gentle, one-page weekly reflection.',
    whyItMatters: 'Small reflection, big awareness.',
    estMinutes: 10,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [4, 8, 12, 16, 20, 24],
    phases: [1, 2, 3, 4, 5, 6],
    tags: ['journal', 'reflection', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-hydration-tracker',
    title: 'Hydration Tracker',
    type: 'tracker',
    category: 'brain-health',
    summary: 'A simple 8-box tracker you can check off through the day.',
    whyItMatters: 'Dehydration feels like brain fog.',
    estMinutes: 2,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [4, 9, 11],
    phases: [1, 3],
    tags: ['tracker', 'hydration', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-welcome-email-bredesen',
    title: 'Welcome to the Bredesen Protocol',
    type: 'guide',
    category: 'start-here',
    summary: 'The clinic\'s welcome guide — what to expect in the first two weeks.',
    whyItMatters: 'Set expectations for a calm, steady start.',
    estMinutes: 8,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [1],
    phases: [1],
    tags: ['start here', 'bredesen', 'printable'],
    source: 'curated',
    featured: true,
  },
  {
    id: 'guide-bredesen-intro-slides',
    title: 'Bredesen Protocol — Introduction (Built-In)',
    type: 'guide',
    category: 'start-here',
    summary: 'A built-in welcome and orientation, written into the workbook. No slide download required.',
    whyItMatters: 'Open this first. It frames everything that follows.',
    estMinutes: 8,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [1],
    phases: [1],
    tags: ['start here', 'bredesen', 'orientation'],
    href: '/start-here',
    source: 'curated',
    featured: true,
  },
  {
    id: 'guide-bredesen-program-modules',
    title: 'Bredesen Program — All Phases (Built-In)',
    type: 'guide',
    category: 'bredesen-basics',
    summary: 'Every phase document is now built into the workbook as a readable lesson — no Drive folder to chase.',
    whyItMatters: 'If you are looking for a handout the clinic mentioned, open the lesson here in your workbook.',
    estMinutes: 0,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: false,
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    phases: [1, 2, 3, 4, 5, 6],
    tags: ['bredesen', 'library', 'reference'],
    href: '/phases',
    source: 'curated',
  },
  {
    id: 'handout-bredesen-phase-1',
    title: 'Bredesen Phase 1 — Foundations (Built-In)',
    type: 'guide',
    category: 'bredesen-basics',
    summary: 'Phase 1 written as a built-in workbook lesson — read here, no PDF.',
    whyItMatters: 'Know where you are in the arc. Phase 1 is about settling in.',
    estMinutes: 10,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [1, 2, 3, 4],
    phases: [1],
    tags: ['bredesen', 'phase 1'],
    href: '/phases/phase-1-overview',
    source: 'curated',
    featured: true,
  },
  {
    id: 'handout-bredesen-phase-2',
    title: 'Bredesen Phase 2 — Built-In Overview',
    type: 'guide',
    category: 'bredesen-basics',
    summary: 'What Phase 2 focuses on and why — built into the workbook.',
    whyItMatters: 'Know where you are in the arc.',
    estMinutes: 8,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [5, 6, 7, 8],
    phases: [2],
    tags: ['bredesen', 'phase 2'],
    href: '/phases/phase-2-overview',
    source: 'curated',
  },
  {
    id: 'handout-bredesen-phase-3',
    title: 'Bredesen Phase 3 — Built-In Overview',
    type: 'guide',
    category: 'bredesen-basics',
    summary: 'Phase 3 written as a workbook lesson — deeper habits, movement progression, sleep consistency.',
    whyItMatters: 'Phase 3 is where the quiet swaps start to add up.',
    estMinutes: 10,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [9, 10, 11, 12],
    phases: [3],
    tags: ['bredesen', 'phase 3'],
    href: '/phases/phase-3-overview',
    source: 'curated',
    featured: true,
  },
  {
    id: 'handout-program-ended-email',
    title: 'Bredesen Program — Transition & Next Steps (Built-In)',
    type: 'guide',
    category: 'start-here',
    summary: 'A built-in end-of-program walkthrough — what you have learned, what to carry forward, and how follow-up works.',
    whyItMatters: 'At the 6-month mark, this is the page that helps you plan what comes next.',
    estMinutes: 8,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [23, 24],
    phases: [6],
    tags: ['bredesen', 'phase 6', 'graduation', 'next steps'],
    href: '/phases/month-6',
    source: 'curated',
  },
  {
    id: 'handout-movement-mini-routine',
    title: 'Movement Mini Routine',
    type: 'handout',
    category: 'movement',
    summary: 'A printable 5-move routine — no equipment.',
    whyItMatters: 'A routine you cannot forget because it is on the fridge.',
    estMinutes: 5,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [3, 7, 13, 14],
    phases: [1, 2, 4],
    tags: ['movement', 'printable'],
    source: 'curated',
  },
  {
    id: 'handout-cleaner-products',
    title: 'Cleaner Products Guide',
    type: 'handout',
    category: 'detox',
    summary: 'Gentler alternatives for everyday household products.',
    whyItMatters: 'Fewer fragrances, fewer problems.',
    estMinutes: 6,
    beginnerFriendly: true,
    caregiverFriendly: true,
    printable: true,
    weeks: [9, 10],
    phases: [3],
    tags: ['detox', 'home', 'printable'],
    source: 'curated',
  },
]

// ---------------------------------------------------------------------------
// PUBLIC (unified export)
// ---------------------------------------------------------------------------

export const resources: Resource[] = [
  ...videoResources,
  ...articleResources,
  ...handoutResources,
]

// ---------------------------------------------------------------------------
// LOOKUPS
// ---------------------------------------------------------------------------

export function resourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id)
}

export function resourcesForWeek(week: number): Resource[] {
  return resources.filter((r) => r.weeks.includes(week))
}

export function resourcesForPhase(phase: number): Resource[] {
  return resources.filter((r) => r.phases.includes(phase))
}

export function resourcesByCategory(cat: ResourceCategory): Resource[] {
  return resources.filter((r) => r.category === cat)
}

export function resourcesByType(type: ResourceType): Resource[] {
  return resources.filter((r) => r.type === type)
}

/**
 * Today's helpful resource
 * ------------------------
 * Picks one resource that is relevant to the patient's current week, and
 * rotates deterministically through matching items so the patient sees
 * something different every day without repetition within a given week.
 *
 * Priority: resources tagged for this week > resources tagged for this phase
 * > featured resources > any beginner resource.
 */
export function resourceOfTheDay(day: number, week: number, phase: number): Resource {
  const weekMatches = resources.filter((r) => r.weeks.includes(week))
  const phaseMatches = resources.filter((r) => r.phases.includes(phase))
  const featured = resources.filter((r) => r.featured)

  const pool =
    weekMatches.length > 0
      ? weekMatches
      : phaseMatches.length > 0
        ? phaseMatches
        : featured.length > 0
          ? featured
          : resources

  const index = Math.abs(day) % pool.length
  return pool[index]
}

/**
 * Categories with labels — used to render the Resources page sidebar /
 * chip row. Kept in one place so admin filters and patient filters stay
 * aligned.
 */
export const categoryLabels: Record<ResourceCategory, string> = {
  'start-here': 'Start Here',
  'bredesen-basics': 'Bredesen Basics',
  'brain-health': 'Brain Health',
  sleep: 'Sleep',
  nutrition: 'Nutrition',
  'blood-sugar': 'Blood Sugar',
  detox: 'Detox',
  movement: 'Movement',
  stress: 'Stress & Breath',
  cognition: 'Cognition',
  recipes: 'Recipes',
  grocery: 'Grocery',
  caregiver: 'Caregiver',
  pantry: 'Pantry',
  supplements: 'Supplements',
  journaling: 'Journaling',
  printables: 'Printables',
}

export const typeLabels: Record<ResourceType, string> = {
  video: 'Video',
  article: 'Article',
  handout: 'Handout',
  guide: 'Guide',
  checklist: 'Checklist',
  worksheet: 'Worksheet',
  tracker: 'Tracker',
  'grocery-list': 'Grocery List',
  recipe: 'Recipe',
  'caregiver-tool': 'Caregiver Tool',
  'brain-game': 'Brain Game',
  printable: 'Printable',
}

// ---------------------------------------------------------------------------
// Encouragements + milestones (kept so existing imports continue to work)
// ---------------------------------------------------------------------------

export const encouragements = [
  'You are building a healing rhythm.',
  'Small steps are adding up.',
  'You showed up for your brain today.',
  'Consistency matters more than perfection.',
  "It's okay to go slowly.",
  'Rest is part of the plan.',
  'You do not have to catch up.',
  'The quiet work counts.',
  'You are doing more than you think.',
  'One small step today is enough.',
]

export const caregiverTips = [
  'Your presence matters more than any reminder you give.',
  'Protect your own rest this week. You cannot pour from an empty cup.',
  'Notice what is easier now than it was two weeks ago. Say it out loud.',
  'Cook one meal together — no phone, no TV.',
  'Ask a gentle question instead of giving a reminder.',
  'A short walk together does two brains good.',
  'Celebrate small things aloud. It creates memory of success.',
  "Print this week's plan and put it on the fridge.",
  'If things feel hard, switch to Simple Mode for a few days.',
  'Sit quietly together for five minutes. That is a complete thing.',
]

export const milestones = [
  { day: 7, title: 'One Week In', message: 'You have completed Week 1 of your 6-month journey. That first week is a real milestone.' },
  { day: 14, title: 'Phase 1 Complete', message: 'Two weeks in. Foundations laid. Phase 2 begins gently tomorrow.' },
  { day: 28, title: 'One Month', message: 'A full month of showing up. Your brain is noticing.' },
  { day: 56, title: 'Phase 3 Complete', message: 'Food, sleep, and blood sugar support now feel more familiar.' },
  { day: 84, title: 'Halfway', message: 'Three months in. You are halfway home. Take a moment to feel that.' },
  { day: 112, title: 'Phase 4 Complete', message: 'Movement, cognitive training, and detox support have been layered in.' },
  { day: 140, title: 'Phase 5 Complete', message: 'Precision and confidence are building. You lead more of your own plan now.' },
  { day: 168, title: 'Phase 6 Complete', message: 'You are running your own rhythm. That is a quiet, beautiful thing.' },
  { day: 180, title: 'Program Complete', message: 'Six months. Well done. Your tools travel with you from here.' },
]

/**
 * Backward-compatible export — the Videos route imports `videos`. It
 * continues to work because every entry in `videoResources` has the same
 * shape for the fields it needs.
 */
export const videos = videoResources.map((r) => ({
  id: r.id,
  title: r.title,
  category: r.category,
  summary: r.summary,
  duration: `${r.estMinutes} min`,
  beginnerFriendly: r.beginnerFriendly,
  caregiverFriendly: r.caregiverFriendly,
  bestForPhase: r.phases,
  labels: r.tags,
  source: 'clinic-curated',
}))
