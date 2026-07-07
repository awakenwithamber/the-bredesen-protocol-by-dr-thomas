export type Recipe = {
  id: string
  title: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  summary: string
  prepTime: number
  totalTime: number
  tags: string[]
  effort: 'very-easy' | 'easy' | 'moderate'
  ingredients: string[]
  instructions: string[]
  substitutions: string[]
  caregiverNote: string
  minimumEffortVersion: string
  textureNotes?: string
  phaseTags: number[]
}

export const recipes: Recipe[] = [
  {
    id: 'warm-berry-oats',
    title: 'Warm Berry & Walnut Breakfast Bowl',
    mealType: 'breakfast',
    summary:
      'A soft, warming breakfast bowl with protein, color, and fiber. Kind on the stomach, steady on blood sugar.',
    prepTime: 5,
    totalTime: 10,
    tags: [
      'quick prep',
      'blood sugar supportive',
      'soft texture',
      'high fiber',
      'anti-inflammatory',
    ],
    effort: 'very-easy',
    ingredients: [
      '1/2 cup rolled oats (or overnight oats from the fridge)',
      '1 cup water or unsweetened almond milk',
      '1/2 cup mixed berries (fresh or frozen)',
      '2 tablespoons chopped walnuts',
      '1 tablespoon ground flaxseed',
      'Pinch of cinnamon',
      'A small spoonful of plain yogurt (optional, for protein)',
    ],
    instructions: [
      'In a small pot, warm the oats with the water or milk for 4–5 minutes until soft.',
      'Stir in the berries near the end so they just warm through.',
      'Spoon into a bowl. Top with walnuts, flax, cinnamon, and yogurt if using.',
      'Sit somewhere calm to eat it.',
    ],
    substitutions: [
      'No oats? Use cooked quinoa with the same toppings.',
      'No walnuts? Almonds or a spoon of nut butter work.',
      'No berries? A ripe banana sliced in works beautifully.',
    ],
    caregiverNote:
      'Prep a double batch. Store one in the fridge. You will have 2 days covered.',
    minimumEffortVersion:
      'Pour plain Greek yogurt into a bowl. Top with a handful of berries, a spoon of flax, and a drizzle of honey.',
    textureNotes: 'Soft. Easy to chew.',
    phaseTags: [1, 2, 3],
  },
  {
    id: 'rainbow-lunch-bowl',
    title: 'Rainbow Chicken & Greens Bowl',
    mealType: 'lunch',
    summary:
      'A colorful lunch bowl that is easy to throw together and steadies blood sugar through the afternoon.',
    prepTime: 10,
    totalTime: 15,
    tags: ['protein-supportive', 'color', 'anti-inflammatory', 'quick prep'],
    effort: 'easy',
    ingredients: [
      '1 cup cooked chicken (rotisserie works well)',
      '2 handfuls of mixed greens',
      '1/2 cup cherry tomatoes, halved',
      '1/2 avocado, sliced',
      '1/4 cup olives',
      '2 tablespoons olive oil',
      '1 tablespoon lemon juice',
      'Salt and pepper',
    ],
    instructions: [
      'Place the greens in a wide shallow bowl.',
      'Arrange the chicken, tomatoes, avocado, and olives on top.',
      'Whisk olive oil and lemon juice with a pinch of salt and pepper.',
      'Drizzle over the bowl and enjoy.',
    ],
    substitutions: [
      'No chicken? Use canned tuna or hard-boiled eggs.',
      'No avocado? A handful of walnuts instead.',
      'No olives? A spoonful of hummus on the side.',
    ],
    caregiverNote: 'Pre-washed salad greens and rotisserie chicken are heroes here.',
    minimumEffortVersion:
      'Rotisserie chicken + a tub of pre-made salad. Add olive oil.',
    phaseTags: [2, 3, 4],
  },
  {
    id: 'salmon-sheet-pan',
    title: 'Sheet-Pan Salmon with Lemon & Greens',
    mealType: 'dinner',
    summary:
      'A one-pan, brain-supportive dinner rich in omega-3s. Very little cleanup.',
    prepTime: 5,
    totalTime: 25,
    tags: [
      'anti-inflammatory',
      'omega-3',
      'quick prep',
      'one pan',
      'batch friendly',
    ],
    effort: 'easy',
    ingredients: [
      '2 salmon fillets (skin on is fine)',
      '1 bunch broccolini or broccoli florets',
      '2 tablespoons olive oil',
      '1 lemon, half sliced, half reserved',
      '2 cloves garlic, minced',
      'Salt and pepper',
    ],
    instructions: [
      'Heat the oven to 400°F (205°C).',
      'On a sheet pan, toss broccoli with olive oil, garlic, salt, and pepper.',
      'Move to the sides. Place salmon in the center, skin down. Drizzle with olive oil.',
      'Lay lemon slices over the salmon. Bake 14–16 minutes until salmon flakes easily.',
      'Squeeze the reserved lemon half over the whole pan before serving.',
    ],
    substitutions: [
      'No salmon? Cod or halibut work just as well (bake a few minutes less).',
      'No broccoli? Asparagus or green beans.',
    ],
    caregiverNote:
      'Cook 4 fillets at once. Tomorrow lunch is already handled.',
    minimumEffortVersion:
      'Frozen salmon fillet + frozen broccoli on one pan. Oil, salt, 18 minutes.',
    phaseTags: [3, 4, 5],
  },
  {
    id: 'simple-chicken-soup',
    title: 'Simple Healing Chicken Soup',
    mealType: 'dinner',
    summary:
      'A soft, soothing soup for low-energy days. Easy on digestion, gentle on the jaw.',
    prepTime: 10,
    totalTime: 30,
    tags: [
      'soft texture',
      'low energy day',
      'batch cooking',
      'caregiver meal prep',
    ],
    effort: 'easy',
    ingredients: [
      '2 cups cooked, shredded chicken',
      '6 cups good chicken broth',
      '2 carrots, diced small',
      '2 celery stalks, diced small',
      '1 small onion, diced',
      '1 cup baby spinach',
      '1 teaspoon dried thyme',
      'Olive oil, salt, pepper',
    ],
    instructions: [
      'Warm olive oil in a pot. Add onion, carrot, and celery. Cook 6 minutes until soft.',
      'Add broth and thyme. Bring to a gentle simmer.',
      'Stir in chicken. Simmer 10 minutes.',
      'Add spinach at the end for 1 minute. Taste and season.',
    ],
    substitutions: [
      'No spinach? Kale or chopped green beans.',
      'Want more comfort? Add a handful of cooked quinoa or brown rice.',
    ],
    caregiverNote:
      'Freeze half in 2-cup containers. This becomes a fast lunch on a rough day.',
    minimumEffortVersion:
      'Warm a carton of quality chicken broth. Stir in pre-shredded rotisserie chicken and a handful of spinach.',
    textureNotes: 'Very soft. Easy to chew and swallow.',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'green-smoothie',
    title: 'Gentle Green Smoothie',
    mealType: 'breakfast',
    summary:
      'A soft, drinkable breakfast when chewing feels like a lot. Steady energy without the spike.',
    prepTime: 3,
    totalTime: 3,
    tags: ['quick prep', 'soft texture', 'low energy day', 'high fiber'],
    effort: 'very-easy',
    ingredients: [
      '1 cup unsweetened almond milk',
      '1 small handful of baby spinach',
      '1/2 ripe banana',
      '1 tablespoon almond butter',
      '1 tablespoon ground flaxseed',
      '1/2 scoop of plain protein powder (optional)',
      'Ice if desired',
    ],
    instructions: [
      'Place everything in a blender.',
      'Blend for 45 seconds until smooth.',
      'Sip slowly.',
    ],
    substitutions: [
      'No spinach? A few frozen berries instead.',
      'No almond butter? A spoon of peanut butter or a handful of walnuts.',
    ],
    caregiverNote:
      'Pre-portion spinach, banana, and nut butter into zip bags in the freezer. Morning is a one-step event.',
    minimumEffortVersion:
      'Kefir + frozen berries + a spoon of almond butter. Blend. Done.',
    textureNotes: 'Drinkable. Very soft.',
    phaseTags: [1, 2, 3],
  },
  {
    id: 'walnut-apple-snack',
    title: 'Apple, Walnut & Cinnamon Plate',
    mealType: 'snack',
    summary:
      'A two-minute snack that keeps blood sugar steady and feels like a treat.',
    prepTime: 2,
    totalTime: 2,
    tags: ['quick prep', 'blood sugar supportive', 'anti-inflammatory'],
    effort: 'very-easy',
    ingredients: [
      '1 small apple',
      '2 tablespoons walnuts',
      'A dusting of cinnamon',
      '1 small square of dark chocolate (optional)',
    ],
    instructions: [
      'Slice the apple thinly.',
      'Arrange on a small plate with walnuts.',
      'Dust cinnamon over the top. Add chocolate if you like.',
    ],
    substitutions: [
      'No apple? A pear works too.',
      'No walnuts? Almonds or pecans.',
    ],
    caregiverNote: 'Slice a whole apple in advance. It keeps 2 days in lemon water.',
    minimumEffortVersion:
      'A handful of walnuts and a clementine. Same idea, zero prep.',
    phaseTags: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'egg-avocado-toast',
    title: 'Soft Egg, Avocado & Sourdough',
    mealType: 'breakfast',
    summary:
      'A simple, protein-forward breakfast with healthy fat and a small amount of slow-release carbohydrate.',
    prepTime: 5,
    totalTime: 10,
    tags: ['protein-supportive', 'quick prep', 'soft texture'],
    effort: 'easy',
    ingredients: [
      '2 eggs',
      '1 slice of seeded sourdough bread',
      '1/4 avocado',
      'Sea salt and pepper',
      'A few slices of tomato (optional)',
    ],
    instructions: [
      'Soft scramble the eggs over low heat with a pat of butter or olive oil.',
      'Toast the sourdough.',
      'Mash the avocado onto the toast. Spoon the eggs over the top.',
      'Sea salt, pepper, tomato slices on the side.',
    ],
    substitutions: [
      'No bread? Skip it. Just eggs and avocado on a plate.',
      'No avocado? A spoon of pesto instead.',
    ],
    caregiverNote:
      'This is a lovely thing to prepare together on a slow morning.',
    minimumEffortVersion:
      'One hard-boiled egg (made ahead) with avocado slices and salt.',
    phaseTags: [2, 3, 4, 5],
  },
]
