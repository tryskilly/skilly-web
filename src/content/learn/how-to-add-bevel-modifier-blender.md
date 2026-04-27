---
title: "How to add a bevel modifier in Blender (5.1, step-by-step)"
description: "Add the Bevel modifier in Blender 5.1 to round or chamfer edges non-destructively. Every parameter explained, with the gotchas that catch beginners."
pubDate: 2026-04-27
updatedDate: 2026-04-27
author: "Mohamed Saleh Zaied"
category: how-to
tags:
  - blender
  - modeling
  - 3d
  - tutorial
canonicalKeyword: "how to add bevel modifier blender"
howTo:
  totalTime: "PT4M"
  tools:
    - "Blender 5.1+"
  steps:
    - name: "Select your object in Object Mode"
      text: "Click the mesh you want to bevel. Stay in Object Mode (Tab toggles between Object and Edit Mode — you want Object Mode for adding modifiers)."
    - name: "Open the Modifier Properties panel"
      text: "In the Properties editor on the right, click the wrench icon to open Modifier Properties."
    - name: "Add the Bevel modifier"
      text: "Click 'Add Modifier', then choose Generate → Bevel from the menu."
    - name: "Set the Width and Segments"
      text: "Drag the Width slider until the bevel size looks right. Bump Segments from 1 to 3 or 4 to make it round instead of a single chamfer."
    - name: "Pick a Limit Method (optional but recommended)"
      text: "Set Limit Method to Angle if you only want sharp edges beveled — leave the default 30° threshold. Or use Weight to control which edges bevel via Edit Mode bevel weights."
faq:
  - question: "What's the difference between the Bevel modifier and the Bevel tool (Ctrl+B)?"
    answer: "The Bevel tool (Ctrl+B in Edit Mode) cuts geometry permanently — it bakes the bevel into the mesh. The Bevel modifier is non-destructive: you can change Width, Segments, or remove it entirely without touching the underlying geometry. Use the modifier for production work where you might iterate on design. Use the tool when you're certain about the bevel and want to manually tweak vertices afterward."
  - question: "Why does my bevel look weird or overlap itself?"
    answer: "Two main causes. First, your Width is too high relative to nearby edges — turn on Clamp Overlap in the Geometry section to limit each beveled edge to non-overlapping size. Second, you're beveling a non-manifold or pinched mesh — the modifier can't cleanly interpret what the corner should look like. Check for doubled vertices (Mesh → Clean Up → Merge by Distance) and ensure no edge has more than two faces touching it."
  - question: "How do I bevel only certain edges, not all of them?"
    answer: "Two options. The cleanest is the Weight limit method: in Edit Mode, select the edges you want, open the N-panel sidebar → Item tab, and set 'Mean Bevel Weight' to 1.0 (or any value between 0 and 1). Back in the modifier, set Limit Method to Weight. Alternatively, use Vertex Group to assign a vertex group and limit by that. Angle limit works for hard-surface modeling where you want sharp edges only."
  - question: "What's a good starting value for Segments?"
    answer: "For hard-surface modeling (mechanical parts, props), 2-3 segments gives a clean visible bevel without quad-bombing your mesh. For organic or close-up renders where the bevel will catch light, 4-6 segments gives a smoother roll. Going higher than 8 is rarely worth the geometry cost — use a Subdivision Surface modifier after the Bevel for smoother results instead."
  - question: "Why is my bevel size in the wrong unit?"
    answer: "Width Type controls how Width is interpreted. The default Offset is in scene units (meters by default in Blender). If you want consistent visual bevel regardless of edge length, switch Width Type to Percent and use a percentage of edge length. For exact distances along edges, use Absolute — useful when matching reference geometry."
  - question: "How do I move the Bevel modifier above or below other modifiers?"
    answer: "Modifier order matters — modifiers process top-to-bottom. To reorder, click the dropdown arrow (or grip handle) next to the modifier name and select Move to Top / Move Up / Move Down. Common pattern: Bevel before Subdivision Surface for a sharper result, Bevel after Subdivision Surface for a softer one. Bevel is almost always before Mirror so it doesn't bevel the seam."
relatedArticles: []
---

If you've added a cube in Blender and the corners look fake — too sharp, no light catching them — you need a bevel. Real-world objects don't have perfect 90° edges. Even the laptop you're reading this on has a tiny chamfer where the lid meets the base.

This guide is the fastest path to a clean bevel in Blender 5.1, plus the parameters and gotchas that aren't obvious from the panel.

> All UI labels and behavior in this guide were verified against the official Blender 5.1 manual on 2026-04-27 at [docs.blender.org/manual/en/latest/modeling/modifiers/generate/bevel.html](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/bevel.html). Blender 4.x and earlier had slightly different UI labels — if a step doesn't match, check your version with **Help → About Blender**.

## When to use the Bevel modifier (vs the Bevel tool)

Blender has two ways to bevel:

| | Bevel tool | Bevel modifier |
|---|---|---|
| **How to invoke** | `Ctrl+B` in Edit Mode | Modifier Properties → Add Modifier → Bevel |
| **Behavior** | Bakes new geometry into the mesh immediately | Non-destructive, lives as a modifier in the stack |
| **Iteration** | You commit to the result; undoing later is messy | Tweak Width / Segments anytime, even after months |
| **Best for** | Final polish on a finished mesh | Production work where design might evolve |

**Use the modifier 90% of the time.** Use the tool only when you've decided the bevel is final and you need to manually edit the new geometry afterward.

## Step-by-step: add a Bevel modifier

1. **Select your object** in Object Mode. Press `Tab` if you're in Edit Mode — adding modifiers happens at the object level.
2. **Open Modifier Properties.** In the Properties editor (right-side panel), click the **wrench icon**. If you can't see the wrench, your Properties panel may be hiding tabs — drag it wider.
3. **Click "Add Modifier"** → **Generate** → **Bevel**.
4. **Drag the Width slider** until the bevel size looks right. The default is `0.1` (in Offset width type), which is too small for most cube-sized objects.
5. **Bump Segments to 3 or 4** if you want a rounded bevel instead of a single flat chamfer. `Segments` controls how many edge loops are added across the bevel face.

That's it. You now have a non-destructive bevel.

## Every Bevel modifier parameter, explained

The Bevel modifier panel has a lot of fields. Here's what each one actually does, in the order they appear.

### Top section

- **Affect** — `Vertices` or `Edges`. Edges is what most tutorials assume; Vertices rounds off corners only without affecting connecting edges (useful for low-poly stylized work).

- **Width Type** — defines how the **Width** value is interpreted:
  - **Offset** — distance from the new edge to the original (default).
  - **Width** — distance between the two new edges formed by the bevel.
  - **Depth** — perpendicular distance from the bevel face to the original edge.
  - **Percent** — percentage of adjacent edge length. Best for consistent visual size across mixed-scale meshes.
  - **Absolute** — exact distance along the adjacent edges. Useful when adjacent edges meet at non-90° angles.

- **Width** — the bevel size itself, interpreted by Width Type.

- **Segments** — number of edge loops across the bevel face. `1` = single chamfer. `3-4` = visible curve. `8+` = diminishing returns.

- **Limit Method** — controls *which* edges get beveled:
  - **None** — every edge.
  - **Angle** — only edges where the adjacent face normal angle exceeds your threshold (default 30°). Best for hard-surface — sharp corners get beveled, flat areas don't.
  - **Weight** — uses Mean Bevel Weight values you assign per-edge in Edit Mode (`N`-panel → Item → Mean Bevel Weight).
  - **Vertex Group** — uses a named vertex group's weight values.

### Profile section

- **Profile** — `Superellipse` (default, single Shape slider from concave to convex) or `Custom Profile` (a widget where you draw your own bevel cross-section). Custom Profile is overkill for first-time bevels — leave it on Superellipse.
- **Shape** — 0.5 is a perfect circle. Below 0.5 = concave inward dish. Above 0.5 = convex outward bulge.

### Geometry section

- **Miter Outer / Miter Inner** — what happens where two beveled edges meet at a corner. `Sharp` (default), `Patch`, or `Arc`. Sharp is fine for most objects; Arc gives a softer corner.
- **Clamp Overlap** — limits each beveled edge so it can't self-intersect with neighbors. **Turn this on** if your bevel looks broken on tight corners.
- **Loop Slide** — when on, the bevel slides along unbeveled edges into the corner. Off can give more uniform widths but weirder corners.

### Shading section

- **Harden Normals** — adjusts vertex normals so the bevel face shades smoothly into flat surrounding faces. Required for clean baking on hard-surface models.
- **Mark Seam** / **Mark Sharp** — propagates seam/sharp edges across the new bevel geometry.
- **Material Index** — slot index for assigning a different material to the bevel face. Set to `-1` (default) to inherit from the nearest face.
- **Face Strength** — used together with the Weighted Normals modifier for advanced shading control. Skip unless you're chasing pixel-perfect renders.

## The 3 mistakes everyone makes their first time

**1. Width is way too big and the bevel chews the whole face.** Turn on `Clamp Overlap` in the Geometry section, or just dial Width down. If you're in Offset mode and Width is `0.5` on a `1m` cube, you're trying to fit a half-meter bevel onto a one-meter face — there isn't enough room.

**2. Segments is left at 1, so the "round" bevel is actually a single flat chamfer.** Raise Segments to 3-4. Don't go past 8 unless you're rendering close-up.

**3. The bevel applies to every edge, including the ones you wanted left flat.** Set Limit Method to `Angle` (default 30° works for most hard-surface) so only the actual corners get beveled, not the seams running across faces.

## When to apply the modifier vs leave it as a modifier

If your model is going through more iterations — texture painting, rigging, animation — leave the modifier live. You can always tweak it.

If you're exporting to a game engine, baking, or sharing the .blend with someone who'll never touch the modifier stack, click the modifier dropdown → **Apply** to bake it in. After applying, it becomes regular geometry and you lose the ability to change Width or Segments.

## Tired of looking up parameters every time?

That's basically what built Skilly: getting tired of Googling "how do I [X] in [Blender / Figma / Xcode]" fifty times a week. Skilly watches your Blender window, hears your question out loud, and points at exactly the slider or button you need — with the answer streaming as text right next to the cursor. **15 minutes free to try.** No credit card.
