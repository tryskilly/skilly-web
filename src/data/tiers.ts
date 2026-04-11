// src/data/tiers.ts
// Single tier for the beta launch. When the beta ends and we ladder up
// to multiple tiers, reintroduce the array shape.

export interface BetaTier {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  ctaHref: string;
  limitNote: string;
}

export const betaTier: BetaTier = {
  name: 'Skilly Beta',
  price: '$19',
  period: '/month',
  tagline: '3 hours of live teaching per month',
  features: [
    'Voice companion for Blender',
    'Points at your screen, explains as you work',
    "Watches what you're doing, teaches in real time",
    'Cancel anytime',
    'Beta pricing — locked in for life if you join now',
  ],
  cta: 'Join the beta',
  ctaHref: '#waitlist',
  limitNote: 'Limited to 50 beta users. After cap is reached, waitlist only.',
};
