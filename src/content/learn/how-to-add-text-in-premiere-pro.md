---
title: "How to Add Text in Premiere Pro (Step by Step)"
description: "Add text in Premiere Pro with the Type tool, style it in the Properties panel, set its timing, use title templates and lower thirds, and animate it."
pubDate: 2026-10-28
updatedDate: 2026-10-28
author: "Mohamed Saleh Zaied"
category: how-to
tags:
  - video-editing
  - premiere-pro
  - beginner
  - creative
howTo:
  totalTime: PT5M
  tools:
    - "Adobe Premiere Pro"
  steps:
    - name: "Move the playhead to where the text should start"
      text: "In the Timeline, move the playhead to the moment you want the text to appear."
    - name: "Select the Type tool"
      text: "Pick the Type tool (the T icon) in the toolbar, or press T."
    - name: "Click in the Program Monitor and type"
      text: "Click in the Program Monitor and type. A text clip appears on a video track above your footage in the Timeline."
    - name: "Style the text in the Properties panel"
      text: "With the text clip selected, open Window > Properties and change the font, style, size, alignment, fill, stroke and shadow. In versions before Premiere Pro 25.0, use the Edit tab of the Essential Graphics panel."
    - name: "Set how long the text stays on screen"
      text: "Drag the left or right edge of the text clip in the Timeline to change when it starts and ends."
    - name: "Animate it with keyframes (optional)"
      text: "In Effect Controls, turn on the stopwatch for Opacity or Position, then change the value at two points in time to fade or slide the text."
faq:
  - question: "Where did the Essential Graphics panel go in Premiere Pro?"
    answer: "Starting with Premiere Pro 25.0, Adobe split it in two. Text styling moved to the Properties panel (Window > Properties), and template browsing moved to the Graphics Templates panel. If you are on an older version, the Essential Graphics panel's Edit tab still holds the same text controls."
  - question: "What is the keyboard shortcut to add text in Premiere Pro?"
    answer: "Press T for the Type tool, then click in the Program Monitor. On a Mac, Cmd+T (Graphics and Titles > New Layer > Text) adds a new text layer directly."
  - question: "How do I change how long text stays on screen?"
    answer: "Select the text clip in the Timeline and drag its left or right edge. Dragging the end later keeps the text up longer; dragging it earlier shortens it."
  - question: "Are captions the same as text in Premiere Pro?"
    answer: "No. Captions live on their own caption track, are usually made from a transcript, and share one style per track. Regular text is a graphic on a video track that you can place anywhere, style per clip and animate. Use captions for dialogue and text graphics for titles, labels and lower thirds."
  - question: "How do I fade text in and out?"
    answer: "Select the text clip, open Effect Controls, move the playhead to the start of the clip and turn on the Opacity stopwatch at 0%. Move a few frames later and set it to 100%. Repeat in reverse at the end to fade out."
  - question: "Can Skilly add the text for me?"
    answer: "Skilly guides you rather than editing for you. You hold Control+Option, ask out loud, and Skilly answers in voice while pointing at the exact tool or panel on your Premiere Pro screen, so you learn where everything is as you go."
canonicalKeyword: "how to add text in premiere pro"
relatedArticles:
  - premiere-pro-audio-and-titles
  - premiere-pro-timeline-editing
  - premiere-pro-effects-and-color-grading
  - premiere-pro-tutorial-for-beginners
  - how-to-add-text-in-davinci-resolve
---

To add text in Premiere Pro, pick the **Type tool** (press **T**), click in the **Program Monitor**, and type. Premiere drops a text clip on a video track above your footage, and you style it in the **Properties panel** (Window > Properties). Drag the clip's edges in the Timeline to set how long it stays on screen.

That covers most people. The rest of this guide goes through styling, timing, title templates, lower thirds and simple animation, plus how text differs from captions.

> **Using an older version?** Starting with Premiere Pro 25.0, Adobe replaced the Essential Graphics panel with the **Properties** panel (for styling) and the **Graphics Templates** panel (for templates). If your menus still show Essential Graphics, the same controls live in its **Edit** tab.

## How to add text in Premiere Pro, step by step

1. **Put the playhead where the text should start.** Open your sequence and move the playhead in the Timeline to the moment you want the text to appear.
2. **Select the Type tool.** It's the **T** icon in the toolbar. You can also press **T**.
3. **Click in the Program Monitor and type.** Click once for a single line, or click and drag to draw a text box that wraps. A text clip appears on a video track above your footage in the Timeline.
4. **Switch back to the Selection tool** when you're done typing, so your next click doesn't start a new text layer.
5. **Open the Properties panel** (Window > Properties) with the text clip selected. You can also right-click the text in the Program Monitor and choose **Edit Properties**.

Prefer the keyboard? On a Mac, **Cmd+T** (Graphics and Titles > New Layer > Text) adds a new text layer in one go.

## Style your text in the Properties panel

With the text clip selected, the Properties panel shows the controls for that text. The ones you'll reach for first:

- **Font, font style and size.** Pick a typeface, set weight (Regular, Bold and so on) and drag the size up until it reads well on a phone screen.
- **Alignment.** Left, center or right align the paragraph. Centered works for most titles; left-aligned suits lower thirds.
- **Fill.** The main text color.
- **Stroke.** An outline around the letters. You can add an outer, inner or center stroke, or several at once. A thin dark stroke helps white text stay readable over busy footage.
- **Shadow.** A drop shadow behind the text, another easy readability win.
- **Mask with Text.** Turns the text into a window that shows the video underneath only inside the letter shapes.

To move the text, drag it in the Program Monitor with the Selection tool, or adjust **Position** in the Properties panel.

**Styling several text clips?** Save the look as a **text style**: click the plus icon next to the style menu in the Properties panel and choose **Create style**. Apply it to other text layers from the same menu, and use **Redefine Style** later to update every linked clip at once.

## Set when text appears and disappears

Text is just another clip on the Timeline, so timing works the way it does for video:

- **Move it:** drag the whole text clip left or right.
- **Change its duration:** drag the left or right edge of the clip.
- **Keep it above your footage:** text on a higher video track (V2, V3) shows on top of the clip below it.

If you're new to moving and trimming clips, the [timeline editing lesson](/learn/premiere-pro-timeline-editing/) covers the basics.

## Use title templates and lower thirds

Don't want to design from scratch? Premiere ships with Motion Graphics templates (.mogrt files), including titles and lower thirds.

1. Open the **Graphics Templates** panel (Window > Graphics Templates). In older versions, this is the **Browse** tab of Essential Graphics.
2. Find a template under **My Templates**, or search Adobe Stock in the same panel (there's a filter for free templates).
3. **Drag the template onto a video track** in your sequence.
4. Select it in the Timeline and edit its text, colors and other options in the **Properties** panel. What you can change depends on the template's author.
5. Drag the clip's edges to set how long it plays.

A **lower third** is the name-and-title bar you see at the bottom of interview shots. Use a template, or make your own: type two lines of text, left-align them, add a shape behind them, and park the clip at the start of the speaker's shot.

## Animate text with keyframes

A simple fade or slide makes text feel finished. Here's a fade-in:

1. Select the text clip in the Timeline and open **Effect Controls** (Window > Effect Controls).
2. Move the playhead to the first frame of the text clip.
3. Under **Opacity**, click the **stopwatch** (Toggle Animation) and set Opacity to **0%**. That creates the first keyframe.
4. Move the playhead about half a second later and set Opacity to **100%**. Premiere adds a second keyframe and fades between the two.
5. To fade out, do the same in reverse near the end of the clip.

For a slide-in, use the same steps with **Position** instead of Opacity: start the text off to one side, then move it to its final spot. To smooth the motion, right-click a keyframe and choose an easing option such as **Ease In** or **Ease Out**.

## Text vs. captions: which one do you need?

They look similar, but Premiere treats them differently:

- **Text (graphics)** sits on a video track. You place it anywhere, style each clip on its own and animate it. Use it for titles, labels, callouts and lower thirds.
- **Captions** live on their own caption track, usually created from a transcript in the **Text** panel. One style applies to the whole track, and you can export them as an .srt file. Use them for dialogue and accessibility.

Captions deserve their own walkthrough, and we'll cover them in a separate guide. For now, if you need on-screen words that match what people say, start in the Text panel, not with the Type tool.

## Do it hands-free with Skilly

Reading steps is fine until you're staring at Premiere and can't find the panel the guide is talking about. That's where [Skilly](/) helps.

Skilly is a voice tutor for Mac. Hold **Control+Option** and ask out loud, something like *"where do I change the font on this text?"* Skilly looks at your Premiere Pro window, answers in voice, and **points at the exact control** on your screen. Premiere Pro is one of Skilly's built-in skills, and it switches on when Premiere is the app in front.

A few questions worth asking it while you work through this guide:

- "Where's the Type tool?"
- "How do I add a stroke to this text?"
- "Where do I turn on keyframes for opacity?"
- "How do I make this text stay on screen longer?"

Skilly doesn't edit your project. It shows you where things are, so the next time you need text, you'll know. Want a feel for the voice-and-pointer guidance first? [Try the browser demo](/demo/), no install needed.

## Keep going

- [Premiere Pro audio and titles](/learn/premiere-pro-audio-and-titles/): mix your sound and add titles in the same pass.
- [Premiere Pro effects and color grading](/learn/premiere-pro-effects-and-color-grading/): more Effect Controls and keyframes.
- [Premiere Pro tutorial for beginners](/learn/premiere-pro-tutorial-for-beginners/): the full beginner curriculum, start to finish.
