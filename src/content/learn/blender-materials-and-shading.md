---
title: "Blender Materials and Shading (beginner guide)"
description: "Give the mesh a surface appearance using the Principled BSDF shader and the Shader Editor. — step-by-step on Mac."
pubDate: 2026-06-29
updatedDate: 2026-06-29
author: "Mohamed Saleh Zaied"
category: how-to
tags:
  - 3d-modeling
  - blender
  - beginner
  - creative
howTo:
  tools:
    - "Blender"
  steps:
    - name: "Switch the viewport to Material Preview mode (Z pie) to see "
      text: "Switch the viewport to Material Preview mode (Z pie) to see materials in real time under an HDRI lighting environment"
    - name: "Open the Material Properties tab"
      text: "Open the Material Properties tab: the sphere/checker icon in the Properties Editor"
    - name: "Create a new material with the \"New\" button; rename it by cl"
      text: "Create a new material with the \"New\" button; rename it by clicking the name field"
    - name: "Understand the default node setup"
      text: "Understand the default node setup: Principled BSDF node → Material Output node"
    - name: "Set Base Color by clicking the color swatch on the Principle"
      text: "Set Base Color by clicking the color swatch on the Principled BSDF node"
    - name: "Adjust Roughness (0.0 = mirror-sharp reflections, 1.0 = full"
      text: "Adjust Roughness (0.0 = mirror-sharp reflections, 1.0 = fully matte)"
    - name: "Adjust Metallic (0.0 = non-metal/dielectric, 1.0 = metallic)"
      text: "Adjust Metallic (0.0 = non-metal/dielectric, 1.0 = metallic) — combined with Roughness and Base Color this creates plastic, brushed metal, polished metal"
    - name: "Know the Blender 4.0+ renamed inputs"
      text: "Know the Blender 4.0+ renamed inputs: Subsurface Weight (not \"Subsurface\"), Transmission Weight (not \"Transmission\"), Coat (not \"Clearcoat\"), Specular IOR Level (not \"Specular\")"
    - name: "Open the Shading workspace (top workspace tab) to see the fu"
      text: "Open the Shading workspace (top workspace tab) to see the full Shader Editor node graph"
    - name: "Add an Image Texture node (Shift+A > Texture > Image Texture"
      text: "Add an Image Texture node (Shift+A > Texture > Image Texture in the Shader Editor) and connect it to Base Color to apply a texture map"
    - name: "Assign multiple materials to different faces"
      text: "Assign multiple materials to different faces: enter Edit Mode, select the faces, then click Assign in the Material Properties tab"
    - name: "Apply Shade Smooth by right-clicking the object in Object Mo"
      text: "Apply Shade Smooth by right-clicking the object in Object Mode — or use Shade Auto Smooth for mixed hard/smooth based on angle threshold"
faq:
  - question: "What's the fastest way to learn materials and shading in Blender?"
    answer: "Work through the steps on this page in Blender itself, on your own project. For hands-free help, Skilly is a voice guide that watches your screen and moves your cursor to the exact button as you go — so you learn by doing instead of pausing a video. It's free to start at tryskilly.app."
  - question: "Do I need the paid version of Blender?"
    answer: "No — everything in this materials and shading lesson works in the standard version of Blender on macOS. A few advanced features may require a paid tier, which we call out where relevant."
canonicalKeyword: "materials and shading blender"
relatedArticles: []
---

Give the mesh a surface appearance using the Principled BSDF shader and the Shader Editor. Here's how to do it in **Blender** on macOS, step by step — part of the free Blender beginner curriculum.

> **Lesson 6 of the Blender curriculum.** Next up: [Lighting and Rendering](/learn/blender-lighting-and-rendering).

## What you'll do

- Switch the viewport to Material Preview mode (Z pie) to see materials in real time under an HDRI lighting environment
- Open the Material Properties tab: the sphere/checker icon in the Properties Editor
- Create a new material with the "New" button; rename it by clicking the name field
- Understand the default node setup: Principled BSDF node → Material Output node
- Set Base Color by clicking the color swatch on the Principled BSDF node
- Adjust Roughness (0.0 = mirror-sharp reflections, 1.0 = fully matte)
- Adjust Metallic (0.0 = non-metal/dielectric, 1.0 = metallic) — combined with Roughness and Base Color this creates plastic, brushed metal, polished metal
- Know the Blender 4.0+ renamed inputs: Subsurface Weight (not "Subsurface"), Transmission Weight (not "Transmission"), Coat (not "Clearcoat"), Specular IOR Level (not "Specular")
- Open the Shading workspace (top workspace tab) to see the full Shader Editor node graph
- Add an Image Texture node (Shift+A > Texture > Image Texture in the Shader Editor) and connect it to Base Color to apply a texture map
- Assign multiple materials to different faces: enter Edit Mode, select the faces, then click Assign in the Material Properties tab
- Apply Shade Smooth by right-clicking the object in Object Mode — or use Shade Auto Smooth for mixed hard/smooth based on angle threshold

## Do it hands-free with Skilly

Reading steps is one thing; doing them while the menus are in front of you is another. [Skilly](/) is a voice-first tutor for macOS: you ask out loud — "where's the materials panel?" — and it answers while **moving your cursor to the exact button**, watching your actual Blender window. It's the same Blender curriculum these lessons come from, taught live instead of read. Free to start.

## Keep going

This is one stage of the full **[Blender beginner curriculum](/learn/blender-tutorial-for-beginners)**. Continue with [Lighting and Rendering](/learn/blender-lighting-and-rendering).
