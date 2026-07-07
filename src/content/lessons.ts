export type Lesson = {
  id: string
  title: string
  category: string
  summary: string
  estimatedMinutes: number
  audience: 'patient' | 'caregiver' | 'both'
  simpleVersion: string
  deeperVersion: string
  printTakeaway: string
  audioScript: string
  phaseTags: number[]
  relatedActions: string[]
}

export const lessons: Lesson[] = [
  {
    id: 'welcome',
    title: 'Welcome — What This Program Is (and Is Not)',
    category: 'orientation',
    summary:
      'A warm welcome that sets expectations, explains the 6-month journey, and reassures you that small steps are exactly right.',
    estimatedMinutes: 3,
    audience: 'both',
    simpleVersion:
      "Over six months, we will build habits that support your brain: sleep, food, movement, calm, and gentle mental exercise. We go slow. You do not have to catch up. Missed days do not erase progress — you simply begin again the next day.",
    deeperVersion:
      "This program is inspired by the work of Dr. Dale Bredesen and similar functional approaches to brain health. The core idea is that the brain responds to the many things that surround it — sleep, blood sugar, inflammation, stress, movement, and connection. No single element is the answer; many small, supportive choices together create the conditions for cognitive wellness. This program will not promise a cure, and it will not replace your clinician. What it will do is help you build and keep the supportive habits that the research associates with brain health. Your clinician remains the person to discuss medications, supplements, and any medical decisions with. This program is a companion to that care — not a replacement.",
    printTakeaway:
      'The brain responds to many small, supportive habits — sleep, food, movement, calm, and gentle challenge. We build them slowly, together, over 6 months.',
    audioScript:
      "Welcome. Over the next six months, we will build habits, one small step at a time, that support your brain. You will not be asked to do big, exhausting things. You will be asked to show up — briefly — most days. That is enough.",
    phaseTags: [1],
    relatedActions: ['complete-onboarding', 'open-dashboard'],
  },
  {
    id: 'sleep-and-brain',
    title: 'Why Sleep Matters for the Brain',
    category: 'brain health basics',
    summary:
      'During deep sleep, the brain clears away waste. Protecting sleep is one of the most supportive things you can do.',
    estimatedMinutes: 4,
    audience: 'both',
    simpleVersion:
      'While you sleep, your brain takes out the trash. Good sleep helps memory, mood, and thinking. We aim for a regular bedtime, a dim bedroom, and no heavy meals close to bed.',
    deeperVersion:
      "Research on the glymphatic system — the brain's overnight cleaning process — has transformed how we think about sleep. During deep, slow-wave sleep, the brain flushes out metabolic byproducts that build up during the day, including proteins associated with cognitive decline. This is one of the reasons a consistent sleep window and adequate deep sleep are repeatedly associated with better cognitive outcomes. Practical supports include: a consistent wake time (the most powerful sleep signal), outside light within an hour of waking, dim lighting one hour before bed, cooler bedroom temperature, and a predictable wind-down routine. Heavy meals and alcohol too close to bedtime fragment deep sleep even when you do not notice.",
    printTakeaway:
      'Deep sleep helps the brain clean itself. Protect it with a steady bedtime, morning light, and a calm wind-down.',
    audioScript:
      "During deep sleep, the brain clears itself of the day's waste. That is why steady sleep supports memory and mood. We will build a quiet, predictable evening rhythm that makes good sleep easier.",
    phaseTags: [1, 2, 3],
    relatedActions: ['bedtime-wind-down', 'morning-light'],
  },
  {
    id: 'blood-sugar-and-cognition',
    title: 'Blood Sugar, Energy, and Clear Thinking',
    category: 'food and blood sugar',
    summary:
      'Steady blood sugar helps with focus, mood, and memory. We build plates and snacks that keep energy even.',
    estimatedMinutes: 4,
    audience: 'both',
    simpleVersion:
      'When blood sugar rises and crashes, thinking feels foggy. Pairing protein with every meal, including color, and having walnuts or cheese with fruit instead of cookies alone helps keep things steady.',
    deeperVersion:
      "Blood sugar spikes followed by crashes affect cognition in real time. The research in functional medicine consistently suggests that more stable glucose supports clearer thinking, better mood, and steadier energy. Practical supports include starting each meal with protein or fat (not carbohydrate alone), including fiber-rich vegetables at meals, being cautious with juice and sweetened drinks, and choosing fruits with their natural fiber over dried fruit. Many older adults benefit from a 12-hour overnight fast (for example, 7pm to 7am) to let insulin and blood sugar reset. This is a conversation to have with your clinician, especially if you take medication for blood sugar.",
    printTakeaway:
      'Steady blood sugar supports clear thinking. Pair protein with every meal. Let nighttime be a natural fast between dinner and breakfast.',
    audioScript:
      "Blood sugar that rises and falls sharply affects how clearly you think. With a little structure — protein with meals, color on the plate — we can keep things even.",
    phaseTags: [3, 4, 5],
    relatedActions: ['add-protein-breakfast', 'overnight-fast'],
  },
  {
    id: 'movement-neuroplasticity',
    title: 'Movement Grows the Brain',
    category: 'movement and aging well',
    summary:
      'Gentle, regular movement supports new brain cell growth, better blood flow, and steadier mood.',
    estimatedMinutes: 3,
    audience: 'both',
    simpleVersion:
      'You do not need to run. A short walk, a little gentle strength, and a balance check-in each day support the brain more than occasional hard workouts.',
    deeperVersion:
      "Movement has one of the strongest bodies of evidence in brain health. It increases a substance called BDNF (brain-derived neurotrophic factor) — sometimes called fertilizer for the brain — which supports the growth of new connections between neurons. Walking, light resistance, and balance practice all contribute, and the best plan is the one you will actually do. Research consistently suggests that consistency matters more than intensity: 10 minutes most days is more protective than an hour once a week. Balance practice also helps reduce fall risk, which is an important, often overlooked part of maintaining independence.",
    printTakeaway:
      "Movement supports brain growth. Aim for a short walk most days and one balance check daily.",
    audioScript:
      "Your brain responds to movement. Walking, stretching, and small balance practice all help the brain grow. We go slow and steady — consistency beats intensity.",
    phaseTags: [2, 3, 4, 5],
    relatedActions: ['daily-walk', 'balance-check'],
  },
  {
    id: 'stress-nervous-system',
    title: 'Calming the Nervous System',
    category: 'stress and calming',
    summary:
      'Stress hormones, over time, can affect memory and mood. Short, kind practices help reset the nervous system.',
    estimatedMinutes: 4,
    audience: 'both',
    simpleVersion:
      'A slow, long exhale tells your body you are safe. Two or three minutes of quiet breathing, once or twice a day, is a real practice.',
    deeperVersion:
      "The brain and the nervous system are in constant conversation. Chronic stress and elevated cortisol over long periods are associated with changes in memory and attention. The good news is that the nervous system is responsive — simple practices like extended exhales, humming, and the 5-4-3-2-1 grounding exercise reliably shift the body from a stressed state toward a calm, digest-and-repair state. Done briefly but regularly, these practices support the entire brain-body system. They are also a beautiful way for caregivers and patients to connect without words.",
    printTakeaway:
      'Short, gentle breathing practices shift the body toward calm. Do one or two daily. Brief is enough.',
    audioScript:
      "A slow exhale tells the body, 'you are safe.' Two minutes of quiet breathing can change the rest of your day.",
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
    relatedActions: ['extended-exhale', 'hand-on-heart'],
  },
  {
    id: 'transition-after-program',
    title: 'Preparing for Life After the 6 Months',
    category: 'transition after 6 months',
    summary:
      'Your guided 6 months will end. Your educational tools stay with you. Clinical follow-up becomes a standard paid visit.',
    estimatedMinutes: 3,
    audience: 'both',
    simpleVersion:
      'At the end of 6 months, your guided program gently transitions to a maintenance mode. You will still have access to your recipes, lessons, movement, breathwork, and brain games. Follow-up clinical visits after that date become standard paid follow-up appointments with the clinic.',
    deeperVersion:
      "The 6-month guided program is designed to give you a foundation: a rhythm, a toolkit, and the confidence to keep going. When it ends, we want you to leave with something real — which is why the educational content, your saved progress, and all your library resources remain available in maintenance mode. Any follow-up medical visits after your completion date are scheduled at the clinic's standard follow-up rates. We will send a kind reminder 30 days before your program ends, another at 14 days, and a short message on your completion date. If you would like to schedule a follow-up, you can request one directly from the program at any time.",
    printTakeaway:
      'Guided 6 months → then maintenance mode (educational tools stay). Future clinical follow-ups are standard paid visits.',
    audioScript:
      "At the end of six months, your guided program transitions. Your learning tools remain yours. Clinical follow-up becomes a standard paid visit — available whenever you would like.",
    phaseTags: [7],
    relatedActions: ['request-followup'],
  },
  {
    id: 'caregiver-role',
    title: 'For Caregivers — Your Role, Gently',
    category: 'caregiver education',
    summary:
      'You are a companion, not a coach. This lesson is about how to help without taking over.',
    estimatedMinutes: 4,
    audience: 'caregiver',
    simpleVersion:
      'The best thing you can do is show up alongside your person. Walk with them. Cook with them. Breathe with them. You are not in charge of their progress. You are in charge of keeping the program easy.',
    deeperVersion:
      "Caregiving for someone going through cognitive change is emotionally layered. What research and clinical experience both suggest is that the most supportive caregivers are companions, not coaches. The quality of your presence matters more than any prompt you give. That means: doing things with them rather than reminding them; celebrating small wins aloud; not over-correcting; and maintaining your own rhythm (sleep, food, movement) so you can stay present for the long run. This program tries to protect your energy as well. We have printable caregiver sheets, weekly three-action focus cards, and a 'simple mode' that can reduce what is visible when things feel overwhelming.",
    printTakeaway:
      'Be a companion, not a coach. Do things with them. Celebrate quietly. Protect your own rhythm.',
    audioScript:
      "You are a companion, not a coach. Walk with them. Cook with them. Breathe with them. The presence is the gift.",
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
    relatedActions: ['print-caregiver-sheet'],
  },
]
