---
name: verify
description: Build/launch/drive recipe for the Hunter's Guild Next.js portfolio
---

## Build & launch

```bash
npx tsc --noEmit          # typecheck
npx eslint .               # lint
npm run build               # next build --turbopack, prerenders all routes
npm run dev &                # dev server on http://localhost:3000
```

No `.env.local` in this repo by default — the contact form always takes
the `not_configured` path (amber notice) unless `RESEND_API_KEY` or
SMTP vars are set. That's expected, not a bug.

## Driving it

No Playwright/browser MCP tool is registered in this environment.
Chromium is already cached at `~/Library/Caches/ms-playwright`
(`npx playwright install chromium --dry-run` confirms without
re-downloading). The `playwright` npm package itself is **not** a
project dependency and isn't installed globally — install it into the
scratchpad dir (not this repo) and run scripts from there:

```bash
cd <scratchpad-dir> && npm init -y && npm install playwright@1.61.1
node script.mjs   # import { chromium } from "playwright"; chromium.launch()
```

Useful checks seen to matter on this codebase:
- GSAP `RevealOnScroll`/ScrollTrigger content needs `page.waitForTimeout(1000-1500)`
  after `networkidle` before it's safe to assert on — it doesn't fire on
  `fullPage` screenshots alone (see project memory: hunters-guild-phase2-notes).
- Icons built via `EngravedIcon` intentionally render the child SVG **twice**
  in the DOM (`.engrave-shadow` + `.engrave-face` layers) — don't mistake
  that for a duplication bug when asserting `svg` counts.
- To check an icon actually rendered (not just present in JSX), assert
  `getBoundingClientRect().width > 0` on the `<svg>`, not just `querySelector` truthiness —
  passing a component reference instead of `<Component />` as a child renders
  nothing but doesn't throw, so a plain existence check would false-pass.
