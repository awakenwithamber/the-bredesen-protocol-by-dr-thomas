export type Phase = {
  id: string
  number: number
  title: string
  weekRange: [number, number]
  tagline: string
  overview: string
  weeklyIntention: string
  keyHabits: string[]
  caregiverGuidance: string
  successMarker: string
}

/**
 * Six phases, four weeks each — 24 weeks total. This matches the
 * "24 weeks / 6 months" workbook structure.
 */
export const phases: Phase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Foundations, Reset & Orientation',
    weekRange: [1, 4],
    tagline: 'Begin gently. Meet your workbook. Settle in.',
    overview:
      'The first four weeks are about getting comfortable. You meet the program, settle into a daily rhythm, and take small, calming first steps. There is no rush here.',
    weeklyIntention: 'Show up each day, even briefly. That is the whole plan.',
    keyHabits: [
      'Drink a full glass of water when you wake',
      'One short, calming breath practice each day',
      'One small movement, even from a chair',
    ],
    caregiverGuidance:
      'Sit with them as they open the workbook for the first time. Reassurance is the whole assignment right now.',
    successMarker: 'The workbook feels familiar and unhurried.',
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Food, Blood Sugar & Sleep',
    weekRange: [5, 8],
    tagline: 'Nourish the brain. Protect the night.',
    overview:
      'We introduce a brain-supportive way of eating — steadier meals, more color, protein in the morning — and we protect the sleep that gives the brain time to clean and repair itself.',
    weeklyIntention: 'Build plates that keep your energy steady. Protect sleep.',
    keyHabits: [
      'Protein at breakfast',
      'Color at every meal (two colors is a win)',
      'Dim lights one hour before bed',
    ],
    caregiverGuidance:
      'Cook one simple meal together. Share a quiet evening wind-down routine.',
    successMarker: 'Afternoon slumps feel gentler. Bedtime feels easier.',
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Detox, Inflammation & Energy',
    weekRange: [9, 12],
    tagline: 'Lower the load. Let the body cool.',
    overview:
      'We quietly reduce the everyday exposures — fragrance, plastics, harsh cleaners — and support the body’s natural pathways for clearing them. The goal is a calmer system, not a cleanse.',
    weeklyIntention: 'Lighten the load on the body, one swap at a time.',
    keyHabits: [
      'Fragrance-free soap, detergent and lotion',
      'Filtered water at home',
      'Open a window for 10 minutes daily',
    ],
    caregiverGuidance:
      'Help with one product swap this phase. Label the replacements so nobody reaches for the old ones.',
    successMarker: 'The home feels lighter. Energy is steadier.',
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Movement, Brain Training & Stress Recovery',
    weekRange: [13, 16],
    tagline: 'Move the body. Stretch the brain. Soothe the nerves.',
    overview:
      'We layer in a little more movement, a little more cognitive challenge, and a lot more nervous-system kindness. The brain grows when gently stretched — and only when it feels safe.',
    weeklyIntention: 'A little more movement. A little more challenge.',
    keyHabits: [
      'A 10-minute walk most days',
      'Three short brain games per week',
      'One longer nervous-system practice weekly',
    ],
    caregiverGuidance:
      'Walk together when you can. Play a game with them — company is half the benefit.',
    successMarker: 'Balance, word-finding, and mood all feel a little steadier.',
  },
  {
    id: 'phase-5',
    number: 5,
    title: 'Consistency & Cognitive Growth',
    weekRange: [17, 20],
    tagline: 'What is working? Let us do more of that.',
    overview:
      'By now some habits feel automatic. This phase is about reinforcing them, gently releasing what is not helping, and adding a slightly deeper cognitive challenge.',
    weeklyIntention: 'Keep what works. Gently release what does not.',
    keyHabits: [
      'Identify your two most supportive habits',
      'Pair each to an anchor (morning tea, after dinner)',
      'Celebrate one small win out loud each day',
    ],
    caregiverGuidance:
      'Ask what feels easier now than it did in Week 1. Listen more than advise.',
    successMarker: 'Several habits feel like "just what we do now."',
  },
  {
    id: 'phase-6',
    number: 6,
    title: 'Maintenance & Long-Term Brain Health',
    weekRange: [21, 24],
    tagline: 'Your long-term rhythm begins.',
    overview:
      'The workbook quietly hands the leadership back to you. You choose three habits to carry forward, you plan any follow-up you want, and you finish with a written plan in your own words.',
    weeklyIntention: 'Carry forward the three habits that matter most.',
    keyHabits: [
      'Three habits you commit to keep long-term',
      'A monthly self check-in on the calendar',
      'A written plan you can read on a hard day',
    ],
    caregiverGuidance:
      'Help write the long-term plan together. Print it. Put it on the fridge.',
    successMarker: 'You have a written plan you believe you can keep.',
  },
]

export function getPhaseForWeek(week: number): Phase {
  return (
    phases.find((p) => week >= p.weekRange[0] && week <= p.weekRange[1]) ??
    phases[0]
  )
}
