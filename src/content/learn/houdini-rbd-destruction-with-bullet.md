---
title: "Houdini RBD Destruction with Bullet (beginner guide)"
description: "Fracture geometry and run rigid-body simulations using packed primitives and the Bullet solver. — step-by-step on Mac."
pubDate: 2026-06-29
updatedDate: 2026-06-29
author: "Mohamed Saleh Zaied"
category: how-to
series: "Houdini"
lessonNumber: 5
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
    - name: "Fracture a mesh with **Voronoi Fracture** SOP"
      text: "Fracture a mesh with **Voronoi Fracture** SOP — the first input is the mesh, the second input is the scatter points that define fracture cells"
    - name: "Refine with **RBD Material Fracture** for higher-level contr"
      text: "Refine with **RBD Material Fracture** for higher-level controls: glass, concrete, wood presets with built-in interior detail"
    - name: "Convert pieces into **packed primitives** using **Assemble**"
      text: "Convert pieces into **packed primitives** using **Assemble** or **RBD Configure** SOP — without packing, the sim treats the whole fractured mesh as one rigid body"
    - name: "Use the **RBD Bullet Solver** SOP (the SOP-level all-in-one "
      text: "Use the **RBD Bullet Solver** SOP (the SOP-level all-in-one solver introduced in H18+) for fast iteration without diving into DOPs"
    - name: "Build constraints with **Connect Adjacent Pieces** to create"
      text: "Build constraints with **Connect Adjacent Pieces** to create a glue or hard constraint network — wire the constraint geometry into the solver's second input"
    - name: "Set glue **strength** as a primitive attribute on the constr"
      text: "Set glue **strength** as a primitive attribute on the constraint geometry — higher = harder to break"
    - name: "Add forces"
      text: "Add forces: **Gravity**, **Wind**, or a Pop Force node connected via the third input of the RBD Bullet Solver"
    - name: "Cache the simulation with File Cache SOP"
      text: "Cache the simulation with File Cache SOP — packed primitive caches are fast and small"
    - name: "Unpack and add interior detail (displacement, subdivision) o"
      text: "Unpack and add interior detail (displacement, subdivision) only after caching, never inside the sim"
faq:
  - question: "What's the fastest way to learn rbd destruction with bullet in Houdini?"
    answer: "Work through the steps on this page in Houdini itself, on your own project. For hands-free help, Skilly is a voice guide that watches your screen and moves your cursor to the exact button as you go — so you learn by doing instead of pausing a video. It's free to start at tryskilly.app."
  - question: "Do I need the paid version of Houdini?"
    answer: "No — everything in this rbd destruction with bullet lesson works in the standard version of Houdini on macOS. A few advanced features may require a paid tier, which we call out where relevant."
canonicalKeyword: "rbd destruction with bullet houdini"
relatedArticles: []
---

Fracture geometry and run rigid-body simulations using packed primitives and the Bullet solver. Here's how to do it in **Houdini** on macOS, step by step — part of the free Houdini beginner curriculum.

> **Lesson 5 of the Houdini curriculum.** Next up: [Vellum — Cloth, Soft Body, and Hair](/learn/houdini-vellum-cloth-soft-body-and-hair).

## What you'll do

- Fracture a mesh with **Voronoi Fracture** SOP — the first input is the mesh, the second input is the scatter points that define fracture cells
- Refine with **RBD Material Fracture** for higher-level controls: glass, concrete, wood presets with built-in interior detail
- Convert pieces into **packed primitives** using **Assemble** or **RBD Configure** SOP — without packing, the sim treats the whole fractured mesh as one rigid body
- Use the **RBD Bullet Solver** SOP (the SOP-level all-in-one solver introduced in H18+) for fast iteration without diving into DOPs
- Build constraints with **Connect Adjacent Pieces** to create a glue or hard constraint network — wire the constraint geometry into the solver's second input
- Set glue **strength** as a primitive attribute on the constraint geometry — higher = harder to break
- Add forces: **Gravity**, **Wind**, or a Pop Force node connected via the third input of the RBD Bullet Solver
- Cache the simulation with File Cache SOP — packed primitive caches are fast and small
- Unpack and add interior detail (displacement, subdivision) only after caching, never inside the sim

## Do it hands-free with Skilly

Reading steps is one thing; doing them while the menus are in front of you is another. [Skilly](/) is a voice-first tutor for macOS: you ask out loud — "where's the rbd panel?" — and it answers while **moving your cursor to the exact button**, watching your actual Houdini window. It's the same Houdini curriculum these lessons come from, taught live instead of read. Free to start.

## Keep going

This is one stage of the full **[Houdini beginner curriculum](/learn/houdini-tutorial-for-beginners)**. Continue with [Vellum — Cloth, Soft Body, and Hair](/learn/houdini-vellum-cloth-soft-body-and-hair).
