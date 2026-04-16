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
  perDayEquivalent: '~$0.63 / day \u2014 less than a coffee',
  tagline: '3 hours of live teaching per month, any app you use',
  features: [
    '3 hours of AI tutoring each month',
    'Works with any app on your Mac',
    '5 example skills included (more coming)',
    '16 languages, 8 voices',
    'Multi-monitor support + Live Tutor mode',
    'Custom skills \u2014 drop in your own SKILL.md',
    'Auto-updates forever',
  ],
  guarantees: [
    'No card needed for the free 15-min trial',
    'Cancel anytime \u2014 keep access through the period',
    'Beta price locked in for life on your account',
  ],
  finePrint: '15 minutes free on first launch. Limited to 50 beta users.',
};
