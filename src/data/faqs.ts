// src/data/faqs.ts
//
// Ordering matters: FAQ.astro expands the first 3 entries by default so
// cold scrollers see the most critical objections answered without clicking.
// The order was chosen per page-cro objection-handling priority:
// regret aversion first, trust second, price third.

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  // Top 3 — expanded by default in the UI
  {
    question: 'What happens if I cancel?',
    answer:
      'You keep access until the end of your billing period, then it stops. No charges after that. Resubscribe anytime at the beta price while beta is open \u2014 we lock that price in for life on your account.',
  },
  {
    question: 'Is it safe? What data does Skilly send to OpenAI?',
    answer:
      'Audio and screen context stream to OpenAI for the duration of a live teaching session only. Nothing is persisted afterward, and OpenAI is contractually blocked from training on Skilly sessions. Our analytics logs only anonymous metrics \u2014 session length, token counts, costs \u2014 never your transcripts, screenshots, or prompts.',
  },
  {
    question: 'Why $19 / month? What am I actually paying for?',
    answer:
      'Real-time voice AI with vision is expensive to run. $19 covers 3 hours of live teaching per month across every skill \u2014 more than most users hit. Compared to one-on-one human tutoring at $50\u2013100/hour, one month of Skilly is cheaper than a single lesson.',
  },
  // The rest \u2014 collapsed by default
  {
    question: 'What is Skilly, exactly?',
    answer:
      'A voice companion that watches your screen and teaches you how to use software in real time. You talk to it, it points at the right buttons, it explains what\u2019s happening. Think of it as a patient expert sitting next to you.',
  },
  {
    question: 'How long is the free trial?',
    answer:
      '15 minutes of actual usage, one-time, tied to your email. No credit card required. Most people know inside the first session whether Skilly clicks for them.',
  },
  {
    question: 'Which apps does Skilly work with?',
    answer:
      'Every app on your Mac. Skilly sees your screen and answers questions about whatever you\u2019re using \u2014 Excel, Notion, your browser, a niche CAD tool, anything. The five bundled skills (Blender, Figma, After Effects, Premiere Pro, DaVinci Resolve) are examples of what a dedicated skill adds: structured lessons, precise UI pointing, and up-to-date knowledge beyond the AI\u2019s training data. A skill builder is coming so you can create one for any app yourself.',
  },
  {
    question: 'What\u2019s a "skill"?',
    answer:
      'A skill teaches Skilly how to understand one specific app \u2014 its interface, its terminology, its common workflows. One subscription gives you every skill we release, current and future.',
  },
  {
    question: 'What happens when I hit my 3 hours?',
    answer:
      'Skilly pauses until your next billing cycle. No surprise charges. We email you at 80% and 100% so you\u2019re never caught off guard.',
  },
  {
    question: 'Can I build my own skill?',
    answer:
      'A skill builder is on the roadmap \u2014 eventually, anyone will be able to create a skill for any app or workflow, right from inside Skilly or a web section of the site. Want early access? Email hello@tryskilly.app.',
  },
  {
    question: 'Which operating systems are supported?',
    answer:
      'macOS 14+ on Apple Silicon Macs for the beta. Windows and Linux are on the roadmap \u2014 join the waitlist further down the page to hear when they ship.',
  },
  {
    question: 'Will the price change after beta?',
    answer:
      'Yes. Beta users keep $19 for 3 hours forever. New users after beta will see a different tier structure once we have real usage data.',
  },
  {
    question: 'Can I use my own OpenAI API key?',
    answer:
      'Not yet. If enough beta users ask, we\u2019ll add a bring-your-own-key option soon at a lower price.',
  },
];
