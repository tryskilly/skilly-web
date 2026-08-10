---
title: "Houdini Karma Rendering: Solaris to Frames"
description: "Render with Karma in Houdini: set up Solaris, choose CPU or XPU, configure samples and denoising, and export an image sequence with USD Render ROP."
pubDate: 2026-06-29
updatedDate: 2026-08-04
author: "Mohamed Saleh Zaied"
category: how-to
series: "Houdini"
lessonNumber: 8
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
    - name: "Drop a **Karma Render Settings LOP** in /stage"
      text: "Drop a **Karma Render Settings LOP** in /stage — sets resolution, AOVs, sampling, denoiser, output paths"
    - name: "Choose **Karma CPU** as the default render delegate on Apple"
      text: "Choose **Karma CPU** as the default render delegate on Apple Silicon (Karma XPU on Mac still runs CPU-only as of May 2026 — no Metal GPU acceleration, no announced timeline. On NVIDIA Linux/Windows boxes, XPU's OptiX GPU mode is the fastest option)"
    - name: "Set **Pixel Samples** (start 4×4 for previews, 8×8 to 16×16 "
      text: "Set **Pixel Samples** (start 4×4 for previews, 8×8 to 16×16 for finals) and **Max Ray Samples** for adaptive sampling"
    - name: "Enable the **Karma denoiser** (OIDN for CPU, Optix for NVIDI"
      text: "Enable the **Karma denoiser** (OIDN for CPU, Optix for NVIDIA only) to clean fireflies and noise at lower sample counts"
    - name: "Add a **USD Render ROP** at the bottom of the stage to actua"
      text: "Add a **USD Render ROP** at the bottom of the stage to actually trigger renders — set output file path with `$F4` for frame padding"
    - name: "Use **IPR** (Interactive Photorealistic Rendering)"
      text: "Use **IPR** (Interactive Photorealistic Rendering) — the play button on the Render Gallery toolbar — to live-tweak materials and lights without re-launching renders"
    - name: "Render to **OpenEXR** (multi-AOV) for compositing, **PNG** o"
      text: "Render to **OpenEXR** (multi-AOV) for compositing, **PNG** only for one-off stills"
    - name: "Match the render **frame range** to the cached simulation fr"
      text: "Match the render **frame range** to the cached simulation frame range — never render past the last cached frame"
    - name: "For network rendering, use the **HQueue** or render farm sub"
      text: "For network rendering, use the **HQueue** or render farm submission tool; for local farms, render in the background with `hrender` from the command line"
faq:
  - question: "What's the fastest way to learn karma rendering in Houdini?"
    answer: "Work through the steps on this page in Houdini itself, on your own project. For hands-free help, Skilly is a voice guide that watches your screen and moves your cursor to the exact button as you go — so you learn by doing instead of pausing a video. It's free to start at tryskilly.app."
  - question: "Do I need the paid version of Houdini?"
    answer: "No — everything in this karma rendering lesson works in the standard version of Houdini on macOS. A few advanced features may require a paid tier, which we call out where relevant."
canonicalKeyword: "karma rendering houdini"
relatedArticles: []
---

This Houdini Karma tutorial takes a scene from Solaris setup to a saved image sequence. You will choose the correct render engine, create render settings, preview the result, reduce noise, and render final frames without guessing which node does what.

> **Lesson 8 of the Houdini curriculum.** Next up: [Caching, Versioning, and Production Hygiene](/learn/houdini-caching-versioning-and-production-hygiene/).

> Updated August 4, 2026 against SideFX's current [Karma documentation](https://www.sidefx.com/docs/houdini/solaris/karma.html), [rendering guide](https://www.sidefx.com/docs/houdini/solaris/kug/rendering.html), and [Karma XPU hardware notes](https://www.sidefx.com/docs/houdini/solaris/karma_xpu.html).

## What is Karma rendering in Houdini?

Karma is Houdini's physically based USD renderer. It is integrated with **Solaris**, Houdini's scene-building and look-development context, and can render interactively in the viewport or write final frames through a **USD Render ROP**. For new projects, SideFX recommends Karma instead of Mantra.

The short workflow is: import or build the scene in `/stage`, add lights and a camera, create a **Karma Render Settings LOP**, preview with a Karma viewport delegate, then connect a **USD Render ROP** to save the final image sequence.

## Karma CPU vs Karma XPU

Choose the engine before tuning the render because CPU and XPU are not guaranteed to produce pixel-identical output.

| Engine | Choose it when | Important limitation |
|---|---|---|
| **Karma CPU** | You need VEX or legacy Mantra shading features, maximum compatibility, or detailed sampling controls | Renders entirely on the CPU |
| **Karma XPU** | You use MaterialX and have a supported NVIDIA GPU | GPU acceleration currently requires NVIDIA; Apple Silicon uses only the Embree CPU device |

On a Mac, **Karma CPU is the clearest default**. XPU can run there, but it does not use the Apple GPU, so do not expect the NVIDIA acceleration described in many XPU tutorials. Once you choose an engine for a production render, keep the same engine locally and on the render farm.

## Step-by-step: render a scene with Karma

### 1. Bring the scene into Solaris

Switch to the **Solaris** desktop or open the `/stage` context. If your geometry was built in `/obj`, add a **Scene Import LOP** to bring the object-level scene into USD. Confirm the geometry, camera, and lights appear in the Scene Graph Tree.

### 2. Add a camera and lights

Create or import a camera and at least one USD light. A simple first setup is a Dome Light for environment illumination plus a Rect Light for direction. Make sure the camera path is the one you intend to render.

### 3. Add Karma Render Settings

Create a **Karma Render Settings LOP** after the scene-building nodes. Set the resolution and camera, then choose the CPU or XPU parameter set. For a fast first preview, keep sampling modest; increase it only after the composition and lighting are approved.

### 4. Preview in the Solaris viewport

Use the viewport's render-delegate menu to choose **Karma CPU** or **Karma XPU**. Let the image resolve, then adjust lights and materials interactively. Save useful comparisons to the Render Gallery instead of judging changes from memory.

### 5. Set sampling and denoising

For Karma CPU, start around **4×4 Pixel Samples** for previews and raise the value for finals only when visible noise remains. Enable denoising for a cleaner preview, but do not use it to hide missing samples, fireflies, or poorly lit areas. Check AOVs to identify whether noise comes from direct light, reflections, refractions, or volumes before increasing every sample control.

### 6. Add a USD Render ROP

Connect a **USD Render ROP** after the render-settings node. This writes temporary USD and launches `husk` to produce image files. Point it at the correct render-settings primitive and set an output path that includes a frame token, for example:

```text
$HIP/render/karma/beauty.$F4.exr
```

`$F4` creates zero-padded frame numbers such as `beauty.0001.exr`. Without a frame token, an animation can overwrite the same file on every frame.

### 7. Match and render the frame range

Set the render range to the frames actually cached by your simulation. Render one representative frame first, open the output file, and verify the camera, resolution, color, and AOVs. Then render the full range through the USD Render ROP.

## Recommended output settings

- Use **OpenEXR** for animation, compositing, high dynamic range, or multiple AOVs.
- Use **PNG** only for simple finished stills that do not need compositing flexibility.
- Put each shot or version in its own output directory to avoid overwrites.
- Render a short frame range before committing a long simulation to final quality.
- Inspect the Log Viewer when `husk` fails or an expected file is missing.

## Why is my Karma render noisy?

Do not raise every setting at once. First inspect the noisy component in the Render Gallery or AOVs. Improve the light setup, then increase the sampling control connected to the noisy path. Denoising is useful for the final residual noise, but excessive denoising can smear texture and fine geometry.

For systematic diagnosis, SideFX's [Refining Karma Renders](https://www.sidefx.com/tutorials/refining-karma-renders/) course covers AOVs, light path expressions, CPU and XPU sampling, and denoisers with current Houdini workflows.

## Common Karma rendering problems

### The viewport renders, but no file is saved

The viewport delegate is only an interactive preview. Add and execute a **USD Render ROP**, verify its render-settings path, and set a writable output image path.

### Every animation frame overwrites the previous one

Add `$F4` or another frame token to the output filename. Test frames 1 and 2 and confirm that two separate files appear before launching the full render.

### Karma XPU is not using the GPU on a Mac

That is expected. SideFX currently supports NVIDIA GPUs for XPU acceleration; Apple Silicon falls back to the Embree CPU device. Use Karma CPU for a straightforward Mac workflow, or render XPU on a supported NVIDIA machine.

### Materials look different between CPU and XPU

XPU supports MaterialX, USD Preview Surface, and Karma-specific nodes, while legacy shader support is more limited. Use MaterialX for an XPU pipeline and avoid switching delegates mid-production.

## Do it hands-free with Skilly

Reading steps is one thing; finding the right Solaris node while Houdini is open is another. [Skilly](/) is a voice-first tutor for macOS: ask “where do I add the USD Render ROP?” and get guidance against the Houdini window already on your screen. Start free with no card.

## Keep going

This is one stage of the full **[Houdini beginner curriculum](/learn/houdini-tutorial-for-beginners/)**. Continue with [Caching, Versioning, and Production Hygiene](/learn/houdini-caching-versioning-and-production-hygiene/).
