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
      'You keep using Skilly until the end of your billing month. Then it simply stops \u2014 no extra charges. Resubscribe anytime at the beta price \u2014 we lock that price in for life on your account.',
  },
  {
    question: 'Is it safe? What data does Skilly send to OpenAI?',
    answer:
      'Yes. Audio and a live screenshot stream to OpenAI only while you\u2019re actively talking. Nothing is saved after the session ends, and OpenAI is contractually blocked from training on Skilly sessions. Our analytics log only anonymous metrics \u2014 session length, token counts, costs \u2014 never your transcripts, screenshots, or prompts.',
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
      'A friendly AI tutor that lives in your Mac menu bar. You talk, it sees your screen, moves the cursor to show you what to click, and speaks the answer in your language. Think of it as a patient expert sitting next to you.',
  },
  {
    question: 'How long is the free trial?',
    answer:
      '15 minutes of actual usage, one-time, tied to your email. No credit card required. Most people know inside the first session whether Skilly clicks for them.',
  },
  {
    question: 'Which apps does Skilly work with?',
    answer:
      'Any app on your Mac. Skilly works great even without a skill \u2014 Excel, Notion, your browser, a niche CAD tool, anything. With a skill (like Figma or Blender), it gets smarter: step-by-step courses and up-to-date knowledge beyond the AI\u2019s training data. Five skills ship today; a skill builder is coming so you can make your own.',
  },
  {
    question: 'What\u2019s a "skill"?',
    answer:
      'A skill is like an upgrade for one specific app \u2014 Skilly gets the latest instructions, shortcuts, and a full learning path so it can teach you properly. One subscription gives you every skill we release, current and future.',
  },
  {
    question: 'What happens when I hit my 3 hours?',
    answer:
      'Skilly pauses until your next billing cycle. No surprise charges. We email you at 80% and 100% so you\u2019re never caught off guard.',
  },
  {
    question: 'Can I build my own skill?',
    answer:
      'Not yet, but we\u2019re building a simple skill creator. Want early access? Just email hello@tryskilly.app.',
  },
  {
    question: 'Which operating systems work?',
    answer:
      'Right now: macOS 14+ on Apple Silicon Macs only. Windows, Linux, and mobile are coming \u2014 join the waitlist below to be notified.',
  },
  {
    question: 'Will the price change after beta?',
    answer:
      'Yes. Beta users keep the $19 price forever \u2014 even after we add more features. New users will see different pricing once the beta ends.',
  },
  {
    question: 'Can I use my own OpenAI API key?',
    answer:
      'Not yet. If many people want it, we\u2019ll add the option soon (at a lower price).',
  },
];
