---
title: "Blender Bevel Modifier: How to Add It (4.x and 5.x)"
description: "Add the Bevel modifier in Blender 4.x and 5.x: Width, Segments, Limit Method, and what to fix when the bevel does not show or shades oddly."
pubDate: 2026-04-27
updatedDate: 2026-11-23
author: "Mohamed Saleh Zaied"
category: how-to
tags:
  - blender
  - modeling
  - 3d
  - tutorial
canonicalKeyword: "blender bevel modifier"
howTo:
  totalTime: "PT4M"
  tools:
    - "Blender 4.x or 5.x"
  steps:
    - name: "Select your object in Object Mode"
      text: "Click the mesh you want to bevel. Stay in Object Mode. Tab toggles modes, and modifiers are added on the object."
    - name: "Open the Modifier Properties panel"
      text: "In the Properties editor, click the wrench icon. Drag the editor wider if the wrench is clipped."
    - name: "Add the Bevel modifier"
      text: "Click Add Modifier, then Generate, then Bevel. Shift+A in that tab does the same thing."
    - name: "Set Width and Segments"
      text: "Width is the size field. Older tutorials call it Amount. The default is 0.1 in Offset. Raise Segments from 1 to 3 or 4 for a round bevel instead of a flat chamfer."
    - name: "Check Limit Method before you hunt for a bug"
      text: "Angle is the default, at 30 degrees. Edges sharper than that bevel. Weight bevels nothing until an edge's bevel weight is above 0."
faq:
  - question: "What's the difference between the Bevel modifier and Ctrl+B?"
    answer: "Ctrl+B (Edge, then Bevel Edges) cuts the bevel into the mesh immediately. Move the mouse for Width, scroll the wheel for Segments, left-click to confirm, right-click or Esc to cancel. Vertices use Shift+Ctrl+B. The Bevel modifier is the non-destructive version of that same operation: Width, Segments, and Limit Method stay editable, and the original mesh is unchanged until you Apply the modifier."
  - question: "Why is my Bevel modifier not showing?"
    answer: "Check Limit Method first. Weight with every bevel weight at 0.0 draws nothing. Angle above the edges you care about does the same: a cube's edges are 90 degrees, so an Angle over 90 degrees removes the bevel. Then check the modifier header: the screen icon is Show in Viewport, and the vertices-square icon is Show in Edit Mode. If the bevel is tiny instead of missing, Clamp Overlap may be capping it, or the object scale is unapplied."
  - question: "Tutorials say Amount. Where is that slider?"
    answer: "In Blender 4.x and 5.x the size field is labeled Width. The Python API still describes that property as the bevel amount, which is why older guides say Amount. Width Type decides what the number means. Offset, the default, is the distance from the new edge back to the original edge."
  - question: "How do I bevel only certain edges?"
    answer: "Set Limit Method to Weight. In Edit Mode, select the edges and use Edge, then Edge Bevel Weight, which writes bevel_weight_edge from 0.0 to 1.0. The Sidebar (N), Item tab, shows the same value as Mean Bevel Weight. A weight of 0.0 does not bevel. Vertex Group is the other limiter: an edge bevels only when both vertices are in the group."
  - question: "Why is the bevel uneven after I scaled the object?"
    answer: "Object scale is still on the object, and modifiers use that transform. In Object Mode use Object, then Apply, then Scale (Ctrl+A, then Scale). That sets scale to 1 and keeps the shape you see. Then set Width again."
  - question: "What should Segments be?"
    answer: "1 is a flat chamfer. 3 or 4 reads as a round edge on a hard-surface prop. Shape has no effect while Segments is under 2. Past about 8 segments, a Subdivision Surface modifier after the Bevel is usually a better way to smooth the profile."
relatedArticles:
  - how-to-add-subdivision-surface-modifier-blender
  - blender-modifiers
midCta:
  moment: "Ask \"where's the bevel modifier?\" and Skilly points at Add Modifier > Generate > Bevel."
  landerHref: "/blender/"
  landerLabel: "Blender AI assistant"
stuckCta:
  moment: "Stuck finding the Limit Method dropdown? Ask Skilly out loud and it points at it."
  landerHref: "/blender/"
  landerLabel: "an AI assistant for Blender"
---

A cube with perfect 90° corners looks like a drawing of an object, not the object. The Bevel modifier is how you chamfer or round those edges without baking the cut into the mesh.

The steps below are the same in Blender 4.x and 5.x. Labels were checked against the [Blender 4.2 LTS Bevel modifier manual](https://docs.blender.org/manual/en/4.2/modeling/modifiers/generate/bevel.html) and the [current 5.3 manual](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/bevel.html). The panel names match. What changes is a default, not the control: **Clamp Overlap starts off in 4.2 and on in 4.5 and 5.x** (the current API default is on). In 5.x, Weight's attribute names default to `bevel_weight_edge` and `bevel_weight_vert`. Confirm the version under **Help → About Blender** if a checkbox is not where a video left it.

<!-- skilly-top-cta -->

## Ctrl+B or the Bevel modifier

Blender has the Edit Mode tool and the modifier. They cut the same profile. They do not commit the same way.

| | Bevel tool | Bevel modifier |
|---|---|---|
| **How to start** | Edit Mode, **Edge → Bevel Edges**, or `Ctrl+B`. Vertices: `Shift+Ctrl+B` | Modifier Properties → **Add Modifier → Generate → Bevel** |
| **What you get** | New faces replace the edge immediately | A stack entry. The original mesh stays until you Apply |
| **While you adjust** | Move the mouse for Width. Scroll the wheel for Segments. Left-click confirms. Right-click or `Esc` cancels | Width and Segments in the panel |
| **Best for** | A bevel you are done deciding | Anything you might still change |

The tool only bevels an edge that has exactly two adjacent faces. The modifier is the manual's non-destructive alternative to that operation.

One naming trap: older tutorials say **Amount**. In Blender 4.x and 5.x the field is **Width**. The API still describes `width` as the bevel amount, so both words are in circulation. They are the same slider.

## Add the Bevel modifier

1. **Select the object in Object Mode.** `Tab` switches modes. Modifiers belong to the object, not to an Edit Mode selection.
2. **Open Modifier Properties.** Wrench icon, Properties editor. If you cannot see the wrench, the tab row is clipped. Drag the editor wider.
3. **Add Modifier → Generate → Bevel.** `Shift+A` in that same tab opens the menu too. A new modifier is added at the bottom of the stack.

<!-- skilly-mid-cta -->

4. **Set Width.** Default is `0.1`, and the default Width Type is Offset: distance from each new edge back to the original edge. On the default 2 m cube that is a small chamfer. Drag until the edge reads at the size you want.
5. **Raise Segments** from `1` to `3` or `4` when you want a round edge instead of one flat cut. Segments is the number of edge loops across the new face. Shape does nothing while Segments is `1`.

Limit Method starts on **Angle**, so you already have a bevel on edges sharper than 30°. If the mesh looks unchanged, skip ahead to [Bevel not working?](#bevel-not-working). Do not add a second modifier yet.

## Bevel only some edges

**Angle** is the default in 4.x and 5.x. The 4.2 API and the current 5.x API both call the number "Angle above which to bevel edges," and the default is 30° (`0.523599` radians). A default cube's edges are 90°, so they bevel. Raise Angle past 90° and they stop, which looks exactly like a modifier that failed to add. The manual states the same control as: an edge bevels only when the angle between the adjacent face normals, plus your Angle, is less than 180°. Smooth surfaces stay put. Sharp corners do not.

**Weight** is the one you want when the choice is "these edges, not those."

1. `Tab` into Edit Mode and select the edges.
2. **Edge → Edge Bevel Weight.** That operator writes `bevel_weight_edge`, from `0.0` to `1.0`. With several edges selected it changes their average. The Sidebar (`N`) → **Item** shows that average as **Mean Bevel Weight**.
3. Back in Object Mode, set **Limit Method → Weight**.

A weight of `0.0` applies no bevel. Switching to Weight before you set one is the most common way to make a working bevel vanish.

Blender 4.2 has no attribute picker. Weight uses each edge's bevel weight directly. From 4.5, Weight can name an attribute. In 5.x those names default to `bevel_weight_edge` and `bevel_weight_vert` (the current API's defaults; the [5.3 manual](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/bevel.html) says any mesh attribute can be chosen, and those two are the ones Edit Mode already edits). If every value on the chosen attribute is `0`, nothing bevels.

**Vertex Group** uses vertex weights. An edge bevels only when both of its vertices are in the group, and a weight of `0.0` skips that vertex.

## Bevel not working?

Go in this order. The modifier is usually doing what Limit Method asked.

### Limit Method is filtering every edge

**Limit Method** is on the Bevel modifier itself, in the same block as Width and Segments. It is not under a different tab.

- **Weight**, and you never set a bevel weight: every edge is `0.0`, so the result is empty on purpose. Switch back to Angle to prove the modifier is alive, or set Edge Bevel Weight above `0` on the edges you want.
- **Angle** higher than the edges you care about: on a cube, over 90° removes the bevel. Put it back to 30°.
- **None** bevels every edge. Use it once when you want to see the modifier work, then switch back to Angle or Weight.

<!-- skilly-stuck-cta -->

### The bevel is tiny, uneven, or overlapping

**Apply scale** when matching edges get different widths. Object Mode, **Object → Apply → Scale**, or `Ctrl+A` then Scale. That sets scale to 1 and keeps the shape on screen. The Apply manual notes that modifiers depend on the object's transform. A non-uniform scale is the usual reason one axis looks fat and the other looks shaved.

**Clamp Overlap** stops a beveled edge from running through neighboring geometry. In Blender 4.2 the checkbox starts **off**. In Blender 4.5 and in 5.x it starts **on** (current API default: on). Turn it on when corners intersect and the mesh tangles. If it is already on and Width refuses to grow, the cap is the feature: a nearby edge, or two vertices in the same place, leaves no room. In Edit Mode, select the mesh and use **Mesh → Merge** (`M`) → **By Distance** to weld stacked vertices. The 4.2 manual lists By Distance and leaves the operator notes unfinished, so keep the distance at its default unless you know the doubles are slightly apart.

More **Segments** only add loops across the bevel face. They do not fix overlap, a Width that is too large, or scale you have not applied.

### Shading looks bent, or the new faces look faceted

Turn on **Harden Normals**. It matches the bevel faces to the surrounding faces and leaves those surrounding faces flat, which is what you want when a bevel shades as a dark band or a flat side suddenly looks curved. It starts off in 4.x and 5.x. In 4.2, enabling it also turns on custom split normals if they were off. In 5.x the [5.3 manual](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/bevel.html) says it creates a `custom_normal` attribute when one is missing.

**Mark Sharp** flags edges for shading. It does not round the profile. Use Harden Normals for the shading, Segments for the roundness.

### You are in the wrong mode, or the modifier is hidden

Every modifier header has the same icons, documented on the [modifier introduction](https://docs.blender.org/manual/en/4.2/modeling/modifiers/introduction.html). The screen icon is **Show in Viewport**. Off, and the bevel is hidden in the 3D Viewport even though Render still sees it. The vertices-square icon is **Show in Edit Mode**. Off, and you only see the bevel after you `Tab` back to Object Mode.

## Width, Segments, and the rest of the panel

### Width

**Width Type** decides what the number measures:

- **Offset** (default): distance from the new edge to the original edge.
- **Width**: distance between the two new edges. With more than one segment, that is the distance between the edges on either side of the bevel.
- **Depth**: perpendicular distance from the new bevel face to the original edge.
- **Percent**: a percentage of the adjacent edge's length. The same percent is a different size on a short edge and a long one.
- **Absolute**: an exact distance along the adjacent edges. It parts ways with Offset when those edges do not meet at 90°.

### Segments and Shape

`1` segment is a chamfer. `3` or `4` is a visible roundover on a hard-surface prop. Past about 8, put a Subdivision Surface modifier after the Bevel instead of spending more loops here.

**Shape** (Profile → Superellipse) has no effect when Segments is under 2. The API calls `0.5` round. The [Bevel tool manual](https://docs.blender.org/manual/en/4.2/modeling/meshes/editing/edge/bevel.html) is specific, and the modifier uses that same profile: `0.5` is a circular arc when the faces meet at a right angle, lower than `0.5` is flatter, `0.25` is flat, below `0.25` is concave, and above `0.5` is more convex. Custom Profile is a curve widget. Leave it until a single Shape value is not enough.

### Where two bevels meet

**Miter Outer** and **Miter Inner** are Sharp, Patch, or Arc. Sharp is the default: edges meet at a point. Arc puts a curved join at the corner. Patch is an outer option; on an inner miter it behaves like Arc.

**Loop Slide**, when on, prefers to slide along unbeveled edges into the corner. Off can keep the widths more even and the corners odder. It starts off in 4.2 and on in 4.5 and 5.x. Toggle it only when a corner looks pinched.

### Shading extras

Harden Normals is the one that fixes weird shading, above. **Mark Seam** and **Mark Sharp** carry those edge marks onto the new bevel edges. **Material Index** `-1` keeps the material of the nearest original face. **Face Strength** feeds a later Weighted Normals modifier. Leave it on None unless you are setting that up.

## Chamfer is a bevel with one segment

In hard-surface talk, a chamfer is one flat cut across an edge. Blender does not have a Chamfer modifier. Segments `1` is that cut. Raise Segments when you want the edge to roll instead of slice.

## Apply it, or leave it on the stack

Leave the modifier while the model is still changing. Width and Segments stay editable, which is the point.

When you export, bake, or hand the file to someone who will not open the stack, use the modifier dropdown → **Apply**. The manual lists that as Apply, shortcut `Ctrl+A`, on the modifier header. In the viewport, `Ctrl+A` is Object → Apply instead, so use the dropdown if you are not sure which one has focus. Applying a modifier that is not first in the stack ignores the modifiers above it and runs as if it were first. Apply from the top, or the result will not match what you saw.

## Keep going

The usual next modifier is the [Subdivision Surface guide](/learn/how-to-add-subdivision-surface-modifier-blender/). The wider tour is the [Blender modifiers lesson](/learn/blender-modifiers/), and the practice order around it is the [project-first Blender learning roadmap](/learn/best-way-to-learn-blender/).

If Limit Method is the control you keep losing, [an AI assistant for Blender](/blender/) points at it while the panel is open. It never clicks, and it never moves your cursor.
