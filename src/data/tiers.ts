// src/data/tiers.ts
export interface Tier {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export const tiers: Tier[] = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    desc: 'Prove the magic',
    features: [
      '10 interactions/day',
      'Blender Fundamentals skill',
      'Push-to-talk voice',
      'Cursor pointing',
    ],
    cta: 'Download for Mac',
    highlight: false,
  },
  {
    name: 'Learner',
    price: '$19',
    period: '/mo',
    desc: 'Learn at your pace',
    features: [
      '300 interactions/mo',
      'All available skills',
      'Voice + vision',
      'Curriculum tracking',
      'Priority voice quality',
    ],
    cta: 'Start learning',
    highlight: true,
  },
  {
    name: 'BYOK',
    price: '$9',
    period: '/mo',
    desc: 'Bring your own key',
    features: [
      'Unlimited interactions',
      'All available skills',
      'Use your OpenAI API key',
      'Full curriculum engine',
      'Zero usage caps',
    ],
    cta: 'Connect your key',
    highlight: false,
  },
];
