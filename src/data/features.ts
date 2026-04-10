// src/data/features.ts
export interface Feature {
  icon: 'cursor' | 'voice' | 'brain' | 'path' | 'plug' | 'key';
  title: string;
  desc: string;
}

export const features: Feature[] = [
  { icon: 'cursor', title: 'Points at your screen',
    desc: 'An amber cursor flies to the exact UI element you need. No more hunting through menus.' },
  { icon: 'voice', title: 'Talks you through it',
    desc: 'Natural voice explanations, not walls of text. Like having an expert sitting next to you.' },
  { icon: 'brain', title: 'Sees what you see',
    desc: "Screenshots your app in real-time. It knows if you're in Edit Mode or Object Mode." },
  { icon: 'path', title: 'Learns your pace',
    desc: "A curriculum engine tracks what you've mastered and what's next. No quizzes, no gates." },
  { icon: 'plug', title: 'One skill, one file',
    desc: 'Skills are simple Markdown files. Anyone can write one. A marketplace is coming.' },
  { icon: 'key', title: 'One API key',
    desc: 'Bring your own OpenAI key. No account creation, no subscription lock-in required.' },
];
