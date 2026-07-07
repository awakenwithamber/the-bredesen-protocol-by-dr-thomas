/**
 * Daily quote engine
 * ------------------
 * Every workbook page shows one short, attributed quote that speaks to
 * the spirit of the program: small, steady, kind, and grounded in
 * brain-health wisdom. The pool is large enough that quotes never
 * repeat inside a single week. Selection is deterministic by day so
 * the same day always shows the same quote.
 *
 * Voices included (per Dr. Thomas's request):
 *   - Dr. Maya Thomas (clinic guidance, clearly labeled)
 *   - Dr. Dale Bredesen
 *   - Hippocrates
 *   - Marcus Aurelius
 *   - Viktor Frankl
 *   - Maya Angelou
 *   - William Osler
 *   - Albert Schweitzer
 *   - Plato
 *   - Thich Nhat Hanh
 *   - Florence Nightingale
 *
 * Plus a small set of "Clinic guidance" lines — original to this
 * portal, clearly labeled so they are never confused with attributed
 * quotes.
 */

export type Quote = { text: string; attribution?: string }

export const quotePool: Quote[] = [
  // ----- Dr. Maya Thomas — clinic voice -----
  {
    text: 'Small daily actions often create the biggest long-term changes.',
    attribution: 'Dr. Maya Thomas',
  },
  {
    text: 'The brain thrives when the body feels supported.',
    attribution: 'Dr. Maya Thomas',
  },
  {
    text: 'You do not have to do this perfectly. You only have to keep showing up.',
    attribution: 'Dr. Maya Thomas',
  },
  {
    text: 'Kindness to yourself is the fastest way through.',
    attribution: 'Dr. Maya Thomas',
  },
  {
    text: 'A calm home is medicine for the brain.',
    attribution: 'Dr. Maya Thomas',
  },

  // ----- Dr. Dale Bredesen -----
  {
    text: 'What is good for the body is good for the brain.',
    attribution: 'Dr. Dale Bredesen',
  },
  {
    text: 'Cognitive decline is, for the vast majority of us, a programmatic problem — and programs can be changed.',
    attribution: 'Dr. Dale Bredesen',
  },
  {
    text: 'Prevention is far easier than reversal — but reversal is possible.',
    attribution: 'Dr. Dale Bredesen',
  },

  // ----- Hippocrates -----
  {
    text: 'Let food be thy medicine and medicine be thy food.',
    attribution: 'Hippocrates',
  },
  {
    text: 'Walking is the best medicine.',
    attribution: 'Hippocrates',
  },
  {
    text: 'Healing is a matter of time, but it is sometimes also a matter of opportunity.',
    attribution: 'Hippocrates',
  },

  // ----- Marcus Aurelius -----
  {
    text: 'The impediment to action advances action. What stands in the way becomes the way.',
    attribution: 'Marcus Aurelius',
  },
  {
    text: 'You have power over your mind — not outside events. Realize this, and you will find strength.',
    attribution: 'Marcus Aurelius',
  },
  {
    text: 'Confine yourself to the present.',
    attribution: 'Marcus Aurelius',
  },

  // ----- Viktor Frankl -----
  {
    text: 'When we are no longer able to change a situation, we are challenged to change ourselves.',
    attribution: 'Viktor Frankl',
  },
  {
    text: 'Between stimulus and response there is a space. In that space is our power to choose our response.',
    attribution: 'Viktor Frankl',
  },

  // ----- Maya Angelou -----
  {
    text: 'I can be changed by what happens to me. But I refuse to be reduced by it.',
    attribution: 'Maya Angelou',
  },
  {
    text: 'Do the best you can until you know better. Then when you know better, do better.',
    attribution: 'Maya Angelou',
  },

  // ----- William Osler -----
  {
    text: 'The good physician treats the disease; the great physician treats the patient who has the disease.',
    attribution: 'William Osler',
  },
  {
    text: 'Care more particularly for the individual patient than for the special features of the disease.',
    attribution: 'William Osler',
  },

  // ----- Albert Schweitzer -----
  {
    text: 'The doctor of the future will give no medication, but will interest his patients in the care of the human frame, in diet, and in the cause and prevention of disease.',
    attribution: 'Albert Schweitzer',
  },
  {
    text: 'Happiness is the only thing that multiplies when you share it.',
    attribution: 'Albert Schweitzer',
  },

  // ----- Plato -----
  {
    text: 'The part can never be well unless the whole is well.',
    attribution: 'Plato',
  },
  {
    text: 'Lack of activity destroys the good condition of every human being, while movement and methodical physical exercise save it and preserve it.',
    attribution: 'Plato',
  },

  // ----- Thich Nhat Hanh -----
  {
    text: 'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.',
    attribution: 'Thich Nhat Hanh',
  },
  {
    text: 'The present moment is the only moment available to us, and it is the door to all moments.',
    attribution: 'Thich Nhat Hanh',
  },
  {
    text: 'Walk as if you are kissing the earth with your feet.',
    attribution: 'Thich Nhat Hanh',
  },

  // ----- Florence Nightingale -----
  {
    text: 'I attribute my success to this — I never gave or took any excuse.',
    attribution: 'Florence Nightingale',
  },
  {
    text: 'How very little can be done under the spirit of fear.',
    attribution: 'Florence Nightingale',
  },

  // ----- Clinic guidance — original lines, clearly labeled -----
  { text: 'Progress beats perfection.', attribution: 'Clinic guidance' },
  { text: 'You are not behind. You are on your path.', attribution: 'Clinic guidance' },
  { text: 'One small step today is the whole plan.', attribution: 'Clinic guidance' },
  { text: 'Welcome back. We will continue today.', attribution: 'Clinic guidance' },
  { text: 'A short walk is a real walk.', attribution: 'Clinic guidance' },
  { text: 'Hydration is a love letter to the brain.', attribution: 'Clinic guidance' },
  { text: 'Sleep is medicine. Treat it that way.', attribution: 'Clinic guidance' },
  { text: 'Rest is part of the program, not a break from it.', attribution: 'Clinic guidance' },
  { text: 'One sentence in a journal is a whole entry.', attribution: 'Clinic guidance' },
  { text: 'Showing up is the whole thing.', attribution: 'Clinic guidance' },
  { text: 'Steady is faster than rushed.', attribution: 'Clinic guidance' },
  { text: 'Light in the morning is a gift to the night.', attribution: 'Clinic guidance' },
]

export function quoteForDay(day: number): Quote {
  const len = quotePool.length
  const idx = (((day - 1) % len) + len) % len
  return quotePool[idx]
}
