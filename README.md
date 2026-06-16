# kkjjkamal123.github.io

A fast, dark, single-page developer portfolio inspired by [landonorris.com](https://www.landonorris.com).
Built with **React + Vite** and **Framer Motion**, featuring a live **GitHub integration** and an animated
**rocket project spotlight** (building · aerodynamics · telemetry).

> Live preview locally: `npm run dev` → http://localhost:5173

---

## ✨ Features

- **Animated rocket spotlight** — SVG rocket with a blue-plasma flame, a twinkling starfield, focus-area
  cards, and a looping **telemetry preview panel** (clearly tagged `PREVIEW` — illustrative, not real flight data).
- **Live GitHub integration** — pulls your real profile + repos from the GitHub API on load, with your data
  baked in as a fallback so it never breaks or rate-limits. Shows a stats strip, language-coloured repo cards,
  star counts, a "LIVE" badge, and your contribution graph.
- **Scroll-triggered animations** throughout via Framer Motion's `useInView`.
- **Fully responsive** with a frosted-glass navbar and a mobile hamburger menu.
- **SEO + social ready** — Open Graph / Twitter meta tags, SVG favicon, theme color.
- **Zero CSS framework** — design tokens live in CSS variables; components are styled inline.

---

## 🧱 Tech stack

| Layer         | Choice                          |
|---------------|---------------------------------|
| Framework     | React 18                        |
| Build tool    | Vite 4                          |
| Animation     | Framer Motion                   |
| Fonts         | Space Grotesk + Inter (Google)  |
| Data          | GitHub REST API (live, no key)  |
| Contrib graph | ghchart.rshah.org               |

---

## 🚀 Quick start

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

> Requires Node 18+. (Vite 4 is pinned because the environment runs Node 18.)

---

## 📁 Project structure

```
portfolio/
├── public/
│   └── favicon.svg            # rocket favicon
├── src/
│   ├── lib/
│   │   └── github.js          # live GitHub fetch hook + fallback data + helpers
│   ├── components/
│   │   ├── Navbar.jsx         # fixed nav, frosted on scroll, mobile menu
│   │   ├── Hero.jsx           # full-screen intro
│   │   ├── FeaturedRocket.jsx # 🚀 animated rocket + telemetry spotlight
│   │   ├── About.jsx          # bio + live stats
│   │   ├── Projects.jsx       # live GitHub repos + stats + contribution graph
│   │   ├── Skills.jsx         # skill categories
│   │   ├── Contact.jsx        # contact + social links
│   │   └── Footer.jsx
│   ├── App.jsx                # composes sections, fetches GitHub once
│   ├── index.css             # design tokens (CSS variables) + resets
│   └── main.jsx
├── .github/workflows/deploy.yml  # GitHub Pages CI
├── vercel.json                   # Vercel config
├── vite.config.js
├── REPORT.md                  # full project report
└── DEPLOY.md                  # deployment guide
```

---

## 🎛️ Customization

| What | Where |
|------|-------|
| **Rocket name, tagline, focus areas, demo/repo links** | `PROJECT` object at the top of `src/components/FeaturedRocket.jsx` |
| **GitHub username** | `GH_USER` in `src/lib/github.js` |
| **Accent colour** | `--accent` in `src/index.css` (plus a few literal `#3B82F6` values in the rocket SVG and the contribution-graph URL in `Projects.jsx`) |
| **Bio / About copy** | `src/components/About.jsx` |
| **Skills** | `categories` array in `src/components/Skills.jsx` |
| **Contact links** | `socials` array in `src/components/Contact.jsx` |
| **Page title / meta** | `index.html` |

### Adding the rocket repo / demo

When the rocket project goes public, open `src/components/FeaturedRocket.jsx` and fill in:

```js
links: {
  demo: 'https://youtu.be/...',                  // shows a "Watch the build" button
  repo: 'https://github.com/kkjjkamal123/rocket', // shows a "View code" button
  follow: 'https://github.com/kkjjkamal123',
}
```

It will also appear automatically in the Projects grid once it's a public repo on your GitHub.

---

## 📦 Deployment

See **[DEPLOY.md](./DEPLOY.md)** for full instructions. Short version:

- **Vercel** — import the repo; zero config (uses `vercel.json`).
- **GitHub Pages** — push to `main`; the included workflow builds and deploys automatically.

---

## 📝 License

Personal project — all rights reserved by Kamalesh VS unless stated otherwise.
