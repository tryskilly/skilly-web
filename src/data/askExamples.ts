// Starter questions a stuck beginner would actually say out loud.
// Every question is a task the bundled skill file teaches. Do not add a
// question here unless that file covers it. Houdini is not bundled.

export interface AskExample {
  /** Spoken the way a stuck user would ask. */
  question: string;
  /** Matching /learn/ guide, when the repo has one. */
  learnHref: string;
  /** Line in the bundled skill file that teaches this task. */
  skillLine: number;
}

export interface AskApp {
  name: string;
  /** Future app-landing slug. Not a route until that page exists. */
  slug: string;
  /** Path in github.com/tryskilly/skilly. */
  skillFile: string;
  /** Beginner curriculum hub for this app. */
  guideHref: string;
  questions: AskExample[];
}

export const askApps: AskApp[] = [
  {
    name: 'Premiere Pro',
    slug: 'premiere-pro',
    skillFile: 'skills/premiere-pro-basics/SKILL.md',
    guideHref: '/learn/premiere-pro-tutorial-for-beginners/',
    questions: [
      {
        question: 'Where are the Source Monitor and the Timeline?',
        learnHref: '/learn/premiere-pro-interface-and-workspace/',
        skillLine: 86,
      },
      {
        question: 'How do I mark in and out points on this clip?',
        learnHref: '/learn/premiere-pro-timeline-editing/',
        skillLine: 124,
      },
      {
        question: 'How do I export this sequence as H.264?',
        learnHref: '/learn/premiere-pro-export/',
        skillLine: 200,
      },
    ],
  },
  {
    name: 'DaVinci Resolve',
    slug: 'davinci-resolve',
    skillFile: 'skills/davinci-resolve-basics/SKILL.md',
    guideHref: '/learn/davinci-resolve-tutorial-for-beginners/',
    questions: [
      {
        question: 'How do I switch from the Edit page to Color?',
        learnHref: '/learn/davinci-resolve-interface-and-pages/',
        skillLine: 86,
      },
      {
        question: 'How do I trim this edit without leaving a gap?',
        learnHref: '/learn/davinci-resolve-trimming-and-transitions/',
        skillLine: 157,
      },
      {
        question: 'Where do I add this timeline to the render queue?',
        learnHref: '/learn/davinci-resolve-deliver-and-export/',
        skillLine: 223,
      },
    ],
  },
  {
    name: 'After Effects',
    slug: 'after-effects',
    skillFile: 'skills/after-effects-basics/SKILL.md',
    guideHref: '/learn/after-effects-tutorial-for-beginners/',
    questions: [
      {
        question: 'Where is the Composition panel versus the Timeline?',
        learnHref: '/learn/after-effects-interface-and-navigation/',
        skillLine: 89,
      },
      {
        question: 'How do I keyframe position so this layer moves?',
        learnHref: '/learn/after-effects-keyframing-and-animation/',
        skillLine: 131,
      },
      {
        question: 'How do I add this comp to the Render Queue?',
        learnHref: '/learn/after-effects-rendering-and-export/',
        skillLine: 214,
      },
    ],
  },
  {
    name: 'Blender',
    slug: 'blender',
    skillFile: 'skills/blender-fundamentals/SKILL.md',
    guideHref: '/learn/blender-tutorial-for-beginners/',
    questions: [
      {
        question: 'How do I orbit and zoom in the 3D viewport?',
        learnHref: '/learn/blender-3d-viewport-navigation/',
        skillLine: 90,
      },
      {
        question: 'Where do I add a Subdivision Surface modifier?',
        learnHref: '/learn/how-to-add-subdivision-surface-modifier-blender/',
        skillLine: 170,
      },
      {
        question: 'How do I render a still of this scene?',
        learnHref: '/learn/blender-lighting-and-rendering/',
        skillLine: 218,
      },
    ],
  },
  {
    name: 'Figma',
    slug: 'figma',
    skillFile: 'skills/figma-basics/SKILL.md',
    guideHref: '/learn/figma-tutorial-for-beginners/',
    questions: [
      {
        question: 'How do I pan and zoom around the canvas?',
        learnHref: '/learn/figma-canvas-and-navigation/',
        skillLine: 85,
      },
      {
        question: 'How do I add auto layout to this frame?',
        learnHref: '/learn/figma-auto-layout/',
        skillLine: 144,
      },
      {
        question: 'How do I turn this frame into a component?',
        learnHref: '/learn/figma-components-and-instances/',
        skillLine: 164,
      },
    ],
  },
];
