---
title: "Figma Auto Layout tutorial — the 2026 guide"
description: "Master Figma Auto Layout in 10 minutes. The Shift+A shortcut, hug vs fill vs fixed, gap and padding, and the new Grid flow that replaced manually nested layouts."
pubDate: 2026-04-27
updatedDate: 2026-04-27
author: "Mohamed Saleh Zaied"
category: tutorial
tags:
  - figma
  - design
  - auto-layout
  - tutorial
canonicalKeyword: "figma auto layout tutorial"
howTo:
  totalTime: "PT8M"
  tools:
    - "Figma Design (any plan)"
  steps:
    - name: "Select layers and press Shift+A"
      text: "Select one or more layers on the canvas. Press Shift+A. Figma wraps them in an auto layout frame and tries to detect whether you want vertical, horizontal, or grid flow."
    - name: "Pick the flow"
      text: "In the right sidebar's Auto layout panel, choose Vertical (stack), Horizontal (row), or Grid (open beta). You can switch any time without losing the layout."
    - name: "Set padding"
      text: "Padding is the space between the frame edge and its content. Set uniform, or independent values per side. Pro shortcut: hold Option and click a padding area to enter a value for opposite sides; Option+Shift+Click for all four sides."
    - name: "Set gap"
      text: "Gap is the space between items. Type a number, or set Auto for max distribution (justify-between in CSS terms)."
    - name: "Configure resize behavior on each layer"
      text: "Click a child layer. In the resize controls, set width and height each to Hug (shrinks to content), Fill (expands to parent), or Fixed (stays at typed value). Double-click an edge to toggle Hug; Option+double-click to toggle Fill."
faq:
  - question: "What's the difference between Hug, Fill, and Fixed?"
    answer: "Hug = shrink the layer to wrap its contents tightly (think CSS 'fit-content'). Fill = grow the layer to fill all available space in the parent (think CSS 'flex: 1' or 'width: 100%'). Fixed = lock the layer at a specific pixel value, ignoring contents and parent. You set width and height independently — a notification banner might be Fixed width with Hug height so messages of different lengths look consistent. The most common combo for content cards: Fill width, Hug height."
  - question: "What's the keyboard shortcut to add Auto Layout?"
    answer: "Shift+A on Mac and Windows. Select one or more layers first, then Shift+A. Figma auto-detects whether to use vertical, horizontal, or grid flow based on how the layers are positioned. You can change the flow afterward in the Auto layout panel — switching between vertical and horizontal is non-destructive."
  - question: "How do I exclude one layer from Auto Layout (like CSS absolute position)?"
    answer: "Select the child layer and click 'Ignore auto layout' in the right sidebar. The object stays inside the auto layout frame but doesn't participate in the flow — siblings ignore it. This was previously called 'Absolute position' (still works the same, just renamed). Use it for badges, overlays, drag handles, or any element that needs to sit on top of the layout rather than within it."
  - question: "When should I use the new Grid flow vs nested vertical/horizontal frames?"
    answer: "Grid (in open beta as of 2026-04-27) is for true 2D layouts — dashboards, photo galleries, bento boxes — where rows AND columns matter and items might span multiple cells. Use nested vertical+horizontal when you have a clear hierarchy (a row of cards, each containing a stacked title+description+button). Grid replaces the messy pattern of nesting horizontal frames inside a vertical frame to fake a grid. It's faster to build and easier to maintain."
  - question: "Why is my Auto Layout frame growing weirdly when I add content?"
    answer: "Three usual suspects. (1) The frame is set to Hug, so it expands with content — switch to Fixed if you want a constant size. (2) A min/max constraint isn't set — open the frame's resize options and set a max width to cap growth. (3) A child is set to Fill on both axes, fighting the parent's Hug. Pick a direction and let only one axis fill. The shortcut is to enable Min/Max width or height on the parent — Min prevents shrinking below a value, Max prevents growth past it, regardless of Hug/Fill/Fixed."
  - question: "What does Wrap do, and when should I enable it?"
    answer: "Wrap is only available on horizontal auto layout. It pushes overflowing children onto a new line, similar to CSS flex-wrap. Use it for tag clouds, chip groups, image galleries with variable item counts, and any horizontal list where you don't know in advance how many items will fit. Without wrap, horizontal auto layout overflows to the right; with wrap, it cleanly breaks into rows."
relatedArticles: []
---

If you're new to Figma in 2026 and you've heard "just use auto layout for everything" without anyone explaining what that means — this is the guide. Auto Layout is Figma's responsive layout primitive. It's CSS Flexbox with a UI, plus a few Figma-specific features.

> All shortcuts and properties verified 2026-04-27 against Figma's [Guide to auto layout](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout). Auto Layout is available on every Figma plan including the free tier; works in Figma Design, Figma Sites, Figma Slides, and Figma Buzz.

## What auto layout actually is

A regular Figma frame holds children at fixed positions — drop a button at (100, 200) and it stays at (100, 200) forever. Add a longer text label and the button overflows.

An auto layout frame holds children in a **flow** (vertical, horizontal, or grid) and arranges them by **rules** (padding, gap, alignment, resize behavior). Change the text label, the button shrinks or grows. Add a new menu item, the menu expands. Resize the parent, the children adapt.

Use it for:
- Buttons that resize with their text label
- Lists where adding/removing items shouldn't break the spacing
- Cards in a dashboard that should fill available space
- Anything that should look right at multiple sizes

## The fastest way in: Shift+A

1. Select one or more layers on the canvas
2. Press **Shift+A**
3. Figma wraps them in an auto layout frame and picks a sensible flow

That's the entire onboarding. Everything else is refinement.

## The three flows

| Flow | What it is | When to use |
|---|---|---|
| **Vertical** | Stacks children top-to-bottom | Lists, feeds, settings panels, anything stacked |
| **Horizontal** | Lines children left-to-right | Button rows, navigation bars, breadcrumbs, tag chips |
| **Grid** *(open beta)* | 2D layout with rows AND columns | Dashboards, bento boxes, gallery layouts |

Switch flows anytime in the right sidebar's Auto layout panel — Figma preserves child positions and just changes the arrangement rules.

Horizontal flow has one extra option: **Wrap**. When enabled, overflowing children push to a new line (CSS `flex-wrap`). Critical for tag clouds and any row that might wrap.

## The three resize behaviors per layer

Each child of an auto layout frame has independent **width** and **height** behavior:

| Setting | What it does | CSS analog |
|---|---|---|
| **Hug** | Shrink to wrap contents tightly | `width: fit-content` |
| **Fill** | Grow to fill available parent space | `flex: 1` |
| **Fixed** | Lock at the typed pixel value | `width: 240px` |

Combine across the two axes:

- **Card layout**: width = Fill, height = Hug → grows to fill column, height adapts to content
- **Notification banner**: width = Fixed, height = Hug → consistent width, message length determines height
- **Avatar circle**: width = Fixed, height = Fixed → always the same size
- **Sidebar**: width = Fixed, height = Fill → fixed-width nav, full-height column
- **Button**: width = Hug, height = Hug → snug fit around the label

### Shortcuts that save real time

| Action | Shortcut |
|---|---|
| Toggle Hug on an axis | Double-click vertical or horizontal edge |
| Toggle Fill on an axis | Option+Double-click edge |
| Set padding on opposite sides | Option+Click padding area |
| Set padding on all four sides | Option+Shift+Click padding area |
| Big nudge for padding/spacing | Hold Shift while dragging |

Practice these for ~30 minutes once. They cut Auto Layout time in half.

## Padding, gap, and alignment

Three core spacing properties:

- **Padding** — empty space inside the frame, between its edge and its children. Set uniform, vertical+horizontal, or per-side.
- **Gap** — space between sibling items. Type a number, or set **Auto** for justify-between behavior (max distribution).
- **Alignment** — where children sit within the frame's cross-axis. The 9-dot picker in the right sidebar maps to top-left through bottom-right.

For horizontal flow, alignment along the main axis is set via gap (Auto = justify-between). For vertical flow, the same.

## Min and max constraints

Set min width / max width / min height / max height on a frame to bound its size — even if the frame is Hugging or Filling.

- **Min width = 200**: the frame can't shrink below 200px even with Hug content
- **Max width = 600**: the frame can't grow past 600px even with Fill or large content
- **Min and max can be combined**: a flexible card that's never less than 280 or more than 480 wide

This is how you build truly responsive designs without micromanaging every breakpoint.

## "Ignore auto layout" — the absolute-position escape hatch

Sometimes you want a child to live inside an auto layout frame but NOT participate in the flow. A close button in the corner of a modal. A badge on a card. A drag handle on a list item.

Select the child → toggle **Ignore auto layout** in the right sidebar. The object stays in the frame but is excluded from arrangement rules. Siblings flow around it like it's not there.

This was previously called "Absolute position" — Figma renamed it in 2024 but the behavior is identical. Drag-into-frame shortcut: hold **Control (Mac)** or **Shift (Windows)** while dragging an object into an auto layout frame to drop it as ignored.

## Common mistakes

**1. Trying to make every nested frame an auto layout.** Three levels of nested auto layouts is usually fine. Five+ becomes a maintenance nightmare. If you find yourself nesting deeper, consider whether Grid flow handles your use case.

**2. Setting both axes to Fill on a child whose parent is Hug.** They fight — parent says "I'm sized by my child", child says "I fill my parent". Result: usually a 0×0 layer. Pick one direction.

**3. Forgetting Wrap exists for horizontal flows.** Tag clouds and chip groups break without it.

**4. Using nested horizontal+vertical frames to fake a grid.** Use the actual Grid flow (open beta as of 2026-04-27). It's purpose-built for 2D layouts and saves multiple levels of nesting.

**5. Setting padding via the canvas drag handle on the wrong side.** Hold Option while dragging to mirror the change to the opposite side. Hold Option+Shift to apply to all four sides.

## Tired of looking up Figma shortcuts every five minutes?

Skilly is a voice-first AI tutor for Mac that watches your Figma window, hears your question, and points at exactly the panel or button you need — answer streaming as text right beside the cursor. Same flow for Blender, Xcode, After Effects, anything on Mac. **15 minutes free, no card.**
