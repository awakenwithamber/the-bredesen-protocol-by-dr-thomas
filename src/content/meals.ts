/**
 * Meal rotation engine
 * --------------------
 * Every workbook day is assigned 5 meals (breakfast, AM snack, lunch,
 * PM snack, dinner). Every 7th workbook day (Friday in a 7-day block)
 * also includes a brain-friendlier dessert.
 *
 * Meals are selected deterministically from category pools using the
 * day number so the same day always shows the same menu, and so meals
 * cycle without too much repetition. The rotations use coprime offsets
 * so a meal doesn't reappear every pool-length days in lockstep.
 */

export type Meal = {
  name: string
  notes?: string
}

export type DailyMeals = {
  breakfast: Meal
  amSnack: Meal
  lunch: Meal
  pmSnack: Meal
  dinner: Meal
  dessert?: Meal
}

export const breakfastPool: Meal[] = [
  {
    name: 'Veggie omelet with sautéed spinach',
    notes: 'Two eggs, a handful of greens, olive oil, sea salt.',
  },
  {
    name: 'Overnight chia pudding with berries',
    notes: 'Chia seeds soaked in unsweetened almond milk with cinnamon.',
  },
  {
    name: 'Greek yogurt bowl with walnuts and flax',
    notes: 'Plain whole-milk Greek yogurt, half a cup of berries, flax.',
  },
  {
    name: 'Green smoothie with avocado and almond butter',
    notes: 'Spinach, half an avocado, a small banana, a spoon of almond butter.',
  },
  {
    name: 'Avocado and two soft-boiled eggs',
    notes: 'Serve over a bed of spinach with lemon and olive oil.',
  },
  {
    name: 'Warm oatmeal remix with berries and walnuts',
    notes: 'Steel-cut oats with cinnamon, blueberries, and chopped walnuts.',
  },
  {
    name: 'Cottage cheese bowl with berries and pumpkin seeds',
    notes: 'Full-fat cottage cheese, a handful of berries, pumpkin seeds.',
  },
  {
    name: 'Smoked salmon with cucumber and avocado',
    notes: 'A small serving of smoked salmon, sliced cucumber, a quarter avocado.',
  },
  {
    name: 'Scrambled eggs with turmeric and mushrooms',
    notes: 'Two eggs, sautéed mushrooms, a pinch of turmeric, olive oil.',
  },
  {
    name: 'Almond-flour blueberry pancakes',
    notes: 'Almond flour, eggs, a splash of milk, fresh blueberries on top.',
  },
  {
    name: 'Sweet potato breakfast hash with eggs',
    notes: 'Diced sweet potato, peppers, and onion; finish with a fried egg.',
  },
  {
    name: 'Nut-butter stuffed apple slices',
    notes: 'Crisp apple slices with almond butter and a sprinkle of cinnamon.',
  },
]

export const amSnackPool: Meal[] = [
  { name: 'A small handful of walnuts' },
  { name: 'A cup of fresh berries' },
  { name: 'Hummus with cucumber and carrot sticks' },
  { name: 'Celery sticks with almond butter' },
  { name: 'Two hard-boiled eggs with sea salt' },
  { name: 'A small bowl of olives and a few cherry tomatoes' },
  { name: 'A handful of pumpkin seeds' },
  { name: 'Half an avocado with lemon and pepper' },
  { name: 'A small apple with a wedge of cheese' },
  { name: 'A square of dark chocolate and a few almonds' },
  { name: 'Greek yogurt with cinnamon' },
  { name: 'Sliced bell peppers with guacamole' },
]

export const lunchPool: Meal[] = [
  {
    name: 'Salmon salad with greens and avocado',
    notes: 'Wild salmon, mixed greens, half an avocado, olive oil and lemon.',
  },
  {
    name: 'Turkey and avocado lettuce wraps',
    notes: 'Romaine leaves filled with turkey, avocado, tomato, and mustard.',
  },
  {
    name: 'Hearty vegetable and lentil soup',
    notes: 'A warming bowl of greens, carrots, lentils and herbs.',
  },
  {
    name: 'Quinoa bowl with roasted vegetables and tahini',
    notes: 'Quinoa, roasted sweet potato, spinach, chickpeas, tahini drizzle.',
  },
  {
    name: 'Sardines on seed crackers with tomato',
    notes: 'Sardines in olive oil over seed crackers with sliced tomato.',
  },
  {
    name: 'Chicken and greens power bowl',
    notes: 'Grilled chicken, greens, shredded carrot, avocado, and olive oil.',
  },
  {
    name: 'Tuna-stuffed tomato with olives',
    notes: 'Hollowed tomato filled with tuna, olives, herbs, and olive oil.',
  },
  {
    name: 'Roasted chicken and roasted vegetable plate',
    notes: 'Leftover roasted chicken, roasted squash, a handful of greens.',
  },
  {
    name: 'Rainbow chopped salad with chickpeas',
    notes: 'Cucumber, tomato, pepper, olives, feta, and chickpeas.',
  },
  {
    name: 'Spinach and mushroom frittata wedge',
    notes: 'A slice of a baked egg and veggie frittata with a green salad.',
  },
]

export const pmSnackPool: Meal[] = [
  { name: 'Greek yogurt with a spoon of almond butter' },
  { name: 'Guacamole with flax crackers' },
  { name: 'A pear with a small wedge of cheese' },
  { name: 'Turkey and cucumber roll-ups' },
  { name: 'A cup of bone broth' },
  { name: 'Sliced cucumbers with everything-seasoned cream cheese' },
  { name: 'Chia-seed pudding cup' },
  { name: 'A handful of mixed nuts and a couple of dried apricots' },
  { name: 'Smoked salmon on cucumber rounds' },
  { name: 'Edamame with sea salt' },
  { name: 'Half an orange with a square of dark chocolate' },
  { name: 'A trail mix of almonds, walnuts, and dried cherries' },
]

export const dinnerPool: Meal[] = [
  {
    name: 'Baked salmon with roasted broccoli and sweet potato',
    notes: 'Lemon, olive oil, a sprinkle of salt — nothing more needed.',
  },
  {
    name: 'Turkey meatballs over sautéed greens',
    notes: 'Lean ground turkey, garlic, parsley, olive oil.',
  },
  {
    name: 'Coconut chicken and vegetable stir fry',
    notes: 'Chicken, peppers, broccoli, ginger, coconut aminos.',
  },
  {
    name: 'Roasted chicken thighs with cauliflower mash',
    notes: 'Comfort food that keeps blood sugar steady.',
  },
  {
    name: 'Lentil and vegetable stew with fresh herbs',
    notes: 'Lentils, carrots, celery, greens, finished with parsley.',
  },
  {
    name: 'Grass-fed beef taco bowl',
    notes: 'Seasoned beef, lettuce, tomato, avocado, salsa — no shell needed.',
  },
  {
    name: 'Cod tray bake with cherry tomatoes and zucchini',
    notes: 'One sheet pan, 20 minutes in the oven.',
  },
  {
    name: 'Shrimp and zucchini noodles with pesto',
    notes: 'Spiralized zucchini, shrimp, basil pesto, lemon.',
  },
  {
    name: 'Beef and mushroom skillet with wilted spinach',
    notes: 'Ground beef, mushrooms, garlic, spinach stirred in at the end.',
  },
  {
    name: 'Herb-roasted chicken with green beans and carrots',
    notes: 'A comforting Sunday-style plate, any day of the week.',
  },
  {
    name: 'Salmon cakes with a cucumber yogurt sauce',
    notes: 'Canned salmon, egg, herbs, baked, served with a cool yogurt sauce.',
  },
  {
    name: 'Whole roasted trout with lemon and dill',
    notes: 'A whole trout, a lemon, fresh dill, and olive oil.',
  },
]

export const dessertPool: Meal[] = [
  {
    name: 'Dark chocolate berry yogurt bark',
    notes: 'Greek yogurt spread thin, topped with berries and dark chocolate, frozen.',
  },
  {
    name: 'Chia seed pudding with cinnamon and berries',
    notes: 'Chia in coconut milk, a touch of maple, cinnamon, fresh berries.',
  },
  {
    name: 'Almond-flour blueberry crumble',
    notes: 'Blueberries baked with an almond flour and oat crumble.',
  },
  {
    name: 'Warm baked apples with walnuts and cinnamon',
    notes: 'Cored apples stuffed with walnuts, baked until soft.',
  },
  {
    name: 'Dark chocolate-dipped strawberries',
    notes: 'Strawberries, a small bowl of melted 70%+ dark chocolate.',
  },
  {
    name: 'Coconut-almond energy bites',
    notes: 'Dates, almonds, coconut, cocoa — rolled and chilled.',
  },
]

export function pickMeal<T>(pool: T[], day: number, offset: number): T {
  const len = pool.length
  const idx = (((day - 1) * 1 + offset) % len + len) % len
  return pool[idx]
}

export function mealsForDay(day: number): DailyMeals {
  // Different offsets per meal slot so they don't all shift in lockstep.
  const breakfast = pickMeal(breakfastPool, day, 0)
  const amSnack = pickMeal(amSnackPool, day, 3)
  const lunch = pickMeal(lunchPool, day, 5)
  const pmSnack = pickMeal(pmSnackPool, day, 7)
  const dinner = pickMeal(dinnerPool, day, 2)
  // Friday within a 7-day block = day % 7 === 5 (Days 5, 12, 19, ...)
  const isFriday = day > 0 && day % 7 === 5
  const dessert = isFriday
    ? pickMeal(dessertPool, Math.ceil(day / 7), 0)
    : undefined
  return { breakfast, amSnack, lunch, pmSnack, dinner, dessert }
}
