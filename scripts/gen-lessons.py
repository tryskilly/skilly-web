#!/usr/bin/env python3
"""Catalog-as-SEO engine: parse Skilly SKILL.md curricula into /learn pages.
Usage: python gen_lessons.py [app_id_filter]   (omit filter = all skills)
Writes markdown into skilly-web/src/content/learn/ (reuses existing collection).
"""
import re, sys, os, datetime

SKILLS = "/Users/engmsaleh/Repos/skilly/skills"
OUT = "/Users/engmsaleh/Repos/skilly-web/src/content/learn"
TODAY = "2026-06-29"
filt = sys.argv[1] if len(sys.argv) > 1 else None

def slugify(s):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s

def parse_front(text):
    m = re.search(r"^---\n(.*?)\n---", text, re.S)
    fm = {}
    if not m: return fm
    body = m.group(1)
    for line in body.splitlines():
        mm = re.match(r"^(\w+):\s*(.*)$", line)
        if mm: fm[mm.group(1)] = mm.group(2).strip().strip('"')
    # tags (yaml list)
    tags = re.findall(r"^\s*-\s*(.+)$", body, re.M)
    fm["_tags"] = [t.strip() for t in tags][:8]
    return fm

def parse_stages(text):
    # split on "### Stage N: Title"
    parts = re.split(r"\n### Stage \d+:\s*", text)
    headers = re.findall(r"\n### Stage \d+:\s*(.+)", text)
    stages = []
    for i, title in enumerate(headers):
        block = parts[i+1]
        # intro = first non-empty line AFTER the title line (the block starts with the title)
        intro = ""
        for ln in block.splitlines():
            s = ln.strip()
            if not s or s.startswith("**") or s == title.strip():
                continue
            intro = s; break
        goals = []
        gm = re.search(r"\*\*Goals:\*\*\n(.*?)(\n\*\*|\n### |\Z)", block, re.S)
        if gm:
            goals = [re.sub(r"\s+", " ", g.strip()) for g in re.findall(r"^\s*-\s*(.+)$", gm.group(1), re.M)]
        prereq = (re.search(r"\*\*Prerequisites:\*\*\s*(.+)", block) or [None, ""])
        prereq = prereq.group(1).strip() if hasattr(prereq, "group") else ""
        nxt = re.search(r"\*\*Next:\*\*\s*(.+)", block)
        nxt = nxt.group(1).strip() if nxt else ""
        stages.append({"n": i+1, "title": title.strip(), "intro": intro, "goals": goals, "prereq": prereq, "next": nxt})
    return stages

def yamlq(s):
    # proper YAML double-quoted escaping: backslash first, then quotes
    s = s.replace("\\", "\\\\").replace('"', '\\"')
    return '"' + s + '"'

def tagblock(tags, app_slug):
    tlist = []
    for t in (tags[:5] + [app_slug]):
        if t and t not in tlist:
            tlist.append(t)
    return "\n".join(f"  - {t}" for t in tlist)

def stage_slug(app, title):
    return slugify(app + "-" + title)

def write_stage(app, app_slug, tags, diff, stage, all_titles):
    title = f"{app} {stage['title']} (beginner guide)"
    if len(title) > 70:
        title = f"{app}: {stage['title']}"[:70]
    desc = (stage["intro"] or f"Learn {stage['title']} in {app}.")
    desc = (desc[:150] + " — step-by-step on Mac.") if len(desc) < 148 else desc[:167]
    slug = stage_slug(app, stage["title"])
    # internal links
    prev_link = ""
    if stage["prereq"]:
        prev_link = f"[{stage['prereq']}](/learn/{stage_slug(app, stage['prereq'])})"
    next_link = ""
    if stage["next"]:
        next_link = f"[{stage['next']}](/learn/{stage_slug(app, stage['next'])})"
    # howTo steps from goals
    steps_yaml = ""
    for g in stage["goals"]:
        name = (g.split(" — ")[0].split(":")[0])[:60]
        steps_yaml += f"    - name: {yamlq(name)}\n      text: {yamlq(g[:280])}\n"
    tag_yaml = tagblock(tags, app_slug)
    faq = (
        f"  - question: \"What's the fastest way to learn {stage['title'].lower()} in {app}?\"\n"
        f"    answer: \"Work through the steps on this page in {app} itself, on your own project. For hands-free help, Skilly is a voice guide that watches your screen and moves your cursor to the exact button as you go — so you learn by doing instead of pausing a video. It's free to start at tryskilly.app.\"\n"
        f"  - question: \"Do I need the paid version of {app}?\"\n"
        f"    answer: \"No — everything in this {stage['title'].lower()} lesson works in the standard version of {app} on macOS. A few advanced features may require a paid tier, which we call out where relevant.\"\n"
    )
    body_steps = "\n".join(f"- {g}" for g in stage["goals"])
    md = f"""---
title: {yamlq(title)}
description: {yamlq(desc)}
pubDate: {TODAY}
updatedDate: {TODAY}
author: "Mohamed Saleh Zaied"
category: how-to
series: {yamlq(app)}
lessonNumber: {stage['n']}
tags:
{tag_yaml}
howTo:
  tools:
    - {yamlq(app)}
  steps:
{steps_yaml}faq:
{faq}canonicalKeyword: {yamlq((stage['title'] + ' ' + app).lower())}
relatedArticles: []
---

{stage['intro']} Here's how to do it in **{app}** on macOS, step by step — part of the free {app} beginner curriculum.

> **Lesson {stage['n']} of the {app} curriculum.** {('Before this: ' + prev_link + '. ') if prev_link else ''}{('Next up: ' + next_link + '.') if next_link else ''}

## What you'll do

{body_steps}

## Do it hands-free with Skilly

Reading steps is one thing; doing them while the menus are in front of you is another. [Skilly](/) is a voice-first tutor for macOS: you ask out loud — "where's the {stage['title'].lower().split()[0]} panel?" — and it answers while **moving your cursor to the exact button**, watching your actual {app} window. It's the same {app} curriculum these lessons come from, taught live instead of read. Free to start.

## Keep going

This is one stage of the full **[{app} beginner curriculum](/learn/{app_slug}-tutorial-for-beginners)**.{(' Previous: ' + prev_link + '.') if prev_link else ''}{(' Continue with ' + next_link + '.') if next_link else ''}
"""
    open(os.path.join(OUT, slug + ".md"), "w").write(md)
    return slug, title

def write_hub(app, app_slug, tags, diff, hours, stages):
    title = f"{app} tutorial for beginners (free curriculum)"
    if len(title) > 70: title = f"Learn {app}: beginner curriculum"[:70]
    desc = f"A free, step-by-step {app} curriculum for macOS beginners — {len(stages)} lessons from interface basics to {stages[-1]['title'].lower()}."[:167]
    tag_yaml = tagblock(tags, app_slug)
    lesson_list = "\n".join(
        f"{s['n']}. **[{s['title']}](/learn/{stage_slug(app, s['title'])})** — {s['intro']}" for s in stages
    )
    md = f"""---
title: {yamlq(title)}
description: {yamlq(desc)}
pubDate: {TODAY}
updatedDate: {TODAY}
author: "Mohamed Saleh Zaied"
category: tutorial
tags:
{tag_yaml}
canonicalKeyword: {yamlq((app + ' tutorial beginners').lower())}
relatedArticles: []
---

Learning **{app}** from scratch on a Mac? This is the full beginner curriculum — {len(stages)} hands-on lessons (about {hours} hours total), in the order that actually makes sense, from the interface to {stages[-1]['title'].lower()}.

Each lesson is a real, do-it-yourself walkthrough. For hands-free help, [Skilly](/) teaches this exact curriculum live — a voice tutor that watches your {app} window and points your cursor at the right button. Free to start.

## The {app} curriculum

{lesson_list}

## How to use this

Work top to bottom — each lesson builds on the last — or jump straight to what you're stuck on. Every page lists what you'll do, the exact menus and shortcuts, and the common mistakes to avoid.
"""
    open(os.path.join(OUT, app_slug + "-tutorial-for-beginners.md"), "w").write(md)
    return app_slug + "-tutorial-for-beginners", title

made = []
for d in sorted(os.listdir(SKILLS)):
    sp = os.path.join(SKILLS, d, "SKILL.md")
    if not os.path.isfile(sp): continue
    if filt and filt not in d: continue
    text = open(sp).read()
    fm = parse_front(text)
    app = fm.get("target_app") or fm.get("name") or d
    app_slug = slugify(fm.get("target_app", d))
    tags = fm.get("_tags", [])
    diff = fm.get("difficulty", "beginner")
    hours = fm.get("estimated_hours", "")
    stages = parse_stages(text)
    if not stages:
        print(f"  ! no stages parsed for {d}"); continue
    hslug, htitle = write_hub(app, app_slug, tags, diff, hours, stages)
    made.append(hslug)
    for s in stages:
        sl, t = write_stage(app, app_slug, tags, diff, s, [x["title"] for x in stages])
        made.append(sl)
    print(f"{d}: hub + {len(stages)} stage pages")
print(f"\nTOTAL pages written: {len(made)}")
for m in made: print("  /learn/" + m)
