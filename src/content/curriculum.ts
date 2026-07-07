/**
 * 24-Week Curriculum (168 days)
 * -----------------------------
 * Each week has a theme and 7 daily pages. Day-of-week pages follow a
 * consistent rhythm so patients always know what today is about:
 *   Day 1 — Learn the week's theme
 *   Day 2 — Practice (gentle)
 *   Day 3 — Kitchen / food focus
 *   Day 4 — Movement focus
 *   Day 5 — Friday: small celebration + dessert
 *   Day 6 — Environment / body-care focus
 *   Day 7 — Weekly reflection
 *
 * Meals, quotes, games, and journal prompts are provided by the
 * rotation engines in `meals.ts`, `quotes.ts`, `workbookGames.ts`, and
 * `journalPrompts.ts`. This file owns the "what is today about"
 * question.
 */

import { mealsForDay, type DailyMeals } from './meals'
import { quoteForDay, type Quote } from './quotes'
import { gameForDay, type WorkbookGame } from './workbookGames'
import { promptForDay, type JournalPrompt } from './journalPrompts'
import { MATERIALS, type Material, type MaterialKey } from './materials'
import { phaseForWeek } from '@/lib/program'

export type WeekTheme = {
  week: number
  title: string
  tagline: string
  focus: string
  lessonTitle: string
  lessonSummary: string
  checklistBase: string[] // 4-6 items per week used across all 7 days
  movementFocus: string
  breathworkFocus: string
  environmentFocus: string
  reflectionPrompt: string
  /** Supporting video that backs up this week's lesson. */
  video?: MaterialKey
  /** One primary article or handout for this week. */
  article?: MaterialKey
  /** Any extra clinic materials to surface gently on Day 1 of the week. */
  materials?: MaterialKey[]
}

export const weekThemes: WeekTheme[] = [
  // ----- PHASE 1 — Foundations, Reset & Orientation (Weeks 1-4) -----
  {
    week: 1,
    title: 'Welcome, Pantry Audit & a Gentler Home',
    tagline: 'Start the program. Look at your kitchen. Lighten the load at home.',
    focus:
      'Your first week is a warm welcome and two small practical starts: look through your kitchen with the Pantry Audit, and take one easy step to reduce toxic load at home. Nothing is thrown out in a rush. Nothing is judged.',
    lessonTitle: 'How we begin: welcome, kitchen, and a calmer home',
    lessonSummary:
      'Today you meet the workbook. Then you walk the kitchen with the Pantry Audit — a one-page clinic checklist. Then you open the Environmental Toxicity e-book and pick one small swap. Small, calm, consistent steps are the whole strategy.',
    checklistBase: [
      'Watch the short welcome video from Dr. Thomas',
      'Open the Pantry Audit checklist and walk one shelf',
      'Read one page of the Toxic Load e-book',
      'Drink a full glass of water before breakfast',
      'Step outside for 5 minutes',
      'Write one line in your journal',
    ],
    movementFocus: 'A 5-minute gentle walk or seated stretch',
    breathworkFocus: '3-minute extended exhale',
    environmentFocus: 'Open a window for fresh air',
    reflectionPrompt: 'What felt manageable this week?',
    video: 'welcomeVideo',
    article: 'pantryAudit',
    materials: ['kitchenReset', 'toxicLoadEbook', 'phase1Guide'],
  },
  {
    week: 2,
    title: 'Kitchen Pantry Audit',
    tagline: 'A calm look at what is on the shelves.',
    focus:
      'This week you gently look at what is in your pantry. Nothing is thrown out in a rush. You just notice, and over a few days you make one or two brain-friendly swaps.',
    lessonTitle: 'Reading labels without getting overwhelmed',
    lessonSummary:
      'We focus on three things: added sugar, hydrogenated oils, and artificial colors. Everything else can wait. One shelf at a time is enough.',
    checklistBase: [
      'Open one cabinet and look — no changes yet',
      'Make a short list of 3 foods that do not serve you',
      'Move trigger snacks to a less visible spot',
      'Add one brain-healthy swap to the grocery list',
      'Notice how you feel about the process',
    ],
    movementFocus: 'Two 5-minute walks — morning and afternoon',
    breathworkFocus: 'Morning reset breath (2 minutes)',
    environmentFocus: 'Wipe down one counter — a small clear space matters',
    reflectionPrompt: 'Which swap felt easiest this week?',
    video: 'bredesenBrainHealthTalk',
    article: 'kitchenReset',
    materials: ['pantryAudit', 'module2'],
  },
  {
    week: 3,
    title: 'Pantry Reset & Brain-Healthy Swaps',
    tagline: 'Small swaps, big cumulative effect.',
    focus:
      'Building on last week\'s audit. Now we shop with intention. We add healthy fats, whole-food breakfasts, and a handful of brain-supportive staples.',
    lessonTitle: 'Healthy fats the brain loves',
    lessonSummary:
      'Olive oil, avocados, wild fish, and nuts. The brain is 60% fat; give it the good kind. A spoon of olive oil a day is a meaningful thing.',
    checklistBase: [
      'Add olive oil and avocado to the grocery list',
      'Replace one processed snack with a whole-food snack',
      'Pick one brain-healthy breakfast to try',
      'Read labels on one product you use often',
      'Make a 3-item "keep stocked" list',
    ],
    movementFocus: '10-minute walk after one meal',
    breathworkFocus: 'Hand on heart breath before bed',
    environmentFocus: 'Stock the kitchen with a bowl of fresh fruit',
    reflectionPrompt: 'What is one swap you want to keep?',
    video: 'bredesenBrainHealthTalk',
    article: 'foodsThatFightInflammation',
    materials: ['ketoflexRecipes', 'module2'],
  },
  {
    week: 4,
    title: 'Lifestyle Reset & Orientation Review',
    tagline: 'You have finished Phase 1. Let us look back.',
    focus:
      'Four weeks in. This is a look-back week. What is working? What felt heavy? Phase 2 begins next week — we carry forward only what feels light.',
    lessonTitle: 'How to set up a sustainable week',
    lessonSummary:
      'Three small anchors — a morning ritual, a movement moment, an evening wind-down. Everything else can be optional. Anchors carry you through hard days.',
    checklistBase: [
      'Write down your three favorite habits from Weeks 1–3',
      'Pick your morning anchor (water, light, breath)',
      'Pick your evening anchor (dim light, short stretch, journal)',
      'Share one win with a supportive person',
      'Rest without guilt for 15 minutes today',
    ],
    movementFocus: '10-minute walk, ideally outdoors',
    breathworkFocus: 'Five-senses grounding breath',
    environmentFocus: 'Tidy one small area you see every morning',
    reflectionPrompt: 'What three habits are traveling with you into Phase 2?',
    video: 'howToStartYourDay',
    article: 'functionalMedicineIntro',
    materials: ['phase1Guide'],
  },
  // ----- PHASE 2 — Food, Blood Sugar & Sleep (Weeks 5-8) -----
  {
    week: 5,
    title: 'Better Breakfast Energy',
    tagline: 'Protein in the morning. Steady afternoons.',
    focus:
      'We build a brain-friendly breakfast pattern. The goal: protein first, color on the plate, and steady energy through the morning.',
    lessonTitle: 'Why protein at breakfast matters',
    lessonSummary:
      'Protein at breakfast stabilizes blood sugar and lifts mood and memory by midmorning. 20–30 grams is the sweet spot — eggs, yogurt, nut butter, smoked salmon.',
    checklistBase: [
      'Include a protein source at breakfast',
      'Drink a glass of water before coffee',
      'Add one color to your breakfast plate',
      'Eat at the table, not while standing',
      'Notice your energy at 11 a.m.',
    ],
    movementFocus: '10-minute walk after breakfast',
    breathworkFocus: 'Afternoon pause breath',
    environmentFocus: 'Set the breakfast table the night before',
    reflectionPrompt: 'What breakfast left you feeling best this week?',
    video: 'howToStartYourDay',
    article: 'foodsThatFightInflammation',
    materials: ['phase2Guide', 'ketoflexModules'],
  },
  {
    week: 6,
    title: 'Blood Sugar Balance',
    tagline: 'Fiber first. Walk after meals.',
    focus:
      'Stable blood sugar is a gift to the brain. This week we add small habits that keep the glucose curve gentle.',
    lessonTitle: 'The gentle art of fiber first',
    lessonSummary:
      'Start the meal with greens or veggies; follow with protein; finish with starches. The same meal, in a different order, blunts the blood-sugar spike.',
    checklistBase: [
      'Start one meal with vegetables',
      'Walk 10 minutes after a meal',
      'Drink water between meals',
      'Add a fiber source to your plate (beans, greens, berries)',
      'Close the kitchen 2 hours before bed',
    ],
    movementFocus: 'One 10–15 minute walk after dinner',
    breathworkFocus: 'Morning reset breath',
    environmentFocus: 'Keep cut vegetables visible in the fridge',
    reflectionPrompt: 'How steady did your afternoon energy feel this week?',
    video: 'bredesenBrainHealthTalk',
    article: 'foodsThatFightInflammation',
    materials: ['module3', 'ketoflexRecipes'],
  },
  {
    week: 7,
    title: 'Sleep Recovery',
    tagline: 'Protect the night. The brain cleans itself there.',
    focus:
      'A cool, dark, quiet, consistent bedroom. Tonight we lower the overhead lights an hour before bed. Tomorrow we try a screen-free 20 minutes before sleep.',
    lessonTitle: 'Why the brain loves darkness',
    lessonSummary:
      'Deep sleep is when the brain drains the waste it built up during the day. Dim lights signal the body that night is coming. Morning sunlight sets the clock for tomorrow night.',
    checklistBase: [
      'Dim overhead lights 1 hour before bed',
      'Get morning light within 30 minutes of waking',
      'Avoid screens for 20 minutes before sleep',
      'Keep the bedroom cool (65–68°F is ideal)',
      'Have a consistent bedtime tonight',
    ],
    movementFocus: '5-minute evening stretch',
    breathworkFocus: 'Bedtime count breath',
    environmentFocus: 'Make the bedroom dark — curtains, eye mask if needed',
    reflectionPrompt: 'Which nights did you sleep best, and what was different?',
    video: 'mindBodyPractices',
    article: 'stressAndNervousSystem',
    materials: ['module5'],
  },
  {
    week: 8,
    title: 'Steady Rhythm in Food & Sleep',
    tagline: 'Meals, movement, and rest begin to rhyme.',
    focus:
      'Consolidation week. We keep what is working from Weeks 5–7 and let it settle. Food, sleep, and blood sugar are more connected than they feel.',
    lessonTitle: 'The morning–evening loop',
    lessonSummary:
      'Morning light + breakfast protein + evening dim + consistent bedtime = a calmer brain. You do not need all four; pick two to protect this week.',
    checklistBase: [
      'Wake within 30 minutes of yesterday\'s wake time',
      'Finish eating 3 hours before bed',
      'Keep the breakfast protein habit',
      'Dim the room one hour before sleep',
      'Journal one sentence about how you slept',
    ],
    movementFocus: '15-minute walk outside',
    breathworkFocus: 'Five-senses grounding breath',
    environmentFocus: 'Remove one screen from the bedroom, even temporarily',
    reflectionPrompt: 'What is the one sleep habit you want to keep forever?',
    video: 'howToStartYourDay',
    article: 'mindBodyPractices',
    materials: ['phase2Guide', 'module5'],
  },
  // ----- PHASE 3 — Detox, Inflammation & Energy (Weeks 9-12) -----
  {
    week: 9,
    title: 'Detox Your Life — Fragrance & Cleaners',
    tagline: 'Fewer chemicals, calmer body.',
    focus:
      'We quietly reduce synthetic fragrance and harsh cleaners. Nothing is thrown out. We make one or two swaps and finish the old product.',
    lessonTitle: 'Why fragrance is an endocrine concern',
    lessonSummary:
      'Synthetic fragrance is an umbrella term covering dozens of undisclosed chemicals, some of which disrupt hormones. Fragrance-free is the safer default.',
    checklistBase: [
      'Identify one fragranced product in your home',
      'Choose a fragrance-free replacement',
      'Switch to vinegar + water for general surface cleaning',
      'Wash hands with unscented soap',
      'Open windows while you clean',
    ],
    movementFocus: '10-minute walk outdoors',
    breathworkFocus: 'Humming bee breath',
    environmentFocus: 'Air out a closet or a storage closet for 30 minutes',
    reflectionPrompt: 'Which swap felt easiest this week?',
    video: 'mindBodyPractices',
    article: 'detoxesAndCleanses',
    materials: ['toxicLoadEbook', 'module4', 'phase3Guide'],
  },
  {
    week: 10,
    title: 'Home Toxin Reduction',
    tagline: 'Plastics, water, and air.',
    focus:
      'A small reset for three daily exposures: plastic food containers, tap water, and indoor air. We do one per day, not all at once.',
    lessonTitle: 'Three small household upgrades',
    lessonSummary:
      'Glass containers for leftovers. A simple carbon water filter. Opening windows daily. These three small things do more than any one supplement.',
    checklistBase: [
      'Store one leftover in glass instead of plastic',
      'Drink filtered water today',
      'Open a window for 10 minutes',
      'Replace one plastic bottle with a reusable one',
      'Sweep one high-traffic area',
    ],
    movementFocus: '10-minute walk, ideally with direct sunlight',
    breathworkFocus: 'Afternoon pause breath',
    environmentFocus: 'Add a houseplant to one room (a peace lily does beautifully)',
    reflectionPrompt: 'Which detox swap was easiest to stick with?',
    video: 'bredesenBrainHealthTalk',
    article: 'detoxesAndCleanses',
    materials: ['toxicLoadEbook', 'module4'],
  },
  {
    week: 11,
    title: 'Inflammation & Gentle Detox Support',
    tagline: 'Sweat a little. Hydrate a lot.',
    focus:
      'Gentle habits that support the body\'s natural detox pathways: a short walk to sweat, more water, more color on the plate.',
    lessonTitle: 'Anti-inflammatory everyday foods',
    lessonSummary:
      'Leafy greens, berries, olive oil, wild fish, herbs, turmeric, ginger. A plate that includes any two of these is already anti-inflammatory.',
    checklistBase: [
      'Add leafy greens to one meal',
      'Include berries or colorful fruit today',
      'Drink one extra glass of water',
      'Walk briskly enough to break a light sweat',
      'Avoid ultra-processed foods for the day',
    ],
    movementFocus: '15-minute walk, brisk pace',
    breathworkFocus: 'Extended exhale',
    environmentFocus: 'Keep a water bottle within arm\'s reach',
    reflectionPrompt: 'What food made you feel lightest this week?',
    video: 'bredesenBrainHealthTalk',
    article: 'foodsThatFightInflammation',
    materials: ['module4', 'histamineAllergies'],
  },
  {
    week: 12,
    title: 'Energy Recovery',
    tagline: 'Rest deeply. Move gently. Eat with care.',
    focus:
      'Phase 3 closes with a focus on steady, real energy. This is what the brain runs on. Rest is listed first for a reason.',
    lessonTitle: 'The energy trifecta',
    lessonSummary:
      'Deep sleep + stable blood sugar + gentle movement = steady energy. You do not need to fix all three at once. Fix the one that feels most possible this week.',
    checklistBase: [
      'Protect 8 hours of sleep opportunity tonight',
      'Move for 10 minutes, even slowly',
      'Eat protein with each meal',
      'Schedule one small "nothing" break',
      'Say no to one optional thing',
    ],
    movementFocus: 'Gentle stretch, 10 minutes',
    breathworkFocus: 'Hand on heart breath',
    environmentFocus: 'Make your bed today — small environmental win',
    reflectionPrompt: 'Where did you feel the most steady energy this week?',
    video: 'howToStartYourDay',
    article: 'stressAndNervousSystem',
    materials: ['phase3Guide'],
  },
  // ----- PHASE 4 — Movement, Brain Training & Stress (Weeks 13-16) -----
  {
    week: 13,
    title: 'Movement as Medicine',
    tagline: 'A little more, a little more often.',
    focus:
      'Movement is one of the most powerful brain medicines. We gently increase by a few minutes and add a single strength element.',
    lessonTitle: 'Why walking is underrated',
    lessonSummary:
      'A daily walk lowers inflammation, improves insulin sensitivity, and grows brain volume in memory-relevant areas. Twenty minutes is plenty.',
    checklistBase: [
      'Walk 15–20 minutes today',
      'Add one gentle balance moment (stand on one foot)',
      'Do 8 wall push-ups',
      'Stretch gently before bed',
      'Drink water after movement',
    ],
    movementFocus: '15–20 minute walk + wall push-ups',
    breathworkFocus: 'Extended exhale before movement',
    environmentFocus: 'Keep walking shoes by the door',
    reflectionPrompt: 'How did movement change your mood this week?',
    video: 'mindBodyPractices',
    article: 'stressAndNervousSystem',
  },
  {
    week: 14,
    title: 'Brain Training',
    tagline: 'Small, playful, shame-free.',
    focus:
      'The brain is a muscle for novelty. A few minutes a day of something slightly new is enough. Reading, puzzles, category games, or learning a new small skill.',
    lessonTitle: 'The novelty effect',
    lessonSummary:
      'The brain forms new connections when it encounters something genuinely new. "New" can be a new recipe, a new route on a walk, a new word, or a new song.',
    checklistBase: [
      'Do a short brain game today',
      'Take a slightly different route on a walk',
      'Learn one new word',
      'Read something you would not normally read',
      'Tell someone one thing you learned',
    ],
    movementFocus: '15-minute walk — a new direction',
    breathworkFocus: 'Morning reset breath',
    environmentFocus: 'Rearrange one small corner of your home',
    reflectionPrompt: 'What was the most interesting thing you learned this week?',
    video: 'bredesenBrainHealthTalk',
    article: 'rootCauseMedicine',
  },
  {
    week: 15,
    title: 'Stress Recovery',
    tagline: 'Slow breath. Safe body. Steady brain.',
    focus:
      'Stress management is brain health. We add a longer nervous-system practice once this week and keep the short ones daily.',
    lessonTitle: 'Why the exhale is the calming half',
    lessonSummary:
      'Long exhales activate the parasympathetic system — the brake. A slow 6-second exhale done a few times a day is a real regulation tool.',
    checklistBase: [
      'Practice 5 minutes of slow exhales',
      'Take a break without a screen',
      'Say no to one non-essential task',
      'Take one slow breath before answering an email',
      'Rest before you feel you have earned it',
    ],
    movementFocus: 'Gentle stretch or a silent walk',
    breathworkFocus: 'Extended exhale, 5 minutes',
    environmentFocus: 'Dim one light in your home earlier today',
    reflectionPrompt: 'What calmed your nervous system most this week?',
    video: 'mindBodyPractices',
    article: 'stressAndNervousSystem',
    materials: ['module5'],
  },
  {
    week: 16,
    title: 'Phase 4 Consolidation',
    tagline: 'Movement + brain + calm. All three, small.',
    focus:
      'A review and integration week. Keep what worked from weeks 13–15 and let it rest in. Avoid new additions this week.',
    lessonTitle: 'Less is more in Phase 4',
    lessonSummary:
      'Three small daily practices — movement, one brain game, one breath session — are more effective than a long workout once a week. Consistency beats intensity.',
    checklistBase: [
      'Move for at least 10 minutes',
      'Do one short brain game',
      'Practice one short breath session',
      'Journal one sentence about your body',
      'Get to bed on time tonight',
    ],
    movementFocus: '15-minute walk',
    breathworkFocus: 'Hand on heart breath',
    environmentFocus: 'Tidy your most-used space for 5 minutes',
    reflectionPrompt: 'Which daily habit feels like yours now?',
    video: 'bredesenBrainHealthTalk',
    article: 'functionalMedicineIntro',
  },
  // ----- PHASE 5 — Consistency & Cognitive Growth (Weeks 17-20) -----
  {
    week: 17,
    title: 'Habit Precision',
    tagline: 'Pair habits to anchors. Make them stick.',
    focus:
      'A habit sticks best when paired with something you already do. Water with morning coffee. Breath before bed. We build anchors this week.',
    lessonTitle: 'Anchoring new habits',
    lessonSummary:
      'Pair a new habit to an existing one. "After I pour coffee, I drink a glass of water." "After I brush my teeth, I do 3 slow breaths." Small anchors build rhythm.',
    checklistBase: [
      'Pair one habit to a daily anchor',
      'Say the anchor out loud: "After X, I will Y"',
      'Do the paired habit today',
      'Celebrate small — a soft "good" after each one',
      'Notice which anchor is easiest',
    ],
    movementFocus: '15-minute walk, paired to morning coffee',
    breathworkFocus: 'Five-senses grounding breath after lunch',
    environmentFocus: 'Leave a visual cue near each anchor',
    reflectionPrompt: 'Which anchor worked best for you this week?',
    video: 'howToStartYourDay',
    article: 'mindBodyPractices',
  },
  {
    week: 18,
    title: 'Cognitive Growth',
    tagline: 'Learning is lifelong medicine.',
    focus:
      'This week picks up the novelty theme. Small, playful learning — any subject you enjoy. The brain rewards curiosity.',
    lessonTitle: 'The learner\'s brain',
    lessonSummary:
      'Brains that learn throughout life hold off cognitive decline longer. Learning is medicine, and it does not have to be academic.',
    checklistBase: [
      'Learn something small and new today',
      'Read 10 pages of a book',
      'Watch a short educational video',
      'Teach one thing you learned to someone',
      'Write down one fact that surprised you',
    ],
    movementFocus: '15-minute walk',
    breathworkFocus: 'Extended exhale',
    environmentFocus: 'Keep a book in a visible spot',
    reflectionPrompt: 'What are you most curious about right now?',
    video: 'bredesenBrainHealthTalk',
    article: 'labTestsOnline',
  },
  {
    week: 19,
    title: 'Consistency & Confidence',
    tagline: 'You know what works. Keep doing it.',
    focus:
      'Confidence in the program grows from doing it. This week is about trusting what works and staying in your rhythm.',
    lessonTitle: 'The quiet power of staying',
    lessonSummary:
      'Most progress in brain health is made by people who stayed on the same gentle path for a long time. Fidelity beats novelty.',
    checklistBase: [
      'Do your three anchor habits today',
      'Repeat the meal pattern that makes you feel best',
      'Sleep in your usual window',
      'Journal one win, however small',
      'Say thank you to someone who supports you',
    ],
    movementFocus: '15-minute walk',
    breathworkFocus: 'Hand on heart breath',
    environmentFocus: 'Keep the rhythm of your space predictable',
    reflectionPrompt: 'Where have you surprised yourself?',
    video: 'howToStartYourDay',
    article: 'understandingSymptoms',
  },
  {
    week: 20,
    title: 'Phase 5 Reflection',
    tagline: 'Five phases in. What has changed?',
    focus:
      'A reflection week. We notice the shifts — sleep, mood, memory, energy — and write them down. Phase 6 begins with clarity.',
    lessonTitle: 'How to notice your own progress',
    lessonSummary:
      'Progress in brain health is quiet. Sleep is a little easier. Afternoons less heavy. Words come a hair faster. Write down what is different from Week 1.',
    checklistBase: [
      'Compare today to Week 1 — write three differences',
      'Celebrate the habit that has changed most',
      'Share one small win with a caregiver',
      'Rest without guilt',
      'Journal about one thing you want to keep forever',
    ],
    movementFocus: '15-minute walk',
    breathworkFocus: 'Five-senses grounding breath',
    environmentFocus: 'Tidy your workbook space',
    reflectionPrompt: 'What three things have changed most since Week 1?',
    video: 'bredesenBrainHealthTalk',
    article: 'rootCauseMedicine',
  },
  // ----- PHASE 6 — Maintenance & Long-Term Brain Health (Weeks 21-24) -----
  {
    week: 21,
    title: 'Your Long-Term Plan',
    tagline: 'Choose three habits to carry forward.',
    focus:
      'Phase 6 begins. We choose three habits that go with you into the rest of your life. You will write them down this week and begin practicing them in their "permanent" form.',
    lessonTitle: 'Fewer habits, deeper roots',
    lessonSummary:
      'Three well-tended habits beat thirty half-done ones. This week, narrow the list. Next week, deepen what is left.',
    checklistBase: [
      'Write down your three long-term habits',
      'Post them somewhere visible',
      'Do all three today',
      'Tell one person about your plan',
      'Celebrate small',
    ],
    movementFocus: 'Your chosen daily movement',
    breathworkFocus: 'Your favorite short breath practice',
    environmentFocus: 'Put your long-term plan on the fridge',
    reflectionPrompt: 'Which three habits will travel with you?',
    video: 'bredesenBrainHealthTalk',
    article: 'functionalMedicineIntro',
  },
  {
    week: 22,
    title: 'Maintenance Rhythm',
    tagline: 'Your routine, running quietly.',
    focus:
      'This week your rhythm runs under its own steam. You will catch yourself doing it without thinking. That is the goal.',
    lessonTitle: 'What "automatic" feels like',
    lessonSummary:
      'A habit becomes automatic when it no longer requires a decision. You just do it, like brushing your teeth. That is the gift of Phase 6.',
    checklistBase: [
      'Do your three anchor habits',
      'Eat two brain-supportive meals',
      'Walk 15 minutes or move your way',
      'Protect sleep tonight',
      'Write one sentence in your journal',
    ],
    movementFocus: 'Your chosen movement',
    breathworkFocus: 'Your chosen breath practice',
    environmentFocus: 'Keep the kitchen brain-friendly',
    reflectionPrompt: 'What parts of your rhythm run without thought now?',
    video: 'howToStartYourDay',
    article: 'foodsThatFightInflammation',
  },
  {
    week: 23,
    title: 'Long-Term Brain Health',
    tagline: 'Plan the year ahead.',
    focus:
      'We plan the year ahead. A monthly self check-in. A quarterly kitchen reset. An annual conversation with Dr. Thomas. You design the cadence that works for you.',
    lessonTitle: 'A year of brain health',
    lessonSummary:
      'Brain health is a long practice. A monthly self check-in is plenty. A quarterly pantry review is plenty. A yearly clinical check-in is plenty.',
    checklistBase: [
      'Put a monthly self check-in on your calendar',
      'Plan a quarterly kitchen review',
      'Choose an annual clinic check-in date',
      'Write down your "hard day" plan',
      'Share your plan with a caregiver',
    ],
    movementFocus: '15-minute walk',
    breathworkFocus: 'Your chosen breath practice',
    environmentFocus: 'Update your visible plan on the fridge',
    reflectionPrompt: 'What cadence of check-ins works for you?',
    video: 'bredesenBrainHealthTalk',
    article: 'labTestsOnline',
  },
  {
    week: 24,
    title: 'Graduation',
    tagline: 'You completed 24 weeks. This is yours now.',
    focus:
      'The final week. You have built a real practice. You know what works for your brain, your body, and your life. These tools stay with you for as long as you want them.',
    lessonTitle: 'Carrying the workbook forward',
    lessonSummary:
      'Your workbook does not disappear. You can revisit any day, any lesson, any recipe. The rhythm is yours now. Return any time you want to re-anchor.',
    checklistBase: [
      'Re-read Week 1 Day 1 — notice the distance traveled',
      'Write a short letter to Week-1 you',
      'Share one thing you learned with someone you love',
      'Schedule your next monthly self check-in',
      'Celebrate — however you celebrate',
    ],
    movementFocus: 'A celebratory walk',
    breathworkFocus: 'Your favorite breath practice — today and forever',
    environmentFocus: 'Put today\'s page somewhere you will see it',
    reflectionPrompt: 'What will you carry forward from these 24 weeks?',
    video: 'bredesenBrainHealthTalk',
    article: 'functionalMedicineIntro',
  },
]

export type WorkbookDay = {
  day: number
  dayOfWeek: number // 1..7
  week: number
  phase: number
  title: string
  theme: string
  focus: string
  welcomeMessage: string
  lessonTitle: string
  lessonSummary: string
  checklist: string[]
  meals: DailyMeals
  movement: string
  breathwork: string
  environmentTip: string
  game: WorkbookGame
  journalPrompt: JournalPrompt
  quote: Quote
  caregiverTip: string
  tomorrowPreview: string
  /** Optional supporting video (clinic Drive or verified external). */
  video?: Material
  /** Optional supporting article or handout. */
  article?: Material
  /** Any additional clinic materials to surface — mostly used on Day 1 / first day of a new week. */
  extraMaterials: Material[]
}

const dayOfWeekTitles: Record<number, string> = {
  1: 'Begin the week gently',
  2: 'A practice day',
  3: 'A kitchen day',
  4: 'A movement day',
  5: 'A celebration day',
  6: 'A home-care day',
  7: 'A reflection day',
}

const dayOfWeekThemes: Record<number, string> = {
  1: 'Learn the week\'s theme',
  2: 'Practice gently',
  3: 'Food and kitchen focus',
  4: 'Movement focus',
  5: 'Friday — small celebration',
  6: 'Environment and body-care',
  7: 'Weekly reflection',
}

const caregiverTipRotation = [
  'Sit quietly with them as they open today\'s page. That presence matters.',
  'Offer to read the lesson aloud if it helps.',
  'Prepare one of the meals together, even just the salad.',
  'Walk alongside them — no need to talk.',
  'Celebrate today with a small, favorite something.',
  'Tidy one small shared space together.',
  'Over tea, ask: "What felt good this week?"',
]

export function planForDay(day: number): WorkbookDay {
  if (day < 1 || day > 168) {
    // Graceful fallback — the UI still renders.
    return planForDay(((day - 1) % 168 + 168) % 168 + 1)
  }
  const week = Math.ceil(day / 7)
  const dow = ((day - 1) % 7) + 1
  const phase = phaseForWeek(week)
  const theme = weekThemes[week - 1] ?? weekThemes[0]

  const titleBase = dayOfWeekTitles[dow]
  const title = `${theme.title} — ${titleBase}`

  // Welcome message personalized by day-of-week position in the week.
  const welcomeMap: Record<number, string> = {
    1: `Welcome to Week ${week}, Day 1. ${theme.tagline}`,
    2: `Day 2 of Week ${week}. You are here. That is the whole thing.`,
    3: `Day 3 — a small kitchen focus for Week ${week}.`,
    4: `Day 4 — a gentle movement focus for Week ${week}.`,
    5: `Day 5 — Friday. One small celebration is built in today.`,
    6: `Day 6 — a home-care day for Week ${week}.`,
    7: `Day 7 — a quiet reflection day. Week ${week} is closing kindly.`,
  }
  const welcomeMessage = welcomeMap[dow] ?? `Day ${dow} of Week ${week}.`

  const focus =
    dow === 1 ? theme.focus :
    dow === 3 ? `${theme.focus} Today is a kitchen and food day.` :
    dow === 4 ? `${theme.focus} Today is a gentle movement day.` :
    dow === 5 ? `${theme.focus} Today includes a small dessert — brain-friendly, always.` :
    dow === 6 ? `${theme.focus} Today is about your environment — one small care act for your space.` :
    dow === 7 ? `${theme.focus} Today, reflect: ${theme.reflectionPrompt}` :
    theme.focus

  // Compact checklist — pick 5 items from the week's base, rotating the start
  // so different days emphasize different anchors.
  const start = (dow - 1) % theme.checklistBase.length
  const checklist = [
    ...theme.checklistBase.slice(start),
    ...theme.checklistBase.slice(0, start),
  ].slice(0, 5)

  const meals = mealsForDay(day)
  const game = gameForDay(day)
  const journalPrompt = promptForDay(day)
  const quote = quoteForDay(day)

  const movement =
    dow === 4
      ? `${theme.movementFocus} (today's focus)`
      : theme.movementFocus
  const breathwork = theme.breathworkFocus
  const environmentTip =
    dow === 6
      ? `${theme.environmentFocus} (today's focus)`
      : theme.environmentFocus

  const caregiverTip =
    caregiverTipRotation[(dow - 1) % caregiverTipRotation.length]

  const video = theme.video ? MATERIALS[theme.video] : undefined
  const article = theme.article ? MATERIALS[theme.article] : undefined
  // Extra materials are shown on day 1 of a week (first taste) and on day 7 (a
  // gentle nudge to re-open what helped). Keeps the middle of the week quieter.
  const extraMaterials: Material[] =
    dow === 1 || dow === 7
      ? (theme.materials ?? []).map((key) => MATERIALS[key])
      : []

  // Tomorrow preview
  const tomorrowDay = day + 1
  const tomorrowPreview =
    tomorrowDay > 168
      ? 'Tomorrow: a free day. Your tools stay with you.'
      : (() => {
          const nextWeek = Math.ceil(tomorrowDay / 7)
          const nextTheme = weekThemes[nextWeek - 1] ?? weekThemes[0]
          const nextDow = ((tomorrowDay - 1) % 7) + 1
          return `Tomorrow — ${nextTheme.title} — ${dayOfWeekTitles[nextDow]}.`
        })()

  return {
    day,
    dayOfWeek: dow,
    week,
    phase,
    title,
    theme: dayOfWeekThemes[dow],
    focus,
    welcomeMessage,
    lessonTitle: theme.lessonTitle,
    lessonSummary: theme.lessonSummary,
    checklist,
    meals,
    movement,
    breathwork,
    environmentTip,
    game,
    journalPrompt,
    quote,
    caregiverTip,
    tomorrowPreview,
    video,
    article,
    extraMaterials,
  }
}

export function weekSummary(week: number): WeekTheme {
  return weekThemes[Math.max(0, Math.min(23, week - 1))]
}
