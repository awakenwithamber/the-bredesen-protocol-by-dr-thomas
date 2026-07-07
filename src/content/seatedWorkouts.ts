/**
 * Five-minute seated senior workouts (A–E)
 * ----------------------------------------
 * Five rotating, low-risk routines designed for older adults, anyone
 * with low energy, and patients who are most comfortable in a chair.
 *
 * The routines rotate by day so a patient sees a different workout
 * each day of the week. Selection is deterministic — same day, same
 * workout — so caregivers can plan ahead.
 *
 * Every routine includes the same gentle safety note: stop any time
 * something feels dizzy, painful, weak, or unsafe.
 */

export type SeatedExercise = {
  name: string
  cue: string // one short sentence the patient can read out loud
  reps?: string // e.g. "10 slow reps" or "30 seconds"
}

export type SeatedWorkout = {
  id: 'A' | 'B' | 'C' | 'D' | 'E'
  letter: string
  title: string
  focus: string
  durationMinutes: number
  exercises: SeatedExercise[]
}

export const SEATED_WORKOUTS: SeatedWorkout[] = [
  {
    id: 'A',
    letter: 'A',
    title: 'Wake-Up Warm-Up',
    focus: 'Gentle blood flow and posture from the chair.',
    durationMinutes: 5,
    exercises: [
      { name: 'Seated marching', cue: 'Sit tall. March your feet up and down — one side, then the other.', reps: '30 seconds' },
      { name: 'Shoulder rolls', cue: 'Roll both shoulders up, back, and down. Then forward.', reps: '5 each direction' },
      { name: 'Arm reaches', cue: 'Reach both arms gently overhead, then lower to your lap.', reps: '8 slow reaches' },
      { name: 'Toe taps', cue: 'Lift the toes of both feet, then tap them down. Heels stay on the floor.', reps: '20 taps' },
      { name: 'Calm breathing', cue: 'Breathe in for 4. Out for 6. Soft jaw. Soft shoulders.', reps: '5 breaths' },
    ],
  },
  {
    id: 'B',
    letter: 'B',
    title: 'Brain & Body Together',
    focus: 'Light coordination plus a small thinking task.',
    durationMinutes: 5,
    exercises: [
      { name: 'March + name fruits', cue: 'March in place while naming a fruit each time your right knee lifts.', reps: '30 seconds' },
      { name: 'Opposite knee taps', cue: 'Lift right knee, tap with left hand. Lift left knee, tap with right hand.', reps: '20 taps' },
      { name: 'Count backward', cue: 'Count out loud from 30 down to 0 while sitting tall.', reps: 'one full count' },
      { name: 'Cross-body reaches', cue: 'Reach right hand toward left foot. Then left hand toward right foot.', reps: '10 reaches' },
      { name: 'Calm breathing', cue: 'Three slow breaths. Notice your shoulders softening.', reps: '3 breaths' },
    ],
  },
  {
    id: 'C',
    letter: 'C',
    title: 'Mobility Tune-Up',
    focus: 'Joints, circulation, posture.',
    durationMinutes: 5,
    exercises: [
      { name: 'Neck turns', cue: 'Slowly turn your head to look right. Then to look left. Move with your breath.', reps: '5 each side' },
      { name: 'Ankle circles', cue: 'Lift one foot, draw 5 slow circles. Switch feet.', reps: '5 each direction, both feet' },
      { name: 'Wrist circles', cue: 'Make loose fists. Circle the wrists slowly, then reverse.', reps: '10 each direction' },
      { name: 'Tall posture hold', cue: 'Sit tall. Imagine a thread lifting the crown of your head.', reps: '3 slow breaths' },
      { name: 'Calm breathing', cue: 'Breathe in. Breathe out, longer than the in.', reps: '5 breaths' },
    ],
  },
  {
    id: 'D',
    letter: 'D',
    title: 'Gentle Strength',
    focus: 'A little strength and a steady core.',
    durationMinutes: 5,
    exercises: [
      { name: 'Sit-to-stand or seated press', cue: 'If safe: stand up, sit down, slowly. If not: press your palms onto the chair seat and lift slightly.', reps: '5–8 reps' },
      { name: 'Heel presses', cue: 'Press both heels firmly into the floor. Hold for 3. Release.', reps: '8 presses' },
      { name: 'Glute squeeze', cue: 'Squeeze the muscles of your seat. Hold for 3. Release.', reps: '8 squeezes' },
      { name: 'Core brace breathing', cue: 'Hands on belly. Breathe in. Breathe out and gently brace your middle.', reps: '5 breaths' },
      { name: 'Shoulder blade squeeze', cue: 'Pull both shoulder blades back and down. Hold for 3.', reps: '8 squeezes' },
    ],
  },
  {
    id: 'E',
    letter: 'E',
    title: 'Wind-Down Flow',
    focus: 'Calm the nervous system; great before bed.',
    durationMinutes: 5,
    exercises: [
      { name: 'Slow breathing', cue: 'Breathe in for 4. Out for 6. Sit very still.', reps: '6 breaths' },
      { name: 'Gentle arm flow', cue: 'Float arms up on the in-breath. Lower on the out-breath.', reps: '5 reps' },
      { name: 'Side bends', cue: 'Reach right arm overhead and lean gently left. Switch sides.', reps: '4 each side' },
      { name: 'Ankle pumps', cue: 'Point and flex each foot slowly.', reps: '10 each foot' },
      { name: 'Relaxation breathing', cue: 'Eyes soft. Jaw soft. Three long, easy breaths.', reps: '3 breaths' },
    ],
  },
]

export const WORKOUT_SAFETY_NOTE =
  'Please stop right away if you feel dizzy, in pain, weak, or unsteady. Sit, sip water, and rest. There is no exercise that is more important than your safety.'

/**
 * Returns the seated workout for a given workbook day.
 * Day 1 → A, Day 2 → B, Day 3 → C, Day 4 → D, Day 5 → E, Day 6 → A, …
 */
export function workoutForDay(day: number): SeatedWorkout {
  const i = ((day - 1) % SEATED_WORKOUTS.length + SEATED_WORKOUTS.length) % SEATED_WORKOUTS.length
  return SEATED_WORKOUTS[i]
}
