export type Breathwork = {
  id: string
  title: string
  duration: number // minutes
  category: string
  bestTime: 'morning' | 'midday' | 'anytime' | 'evening' | 'bedtime' | 'stress'
  instructions: string[]
  seatedFriendly: boolean
  lowEnergy: boolean
  caregiverAssisted: string
  audioScript: string
  caution: string
  phaseTags: number[]
}

export const breathwork: Breathwork[] = [
  {
    id: 'extended-exhale',
    title: 'Extended Exhale (4-in, 6-out)',
    duration: 3,
    category: 'extended exhale',
    bestTime: 'anytime',
    instructions: [
      'Sit or lie in a way that feels supported.',
      'Breathe in slowly through the nose for a count of 4.',
      'Breathe out slowly through softly-pursed lips for a count of 6.',
      'Continue for about 3 minutes (or 10 cycles).',
      'End with one normal breath and a small smile.',
    ],
    seatedFriendly: true,
    lowEnergy: true,
    caregiverAssisted:
      'Breathe alongside them out loud, very softly. That gives their body an anchor.',
    audioScript:
      'Breathe in through the nose… 2, 3, 4. And out through soft lips… 2, 3, 4, 5, 6. Beautiful. Again…',
    caution:
      'If any dizziness, return to normal breathing. This is always about ease, never effort.',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'hand-on-heart',
    title: 'Hand on Heart Calming',
    duration: 4,
    category: 'grounding',
    bestTime: 'stress',
    instructions: [
      'Place one hand on your heart and one hand on your belly.',
      'Feel the weight of your hands.',
      'Breathe in through the nose for 4 counts.',
      'Pause for 1 count.',
      'Breathe out through the nose for 6 counts.',
      'Do 10 cycles, feeling your chest and belly rise and fall.',
    ],
    seatedFriendly: true,
    lowEnergy: true,
    caregiverAssisted:
      'Sit next to the person. You can place your own hand on your heart as company.',
    audioScript:
      'One hand on the heart, one on the belly. Feel them. Breathe in through the nose. Pause. Out gently through the nose.',
    caution:
      'If laying back makes breathing feel harder, do this seated.',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'humming-bee',
    title: 'Gentle Humming (Bee Breath)',
    duration: 3,
    category: 'humming',
    bestTime: 'midday',
    instructions: [
      'Sit tall and comfortable.',
      'Breathe in through the nose.',
      'Breathe out with a soft, gentle humming sound, mouth closed.',
      'Let the sound be easy — no effort.',
      'Repeat 10 times.',
    ],
    seatedFriendly: true,
    lowEnergy: true,
    caregiverAssisted:
      'Hum along very softly if you like. Many people enjoy doing this together.',
    audioScript:
      'Breathe in through the nose… and out, a soft gentle hum. Easy. Let the sound be small and kind.',
    caution:
      'If it creates any throat discomfort, just do slow nasal breathing instead.',
    phaseTags: [2, 3, 4, 5, 6, 7],
  },
  {
    id: 'bedtime-count',
    title: 'Bedtime 4-7-8 (Gentle Version)',
    duration: 4,
    category: 'bedtime calming',
    bestTime: 'bedtime',
    instructions: [
      'Lying in bed, let your body sink into the mattress.',
      'Breathe in through the nose for 4 slow counts.',
      'Hold the breath softly for 7 counts.',
      'Breathe out slowly through the mouth for 8 counts.',
      'Repeat 4 times only. Then return to natural breathing.',
    ],
    seatedFriendly: true,
    lowEnergy: true,
    caregiverAssisted:
      'You can set this as a phone reminder and leave the room so they have quiet.',
    audioScript:
      'In for 4… hold softly 7… out slowly 8. Gentle. Just four rounds. Then let sleep come.',
    caution:
      'If the 7-count hold feels too long, shorten to 3. Shorter is fine.',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'five-senses',
    title: '5-4-3-2-1 Grounding',
    duration: 3,
    category: 'sensory orientation',
    bestTime: 'stress',
    instructions: [
      'Look around and name 5 things you can see.',
      'Notice 4 things you can feel (chair, fabric, feet on floor).',
      'Listen for 3 things you can hear.',
      'Find 2 things you can smell (or remember).',
      'Name 1 thing you can taste (or recall).',
    ],
    seatedFriendly: true,
    lowEnergy: true,
    caregiverAssisted:
      'Do it together. Take turns naming each thing. It is comforting.',
    audioScript:
      'Five things you can see. Four things you can feel. Three things you can hear. Two things you can smell. One thing you can taste.',
    caution:
      'No caution. This practice is safe for anyone.',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'morning-reset',
    title: 'Morning Breath Reset',
    duration: 2,
    category: 'slow breathing',
    bestTime: 'morning',
    instructions: [
      'Sit at the edge of your bed.',
      'Take 3 normal breaths to arrive.',
      'Breathe in for 4 counts, slightly deeper than usual.',
      'Breathe out for 4 counts.',
      'Continue for 2 minutes.',
      'Notice how your body feels afterward.',
    ],
    seatedFriendly: true,
    lowEnergy: true,
    caregiverAssisted:
      'Open the curtains for them while they do this. Light + breath is a wonderful morning duo.',
    audioScript:
      'Sit. Arrive. Breathe in smoothly… and out. The day can wait two minutes. This is yours.',
    caution: 'None. Simple and safe.',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'afternoon-pause',
    title: 'Afternoon Pause',
    duration: 2,
    category: 'slow breathing',
    bestTime: 'midday',
    instructions: [
      'Stop whatever you are doing for 2 minutes.',
      'Place both feet firmly on the floor.',
      'Breathe in slowly for 5 counts.',
      'Breathe out slowly for 5 counts.',
      'Do 10 cycles.',
      'Stand up and carry on with your day.',
    ],
    seatedFriendly: true,
    lowEnergy: true,
    caregiverAssisted:
      'Make a cup of tea for them first. The combined pause is restorative.',
    audioScript:
      'Feet on the floor. Breathe in, five counts. Out, five counts. The afternoon softens.',
    caution: 'None.',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
  },
]
