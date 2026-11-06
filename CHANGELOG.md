# Changelog

All notable changes to kkjj.me. Versions follow `package.json`.

## [1.0.0] - 2026-11-06

First versioned release (`package.json` was at `0.0.0`).

### Fixed
- **Blank page with site data blocked.** With cookies/storage blocked (Safari "Block all cookies", some
  in-app browsers), reading `localStorage`/`sessionStorage` threw during the first render. All storage
  access now goes through `src/lib/storage.js`, which can't throw.
- The animation preference was saved on first load, which pinned the default. A visitor who later
  enabled "Reduce motion" in their OS still got full animation. Only an explicit toggle is stored now.
- Timeline "NOW" entry still showed the placeholder "Project Apex" with a "live downlink". It now matches
  the real Model Rocket V1 (IMU + barometer flight log).
- MDView's GitHub description omits the macOS app added in 1.2. The site overrides it
  (`DESCRIPTION_OVERRIDES`).
- Fallback GitHub snapshot refreshed (Nov 2026: Ultstat description, follower counts, dates).
- "Pulled live from GitHub" no longer shows when the fallback data is on screen.
- Skill typos: "Flightcontrollers" → "Flight Controllers", "Solidworks" → "SolidWorks".
- Light theme: the "LIVE" badge (2.1:1) and the rocket status chip (1.3:1) failed contrast. They now
  use theme tokens at 4.6:1 and 5.7:1.

### Security
- Content-Security-Policy injected into the built `index.html`, so it also applies on GitHub Pages. The
  inline theme script is allowed by a SHA-256 hash computed at build time.
- `vercel.json`: `frame-ancestors 'none'`, `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, HSTS.
- Vite 8.3.1 → 8.3.6, fixing the dev-server advisories (GHSA-9jrq-w75r-8gcw, GHSA-rq7h-c2jc-7f22,
  GHSA-vfpm-58rq-9qcg, launch-editor). `npm audit` is clean.

### Performance
- Page revealed as the preloader curtain lifts, not after it, and the hero watermark fade shortened.
  Largest Contentful Paint on a local production build: 2.7 s → 2.0 s first visit, 1.8 s → 1.0 s on
  repeat visits.
- `immutable` caching for hashed `/assets/` and 30-day caching for `/fonts/` on Vercel.

### Accessibility
- Nav items are real `#anchor` links with `aria-current="location"`, so they can be copied, middle-clicked
  and crawled.
- Mobile menu moves focus to its first link on open and returns it to the menu button on Escape.
- Animation toggle exposes its state with `aria-pressed`. The "show all projects" button uses
  `aria-expanded`.
- Decorative icons hidden from screen readers. Star counts have screen-reader text.

### Added
- Native contribution heatmap in the site palette, replacing the third-party PNG.
- Animated Model Rocket V1 line drawing in the rocket section.
- Scroll-linked rail on the timeline.
- `public/404.html`, `robots.txt` and `sitemap.xml`. Removed the catch-all rewrite that turned every bad
  URL into a soft 404.
- Open Graph `site_name`/`locale`/`image:alt`, `twitter:image` and JSON-LD `affiliation`.
- Vitest suite (`npm test`, 11 tests) and `npm run check`. CI now lints and tests before it builds.
- `engines` field (Node 20.19+ / 22.12+, Vite 8's minimum).

### Docs
- README, EDITING, DEPLOY, PUSH and OPTIMIZATION rewritten to match the code. They still described
  Lenis, a film-grain overlay, Google-hosted fonts, a telemetry panel and "Project Apex", none of which
  exist anymore.
