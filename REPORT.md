# Project Report — kkjj.me Portfolio

**Prepared:** 16 June 2026
**Owner:** Kamalesh VS ([@kkjjkamal123](https://github.com/kkjjkamal123))
**Stack:** React 18 · Vite 4 · Framer Motion
**Status:** Complete and building cleanly (440 modules, ~99 kB gzipped JS)

---

## 1. Summary

A single-page personal portfolio modelled on the look-and-feel of
[landonorris.com](https://www.landonorris.com): dark, full-bleed sections, big typographic hero,
a single bold accent colour, and smooth scroll-triggered motion.

It was built in two phases:

1. **Phase 1 — Foundation.** Scaffolded the React/Vite app and built the core sections (hero, about,
   projects, skills, contact, footer) with a dark theme and an **electric-blue** accent.
2. **Phase 2 — Personalisation.** Wired in the owner's **real GitHub data**, added an animated
   **rocket project spotlight**, rewrote all copy to reflect the owner's actual work (embedded systems,
   computer vision, AI, and rocketry), and added deployment + documentation.

---

## 2. Sections

| # | Section | Highlights |
|---|---------|-----------|
| 1 | **Hero** | Full-screen name in Space Grotesk, animated eyebrow + tagline, two CTAs, scroll indicator, accent glow. |
| 2 | **Featured Rocket** 🚀 | Animated SVG rocket (plasma flame + exhaust glow + float), twinkling starfield, "In Development" badge, three focus cards (Building / Aerodynamics / Telemetry), a live **telemetry preview** panel, and CTA buttons. |
| 3 | **About** | Real bio, "I build things that sense, move and fly" headline, and **live** stats (repos, years, stars). |
| 4 | **Projects** | **Live** GitHub repos with language colours, star counts, a stats strip, a "LIVE" badge, show-all toggle, and the GitHub contribution graph. |
| 5 | **Skills** | Four categories: Languages & Web, AI & Computer Vision, Embedded & Hardware, Aerospace & Tools. |
| 6 | **Contact** | "Let's build something together" + email CTA and GitHub / Email / LinkedIn cards. |
| 7 | **Footer** | Monogram, copyright, GitHub link. |

---

## 3. Live GitHub integration

The defining feature. Implemented in `src/lib/github.js`.

- **`useGitHub()` hook** fetches `users/{user}` and `users/{user}/repos` in parallel on first mount,
  unauthenticated (GitHub allows 60 req/hr per IP — plenty for a personal site).
- **Graceful fallback.** The owner's real profile and top repos are baked in as `FALLBACK_PROFILE` /
  `FALLBACK_REPOS`. If the API is unreachable or rate-limited, the site shows real data anyway — it never
  renders empty. A green **"LIVE"** badge only appears when data actually came from the API.
- **Showcasing heuristic.** `rankRepos()` filters out forks, then sorts described repos first, then by
  stars, then recency — so the flagship **ARM-Bharath-Challenge-2026** (RPi 5 road-anomaly detection,
  43.6 FPS, mAP50 0.982) naturally leads, ahead of trivial repos.
- **Fetched once** in `App.jsx` and passed to `About` and `Projects` as props (no duplicate requests).
- **Contribution graph** is rendered from `ghchart.rshah.org`, tinted to the accent colour, with an
  `onError` handler that hides the panel if the third-party service is down.

---

## 4. The rocket spotlight

The centrepiece, in `src/components/FeaturedRocket.jsx`, built to the brief
"rocket building, aerodynamics, telemetry."

- **Rocket** — hand-drawn SVG (nose cone, body, window, fins, nozzle) with a three-layer animated plasma
  flame (white-hot core → blue), a pulsing exhaust glow, and a continuous gentle float.
- **Starfield** — 40 deterministically-placed twinkling stars (seeded PRNG so the layout is stable across
  renders), with ~1-in-7 tinted to the accent.
- **Telemetry preview** — a panel cycling Altitude / Velocity / Pitch / Roll / Accel.
  **Honesty note:** these are looping illustrative values, explicitly tagged **`PREVIEW`** so they are not
  mistaken for real flight data. Replace with a real feed when the hardware exists.
- **CTAs** — a primary button (Watch the build → demo link, or Follow on GitHub as fallback) plus an
  optional "View code" button. All driven by the `PROJECT.links` object so they light up automatically
  when URLs are added.
- The codename **"Project Apex"** is a placeholder — rename it in the `PROJECT` object.

---

## 5. Design system

Defined as CSS variables in `src/index.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#080808` | page background |
| `--accent` | `#3B82F6` | electric-blue accent |
| `--card` | `#111111` | card surfaces |
| `--text` / `--text-muted` / `--text-dim` | white / `#888` / `#444` | text hierarchy |
| `--border` | `rgba(255,255,255,0.07)` | hairline borders |

- **Type:** Space Grotesk (display/headings) + Inter (body), loaded from Google Fonts with `preconnect`.
- **Motion:** Framer Motion `useInView` for reveal-on-scroll; infinite loops for the flame, stars, float,
  and "LIVE"/telemetry pulses.
- **Responsive:** fluid `clamp()` sizing; the rocket grid collapses below 820 px; nav switches to a
  hamburger below 640 px.

---

## 6. Accessibility & quality notes

- Semantic landmarks (`nav`, `main`, `section`, `footer`), descriptive `alt` on the contribution graph,
  `aria-label` on the menu toggle.
- External links use `target="_blank"` + `rel="noopener noreferrer"`.
- **Possible future improvements:** respect `prefers-reduced-motion` to pause the looping animations;
  add focus-visible outlines on custom buttons; lazy-mount the rocket animations only when in view (the
  telemetry interval already pauses out of view).

---

## 7. Build & deployment

- `npm run build` → **440 modules**, output ~**313 kB raw / ~99 kB gzipped** JS + ~1 kB CSS.
- **Vercel:** zero-config via `vercel.json` (framework `vite`, SPA rewrite).
- **GitHub Pages:** `.github/workflows/deploy.yml` builds and publishes on push to `main`. `vite.config.js`
  reads `VITE_BASE` so the base path stays `/` for the `kkjj.me` custom domain. See `DEPLOY.md`.

---

## 8. File inventory

**Added/created**
- `src/lib/github.js`
- `src/components/FeaturedRocket.jsx`
- `public/favicon.svg`
- `vercel.json`, `.github/workflows/deploy.yml`
- `README.md`, `REPORT.md`, `DEPLOY.md`

**Rewritten**
- `src/App.jsx`, `src/index.css`, `index.html`, `vite.config.js`
- `src/components/`: `Navbar.jsx`, `Hero.jsx`, `About.jsx`, `Projects.jsx`, `Skills.jsx`, `Contact.jsx`, `Footer.jsx`

---

## 9. Open follow-ups for the owner

1. **Rename the rocket** — change `codename` in `FeaturedRocket.jsx` (currently "Project Apex").
2. **Add rocket links** — fill `PROJECT.links.demo` / `.repo` when available.
3. **Replace telemetry preview** with a real feed if/when the rocket streams data.
4. **Confirm the LinkedIn URL** in `Contact.jsx` (currently a generic `linkedin.com`).
5. **Keep the Pages base at `/`** — the repo is deployed on the `kkjj.me` custom domain, so the workflow
   should continue using `VITE_BASE: /`.
