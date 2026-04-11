// src/data/tiers.ts
// Single tier for the beta launch. When the beta ends and we ladder up
// to multiple tiers, reintroduce the array shape.

export interface BetaTier {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  finePrint: string;
}

export const betaTier: BetaTier = {
  name: 'Skilly Beta',
  price: '$19',
  period: '/month',
  tagline: '3 hours of live teaching per month, across every skill',
  features: [
    'Voice companion that watches your screen and points at what matters',
    'Real-time teaching in any supported app',
    'New skills added regularly — one price, all skills included',
    '15 minutes free to try, no card required',
    'Cancel anytime, beta price locked in for life',
  ],
  finePrint: '15 minutes free on first launch. Limited to 50 beta users.',
};
