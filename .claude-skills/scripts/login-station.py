#!/usr/bin/env python3
"""
Login station for the browser-use persistent user-data-dir.
Opens a single Chromium window with multiple tabs so user can sign up / log in.
Cookies persist across subsequent agent runs.
"""
import asyncio
from pathlib import Path
from patchright.async_api import async_playwright

USER_DATA_DIR = str(Path.home() / ".claude" / "venvs" / "browser-use" / "userdata")

SITES = [
    ("Uneed",    "https://www.uneed.best/sign-up"),
    ("peerpush", "https://peerpush.net/register"),
    ("DevHunt",  "https://devhunt.org/sign-in"),
    ("uno.directory", "https://uno.directory/login"),
    ("FiveTaco", "https://fivetaco.com/login"),
]

async def main():
    async with async_playwright() as pw:
        ctx = await pw.chromium.launch_persistent_context(
            USER_DATA_DIR,
            headless=False,
            viewport={"width": 1440, "height": 1000},
        )
        # Open one tab per site
        first = True
        for name, url in SITES:
            if first:
                pg = ctx.pages[0] if ctx.pages else await ctx.new_page()
                first = False
            else:
                pg = await ctx.new_page()
            try:
                await pg.goto(url, wait_until="domcontentloaded", timeout=20000)
                print(f"🗂️  Tab: {name}  →  {url}")
            except Exception as e:
                print(f"⚠️  {name}: {e}")

        print()
        print("═══════════════════════════════════════════════════════════════")
        print("  LOGIN STATION IS OPEN")
        print("═══════════════════════════════════════════════════════════════")
        print("  Sign up / log in on each tab in the Playwright window.")
        print("  Your email: eng.mohamedszaied@gmail.com")
        print()
        print("  For magic links:")
        print("  1) Enter email → request magic link")
        print("  2) Open the email in Gmail (any browser)")
        print("  3) COPY the magic-link URL (right-click → Copy Link Address)")
        print("  4) PASTE into the Playwright tab's address bar, press Enter")
        print("  5) You'll land on the logged-in state in THIS window")
        print()
        print("  When all tabs are logged in, CLOSE the browser window.")
        print("  Cookies are saved automatically to the shared user-data-dir.")
        print("  (Window will auto-close after 20 minutes if you forget.)")
        print("═══════════════════════════════════════════════════════════════")

        # Wait up to 20 minutes, or until user closes the context
        try:
            await asyncio.wait_for(ctx.wait_for_event("close"), timeout=1200)
        except (asyncio.TimeoutError, Exception):
            pass
        try:
            await ctx.close()
        except Exception:
            pass
        print("✅ Browser closed. Cookies persisted.")

if __name__ == "__main__":
    asyncio.run(main())
