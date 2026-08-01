---
title: "Houdini SOP Geometry Basics for FX Sources (beginner guide)"
description: "Build the source geometry every simulation needs. The point of this stage is not modeling — it is producing clean, attribute-rich geometry to feed into DOPs."
pubDate: 2026-06-29
updatedDate: 2026-06-29
author: "Mohamed Saleh Zaied"
category: how-to
series: "Houdini"
lessonNumber: 2
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
    - name: "Drop primitive geometry from Tab menu"
      text: "Drop primitive geometry from Tab menu: Box, Sphere, Tube, Grid, Curve"
    - name: "Use **Transform**, **Copy to Points**, **Scatter**, and **Gr"
      text: "Use **Transform**, **Copy to Points**, **Scatter**, and **Group** SOPs as utility nodes"
    - name: "Understand the **point / vertex / primitive** distinction in"
      text: "Understand the **point / vertex / primitive** distinction in Houdini — points are positions, vertices are uses of points by primitives, primitives are polys or other geometry types"
    - name: "Inspect attributes with the **Geometry Spreadsheet** pane (o"
      text: "Inspect attributes with the **Geometry Spreadsheet** pane (open with Geometry Spreadsheet from the pane tab menu) and the **MMB info popup** on a node"
    - name: "Add attributes with **Attribute Wrangle** (a single VEX expr"
      text: "Add attributes with **Attribute Wrangle** (a single VEX expression like `@temperature = 300;`) or **Attribute Create** — only enough to feed FX sources"
    - name: "Use a **Null SOP** as a labeled bookmark node"
      text: "Use a **Null SOP** as a labeled bookmark node — common convention: `OUT_render`, `OUT_collide`, `OUT_emit`"
    - name: "Use **File Cache SOP** to write cached geometry to `$HIP/geo"
      text: "Use **File Cache SOP** to write cached geometry to `$HIP/geo/` and reload it instantly — the foundation of fast iteration"
    - name: "Recognize the **error (red border)** and **warning (yellow b"
      text: "Recognize the **error (red border)** and **warning (yellow border)** indicators on nodes, and read the message in the Parameter Editor"
faq:
  - question: "What's the fastest way to learn sop geometry basics for fx sources in Houdini?"
    answer: "Work through the steps on this page in Houdini itself, on your own project. For hands-free help, Skilly is a voice guide that watches your screen and moves your cursor to the exact button as you go — so you learn by doing instead of pausing a video. It's free to start at tryskilly.app."
  - question: "Do I need the paid version of Houdini?"
    answer: "No — everything in this sop geometry basics for fx sources lesson works in the standard version of Houdini on macOS. A few advanced features may require a paid tier, which we call out where relevant."
canonicalKeyword: "sop geometry basics for fx sources houdini"
relatedArticles: []
---

Build the source geometry every simulation needs. The point of this stage is not modeling — it is producing clean, attribute-rich geometry to feed into DOPs. Here's how to do it in **Houdini** on macOS, step by step — part of the free Houdini beginner curriculum.

> **Lesson 2 of the Houdini curriculum.** Next up: [Pyro — Fire and Smoke](/learn/houdini-pyro-fire-and-smoke/).

## What you'll do

- Drop primitive geometry from Tab menu: Box, Sphere, Tube, Grid, Curve
- Use **Transform**, **Copy to Points**, **Scatter**, and **Group** SOPs as utility nodes
- Understand the **point / vertex / primitive** distinction in Houdini — points are positions, vertices are uses of points by primitives, primitives are polys or other geometry types
- Inspect attributes with the **Geometry Spreadsheet** pane (open with Geometry Spreadsheet from the pane tab menu) and the **MMB info popup** on a node
- Add attributes with **Attribute Wrangle** (a single VEX expression like `@temperature = 300;`) or **Attribute Create** — only enough to feed FX sources
- Use a **Null SOP** as a labeled bookmark node — common convention: `OUT_render`, `OUT_collide`, `OUT_emit`
- Use **File Cache SOP** to write cached geometry to `$HIP/geo/` and reload it instantly — the foundation of fast iteration
- Recognize the **error (red border)** and **warning (yellow border)** indicators on nodes, and read the message in the Parameter Editor

## Do it hands-free with Skilly

Reading steps is one thing; doing them while the menus are in front of you is another. [Skilly](/) is a voice-first tutor for macOS: you ask out loud — "where's the sop panel?" — and it answers while **moving your cursor to the exact button**, watching your actual Houdini window. It's the same Houdini curriculum these lessons come from, taught live instead of read. Free to start.

## Keep going

This is one stage of the full **[Houdini beginner curriculum](/learn/houdini-tutorial-for-beginners/)**. Continue with [Pyro — Fire and Smoke](/learn/houdini-pyro-fire-and-smoke/).
