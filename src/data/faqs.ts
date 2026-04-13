// src/data/faqs.ts

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'What is Skilly, exactly?',
    answer:
      'A voice companion that watches your screen and teaches you how to use software in real time. You talk to it, it points at the right buttons, it explains what\u2019s happening. Think of it as a patient expert sitting next to you.',
  },
  {
    question: 'Which apps does Skilly work with?',
    answer:
      'Skilly works with any app right out of the box \u2014 it sees your screen and can answer questions about whatever you\u2019re using. For apps with a dedicated skill installed (Blender and Figma so far), you get structured lessons, precise UI pointing, and up-to-date knowledge that goes beyond the AI\u2019s training data. More skills are coming. You can request one through our skill request form.',
  },
  {
    question: 'What\u2019s a "skill"?',
    answer:
      'A skill teaches Skilly how to understand one specific app — its interface, its terminology, its common workflows. One subscription gives you every skill we release, current and future.',
  },
  {
    question: 'What happens when I hit my 3 hours?',
    answer:
      'Skilly pauses until your next billing cycle. No surprise charges. We email you at 80% and 100%.',
  },
  {
    question: 'Why only 3 hours?',
    answer:
      'Real-time voice AI is expensive to run. 3 hours is what we can offer sustainably at $19 during beta. Most users won\u2019t hit the cap.',
  },
  {
    question: 'How long is the free trial?',
    answer:
      '15 minutes of actual usage, one-time, tied to your email. No credit card required.',
  },
  {
    question: 'Can I use my own OpenAI API key?',
    answer:
      'Not yet. If enough beta users ask, we\u2019ll add a bring-your-own-key option soon at a lower price.',
  },
  {
    question: 'Will the price change after beta?',
    answer:
      'Yes. Beta users keep $19 for 3 hours forever. New users after beta will see a different tier structure once we have real usage data.',
  },
  {
    question: 'What gets recorded?',
    answer:
      'Only anonymous usage metrics — session length, turn counts, token counts, cost. No audio, no screenshots, no prompts, no content from your apps. Ever.',
  },
  {
    question: 'What happens if I cancel?',
    answer:
      'You keep access until the end of your billing period, then it stops. Resubscribe anytime at the beta price while beta is open.',
  },
  {
    question: 'Which operating systems are supported?',
    answer:
      'macOS 14+ on Apple Silicon Macs for the beta. Windows and Linux are on the roadmap — join the waitlist at the bottom of the page to hear when they ship.',
  },
  {
    question: 'Can I build my own skill?',
    answer:
      'Not yet publicly. We\u2019re exploring a skill creator program. If you\u2019re interested, reach out at hello@tryskilly.app.',
  },
];
