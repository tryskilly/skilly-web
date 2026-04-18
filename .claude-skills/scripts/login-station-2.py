#!/usr/bin/env python3
"""Login station for Uneed, DevHunt, uno.directory, FiveTaco."""
import asyncio
from pathlib import Path
from patchright.async_api import async_playwright

USER_DATA_DIR = str(Path.home() / ".claude" / "venvs" / "browser-use" / "userdata")

SITES = [
    ("Uneed (DR 74)",      "https://www.uneed.best/sign-up"),
    ("DevHunt (DR 58)",    "https://devhunt.org/sign-up"),
    ("uno.directory (DR 55)", "https://uno.directory/signup"),
    ("FiveTaco (DR 54)",   "https://fivetaco.com/signup"),
]

async def main():
    async with async_playwright() as pw:
        ctx = await pw.chromium.launch_persistent_context(
            USER_DATA_DIR,
            headless=False,
            viewport={"width": 1440, "height": 1000},
        )
        first = True
        for name, url in SITES:
            pg = ctx.pages[0] if (first and ctx.pages) else await ctx.new_page()
            first = False
            try:
                await pg.goto(url, wait_until="domcontentloaded", timeout=20000)
                print(f"🗂️  {name}  →  {url}")
            except Exception as e:
                print(f"⚠️  {name}: {e}")
        print()
        print("═══════════════════════════════════════════════════════════════")
        print("  SIGN UP on each tab using eng.mohamedszaied@gmail.com")
        print("  Email + password works best (no magic-link URL dance).")
        print("  When done on all tabs, CLOSE the browser window.")
        print("═══════════════════════════════════════════════════════════════")
        try:
            await asyncio.wait_for(ctx.wait_for_event("close"), timeout=1800)
        except Exception:
            pass
        try:
            await ctx.close()
        except Exception:
            pass
        print("✅ Browser closed. Cookies persisted.")

if __name__ == "__main__":
    asyncio.run(main())
