// src/data/steps.ts
export interface Step {
  num: string;
  title: string;
  desc: string;
}

export const steps: Step[] = [
  {
    num: '01',
    title: 'You\u2019re stuck in any app',
    desc: 'Excel, Notion, your browser, a design tool \u2014 anything. Skilly works with every app on your Mac.',
  },
  {
    num: '02',
    title: 'Press your shortcut and talk',
    desc: 'Hold Control+Option and ask out loud \u2014 or enable Live Tutor and just start talking. Anything you\u2019d ask a pro sitting next to you.',
  },
  {
    num: '03',
    title: 'Hear it. See it. Watch the cursor.',
    desc: 'Skilly talks you through it, streams a live transcript beside the cursor, and points at exactly what to click.',
  },
];
