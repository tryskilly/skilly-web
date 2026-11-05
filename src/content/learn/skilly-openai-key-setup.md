---
title: "Skilly OpenAI API Key Setup (No Credits)"
description: "Create an OpenAI API key with prepaid credits, paste it in Skilly at Settings → Account → API Key, and tell a finished trial from an empty OpenAI balance."
pubDate: 2026-11-03
updatedDate: 2026-11-03
author: "Mohamed Saleh Zaied"
category: how-to
tags:
  - macos
  - openai
  - setup
  - byok
canonicalKeyword: "skilly openai api key setup"
howTo:
  totalTime: "PT10M"
  tools:
    - "An OpenAI account"
    - "Skilly for Mac"
  steps:
    - name: "Open the OpenAI API keys page"
      text: "Sign in at platform.openai.com and open the API keys page. This is the API platform, separate from a ChatGPT subscription."
    - name: "Create a secret key and copy it once"
      text: "Create a secret key on that page. OpenAI shows the full secret only when you create it. Copy it before you close the dialog. If you lose it, create a new key."
    - name: "Add API billing and prepaid credits"
      text: "ChatGPT billing does not pay for API calls. In the API billing overview, add payment details and buy prepaid credits. OpenAI's minimum purchase is $5, and the default amount is $10."
    - name: "Open Skilly Settings, Account, API Key"
      text: "Open Skilly from the menu bar, press the gear button named Settings, stay on the Account tab, and find the API Key section."
    - name: "Paste the key and press Verify & save"
      text: "Paste the full secret into the field (the placeholder reads sk-proj-...) and press Verify & save. Success reads: Key verified — Skilly will use it for all Realtime sessions."
    - name: "Ask once, out loud"
      text: "Hold Control+Option (the default push-to-talk shortcut) and ask a question about the app in front of you. You should hear an answer. The row Using your own OpenAI key means the key is the one in use."
    - name: "Match the out-of-credits message before you pay anyone"
      text: "Trial ended is the 15-minute trial. Limit reached or Out of time is the hosted 3-hour monthly cap. An OpenAI billing error after a verified key means that API account has no prepaid credits."
faq:
  - question: "How do I set up an OpenAI API key for Skilly?"
    answer: "Sign in at platform.openai.com, create a secret key on the API keys page, and copy it immediately. Add payment details and prepaid credits on the API billing overview, because a ChatGPT subscription does not pay for API usage. In Skilly, open the menu bar panel, press the gear button (Settings), stay on Account, paste the key under API Key, and press Verify & save."
  - question: "Where do I paste the API key in Skilly?"
    answer: "Menu bar panel, gear button named Settings, Account tab, section API Key. The field placeholder is sk-proj-.... Press Verify & save. When it works, Skilly shows Using your own OpenAI key and the line Key verified — Skilly will use it for all Realtime sessions. Remove clears the saved key."
  - question: "What if Skilly says there are no credits remaining?"
    answer: "Skilly does not have a screen with that exact title. Match the words you do see. Trial ended — Subscribe to continue, or Free Trial Ended, means the one-time 15-minute trial is over. Limit reached — Upgrade plan, or Out of time, means the hosted plan used its 3 hours for this billing period. If the key already verified and OpenAI then reports credit_balance_exhausted, the API organization has no prepaid credits left. Buy credits on the API billing overview. A ChatGPT plan does not refill that balance."
  - question: "Does Verify & save mean I have OpenAI credit?"
    answer: "No. Verify & save only checks that OpenAI accepts the key. A successful check can still be followed by a failed voice session if the API organization has no prepaid credits. Add credits, wait a few minutes for the balance to update, and try the talk shortcut again."
  - question: "Is bring-your-own-key free?"
    answer: "No. Bring your own OpenAI key is $5/month plus your own OpenAI usage. The hosted plan is $19/month for 3 hours. The only no-card offer is the 15-minute trial on first launch, and that trial does not reset."
  - question: "Does a saved key skip the 15-minute trial?"
    answer: "Yes. Once a key is saved, Skilly starts Realtime sessions directly with OpenAI and the 15-minute hosted trial gate no longer applies. You still pay the $5/month app plan plus OpenAI's charges. Activate plan, under BYOK platform plan in the same API Key section, opens that checkout in the browser. You need to be signed in."
relatedArticles:
  - enable-screen-recording-permission-macos
  - chatgpt-screen-sharing-mac
  - enable-accessibility-permission-macos
  - is-it-safe-to-let-ai-see-your-screen
---

**Quick answer:** create a secret key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys), buy prepaid API credits (a ChatGPT subscription does not pay this bill), then in Skilly open the menu bar panel, press the gear button named **Settings**, stay on **Account**, paste the key under **API Key**, and press **Verify & save**. A saved key is the bring-your-own-key option: **$5/month plus your own OpenAI usage**. It is not free. The 15-minute trial is the only no-card start, and it does not reset.

If Skilly has stopped answering, read the words on screen before you buy anything. **Trial ended** is the trial. **Limit reached** or **Out of time** is the hosted monthly cap. A verified key that still fails is usually an OpenAI account with no prepaid credits.

> Checked November 3, 2026 against [OpenAI's API key help](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key), [prepaid API billing](https://help.openai.com/en/articles/8264644-setting-up-and-managing-prepaid-api-billing), and [ChatGPT vs API billing](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform). Skilly's menus and messages below match the Mac app and this site's [pricing](/pricing/).

## Create the OpenAI key

1. **Sign in on the API platform.** Go to [platform.openai.com](https://platform.openai.com) and use the OpenAI account that should pay for usage. This is not the same place as a chat inside ChatGPT.
2. **Open the API keys page** at [platform.openai.com/api-keys](https://platform.openai.com/api-keys). Create a secret key there. OpenAI shows the full secret only at that moment. Copy it into a password manager, then close the dialog. Lost it? Create another key. Delete a key you do not want with the trash icon on that same page. Do not send the secret in chat, email, or a screenshot.
3. **Turn on API billing.** ChatGPT Free, Go, Plus, and Pro are a separate bill. None of them fund API calls. Open the API organization's billing overview, choose **Add payment details**, and buy prepaid credits. OpenAI's minimum purchase is $5, and the amount it offers first is $10. **Use auto-reload** is on during that setup. Turn it off if you do not want OpenAI to buy more credits on its own. New API accounts use this prepaid balance. Purchased credits expire after one year.

Give a fresh purchase a few minutes. The balance does not always update the instant the payment succeeds.

## Paste it into Skilly

Skilly runs from the Mac menu bar and needs macOS 14.2 or later. [Download Skilly for Mac](/download/) if it is not installed yet. The download page is also where the 15-minute trial starts. No card on that trial.

1. **Open the menu bar panel.**
2. **Press the gear button.** Its name is **Settings**.
3. **Stay on the Account tab.** The other tabs are Voice and General. You want Account.
4. **Find the API Key section.** The field placeholder reads `sk-proj-...`. Paste the full secret. The eye icon shows or hides it.
5. **Press Verify & save.** Skilly checks the key with OpenAI before it keeps it. While that runs, the button reads **Verifying…**.

When the check passes you get two confirmations:

- **Key verified — Skilly will use it for all Realtime sessions.**
- A row that reads **Using your own OpenAI key**, with most of the secret masked.

**Remove** deletes the saved key and sends you back to the empty field.

Skilly stores the key in the app's settings on this Mac. With a key saved, voice sessions start directly at OpenAI, instead of Skilly's servers minting them for you. Skilly still records usage totals for account support and abuse monitoring.

If OpenAI refuses the key, the line is **OpenAI rejected this key. Double-check it on platform.openai.com/api-keys.** Create a new secret and paste that one. The same idea shows up later as **OpenAI rejected your API key (HTTP 401). Open Settings → API Key and paste a valid key from platform.openai.com/api-keys.**

Under a saved key, **BYOK platform plan** has an **Activate plan** button. That opens checkout in the browser for the **$5/month** app plan. You pay OpenAI on top of that, for the minutes you actually talk. This site's pricing estimate for that voice usage is roughly **$0.06–$0.10 per minute**. If checkout does not open, the message is **Could not open checkout. Make sure you're signed in and try again.** Sign in on the Account tab, then press **Activate plan** again.

Prices for the two Mac options, and nothing else: the hosted plan is **$19/month** for 3 hours, and bring-your-own-key is **$5/month plus your OpenAI usage**. Both are on the [pricing page](/pricing/).

## Make sure it actually answers

**Verify & save** only proves OpenAI recognized the key. It does not prove the account has credits. Ask a real question next.

Hold **Control+Option** and talk. That is the default push-to-talk shortcut. The panel also says **Hold Control+Option to talk.** You can change it under **Settings → Voice → Push to talk**. Prefer hands-free? Set **Voice input** to **Live Tutor**. The hint there is **In Live Tutor mode, just start talking. Skilly listens automatically.**

You are done when you hear an answer and the API Key row still says **Using your own OpenAI key**.

Skilly also asks for the microphone, screen recording, screen content, and accessibility the first time you set it up. Screen recording lets it see the app you are asking about. Accessibility lets it point. If either permission is still off, use [Allow screen recording on Mac](/learn/enable-screen-recording-permission-macos/) and [Enable Accessibility on macOS](/learn/enable-accessibility-permission-macos/).

## Trial ended, monthly limit, or no OpenAI credits

People search "skilly no credits remaining" for a few different stoppages. Skilly does not label a screen with those exact words. Use the sentence in the panel.

### The 15-minute trial is over

You will see **Trial ended — Subscribe to continue** on the panel, or a window titled **Free Trial Ended** that says you have used all 15 minutes. The Plan card on **Settings → Account** switches its status to **Trial ended**, and the button reads **Subscribe — $19 / month**.

That trial is 15 minutes of use, once, tied to the account. It does not reset next month. No card was required to start it.

Two ways forward:

- **Hosted plan.** Subscribe from that button. **$19/month** includes 3 hours. You do not manage an API key.
- **Your own key.** Paste it as above. A saved key bypasses the 15-minute trial gate, because those sessions bill your OpenAI account. The app plan for that path is still **$5/month**, plus OpenAI. It is not a $0 mode.

### The hosted 3 hours are used up

The panel says **Limit reached — Upgrade plan**. The Plan card says **Out of time**. The block message is **You've reached your monthly usage limit.** While you still have time, the strip reads **Using … of 3h**, and it warns at **80%+ of limit** (2 hours 24 minutes).

Those 3 hours reset at the end of the billing period shown on the Plan card, not on a rolling 30-day timer. Buying OpenAI credits does not add hosted hours. Sessions on your own key are billed by OpenAI, and those minutes are not added to this 3-hour counter. If the panel already says **Limit reached**, the hosted cap is still what blocks the next turn until the period resets. The key is the bypass for the 15-minute trial, not a top-up for a monthly cap you have already hit.

**Manage subscription** on an active plan opens the billing portal. Cancel anytime from there. You keep access through the end of the period you already paid.

### Your own key is valid, and the OpenAI balance is empty

This is the one that feels like "no credits remaining" after setup succeeded.

**Verify & save** can pass, and the next question can still fail, when the API organization has no prepaid credits. OpenAI's code for that is **credit_balance_exhausted**: no prepaid credits remaining. API requests start returning a billing error. On a bring-your-own-key session, a failed mint comes back as **OpenAI session mint failed**, with OpenAI's own response included.

Fix it on OpenAI's side, not in Skilly's plan card:

1. Open the API billing overview for the organization that owns the key.
2. Choose **Buy credits** or **Add to credit balance**, whichever is on the page.
3. Wait a few minutes, then hold **Control+Option** and ask again.

A ChatGPT subscription still will not fill this balance. If you are looking at the wrong organization's billing page, the purchase will not help the key you pasted.

### No key saved, and the session dies on OpenAI's quota

Skilly treats OpenAI's **insufficient_quota** code as a real failure when the hosted OpenAI credit runs out. That credit is Skilly's, on the hosted trial and the hosted plan. You cannot top it up from your ChatGPT account.

What you can do:

- If the panel says **Trial ended**, paste your own key or subscribe. A saved key bypasses that trial gate.
- If the panel says **Limit reached**, that is the hosted monthly cap. Wait for the reset date on the Plan card, or subscribe if you are not on the hosted plan yet. A key does not refill those 3 hours.
- If there is no trial or limit message, paste your own key and fund that API account. New sessions then run on your key.

**No active subscription found** and **Your subscription has expired** are account-state messages. Subscribe again from the Plan card, or use your own key.

## Ask hands-free, and let it point

Once a session connects, you do not have to describe the screen. Hold **Control+Option** and ask, or leave **Live Tutor** on and just talk. Skilly answers in voice and **points** at the control it means. It points. You still do the step yourself.

Built-in skills that ship with the app are **Blender**, **After Effects**, **Premiere Pro**, **DaVinci Resolve**, and **Figma**. **Houdini** is available as a skill. It is not in that bundled set. The matching skill turns on when that app is the one in front. Skilly also works in other Mac apps without a skill file.

Wondering how that compares with ChatGPT on a Mac, where live screen sharing is a different feature? Read [ChatGPT screen sharing on Mac](/learn/chatgpt-screen-sharing-mac/). Before you leave an API key or a private window on screen, read [Is it safe to let AI see your screen?](/learn/is-it-safe-to-let-ai-see-your-screen/).

## Keep going

- [Skilly pricing](/pricing/): the 15-minute trial, the $19/month hosted plan, and bring-your-own-key at $5/month plus your OpenAI usage.
- [Download Skilly for Mac](/download/): the app these steps assume.
- [Allow screen recording on Mac](/learn/enable-screen-recording-permission-macos/): the permission Skilly needs before it can see the app you are learning.
- [Enable Accessibility on macOS](/learn/enable-accessibility-permission-macos/): the permission that lets Skilly point at a control.
- [ChatGPT screen sharing on Mac](/learn/chatgpt-screen-sharing-mac/): what ChatGPT can see on a Mac, if you were about to use that instead of an API key.
