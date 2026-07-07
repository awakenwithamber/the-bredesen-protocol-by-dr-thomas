export type Movement = {
  id: string
  title: string
  duration: number // minutes
  category: string
  instructions: string[]
  seatedOption: string
  lowEnergyOption: string
  caregiverAssist: string
  caution: string
  bodyArea: string
  balanceSupport: boolean
  equipment: string[]
  phaseTags: number[]
  audioCueScript: string
}

export const movements: Movement[] = [
  {
    id: 'morning-shoulder-roll',
    title: 'Morning Shoulder Rolls & Neck Release',
    duration: 3,
    category: 'seated mobility',
    instructions: [
      'Sit tall with both feet flat on the floor.',
      'Take a slow breath in. On the breath out, roll both shoulders up, back, and down. 5 times.',
      'Then roll them forward in the same slow way. 5 times.',
      'Turn your head gently to the right, hold for 3 slow breaths.',
      'Turn gently to the left, hold for 3 slow breaths.',
      'Finish by shrugging shoulders up to your ears, then letting them fall. 3 times.',
    ],
    seatedOption: 'This whole practice is already seated.',
    lowEnergyOption:
      'Do only the slow shoulder rolls — 3 forward, 3 back. Skip the head turns.',
    caregiverAssist:
      'Sit across from the person and do the movements with them. Go slowly. Mirror their pace, not yours.',
    caution:
      'If any motion creates dizziness or sharp pain, stop. A little stiffness fading as you move is normal.',
    bodyArea: 'neck and shoulders',
    balanceSupport: false,
    equipment: ['a sturdy chair'],
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
    audioCueScript:
      "Sit comfortably. Feet flat. Let's breathe in… and roll the shoulders up, back, and down. Slow. Beautiful. One more. Now forward…",
  },
  {
    id: 'wall-push',
    title: 'Wall Push — Gentle Upper Body',
    duration: 4,
    category: 'light strength',
    instructions: [
      'Stand about arm-length from a sturdy wall.',
      'Place both palms on the wall at shoulder height, shoulder-width apart.',
      'Slowly bend your elbows and bring your chest toward the wall.',
      'Press gently back to standing. That is one.',
      'Do 8 slow reps. Rest. Do 8 more if you feel strong.',
    ],
    seatedOption:
      'Sit facing a table. Place both palms on the table edge. Gently lean forward and press back. 8 slow reps.',
    lowEnergyOption: 'Do 5 reps, not 16. Any reps are a win.',
    caregiverAssist:
      'Stand beside them for quiet reassurance. No need to guide — just company.',
    caution:
      'Start with a very gentle lean. You can always lean further next time. If a shoulder is sore, skip this.',
    bodyArea: 'chest, arms, shoulders',
    balanceSupport: true,
    equipment: ['a solid wall'],
    phaseTags: [3, 4, 5, 6, 7],
    audioCueScript:
      "Hands on the wall. Breathe in… lean gently toward the wall. Breathe out… press away. Smooth and slow.",
  },
  {
    id: 'balance-check',
    title: 'Daily Balance Check-In',
    duration: 2,
    category: 'balance support',
    instructions: [
      'Stand near a sturdy counter with one hand resting lightly on it.',
      'Lift one foot just an inch off the floor. Hold for 5 slow breaths.',
      'Set it down. Switch feet. Hold for 5 slow breaths.',
      'Do 3 rounds if it feels steady.',
    ],
    seatedOption:
      'Seated: lift one foot a few inches, hold for 5 breaths. Then the other.',
    lowEnergyOption:
      'Just one round on each side. That counts for today.',
    caregiverAssist:
      'Stand nearby on the open side (away from the counter), ready if needed, quiet if not.',
    caution:
      'Always keep a hand near the counter. Balance improves slowly and safely — never through risk.',
    bodyArea: 'legs, core, ankles',
    balanceSupport: true,
    equipment: ['a sturdy counter or back of a chair'],
    phaseTags: [2, 3, 4, 5, 6, 7],
    audioCueScript:
      "Hand on the counter. Lift one foot, just an inch. Breathe… 1, 2, 3, 4, 5. Gently down. Switch sides.",
  },
  {
    id: 'short-walk',
    title: 'Short Walking Practice',
    duration: 10,
    category: 'short walking practice',
    instructions: [
      'Put on comfortable shoes.',
      'Walk for 5 minutes at a pace where you can still speak a full sentence.',
      'Turn around and walk back.',
      'If you walked with someone, thank them.',
    ],
    seatedOption:
      'Marching in place while seated, arms swinging gently, for 3–5 minutes.',
    lowEnergyOption:
      'A 3-minute walk to the end of the block or around the kitchen twice.',
    caregiverAssist:
      'Walk together. Talk about something cheerful. Walking and good conversation are a powerful pair for the brain.',
    caution:
      'If you feel unsteady, use a walking stick or a companion arm. Any amount is progress.',
    bodyArea: 'whole body',
    balanceSupport: false,
    equipment: ['comfortable shoes'],
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
    audioCueScript:
      "Let's take a short walk. Shoulders relaxed, breath easy. Five minutes out, five minutes back.",
  },
  {
    id: 'seated-twist',
    title: 'Seated Spinal Twist',
    duration: 3,
    category: 'flexibility',
    instructions: [
      'Sit tall at the edge of a sturdy chair, feet flat.',
      'Place your right hand on your left knee.',
      'Breathe in and lengthen the spine.',
      'Breathe out and gently turn to the left. Hold for 3 slow breaths.',
      'Return to center. Switch sides.',
      'Do 3 rounds on each side.',
    ],
    seatedOption: 'This is already seated.',
    lowEnergyOption:
      'Just one gentle turn on each side, a few breaths long.',
    caregiverAssist: 'Sit facing them. Follow their pace.',
    caution:
      'Never force the twist. Turn only as far as is comfortable, chest leading.',
    bodyArea: 'spine, shoulders',
    balanceSupport: false,
    equipment: ['a sturdy chair'],
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
    audioCueScript:
      "Sit tall. Breathe in, lengthen. Breathe out, turn gently left. Chest leads. Beautiful.",
  },
  {
    id: 'cross-crawl',
    title: 'Seated Cross-Crawl for Coordination',
    duration: 3,
    category: 'cross-body coordination',
    instructions: [
      'Sit tall with feet flat.',
      'Lift your right knee. At the same time, reach your left hand to tap it.',
      'Lower. Lift your left knee and reach your right hand to tap it.',
      'Continue slowly, alternating, for 1 minute.',
      'Rest. Do two more rounds.',
    ],
    seatedOption: 'This is already seated.',
    lowEnergyOption:
      'Just 30 seconds, one round. That stimulates the brain beautifully.',
    caregiverAssist:
      'Sit across and do it with them. Slight mirror-image is fine.',
    caution: 'Move slowly. This is coordination, not cardio.',
    bodyArea: 'whole body coordination',
    balanceSupport: false,
    equipment: ['a sturdy chair'],
    phaseTags: [4, 5, 6, 7],
    audioCueScript:
      "Right knee up, left hand taps. Down. Left knee up, right hand taps. Down. Slow and steady.",
  },
  {
    id: 'evening-stretch',
    title: 'Evening Calming Stretch',
    duration: 5,
    category: 'flexibility',
    instructions: [
      'Sit on the edge of your bed, feet flat.',
      'Gently reach both arms overhead and interlace your fingers, palms up. Hold 3 breaths.',
      'Release. Fold gently forward, letting your head be heavy. Hold 3 breaths.',
      'Slowly roll up.',
      'Finish with 3 slow shoulder rolls.',
    ],
    seatedOption: 'Already seated.',
    lowEnergyOption: 'Just the overhead reach and one slow forward fold.',
    caregiverAssist: 'Dim the lights. Sit with them quietly.',
    caution:
      'If dizziness happens when folding forward, fold only halfway and rest your forearms on your thighs.',
    bodyArea: 'spine, shoulders',
    balanceSupport: false,
    equipment: ['edge of a bed or a chair'],
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
    audioCueScript:
      "Arms rise up, long and slow. Hold. Now fold gently forward, let the head be heavy. Breathe here.",
  },
]
