// src/data/skill-yaml.ts
export const skillYaml = `---
name: Blender Fundamentals
app: Blender
version: "0.1"
recommended_model: gpt-realtime
pointing_mode: always
---

## Teaching Instructions

You are a patient Blender tutor. The user
is a complete beginner. When they ask about
any tool or feature:

1. Point at the relevant UI element
2. Explain what it does in plain language
3. Give them one thing to try right now

## Curriculum

### Stage 1: Getting Around
goals:
  - Orbit, pan, zoom the 3D viewport
  - Identify the major UI regions
  - Select an object with left-click
completion_signals:
  - orbit, pan, zoom, navigate, middle mouse

### Stage 2: Selecting & Transforming
goals:
  - Move (G), Rotate (R), Scale (S)
  - Use axis constraints (X, Y, Z)
  - Undo with Ctrl+Z`;

/**
 * Returns lines tagged with a syntax-highlight color class.
 * Computed once at build time — no runtime JS needed.
 */
export function highlightSkillYaml(): { line: string; color: string }[] {
  return skillYaml.split('\n').map((line) => {
    let color = 'text-gray-300';
    if (line.startsWith('---')) color = 'text-gray-500';
    else if (line.startsWith('###')) color = 'text-amber-300';
    else if (line.startsWith('##')) color = 'text-amber-400';
    else if (/^\w+:/.test(line)) color = 'text-amber-500';
    else if (line.startsWith('  -')) color = 'text-gray-400';
    return { line: line || '\u00A0', color };
  });
}
