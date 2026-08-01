---
title: "Houdini Pyro — Fire and Smoke (beginner guide)"
description: "Run a sparse pyro simulation from source to cache. — step-by-step on Mac."
pubDate: 2026-06-29
updatedDate: 2026-06-29
author: "Mohamed Saleh Zaied"
category: how-to
series: "Houdini"
lessonNumber: 3
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
    - name: "Build a source"
      text: "Build a source: a Sphere SOP into a **Pyro Source** SOP, which emits density/temperature/fuel attributes onto points"
    - name: "Drop a **DOP Network** node in the /obj context (or open the"
      text: "Drop a **DOP Network** node in the /obj context (or open the FX desktop's Pyro shelf and use the \"Explosion\" or \"Smoke\" shelf tool for an auto-built network)"
    - name: "Inside the DOP network, recognize the trio"
      text: "Inside the DOP network, recognize the trio: **Smoke Object** (the simulation domain), **Volume Source** (brings in the SOP geometry as fields), **Pyro Solver (Sparse)** (the actual solver)"
    - name: "Set the simulation **frame range** in the playbar AND verify"
      text: "Set the simulation **frame range** in the playbar AND verify substeps in the Pyro Solver Advanced tab — these are separate"
    - name: "Adjust the **shape operators** (dissipation, disturbance, sh"
      text: "Adjust the **shape operators** (dissipation, disturbance, shredding, turbulence) on the Pyro Solver to art-direct the look"
    - name: "Set **Clamp Below** to a sensible value (around 0.005 for de"
      text: "Set **Clamp Below** to a sensible value (around 0.005 for density) to keep the sparse active region tight"
    - name: "Cache the simulation"
      text: "Cache the simulation: add a **File Cache SOP** downstream of the DOP Import and write VDBs to `$HIP/cache/pyro/v001/`"
    - name: "Confirm the cache loaded by toggling the File Cache to Read "
      text: "Confirm the cache loaded by toggling the File Cache to Read From Disk and scrubbing — sim should play back instantly"
faq:
  - question: "What's the fastest way to learn pyro — fire and smoke in Houdini?"
    answer: "Work through the steps on this page in Houdini itself, on your own project. For hands-free help, Skilly is a voice guide that watches your screen and moves your cursor to the exact button as you go — so you learn by doing instead of pausing a video. It's free to start at tryskilly.app."
  - question: "Do I need the paid version of Houdini?"
    answer: "No — everything in this pyro — fire and smoke lesson works in the standard version of Houdini on macOS. A few advanced features may require a paid tier, which we call out where relevant."
canonicalKeyword: "pyro — fire and smoke houdini"
relatedArticles: []
---

Run a sparse pyro simulation from source to cache. Here's how to do it in **Houdini** on macOS, step by step — part of the free Houdini beginner curriculum.

> **Lesson 3 of the Houdini curriculum.** Next up: [FLIP Fluids](/learn/houdini-flip-fluids/).

## What you'll do

- Build a source: a Sphere SOP into a **Pyro Source** SOP, which emits density/temperature/fuel attributes onto points
- Drop a **DOP Network** node in the /obj context (or open the FX desktop's Pyro shelf and use the "Explosion" or "Smoke" shelf tool for an auto-built network)
- Inside the DOP network, recognize the trio: **Smoke Object** (the simulation domain), **Volume Source** (brings in the SOP geometry as fields), **Pyro Solver (Sparse)** (the actual solver)
- Set the simulation **frame range** in the playbar AND verify substeps in the Pyro Solver Advanced tab — these are separate
- Adjust the **shape operators** (dissipation, disturbance, shredding, turbulence) on the Pyro Solver to art-direct the look
- Set **Clamp Below** to a sensible value (around 0.005 for density) to keep the sparse active region tight
- Cache the simulation: add a **File Cache SOP** downstream of the DOP Import and write VDBs to `$HIP/cache/pyro/v001/`
- Confirm the cache loaded by toggling the File Cache to Read From Disk and scrubbing — sim should play back instantly

## Do it hands-free with Skilly

Reading steps is one thing; doing them while the menus are in front of you is another. [Skilly](/) is a voice-first tutor for macOS: you ask out loud — "where's the pyro panel?" — and it answers while **moving your cursor to the exact button**, watching your actual Houdini window. It's the same Houdini curriculum these lessons come from, taught live instead of read. Free to start.

## Keep going

This is one stage of the full **[Houdini beginner curriculum](/learn/houdini-tutorial-for-beginners/)**. Continue with [FLIP Fluids](/learn/houdini-flip-fluids/).
