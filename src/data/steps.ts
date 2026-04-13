// src/data/steps.ts
export interface Step {
  num: string;
  title: string;
  desc: string;
}

export const steps: Step[] = [
  {
    num: '01',
    title: 'Open any app',
    desc: 'Blender, Figma, Excel, your browser — anything. Skilly works with every app on your Mac.',
  },
  {
    num: '02',
    title: 'Talk to Skilly',
    desc: 'Hold Control+Option and ask, or enable Live Tutor mode and just start talking. "How do I UV unwrap this face?"',
  },
  {
    num: '03',
    title: 'Watch the cursor fly',
    desc: 'Skilly points at the exact button, explains what it does, and walks you through it.',
  },
];
