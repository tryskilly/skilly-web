#!/usr/bin/env python3
"""
browser-use-agent — natural-language browser automation with Patchright stealth.

Usage:
    python run_agent.py --task "<goal in English>" [--user-data-dir <path>] [--headless] [--max-steps 40]

Reads OPENAI_API_KEY (or ANTHROPIC_API_KEY) from:
    1. Environment variable
    2. ~/.claude/venvs/browser-use/.env file

Exits non-zero on failure so the caller can detect it.
"""

import argparse
import asyncio
import os
import sys
from pathlib import Path


def load_env():
    """Load API keys from ~/.claude/venvs/browser-use/.env if not already in environment."""
    env_file = Path.home() / ".claude" / "venvs" / "browser-use" / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" not in line:
                continue
            k, v = line.split("=", 1)
            k = k.strip()
            v = v.strip().strip('"').strip("'")
            if k and v and k not in os.environ:
                os.environ[k] = v


async def main():
    load_env()

    ap = argparse.ArgumentParser()
    ap.add_argument("--task", required=True, help="Natural-language goal for the agent")
    ap.add_argument(
        "--user-data-dir",
        default=str(Path.home() / ".claude" / "venvs" / "browser-use" / "userdata"),
        help="Persistent browser profile path (cookies persist across runs)",
    )
    ap.add_argument(
        "--cdp-url",
        default=None,
        help="Connect to an existing Chrome via Chrome DevTools Protocol (e.g. http://localhost:9222). Overrides --user-data-dir.",
    )
    ap.add_argument("--headless", action="store_true", help="Run without visible browser window")
    ap.add_argument("--max-steps", type=int, default=40, help="Max agent steps before giving up")
    ap.add_argument(
        "--allow-file",
        action="append",
        default=[],
        help="File path the agent is allowed to upload. Repeat for multiple files.",
    )
    ap.add_argument(
        "--model",
        default=os.environ.get("BROWSER_USE_MODEL", "gemini-2.5-flash"),
        help="LLM model. Defaults to Google gemini-2.5-flash (vision + free tier). Other: gemini-2.5-pro, gpt-4o-mini (OpenAI), claude-haiku-4-5 (Anthropic).",
    )
    args = ap.parse_args()

    has_openai = bool(os.environ.get("OPENAI_API_KEY"))
    has_anthropic = bool(os.environ.get("ANTHROPIC_API_KEY"))
    has_groq = bool(os.environ.get("GROQ_API_KEY"))
    # Gemini accepts either GEMINI_API_KEY or GOOGLE_API_KEY
    has_gemini = bool(os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY"))
    if not (has_openai or has_anthropic or has_groq or has_gemini):
        print(
            "ERROR: No OPENAI_API_KEY / ANTHROPIC_API_KEY / GROQ_API_KEY / GEMINI_API_KEY found.\n"
            "  Put one in ~/.claude/venvs/browser-use/.env or export it in your shell.",
            file=sys.stderr,
        )
        sys.exit(2)

    # Pick LLM — explicit override via --model, else prefer Gemini (free+vision) → OpenAI → Anthropic → Groq
    llm = None
    model = args.model
    try:
        from browser_use.llm import ChatOpenAI

        # Provider detection from model name. Groq hosts open-source models (`openai/gpt-oss-*`,
        # `moonshotai/kimi-*`), so provider-prefixed names route to Groq.
        ml = model.lower()
        wants_gemini = "gemini" in ml or ml.startswith("models/")
        wants_groq = not wants_gemini and (
            "/" in model
            or "llama" in ml
            or "mixtral" in ml
            or "gemma" in ml
            or "gpt-oss" in ml
            or "kimi" in ml
            or "moonshot" in ml
            or "groq" in ml
        )
        wants_openai = not (wants_groq or wants_gemini) and ("gpt-4" in ml or "gpt-3" in ml or ml in {"o1", "o3"})
        wants_anthropic = "claude" in ml

        # If no explicit wanted provider, default based on available keys
        # (vision-capable providers first since browser-use needs screenshots)
        if not (wants_gemini or wants_groq or wants_openai or wants_anthropic):
            if has_gemini:
                wants_gemini = True; model = "gemini-2.5-flash"
            elif has_openai:
                wants_openai = True; model = "gpt-4o-mini"
            elif has_anthropic:
                wants_anthropic = True; model = "claude-haiku-4-5"
            elif has_groq:
                wants_groq = True  # Warning: Groq free tier is text-only, may not work with browser-use

        if wants_gemini and has_gemini:
            from browser_use.llm import ChatGoogle

            # Use GEMINI_API_KEY if set, else GOOGLE_API_KEY
            gkey = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
            llm = ChatGoogle(model=model, api_key=gkey)
            print(f"🤖 LLM: Google {model}")
        elif wants_groq and has_groq:
            llm = ChatOpenAI(
                model=model,
                base_url="https://api.groq.com/openai/v1",
                api_key=os.environ["GROQ_API_KEY"],
            )
            print(f"🤖 LLM: Groq {model}")
        elif wants_anthropic and has_anthropic:
            from browser_use.llm import ChatAnthropic

            llm = ChatAnthropic(model=model)
            print(f"🤖 LLM: Anthropic {model}")
        elif wants_openai and has_openai:
            llm = ChatOpenAI(model=model)
            print(f"🤖 LLM: OpenAI {model}")
        else:
            raise RuntimeError(f"Model '{model}' requested but matching provider key not set")
    except ImportError as e:
        print(f"ERROR importing LLM wrapper: {e}", file=sys.stderr)
        sys.exit(2)

    # Use patchright browser for Cloudflare/anti-bot resilience
    from browser_use import Agent, BrowserSession

    print(f"🌐 Persistent profile: {args.user_data_dir}")
    print(f"🎯 Task: {args.task[:200]}{'...' if len(args.task) > 200 else ''}")
    print(f"🖥️  Headless: {args.headless}")
    print()

    # CDP mode: attach to an existing Chrome via remote-debugging-port.
    # Persistent-context mode: launch Playwright's Chromium with its own user-data-dir.
    if args.cdp_url:
        print(f"🔌 Connecting via CDP to {args.cdp_url}")
        session = BrowserSession(cdp_url=args.cdp_url, is_local=False)
    else:
        session = BrowserSession(
            user_data_dir=args.user_data_dir,
            headless=args.headless,
            viewport={"width": 1440, "height": 1100},
        )

    agent_kwargs = dict(
        task=args.task,
        llm=llm,
        browser_session=session,
        max_actions_per_step=5,
    )
    if args.allow_file:
        agent_kwargs["available_file_paths"] = args.allow_file
        print(f"📎 Allowed file uploads: {args.allow_file}")
    agent = Agent(**agent_kwargs)

    try:
        result = await agent.run(max_steps=args.max_steps)
        print("\n=== AGENT RESULT ===")
        print(result if result is not None else "(no result returned)")
        return 0
    except Exception as e:
        print(f"\n❌ Agent error: {type(e).__name__}: {e}", file=sys.stderr)
        return 1
    finally:
        try:
            await session.kill()
        except Exception:
            pass


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
