export type DayPlan = {
  day: number
  week: number
  phase: number
  title: string
  theme: string
  estimatedMinutes: number
  focus: string
  encouragement: string
  caregiverTip: string
  lessonId: string
  recipeId: string
  movementId: string
  breathworkId: string
  gameId: string
  checkIn: string
}

export const dayPlans: DayPlan[] = [
  {
    day: 1,
    week: 1,
    phase: 1,
    title: 'Welcome to Day 1',
    theme: 'Getting comfortable',
    estimatedMinutes: 15,
    focus: 'Meet your dashboard. Do one very small thing for your brain today.',
    encouragement:
      'Simply being here is enough for Day 1. No big lifts today.',
    caregiverTip:
      'Sit with them as they open the program for the first time. Your quiet company matters more than any instructions.',
    lessonId: 'welcome',
    recipeId: 'warm-berry-oats',
    movementId: 'morning-shoulder-roll',
    breathworkId: 'extended-exhale',
    gameId: 'what-day-is-it',
    checkIn: 'How are you feeling about starting?',
  },
  {
    day: 2,
    week: 1,
    phase: 1,
    title: 'A Gentle Morning',
    theme: 'Morning rhythm',
    estimatedMinutes: 15,
    focus:
      'Try a slower, calmer morning. One glass of water. One short breath practice.',
    encouragement: 'You came back. That is the whole thing.',
    caregiverTip:
      'Open the curtains first thing. Light is medicine in the morning.',
    lessonId: 'sleep-and-brain',
    recipeId: 'warm-berry-oats',
    movementId: 'evening-stretch',
    breathworkId: 'morning-reset',
    gameId: 'categories-kitchen',
    checkIn: 'How did you sleep last night?',
  },
  {
    day: 3,
    week: 1,
    phase: 1,
    title: 'A Kind Movement',
    theme: 'Gentle movement',
    estimatedMinutes: 15,
    focus: 'A short walk, or a seated movement if today is a low-energy day.',
    encouragement:
      'Movement does not need to be big to help your brain.',
    caregiverTip:
      'Offer to walk with them. Walking plus conversation is a powerful pair.',
    lessonId: 'movement-neuroplasticity',
    recipeId: 'rainbow-lunch-bowl',
    movementId: 'short-walk',
    breathworkId: 'hand-on-heart',
    gameId: 'matching-pairs',
    checkIn: 'How does your body feel today?',
  },
  {
    day: 4,
    week: 1,
    phase: 1,
    title: 'Nourishing the Brain',
    theme: 'Food as support',
    estimatedMinutes: 15,
    focus: 'Add one colorful food to a meal today. That is the whole goal.',
    encouragement:
      'Color on a plate is brain food.',
    caregiverTip:
      'Sliced berries on morning yogurt counts. Small things count.',
    lessonId: 'blood-sugar-and-cognition',
    recipeId: 'walnut-apple-snack',
    movementId: 'morning-shoulder-roll',
    breathworkId: 'afternoon-pause',
    gameId: 'odd-one-out',
    checkIn: 'What was your favorite food today?',
  },
  {
    day: 5,
    week: 1,
    phase: 1,
    title: 'Calming the System',
    theme: 'Nervous system kindness',
    estimatedMinutes: 15,
    focus:
      'Today is about doing less, not more. A short breath practice. A quiet moment.',
    encouragement:
      'Rest is not skipping. Rest is part of the program.',
    caregiverTip:
      'Protect a small piece of quiet for them. 10 minutes of nothing is restorative.',
    lessonId: 'stress-nervous-system',
    recipeId: 'green-smoothie',
    movementId: 'seated-twist',
    breathworkId: 'five-senses',
    gameId: 'counting-backward',
    checkIn: 'Do you feel calmer now than you did an hour ago?',
  },
  {
    day: 6,
    week: 1,
    phase: 1,
    title: 'A Brain-Training Day',
    theme: 'Gentle cognitive play',
    estimatedMinutes: 15,
    focus:
      'Play one short brain game today. Participation matters more than performance.',
    encouragement:
      "You cannot do this wrong. Showing up is the win.",
    caregiverTip:
      'Play together. Take turns. It is lighter that way.',
    lessonId: 'welcome',
    recipeId: 'egg-avocado-toast',
    movementId: 'balance-check',
    breathworkId: 'extended-exhale',
    gameId: 'story-recall',
    checkIn: 'Which part of the game surprised you?',
  },
  {
    day: 7,
    week: 1,
    phase: 1,
    title: 'Week One Reflection',
    theme: 'Looking back gently',
    estimatedMinutes: 15,
    focus:
      'One week in. What felt easy? What felt hard? No judgment — only noticing.',
    encouragement:
      'You made it through week one. That is meaningful.',
    caregiverTip:
      'Over tea, ask: "What felt good this week?" Listen without fixing.',
    lessonId: 'welcome',
    recipeId: 'simple-chicken-soup',
    movementId: 'evening-stretch',
    breathworkId: 'bedtime-count',
    gameId: 'what-day-is-it',
    checkIn: 'Choose one thing you want to keep doing next week.',
  },
  {
    day: 8,
    week: 2,
    phase: 1,
    title: 'Welcome to Week Two',
    theme: 'Building on a gentle start',
    estimatedMinutes: 18,
    focus:
      'A small extension from last week. A slightly longer walk, or one new recipe.',
    encouragement:
      'Last week is the foundation this week rests on.',
    caregiverTip:
      'Notice any change (mood, sleep, energy) and mention it gently. "I noticed you seemed more rested this morning." Observation, not pressure.',
    lessonId: 'sleep-and-brain',
    recipeId: 'warm-berry-oats',
    movementId: 'short-walk',
    breathworkId: 'morning-reset',
    gameId: 'categories-kitchen',
    checkIn: 'How is your sleep feeling this week?',
  },
  {
    day: 9,
    week: 2,
    phase: 1,
    title: 'Blood Sugar Gentleness',
    theme: 'Steady energy',
    estimatedMinutes: 18,
    focus:
      'Add protein to your breakfast today. It can be eggs, yogurt, or nut butter.',
    encouragement:
      'Tiny meal tweaks have a big cumulative effect.',
    caregiverTip:
      'Keep hard-boiled eggs in the fridge. One-second breakfast protein.',
    lessonId: 'blood-sugar-and-cognition',
    recipeId: 'egg-avocado-toast',
    movementId: 'morning-shoulder-roll',
    breathworkId: 'afternoon-pause',
    gameId: 'odd-one-out',
    checkIn: 'How steady was your energy today?',
  },
  {
    day: 10,
    week: 2,
    phase: 1,
    title: 'A Movement Day',
    theme: 'Gentle strength and balance',
    estimatedMinutes: 18,
    focus:
      'Try a wall push. 8 slow reps. Stop there if that feels like enough.',
    encouragement:
      'Strength that lasts is built slowly.',
    caregiverTip:
      'Stand nearby. No correcting — just company.',
    lessonId: 'movement-neuroplasticity',
    recipeId: 'rainbow-lunch-bowl',
    movementId: 'wall-push',
    breathworkId: 'hand-on-heart',
    gameId: 'matching-pairs',
    checkIn: 'Did your movement feel safe and steady?',
  },
  {
    day: 11,
    week: 2,
    phase: 1,
    title: 'Cognitive Play',
    theme: 'Brain game with a partner',
    estimatedMinutes: 18,
    focus:
      'Play Short Story Recall today, ideally with someone. Then talk about the story.',
    encouragement:
      "Remembering pieces of a story — even some — is a meaningful exercise.",
    caregiverTip:
      'Read the story out loud slowly. Ask "what do you remember?" with warmth, not as a quiz.',
    lessonId: 'welcome',
    recipeId: 'walnut-apple-snack',
    movementId: 'seated-twist',
    breathworkId: 'humming-bee',
    gameId: 'story-recall',
    checkIn: 'What part of the story did you remember most easily?',
  },
  {
    day: 12,
    week: 2,
    phase: 1,
    title: 'Evening Rhythm',
    theme: 'Protecting sleep',
    estimatedMinutes: 18,
    focus:
      'Tonight: dim the lights an hour before bed. Try the Bedtime Breath.',
    encouragement:
      'Good sleep is one of the most powerful brain interventions there is.',
    caregiverTip:
      'Turn off the main living room lights and switch to a lamp. Signal the body: evening has begun.',
    lessonId: 'sleep-and-brain',
    recipeId: 'simple-chicken-soup',
    movementId: 'evening-stretch',
    breathworkId: 'bedtime-count',
    gameId: 'counting-backward',
    checkIn: 'How did you feel when you climbed into bed tonight?',
  },
  {
    day: 13,
    week: 2,
    phase: 1,
    title: 'Caregiver Appreciation Day',
    theme: 'Connection',
    estimatedMinutes: 18,
    focus:
      'If a caregiver is helping you, say one thank-you today. Small appreciations matter.',
    encouragement:
      'You are not doing this alone, and that is a strength.',
    caregiverTip:
      "This is your day too. Notice what you have done. Take a moment to rest.",
    lessonId: 'caregiver-role',
    recipeId: 'green-smoothie',
    movementId: 'balance-check',
    breathworkId: 'five-senses',
    gameId: 'categories-kitchen',
    checkIn: 'Who supports you? Name one person silently or aloud.',
  },
  {
    day: 14,
    week: 2,
    phase: 1,
    title: 'Two Weeks In',
    theme: 'Reflection and a small celebration',
    estimatedMinutes: 18,
    focus:
      'Look back at the past 14 days. Pick one habit that felt nourishing. That one travels with you into Phase 2.',
    encouragement:
      'You have finished Phase 1. That is real. Tomorrow, the rhythm deepens — gently.',
    caregiverTip:
      'Celebrate with a small walk or a favorite tea. No need for speeches. Presence is the gift.',
    lessonId: 'welcome',
    recipeId: 'salmon-sheet-pan',
    movementId: 'short-walk',
    breathworkId: 'extended-exhale',
    gameId: 'odd-one-out',
    checkIn: 'What is one habit you want to carry into Week 3?',
  },
]

export function getPlanForDay(dayNumber: number): DayPlan {
  const idx = ((dayNumber - 1) % dayPlans.length + dayPlans.length) % dayPlans.length
  return dayPlans[idx]
}
