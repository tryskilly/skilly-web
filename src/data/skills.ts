// src/data/skills.ts
//
// The list of skills shown in the Skills section. Each skill has a
// status that drives the visual treatment of its card:
//
//   available  — green pill, normal border, app name prominent
//   coming_soon — muted gray pill, muted border, app name only
//   request    — dashed amber border, links to the Tally skill request form
//
// To add a new skill, append an entry to the array. Edit the order to
// change how cards appear on the page.

// The skill request form is built into the Skills section itself —
// the "Your app?" card scrolls to it via #skill-request anchor.

export type SkillStatus = 'available' | 'coming_soon' | 'request';

export interface Skill {
  name: string;
  status: SkillStatus;
  /** Short description, shown only for `available` skills. */
  description?: string;
  /** Click target, used only for the `request` card. */
  href?: string;
}

export const skills: Skill[] = [
  {
    name: 'Blender',
    status: 'available',
    description: '3D modeling, sculpting, animation, rendering',
  },
  {
    name: 'Figma',
    status: 'available',
    description: 'UI design, auto layout, components, prototyping',
  },
  { name: 'After Effects',   status: 'coming_soon' },
  { name: 'DaVinci Resolve', status: 'coming_soon' },
  { name: 'Premiere Pro',    status: 'coming_soon' },
  {
    name: 'Your app?',
    status: 'request',
    href: '#skill-request',
  },
];
