/**
 * Daily brain games library
 * -------------------------
 * A pool of ten short, gentle games designed to be playable in a few
 * minutes at the end of the day. Games rotate deterministically by
 * day, so a patient who finishes Day 1 always plays Word Recall, the
 * patient on Day 2 always plays Memory Match, etc.
 *
 * Each game includes:
 *   - clear instructions a senior reader can follow
 *   - an optional gentle timer
 *   - a completion message ("encouragement") shown when the patient
 *     marks the game done
 */

export type DailyGame = {
  id: string
  title: string
  category: string
  shortIntro: string
  instructions: string[]
  timerSeconds?: number
  scoringHint?: string
  encouragement: string
  caregiverTip?: string
}

export const DAILY_GAMES: DailyGame[] = [
  {
    id: 'word-recall',
    title: 'Word Recall',
    category: 'Memory',
    shortIntro:
      'You read five words slowly, set them aside, and try to remember them a little later.',
    instructions: [
      'Read these words out loud, slowly: APPLE, GARDEN, BOAT, CANDLE, MOUNTAIN.',
      'Wait one minute. (You can sip water, look out the window — anything calm.)',
      'Now, without looking, say or write the five words you remember.',
      'It is okay if not all five come back. The trying is the exercise.',
    ],
    timerSeconds: 60,
    scoringHint: 'Count how many you remembered. Any number is a good number today.',
    encouragement:
      'Beautiful. Recall improves the more you practice — kindly, not hard.',
    caregiverTip:
      'Read the words to them. Sit quietly together for the minute. Then ask gently, "Which ones come back to you?"',
  },
  {
    id: 'memory-match',
    title: 'Memory Match',
    category: 'Visual memory',
    shortIntro:
      'A small visual matching game. Find the pairs, no rush.',
    instructions: [
      'Pick six pairs of small objects: playing cards, coins of different sizes, family photos, or anything familiar.',
      'Place them face-down in a 3×4 grid.',
      'Turn over two at a time. If they match, set them aside. If not, turn them back.',
      'Continue until all six pairs are found.',
    ],
    encouragement:
      'Good work. Matching games build attention and short-term memory together.',
    caregiverTip:
      'Play one turn each. Celebrate every match — yours or theirs.',
  },
  {
    id: 'category-sprint',
    title: 'Category Sprint',
    category: 'Word finding',
    shortIntro:
      'Name as many items as you can in one familiar category in 60 seconds.',
    instructions: [
      'Pick one category: kitchen items, fruits, or animals.',
      'Start the timer for 60 seconds.',
      'Out loud, name as many as you can. Write them down or have someone write them.',
      'When time is up, take a breath and notice what you remembered.',
    ],
    timerSeconds: 60,
    scoringHint: '7+ is wonderful. 4–6 is good. Anything is exercise.',
    encouragement:
      'Lovely. Word-finding gets stronger every time you practice.',
    caregiverTip:
      'Take turns: one of you names one item, then the other. Make it a kind back-and-forth.',
  },
  {
    id: 'number-trail',
    title: 'Number Trail',
    category: 'Attention',
    shortIntro: 'A small attention warm-up.',
    instructions: [
      'Start at 100.',
      'Out loud, count backward by 3 — 100, 97, 94, 91, and so on.',
      'Stop when you reach a number below 70 or whenever you would like to.',
      'If you lose your place, just start over. Restarting is part of the practice.',
    ],
    timerSeconds: 90,
    encouragement:
      'Wonderful. Counting backward gently exercises focus and working memory.',
    caregiverTip:
      'Take turns saying every other number. You go, they go, you go.',
  },
  {
    id: 'story-recall',
    title: 'Story Recall',
    category: 'Memory',
    shortIntro: 'Listen to a tiny story, then tell it back in your own words.',
    instructions: [
      'Read this short story out loud, slowly:',
      '"Mrs. Patel walked to the farmers market on a cool Saturday morning. She bought red tomatoes, a loaf of sourdough bread, and yellow daisies. On her walk home, she stopped to pet a small gray dog and met its owner, Mr. Jones."',
      'Pause for one minute. Breathe.',
      'Now retell the story, in your own words. Try to include names, colors, and what she bought.',
    ],
    timerSeconds: 60,
    encouragement:
      'Beautifully done. You used listening, language, and memory all at once.',
    caregiverTip:
      'Read the story aloud. Sit with them quietly for the minute. Then ask, "What do you remember?"',
  },
  {
    id: 'spot-the-difference',
    title: 'Spot the Difference',
    category: 'Visual attention',
    shortIntro: 'Look around the room and notice what changes.',
    instructions: [
      'Sit somewhere familiar — your kitchen or living room.',
      'Look around for 30 seconds. Notice what is on the table, the counter, the shelves.',
      'Close your eyes. A caregiver moves or hides one or two objects.',
      'Open your eyes. Try to name what changed.',
    ],
    encouragement:
      'Nicely noticed. Your visual attention is sharper than you may think.',
    caregiverTip:
      'Keep changes small and gentle. One moved cup is plenty.',
  },
  {
    id: 'pattern-path',
    title: 'Pattern Path',
    category: 'Pattern recognition',
    shortIntro: 'Finish the pattern.',
    instructions: [
      'Read each pattern. Say the next item out loud or write it down.',
      'A) 2, 4, 6, 8, ___',
      'B) Red, Blue, Red, Blue, ___',
      'C) Apple, Banana, Apple, Banana, Apple, ___',
      'D) Monday, Wednesday, Friday, ___',
      'Check your answers and talk through them. There can be more than one good answer.',
    ],
    encouragement:
      'Wonderful. Patterns are how the brain makes sense of the world.',
  },
  {
    id: 'grocery-recall',
    title: 'Grocery Recall',
    category: 'Memory',
    shortIntro: 'Imagine a small grocery list and remember it later.',
    instructions: [
      'Read this list aloud, slowly: BLUEBERRIES, OLIVE OIL, EGGS, SPINACH, ALMONDS, SALMON.',
      'Set the list aside for 90 seconds. Sip water or look out the window.',
      'Without looking, say or write the items you remember.',
      'Check at the end. Anything you missed becomes tomorrow’s practice.',
    ],
    timerSeconds: 90,
    scoringHint: 'No score is wrong. Effort is the medicine.',
    encouragement:
      'Lovely work. Familiar lists are a gentle, real-world brain exercise.',
  },
  {
    id: 'sequence-builder',
    title: 'Sequence Builder',
    category: 'Working memory',
    shortIntro: 'Build a small sequence and add to it.',
    instructions: [
      'Say one thing you would do this morning. Example: "Drink water."',
      'Now add a second step. "Drink water, then open the curtains."',
      'Add a third step. Then a fourth. Each time, say the whole sequence from the start.',
      'Stop at five steps — or earlier if it gets long. Five is plenty.',
    ],
    encouragement:
      'Beautiful. Holding a sequence in mind is one of the best brain workouts there is.',
    caregiverTip:
      'Build the sequence together — you add one, they add the next.',
  },
  {
    id: 'attention-timer',
    title: 'Attention Timer Challenge',
    category: 'Focus',
    shortIntro: 'A 60-second focus practice.',
    instructions: [
      'Set a timer for 60 seconds.',
      'Choose one quiet thing to focus on: your breath, the sound of birds, a candle, or your own hand resting on your lap.',
      'Each time your mind wanders — and it will — gently bring it back. No frustration.',
      'When the timer ends, take one slow breath and notice how you feel.',
    ],
    timerSeconds: 60,
    encouragement:
      'Lovely. Each return to focus is a tiny rep for your attention muscles.',
    caregiverTip:
      'Sit quietly nearby. Your calm presence is part of the practice.',
  },
]

/** Returns the daily brain game for a given workbook day. */
export function dailyGameForDay(day: number): DailyGame {
  const i = ((day - 1) % DAILY_GAMES.length + DAILY_GAMES.length) % DAILY_GAMES.length
  return DAILY_GAMES[i]
}
