---
title: "Houdini Solaris and the LOP Workflow (beginner guide)"
description: "Move from /obj-context legacy lighting to the modern /stage Solaris USD-based pipeline. — step-by-step on Mac."
pubDate: 2026-06-29
updatedDate: 2026-06-29
author: "Mohamed Saleh Zaied"
category: how-to
series: "Houdini"
lessonNumber: 7
tags:
  - vfx
  - houdini
  - simulations
  - rendering
  - intermediate
howTo:
  tools:
    - "Houdini"
  steps:
    - name: "Recognize the **/stage context** is the Solaris/LOP workspac"
      text: "Recognize the **/stage context** is the Solaris/LOP workspace, separate from /obj — switch desktops to \"Solaris\" for the default Solaris layout"
    - name: "Understand **LOPs operate on USD primitives**"
      text: "Understand **LOPs operate on USD primitives** — every node either creates, modifies, or composes USD layers"
    - name: "Import geometry from /obj using **SOP Import LOP** (brings a"
      text: "Import geometry from /obj using **SOP Import LOP** (brings a SOP network's output into the stage as a USD primitive)"
    - name: "Place lights as LOP primitives"
      text: "Place lights as LOP primitives: **Light LOP** (point/spot/area/distant), **Dome Light LOP** (HDRI environment), **Karma Sky Light**"
    - name: "Use a **Material Library LOP** to define materials and a **A"
      text: "Use a **Material Library LOP** to define materials and a **Assign Material LOP** to bind them to primitives — MaterialX is the modern shading language in Solaris"
    - name: "Add a **Camera LOP** for the render camera, or import from /"
      text: "Add a **Camera LOP** for the render camera, or import from /obj"
    - name: "Understand the **stage view** of the Scene View"
      text: "Understand the **stage view** of the Scene View — shows the composed USD stage, not the SOP network"
    - name: "Lights placed in /obj **do not** appear in a /stage render"
      text: "Lights placed in /obj **do not** appear in a /stage render — they live in parallel worlds. New Solaris work should use Light LOPs"
    - name: "Save and inspect intermediate USD layers with **USD ROP** or"
      text: "Save and inspect intermediate USD layers with **USD ROP** or **USD Render ROP** if needed for pipeline interop"
    - name: "(H21+, optional) **Shot Builder Tools** ship in /stage to sc"
      text: "(H21+, optional) **Shot Builder Tools** ship in /stage to scaffold a multi-shot USD layout. Still officially **beta** in H21 — fine for personal/indie work, but the node set and parameters are subject to change. Pair with **Live Rendering** for near real-time scene-update preview"
faq:
  - question: "What's the fastest way to learn solaris and the lop workflow in Houdini?"
    answer: "Work through the steps on this page in Houdini itself, on your own project. For hands-free help, Skilly is a voice guide that watches your screen and moves your cursor to the exact button as you go — so you learn by doing instead of pausing a video. It's free to start at tryskilly.app."
  - question: "Do I need the paid version of Houdini?"
    answer: "No — everything in this solaris and the lop workflow lesson works in the standard version of Houdini on macOS. A few advanced features may require a paid tier, which we call out where relevant."
canonicalKeyword: "solaris and the lop workflow houdini"
relatedArticles: []
---

Move from /obj-context legacy lighting to the modern /stage Solaris USD-based pipeline. Here's how to do it in **Houdini** on macOS, step by step — part of the free Houdini beginner curriculum.

> **Lesson 7 of the Houdini curriculum.** Next up: [Karma Rendering](/learn/houdini-karma-rendering).

## What you'll do

- Recognize the **/stage context** is the Solaris/LOP workspace, separate from /obj — switch desktops to "Solaris" for the default Solaris layout
- Understand **LOPs operate on USD primitives** — every node either creates, modifies, or composes USD layers
- Import geometry from /obj using **SOP Import LOP** (brings a SOP network's output into the stage as a USD primitive)
- Place lights as LOP primitives: **Light LOP** (point/spot/area/distant), **Dome Light LOP** (HDRI environment), **Karma Sky Light**
- Use a **Material Library LOP** to define materials and a **Assign Material LOP** to bind them to primitives — MaterialX is the modern shading language in Solaris
- Add a **Camera LOP** for the render camera, or import from /obj
- Understand the **stage view** of the Scene View — shows the composed USD stage, not the SOP network
- Lights placed in /obj **do not** appear in a /stage render — they live in parallel worlds. New Solaris work should use Light LOPs
- Save and inspect intermediate USD layers with **USD ROP** or **USD Render ROP** if needed for pipeline interop
- (H21+, optional) **Shot Builder Tools** ship in /stage to scaffold a multi-shot USD layout. Still officially **beta** in H21 — fine for personal/indie work, but the node set and parameters are subject to change. Pair with **Live Rendering** for near real-time scene-update previews

## Do it hands-free with Skilly

Reading steps is one thing; doing them while the menus are in front of you is another. [Skilly](/) is a voice-first tutor for macOS: you ask out loud — "where's the solaris panel?" — and it answers while **moving your cursor to the exact button**, watching your actual Houdini window. It's the same Houdini curriculum these lessons come from, taught live instead of read. Free to start.

## Keep going

This is one stage of the full **[Houdini beginner curriculum](/learn/houdini-tutorial-for-beginners)**. Continue with [Karma Rendering](/learn/houdini-karma-rendering).
