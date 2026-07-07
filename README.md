# Bredesen Guided Brain Health Program

A calm, guided 6-month digital companion for patients following a Bredesen /
ReCODE / PreCODE style brain health support program, and for the caregivers
and clinic staff who help them succeed.

This repository is the production-ready foundation: the full patient portal,
caregiver mode, admin roster, sample 14-day content engine, automation
blueprints, and Netlify-native deployment.

## What this project is

A warm, low-tech-friendly, senior-accessible web app that turns a
multi-month program from "emails and PDFs" into:

- one clear daily plan per day
- rotating content (recipes, movement, breathwork, brain games, lessons)
- a gentle progress metaphor (a growing garden, not a red-deficit dashboard)
- a caregiver companion mode
- an admin roster with 30/14-day completion warnings
- a clean transition to paid follow-up care at month 6
- printable sheets for the fridge

This program works **alongside** the clinician's guidance. It does not
promise cure, does not replace medical judgment, and uses compliant
"support healthy routines" language throughout.

## Key technologies

| Layer             | Technology                        |
| ----------------- | --------------------------------- |
| Framework         | TanStack Start (React 19 + Router) |
| Build             | Vite 7                            |
| Styling           | Tailwind CSS 4 + custom design tokens |
| Icons             | lucide-react                      |
| Persistence (MVP) | `localStorage` for patient-local state |
| Persistence (prod)| Netlify Blobs (see `netlify/functions`) |
| Automation        | Netlify Functions (scheduled + HTTP) |
| Auth (prod)       | Netlify Identity (wiring provided) |
| Deployment        | Netlify                           |
| Language          | TypeScript 5.7 (strict mode)      |

## Project layout

```
src/
  components/      Reusable UI: cards, nav shell, orientation bar
  content/         Typed content libraries (phases, recipes, lessons, ...)
  lib/             Date math, progress store, preferences store
  routes/          File-based routes for all pages
netlify/
  functions/       Scheduled reminder engine + enrollment endpoint
```

Every route is senior-first: large fonts, generous tap targets, plain
language, visible orientation, Simple Mode toggle, and a "Read to me"
speech button where it matters.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
# or, to exercise Netlify Functions locally:
/opt/buildhome/node-deps/node_modules/.bin/netlify dev   # http://localhost:8888
```

Then open the landing page, click **Begin my day**, and explore. In
**Settings**, change the **Program start date** to see how the system
flips into 30-day warning, 14-day warning, and maintenance mode.

## Producing the 6-month experience

The content engine is driven by:

- `src/content/phases.ts` — the 7 phases across 24 weeks
- `src/content/dayPlans.ts` — a day-by-day plan (14 days fully written; each
  day references a lesson, recipe, movement, breathwork, game, and check-in)
- `src/content/recipes.ts`, `movements.ts`, `breathwork.ts`, `brainGames.ts`,
  `lessons.ts`, `library.ts` — the supporting libraries

To extend to the full 180 days, clinic staff add more entries to
`dayPlans.ts` or migrate the content to Content Collections / a headless
CMS backed by the same shape.

## Production considerations

- **Auth:** Wire Netlify Identity (`@netlify/identity`) to gate `/dashboard`,
  `/today`, `/caregiver`, `/admin` — scaffolds are in `.agents/skills/`.
- **Persistence:** Replace the `localStorage`-backed hooks in `src/lib/*`
  with Netlify Blobs calls, keyed on the identity user id.
- **Automation:** `netlify/functions/reminder-engine.ts` runs on schedule.
  Replace the stub message-send step with Resend / Twilio.
- **Compliance:** All patient-facing copy uses "may help" / "support"
  wording — not "cure" / "reverse". Keep it that way.
