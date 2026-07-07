export type EmailTemplate = {
  id: string
  name: string
  subject: string
  preheader: string
  body: string
  trigger: string
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome Email (Day 0)',
    subject: 'Welcome to your 6-month brain health journey',
    preheader: 'Your guided program begins gently. Here is what to expect.',
    body: `Hello [Patient Name],

Welcome. Over the next six months, you have a calm, guided companion for supporting your brain health.

Here is what matters to know right now:

• You do not need to rush. Even 10 minutes a day is enough.
• Your plan is here: [Dashboard Link]
• You can turn on Simple Mode any time. Larger text, fewer options, one task at a time.
• If you have a caregiver helping you, we have materials for them too.

Your program start date: [Start Date]
Your expected completion date: [End Date]

We will send short daily notes to remind you of today's plan. You can stop those at any time in Settings.

With care,
The Clinic Team

If you ever feel overwhelmed, press the "Help" button on your dashboard. We are here.`,
    trigger: 'Patient enrolled by admin; start_date set',
  },
  {
    id: 'day-1',
    name: 'Day 1 Gentle Reminder',
    subject: 'Your first day is ready',
    preheader: 'Just 15 minutes. One small thing for your brain.',
    body: `Good morning [Patient Name],

Your Day 1 plan is short and kind. Roughly 15 minutes total.

Today's focus:
• One warm breakfast idea
• One short breath practice
• One very gentle movement
• One small brain game

Open your plan: [Today Link]

Remember: you cannot do this wrong.

— The Clinic Team`,
    trigger: 'scheduled at 8am local time on start date + 1 day',
  },
  {
    id: 'missed-3-days',
    name: 'Missed 3 Days — Kind Re-Entry',
    subject: 'A gentle hello — whenever you are ready',
    preheader: 'You do not need to catch up. Today is enough.',
    body: `Hello [Patient Name],

It has been a few days. No problem at all. Here is the thing worth remembering:

You do not need to go back and catch up. You simply begin with today's plan.

We have made today's plan extra short: one breath practice, one small food idea, and a short walk or seated movement.

Your plan for today: [Today Link]

Step back in whenever you are ready. We will be here.

— The Clinic Team`,
    trigger: 'engagement: no completions in last 3 days',
  },
  {
    id: 'weekly-summary',
    name: 'Weekly Summary (Sunday)',
    subject: 'Your week — a small celebration',
    preheader: "This is what your showing up looks like.",
    body: `Hello [Patient Name],

Here is a quiet look at your week:

• Days you showed up: [X] of 7
• Minutes spent caring for your brain: about [Y]
• Recipes tried: [Z]
• Movement sessions: [M]
• Brain games played: [G]

One thing you might try next week: [Phase-Appropriate Tip]

No rankings. No judgments. Just your work, quietly acknowledged.

Your next week is ready: [Week Link]

— The Clinic Team`,
    trigger: 'scheduled Sunday evening local time',
  },
  {
    id: 'caregiver-invite',
    name: 'Caregiver Invitation',
    subject: '[Patient Name] has invited you to help',
    preheader: "A calm view into their week, and how you can support.",
    body: `Hello,

[Patient Name] has added you as a caregiver in their brain health program.

As a caregiver, you will see:
• This week's priorities
• Meal and shopping suggestions
• Three specific actions you can take this week to help
• A simple print-out of the week

You will NOT see any private clinician notes. Your access is thoughtful and limited.

Accept the invite and get set up: [Caregiver Link]

Thank you for showing up for them.

— The Clinic Team`,
    trigger: 'patient or admin sends caregiver invite',
  },
  {
    id: 'warning-30-days',
    name: '30-Day Completion Warning',
    subject: 'Your guided program enters its final month',
    preheader: 'Your educational tools stay with you afterward.',
    body: `Hello [Patient Name],

A quiet note: your guided 6-month program enters its final month.

Your completion date is: [End Date]

After that date:
• Your educational tools remain available to you (recipes, movement, breathwork, brain games, learning library).
• Any follow-up medical visits after your completion date are scheduled as standard paid follow-up appointments with the clinic.

If you would like to plan a clinic follow-up, you can request one here: [Request Follow-Up Link]

Keep going at your own pace. This final month is about making the rhythm yours.

— The Clinic Team`,
    trigger: 'automated at end_date - 30 days',
  },
  {
    id: 'warning-14-days',
    name: '14-Day Completion Warning',
    subject: 'Your guided program ends on [End Date]',
    preheader: 'Your tools continue. Clinic follow-up becomes a standard paid visit.',
    body: `Hello [Patient Name],

Two weeks from today, your guided 6-month program ends.

Completion date: [End Date]

After that date:
• You will still have access to your educational tools and daily support resources.
• Any follow-up visits after that date are billed at the clinic's regular follow-up rate.

If you would like to schedule a follow-up appointment, you can request one here: [Request Follow-Up Link]

Thank you for the work you have done over these months.

— The Clinic Team`,
    trigger: 'automated at end_date - 14 days',
  },
  {
    id: 'completion',
    name: 'Completion Notice',
    subject: 'Thank you for six months',
    preheader: 'Your learning tools remain available.',
    body: `Hello [Patient Name],

You have completed your guided 6-month program.

Today, your original 6-month guided program ended. You still have access to your guided learning tools, recipes, and support materials in maintenance mode.

Any future follow-up appointments beyond this period are scheduled at the clinic's standard paid follow-up rate.

If you would like to schedule a follow-up, you can request one here: [Request Follow-Up Link]

Thank you, from all of us.

— The Clinic Team`,
    trigger: 'automated on end_date',
  },
  {
    id: 'followup-invitation',
    name: 'Follow-Up Invitation (Post-Completion)',
    subject: 'Would a follow-up visit be helpful?',
    preheader: 'Whenever you are ready — no pressure.',
    body: `Hello [Patient Name],

Now that your guided program has completed, some patients find a standard follow-up visit helpful to check in on what is working and plan the months ahead.

Follow-up visits are billed at the clinic's standard follow-up rate.

If you would like one, you can request it here: [Request Follow-Up Link]

If not, that is perfectly fine. Your tools remain available whenever you want them.

— The Clinic Team`,
    trigger: 'scheduled 2 weeks after completion',
  },
]

export const smsTemplates = [
  {
    id: 'sms-daily',
    purpose: 'Daily nudge',
    message:
      "Good morning. Your short plan for today is ready. Just 15 minutes. Open it here: [link]",
  },
  {
    id: 'sms-missed-1',
    purpose: 'Missed a day',
    message:
      "No worries — you did not miss anything. Today's plan is fresh and small. [link]",
  },
  {
    id: 'sms-missed-3',
    purpose: 'Missed 3 days',
    message:
      "It's okay. Just begin with today. One small step is enough. [link]",
  },
  {
    id: 'sms-week-complete',
    purpose: 'Week completion',
    message:
      "You finished another week. Quietly, that's real. Rest well. [link]",
  },
  {
    id: 'sms-14-day-warning',
    purpose: '14 days before program end',
    message:
      "Your guided 6-month program ends on [date]. Your tools stay. Follow-up visits after then are standard paid visits.",
  },
]
