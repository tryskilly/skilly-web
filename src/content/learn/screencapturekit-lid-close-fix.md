---
title: "Fix the SCStream lid-close black frames in ScreenCaptureKit"
description: "Why SCStream ships 2-3 black frames after lid close, and the production fix using CGDisplay reconfig callbacks + SCFrameStatus gating."
pubDate: 2026-04-29
updatedDate: 2026-04-29
author: "Mohamed Saleh Zaied"
category: troubleshooting
tags:
  - screencapturekit
  - macos
  - swift
  - troubleshooting
canonicalKeyword: "SCStream lid close black frames"
howTo:
  totalTime: "PT15M"
  tools:
    - "macOS 13.0+ (ScreenCaptureKit framework)"
    - "Swift 5.9+"
  steps:
    - name: "Register a CGDisplay reconfiguration callback"
      text: "Use CGDisplayRegisterReconfigurationCallback to be notified the moment macOS starts reconfiguring displays — this fires before SCStream notices anything is wrong."
    - name: "Stop the stream on kCGDisplayBeginConfigurationFlag"
      text: "When the begin-configuration flag fires, immediately call SCStream.stopCapture(). Don't try to keep the existing stream alive across the reconfig."
    - name: "Refetch SCShareableContent fresh — never reuse the cached one"
      text: "SCShareableContent caches its display list internally. After a reconfig, the cached displayID may point to an invalid display. Call SCShareableContent.current to get fresh content."
    - name: "Rebuild SCStreamConfiguration with the new displayID"
      text: "Construct a fresh SCStreamConfiguration and SCContentFilter from the just-fetched displays. Start a new SCStream."
    - name: "Mask the 2-3 frame gap with a ring buffer"
      text: "While the new stream warms up, keep emitting your last-known-good CMSampleBuffer to your downstream consumers. Hold roughly 3-5 frames in a ring buffer and replay the most recent until real frames return."
    - name: "Gate the live-stream resumption on SCFrameStatus.complete"
      text: "When the new stream starts pushing buffers, read SCStreamFrameInfo.status from each CMSampleBuffer's attachments. macOS emits .suspended → .started → .complete during warmup — only flush the ring buffer back to live on .complete, not 'not blank'."
faq:
  - question: "Why doesn't SCStream just throw an error when the display is invalidated?"
    answer: "ScreenCaptureKit's SCStreamDelegate.stream(_:didStopWithError:) only fires for fatal errors. A display reconfiguration is not fatal — the framework keeps the stream alive and pushes zero/blank frames hoping the display comes back. By the time it gives up (if it does), you've already shipped multiple bad frames downstream. The fix is to react to the reconfig event yourself, not wait for SCStream to notice."
  - question: "Why gate on SCFrameStatus.complete specifically and not just 'not blank'?"
    answer: "After CGDisplayRegisterReconfigurationCallback fires the kCGDisplayBeginConfigurationFlag, your new SCStream goes through a startup sequence: typically .suspended → .started → .complete. The .started status means the stream is alive but the buffer doesn't yet contain final pixel data — it's a warmup frame. If you check `frameInfo.status != .blank`, you'll let .started frames through, and those still produce visible artifacts on display. .complete is the only status where the buffer has confirmed-final pixels. Credit to u/Deep_Ad1959 for surfacing this on r/SwiftUI — there is no good public answer for this gating sequence anywhere else as of this writing."
  - question: "How do I retrieve SCStreamFrameInfo.status from a CMSampleBuffer?"
    answer: "Call CMSampleBufferGetSampleAttachmentsArray(sampleBuffer, createIfNecessary: false) — this returns a CFArray of attachment dictionaries (typically one entry per buffer). Read the value for key SCStreamFrameInfo.status, which is a raw integer mapping to SCFrameStatus enum cases (.complete, .idle, .blank, .suspended, .started, .stopped). The Swift idiom: `if let attachments = CMSampleBufferGetSampleAttachmentsArray(sampleBuffer, createIfNecessary: false) as? [[SCStreamFrameInfo: Any]], let statusRawValue = attachments.first?[.status] as? Int, let status = SCFrameStatus(rawValue: statusRawValue), status == .complete { ... }`"
  - question: "Does this also fix external display unplug?"
    answer: "Yes — CGDisplayRegisterReconfigurationCallback fires for external display unplug, sleep, resolution change, and DisplayPort/Thunderbolt cable yanks too. The flags parameter (CGDisplayChangeSummaryFlags) tells you what kind of event happened. For our purposes, treating any kCGDisplayBeginConfigurationFlag as 'stop the stream and rebuild' covers the common cases. You can be more granular by filtering on .removeFlag or .disabledFlag if you want to avoid restarting on cosmetic events like color profile changes."
  - question: "Why did the cached SCShareableContent fail us in the first place?"
    answer: "SCShareableContent.current() is documented as a fresh fetch from the system. SCShareableContent.excludingDesktopWindows(_:onScreenWindowsOnly:) and similar helpers may behave differently — and many apps (including ours, originally) hold onto an SCShareableContent reference for the whole session to avoid re-fetching on every frame. That cache becomes stale across display reconfigs because the displays array contains SCDisplay objects whose displayID may no longer correspond to a real display. The lesson: refetch SCShareableContent.current() inside your reconfig handler, not from the cache. Performance cost is negligible — it only runs on display events, not per-frame."
  - question: "What's the simplest 'just give me the code' version?"
    answer: "See the Swift sketch in the section above. Three pieces glued together: (1) register a callback at startup, (2) on begin-config: stop, refetch, rebuild, restart; (3) ring-buffer your last good frame; (4) gate live resume on SCFrameStatus.complete. Total addition to a basic SCStream setup is ~80-120 lines. The full pattern (with a Closure2-style helper for the C callback bridging) is available in Skilly's open-source repo at github.com/tryskilly/skilly."
relatedArticles:
  - openai-realtime-api-tutorial
  - enable-screen-recording-permission-macos
---

If you ship a Mac app that uses ScreenCaptureKit and you've ever closed your laptop lid mid-capture, you've probably seen this: 2-3 black or torn frames flash through your downstream pipeline before things recover. Maybe nobody filed a bug. Maybe they did and you couldn't reproduce it. This is the fix.

> Verified 2026-04-30 against [Apple's CGDisplayRegisterReconfigurationCallback](https://developer.apple.com/documentation/coregraphics/1455336-cgdisplayregisterreconfiguration) and [SCStreamFrameInfo](https://developer.apple.com/documentation/screencapturekit/scstreamframeinfo) reference. The architectural pattern below was crystallized through an 8-round technical discussion on r/SwiftUI with [u/Deep_Ad1959](https://reddit.com/u/Deep_Ad1959), who shared the production version after we hit the same bug. **Credit goes to them for the SCFrameStatus gating insight, the duplicate-frame dedup, and the queueDepth note** — there is no good public writeup of those details anywhere else as of this writing.

## What you're actually seeing

When you close the lid (or unplug an external display, or the system sleeps), ScreenCaptureKit's `SCStream` doesn't throw an error. The framework's invalidation callback fires *too late* — the cached display list inside `SCShareableContent` still references the old `displayID`, and `SCStream` keeps pushing buffers that arrive blank or torn. By the time SCStream notices anything is wrong, you've already emitted 2-3 broken frames to whatever consumes them (HEVC encoder, screen recording file, network stream, AI vision pipeline).

The fix isn't in ScreenCaptureKit itself. It's wiring up CoreGraphics' display reconfiguration system as a *separate, earlier* event source.

## The architecture

```
[CGDisplay event] → [Stop SCStream] → [Refetch SCShareableContent] →
[Rebuild SCStreamConfiguration] → [Start new SCStream] → [Wait for .complete frame]
                                                                     ↓
                                                           [Flush ring buffer back to live]
```

While that sequence runs (typically 80-200ms), your downstream pipeline keeps consuming the **last good `CMSampleBuffer`** from a small ring buffer. The viewer never sees the gap.

## Step 1: Register a CGDisplay reconfiguration callback

The callback fires *before* SCStream notices anything is wrong, which is the entire point.

```swift
import CoreGraphics

class DisplayReconfigWatcher {
    func start() {
        CGDisplayRegisterReconfigurationCallback(Self.handler, Unmanaged.passUnretained(self).toOpaque())
    }

    static let handler: CGDisplayReconfigurationCallBack = { displayID, flags, userInfo in
        guard let userInfo = userInfo else { return }
        let watcher = Unmanaged<DisplayReconfigWatcher>.fromOpaque(userInfo).takeUnretainedValue()
        watcher.handle(displayID: displayID, flags: flags)
    }

    private func handle(displayID: CGDirectDisplayID, flags: CGDisplayChangeSummaryFlags) {
        if flags.contains(.beginConfigurationFlag) {
            // Tell the SCStream coordinator to stop + rebuild
        }
    }
}
```

The C callback bridging is annoying. Apple's [Closure2 helper](https://nonstrict.eu/blog/2023/working-with-c-callback-functions-in-swift/) (available via the swift-package-collection) wraps this in a more Swifty closure-based API if you'd rather skip the `Unmanaged` dance.

## Step 2: Stop the stream on begin-configuration

When the flag fires, **stop immediately**. Don't try to keep the existing `SCStream` alive across the reconfig — its `displayID` is about to point at nothing.

```swift
Task {
    do {
        try await currentStream?.stopCapture()
    } catch {
        // Already stopped or never started — fine
    }
    currentStream = nil
}
```

## Step 3: Refetch SCShareableContent — fresh, no cache

This is the part that's not obvious. Most apps fetch `SCShareableContent` once at session start and reuse it for the lifetime of the capture. That cache holds stale `SCDisplay` references whose `displayID` is now invalid.

Do this instead:

```swift
let freshContent = try await SCShareableContent.current
guard let display = freshContent.displays.first(where: { $0.displayID == newDisplayID }) ?? freshContent.displays.first else {
    return  // No displays available right now (e.g., laptop closed with no external)
}
```

The performance cost is negligible because this only runs on the rare reconfig event, not per-frame.

## Step 4: Rebuild SCStreamConfiguration

```swift
let config = SCStreamConfiguration()
config.width = display.width * 2
config.height = display.height * 2
config.minimumFrameInterval = CMTime(value: 1, timescale: 60)
// ... your usual settings

let filter = SCContentFilter(display: display, excludingWindows: [])
let newStream = SCStream(filter: filter, configuration: config, delegate: self)
try newStream.addStreamOutput(self, type: .screen, sampleHandlerQueue: outputQueue)
try await newStream.startCapture()
currentStream = newStream
```

## Step 5: Mask the gap with a ring buffer

While step 1-4 runs, your downstream consumers should keep getting `CMSampleBuffer`s. Hold the last 3-5 known-good buffers and replay the most recent one until real frames return:

```swift
final class FrameRingBuffer {
    private var buffers: [CMSampleBuffer] = []
    private let capacity = 5

    func push(_ buffer: CMSampleBuffer) {
        buffers.append(buffer)
        if buffers.count > capacity { buffers.removeFirst() }
    }

    var lastGood: CMSampleBuffer? { buffers.last }
}
```

In `SCStreamOutput.stream(_:didOutputSampleBuffer:of:)`, push every buffer **whose status is `.complete`** (see step 6) into the ring buffer. During reconfig, your pipeline reads from `lastGood` instead of the live stream.

## Step 6: Gate the live resume on SCFrameStatus.complete

This is the detail that breaks naive implementations. After your new `SCStream` starts pushing buffers, the first 1-3 are typically `.started` (stream is alive but the pixel data isn't final yet) — not `.complete`. If you flush the ring buffer back to live on the first non-blank buffer, you'll show one or two warmup frames that look wrong.

Read the status from `CMSampleBuffer` attachments and gate specifically on `.complete`:

```swift
import ScreenCaptureKit

func stream(_ stream: SCStream, didOutputSampleBuffer sampleBuffer: CMSampleBuffer, of type: SCStreamOutputType) {
    guard let attachments = CMSampleBufferGetSampleAttachmentsArray(sampleBuffer, createIfNecessary: false)
        as? [[SCStreamFrameInfo: Any]],
        let statusRawValue = attachments.first?[.status] as? Int,
        let status = SCFrameStatus(rawValue: statusRawValue) else { return }

    switch status {
    case .complete:
        ringBuffer.push(sampleBuffer)
        // Resume forwarding live frames to downstream
        downstream.consume(sampleBuffer)
    case .started, .suspended, .idle, .blank, .stopped:
        // Don't forward. Downstream keeps reading from ringBuffer.lastGood.
        break
    @unknown default:
        break
    }
}
```

## Step 7: Dedupe identical frames before the encoder

`.complete` means the buffer has *final* pixels. It doesn't mean those pixels are *different* from the previous buffer. If the on-screen content is static (idle terminal, paused video, codeless editor) SCStream will keep handing you back-to-back identical frames. Feeding those into AVAssetWriter or any encoder is wasted work — and on idle-heavy recordings (a long Xcode session with the user mostly reading), it bloats output without adding information.

A cheap presentation-timestamp + content-hash gate before the encoder solves it:

```swift
private var lastFrameHash: Int = 0
private var lastFramePTS: CMTime = .zero

func acceptForEncoding(_ buffer: CMSampleBuffer) -> Bool {
    let pts = CMSampleBufferGetPresentationTimeStamp(buffer)
    guard let pixelBuffer = CMSampleBufferGetImageBuffer(buffer) else { return false }
    let hash = pixelBuffer.contentHash() // a cheap pixel hash — perceptual hash, downsampled CRC, etc.

    defer { lastFrameHash = hash; lastFramePTS = pts }

    // Skip frames identical to the previous one, unless we haven't written one in a while
    if hash == lastFrameHash && CMTimeGetSeconds(pts - lastFramePTS) < 1.0 {
        return false
    }
    return true
}
```

The 1-second floor exists so the encoder still sees *some* frame periodically — most container formats need this for seekability. Reported impact: ~40% smaller output on idle-heavy sessions, no perceptual quality loss.

## Step 8: Tune `SCStreamConfiguration.queueDepth` if you're encoding under sustained load

The default `queueDepth` of 8 is fine when you're previewing the buffer (rendering to a `CALayer`, feeding a low-cost AI vision model). It is *not* fine when downstream is a sustained-load encoder — HEVC at 4K, slow disk, network stream backpressure. Under sustained encoder blocking, ScreenCaptureKit silently drops frames at the kit level. There is no error, no delegate callback. You only catch it in playback when the timestamps don't add up.

```swift
let config = SCStreamConfiguration()
config.queueDepth = 24  // was: default 8
```

If your scenario is "always encoding, never just previewing", bump this and add backpressure handling at the encoder side. If you're mixing modes (preview + occasional capture-to-disk), keep `queueDepth` tied to the lifecycle of the encoder — bump it on encode-start, lower it on encode-stop, so you're not paying for buffer headroom you're not using.

## Why this matters beyond cosmetics

If you're feeding the screen capture into anything that processes pixel data (HEVC encoder for recording, AI vision model for analysis, network stream for live demo), those 2-3 bad frames cause:

- **HEVC encoders**: artifact propagation in the next 30-60 frames as the encoder tries to predict from a black reference frame
- **AI vision pipelines**: real-time models producing nonsense outputs ("the user is looking at a black screen") that break downstream agent logic
- **Live network streams**: visible flicker that viewers notice immediately

Skilly captures the screen for an OpenAI Realtime API session — when the lid closes, the model would otherwise see "the user closed everything" and respond with confused output. The fix above is what we ship in production.

## Open questions still

A few things this pattern doesn't solve:

- **Multi-display capture across reconfig**: if you're capturing two displays and one is unplugged, you need to decide which display the stream should switch to. We default to "first available" which works for our use case but isn't always right.
- **Mirror mode transitions**: enabling/disabling display mirroring fires reconfig but the displayID stays the same. The pattern above will rebuild unnecessarily — could be optimized with a flag check.
- **Screensaver dismissal**: macOS sometimes briefly invalidates displays on wake-from-screensaver. Same pattern handles it but the rebuild adds a frame of latency that's noticeable on quick wakes.

## Use Skilly to learn ScreenCaptureKit faster

Skilly is the macOS app that uses this exact pattern in production. Hold Control+Option, ask "how do I do X in Xcode" out loud, and Skilly walks you through whatever code or framework you're learning — voice-first, screen-aware. **15 minutes free, no card.**

The full SCStream-with-reconfig-handling implementation is open source on [github.com/tryskilly/skilly](https://github.com/tryskilly/skilly).
