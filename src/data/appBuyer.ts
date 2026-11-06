// Buyer-intent copy for the creative-app landers.
// Skill stages and pointing targets come from the bundled SKILL.md files in
// github.com/tryskilly/skilly. Prices and the shortcut come from public/pricing.md.
// Pointing behavior matches the live app pages: Skilly points, and it never clicks.

export interface BuyerFaq {
  question: string;
  answer: string;
}

export interface AppBuyerPage {
  slug: string;
  pageTitle: string;
  description: string;
  h1: string;
  /** First paragraph. Secondary keyword lives here. */
  intro: string;
  tutorHeading: string;
  tutorParagraphs: string[];
  /** Curriculum stage names, copied from the skill file headings. */
  stages: string[];
  skillFileHref: string;
  skillFileLabel: string;
  /** A spoken question plus the control the skill says to point at. */
  moment: string;
  faqs: BuyerFaq[];
}

export const sessionLines = [
  'The default shortcut is Control+Option. Hold it and ask out loud. Skilly points at the control. It never clicks, and it never moves your cursor.',
  'Live Tutor mode is hands-free voice activation (no hotkey required).',
  'macOS 14.2 or later.',
] as const;

export const privacyLine = 'A JPEG of your displays when you ask. Not a continuous recording.';

export const planLines = [
  'Skilly for People Beta — $19/month.',
  '3 hours of live AI tutoring per month.',
  '15-minute trial, no card.',
  'Bring your own OpenAI key: $5/month plus your OpenAI usage.',
  'Built-in skills for Premiere Pro, DaVinci Resolve, After Effects, Blender and Figma. Houdini is coming soon and not bundled in the app yet.',
] as const;

const priceAnswer =
  '15-minute trial, no card. Then Skilly for People Beta — $19/month, with 3 hours of live AI tutoring per month. Bring your own OpenAI key: $5/month plus your OpenAI usage.';

export const appBuyerPages: AppBuyerPage[] = [
  {
    slug: 'blender',
    pageTitle: 'Blender AI assistant for Mac | Skilly',
    description:
      'AI for Blender when a menu hides the control. Ask out loud and Skilly points at it. It never clicks. 15-minute trial, no card. macOS 14.2 or later.',
    h1: 'Blender AI assistant that points at the control',
    intro:
      'AI for Blender when the interface is dense and the control is already on screen. Ask out loud. Skilly points at it. It never clicks, and it never moves your cursor.',
    tutorHeading: 'An AI tutor for Blender',
    tutorParagraphs: [
      'The bundled skill is Blender Fundamentals. It teaches the Blender 4.x and 5.x interface, and it is written to point at the element on screen instead of describing a menu you cannot see.',
      'The skill covers the two-mode model (Object Mode and Edit Mode), the 3D Viewport, the Properties Editor tabs, modifiers, the Principled BSDF, and a still render with EEVEE or Cycles.',
    ],
    stages: [
      '3D Viewport Navigation',
      'Object Mode and the Scene Hierarchy',
      'Edit Mode and Mesh Geometry',
      'Core Mesh Editing Tools',
      'Modifiers',
      'Materials and Shading',
      'Lighting and Rendering',
    ],
    skillFileHref: 'https://github.com/tryskilly/skilly/blob/main/skills/blender-fundamentals/SKILL.md',
    skillFileLabel: 'Blender Fundamentals skill',
    moment:
      'Ask “where do I add a Bevel modifier?” and Skilly points at the wrench icon in the Properties Editor, then at Add Modifier.',
    faqs: [
      {
        question: 'What does Skilly do in Blender?',
        answer:
          'The Blender Fundamentals skill teaches seven stages, from moving around the 3D Viewport to a still render. Ask out loud and Skilly points at the control that stage names, such as the mode selector in the viewport header or the Modifier Properties wrench.',
      },
      {
        question: 'Does Skilly click in Blender?',
        answer: 'Skilly points at the control. It never clicks, and it never moves your cursor. You press the button.',
      },
      {
        question: 'What does it cost?',
        answer: priceAnswer,
      },
    ],
  },
  {
    slug: 'premiere-pro',
    pageTitle: 'AI for Premiere Pro that points at the panel | Skilly',
    description:
      'An AI assistant for Premiere Pro. Ask out loud and Skilly points at the panel. It never clicks. 15-minute trial, no card. macOS 14.2 or later.',
    h1: 'AI for Premiere Pro that points at the panel',
    intro:
      'AI for Premiere Pro when you know the job and cannot find the panel. Ask out loud. Skilly points at it. It never clicks, and it never moves your cursor.',
    tutorHeading: 'An AI assistant for Premiere Pro',
    tutorParagraphs: [
      'The bundled skill is Premiere Pro Basics. It starts in the default Editing workspace: Source Monitor, Program Monitor, Timeline, and the Project panel. Later stages cover import and bins, cutting, trimming, Lumetri Color, titles, and export.',
    ],
    stages: [
      'Interface and Workspace',
      'Import and Project Organization',
      'Timeline Editing',
      'Trimming and Transitions',
      'Effects and Color Grading',
      'Audio and Titles',
      'Export',
    ],
    skillFileHref: 'https://github.com/tryskilly/skilly/blob/main/skills/premiere-pro-basics/SKILL.md',
    skillFileLabel: 'Premiere Pro Basics skill',
    moment: 'Ask “where are the Source Monitor and the Timeline?” and Skilly points at those panels.',
    faqs: [
      {
        question: 'What does the Premiere Pro skill cover?',
        answer:
          'The Editing workspace panels, import and bins, timeline editing, trimming and transitions, Lumetri Color, audio and titles, and export. The questions on this page are tasks that skill file teaches.',
      },
      {
        question: 'What does it cost?',
        answer: priceAnswer,
      },
    ],
  },
  {
    slug: 'davinci-resolve',
    pageTitle: 'AI for DaVinci Resolve that points at the page | Skilly',
    description:
      'An AI assistant for DaVinci Resolve. Ask out loud and Skilly points at the page tab. It never clicks. 15-minute trial, no card. macOS 14.2 or later.',
    h1: 'AI for DaVinci Resolve that points at the page',
    intro:
      'AI for DaVinci Resolve when the page you need is a tab at the bottom of the screen. Ask out loud. Skilly points at it. It never clicks, and it never moves your cursor.',
    tutorHeading: 'An AI assistant for DaVinci Resolve',
    tutorParagraphs: [
      'The bundled skill is DaVinci Resolve Basics. It starts with the seven page tabs at the bottom of the screen: Media, Cut, Edit, Fusion, Color, Fairlight, and Deliver. Later stages cover import, the Edit page, trimming, the color wheels, Fairlight, and the render queue.',
    ],
    stages: [
      'Interface and Pages',
      'Media Import',
      'Edit Page Basics',
      'Trimming and Transitions',
      'Color Grading Basics',
      'Audio and Fairlight',
      'Deliver and Export',
    ],
    skillFileHref: 'https://github.com/tryskilly/skilly/blob/main/skills/davinci-resolve-basics/SKILL.md',
    skillFileLabel: 'DaVinci Resolve Basics skill',
    moment:
      'Ask “how do I switch from the Edit page to Color?” and Skilly points at the page tabs at the bottom of the screen.',
    faqs: [
      {
        question: 'What does the DaVinci Resolve skill cover?',
        answer:
          'The seven pages (Media, Cut, Edit, Fusion, Color, Fairlight, Deliver), then import, editing, trimming, color, Fairlight, and Deliver. The questions on this page are tasks that skill file teaches.',
      },
      {
        question: 'What does it cost?',
        answer: priceAnswer,
      },
    ],
  },
  {
    slug: 'after-effects',
    pageTitle: 'AI for After Effects that points at the panel | Skilly',
    description:
      'AI for After Effects when a panel hides the control. Ask out loud and Skilly points at it. It never clicks. 15-minute trial, no card. macOS 14.2 or later.',
    h1: 'AI for After Effects that points at the panel',
    intro:
      'AI for After Effects when the panel you need is already on screen. Ask out loud. Skilly points at it. It never clicks, and it never moves your cursor.',
    tutorHeading: 'An AI assistant for After Effects',
    tutorParagraphs: [
      'The bundled skill is After Effects Basics. It is an AI assistant for After Effects: it teaches the current interface and points at the panel on screen instead of describing a menu you cannot see.',
      'The skill covers the five core panels (Project, Composition, Timeline, Tools, and the right-side column), then layers, keyframes, effects, masks versus shape layers, text animators, and a render through the Render Queue or Adobe Media Encoder.',
    ],
    stages: [
      'Interface and Navigation',
      'Layers and the Layer Stack',
      'Keyframing and Animation',
      'Effects and Effect Controls',
      'Masks and Shape Layers',
      'Text Animation',
      'Rendering and Export',
    ],
    skillFileHref: 'https://github.com/tryskilly/skilly/blob/main/skills/after-effects-basics/SKILL.md',
    skillFileLabel: 'After Effects Basics skill',
    moment:
      'Ask “how do I keyframe position so this layer moves?” and Skilly points at the stopwatch icon next to Position in the Timeline.',
    faqs: [
      {
        question: 'What does Skilly do in After Effects?',
        answer:
          'The After Effects Basics skill teaches seven stages, from the core panels to the Render Queue. Ask out loud and Skilly points at the control that stage names, such as the Composition panel or the stopwatch next to Position.',
      },
      {
        question: 'Does Skilly click in After Effects?',
        answer: 'Skilly points at the control. It never clicks, and it never moves your cursor. You press the button.',
      },
      {
        question: 'What does it cost?',
        answer: priceAnswer,
      },
    ],
  },
  {
    slug: 'figma',
    pageTitle: 'Figma AI assistant for Mac | Skilly',
    description:
      'AI for Figma when the toolbar hides the control. Ask out loud and Skilly points at it. It never clicks. 15-minute trial, no card. macOS 14.2 or later.',
    h1: 'Figma AI assistant that points at the control',
    intro:
      'AI for Figma when the toolbar is at the bottom and the control is already on screen. Ask out loud. Skilly points at it. It never clicks, and it never moves your cursor.',
    tutorHeading: 'A Figma AI assistant',
    tutorParagraphs: [
      'The bundled skill is Figma Basics. It teaches the Figma Design interface as of the UI3 redesign, and it is written to point at the control on screen instead of describing a panel you cannot see.',
      'The skill covers the canvas and the toolbar at the bottom of the editor, frames, auto layout (Hug, Fill, and Fixed), components and instances, variants, and a prototype you start from the Present button.',
    ],
    stages: [
      'Canvas and Navigation',
      'Shapes and the Frame Tool',
      'Layers Panel and Selection',
      'Auto Layout',
      'Components and Instances',
      'Variants and Component Properties',
      'Prototyping Basics',
    ],
    skillFileHref: 'https://github.com/tryskilly/skilly/blob/main/skills/figma-basics/SKILL.md',
    skillFileLabel: 'Figma Basics skill',
    moment:
      'Ask “how do I add auto layout to this frame?” and Skilly points at the Add auto layout button in the Design tab.',
    faqs: [
      {
        question: 'What does Skilly do in Figma?',
        answer:
          'The Figma Basics skill teaches seven stages, from moving around the canvas to presenting a prototype. Ask out loud and Skilly points at the control that stage names, such as the toolbar at the bottom of the editor or the Add auto layout button in the Design tab.',
      },
      {
        question: 'Does Skilly click in Figma?',
        answer: 'Skilly points at the control. It never clicks, and it never moves your cursor. You press the button.',
      },
      {
        question: 'What does it cost?',
        answer: priceAnswer,
      },
    ],
  },
];

export function appBuyerBySlug(slug: string): AppBuyerPage | undefined {
  return appBuyerPages.find((page) => page.slug === slug);
}
