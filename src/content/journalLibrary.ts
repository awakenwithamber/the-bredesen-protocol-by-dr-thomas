// Gentle copy library: quotes of the day, win prompts, mood copy
export type Quote = { text: string; attribution?: string }

export const dailyQuotes: Quote[] = [
  { text: 'Small steps still move you forward.' },
  { text: 'Your effort matters.' },
  { text: 'Today does not need to be perfect.' },
  { text: 'Rest is part of the plan.' },
  { text: 'You are allowed to begin again, softly.' },
  { text: 'A quiet day is still a kind day.' },
  { text: 'Showing up is the whole thing.' },
  { text: 'Gentle is strong.' },
  { text: 'The brain loves consistency, not intensity.' },
  { text: 'One breath at a time is a whole plan.' },
  { text: 'Healing is not linear. You are still healing.' },
  { text: 'A little water, a little light, a little rest.' },
  { text: 'Tomorrow is a new opportunity.' },
  { text: 'You do not have to catch up. You only have to continue.' },
]

export const winSuggestions = [
  'I got out of bed',
  'I drank a glass of water',
  'I took a short walk',
  'I asked for help',
  'I showed up today',
  'I ate a real meal',
  'I sat in the sun for a few minutes',
  'I took a slow breath when I felt rushed',
  'I put my phone down and noticed the quiet',
]

export const gentleGoalSuggestions = [
  'Drink a glass of water first thing',
  'Step outside for five minutes',
  'Eat a warm breakfast',
  'Take three slow breaths',
  'Call someone kind',
  'Rest without guilt',
  'Go to bed a little earlier',
]

export type MoodCopy = {
  emoji: string
  label: string
  caption: string
  response: string
}

export const moodCopy: Record<string, MoodCopy> = {
  calm: {
    emoji: '🌿',
    label: 'Calm',
    caption: 'Steady and quiet.',
    response: 'Lovely. Let today stay gentle.',
  },
  tired: {
    emoji: '😴',
    label: 'Tired',
    caption: 'Low battery.',
    response: 'Rest is a real plan. Do one kind thing for yourself today.',
  },
  worried: {
    emoji: '💭',
    label: 'Worried',
    caption: 'Busy mind.',
    response:
      'One slow breath. Another. You do not have to solve everything today.',
  },
  hopeful: {
    emoji: '🌅',
    label: 'Hopeful',
    caption: 'A little lift.',
    response: 'Lovely. Let that lift carry one small step forward.',
  },
  frustrated: {
    emoji: '🌧️',
    label: 'Frustrated',
    caption: 'Hard day.',
    response:
      'Hard days are part of the path. Try Today Feels Hard if it helps.',
  },
  okay: {
    emoji: '🙂',
    label: 'Okay',
    caption: 'Just okay.',
    response: 'Okay is enough. Okay counts.',
  },
}

export const hardDaySteps = [
  { title: 'Drink a glass of water', body: 'Slowly. Sit while you drink it.' },
  { title: 'Take 3 slow breaths', body: 'In through the nose. Out through the mouth.' },
  { title: 'Eat one nourishing thing', body: 'A piece of fruit, a handful of nuts, or a warm bowl.' },
  { title: 'Write one thought', body: 'Any thought. One sentence is a whole journal.' },
  { title: 'Rest without guilt', body: 'Resting is part of the plan. Your brain heals while you rest.' },
]

export function quoteForDay(day: number): Quote {
  return dailyQuotes[Math.abs(day) % dailyQuotes.length]
}
