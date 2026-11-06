# kkjj.me

A fast, dark developer portfolio for Kamalesh VS, inspired by [landonorris.com](https://www.landonorris.com).
Built with **React + Vite** and **Framer Motion**, with a live **GitHub integration**, a **Model Rocket V1**
spotlight and an editorial design: giant Anton headings, glass panels and electric cobalt accents.

> Live site: https://kkjj.me · Local preview: `npm run dev` → http://localhost:5173

---

## ✨ Features

- **Mission-control hero**: blueprint grid, HUD corner brackets, a parallax "BUILD" watermark that drifts
  against the cursor, a stats strip and a role marquee.
- **Preloader** with a percentage counter, shown once per browser session. The page is revealed as its
  curtain lifts.
- **Kinetic typography**: per-word (`RevealText`) and per-character (`SplitReveal`) mask reveals.
- **Magnetic buttons**, **3D tilt** on cards, **marquee tickers**, a scroll-progress bar and a scroll-spy
  nav pill.
- **Trajectory timeline** with a scroll-linked rail that fills as you read down it.
- **Model Rocket V1 spotlight** with an animated side-elevation line drawing (nose cone, recovery,
  avionics, motor mount, three fins, CG/CP).
- **Live GitHub integration**: profile and repos from the GitHub API, cached for the session, with a
  baked-in snapshot as fallback so it never renders empty. A green "LIVE" badge only shows for live data.
- **Contribution heatmap** drawn natively in the site's palette for both themes.
- **Light and dark themes** (follows the OS until you pick one, no flash on load) and an **animation
  toggle** that respects `prefers-reduced-motion`.
- **Accessible**: skip link, real anchors in the nav, focus management in the mobile menu, screen-reader
  text for animated headings, WCAG AA contrast for small text in both themes.
- **Hardened**: a Content-Security-Policy is injected at build time (inline script allowed by hash),
  plus security headers on Vercel. Storage access never throws, so blocked cookies can't blank the page.
- **SEO**: Open Graph / Twitter meta, JSON-LD `Person`, canonical URL, `robots.txt`, `sitemap.xml` and a
  real 404 page.

---

## 🧱 Tech stack

| Layer         | Choice |
|---------------|--------|
| Framework     | React 18 |
| Build tool    | Vite 8 (Rolldown) |
| Animation     | Framer Motion (`LazyMotion`, features loaded in a separate chunk) |
| Scrolling     | Native browser scrolling (no smooth-scroll library) |
| Fonts         | Anton (headings) and General Sans (body), **self-hosted** in `public/fonts`; system monospace for labels |
| Data          | GitHub REST API (live, no key) |
| Contributions | `github-contributions-api.jogruber.de` (public proxy of the GitHub calendar) |
| Tests         | Vitest |

---

## 🚀 Quick start

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:5173
npm run lint     # ESLint, zero warnings allowed
npm test         # unit tests (Vitest)
npm run build    # production build → dist/
npm run preview  # serve the production build at http://localhost:5173
npm run check    # lint + test + build, the same gate CI runs
```

> Requires Node 20.19+ or 22.12+ (Vite 8's minimum). CI uses Node 24.

---

## 📁 Project structure

```
mysite/
├── public/
│   ├── CV.pdf, favicon.svg, CNAME
│   ├── fonts/                     # self-hosted Anton + General Sans (woff2)
│   ├── 404.html                   # static not-found page
│   └── robots.txt, sitemap.xml
├── src/
│   ├── lib/
│   │   ├── github.js              # live GitHub hook, fallback snapshot, ranking, description overrides
│   │   ├── scroll.js              # scrollToId, parallax, pause-offscreen helpers
│   │   ├── storage.js             # localStorage/sessionStorage that never throws
│   │   └── motion-features.js     # Framer Motion features, lazy-loaded
│   ├── components/
│   │   ├── Navbar.jsx             # pill nav, scroll-spy, theme/animation toggles, mobile menu
│   │   ├── Hero.jsx               # name, tagline, CTAs, stats strip, role marquee
│   │   ├── About.jsx              # bio + bento grid of live stats
│   │   ├── Trajectory.jsx         # timeline (LOG array)
│   │   ├── FeaturedRocket.jsx     # rocket spotlight (PROJECT object)
│   │   ├── RocketBlueprint.jsx    # animated rocket line drawing
│   │   ├── Projects.jsx           # repo index + GitHub stats
│   │   ├── ContributionGraph.jsx  # contribution heatmap
│   │   ├── Skills.jsx             # skill marquees (categories array)
│   │   ├── Contact.jsx            # email CTA + social links
│   │   ├── Footer.jsx             # multilingual marquee + credits
│   │   ├── Preloader.jsx, Cursor.jsx, ScrollProgress.jsx
│   │   ├── ThemeToggle.jsx, AnimationToggle.jsx, AnimationContext.jsx
│   │   └── Magnetic.jsx, Tilt.jsx, Marquee.jsx, Orbs.jsx, Counter.jsx, RevealText.jsx, SplitReveal.jsx
│   ├── App.jsx                    # composes sections, fetches GitHub once
│   ├── index.css                  # design tokens (CSS variables), glass system, shared classes
│   └── main.jsx
├── tests/site.test.js             # Vitest suite
├── .github/workflows/deploy.yml   # GitHub Pages CI (lint → test → build → deploy)
├── vercel.json                    # Vercel config + security headers
├── vite.config.js                 # build config + CSP injection
├── CHANGELOG.md
├── EDITING.md                     # where to change every piece of content
├── DEPLOY.md                      # deployment guide
└── PUSH.txt                       # how to push a new version
```

`Figure.jsx`, `ScrambleText.jsx`, `ParticleWave.jsx` and `ShapeParticles.jsx` are kept for later use but
aren't imported, so they don't end up in the bundle.

---

## 🎛️ Customization

| What | Where |
|------|-------|
| **Rocket name, tagline, focus areas, links** | `PROJECT` in `src/components/FeaturedRocket.jsx` |
| **Timeline** | `LOG` in `src/components/Trajectory.jsx` |
| **GitHub username** | `GH_USER` in `src/lib/github.js` |
| **Pinned / hidden repos, description overrides** | `PINNED_REPOS`, `HIDDEN_REPOS`, `DESCRIPTION_OVERRIDES` in `src/lib/github.js` |
| **Accent colour and theme** | `:root` and `[data-theme="light"]` in `src/index.css` |
| **Bio** | `src/components/About.jsx` |
| **Skills** | `categories` in `src/components/Skills.jsx` |
| **Contact links** | `socials` in `src/components/Contact.jsx` |
| **Page title / meta** | `index.html` |
| **Allowed third-party origins (CSP)** | `CSP_DIRECTIVES` in `vite.config.js` |

Full details: **[EDITING.md](./EDITING.md)**.

---

## 📦 Deployment

See **[DEPLOY.md](./DEPLOY.md)**. Short version: pushing to `main` runs the GitHub Actions workflow,
which lints, tests, builds and publishes to GitHub Pages at `kkjj.me`. Vercel works as a fallback.

---

## 📝 License

MIT License. See [LICENSE](./LICENSE).
