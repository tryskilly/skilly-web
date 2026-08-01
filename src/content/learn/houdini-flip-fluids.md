---
title: "Houdini FLIP Fluids (beginner guide)"
description: "Simulate water, splashes, and viscous fluids with the FLIP Solver 2.0. — step-by-step on Mac."
pubDate: 2026-06-29
updatedDate: 2026-06-29
author: "Mohamed Saleh Zaied"
category: how-to
series: "Houdini"
lessonNumber: 4
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
    - name: "Source fluid from geometry"
      text: "Source fluid from geometry: a closed mesh into a **FLIP Source** SOP (or use the \"FLIP Tank\" or \"Fill Object\" shelf tool for an auto-built setup)"
    - name: "Inside the DOP network, recognize"
      text: "Inside the DOP network, recognize: **FLIP Object** (particle container), **FLIP Solver 2.0** (the solver), **Static Object / RBD Object** as colliders"
    - name: "Understand **particle separation**"
      text: "Understand **particle separation** — the spacing between particles. Smaller = more detail = exponentially slower. Start coarse (0.1), refine later"
    - name: "Confirm **reseeding** is enabled on the FLIP Solver"
      text: "Confirm **reseeding** is enabled on the FLIP Solver — it maintains particle density as the fluid stretches and compresses"
    - name: "Set **substeps** on the FLIP Solver for fast motion (2-4 typ"
      text: "Set **substeps** on the FLIP Solver for fast motion (2-4 typical, more for splashes)"
    - name: "Cache the particle simulation to BGEO sequence with File Cac"
      text: "Cache the particle simulation to BGEO sequence with File Cache SOP"
    - name: "Mesh the cached particles using **Particle Fluid Surface** S"
      text: "Mesh the cached particles using **Particle Fluid Surface** SOP — set Particle Separation to match the sim, Influence Scale around 2-3, Voxel Scale 1.0"
    - name: "Alternative meshing chain"
      text: "Alternative meshing chain: **VDB From Particles** → **VDB Smooth** (5-10 iterations) → **Convert VDB** to polygons for greater control"
    - name: "Cache the meshed result separately from the particle sim"
      text: "Cache the meshed result separately from the particle sim — meshing is expensive and should not re-run on every render"
faq:
  - question: "What's the fastest way to learn flip fluids in Houdini?"
    answer: "Work through the steps on this page in Houdini itself, on your own project. For hands-free help, Skilly is a voice guide that watches your screen and moves your cursor to the exact button as you go — so you learn by doing instead of pausing a video. It's free to start at tryskilly.app."
  - question: "Do I need the paid version of Houdini?"
    answer: "No — everything in this flip fluids lesson works in the standard version of Houdini on macOS. A few advanced features may require a paid tier, which we call out where relevant."
canonicalKeyword: "flip fluids houdini"
relatedArticles: []
---

Simulate water, splashes, and viscous fluids with the FLIP Solver 2.0. Here's how to do it in **Houdini** on macOS, step by step — part of the free Houdini beginner curriculum.

> **Lesson 4 of the Houdini curriculum.** Next up: [RBD Destruction with Bullet](/learn/houdini-rbd-destruction-with-bullet/).

## What you'll do

- Source fluid from geometry: a closed mesh into a **FLIP Source** SOP (or use the "FLIP Tank" or "Fill Object" shelf tool for an auto-built setup)
- Inside the DOP network, recognize: **FLIP Object** (particle container), **FLIP Solver 2.0** (the solver), **Static Object / RBD Object** as colliders
- Understand **particle separation** — the spacing between particles. Smaller = more detail = exponentially slower. Start coarse (0.1), refine later
- Confirm **reseeding** is enabled on the FLIP Solver — it maintains particle density as the fluid stretches and compresses
- Set **substeps** on the FLIP Solver for fast motion (2-4 typical, more for splashes)
- Cache the particle simulation to BGEO sequence with File Cache SOP
- Mesh the cached particles using **Particle Fluid Surface** SOP — set Particle Separation to match the sim, Influence Scale around 2-3, Voxel Scale 1.0
- Alternative meshing chain: **VDB From Particles** → **VDB Smooth** (5-10 iterations) → **Convert VDB** to polygons for greater control
- Cache the meshed result separately from the particle sim — meshing is expensive and should not re-run on every render

## Do it hands-free with Skilly

Reading steps is one thing; doing them while the menus are in front of you is another. [Skilly](/) is a voice-first tutor for macOS: you ask out loud — "where's the flip panel?" — and it answers while **moving your cursor to the exact button**, watching your actual Houdini window. It's the same Houdini curriculum these lessons come from, taught live instead of read. Free to start.

## Keep going

This is one stage of the full **[Houdini beginner curriculum](/learn/houdini-tutorial-for-beginners/)**. Continue with [RBD Destruction with Bullet](/learn/houdini-rbd-destruction-with-bullet/).
