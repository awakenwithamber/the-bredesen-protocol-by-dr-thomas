/**
 * Workbook game engine
 * --------------------
 * One short cognitive activity per day, rotated deterministically. All
 * games are large-text, shame-free, and explicitly labelled as "no
 * score, no timer required." The in-depth interactive versions still
 * live under /brain-games — this pool is the gentle daily slot.
 */

export type WorkbookGame = {
  id: string
  title: string
  howTo: string
  encouragement: string
}

export const workbookGames: WorkbookGame[] = [
  {
    id: 'memory-match',
    title: 'Memory Match',
    howTo:
      'Turn over two cards at a time and try to find pairs. Start with 6 pairs. No timer.',
    encouragement: 'Remembering just one pair counts as a win.',
  },
  {
    id: 'name-ten-animals',
    title: 'Name 10 Animals',
    howTo:
      'Out loud or on paper, name ten animals. Start with pets if that is easier.',
    encouragement: 'Word-finding exercise — any number you reach is real practice.',
  },
  {
    id: 'word-recall',
    title: 'Word Recall',
    howTo:
      'Read these five words slowly: apple, river, pencil, window, honey. Do something else for two minutes. Now write the ones you remember.',
    encouragement: 'Even recalling two of five helps your memory circuits.',
  },
  {
    id: 'category-challenge',
    title: 'Category Challenge',
    howTo:
      'Pick a category (fruits, instruments, birds). Name as many as you can in 60 seconds.',
    encouragement: 'The trying is the whole benefit.',
  },
  {
    id: 'sequence-steps',
    title: 'Sequence Steps',
    howTo:
      'Describe the steps of making a cup of tea in order. Out loud or in writing.',
    encouragement: 'Walking through familiar sequences strengthens the brain.',
  },
  {
    id: 'picture-memory',
    title: 'Picture Memory',
    howTo:
      'Look carefully at a photo on the wall for 30 seconds. Look away. Name five things you remember from the picture.',
    encouragement: 'Noticing is a skill that grows with use.',
  },
  {
    id: 'story-recall',
    title: 'Short Story Recall',
    howTo:
      'Read a short news article or a page from a book. Wait ten minutes. Tell someone the main point in your own words.',
    encouragement: 'Summarizing in your own words is one of the best brain workouts.',
  },
  {
    id: 'attention-tap',
    title: 'Attention Tap',
    howTo:
      'Tap once whenever you hear the letter S in this sentence: "The sun sets softly over the still sea."',
    encouragement: 'Focus muscles strengthen with short, playful drills.',
  },
  {
    id: 'find-difference',
    title: 'Find the Difference',
    howTo:
      'Look at two similar photos and find three things that are different. Any puzzle book or app works.',
    encouragement: 'Noticing small differences trains attention.',
  },
  {
    id: 'word-builder',
    title: 'Word Builder',
    howTo:
      'Pick a long word (breakfast). How many shorter words can you make from its letters?',
    encouragement: 'Even three short words is a lovely warm-up.',
  },
  {
    id: 'alphabet-game',
    title: 'Alphabet Game',
    howTo:
      'Pick a category (food). Name one for each letter A–Z (apple, bread, carrot...).',
    encouragement: 'Skip any letter that feels stuck — come back to it later.',
  },
  {
    id: 'recall-meals',
    title: 'Recall Yesterday\'s Meals',
    howTo:
      'Without peeking, write down what you ate yesterday. Breakfast, lunch, dinner, any snacks.',
    encouragement: 'Everyday memory is the memory that matters most.',
  },
  {
    id: 'counting-by-threes',
    title: 'Counting by Threes',
    howTo:
      'Out loud, count backward from 60 by threes: 60, 57, 54... Stop when you get to zero or lose your place. Start again for fun.',
    encouragement: 'Working memory warm-up — the slip-ups are part of the practice.',
  },
  {
    id: 'odd-one-out',
    title: 'Odd One Out',
    howTo:
      'Group: apple, pear, carrot, grape. Which one does not belong, and why?',
    encouragement: 'There is often more than one right answer — say yours out loud.',
  },
  {
    id: 'opposite-words',
    title: 'Opposite Words',
    howTo:
      'Say (or write) the opposite: hot, up, loud, heavy, fast, bitter, early.',
    encouragement: 'Language-flexibility practice. Skip any that feel stuck.',
  },
  {
    id: 'visualize-place',
    title: 'Visualize a Place',
    howTo:
      'Close your eyes. Picture the room you grew up in. Describe five details out loud.',
    encouragement: 'Visualization strengthens memory networks.',
  },
  {
    id: 'two-truths',
    title: 'Two Truths and a Fib',
    howTo:
      'Tell a family member three small things — two true, one made up. See if they can spot the fib.',
    encouragement: 'Play is real brain exercise.',
  },
  {
    id: 'phone-numbers',
    title: 'Old Phone Numbers',
    howTo:
      'Write down one phone number from memory — a parent, a childhood friend, an old workplace.',
    encouragement: 'Long-term memory is worth visiting.',
  },
]

export function gameForDay(day: number): WorkbookGame {
  const len = workbookGames.length
  const idx = (((day - 1) * 11) % len + len) % len
  return workbookGames[idx]
}
