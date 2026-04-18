#!/usr/bin/env python3
"""Read cookies from Chrome, inject into Playwright's persistent user-data-dir."""
import asyncio
import sys
from pathlib import Path

import browser_cookie3
from patchright.async_api import async_playwright

USER_DATA_DIR = str(Path.home() / ".claude" / "venvs" / "browser-use" / "userdata")

DOMAINS = [
    "uneed.best",
    "devhunt.org",
    "uno.directory",
    "fivetaco.com",
    "peerpush.net",  # already logged in via Playwright; harmless to re-sync
]

async def main():
    # Read cookies from Chrome for each domain
    print(f"🔑 Reading Chrome cookies via browser_cookie3 (Keychain will prompt)...")
    all_cookies = []
    try:
        cj = browser_cookie3.chrome()
    except Exception as e:
        print(f"❌ Failed to read Chrome cookies: {e}", file=sys.stderr)
        print("   macOS may have denied Keychain access. Allow 'Google Chrome Safe Storage' and retry.", file=sys.stderr)
        sys.exit(1)

    for c in cj:
        # browser_cookie3 gives http.cookiejar.Cookie objects
        domain = (c.domain or "").lstrip(".")
        if not any(d == domain or domain.endswith("." + d) for d in DOMAINS):
            continue
        all_cookies.append({
            "name": c.name,
            "value": c.value or "",
            "domain": c.domain,  # keep leading dot if present
            "path": c.path or "/",
            "expires": int(c.expires) if c.expires else -1,
            "httpOnly": bool(getattr(c, "_rest", {}).get("HttpOnly")),
            "secure": bool(c.secure),
            "sameSite": "Lax",
        })

    by_domain = {}
    for c in all_cookies:
        by_domain.setdefault(c["domain"].lstrip("."), 0)
        by_domain[c["domain"].lstrip(".")] += 1

    print(f"📋 Found cookies: {by_domain if by_domain else '(none)'}")
    if not all_cookies:
        print("⚠️  No cookies found for target domains. Are you logged into any of them in Chrome?")
        sys.exit(0)

    # Inject into Playwright persistent context
    async with async_playwright() as pw:
        print(f"🌐 Opening Playwright persistent context at {USER_DATA_DIR}")
        ctx = await pw.chromium.launch_persistent_context(
            USER_DATA_DIR,
            headless=True,  # no window needed
            viewport={"width": 1440, "height": 1000},
        )
        try:
            await ctx.add_cookies(all_cookies)
            print(f"✅ Injected {len(all_cookies)} cookies into Playwright user-data-dir")
        finally:
            await ctx.close()

if __name__ == "__main__":
    asyncio.run(main())
