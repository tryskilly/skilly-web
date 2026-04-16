// src/data/tiers.ts
// Single tier for the beta launch — monthly billing only. Annual pricing
// isn't defined yet; we'll introduce it after beta when we have real usage
// data and multi-tier packaging. When that happens, reintroduce the array
// shape and add the toggle back to Pricing.astro.

export interface BetaTier {
  name: string;
  price: string;
  period: string;
  perDayEquivalent: string;
  tagline: string;
  features: string[];
  guarantees: string[];
  finePrint: string;
}

export const betaTier: BetaTier = {
  name: 'Skilly Beta',
  price: '$19',
  period: '/month',
  perDayEquivalent: 'That\u2019s ~$0.63 a day \u2014 cheaper than your morning coffee.',
  tagline: '3 hours of real AI tutoring every month \u2014 in any app you use.',
  features: [
    'Instant help that sees your screen and moves your cursor',
    'Works in any Mac app',
    '5 ready-to-use skills (Figma, Blender, After Effects, etc.)',
    'Full courses with progress tracking',
    'Speaks in your language (16 languages, 8 voices)',
    'Live Tutor mode + multi-monitor support',
    'Auto-updates forever',
    'Custom skills \u2014 drop in your own SKILL.md',
  ],
  guarantees: [
    '15 minutes free \u2014 no card needed',
    'Cancel anytime, keep access through the period',
    'Beta price locked in for life \u2014 only 50 spots',
  ],
  finePrint: '15 minutes free on first launch.',
};
