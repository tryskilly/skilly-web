// src/data/trial-terms.ts
// Trial terms shown next to Mac download buttons. The hosted price comes from
// tiers.ts so it stays in sync; BYOK is $5/month plus the user's own OpenAI usage.
import { betaTier } from './tiers';

export const trialTerms = `15-minute free trial, no card. Then ${betaTier.price}${betaTier.period} hosted, or $5/month plus your own OpenAI usage.`;
