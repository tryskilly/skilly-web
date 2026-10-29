---
title: "How to Add Text in DaVinci Resolve (Step by Step)"
description: "Add text in DaVinci Resolve from Effects > Titles, type in the Inspector, style font, size, and color, then trim the clip so it stays on screen."
pubDate: 2026-10-29
updatedDate: 2026-10-29
author: "Mohamed Saleh Zaied"
category: how-to
tags:
  - video-editing
  - davinci-resolve
  - beginner
  - creative
howTo:
  totalTime: PT5M
  tools:
    - "DaVinci Resolve"
  steps:
    - name: "Open the Edit page and park the playhead"
      text: "Switch to the Edit page and move the playhead to the frame where the text should appear."
    - name: "Open Effects, then Toolbox, then Titles"
      text: "In the Effects Library on the Edit page, open Toolbox > Titles. Use the search box and type text if the list is long."
    - name: "Drag Text onto a higher video track"
      text: "Drag Text (or Text+) onto a video track above your footage, usually V2 when the picture is on V1. A title clip about five seconds long appears."
    - name: "Type in Inspector > Title"
      text: "Select the title clip. In the Inspector, open the Title tab and type in the text box. Press Return for a second line."
    - name: "Style font, size, color, stroke, and shadow"
      text: "In the same Title tab, set the font, size, color, and alignment. Turn on Stroke, Drop Shadow, or Background when the words need to read over the picture."
    - name: "Trim the clip for duration"
      text: "Drag the left or right edge of the title clip to change when it starts and ends. Drag the whole clip to move it."
    - name: "Fade it with opacity keyframes (optional)"
      text: "In Inspector > Settings > Composite, keyframe Opacity from 0 to 1 over about half a second. Repeat in reverse at the end to fade out."
faq:
  - question: "Where do I add text in DaVinci Resolve?"
    answer: "On the Edit page, open the Effects Library, then Toolbox > Titles, and drag Text onto a video track above your footage. Select that clip and type in Inspector > Title. There is no Type tool and no default keyboard shortcut for a new title. The search box at the top of Effects is the fast way to find Text."
  - question: "What is the difference between Text and Text+?"
    answer: "Text is a rich-text title. Font, size, color, alignment, stroke, drop shadow, and background all live on the Title tab, and you can style one highlighted word differently from the rest. Text+ is Fusion-powered. Its Inspector is split into Text, Layout, Transform, and Shading, which is what you want for a path or frame layout, layered outlines, or a Write On reveal. MultiText, added in Resolve 20, holds several text layers in one clip. Fusion titles such as the L, M, and R lower thirds are prebuilt designs. You edit the lines they expose in the Inspector."
  - question: "How do I change how long text stays on screen?"
    answer: "Select the title clip and drag its left or right edge. A title you drag in from the Titles bin starts at about five seconds. Dragging the end later holds the words up longer. Dragging it earlier shortens them. Drag the whole clip to change when it starts."
  - question: "Why can't I see my text?"
    answer: "Three checks fix this almost every time. The title must be on a higher track than the footage (V2 or above, with the picture on V1). The playhead must sit inside the title clip, because the viewer shows the frame under the playhead. The track must be enabled in the track header. If you dropped the title onto the footage's own track, it cuts into that track instead of sitting on top. Move it up a track."
  - question: "Are subtitles the same as text titles?"
    answer: "No. Titles are graphics on a video track. You place each one, style it on its own, and animate it. Subtitles live on a subtitle track, follow dialogue, and can be imported from an SRT. In the free version, add a subtitle track and type the lines, or import a subtitle file. Create Subtitles from Audio, which builds captions from the soundtrack, is DaVinci Resolve Studio only."
  - question: "How do I fade text in and out?"
    answer: "Select the title, open Inspector > Settings, and find Composite. On the first frame of the clip, click the keyframe diamond next to Opacity and set it to 0. About half a second later, set Opacity to 1. Resolve fades between the two keyframes. Do the same in reverse at the end of the clip. Opacity runs from 0 (invisible) to 1 (solid)."
  - question: "Can Skilly add the text for me?"
    answer: "Skilly guides you rather than editing for you. You hold Control+Option, ask out loud, and Skilly answers in voice while pointing at the exact control on your DaVinci Resolve screen, so you learn where everything is as you go."
canonicalKeyword: "how to add text in davinci resolve"
relatedArticles:
  - davinci-resolve-edit-page-basics
  - davinci-resolve-tutorial-for-beginners
  - how-to-add-text-in-premiere-pro
  - chatgpt-screen-sharing-mac
  - enable-screen-recording-permission-macos
---

To add text in DaVinci Resolve, open the **Edit** page, go to **Effects > Toolbox > Titles**, and drag **Text** (or **Text+**) onto a video track above your footage. Select the title clip and type in **Inspector > Title**. Set the font, size, and color there, then drag the clip's edges to decide how long it stays on screen.

If nothing shows up, check three things: the title is on a higher track than the footage, the playhead is parked inside the title clip, and that track is enabled.

That is the whole job for a basic title. The rest of this guide covers styling, timing, which title type to grab, a simple lower third, and a fade.

> **Versions.** These steps match DaVinci Resolve 19 through 21, including the free version. **MultiText** needs Resolve 20 or later. **Create Subtitles from Audio** is the one step below that needs DaVinci Resolve Studio.

## How to add text in DaVinci Resolve, step by step

1. **Open the Edit page and park the playhead.** Titles are added on the Edit page, not on Cut, Color, or Fusion. Move the playhead to the frame where the words should appear. The viewer shows the frame under the playhead, so a title that starts later looks like it failed until you move there.
2. **Open Effects > Toolbox > Titles.** The Effects Library is the upper-left panel on the Edit page. Click the **Effects** tab if you are looking at the Media Pool. Open **Toolbox**, then **Titles**. If the bin is long, type `text` in the search box at the top of Effects.
3. **Drag Text onto a video track above your footage.** Drop **Text** on V2 when the picture is on V1. A title clip about five seconds long appears at the playhead. Dropping it onto the footage's own track cuts it into that track instead of laying it over the picture. Pick **Text+** instead only if you already know you want the extra layout and shading controls. The difference is covered below.
4. **Select the title clip and type in Inspector > Title.** The Inspector sits at the top right. Open the **Title** tab, click in the text box, and replace the sample words. Press Return for a second line. You edit this title in the Inspector. Resolve does not have a Type tool you click in the viewer.
5. **Set font, size, and color** in that same Title tab before you touch animation. Stroke, shadow, and a background box are in the styling section next.

Coming from Premiere Pro? There is no **T** shortcut here. The [Premiere version of this guide](/learn/how-to-add-text-in-premiere-pro/) is the one that starts with the Type tool.

## Style your text in the Inspector

With a **Text** clip selected, the Title tab holds the controls you will actually use:

- **Font and font face.** Pick the typeface, then the weight (Regular, Bold, and so on).
- **Size.** Take it up until the words read easily. A line that looks fine in the viewer can still shrink to nothing on a phone, so bias a little larger.
- **Color.** The fill of the letters.
- **Alignment.** Left, center, or right. Center fits a title card. Left fits a lower third.
- **Tracking and line spacing.** Open or tighten the letters, and set the gap when you have two lines.
- **Stroke.** Turn it on, then set the color and size. A thin dark stroke keeps white text readable over a bright sky or a patterned shirt.
- **Drop shadow.** Turn it on when the letters still blend into the picture.
- **Background.** A box behind the words. Turn it on and set its color when you want a bar under a name without building one from scratch.

Text is rich text, so you can highlight one word in the box and change only that word's size or color.

To move the block, set the viewer's on-screen control to **Transform** and drag, or change **Position** in the Inspector. **Zoom** for the whole clip sits in the same **Settings** area as the fade, under Transform.

**Dragged Text+ instead?** It has no Title tab. Styling is split into four panels:

- **Text** holds the words, font, size, and color.
- **Layout** chooses how the block is arranged: a point in the frame, a wrapping frame, a circle, or a path.
- **Transform** covers spacing and rotation for that text.
- **Shading** is where fill, outline, and shadow live, as separate layers you turn on.

For a normal title on Text+, stay on **Text** and one **Shading** element. You do not need to open the Fusion page.

## Set when text appears and disappears

A title is a clip. Timing works the same way it does for video:

- **Move it:** drag the whole title clip left or right along the timeline.
- **Change its duration:** drag the left or right edge. A fresh title from the Titles bin is about five seconds. That is a starting length, not a limit.
- **Keep it above the picture:** higher video tracks composite on top. V1 is the bottom track, so a title on V2 or V3 shows over footage on V1. The track's enable switch in the track header has to stay on, or the whole track disappears.

New to tracks and trimming? The [Edit page basics](/learn/davinci-resolve-edit-page-basics/) lesson walks through the timeline layout these steps assume.

## Text, Text+, MultiText, or a Fusion title

Use the simplest title that does the job. All of these live in **Effects > Toolbox > Titles**, and all of them work in the free version except where a version is named.

- **Text** is the everyday title. One rich-text block, styled on the Title tab. Use it for title cards, labels, and a plain two-line lower third.
- **Text+** is the Fusion-powered title. Reach for it when you want a frame or a path, a stacked outline and shadow, or a Write On reveal. It still lives on the Edit page. Opening Fusion is optional, not required.
- **MultiText** (Resolve 20 and later) puts several text layers in one clip. Each layer has its own words, style, and position. Use it when a name and a role should move independently and you do not want two clips to keep aligned. On Resolve 19, put two **Text** clips on two tracks instead.
- **Fusion titles** are the designed items in the same bin: bars, scrolls, openers, and the **L Lower 3rd**, **M Lower 3rd**, and **R Lower 3rd**. You replace the sample lines in the Inspector. Pick one when its layout is already close. Rebuilding it on the Fusion page is a different project, and nothing on this page needs that.

## Make a simple lower third

A lower third is the name and role that sits in the lower part of an interview shot. Two ways to get one, from least work to most control.

**Use a built-in lower third.** In Titles, drag **L Lower 3rd** (left), **M Lower 3rd** (middle), or **R Lower 3rd** (right) onto a track above the footage. Select the clip and replace the sample lines in the Inspector. Trim the edges so the bar is only up while that person is on screen.

**Or build a plain one with Text:**

1. Drag **Text** onto V2.
2. In Inspector > Title, type the name, press Return, and type the role.
3. Set alignment to the left.
4. Turn on **Stroke** or **Background** so the lines survive a busy background.
5. Move the block down into the lower part of the frame with **Position**, or with the viewer's **Transform** control.
6. Trim the clip to the length of the shot.

On Resolve 20 or later, **MultiText** is the middle path: one clip, a name layer and a role layer, each moved on its own.

## Animate text with a fade or a small zoom

A fade is enough for most titles. Opacity keyframes do it, on Text and on Text+:

1. Select the title clip and open the Inspector.
2. Open **Settings** and find **Composite**.
3. Move the playhead to the first frame of the title.
4. Next to **Opacity**, click the keyframe diamond, then set Opacity to **0**.
5. Move about half a second later and set Opacity to **1**. Resolve stores a second keyframe and fades between them. Opacity runs from 0 (invisible) to 1 (solid), not from 0 to 100.
6. At the end of the clip, do the same in reverse: a keyframe at **1**, then **0** on the last frames.

For a little motion, keyframe **Zoom** the same way. Start at **1** and ease it to something small, such as **1.05**, over the first half-second. A big zoom reads as a mistake. Keep the change slight.

**Text+ only, and optional:** in the Text controls, find **Write On**. Keyframe **End** from **0** to **1** and the characters appear in order. Use it when the line should write on. A fade is simpler, and it works on every title type, not just Text+.

## Text vs. subtitles: which one do you need?

They both put words on the picture. Resolve does not treat them as the same thing.

- **Titles** sit on a video track. You place each clip, style it on its own, and animate it. Use them for titles, labels, callouts, and lower thirds.
- **Subtitles** sit on a subtitle track. They follow what people say, share a caption style, and travel as a captions file. Use them for dialogue and accessibility.

In the free version, add a subtitle track from the timeline (right-click a track header and choose **Add Subtitle Track**) and type the lines, or bring in an existing file with **File > Import > Subtitle**. **Create Subtitles from Audio**, which generates captions from the soundtrack, is **DaVinci Resolve Studio** only. The free version does not include that command.

A Text title will not export as an SRT, and a subtitle will not give you a designed lower third. Pick the track that matches the job.

## Do it hands-free with Skilly

Reading steps is fine until you are staring at Resolve and the Titles bin is not where the guide said it was. That is where [Skilly](/) helps.

Skilly is a voice tutor for Mac. Hold **Control+Option** and ask out loud, something like *"where's the Titles panel?"* Skilly looks at your DaVinci Resolve window, answers in voice, and **points at the exact control** on your screen. DaVinci Resolve is one of Skilly's built-in skills, and it switches on when Resolve is the app in front.

A few questions worth asking while you work through this guide:

- "Where's the Titles panel?"
- "How do I change the font on this title?"
- "Why can't I see my text?"
- "How do I make this title stay on screen longer?"

Skilly does not edit your project. It shows you where things are, so the next time you need a title, you will know where to drag it. Want a feel for the voice-and-pointer guidance first? [Try the browser demo](/demo/), no install needed. To ask over your own Resolve window, [download Skilly for Mac](/download/). The trial is 15 minutes, no card.

## Keep going

- [DaVinci Resolve Edit page basics](/learn/davinci-resolve-edit-page-basics/): tracks, the playhead, and the Edit page layout this guide uses.
- [DaVinci Resolve tutorial for beginners](/learn/davinci-resolve-tutorial-for-beginners/): the full beginner curriculum, from the interface through export.
- [How to add text in Premiere Pro](/learn/how-to-add-text-in-premiere-pro/): the same job in Premiere, starting from the Type tool.
- [Allow screen recording on Mac](/learn/enable-screen-recording-permission-macos/): the macOS permission a screen-aware tutor needs before it can see Resolve.
- [ChatGPT screen sharing on Mac](/learn/chatgpt-screen-sharing-mac/): what ChatGPT can and cannot see on a Mac, if you are comparing ways to get help while you edit.
