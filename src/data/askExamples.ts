// Starter questions a stuck beginner would actually say out loud.
// Every question is a task the bundled skill file teaches. Do not add a
// question here unless that file covers it. Houdini is not bundled.
// The homepage shows the first three. App landing pages show the full list.

export interface AskExample {
  /** Spoken the way a stuck user would ask. */
  question: string;
  /** Matching /learn/ guide. */
  learnHref: string;
  /** Line in the bundled skill file that teaches this task. */
  skillLine: number;
}

export interface AskApp {
  name: string;
  slug: string;
  /** Path in github.com/tryskilly/skilly. */
  skillFile: string;
  /** Beginner curriculum hub for this app. */
  guideHref: string;
  title: string;
  description: string;
  questions: AskExample[];
}

export const askApps: AskApp[] = [
  {
    name: 'Premiere Pro',
    slug: 'premiere-pro',
    skillFile: 'skills/premiere-pro-basics/SKILL.md',
    guideHref: '/learn/premiere-pro-tutorial-for-beginners/',
    title: 'What to ask Skilly in Premiere Pro',
    description:
      'Questions to ask out loud in Premiere Pro, from the panels to export. Each one is in Skilly’s bundled skill, with a guide.',
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
      {
        question: 'How do I import footage into the Project panel?',
        learnHref: '/learn/premiere-pro-import-and-project-organization/',
        skillLine: 104,
      },
      {
        question: 'How do I make a bin for these clips?',
        learnHref: '/learn/premiere-pro-import-and-project-organization/',
        skillLine: 107,
      },
      {
        question: 'How do I cut this clip at the playhead?',
        learnHref: '/learn/premiere-pro-timeline-editing/',
        skillLine: 129,
      },
      {
        question: 'How do I trim this edit without leaving a gap?',
        learnHref: '/learn/premiere-pro-trimming-and-transitions/',
        skillLine: 142,
      },
      {
        question: 'How do I add a cross dissolve?',
        learnHref: '/learn/premiere-pro-trimming-and-transitions/',
        skillLine: 147,
      },
      {
        question: 'Where is the Lumetri Color panel?',
        learnHref: '/learn/premiere-pro-effects-and-color-grading/',
        skillLine: 161,
      },
      {
        question: 'How do I add a title with the Type tool?',
        learnHref: '/learn/how-to-add-text-in-premiere-pro/',
        skillLine: 184,
      },
    ],
  },
  {
    name: 'DaVinci Resolve',
    slug: 'davinci-resolve',
    skillFile: 'skills/davinci-resolve-basics/SKILL.md',
    guideHref: '/learn/davinci-resolve-tutorial-for-beginners/',
    title: 'What to ask Skilly in DaVinci Resolve',
    description:
      'Questions to ask out loud in DaVinci Resolve, from the page tabs to the render queue. Each one is in the bundled skill.',
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
      {
        question: 'How do I get clips from Media Storage into the Media Pool?',
        learnHref: '/learn/davinci-resolve-media-import/',
        skillLine: 110,
      },
      {
        question: 'Where is the Inspector on the Edit page?',
        learnHref: '/learn/davinci-resolve-edit-page-basics/',
        skillLine: 129,
      },
      {
        question: 'How do I split a clip with the Blade tool?',
        learnHref: '/learn/davinci-resolve-trimming-and-transitions/',
        skillLine: 153,
      },
      {
        question: 'Where are the color wheels?',
        learnHref: '/learn/davinci-resolve-color-grading-basics/',
        skillLine: 175,
      },
      {
        question: 'How do I open Fairlight to mix the audio?',
        learnHref: '/learn/davinci-resolve-audio-and-fairlight/',
        skillLine: 196,
      },
      {
        question: 'Where do I find titles?',
        learnHref: '/learn/how-to-add-text-in-davinci-resolve/',
        skillLine: 257,
      },
      {
        question: 'Which render preset should I use for YouTube?',
        learnHref: '/learn/davinci-resolve-deliver-and-export/',
        skillLine: 220,
      },
    ],
  },
  {
    name: 'After Effects',
    slug: 'after-effects',
    skillFile: 'skills/after-effects-basics/SKILL.md',
    guideHref: '/learn/after-effects-tutorial-for-beginners/',
    title: 'What to ask Skilly in After Effects',
    description:
      'Questions to ask out loud in After Effects, from the composition to the render queue. Each one is in the bundled skill.',
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
      {
        question: 'How do I make a new composition?',
        learnHref: '/learn/after-effects-interface-and-navigation/',
        skillLine: 90,
      },
      {
        question: 'Why is this layer in front of the other one?',
        learnHref: '/learn/after-effects-layers-and-the-layer-stack/',
        skillLine: 112,
      },
      {
        question: 'How do I search for an effect by name?',
        learnHref: '/learn/after-effects-effects-and-effect-controls/',
        skillLine: 152,
      },
      {
        question: 'How do I draw a mask on this layer?',
        learnHref: '/learn/after-effects-masks-and-shape-layers/',
        skillLine: 173,
      },
      {
        question: 'How do I draw a shape without making a mask?',
        learnHref: '/learn/after-effects-masks-and-shape-layers/',
        skillLine: 178,
      },
      {
        question: 'How do I add text in the composition?',
        learnHref: '/learn/after-effects-text-animation/',
        skillLine: 193,
      },
      {
        question: 'How do I render an H.264 with Media Encoder?',
        learnHref: '/learn/after-effects-rendering-and-export/',
        skillLine: 219,
      },
    ],
  },
  {
    name: 'Blender',
    slug: 'blender',
    skillFile: 'skills/blender-fundamentals/SKILL.md',
    guideHref: '/learn/blender-tutorial-for-beginners/',
    title: 'What to ask Skilly in Blender',
    description:
      'Questions to ask out loud in Blender, from the viewport to a still render. Each one is in Skilly’s bundled skill, with a guide.',
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
      {
        question: 'How do I get into Edit Mode?',
        learnHref: '/learn/blender-edit-mode-and-mesh-geometry/',
        skillLine: 130,
      },
      {
        question: 'How do I extrude this face?',
        learnHref: '/learn/blender-core-mesh-editing-tools/',
        skillLine: 151,
      },
      {
        question: 'How do I add a loop cut?',
        learnHref: '/learn/blender-core-mesh-editing-tools/',
        skillLine: 153,
      },
      {
        question: 'Where do I add a Bevel modifier?',
        learnHref: '/learn/how-to-add-bevel-modifier-blender/',
        skillLine: 174,
      },
      {
        question: 'How do I see this material in the viewport?',
        learnHref: '/learn/blender-materials-and-shading/',
        skillLine: 187,
      },
      {
        question: 'How do I change the base color?',
        learnHref: '/learn/blender-materials-and-shading/',
        skillLine: 191,
      },
      {
        question: 'How do I add a light?',
        learnHref: '/learn/blender-lighting-and-rendering/',
        skillLine: 210,
      },
    ],
  },
  {
    name: 'Figma',
    slug: 'figma',
    skillFile: 'skills/figma-basics/SKILL.md',
    guideHref: '/learn/figma-tutorial-for-beginners/',
    title: 'What to ask Skilly in Figma',
    description:
      'Questions to ask out loud in Figma, from the canvas to a prototype. Each one is in Skilly’s bundled skill, with a guide.',
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
      {
        question: 'How do I draw a rectangle?',
        learnHref: '/learn/figma-shapes-and-the-frame-tool/',
        skillLine: 104,
      },
      {
        question: 'How do I draw a frame?',
        learnHref: '/learn/figma-shapes-and-the-frame-tool/',
        skillLine: 106,
      },
      {
        question: 'How do I select something inside a frame?',
        learnHref: '/learn/figma-layers-panel-and-selection/',
        skillLine: 127,
      },
      {
        question: 'When should this layer be Fill instead of Hug?',
        learnHref: '/learn/figma-auto-layout/',
        skillLine: 148,
      },
      {
        question: 'How do I combine these as variants?',
        learnHref: '/learn/figma-variants-and-component-properties/',
        skillLine: 184,
      },
      {
        question: 'How do I make a click go to another frame?',
        learnHref: '/learn/figma-prototyping-basics/',
        skillLine: 204,
      },
      {
        question: 'How do I play the prototype?',
        learnHref: '/learn/figma-prototyping-basics/',
        skillLine: 211,
      },
    ],
  },
];

export function askAppBySlug(slug: string): AskApp | undefined {
  return askApps.find((app) => app.slug === slug);
}
