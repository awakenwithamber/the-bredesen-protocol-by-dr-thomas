/**
 * Journal prompts for the workbook
 * --------------------------------
 * One prompt per day. Rotated deterministically across a large pool so
 * the same prompt rarely returns inside a month. Grouped gently by
 * morning / midday / evening / reflection tones, which is the order
 * they cycle through the week.
 */

export type JournalPrompt = {
  prompt: string
  tone: 'morning' | 'midday' | 'evening' | 'reflection' | 'clear-clutter' | 'growth'
}

export const journalPrompts: JournalPrompt[] = [
  { prompt: 'What is one reason I want better brain health?', tone: 'reflection' },
  { prompt: 'How do I feel this morning — body, mind, mood?', tone: 'morning' },
  { prompt: 'What is one small thing I can do kindly for myself today?', tone: 'morning' },
  { prompt: 'What is going well today, however small?', tone: 'midday' },
  { prompt: 'What did I do well today?', tone: 'evening' },
  { prompt: 'Write anything on your mind — nothing is too small.', tone: 'clear-clutter' },
  { prompt: 'What is one thing I would like to improve tomorrow?', tone: 'growth' },
  { prompt: 'What did I notice in my body this morning?', tone: 'morning' },
  { prompt: 'Where did I feel calm today?', tone: 'midday' },
  { prompt: 'What is one thing I am grateful for right now?', tone: 'reflection' },
  { prompt: 'What was the best bite I had today?', tone: 'evening' },
  { prompt: 'Who is someone I can lean on this week?', tone: 'reflection' },
  { prompt: 'What is a small boundary I want to keep this week?', tone: 'growth' },
  { prompt: 'What is my body asking for today?', tone: 'morning' },
  { prompt: 'What is one worry I can set down for the night?', tone: 'evening' },
  { prompt: 'What is one habit from Week 1 that is easier now?', tone: 'reflection' },
  { prompt: 'What surprised me this week?', tone: 'reflection' },
  { prompt: 'Write about a moment today that felt nourishing.', tone: 'evening' },
  { prompt: 'What would "easy" look like tomorrow?', tone: 'growth' },
  { prompt: 'Name one strength you brought to today.', tone: 'evening' },
  { prompt: 'What is a small joy that is free and available to me?', tone: 'morning' },
  { prompt: 'What did I give myself permission to skip today?', tone: 'midday' },
  { prompt: 'Where in my body do I feel steady?', tone: 'midday' },
  { prompt: 'What does "rest" mean to me today?', tone: 'morning' },
  { prompt: 'What made me laugh this week, even softly?', tone: 'reflection' },
  { prompt: 'What food felt the best in my body today?', tone: 'evening' },
  { prompt: 'What is one thing I learned about myself this week?', tone: 'reflection' },
  { prompt: 'What environment feels calming to me?', tone: 'midday' },
  { prompt: 'What is a kind thing I would tell a friend in my place?', tone: 'clear-clutter' },
  { prompt: 'What am I willing to let be imperfect today?', tone: 'morning' },
  { prompt: 'What part of the workbook has felt most helpful?', tone: 'reflection' },
  { prompt: 'Who would I thank today if I could?', tone: 'evening' },
  { prompt: 'What is one thing I want to remember from this week?', tone: 'growth' },
  { prompt: 'What am I quietly proud of lately?', tone: 'reflection' },
  { prompt: 'What does the rest of the day need from me?', tone: 'midday' },
  { prompt: 'What is one healthy habit I want to keep forever?', tone: 'growth' },
  { prompt: 'What is a thought I can gently release before bed?', tone: 'evening' },
  { prompt: 'What does my brain want me to notice today?', tone: 'morning' },
  { prompt: 'What is a small ritual I would like to build?', tone: 'growth' },
  { prompt: 'What did I enjoy about moving my body today?', tone: 'evening' },
  { prompt: 'What is one way today was good enough?', tone: 'evening' },
  { prompt: 'What is one thing I will not carry into tomorrow?', tone: 'clear-clutter' },
  { prompt: 'What is a memory that still makes me smile?', tone: 'reflection' },
]

export function promptForDay(day: number): JournalPrompt {
  const len = journalPrompts.length
  const idx = (((day - 1) * 7) % len + len) % len
  return journalPrompts[idx]
}
