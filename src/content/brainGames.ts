export type BrainGame = {
  id: string
  title: string
  category: string
  objective: string
  difficulty: 'very-easy' | 'easy' | 'medium'
  duration: number // minutes
  instructions: string[]
  soloOrAssisted: 'solo' | 'either' | 'caregiver'
  caregiverVersion: string
  lowScoreEncouragement: string
  adaptiveEasier: string
  adaptiveHarder: string
  phaseTags: number[]
  printable: boolean
}

export const brainGames: BrainGame[] = [
  {
    id: 'categories-kitchen',
    title: 'Kitchen Category Name Game',
    category: 'category naming',
    objective:
      'Gently exercise word-finding by listing as many items as you can in a familiar category.',
    difficulty: 'very-easy',
    duration: 3,
    instructions: [
      'Set a timer for 60 seconds (or count slowly to 60).',
      'Name as many kitchen items as you can out loud.',
      'Write them down as you go, or let a partner write them.',
      'When time is up, pause. Take a breath. Notice what you remembered.',
    ],
    soloOrAssisted: 'either',
    caregiverVersion:
      'Take turns: you name one, then they name one. No competing — only supporting.',
    lowScoreEncouragement:
      'Fewer words is still brain exercise. The effort itself is the benefit.',
    adaptiveEasier: 'Start with a very narrow category: "things on my breakfast table."',
    adaptiveHarder:
      'Use two categories in one minute. Or pick a letter: "kitchen items starting with S."',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
    printable: true,
  },
  {
    id: 'odd-one-out',
    title: 'Odd One Out',
    category: 'pattern recognition',
    objective: 'Notice what does not belong and why.',
    difficulty: 'easy',
    duration: 3,
    instructions: [
      "Read each group. Find the one that does not belong.",
      'Group A: apple, pear, tomato, carrot, grape',
      'Group B: piano, violin, drum, flute, hammer',
      'Group C: robin, eagle, bat, sparrow, crow',
      'Check at the end. Talk through your reasoning.',
    ],
    soloOrAssisted: 'either',
    caregiverVersion:
      'Read the group out loud. Ask "Which feels different?" No wrong answers — just conversation.',
    lowScoreEncouragement:
      'Even noticing "something is different here" is the skill. You have got it.',
    adaptiveEasier:
      'Use groups of 3 items instead of 5.',
    adaptiveHarder: 'Write your own groups of 5 and share with someone.',
    phaseTags: [2, 3, 4, 5, 6, 7],
    printable: true,
  },
  {
    id: 'story-recall',
    title: 'Short Story Recall',
    category: 'story recall',
    objective: 'Strengthen memory through listening and retelling.',
    difficulty: 'easy',
    duration: 5,
    instructions: [
      "Read (or have someone read) this short story slowly:",
      '"Mrs. Patel walked to the farmers market on a cool Saturday morning. She bought red tomatoes, a loaf of sourdough bread, and a bunch of yellow daisies. On her walk home, she stopped to pet a small gray dog and met its owner, Mr. Jones."',
      'Pause for 1 minute. Breathe.',
      'Now, in your own words, tell the story back. Try to include names, colors, and what she bought.',
    ],
    soloOrAssisted: 'either',
    caregiverVersion:
      'Read it aloud. Sit together quietly for a minute. Then gently ask "What do you remember?"',
    lowScoreEncouragement:
      'You do not need to remember all of it. Anything you recall is a good day for your memory.',
    adaptiveEasier:
      'Use a 2-sentence story instead.',
    adaptiveHarder:
      'Ask follow-up questions: What day was it? What colors? Who did she meet?',
    phaseTags: [3, 4, 5, 6, 7],
    printable: true,
  },
  {
    id: 'matching-pairs',
    title: 'Picture Matching Pairs',
    category: 'matching',
    objective: 'Gentle visual memory through a short matching game.',
    difficulty: 'very-easy',
    duration: 4,
    instructions: [
      'Use 6 pairs of familiar objects (playing cards, small photos, or household items).',
      'Lay them face down in a grid.',
      'Turn over two at a time. If they match, set them aside. If not, turn them back.',
      'Continue until all pairs are found.',
    ],
    soloOrAssisted: 'either',
    caregiverVersion:
      'Play together, one flip each turn. Celebrate out loud when either of you finds a pair.',
    lowScoreEncouragement:
      'Matching games get easier the more you play. This is muscle memory for attention.',
    adaptiveEasier: 'Use just 4 pairs. Keep them very different from each other.',
    adaptiveHarder: 'Use 8 or 10 pairs. Or use cards that look similar.',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
    printable: false,
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    category: 'word finding',
    objective: 'Build new words by changing one letter at a time.',
    difficulty: 'medium',
    duration: 5,
    instructions: [
      'Start with CAT.',
      'Change one letter at a time to make a new real word. Example: CAT → COT → COG → DOG.',
      'Try to reach HOME starting from CAT.',
      'There are many right answers. Slowness is fine.',
    ],
    soloOrAssisted: 'either',
    caregiverVersion:
      'Take turns making the next word. Help each other — no clock needed.',
    lowScoreEncouragement:
      "If the ladder feels stuck, stop and try a simpler one: CAT → HAT → HAM.",
    adaptiveEasier:
      'Just change one letter once. Example: CAT → COT. That is a completed game.',
    adaptiveHarder:
      'Aim for 6 rungs from a 3-letter start to a 3-letter end you choose yourself.',
    phaseTags: [4, 5, 6, 7],
    printable: true,
  },
  {
    id: 'what-day-is-it',
    title: 'Orientation Warm-Up',
    category: 'orientation',
    objective: 'Gently orient yourself to the day, without pressure.',
    difficulty: 'very-easy',
    duration: 2,
    instructions: [
      'Out loud, say today\'s day of the week.',
      'Say the date, month, and year.',
      'Say one thing you did yesterday.',
      'Say one thing you hope to do today.',
    ],
    soloOrAssisted: 'either',
    caregiverVersion:
      'Ask the questions over tea in the morning. It should feel like warm conversation, not a quiz.',
    lowScoreEncouragement:
      'If a date is fuzzy, that is okay. A calendar is always right there.',
    adaptiveEasier:
      'Just say the day of the week, nothing more.',
    adaptiveHarder:
      'Add "one thing that made me smile this week" to the list.',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
    printable: false,
  },
  {
    id: 'counting-backward',
    title: 'Gentle Attention — Counting Backward',
    category: 'attention',
    objective: 'A small attention exercise that sharpens focus.',
    difficulty: 'easy',
    duration: 2,
    instructions: [
      'Start at 100.',
      'Count backward by 3 out loud: 100, 97, 94, 91…',
      'Stop when you reach a number below 70, or when you want to.',
    ],
    soloOrAssisted: 'either',
    caregiverVersion:
      'Take turns saying the next number. Help each other, not challenge each other.',
    lowScoreEncouragement:
      'Most people lose track at some point. Restart or switch directions. Trying is the whole point.',
    adaptiveEasier: 'Count backward from 20 by 1s.',
    adaptiveHarder: 'Count backward from 100 by 7s.',
    phaseTags: [2, 3, 4, 5, 6, 7],
    printable: false,
  },
]
