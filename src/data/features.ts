// src/data/features.ts
export interface Feature {
  icon: 'cursor' | 'voice' | 'brain' | 'path' | 'plug' | 'key';
  title: string;
  desc: string;
}

export const features: Feature[] = [
  { icon: 'cursor', title: 'Points at your screen',
    desc: 'A cursor flies to the exact UI element you need. No more hunting through menus.' },
  { icon: 'voice', title: 'Talks you through it',
    desc: 'Natural voice explanations, not walls of text. Like having an expert sitting next to you.' },
  { icon: 'brain', title: 'Sees what you see',
    desc: "Screenshots your app in real-time across all monitors. It knows exactly what you're looking at." },
  { icon: 'path', title: 'Learns your pace',
    desc: "A curriculum engine tracks what you've mastered and what's next. No quizzes, no gates." },
  { icon: 'plug', title: 'Live Tutor mode',
    desc: 'Enable always-on listening for hands-free learning. Just start talking — no hotkey needed. Or use push-to-talk when you prefer.' },
  { icon: 'key', title: '8 voices, 16 languages',
    desc: 'Pick your AI voice and preferred language. Skilly auto-detects what you speak or sticks to your choice.' },
];
