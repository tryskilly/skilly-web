---
title: "Figma Auto Layout tutorial — the 2026 guide"
description: "Master Figma Auto Layout: Shift+A, hug vs fill vs fixed, gap, padding, and Grid flow in this practical 2026 guide."
pubDate: 2026-04-27
updatedDate: 2026-08-04
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
    answer: "Grid (still in open beta when checked 2026-08-04) is for true 2D layouts — dashboards, photo galleries, and bento boxes — where rows and columns matter and items may span cells. Use nested vertical and horizontal frames when the content has a clear one-dimensional hierarchy, such as a row of cards that each contain a vertical stack."
  - question: "Why is my Auto Layout frame growing weirdly when I add content?"
    answer: "Three usual suspects. (1) The frame is set to Hug, so it expands with content — switch to Fixed if you want a constant size. (2) A min/max constraint isn't set — open the frame's resize options and set a max width to cap growth. (3) A child is set to Fill on both axes, fighting the parent's Hug. Pick a direction and let only one axis fill. The shortcut is to enable Min/Max width or height on the parent — Min prevents shrinking below a value, Max prevents growth past it, regardless of Hug/Fill/Fixed."
  - question: "What does Wrap do, and when should I enable it?"
    answer: "Wrap is only available on horizontal auto layout. It pushes overflowing children onto a new line, similar to CSS flex-wrap. Use it for tag clouds, chip groups, image galleries with variable item counts, and any horizontal list where you don't know in advance how many items will fit. Without wrap, horizontal auto layout overflows to the right; with wrap, it cleanly breaks into rows."
relatedArticles: []
---

If you're new to Figma in 2026 and you've heard "just use auto layout for everything" without anyone explaining what that means — this is the guide. Auto Layout is Figma's responsive layout primitive. It's CSS Flexbox with a UI, plus a few Figma-specific features.

> Properties and UI labels verified August 4, 2026 against Figma's [Guide to Auto Layout](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties). Grid was still labeled open beta on that date.

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

## Wrap vs Grid: they solve different problems

Both can produce multiple rows, but they do not use the same layout model.

### Use Wrap for a flowing list

Enable **Wrap** on a horizontal Auto Layout frame when items should keep their own width and move onto the next line as space runs out. Good examples include:

- Tags and filter chips
- Variable-length button groups
- Avatar lists
- A gallery where every card follows the same simple flow

The container decides where each new line begins. You do not define explicit tracks or make one item span several columns.

### Use Grid for rows and columns

Use **Grid** when the relationship between rows and columns matters. Figma's current Grid flow supports track sizing, row and column spans, and alignment within cells. That makes it a better fit for dashboards, galleries with featured items, and bento layouts.

Grid items do not use Wrap's overflow behavior. They occupy grid cells. Figma's official documentation still described Grid as open beta when this article was updated, so verify critical production workflows before rebuilding a large design system around it.

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

This was previously called **Absolute position**. The name changed; the layout behavior remains the same.

An ignored object can use constraints relative to its parent, but it no longer gets Auto Layout resizing and spacing rules. Use it intentionally for overlays, badges, floating controls, and other elements that genuinely sit outside the content flow. Do not use it merely to force a broken layout into place.

## Common mistakes

**1. Trying to make every nested frame an auto layout.** Three levels of nested auto layouts is usually fine. Five+ becomes a maintenance nightmare. If you find yourself nesting deeper, consider whether Grid flow handles your use case.

**2. Setting both axes to Fill on a child whose parent is Hug.** They fight — parent says "I'm sized by my child", child says "I fill my parent". Result: usually a 0×0 layer. Pick one direction.

**3. Forgetting Wrap exists for horizontal flows.** Tag clouds and chip groups break without it.

**4. Using nested horizontal+vertical frames to fake a grid.** Use the actual Grid flow (open beta as of 2026-04-27). It's purpose-built for 2D layouts and saves multiple levels of nesting.

**5. Setting padding via the canvas drag handle on the wrong side.** Hold Option while dragging to mirror the change to the opposite side. Hold Option+Shift to apply to all four sides.

## Continue learning

If the rules make sense but applying them still feels slow, use the [project-first Figma learning roadmap](/learn/how-to-learn-figma-faster/) and rebuild one real interface with Auto Layout. The focused [components and instances lesson](/learn/figma-components-and-instances/) is the most useful next step once the spacing system works.
