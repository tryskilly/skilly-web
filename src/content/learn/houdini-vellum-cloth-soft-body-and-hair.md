---
title: "Houdini Vellum — Cloth, Soft Body, and Hair (beginner guide)"
description: "Simulate flexible materials with the modern Vellum framework — one solver, many constraint types. — step-by-step on Mac."
pubDate: 2026-06-29
updatedDate: 2026-06-29
author: "Mohamed Saleh Zaied"
category: how-to
series: "Houdini"
lessonNumber: 6
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
    - name: "Understand that **Vellum** replaces the legacy Cloth, Wire, "
      text: "Understand that **Vellum** replaces the legacy Cloth, Wire, and Hair solvers — one unified XPBD-based solver with different constraint types"
    - name: "Build a cloth"
      text: "Build a cloth: a Grid SOP into **Vellum Configure Cloth** → **Vellum Constraints (Cloth)** → **Vellum Solver**"
    - name: "Build a soft body"
      text: "Build a soft body: geometry → **Vellum Configure Softbody** → **Vellum Constraints (Softbody)** → Vellum Solver"
    - name: "Build hair/curves"
      text: "Build hair/curves: curves → **Vellum Configure Hair** → **Vellum Constraints (Hair)** → Vellum Solver"
    - name: "Add a **collider** by wiring a Static Object's geometry into"
      text: "Add a **collider** by wiring a Static Object's geometry into the Vellum Solver's collision input"
    - name: "Tune **Substeps** on the Vellum Solver"
      text: "Tune **Substeps** on the Vellum Solver — 4-8 for typical motion, 10+ for fast or thin cloth, 5+ minimum when using grains"
    - name: "Tune **Constraint Iterations**"
      text: "Tune **Constraint Iterations** — higher = stiffer constraints and less stretchy cloth"
    - name: "Pin points by adding a **Pin to Target** constraint or by se"
      text: "Pin points by adding a **Pin to Target** constraint or by setting `i@stopped = 1` on the points that should not move"
    - name: "Keep simulation geometry **near the world origin**"
      text: "Keep simulation geometry **near the world origin** — far-from-origin sims become unstable and crinkle"
    - name: "Cache the sim with File Cache SOP and play back instantly"
      text: "Cache the sim with File Cache SOP and play back instantly"
faq:
  - question: "What's the fastest way to learn vellum — cloth, soft body, and hair in Houdini?"
    answer: "Work through the steps on this page in Houdini itself, on your own project. For hands-free help, Skilly is a voice guide that watches your screen and moves your cursor to the exact button as you go — so you learn by doing instead of pausing a video. It's free to start at tryskilly.app."
  - question: "Do I need the paid version of Houdini?"
    answer: "No — everything in this vellum — cloth, soft body, and hair lesson works in the standard version of Houdini on macOS. A few advanced features may require a paid tier, which we call out where relevant."
canonicalKeyword: "vellum — cloth, soft body, and hair houdini"
relatedArticles: []
---

Simulate flexible materials with the modern Vellum framework — one solver, many constraint types. Here's how to do it in **Houdini** on macOS, step by step — part of the free Houdini beginner curriculum.

> **Lesson 6 of the Houdini curriculum.** Next up: [Solaris and the LOP Workflow](/learn/houdini-solaris-and-the-lop-workflow).

## What you'll do

- Understand that **Vellum** replaces the legacy Cloth, Wire, and Hair solvers — one unified XPBD-based solver with different constraint types
- Build a cloth: a Grid SOP into **Vellum Configure Cloth** → **Vellum Constraints (Cloth)** → **Vellum Solver**
- Build a soft body: geometry → **Vellum Configure Softbody** → **Vellum Constraints (Softbody)** → Vellum Solver
- Build hair/curves: curves → **Vellum Configure Hair** → **Vellum Constraints (Hair)** → Vellum Solver
- Add a **collider** by wiring a Static Object's geometry into the Vellum Solver's collision input
- Tune **Substeps** on the Vellum Solver — 4-8 for typical motion, 10+ for fast or thin cloth, 5+ minimum when using grains
- Tune **Constraint Iterations** — higher = stiffer constraints and less stretchy cloth
- Pin points by adding a **Pin to Target** constraint or by setting `i@stopped = 1` on the points that should not move
- Keep simulation geometry **near the world origin** — far-from-origin sims become unstable and crinkle
- Cache the sim with File Cache SOP and play back instantly

## Do it hands-free with Skilly

Reading steps is one thing; doing them while the menus are in front of you is another. [Skilly](/) is a voice-first tutor for macOS: you ask out loud — "where's the vellum panel?" — and it answers while **moving your cursor to the exact button**, watching your actual Houdini window. It's the same Houdini curriculum these lessons come from, taught live instead of read. Free to start.

## Keep going

This is one stage of the full **[Houdini beginner curriculum](/learn/houdini-tutorial-for-beginners)**. Continue with [Solaris and the LOP Workflow](/learn/houdini-solaris-and-the-lop-workflow).
