---
title: "How to set up SwiftUI previews in Xcode (#Preview macro guide)"
description: "Set up SwiftUI previews with the modern #Preview macro in Xcode 15+. Multiple variants, UIKit/AppKit previews, and the iOS 17+ deployment gotcha."
pubDate: 2026-04-27
updatedDate: 2026-04-27
author: "Mohamed Saleh Zaied"
category: tutorial
tags:
  - swiftui
  - xcode
  - swift
  - tutorial
canonicalKeyword: "SwiftUI Preview macro Xcode"
howTo:
  totalTime: "PT3M"
  tools:
    - "Xcode 15 or later"
    - "Swift 5.9+"
  steps:
    - name: "Open the file containing your view"
      text: "Open ContentView.swift (or whichever file has the view you want to preview)."
    - name: "Add the #Preview macro at file scope"
      text: "Below your view's struct definition, add: #Preview { ContentView() }. The closure returns the view to render."
    - name: "Show the preview canvas"
      text: "Editor → Canvas (or Option+Cmd+Return). Click Resume in the canvas if previews aren't auto-running."
    - name: "Add multiple previews"
      text: "Stack multiple #Preview declarations to compare states. Pass a title string: #Preview(\"Dark mode\") { ContentView().preferredColorScheme(.dark) }."
    - name: "If preview fails, check deployment target"
      text: "#Preview requires iOS 17+ / macOS 14+. If your project targets older versions, the macro won't compile — fall back to PreviewProvider for those targets."
faq:
  - question: "What's the difference between #Preview and PreviewProvider?"
    answer: "PreviewProvider was the original protocol-based system from 2019 — you'd write a struct conforming to PreviewProvider with a static `previews` property. #Preview (Xcode 15, Swift 5.9, 2023) is a Swift macro that replaces all that boilerplate with a single closure. The macro version is significantly less code, supports UIKit and AppKit views (PreviewProvider couldn't), and integrates better with Xcode's preview canvas. PreviewProvider still works but is essentially deprecated for new code targeting iOS 17+."
  - question: "Why does my #Preview macro show a compiler error about iOS 17?"
    answer: "The #Preview macro requires iOS 17 / macOS 14 / watchOS 10 / tvOS 17 minimum. If your project's deployment target is lower, the macro fails to compile even when previewing on a newer simulator. Apple acknowledged this is a known limitation. Workarounds: (1) bump your deployment target to iOS 17 if your user base allows, (2) keep using PreviewProvider for projects targeting iOS 16 and below, (3) put #Preview blocks in iOS-17-only files guarded by #if os checks."
  - question: "How do I show multiple variants of the same view?"
    answer: "Stack multiple #Preview macros. Each becomes a separate card in the preview canvas. Pass a title string as the first parameter to label them: #Preview(\"Empty state\") { ContentView(items: []) } and #Preview(\"With data\") { ContentView(items: sampleItems) } produce two side-by-side previews. Use this for light/dark mode, locale variants, error states, loading states, or different device sizes."
  - question: "Can I preview UIKit or AppKit views with #Preview?"
    answer: "Yes — this is one of the major upgrades over PreviewProvider. The macro accepts any view-returning closure. For UIKit: #Preview { let vc = MyViewController(); vc.titleLabel.text = \"Test\"; return vc }. For AppKit: same pattern with NSViewController. This is huge for legacy codebases that mixed UIKit + SwiftUI — you can finally preview the UIKit parts without writing a UIViewControllerRepresentable wrapper."
  - question: "My preview crashes immediately or won't load — what do I check?"
    answer: "Top causes in order: (1) Your view requires a property that wasn't passed in — check the closure passes valid sample data for every required init parameter. (2) Your view depends on @Environment values that don't exist in the preview — inject them with .environment(...) modifiers in the closure. (3) Your view runs network calls or main-thread-blocking work in init — wrap with task() and use mock data in the preview. (4) The preview is using stale build cache — Editor → Canvas → Diagnostics shows the actual error; Cmd+Option+P forces a rebuild."
  - question: "How do I preview a view that needs SwiftData / Core Data / a model context?"
    answer: "Use a preview-specific in-memory model container. For SwiftData, define a static @MainActor preview container in a #Preview block: #Preview { let container = try! ModelContainer(for: Item.self, configurations: ModelConfiguration(isStoredInMemoryOnly: true)); container.mainContext.insert(Item.sample); return ContentView().modelContainer(container) }. For Core Data, do the equivalent with NSPersistentContainer pointing at /dev/null. The point is: previews should never touch the real persistent store — that breaks reproducibility and makes previews non-deterministic."
relatedArticles: []
---

If you've opened a SwiftUI file in Xcode and seen `PreviewProvider` boilerplate that nobody fully understands, this is the modern replacement. The `#Preview` macro arrived in Xcode 15 and is now the standard for any project targeting iOS 17 / macOS 14 or newer.

> Verified 2026-04-27 against [Apple's Previews in Xcode docs](https://developer.apple.com/documentation/swiftui/previews-in-xcode) and SwiftLee's macro deep-dive. The `#Preview` macro requires Swift 5.9+ and Xcode 15+. Xcode 26 also added a separate `#Playground` macro for canvas-based code snippets — distinct from `#Preview`.

## What the #Preview macro is

A Swift macro (introduced in Swift 5.9) that registers a view to render in Xcode's preview canvas — without the protocol/struct/static-var boilerplate of the old `PreviewProvider`.

**Old way (PreviewProvider, still works for legacy):**

```swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

**Modern way (#Preview macro):**

```swift
#Preview {
    ContentView()
}
```

That's the entire migration. The macro generates equivalent code at compile time. You can right-click the macro and choose **Expand Macro** to see exactly what it expands to.

## The fastest setup

1. Open `ContentView.swift` (or whichever view file)
2. Below the `struct ContentView: View { ... }` definition, add:

   ```swift
   #Preview {
       ContentView()
   }
   ```

3. Show the preview canvas: **Editor → Canvas** or `Option+Cmd+Return`
4. If previews aren't running, click **Resume** in the canvas (or `Option+Cmd+P`)

## Multiple previews — title each one

Stack `#Preview` declarations to compare states. Pass a title as the first parameter:

```swift
#Preview("Empty") {
    ContentView(items: [])
}

#Preview("With data") {
    ContentView(items: Item.samples)
}

#Preview("Dark mode") {
    ContentView(items: Item.samples)
        .preferredColorScheme(.dark)
}

#Preview("Spanish") {
    ContentView(items: Item.samples)
        .environment(\.locale, Locale(identifier: "es"))
}
```

Each becomes a separate card in the canvas. Use the canvas's variant picker to switch between them quickly.

## Previewing UIKit / AppKit views (the big upgrade over PreviewProvider)

`PreviewProvider` could only preview `View`-conforming SwiftUI types. The `#Preview` macro accepts any view-returning closure, including `UIViewController` and `NSViewController`:

```swift
#Preview {
    let vc = ArticleViewController()
    vc.titleLabel.text = "Previews for UIKit work!"
    return vc
}
```

Same pattern for AppKit on macOS. For mixed-stack projects (legacy UIKit + new SwiftUI), this is the killer feature — you can preview the UIKit parts without wrapping them in a `UIViewControllerRepresentable`.

## The iOS 17+ deployment gotcha

This catches everyone with a project that targets older iOS:

```
'Preview' is only available in iOS 17.0 or newer
```

`#Preview` requires iOS 17 / macOS 14 / watchOS 10 / tvOS 17 minimum, even if you're only previewing on a newer simulator. Apple acknowledged this is a known limitation — there's no compiler-directive workaround that ships in Xcode today.

Three options if your project supports iOS 16:

1. **Bump your deployment target.** iOS 17+ adoption is now ~95% (Apple's own stats). Most apps can drop iOS 16 with minimal user impact.
2. **Keep using `PreviewProvider`** — it still works on every Swift version. Use the modern macro for new files added with iOS-17-only views.
3. **Mixed approach** — if a specific view requires iOS 17 features anyway, mark it `@available(iOS 17.0, *)` and use `#Preview` only there. For shared views, `PreviewProvider`.

## Common preview failures and fixes

**1. "Cannot preview in this file" / immediate crash on Resume.**

Most often: your view's `init` requires a property you didn't supply. Check the canvas Diagnostics pane (top-right corner of the preview area) for the actual error.

```swift
// ❌ Will crash — UserView needs a User
#Preview { UserView() }

// ✅ Pass a sample
#Preview { UserView(user: User.sample) }
```

**2. View depends on `@Environment` values not provided.**

Inject them in the closure:

```swift
#Preview {
    OrderDetailView(orderID: "abc-123")
        .environment(\.colorScheme, .dark)
        .environment(\.locale, Locale(identifier: "en"))
}
```

**3. View needs a SwiftData / Core Data context.**

Spin up an in-memory container so previews don't touch the real store:

```swift
#Preview {
    let container = try! ModelContainer(
        for: Item.self,
        configurations: ModelConfiguration(isStoredInMemoryOnly: true)
    )
    container.mainContext.insert(Item.sample)

    return ItemListView()
        .modelContainer(container)
}
```

**4. Network calls or main-thread blocking in `init`.**

Move them to `.task { ... }` and feed mock data in the preview:

```swift
#Preview {
    ProductView(product: Product.mock)  // already-loaded mock, no fetch
}
```

**5. Stale build cache giving cryptic errors.**

`Cmd+Option+P` forces a preview rebuild. If that doesn't fix it, **Product → Clean Build Folder** (`Cmd+Shift+K`), then resume.

## Tips that earn back hours

- **Default a sample type on your model.** Add `static let sample = Item(name: "...", ...)` to every model. Previews become one-liners.
- **One file = one #Preview block per state.** Don't try to test all states with conditional logic inside one preview — multiple `#Preview` macros render faster and are easier to scan.
- **Use the `traits:` parameter for canvas configuration.** `#Preview(traits: .landscapeLeft) { ... }` rotates a single preview without setting it on the simulator. Other traits include `.sizeThatFitsLayout`, `.fixedLayout(width:height:)`.
- **Live previews** are interactive — click the play button on the canvas to enable taps, gestures, animation. Way faster than running the simulator.

## When to use #Playground (Xcode 26 only) instead

Xcode 26 added a separate `#Playground` macro for executing arbitrary code snippets in the canvas — not for previewing views, but for trying out functions and seeing their output inline. Different tool, same canvas. If you're on Xcode 25 or earlier, ignore it.

## Tired of looking up Xcode shortcuts every five minutes?

Skilly is a voice-first AI tutor for Mac that watches your Xcode window, hears your question, and points at exactly the menu, button, or panel you need — answer streaming as text right beside the cursor. Same flow for SwiftUI, AppKit, Blender, Figma, anything on Mac. **15 minutes free, no card.**
