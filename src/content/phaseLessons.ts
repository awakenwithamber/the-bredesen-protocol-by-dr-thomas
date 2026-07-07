/**
 * Built-in Phase Lessons
 * ----------------------
 * Every page a Bredesen patient needs to read is here, in plain text,
 * inside the project. No PDFs. No Drive links. No Healthie attachments.
 * Patients should never have to download anything to know what to do
 * next.
 *
 * Each lesson follows the same shape so the UI can render it identically
 * everywhere it appears (Today page, Phase page, Print Center).
 *
 *   1. todaysFocus
 *   2. whyThisMatters
 *   3. steps (numbered, plain language)
 *   4. supportiveNote (gentle encouragement)
 *   5. checklist (5-7 items, patient-facing)
 *   6. caregiverNote (optional)
 *   7. reflection (one prompt)
 *   8. drThomasQuestion (optional, for clinically relevant lessons)
 *   9. tracker (the field name patients tick / log)
 *  10. nextStep (route + label for the natural next page)
 */

export type PhaseLesson = {
  slug: string
  group:
    | 'start-here'
    | 'phase-1'
    | 'phase-2'
    | 'phase-3'
    | 'phase-4'
    | 'months-3-6'
  /** "Welcome", "Phase 1 · Week 1", "Month 3" — short, used as eyebrow. */
  eyebrow: string
  title: string
  /** Optional short subtitle ("Today's focus" sentence). */
  todaysFocus: string
  whyThisMatters: string
  steps: string[]
  supportiveNote: string
  checklist: string[]
  caregiverNote?: string
  reflection: string
  drThomasQuestion?: string
  tracker: string
  nextStep: { slug: string; label: string }
  /** Optional supplemental external link with a "last verified" date. */
  supplemental?: {
    title: string
    url: string
    source: string
    lastVerified: string
    description: string
  }[]
  /** Optional related route for "go deeper" inside the app. */
  relatedRoutes?: { to: string; label: string }[]
}

const LV = '2026-04-25'

/* -------------------------------------------------------------------- */
/*  START HERE                                                          */
/* -------------------------------------------------------------------- */

const startHere: PhaseLesson[] = [
  {
    slug: 'welcome',
    group: 'start-here',
    eyebrow: 'Start Here',
    title: 'Welcome to the Bredesen Program',
    todaysFocus:
      'Settle in. You do not have to do anything hard today. Just read this page.',
    whyThisMatters:
      'The Bredesen Protocol is a gentle, structured way of caring for your brain. It is built on the idea that the brain responds to many small, supportive habits — sleep, food, movement, calm, and learning — together. No one habit is the answer. The whole rhythm is.',
    steps: [
      'Read this welcome page slowly. There is no test.',
      'When you finish, open "What this program is — and is not."',
      'Then read "How to use this workbook."',
      'Finish with "Your first day."',
      'You can stop any time. The workbook saves where you are.',
    ],
    supportiveNote:
      'You are not behind. You are exactly on time. The first step is showing up — and you have already done that.',
    checklist: [
      'I read the welcome page.',
      'I know I do not need to download anything.',
      'I know my workbook saves my place.',
      'I know I can ask for help any time.',
    ],
    caregiverNote:
      'If you are reading this alongside someone you love, your role is companion, not coach. Sit beside them. Read the words aloud if that helps. The presence is the gift.',
    reflection:
      'What is one small hope you have for the next six months?',
    tracker: 'Welcome read',
    nextStep: { slug: 'what-this-program-is', label: 'What This Program Is' },
  },
  {
    slug: 'what-this-program-is',
    group: 'start-here',
    eyebrow: 'Start Here',
    title: 'What This Program Is — and Is Not',
    todaysFocus:
      'A clear, honest picture of what these next months will and will not do.',
    whyThisMatters:
      'Knowing what to expect prevents disappointment and burnout. The Bredesen Protocol is not a quick fix. It is a long, gentle, evidence-informed practice. Many small choices add up.',
    steps: [
      'Read what this program IS: a guided, six-month, lifestyle-first practice that supports brain health.',
      'Read what it IS NOT: a cure, a guarantee, or a replacement for your clinician.',
      'Notice that medicines, supplements, and major diet changes always go through Dr. Thomas first.',
      'Notice that the workbook is a companion to your medical care — not a substitute.',
    ],
    supportiveNote:
      'No promise we make is bigger than this: if you show up most days, your brain will be in a kinder environment than it was before.',
    checklist: [
      'I understand the program is a practice, not a cure.',
      'I will check with Dr. Thomas before changing supplements or medications.',
      'I will use this workbook as a companion to clinical care.',
      'I will be patient with myself.',
    ],
    reflection:
      'What is one fear you have about starting? Naming it makes it smaller.',
    drThomasQuestion:
      'Are there any conditions, medicines, or restrictions I have that should change how I do this program?',
    tracker: 'Expectations clear',
    nextStep: { slug: 'how-to-use-the-workbook', label: 'How to Use the Workbook' },
  },
  {
    slug: 'how-to-use-the-workbook',
    group: 'start-here',
    eyebrow: 'Start Here',
    title: 'How to Use the Workbook',
    todaysFocus:
      'Learn the rhythm: open Today, do a few small steps, mark them done, come back tomorrow.',
    whyThisMatters:
      'A predictable rhythm protects energy. The workbook tells you exactly what today is about so your brain does not have to plan it.',
    steps: [
      'Open the Today page each morning. It tells you what to read, eat, do, and notice.',
      'Tap the circle next to each step when you finish it. Partial days count.',
      'When the day feels done, tap the big "Finish today" button. Tomorrow will unlock.',
      'Use the Phases page if you want to see what is coming next.',
      'Use the Resources page if you want extra reading. None of it is required.',
    ],
    supportiveNote:
      'You do not need to finish every step every day. Showing up is the whole strategy.',
    checklist: [
      'I know where the Today page is.',
      'I know how to mark a step done.',
      'I know how to finish a day.',
      'I know nothing in the workbook is required.',
    ],
    caregiverNote:
      'If reading on a screen feels heavy, you can read pages aloud. There is also a "Read to me" button on the Today page.',
    reflection:
      'What time of day feels most peaceful for opening the workbook?',
    tracker: 'Workbook tour complete',
    nextStep: { slug: 'first-day', label: 'Your First Day' },
  },
  {
    slug: 'first-day',
    group: 'start-here',
    eyebrow: 'Start Here',
    title: 'Your First Day',
    todaysFocus:
      'A warm, very small first day. Five gentle things, in any order.',
    whyThisMatters:
      'The first day sets the tone. We keep it small on purpose. If you finish it, you have already proven you can do this.',
    steps: [
      'Drink a full glass of water.',
      'Step outside for five minutes — even just to the porch.',
      'Eat one warm, simple meal you already know how to make.',
      'Take three slow breaths, with the exhale longer than the inhale.',
      'Write one sentence in the journal. Anything counts.',
    ],
    supportiveNote:
      'If you only do one of these today, you have still started. We mean that.',
    checklist: [
      'I drank water.',
      'I went outside.',
      'I ate one warm meal.',
      'I took three slow breaths.',
      'I wrote one sentence.',
    ],
    caregiverNote:
      'Do these alongside them if you can. The five minutes outside is a beautiful thing to do together, in silence.',
    reflection:
      'What felt easiest today? What felt heaviest?',
    drThomasQuestion:
      'Is there anything I should not do today because of a current medication or condition?',
    tracker: 'Day 1 started',
    nextStep: {
      slug: 'caregiver-orientation',
      label: 'Caregiver Orientation',
    },
  },
  {
    slug: 'caregiver-orientation',
    group: 'start-here',
    eyebrow: 'Start Here',
    title: 'Caregiver Orientation',
    todaysFocus:
      'For the family member, partner, or friend reading along: a short orientation to your role.',
    whyThisMatters:
      'Caregiving for someone going through cognitive change is layered. Research and clinical experience agree: the best caregivers are companions, not coaches. Your presence matters more than your prompts.',
    steps: [
      'Sit beside them as they open the workbook. Read pages aloud if it helps.',
      'Celebrate small wins quietly: "you walked today — beautiful."',
      'Do things WITH them rather than reminding them to do things.',
      'Protect your own rhythm — sleep, food, movement, rest.',
      'If today feels heavy, open the "Hard Day" page. It exists for both of you.',
    ],
    supportiveNote:
      'You are doing more than you know. Your steady, kind presence is medicine.',
    checklist: [
      'I read the caregiver orientation.',
      'I know my role is companion, not coach.',
      'I know I can use the Hard Day page when I need it.',
      'I have a way to call the clinic if something feels off.',
    ],
    reflection:
      'What is one small way you can take care of yourself this week?',
    tracker: 'Caregiver oriented',
    nextStep: {
      slug: 'overwhelmed',
      label: 'For When This Feels Overwhelming',
    },
  },
  {
    slug: 'overwhelmed',
    group: 'start-here',
    eyebrow: 'Start Here',
    title: 'For When This Feels Overwhelming',
    todaysFocus:
      'You are not behind. You are not failing. Read this page when the program feels too big.',
    whyThisMatters:
      'Brain health changes are emotional. Overwhelm is not weakness — it is a signal to soften the plan.',
    steps: [
      'Stop. Breathe out slowly twice.',
      'Pick the SMALLEST possible step from today: one sip of water, one minute outside.',
      'Do that one thing. Mark it done. That counts as a full day.',
      'Skip everything else. The workbook will not punish you.',
      'Tomorrow is new. You can begin again, gently.',
    ],
    supportiveNote:
      'Progress beats perfection. Always. We mean it.',
    checklist: [
      'I read the overwhelm page.',
      'I picked one tiny step.',
      'I forgave myself for the rest.',
      'I will return tomorrow.',
    ],
    caregiverNote:
      'If they say "I cannot do this today," believe them. Sit with them. Do not push. Tomorrow is also part of the program.',
    reflection:
      'What is one thing you can let go of today?',
    drThomasQuestion:
      'If overwhelm is constant, it is worth bringing up. Mood and brain health are connected.',
    tracker: 'Read overwhelm page',
    nextStep: {
      slug: 'phase-1-overview',
      label: 'Begin Phase 1',
    },
  },
]

/* -------------------------------------------------------------------- */
/*  PHASE 1 · Weeks 1–2                                                 */
/* -------------------------------------------------------------------- */

const phase1: PhaseLesson[] = [
  {
    slug: 'phase-1-overview',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Phase 1 — Foundations & Baseline',
    todaysFocus:
      'Begin gently. Notice where you are starting from. No big changes yet.',
    whyThisMatters:
      'Phase 1 is about honest baseline. We measure simple things — sleep, energy, mood, food — before we change anything. Knowing the starting point makes the rest of the program meaningful.',
    steps: [
      'Read this overview page.',
      'Open "Baseline Symptom Tracker" and answer the few questions.',
      'Open the "Memory & Cognition Self-Check" — it is short.',
      'Note your current sleep, energy, and mood honestly.',
      'You do not need to change anything yet.',
    ],
    supportiveNote:
      'There are no wrong answers in Phase 1. The honest answer is the right one.',
    checklist: [
      'I read the Phase 1 overview.',
      'I started the symptom tracker.',
      'I started the memory self-check.',
      'I logged my sleep last night.',
      'I noted today\'s energy and mood.',
    ],
    caregiverNote:
      'Help by sitting next to them as they fill in the baseline. Do not answer for them — your job is the warmth, not the answers.',
    reflection:
      'What feels heaviest right now — sleep, food, mood, energy, or something else?',
    drThomasQuestion:
      'Are there any symptoms I should mention to you sooner rather than later?',
    tracker: 'Phase 1 started',
    nextStep: {
      slug: 'baseline-symptoms',
      label: 'Baseline Symptom Tracker',
    },
  },
  {
    slug: 'baseline-symptoms',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Baseline Symptom Tracker',
    todaysFocus:
      'Write down where you are right now in five simple categories.',
    whyThisMatters:
      'A baseline is a snapshot. In two weeks, two months, six months, you will look back and see what changed. Without a starting picture, progress is invisible.',
    steps: [
      'Score your sleep last night from 1 (rough) to 5 (deep).',
      'Score your energy today from 1 (flat) to 5 (steady).',
      'Score your mood today from 1 (heavy) to 5 (calm).',
      'Score your focus today from 1 (foggy) to 5 (clear).',
      'Score your overall day from 1 (hard) to 5 (kind).',
    ],
    supportiveNote:
      'A 2 is a perfectly honest answer. So is a 4. We are not grading.',
    checklist: [
      'I scored sleep.',
      'I scored energy.',
      'I scored mood.',
      'I scored focus.',
      'I scored my overall day.',
    ],
    reflection:
      'Which of the five was hardest to score honestly?',
    tracker: 'Baseline symptoms logged',
    nextStep: {
      slug: 'memory-self-check',
      label: 'Memory & Cognition Self-Check',
    },
  },
  {
    slug: 'memory-self-check',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Memory & Cognition Self-Check',
    todaysFocus:
      'A short, gentle self-check. No tests, no scores you have to pass.',
    whyThisMatters:
      'The brain is hard to measure from the inside. A small set of questions, asked the same way over time, helps you and Dr. Thomas notice patterns.',
    steps: [
      'Answer: Do I forget appointments more than a year ago? (yes / sometimes / no)',
      'Answer: Do words feel slower to find than a year ago?',
      'Answer: Do I lose track of conversations more than a year ago?',
      'Answer: Do I feel more easily overwhelmed by familiar tasks?',
      'Answer: Do I feel sharper at one time of day than another?',
    ],
    supportiveNote:
      'These questions are not a diagnosis. They are a quiet conversation with yourself.',
    checklist: [
      'I answered all five questions honestly.',
      'I noticed which one was hardest to answer.',
      'I did not panic about any answer.',
    ],
    caregiverNote:
      'If your loved one wants you to answer alongside them with your observations, that is welcome. Honest is more useful than gentle here.',
    reflection:
      'Was there a time of day you felt sharpest this week?',
    drThomasQuestion:
      'These five answers — would you like to see them at our next visit?',
    tracker: 'Memory self-check complete',
    nextStep: {
      slug: 'sleep-baseline',
      label: 'Sleep Baseline',
    },
  },
  {
    slug: 'sleep-baseline',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Sleep Baseline',
    todaysFocus:
      'Note how you actually sleep, before we try to change anything.',
    whyThisMatters:
      'Deep sleep is when the brain takes out its trash. Knowing your baseline helps every later week of the program.',
    steps: [
      'Write your typical bedtime and wake time.',
      'Estimate how long it takes you to fall asleep.',
      'Note how many times you wake at night, on average.',
      'Score how rested you feel in the morning, 1 to 5.',
      'Note one thing about your bedroom: light, temperature, sound.',
    ],
    supportiveNote:
      'Sleep is rarely perfect. The goal is not perfection — it is a steady, kinder rhythm over time.',
    checklist: [
      'I logged bedtime and wake time.',
      'I noted how easily I fall asleep.',
      'I noted how often I wake.',
      'I scored rest in the morning.',
      'I noticed one thing about my bedroom.',
    ],
    reflection:
      'What is one thing about your sleep you would gently want to change?',
    drThomasQuestion:
      'Are there any sleep issues — apnea, insomnia, frequent waking — I should be evaluated for?',
    tracker: 'Sleep baseline logged',
    nextStep: {
      slug: 'food-baseline',
      label: 'Food Baseline',
    },
  },
  {
    slug: 'food-baseline',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Food Baseline',
    todaysFocus:
      'Notice what a normal day of eating looks like. No changes today.',
    whyThisMatters:
      'Food is one of the largest levers in brain health. Honest baseline helps us choose where to start without judgment.',
    steps: [
      'Write what you typically eat for breakfast.',
      'Write a typical lunch and dinner.',
      'Note your typical snacks (be honest — chips count).',
      'Note what you typically drink: water, coffee, tea, soda, alcohol.',
      'Note one food you eat almost every day.',
    ],
    supportiveNote:
      'Nothing about your current eating is wrong. We are just looking, kindly.',
    checklist: [
      'I logged a typical breakfast.',
      'I logged lunch and dinner.',
      'I logged snacks honestly.',
      'I logged drinks.',
      'I noted my "almost every day" food.',
    ],
    caregiverNote:
      'You probably know each other\'s habits well. Compare notes — gently — and write the truth.',
    reflection:
      'Which meal of the day feels easiest? Which feels hardest?',
    tracker: 'Food baseline logged',
    nextStep: {
      slug: 'energy-mood-baseline',
      label: 'Energy & Mood Baseline',
    },
  },
  {
    slug: 'energy-mood-baseline',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Energy, Mood & Stress Baseline',
    todaysFocus:
      'A short check-in on energy, mood, and stress before any changes begin.',
    whyThisMatters:
      'Energy and mood reflect what is happening in the brain right now. A baseline gives later weeks a real measure of progress.',
    steps: [
      'Score your morning energy 1–5.',
      'Score your afternoon energy 1–5.',
      'Score your typical mood 1–5.',
      'Score your typical stress 1–5.',
      'Name one thing that lifts your mood and one that drains it.',
    ],
    supportiveNote:
      'A heavy mood is information, not failure. Naming it is a brave first step.',
    checklist: [
      'I scored morning and afternoon energy.',
      'I scored mood.',
      'I scored stress.',
      'I named one lift and one drain.',
    ],
    reflection:
      'When did you last feel a moment of real calm? What were you doing?',
    drThomasQuestion:
      'If mood or stress feel heavy most days, please tell Dr. Thomas — there is help.',
    tracker: 'Energy/mood baseline logged',
    nextStep: {
      slug: 'kitchen-reset',
      label: 'Kitchen Reset Lesson',
    },
  },
  {
    slug: 'kitchen-reset',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Kitchen Reset',
    todaysFocus:
      'Create a kitchen environment that makes brain-supportive choices easier.',
    whyThisMatters:
      'The brain is sensitive to blood sugar swings, inflammation, poor sleep, and nutrient gaps. A calmer pantry helps reduce daily decision fatigue and makes it easier to choose foods that support steadier energy and cognitive resilience.',
    steps: [
      'Choose one cabinet, shelf, or pantry area.',
      'Create three piles: Keep, Replace, Remove.',
      'Start with drinks, then snacks, then breakfast foods.',
      'Look for added sugar, refined flour, long ingredient lists, and ultra-processed foods.',
      'Do not throw everything away at once if that creates stress.',
      'Choose three easy swaps for this week.',
    ],
    supportiveNote:
      'This is not about being perfect. It is about making your next good choice easier.',
    checklist: [
      'I reviewed drinks.',
      'I reviewed snacks.',
      'I reviewed breakfast foods.',
      'I chose three swaps.',
      'I wrote down one question for Dr. Thomas.',
    ],
    caregiverNote:
      'Offer help without judgment. Ask, "Which three items would feel easiest to replace first?"',
    reflection:
      'What food change feels easiest this week? What feels hardest?',
    drThomasQuestion:
      'Are there any foods, fasting changes, supplements, or diet restrictions I should not change without guidance?',
    tracker: 'Kitchen reviewed',
    nextStep: {
      slug: 'pantry-audit',
      label: 'Pantry Audit Worksheet',
    },
  },
  {
    slug: 'pantry-audit',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Pantry Audit Worksheet',
    todaysFocus:
      'A built-in worksheet for sorting your pantry into Keep, Replace, and Remove.',
    whyThisMatters:
      'Decisions made once, in a calm pantry, are easier than decisions made every day at 5pm when you are hungry.',
    steps: [
      'Open one shelf.',
      'For each item, ask: "Does this support my brain?" — yes, sometimes, or no.',
      'Move "yes" items to a Keep area at eye level.',
      'Move "sometimes" items to the Replace area — you will use them up, then choose better.',
      'Move "no" items to the Remove area — donate, give away, or throw out without guilt.',
      'Repeat with one shelf at a time, over the week.',
    ],
    supportiveNote:
      'A half-finished pantry audit is still progress. One shelf counts.',
    checklist: [
      'I opened one shelf.',
      'I sorted into Keep / Replace / Remove.',
      'I made an "eye level" Keep area.',
      'I did not throw everything out at once.',
      'I felt no guilt about the Remove pile.',
    ],
    caregiverNote:
      'This is a beautiful task to do together. One person opens, the other sorts. Five items at a time is plenty.',
    reflection:
      'Which items were hardest to put in "Remove"? Why?',
    tracker: 'Shelves audited',
    nextStep: {
      slug: 'why-fewer-processed-foods',
      label: 'Why We Reduce Processed Foods',
    },
  },
  {
    slug: 'why-fewer-processed-foods',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Why We Reduce Processed Foods',
    todaysFocus:
      'Understand the "why" behind the pantry audit, in plain language.',
    whyThisMatters:
      'Highly processed foods spike blood sugar, drive inflammation, and crowd out the nutrients the brain needs. Less of them — gradually — is one of the most impactful changes a brain can receive.',
    steps: [
      'Read this short explanation slowly.',
      'Note: "processed" does not mean any food in a package. Plain frozen vegetables, canned beans, and yogurt are fine.',
      'The concern is "ultra-processed": long ingredient lists, added sugars, refined flours, hydrogenated oils, artificial colors.',
      'Reducing — not eliminating — is the goal.',
      'Small, repeated swaps beat dramatic overhauls.',
    ],
    supportiveNote:
      'You are not failing if a frozen pizza is on the table tonight. The brain notices the average across weeks, not any single meal.',
    checklist: [
      'I understand the difference between processed and ultra-processed.',
      'I know "reduce" not "eliminate."',
      'I picked one ultra-processed food I will gently replace.',
    ],
    reflection:
      'Which ultra-processed food do you eat most? Which would be easiest to swap?',
    drThomasQuestion:
      'Are there any specific food sensitivities or restrictions I should follow?',
    tracker: 'Read processed-foods lesson',
    nextStep: {
      slug: 'keep-replace-remove',
      label: 'Keep / Replace / Remove Tables',
    },
  },
  {
    slug: 'keep-replace-remove',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Keep / Replace / Remove — Quick Tables',
    todaysFocus:
      'A short reference: what to keep, what to swap toward, what to gently retire.',
    whyThisMatters:
      'A simple, repeatable list reduces decision fatigue at the grocery store.',
    steps: [
      'Keep: olive oil, avocado, leafy greens, berries, eggs, wild salmon, nuts, beans, plain yogurt.',
      'Replace: white bread → sourdough or sprouted; sugary cereal → oats with berries; soda → sparkling water with citrus; chips → nuts and olives; vegetable oil → olive or avocado oil; flavored yogurt → plain yogurt with berries.',
      'Remove (gradually): products with corn syrup or "high fructose corn syrup"; "partially hydrogenated" oils; products with five or more added-sugar names; brightly colored snack foods.',
      'Take a photo of this list before grocery shopping.',
    ],
    supportiveNote:
      'A messy, half-followed list still moves you toward steadier brain health.',
    checklist: [
      'I read the Keep list.',
      'I read the Replace list.',
      'I read the Remove list.',
      'I picked one swap to try this week.',
    ],
    caregiverNote:
      'Take this list to the store together. The patient picks; the caregiver carries.',
    reflection:
      'Which swap will be the easiest first try? Which will be the hardest?',
    tracker: 'Read swap tables',
    nextStep: {
      slug: 'healthy-brain-foods',
      label: 'Healthy Brain Foods',
    },
  },
  {
    slug: 'healthy-brain-foods',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Healthy Brain Foods',
    todaysFocus:
      'A short list of the foods the Bredesen approach loves most — and why.',
    whyThisMatters:
      'The brain is mostly water and fat. The right kinds of fat, paired with antioxidants and steady protein, give the brain its best fuel.',
    steps: [
      'Olive oil — daily. A spoon over salad or vegetables.',
      'Wild salmon, sardines, or another fatty fish — twice a week if possible.',
      'Leafy greens — daily. Spinach, kale, arugula, lettuce, swiss chard.',
      'Berries — most days. Frozen counts. Wild blueberries are wonderful.',
      'Avocado — most days, half a fruit.',
      'Nuts and seeds — a small handful daily. Walnuts especially.',
      'Eggs — pasture-raised when possible.',
      'Plain yogurt or kefir — daily, if dairy works for you.',
    ],
    supportiveNote:
      'You do not need every food every day. Two or three is plenty most days.',
    checklist: [
      'I added one of these to my next grocery list.',
      'I planned one brain-food meal for tomorrow.',
      'I have olive oil at home.',
      'I have at least one leafy green at home.',
    ],
    reflection:
      'Which of these foods do you already love? Which feel new?',
    drThomasQuestion:
      'Do I have any allergies or sensitivities that should change this list?',
    tracker: 'Read brain foods',
    nextStep: {
      slug: 'phase-1-recipes',
      label: 'Phase 1 Recipe Cards',
    },
  },
  {
    slug: 'phase-1-recipes',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Phase 1 Recipe Cards',
    todaysFocus:
      'Three brain-friendly recipes to start with. None are hard. All are warm.',
    whyThisMatters:
      'A patient is more likely to keep eating brain-supportive food if it is familiar, simple, and tastes good. Phase 1 recipes are deliberately easy.',
    steps: [
      'BREAKFAST — Berry-yogurt bowl: ½ cup plain yogurt, ½ cup frozen berries, 1 tbsp ground flax, a few walnuts. Stir. Eat.',
      'LUNCH — Greens with olive oil and salmon: handful of greens, a can of wild salmon (drained), olive oil + lemon, salt, pepper. Top with avocado.',
      'DINNER — One-pan chicken and vegetables: chicken thighs, broccoli, sweet potato, olive oil, salt, herbs. 425°F (220°C) for 25 minutes.',
      'Snack: a small handful of nuts and a few berries. Or a hard-boiled egg with cherry tomatoes.',
    ],
    supportiveNote:
      'If a recipe feels like too many steps today, eat what is in the fridge. Tomorrow is also part of the program.',
    checklist: [
      'I picked one recipe to try this week.',
      'I have the ingredients (or wrote them on the list).',
      'I scheduled the meal in my mind.',
    ],
    caregiverNote:
      'Cooking together is a beautiful brain practice. One reads, one stirs.',
    reflection:
      'Which recipe sounded most like something you would actually make?',
    tracker: 'Tried a Phase 1 recipe',
    nextStep: {
      slug: 'cooking-oils-basics',
      label: 'Cooking Oils — Basics',
    },
  },
  {
    slug: 'cooking-oils-basics',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Cooking Oils — Basics',
    todaysFocus:
      'A short, clear answer to "what oil should I cook with?"',
    whyThisMatters:
      'The wrong oils — when heated — produce compounds that drive inflammation. The right oils are kind to the brain. This decision, made once, helps every meal afterward.',
    steps: [
      'For everyday cooking: extra virgin olive oil. Yes, even for sautéing at medium heat.',
      'For high-heat cooking (rare): avocado oil.',
      'For drizzling: extra virgin olive oil, fresh and cold.',
      'Use less of: corn oil, soybean oil, "vegetable oil" (a blend), sunflower oil, safflower oil, canola.',
      'Avoid: anything labeled "partially hydrogenated."',
    ],
    supportiveNote:
      'You do not have to throw out the bottle in your cabinet today. Use it up, then choose better next time.',
    checklist: [
      'I know my everyday oil is olive oil.',
      'I know "partially hydrogenated" is the one to avoid.',
      'I checked the label on my current oil.',
    ],
    reflection:
      'What oil are you cooking with right now? What will you buy next time?',
    tracker: 'Read oils basics',
    nextStep: {
      slug: 'three-easiest-swaps',
      label: 'Three Easiest First Swaps',
    },
  },
  {
    slug: 'three-easiest-swaps',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Three Easiest First Swaps',
    todaysFocus:
      'Pick three small swaps for this week. Just three.',
    whyThisMatters:
      'Three is enough. More than three creates overwhelm and falls apart. Three swaps, kept for two weeks, become habits.',
    steps: [
      'SWAP 1 — Drink: replace soda or sweet drinks with sparkling water + lemon, or herbal tea.',
      'SWAP 2 — Breakfast: replace sugary cereal or pastries with eggs, plain yogurt + berries, or oats.',
      'SWAP 3 — Snack: replace chips or sweets with nuts, olives, hummus + carrots, or fruit.',
      'Write your three swaps on a sticky note on the fridge.',
      'Try them for two full weeks before adding any more.',
    ],
    supportiveNote:
      'Three swaps, done quietly, will outpace ten swaps done dramatically.',
    checklist: [
      'I picked my drink swap.',
      'I picked my breakfast swap.',
      'I picked my snack swap.',
      'I posted them somewhere visible.',
    ],
    reflection:
      'Which of your three swaps feels easiest? Which will be the hardest?',
    tracker: 'Picked three swaps',
    nextStep: {
      slug: 'gentle-five-minute-movement',
      label: 'Gentle 5-Minute Movement',
    },
  },
  {
    slug: 'gentle-five-minute-movement',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Gentle 5-Minute Movement',
    todaysFocus:
      'Five minutes of gentle movement, in any form your body welcomes.',
    whyThisMatters:
      'The brain responds to small, frequent movement more than to occasional hard workouts. Five minutes today is a real practice.',
    steps: [
      'Stand up, slowly. Roll your shoulders back three times.',
      'Walk — outside if you can, around the room if not — for five minutes.',
      'Take three slow breaths at the end.',
      'If walking is hard, do this seated: ankle circles, arm raises, slow neck turns.',
      'Drink a glass of water.',
    ],
    supportiveNote:
      'Five minutes counts. Two minutes counts. Standing up counts.',
    checklist: [
      'I stood up.',
      'I moved for at least two minutes.',
      'I took three slow breaths.',
      'I drank water.',
    ],
    caregiverNote:
      'Walk alongside if you can. No need to talk. Quiet company is plenty.',
    reflection:
      'How did your body feel before, and after?',
    drThomasQuestion:
      'Are there any movements I should avoid because of joint, balance, or heart concerns?',
    tracker: 'Five-minute movement done',
    nextStep: {
      slug: 'phase-1-questions-for-dr-thomas',
      label: 'Questions for Dr. Thomas',
    },
  },
  {
    slug: 'phase-1-questions-for-dr-thomas',
    group: 'phase-1',
    eyebrow: 'Phase 1 · Weeks 1–2',
    title: 'Questions for Dr. Thomas — End of Phase 1',
    todaysFocus:
      'Write down two or three questions to bring to your next visit.',
    whyThisMatters:
      'Visits are short. Brains are tired by the time we sit down. A written list helps you and Dr. Thomas use the visit well.',
    steps: [
      'Open the journal page or a piece of paper.',
      'Write your top three questions from these two weeks.',
      'Note any symptom that surprised you.',
      'Note any food, supplement, or medicine you are unsure about.',
      'Bring the list to your next visit, paper or screen — whichever is easier.',
    ],
    supportiveNote:
      'Three questions is plenty. Two is also plenty. One is plenty.',
    checklist: [
      'I wrote at least one question.',
      'I noted any surprising symptoms.',
      'I have the list saved or printed.',
    ],
    caregiverNote:
      'Add a question of your own if something has worried you. Dr. Thomas wants caregiver observations.',
    reflection:
      'What is the one thing you most want to ask Dr. Thomas?',
    drThomasQuestion:
      'These two weeks, anything I should be evaluated for sooner rather than later?',
    tracker: 'Questions written',
    nextStep: {
      slug: 'phase-2-overview',
      label: 'Continue to Phase 2',
    },
  },
]

/* -------------------------------------------------------------------- */
/*  PHASE 2 · Weeks 3–4                                                 */
/* -------------------------------------------------------------------- */

const phase2: PhaseLesson[] = [
  {
    slug: 'phase-2-overview',
    group: 'phase-2',
    eyebrow: 'Phase 2 · Weeks 3–4',
    title: 'Phase 2 — Understanding Your Signals',
    todaysFocus:
      'Begin to read your body\'s signals: labs, symptoms, energy patterns.',
    whyThisMatters:
      'Phase 2 teaches you to read what your body is already telling you. Labs and symptoms are not problems — they are clues. Reading them gently shapes a more personal plan.',
    steps: [
      'Read this overview.',
      'Open "Lab Patterns as Clues" — your labs are conversations, not verdicts.',
      'Open "Symptoms as Clues" — patterns matter more than single days.',
      'Begin to refine your food plan based on what you noticed in Phase 1.',
      'Add a small blood-sugar habit (more on the next pages).',
    ],
    supportiveNote:
      'You do not need to be a doctor to read your own body. You just need to listen kindly.',
    checklist: [
      'I read the Phase 2 overview.',
      'I know my labs are clues, not verdicts.',
      'I know my symptoms are clues, not failures.',
    ],
    caregiverNote:
      'Phase 2 can feel like there is more to "know." Reassure your loved one: they are not being tested.',
    reflection:
      'What signal has your body sent you most clearly in the last two weeks?',
    drThomasQuestion:
      'Which labs do you most want me to track during this protocol?',
    tracker: 'Phase 2 started',
    nextStep: {
      slug: 'lab-patterns-as-clues',
      label: 'Lab Patterns as Clues',
    },
  },
  {
    slug: 'lab-patterns-as-clues',
    group: 'phase-2',
    eyebrow: 'Phase 2 · Weeks 3–4',
    title: 'Lab Patterns as Clues',
    todaysFocus:
      'Labs are not grades. They are signals about what your body is dealing with.',
    whyThisMatters:
      'In the Bredesen approach, no single lab tells the whole story. Patterns of labs together — blood sugar, inflammation, hormones, vitamins — paint a picture of where to focus.',
    steps: [
      'Open your most recent labs (Healthie, paper copy, or our portal).',
      'Look at the trend over time, not just today\'s number.',
      'Notice which labs are flagged. Do not panic about any one.',
      'Note any lab you do not understand — that is a question for Dr. Thomas.',
      'Highlight the labs Dr. Thomas has marked as important for you.',
    ],
    supportiveNote:
      'A flag on a lab is a signal, not a sentence. Most flags respond beautifully to lifestyle changes over months.',
    checklist: [
      'I looked at my recent labs.',
      'I noticed the trend.',
      'I noted any number I did not understand.',
    ],
    reflection:
      'Which lab feels most confusing? Which feels most reassuring?',
    drThomasQuestion:
      'Which of my flagged labs are most important to focus on first?',
    tracker: 'Reviewed lab patterns',
    nextStep: {
      slug: 'symptoms-as-clues',
      label: 'Symptoms as Clues',
    },
  },
  {
    slug: 'symptoms-as-clues',
    group: 'phase-2',
    eyebrow: 'Phase 2 · Weeks 3–4',
    title: 'Symptoms as Clues',
    todaysFocus:
      'Notice which symptoms come and go together. Patterns are the message.',
    whyThisMatters:
      'A single afternoon of brain fog is just a day. Brain fog every afternoon at 3pm — paired with hunger or stress — is a pattern worth gently exploring.',
    steps: [
      'Look at your last two weeks of journal entries (or memory).',
      'Notice if any symptom shows up at the same time of day.',
      'Notice if any symptom follows a particular food, drink, or activity.',
      'Notice if any symptom lifts after sleep, walking, or breath practice.',
      'Write down one pattern you observed.',
    ],
    supportiveNote:
      'Reading your own body gets easier with practice. A two-week look is plenty to start.',
    checklist: [
      'I looked at my last two weeks.',
      'I noticed at least one pattern.',
      'I wrote it down.',
    ],
    reflection:
      'What is the pattern your body has been showing you?',
    drThomasQuestion:
      'Is the pattern I noticed worth investigating clinically?',
    tracker: 'Pattern observed',
    nextStep: {
      slug: 'personalized-nutrition',
      label: 'Personalized Nutrition Refinement',
    },
  },
  {
    slug: 'personalized-nutrition',
    group: 'phase-2',
    eyebrow: 'Phase 2 · Weeks 3–4',
    title: 'Personalized Nutrition — Refinement',
    todaysFocus:
      'Adjust your eating gently based on what you noticed in Phase 1.',
    whyThisMatters:
      'Generic plans help everyone a little. Personal plans — built from what your body shows you — help you a lot. We adjust, gently, in Phase 2.',
    steps: [
      'Look at the food baseline you wrote in Phase 1.',
      'Pick the meal that left you feeling worst — change one thing about it.',
      'Pick the meal that left you feeling best — repeat it twice this week.',
      'If a food caused a symptom (bloating, fog, energy crash), gently take it out for two weeks and see.',
      'Eat protein with every meal. The brain loves steady protein.',
    ],
    supportiveNote:
      'You are not on a diet. You are listening to your body and gently adjusting.',
    checklist: [
      'I picked one meal to change.',
      'I picked one meal to repeat.',
      'I planned protein with every meal.',
    ],
    caregiverNote:
      'If you cook together, ask before changing recipes. The patient is the expert on their own body.',
    reflection:
      'Which food do you trust to make you feel good? Which makes you feel worse?',
    drThomasQuestion:
      'Are there any foods I should avoid during Phase 2 because of my labs or medications?',
    tracker: 'Nutrition adjusted',
    nextStep: {
      slug: 'blood-sugar-stability',
      label: 'Blood Sugar Stability',
    },
  },
  {
    slug: 'blood-sugar-stability',
    group: 'phase-2',
    eyebrow: 'Phase 2 · Weeks 3–4',
    title: 'Simple Steps to Control Blood Sugar',
    todaysFocus:
      'Steady blood sugar is one of the kindest things you can do for your brain.',
    whyThisMatters:
      'Blood sugar that swings high and low affects mood, focus, sleep, and memory in the same hour. Stable glucose helps every brain system.',
    steps: [
      'Eat protein at every meal. 20–30 g at breakfast is the sweet spot.',
      'Start meals with vegetables, then protein, then starches. Same meal, gentler curve.',
      'Take a 10-minute walk after dinner when you can.',
      'Drink a glass of water before coffee.',
      'Be cautious with juices, sweet teas, and alcohol — they spike fast.',
      'Aim for a 12-hour overnight window between dinner and breakfast (e.g. 7pm to 7am).',
    ],
    supportiveNote:
      'You do not have to do all six. Doing two consistently is more powerful than doing six once.',
    checklist: [
      'I added protein to breakfast.',
      'I started one meal with vegetables.',
      'I walked after dinner.',
      'I drank water before coffee.',
      'I tracked my overnight fast window.',
    ],
    reflection:
      'Which of these six felt easiest? Which afternoon energy did you notice?',
    drThomasQuestion:
      'I take medication for blood sugar. Should I adjust the timing or anything else when I add these habits?',
    tracker: 'Blood sugar steps practiced',
    nextStep: {
      slug: 'cooking-oils-guide',
      label: 'Cooking Oils — Full Guide',
    },
  },
  {
    slug: 'cooking-oils-guide',
    group: 'phase-2',
    eyebrow: 'Phase 2 · Weeks 3–4',
    title: 'Guide to Cooking Oils',
    todaysFocus:
      'A deeper look at oils. Make this decision once and your kitchen is brain-friendly forever.',
    whyThisMatters:
      'Of all the kitchen choices, the oil you cook with is one of the few that affects every meal. Choose well, once, and the work is mostly done.',
    steps: [
      'Pick a primary oil for daily cooking: extra virgin olive oil.',
      'Pick a secondary oil for high heat (rare): avocado oil.',
      'Use cold-pressed flax or walnut oil for salads only — never heat them.',
      'Avoid frequent use of: corn, soybean, "vegetable" blend, sunflower, safflower, canola.',
      'Read labels — "partially hydrogenated" or "hydrogenated" means trans fats. Skip those.',
      'Store oils away from heat and light. Replace olive oil every 6 months.',
    ],
    supportiveNote:
      'You do not have to throw out the oil you have. Use it up, then choose better.',
    checklist: [
      'I have olive oil at home.',
      'I read the label of my current oil.',
      'I planned my next oil purchase.',
    ],
    reflection:
      'What oil have you been cooking with? Will that change?',
    tracker: 'Read oils guide',
    nextStep: {
      slug: 'supplement-safety',
      label: 'Supplement Safety',
    },
  },
  {
    slug: 'supplement-safety',
    group: 'phase-2',
    eyebrow: 'Phase 2 · Weeks 3–4',
    title: 'Supplement Safety — Ask Dr. Thomas First',
    todaysFocus:
      'A clear, kind reminder: supplements are real medicine. We do not start them on our own.',
    whyThisMatters:
      'Many supplements interact with medications, kidney function, blood thinners, hormones, and other supplements. The Bredesen Protocol uses some supplements thoughtfully — but only with medical guidance.',
    steps: [
      'Make a list of everything you currently take, including over-the-counter.',
      'Note dose, time of day, and reason if you remember.',
      'Bring the list to Dr. Thomas at your next visit.',
      'Do NOT add a new supplement based on a podcast, friend, or website.',
      'Do NOT stop a current supplement without telling Dr. Thomas.',
      'Save labels and bottles when possible — Dr. Thomas may want to see them.',
    ],
    supportiveNote:
      'Asking before changing supplements is not over-cautious. It is wise care.',
    checklist: [
      'I made a list of everything I take.',
      'I noted doses.',
      'I have the list ready for Dr. Thomas.',
    ],
    caregiverNote:
      'If you manage supplements at home, the list is your gift. Bring photos of bottles if needed.',
    reflection:
      'Which supplement, if any, do you wonder about most?',
    drThomasQuestion:
      'Here is my full list — which should I keep, which should I stop, which would you add?',
    tracker: 'Supplement list ready',
    nextStep: {
      slug: 'nervous-system-regulation',
      label: 'Nervous System Regulation',
    },
  },
  {
    slug: 'nervous-system-regulation',
    group: 'phase-2',
    eyebrow: 'Phase 2 · Weeks 3–4',
    title: 'Nervous System Regulation',
    todaysFocus:
      'A few minutes of nervous-system care daily. Tiny, but real.',
    whyThisMatters:
      'Chronic stress changes the brain over years. The nervous system is responsive — small daily practices can shift it from "alert" to "rest and repair." This is foundational, not optional.',
    steps: [
      'Practice extended exhales: in for 4, out for 6, for two minutes.',
      'Try humming for 60 seconds — it stimulates the vagus nerve.',
      'Try the 5-4-3-2-1 grounding: 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.',
      'Pick one of these and do it daily for a week.',
      'Notice any change in your body when you finish.',
    ],
    supportiveNote:
      'Two minutes of slow breath is a real practice. Not a "next-step-up to twenty minutes someday."',
    checklist: [
      'I tried extended exhales.',
      'I tried humming or grounding.',
      'I picked one for daily practice.',
      'I noticed how my body felt after.',
    ],
    caregiverNote:
      'Do these together. They feel different — and lovelier — with two people.',
    reflection:
      'Which practice felt most calming? Which felt awkward?',
    drThomasQuestion:
      'I have anxiety / panic / a heart condition — should I avoid any of these?',
    tracker: 'Nervous-system practice done',
    nextStep: {
      slug: 'phase-2-weekly-reflection',
      label: 'Weekly Reflection',
    },
  },
  {
    slug: 'phase-2-weekly-reflection',
    group: 'phase-2',
    eyebrow: 'Phase 2 · Weeks 3–4',
    title: 'Phase 2 Weekly Reflection',
    todaysFocus:
      'A short, kind look back at the last two weeks.',
    whyThisMatters:
      'Reflection turns experience into learning. A few minutes here builds the self-knowledge that carries you through the rest of the program.',
    steps: [
      'What is one habit from Phase 2 that felt good?',
      'What is one habit that felt heavy?',
      'What is one symptom that has shifted, even a little?',
      'What is one question you want to bring to Dr. Thomas?',
      'What is one thing you will keep, regardless of the rest?',
    ],
    supportiveNote:
      'If this phase felt confusing or discouraging — that is normal. Phase 2 is the densest. It will quiet down again.',
    checklist: [
      'I answered the five reflection questions.',
      'I wrote down a question for Dr. Thomas.',
      'I gave myself credit for what I have done.',
    ],
    caregiverNote:
      'If they feel discouraged, sit close and remind them: this is the hardest learning phase. It eases from here.',
    reflection:
      'What is one thing about your body or brain you understand better today than two weeks ago?',
    drThomasQuestion:
      'Here is what shifted, here is what felt heavy — what would you adjust?',
    tracker: 'Phase 2 reflection done',
    nextStep: {
      slug: 'phase-3-overview',
      label: 'Continue to Phase 3',
    },
  },
]

/* -------------------------------------------------------------------- */
/*  PHASE 3 · Weeks 5–7                                                 */
/* -------------------------------------------------------------------- */

const phase3: PhaseLesson[] = [
  {
    slug: 'phase-3-overview',
    group: 'phase-3',
    eyebrow: 'Phase 3 · Weeks 5–7',
    title: 'Phase 3 — Deeper Habit Building',
    todaysFocus:
      'The habits you have begun start to settle in. Phase 3 deepens what is working.',
    whyThisMatters:
      'Habits stick when they are anchored to other parts of life. Phase 3 takes the small wins of the first month and gives them roots.',
    steps: [
      'Read this overview.',
      'Pick the two or three habits from Phases 1 and 2 that felt good.',
      'Pair each habit to an existing daily anchor (after breakfast, before bed, after coffee).',
      'Practice them in the same order each day for a week.',
      'Add a weekly review — Sunday evenings are ideal.',
    ],
    supportiveNote:
      'You are not starting over in Phase 3. You are deepening what you began.',
    checklist: [
      'I read the Phase 3 overview.',
      'I picked my "carry-forward" habits.',
      'I paired each to an anchor.',
    ],
    caregiverNote:
      'The patient may forget the anchor at first. Gently say the pairing aloud: "after coffee, the breath."',
    reflection:
      'Which two habits feel most worth keeping? Why those two?',
    drThomasQuestion:
      'Are there habits you would specifically like me to keep this phase?',
    tracker: 'Phase 3 started',
    nextStep: {
      slug: 'movement-progression',
      label: 'Movement Progression',
    },
  },
  {
    slug: 'movement-progression',
    group: 'phase-3',
    eyebrow: 'Phase 3 · Weeks 5–7',
    title: 'Movement Progression',
    todaysFocus:
      'A little more movement than Phase 1, in the same gentle spirit.',
    whyThisMatters:
      'The brain rewards consistency more than intensity. Phase 3 nudges movement up by minutes, not miles.',
    steps: [
      'Increase walking from 5 minutes to 10–15 minutes most days.',
      'Add one balance practice: stand on one foot while brushing your teeth.',
      'Add one strength practice: sit-to-stand from a chair, 8 times, twice this week.',
      'After movement, drink water and breathe slowly for one minute.',
      'Track movement on the workbook tracker — even one minute counts.',
    ],
    supportiveNote:
      'Some days are five-minute days. That still counts.',
    checklist: [
      'I walked 10 minutes today.',
      'I practiced balance once today.',
      'I did sit-to-stand twice this week.',
      'I logged my movement.',
    ],
    caregiverNote:
      'A 10-minute walk together is one of the best brain practices in this program. Quiet company is enough.',
    reflection:
      'How did your body feel before and after movement today?',
    drThomasQuestion:
      'Should I be cautious of falls, joint strain, or heart symptoms with this progression?',
    tracker: 'Movement progression done',
    nextStep: {
      slug: 'sleep-consistency',
      label: 'Sleep Consistency',
    },
  },
  {
    slug: 'sleep-consistency',
    group: 'phase-3',
    eyebrow: 'Phase 3 · Weeks 5–7',
    title: 'Sleep Consistency',
    todaysFocus:
      'Same bedtime, same wake time. Most days. That is the secret.',
    whyThisMatters:
      'The brain rebuilds during deep sleep. A consistent rhythm — not a perfect bedtime — is what gives it the chance.',
    steps: [
      'Pick a wake time you can keep most days, including weekends.',
      'Work backward to a bedtime that gives you 7–8 hours.',
      'Dim overhead lights one hour before bed.',
      'Stop eating 2–3 hours before bed.',
      'Get morning light within 30 minutes of waking.',
      'If you wake at night, do not check the time. Slow exhale instead.',
    ],
    supportiveNote:
      'A messy night is okay. The week\'s rhythm matters more than any one night.',
    checklist: [
      'I picked a wake time.',
      'I picked a bedtime.',
      'I dimmed lights one hour before bed.',
      'I got morning light.',
    ],
    caregiverNote:
      'Match your evening rhythm to theirs when you can. Two people winding down together is a beautiful brain practice.',
    reflection:
      'Which night this week felt most restful? What was different?',
    drThomasQuestion:
      'Should I be evaluated for sleep apnea or another sleep concern?',
    tracker: 'Sleep rhythm followed',
    nextStep: {
      slug: 'cognitive-training',
      label: 'Cognitive Training Games',
    },
  },
  {
    slug: 'cognitive-training',
    group: 'phase-3',
    eyebrow: 'Phase 3 · Weeks 5–7',
    title: 'Cognitive Training Games',
    todaysFocus:
      'A few minutes of playful brain challenge, three or four times a week.',
    whyThisMatters:
      'The brain forms new connections when it encounters genuine novelty. Short, varied challenges beat long, single-task drills.',
    steps: [
      'Pick three small games to rotate this week. Examples: name 10 fruits in one minute, count backward from 100 by 7, recall five things from yesterday.',
      'Play one game daily, ideally at the same time.',
      'Try a non-screen game: crossword, sudoku, or a card game with someone.',
      'Try a memory game: read a paragraph, close the book, retell it aloud.',
      'Try a creative game: write a four-line poem, draw a familiar place from memory.',
    ],
    supportiveNote:
      'There is no score. The brain rewards the trying, not the result.',
    checklist: [
      'I picked three games.',
      'I played one today.',
      'I tried a non-screen game this week.',
      'I tried a creative game this week.',
    ],
    caregiverNote:
      'Play together. Two-person games — like 20 Questions or a card game — are excellent brain practice.',
    reflection:
      'Which game felt fun? Which felt frustrating?',
    drThomasQuestion:
      'Are there cognitive areas I should specifically practice — memory, word recall, processing speed?',
    tracker: 'Brain games played',
    nextStep: {
      slug: 'food-consistency',
      label: 'Food Consistency Review',
    },
  },
  {
    slug: 'food-consistency',
    group: 'phase-3',
    eyebrow: 'Phase 3 · Weeks 5–7',
    title: 'Food Consistency Review',
    todaysFocus:
      'A short review of what is working in your eating, and what to refine.',
    whyThisMatters:
      'By Phase 3, you know your body better. We use that knowledge to gently lock in what helps.',
    steps: [
      'List the three meals you have made most often in the last month.',
      'Score each one for how you felt afterward — energy, focus, mood.',
      'Identify the meals that consistently make you feel good. Repeat them more.',
      'Identify the meals that drain you. Adjust or replace them.',
      'Add one new brain-friendly recipe this week from the recipe library.',
    ],
    supportiveNote:
      'Eating the same good meal twice a week is not boring. It is brain medicine.',
    checklist: [
      'I listed my three most-eaten meals.',
      'I scored how I felt after each.',
      'I am repeating my best meal twice this week.',
      'I am adding one new meal this week.',
    ],
    reflection:
      'Which meal makes you feel best? Which makes you feel worst?',
    drThomasQuestion:
      'Are there food adjustments specific to my labs that you would suggest?',
    tracker: 'Food consistency reviewed',
    nextStep: {
      slug: 'caregiver-observation-checkin',
      label: 'Caregiver Observation Check-In',
    },
  },
  {
    slug: 'caregiver-observation-checkin',
    group: 'phase-3',
    eyebrow: 'Phase 3 · Weeks 5–7',
    title: 'Caregiver Observation Check-In',
    todaysFocus:
      'A short check-in for the caregiver — what they have noticed, gently shared.',
    whyThisMatters:
      'Caregivers see things that are hard to see from the inside. Their observations help shape better care.',
    steps: [
      'Caregiver: write three things you have noticed in the last few weeks. Examples: word recall, sleep, mood, energy, balance.',
      'Note one thing that seems easier than it was at Week 1.',
      'Note one thing that still feels hard.',
      'Share these gently with your loved one — read them aloud or hand them the page.',
      'Bring the list to the next Dr. Thomas visit.',
    ],
    supportiveNote:
      'Caregiver, your observations are valued. They are not complaints — they are care.',
    checklist: [
      'I wrote three observations.',
      'I shared them gently.',
      'I noted one thing easier and one thing harder.',
    ],
    caregiverNote:
      'Lead with what is easier. Always.',
    reflection:
      'What is one thing you have noticed that you have not yet said aloud?',
    drThomasQuestion:
      'Caregiver: would these observations be useful at the next visit?',
    tracker: 'Caregiver check-in done',
    nextStep: {
      slug: 'troubleshooting',
      label: 'Troubleshooting Common Obstacles',
    },
  },
  {
    slug: 'troubleshooting',
    group: 'phase-3',
    eyebrow: 'Phase 3 · Weeks 5–7',
    title: 'Troubleshooting Common Obstacles',
    todaysFocus:
      'A page for when something is not working. Read this with kindness, not judgment.',
    whyThisMatters:
      'Every patient hits walls in the second month. Naming the obstacle helps you move past it.',
    steps: [
      '"I keep forgetting to do the workbook." → Pair it to coffee or tea. Open the workbook BEFORE the first sip.',
      '"I am overwhelmed by the food changes." → Pick ONE meal to keep "Bredesen-style." Eat the rest however you can.',
      '"I cannot sleep." → Write down what you ate, drank, and did after 5pm. The pattern often appears in three nights.',
      '"I am too tired to walk." → Walk for 90 seconds. Indoors. That counts.',
      '"I had a hard day and ate badly." → Mark the day done anyway. Skip nothing tomorrow.',
      '"I do not feel different." → Open Phase 1 baseline and compare. Brain change is quiet.',
    ],
    supportiveNote:
      'Hitting walls is not a sign you are doing it wrong. It is a sign you are actually doing it.',
    checklist: [
      'I read the troubleshooting list.',
      'I picked the obstacle that fits today.',
      'I tried the suggested response.',
    ],
    caregiverNote:
      'Read this page when you feel impatient. They are not failing. They are working.',
    reflection:
      'Which obstacle have you bumped into most? What helped, even a little?',
    drThomasQuestion:
      'Here is what is not working — what would you adjust?',
    tracker: 'Troubleshooting read',
    nextStep: {
      slug: 'social-connection',
      label: 'Social Connection / New Learning',
    },
  },
  {
    slug: 'social-connection',
    group: 'phase-3',
    eyebrow: 'Phase 3 · Weeks 5–7',
    title: 'Social Connection or a New Learning',
    todaysFocus:
      'One social moment or one new learning, this week. The brain loves both.',
    whyThisMatters:
      'Loneliness and isolation are independent risk factors for cognitive decline. Connection — even small — helps. So does learning anything new.',
    steps: [
      'Pick one social action: a phone call, a coffee, a walk with a friend, a card to someone you miss.',
      'OR pick one learning: a podcast episode, a YouTube lecture, a book chapter, a recipe in a new cuisine.',
      'Do it this week.',
      'Note one small thing you learned or felt afterward.',
      'Try to alternate connection-week / learning-week through Phase 4.',
    ],
    supportiveNote:
      'A 10-minute call counts. A 4-minute podcast counts. Connection and learning are not heavy lifts.',
    checklist: [
      'I planned one social or learning action.',
      'I did it.',
      'I noted what I felt or learned.',
    ],
    caregiverNote:
      'Suggest a friend to call. Help dial. Stay nearby. Five minutes is plenty.',
    reflection:
      'When did you last feel a moment of real connection? What about real learning?',
    tracker: 'Connection or learning done',
    nextStep: {
      slug: 'phase-3-progress-review',
      label: 'Weekly Progress Review',
    },
  },
  {
    slug: 'phase-3-progress-review',
    group: 'phase-3',
    eyebrow: 'Phase 3 · Weeks 5–7',
    title: 'Weekly Progress Review',
    todaysFocus:
      'A simple two-question review: what is working, what needs support.',
    whyThisMatters:
      'Naming what works tells you where to invest. Naming what needs support tells you where to ask for help.',
    steps: [
      'Open your journal.',
      'Write: "What is working?" — list three things, however small.',
      'Write: "What needs support?" — list one to three things.',
      'Pick one item from "needs support" to bring to Dr. Thomas or to the workbook helpers.',
      'Save the page. Read it next Sunday.',
    ],
    supportiveNote:
      'A short review is more useful than a long one. Three lines is plenty.',
    checklist: [
      'I wrote what is working.',
      'I wrote what needs support.',
      'I picked one item to ask for help with.',
    ],
    caregiverNote:
      'Add your own three answers. Two perspectives reveal more than one.',
    reflection:
      'What is the one thing about this program that has surprised you most?',
    drThomasQuestion:
      'Here is what is working and what is not. What should we focus on next?',
    tracker: 'Progress review done',
    nextStep: {
      slug: 'phase-4-overview',
      label: 'Continue to Phase 4',
    },
  },
]

/* -------------------------------------------------------------------- */
/*  PHASE 4 · Weeks 8–9                                                 */
/* -------------------------------------------------------------------- */

const phase4: PhaseLesson[] = [
  {
    slug: 'phase-4-overview',
    group: 'phase-4',
    eyebrow: 'Phase 4 · Weeks 8–9',
    title: 'Phase 4 — Integration',
    todaysFocus:
      'Bring the pieces together. Decide what travels forward.',
    whyThisMatters:
      'Phase 4 is integration. We choose the habits worth keeping, troubleshoot the ones not working, and prepare for the longer road ahead.',
    steps: [
      'Read this overview.',
      'Open "What to continue" and write your list.',
      'Open "What to adjust" and pick one thing.',
      'Open "What to celebrate" — yes, please.',
      'Open "What needs more support" and prepare your Dr. Thomas list.',
      'Plan the first month of post-program rhythm.',
    ],
    supportiveNote:
      'You have been working for two months. That is real. Take a breath.',
    checklist: [
      'I read the Phase 4 overview.',
      'I started my "continue / adjust / celebrate / support" lists.',
    ],
    caregiverNote:
      'Sit with them through this phase. Integration is gentle but emotional.',
    reflection:
      'What part of you feels different from two months ago?',
    tracker: 'Phase 4 started',
    nextStep: {
      slug: 'what-to-continue',
      label: 'What to Continue',
    },
  },
  {
    slug: 'what-to-continue',
    group: 'phase-4',
    eyebrow: 'Phase 4 · Weeks 8–9',
    title: 'What to Continue',
    todaysFocus:
      'The list of habits that have proven worth their keep.',
    whyThisMatters:
      'Naming what works locks it in. Three habits, well-tended, will outpace ten habits half-attempted.',
    steps: [
      'List every habit you tried in the last 8 weeks.',
      'Mark the three that have most consistently helped.',
      'Mark how you feel before and after each one.',
      'Write the three on a sticky note. Put it on the fridge.',
      'Commit to keeping these three for the rest of the program AND beyond.',
    ],
    supportiveNote:
      'Three habits is the right number. Not five, not ten. Three.',
    checklist: [
      'I listed all my habits.',
      'I picked my top three.',
      'I posted them visibly.',
    ],
    reflection:
      'Which of your three feels most "yours" already?',
    tracker: 'Continue list complete',
    nextStep: {
      slug: 'what-to-adjust',
      label: 'What to Adjust',
    },
  },
  {
    slug: 'what-to-adjust',
    group: 'phase-4',
    eyebrow: 'Phase 4 · Weeks 8–9',
    title: 'What to Adjust',
    todaysFocus:
      'One or two habits that almost worked. Small adjustments, not dramatic changes.',
    whyThisMatters:
      'Most habits do not need to be abandoned. They need a small change — a different time, a different anchor, a different size.',
    steps: [
      'List two habits that "almost worked."',
      'For each, ask: time of day okay? Anchor okay? Size of habit okay?',
      'Change ONE thing about each habit.',
      'Try the adjusted version for one week.',
      'Reassess at the end of the week — keep, adjust again, or release.',
    ],
    supportiveNote:
      'Adjusting is not failing. It is fitting the habit to the life you actually have.',
    checklist: [
      'I picked two habits to adjust.',
      'I changed ONE thing about each.',
      'I am trying the adjusted version this week.',
    ],
    reflection:
      'What is one small adjustment you have made that surprised you with how well it worked?',
    drThomasQuestion:
      'I am adjusting these habits — anything you would adjust differently?',
    tracker: 'Adjustments planned',
    nextStep: {
      slug: 'what-to-celebrate',
      label: 'What to Celebrate',
    },
  },
  {
    slug: 'what-to-celebrate',
    group: 'phase-4',
    eyebrow: 'Phase 4 · Weeks 8–9',
    title: 'What to Celebrate',
    todaysFocus:
      'Real celebration. Out loud. Even quietly.',
    whyThisMatters:
      'The brain reinforces what it celebrates. Naming progress aloud — even small progress — is a learning event.',
    steps: [
      'Open your journal or sit with paper.',
      'Write: "Eight weeks ago, I could not / was not / felt..."',
      'Write: "Today, I can / I am / I feel..."',
      'Read the comparison aloud. Yes, aloud.',
      'Tell a caregiver, friend, or Dr. Thomas one thing you are proud of.',
    ],
    supportiveNote:
      'Saying "I am proud of myself" is a brain-healthy sentence. Try it.',
    checklist: [
      'I wrote my "8 weeks ago" line.',
      'I wrote my "today" line.',
      'I read it aloud.',
      'I told someone one thing I am proud of.',
    ],
    caregiverNote:
      'Caregiver: name a moment of progress out loud. They will notice.',
    reflection:
      'What is the change you are quietly most proud of?',
    tracker: 'Celebration done',
    nextStep: {
      slug: 'what-needs-more-support',
      label: 'What Needs More Support',
    },
  },
  {
    slug: 'what-needs-more-support',
    group: 'phase-4',
    eyebrow: 'Phase 4 · Weeks 8–9',
    title: 'What Needs More Support',
    todaysFocus:
      'Honestly name what is still hard. Then ask for help.',
    whyThisMatters:
      'Asking for help is not failure. It is information. Dr. Thomas, the workbook, and your caregiver are all support systems.',
    steps: [
      'List up to three things that are still hard.',
      'For each, ask: is this a body thing, a mind thing, a logistics thing, or all of the above?',
      'For each, identify who could help: Dr. Thomas, caregiver, the workbook, a friend.',
      'Plan one ask this week.',
      'Make the ask.',
    ],
    supportiveNote:
      'You do not have to do this alone. You were never meant to.',
    checklist: [
      'I listed up to three hard things.',
      'I identified who could help.',
      'I planned one ask this week.',
    ],
    caregiverNote:
      'If they are reluctant to ask, offer to ask alongside them. Two voices are gentler than one.',
    reflection:
      'What is the help you most need right now?',
    drThomasQuestion:
      'Here is what is still hard. What would you suggest as the next step?',
    tracker: 'Support plan written',
    nextStep: {
      slug: 'preparing-questions-for-dr-thomas',
      label: 'Preparing Questions for Dr. Thomas',
    },
  },
  {
    slug: 'preparing-questions-for-dr-thomas',
    group: 'phase-4',
    eyebrow: 'Phase 4 · Weeks 8–9',
    title: 'Preparing Questions for Dr. Thomas',
    todaysFocus:
      'A focused list. Not too long. Not too short.',
    whyThisMatters:
      'Dr. Thomas wants to help with what is most pressing. A short, prioritized list helps both of you.',
    steps: [
      'Write your top three questions.',
      'Write any new symptom that has emerged.',
      'Write any habit you are unsure about (food, sleep, supplement, exercise).',
      'Write your caregiver\'s top observation.',
      'Save or print the page. Bring it to your visit.',
    ],
    supportiveNote:
      'A short list of three questions, asked clearly, is worth more than ten asked in a rush.',
    checklist: [
      'I wrote three priority questions.',
      'I noted any new symptoms.',
      'I included my caregiver\'s observation.',
      'The list is saved or printed.',
    ],
    caregiverNote:
      'Add ONE caregiver question. Just one. The most important one.',
    reflection:
      'What is the one answer you most want from this visit?',
    drThomasQuestion:
      'Here are my top three questions for today.',
    tracker: 'Questions prepared',
    nextStep: {
      slug: 'next-phase-planning',
      label: 'Next-Phase Planning',
    },
  },
  {
    slug: 'next-phase-planning',
    group: 'phase-4',
    eyebrow: 'Phase 4 · Weeks 8–9',
    title: 'Next-Phase Planning — Months 3–6',
    todaysFocus:
      'A simple plan for the months ahead. Calm, realistic, kind.',
    whyThisMatters:
      'The first two months built foundation. Months 3–6 deepen and protect it. A plan written in your own words is the best companion for that journey.',
    steps: [
      'Write the three habits you want to keep (from "What to continue").',
      'Write the one adjustment you are testing this month.',
      'Write the one ask for support you have made.',
      'Write Month 3\'s focus: sleep, oxygen, stress regulation, and cognitive training.',
      'Write Month 4\'s focus: microplastics, toxin reduction, kitchen environment.',
      'Write Month 5\'s focus: cognitive enrichment, social engagement, strength and balance.',
      'Write Month 6\'s focus: progress review, remaining obstacles, the next 6 months.',
    ],
    supportiveNote:
      'A plan in your own words is more useful than a perfect plan in someone else\'s.',
    checklist: [
      'I wrote my three habits.',
      'I wrote my one adjustment.',
      'I wrote my one ask.',
      'I wrote my four monthly focus areas.',
    ],
    caregiverNote:
      'Help write this together. The plan belongs to both of you.',
    reflection:
      'What is the part of the next four months you are most looking forward to?',
    drThomasQuestion:
      'Here is my plan. What would you change?',
    tracker: 'Plan for months 3–6 written',
    nextStep: {
      slug: 'month-3',
      label: 'Begin Month 3',
    },
  },
]

/* -------------------------------------------------------------------- */
/*  MONTHS 3–6                                                          */
/* -------------------------------------------------------------------- */

const monthsThreeToSix: PhaseLesson[] = [
  {
    slug: 'month-3',
    group: 'months-3-6',
    eyebrow: 'Month 3',
    title: 'Month 3 — Sleep, Oxygen, Stress, Cognition',
    todaysFocus:
      'Deepen the most foundational habits: how you sleep, breathe, and meet stress.',
    whyThisMatters:
      'These four pillars — sleep, oxygen, stress regulation, cognitive training — are the slowest-changing but the most powerful for brain health.',
    steps: [
      'Sleep: hold your wake-time within 30 minutes most days.',
      'Oxygen: practice slow nasal breathing daily — even three minutes.',
      'Stress: use the extended exhale or 5-4-3-2-1 grounding when stressed.',
      'Cognition: rotate three brain games this month.',
      'At end of month: revisit the symptom tracker and compare to Phase 1 baseline.',
    ],
    supportiveNote:
      'A whole month is plenty of time. Do not rush.',
    checklist: [
      'I held a steady wake time this week.',
      'I did one slow-breathing practice today.',
      'I used a stress practice when needed.',
      'I played one brain game this week.',
      'I plan to compare baseline at month-end.',
    ],
    caregiverNote:
      'Match the bedtime / wake-time rhythm if you can. Two people in rhythm is calmer than one.',
    reflection:
      'Which of these four pillars feels strongest? Which feels weakest?',
    drThomasQuestion:
      'Are there sleep or breath issues — apnea, asthma, snoring — I should be evaluated for?',
    tracker: 'Month 3 in progress',
    nextStep: {
      slug: 'month-4',
      label: 'Continue to Month 4',
    },
  },
  {
    slug: 'month-4',
    group: 'months-3-6',
    eyebrow: 'Month 4',
    title: 'Month 4 — Microplastics, Toxins, Kitchen Environment',
    todaysFocus:
      'Lower the everyday chemical load on your body, gently and gradually.',
    whyThisMatters:
      'Microplastics, fragrance, harsh cleaners, and old cookware contribute to inflammation. Lowering daily exposure supports the brain over years.',
    steps: [
      'Replace plastic food storage with glass — over time, as containers wear out.',
      'Replace fragranced laundry detergent and soap with fragrance-free.',
      'Filter drinking water (carbon filter is sufficient).',
      'Open windows for 10 minutes daily, even in winter.',
      'Replace teflon / scratched non-stick pans with stainless steel or cast iron — over time.',
      'Avoid plastic in the microwave — always glass or ceramic.',
    ],
    supportiveNote:
      'You do not have to replace everything. Replace as things wear out.',
    checklist: [
      'I picked one swap this month.',
      'I am drinking filtered water.',
      'I open windows daily.',
      'I do not microwave plastic.',
    ],
    caregiverNote:
      'Help with the physical side — pour, lift, replace. The patient picks; you do the lifting.',
    reflection:
      'Which swap surprised you with how easy it was?',
    drThomasQuestion:
      'Are there specific exposures my labs suggest I should reduce first?',
    tracker: 'Month 4 in progress',
    nextStep: {
      slug: 'making-meals-without-microplastics',
      label: 'Making Meals Without Microplastics',
    },
  },
  {
    slug: 'making-meals-without-microplastics',
    group: 'months-3-6',
    eyebrow: 'Month 4',
    title: 'Making Meals Without Microplastics',
    todaysFocus:
      'Practical, calm steps to keep plastic out of your food.',
    whyThisMatters:
      'Microplastics are now found in human blood, tissues, and the brain. The biggest sources in food are plastic-stored leftovers, plastic-bagged hot foods, plastic cutting boards, and microwaved plastic.',
    steps: [
      'Store leftovers in glass or stainless steel — never microwave plastic.',
      'Use a wooden or stainless cutting board, not plastic.',
      'Avoid plastic bags for hot food — let it cool first, then store.',
      'Choose tea in paper or loose-leaf — most "silken" tea bags are plastic.',
      'Filter your drinking water with a carbon or reverse-osmosis filter.',
      'When buying produce, prefer paper or reusable bags over plastic.',
    ],
    supportiveNote:
      'Replacing as things wear out is a calm, real strategy. You do not need to throw everything out today.',
    checklist: [
      'I have at least one glass storage container.',
      'I have a wood or steel cutting board.',
      'I do not microwave plastic.',
      'I switched to non-plastic tea bags.',
    ],
    caregiverNote:
      'This is a beautiful month for an honest pantry update. Take it slow.',
    reflection:
      'Which plastic in your kitchen feels easiest to replace? Hardest?',
    tracker: 'Microplastic-free meal practiced',
    nextStep: {
      slug: 'month-5',
      label: 'Continue to Month 5',
    },
  },
  {
    slug: 'month-5',
    group: 'months-3-6',
    eyebrow: 'Month 5',
    title: 'Month 5 — Enrichment, Social Engagement, Strength & Balance',
    todaysFocus:
      'A month of enrichment: more learning, more connection, more strength.',
    whyThisMatters:
      'Cognitive enrichment, social bonds, and physical strength all independently protect the brain. Stack two or three of them and the effect compounds.',
    steps: [
      'Pick one new learning to start: a class, a book, a skill, a language.',
      'Pick one social commitment: a weekly call, a coffee, a club, a volunteer hour.',
      'Pick one strength practice: sit-to-stand, wall push-ups, light weights, resistance band.',
      'Pick one balance practice: one-foot stand, slow heel-to-toe walk, tai chi video.',
      'Do each at least twice a week, gently.',
    ],
    supportiveNote:
      'Twice a week is plenty. Slow and joyful beats fast and forced.',
    checklist: [
      'I started one new learning.',
      'I planned one social rhythm.',
      'I added one strength practice.',
      'I added one balance practice.',
    ],
    caregiverNote:
      'Pair their social commitment with yours when you can. Joy spreads.',
    reflection:
      'Which of these four feels most life-giving?',
    drThomasQuestion:
      'Are there strength or balance limits I should respect because of joints or balance history?',
    tracker: 'Month 5 in progress',
    nextStep: {
      slug: 'month-6',
      label: 'Continue to Month 6',
    },
  },
  {
    slug: 'month-6',
    group: 'months-3-6',
    eyebrow: 'Month 6',
    title: 'Month 6 — Progress Review and the Next Six Months',
    todaysFocus:
      'A full review. A clear plan for the next six months. A celebration.',
    whyThisMatters:
      'Six months of practice deserves a real review. The next six months need a real plan. And the work — quietly, gently — deserves a real celebration.',
    steps: [
      'Reopen Phase 1 baseline. Compare to today.',
      'List five things that have measurably improved.',
      'List up to three things that still need work.',
      'Write your "Top 3 habits to keep forever."',
      'Plan a Dr. Thomas visit to review labs and the next six months.',
      'Celebrate. Out loud. With a person you love.',
    ],
    supportiveNote:
      'Six months of showing up is a real achievement. We mean it.',
    checklist: [
      'I compared baseline to today.',
      'I listed five improvements.',
      'I listed up to three remaining areas.',
      'I picked my forever-three.',
      'I scheduled a check-in with Dr. Thomas.',
      'I celebrated.',
    ],
    caregiverNote:
      'Caregiver: write your own list of five things you have noticed improve. Read it to them. Then celebrate together.',
    reflection:
      'What is the change you are most surprised by? What is the change you are most proud of?',
    drThomasQuestion:
      'Here is my six-month review. What is your plan for the next six?',
    tracker: 'Six-month review complete',
    nextStep: {
      slug: 'welcome',
      label: 'Return to Start Here',
    },
  },
]

/* -------------------------------------------------------------------- */

export const phaseLessons: PhaseLesson[] = [
  ...startHere,
  ...phase1,
  ...phase2,
  ...phase3,
  ...phase4,
  ...monthsThreeToSix,
]

export const phaseLessonGroups: {
  key: PhaseLesson['group']
  title: string
  blurb: string
}[] = [
  {
    key: 'start-here',
    title: 'Start Here',
    blurb:
      'Welcome, orientation, your first day, caregiver intro, and a page for when this feels too big.',
  },
  {
    key: 'phase-1',
    title: 'Phase 1 · Weeks 1–2',
    blurb:
      'Foundations and baseline. Pantry audit, healthy brain foods, your first easy swaps.',
  },
  {
    key: 'phase-2',
    title: 'Phase 2 · Weeks 3–4',
    blurb:
      'Reading your signals. Personalizing food. Blood sugar. Cooking oils. Nervous system.',
  },
  {
    key: 'phase-3',
    title: 'Phase 3 · Weeks 5–7',
    blurb:
      'Deeper habits. Movement progression. Sleep consistency. Brain games. Caregiver check-ins.',
  },
  {
    key: 'phase-4',
    title: 'Phase 4 · Weeks 8–9',
    blurb:
      'Integration. What to continue, adjust, celebrate, and bring to Dr. Thomas.',
  },
  {
    key: 'months-3-6',
    title: 'Months 3–6',
    blurb:
      'Sleep + breath + stress + cognition; microplastics and kitchen environment; enrichment, connection, strength; six-month review.',
  },
]

export function getLesson(slug: string): PhaseLesson | undefined {
  return phaseLessons.find((l) => l.slug === slug)
}

export function lessonsForGroup(
  group: PhaseLesson['group'],
): PhaseLesson[] {
  return phaseLessons.filter((l) => l.group === group)
}

/**
 * Map a workbook week (1..24) to its most-relevant built-in lesson, used
 * to surface "the lesson that goes with where you are right now" on the
 * Today page.
 */
export function lessonForWeek(week: number): PhaseLesson {
  if (week <= 0) return phaseLessons[0]
  if (week === 1) return getLesson('phase-1-overview')!
  if (week === 2) return getLesson('kitchen-reset')!
  if (week === 3) return getLesson('phase-2-overview')!
  if (week === 4) return getLesson('blood-sugar-stability')!
  if (week === 5) return getLesson('phase-3-overview')!
  if (week === 6) return getLesson('movement-progression')!
  if (week === 7) return getLesson('cognitive-training')!
  if (week === 8) return getLesson('phase-4-overview')!
  if (week === 9) return getLesson('what-to-continue')!
  if (week >= 10 && week <= 13) return getLesson('month-3')!
  if (week >= 14 && week <= 17) return getLesson('month-4')!
  if (week >= 18 && week <= 21) return getLesson('month-5')!
  return getLesson('month-6')!
}
