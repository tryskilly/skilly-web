#!/usr/bin/env python3
"""Single-site login station for Uneed."""
import asyncio
from pathlib import Path
from patchright.async_api import async_playwright

USER_DATA_DIR = str(Path.home() / ".claude" / "venvs" / "browser-use" / "userdata")

async def main():
    async with async_playwright() as pw:
        ctx = await pw.chromium.launch_persistent_context(
            USER_DATA_DIR,
            headless=False,
            viewport={"width": 1440, "height": 1000},
        )
        pg = ctx.pages[0] if ctx.pages else await ctx.new_page()
        await pg.goto("https://www.uneed.best/sign-up", wait_until="domcontentloaded", timeout=20000)
        print("🗂️  Uneed sign-up tab opened")
        print()
        print("═══════════════════════════════════════════════════════════════")
        print("  SIGN UP on Uneed in this window")
        print("  Email: eng.mohamedszaied@gmail.com")
        print("  Pick a password you'll remember.")
        print()
        print("  If Uneed sends a verification email:")
        print("  1) Open your email")
        print("  2) RIGHT-CLICK the verification link → Copy Link Address")
        print("  3) PASTE into this Playwright tab's address bar → Enter")
        print()
        print("  When you're fully logged in (see your dashboard / account),")
        print("  CLOSE the browser window. Cookies save automatically.")
        print("═══════════════════════════════════════════════════════════════")
        try:
            await asyncio.wait_for(ctx.wait_for_event("close"), timeout=1800)
        except Exception:
            pass
        try:
            await ctx.close()
        except Exception:
            pass
        print("✅ Window closed, cookies persisted.")

if __name__ == "__main__":
    asyncio.run(main())
