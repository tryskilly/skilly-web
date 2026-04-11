// src/data/faqs.ts

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'What happens when I hit 3 hours?',
    answer:
      "Skilly pauses until your next billing cycle. No surprise charges, no overage. We'll email you when you're at 80% and 100%.",
  },
  {
    question: 'Why 3 hours?',
    answer:
      "Real-time voice AI is expensive. 3 hours is what we can offer sustainably while keeping the price accessible. Most beta users won't hit the cap.",
  },
  {
    question: 'Can I use my own OpenAI API key?',
    answer:
      "Not yet. If enough beta users ask, we'll add a bring-your-own-key option in a few weeks.",
  },
  {
    question: 'Will pricing change after beta?',
    answer:
      'Yes. Beta users keep $19/3hrs forever. New users after beta will see a tier ladder with different limits and prices.',
  },
  {
    question: "What's actually recorded?",
    answer:
      'Only anonymous usage metrics — how long sessions run, how many turns, token counts. No audio, no screenshots, no prompts. Ever.',
  },
];
