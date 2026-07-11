# Editing Guide

This guide shows you exactly where to edit your portfolio content. Each section corresponds to a file and the specific `const` to modify.

---

## Hero Section (`src/components/Hero.jsx`)

**Marquee role words** — Edit the `ROLES` array (line 8):
```js
const ROLES = ['EMBEDDED SYSTEMS', 'COMPUTER VISION', 'ARTIFICIAL INTELLIGENCE', 'AEROSPACE', 'ROBOTICS']
```

**Data strip stats** — Edit the `DATA_STRIP` array (line 10). Each entry has a `value` (number/text) and `label`:
```js
const DATA_STRIP = [
  { value: '43.6', label: 'FPS · Edge CV on RPi 5' },
  { value: '0.982', label: 'mAP50 · YOLOv8n-OBB' },
  // ... etc
]
```

**Tagline paragraph** — The main tagline is embedded in JSX around line 178. Search for "I build things that" and update the text, key words, and accent highlights directly in the component.

**EST. 2006 tag** — The year next to your name is hardcoded on line 159 as `EST. 2006`. Change the year here.

**Metadata row labels** — Three lines of small text in the hero header (line 90–92):
- `Portfolio / 2026` — left side
- `Available for collaboration` — middle (always has an accent dot)
- `IND · Earth · LEO-curious` — right side

---

## Trajectory / Flight Log (`src/components/Trajectory.jsx`)

**Timeline milestones** — Edit the `LOG` array (line 7). Add, remove, or update entries with `{year, title, detail}`:
```js
const LOG = [
  { year: '2006', title: 'Established', detail: 'Came online...' },
  { year: '2020', title: 'First commit', detail: 'Joined GitHub...' },
  // Add your entries here
]
```

This is **THE place** to add life milestones, project launches, and career highlights. The timeline renders newest at the bottom.

---

## Featured Rocket Spotlight (`src/components/FeaturedRocket.jsx`)

**Project details** — Edit the `PROJECT` const at the top (line 8). All fields are clearly commented:
```js
const PROJECT = {
  codename: 'Project Apex',                    // Your rocket's name
  tagline: 'Designing, building, and...',      // One-liner pitch
  description: 'A hands-on aerospace build...', // Full description (shows in card)
  focus: [
    { title: 'Rocket Building', detail: '...', icon: 'build' },
    { title: 'Aerodynamics', detail: '...', icon: 'aero' },
    { title: 'Telemetry', detail: '...', icon: 'telem' },
  ],
  status: 'In Development',                    // Status badge
  links: {
    demo: '',                                  // YouTube or build-log URL (optional)
    repo: 'https://github.com/...',            // GitHub repo link
    follow: 'https://github.com/...',          // Fallback CTA (always shown)
  },
}
```

---

## About Section (`src/components/About.jsx`)

**Bio paragraphs** — Two paragraphs of text around lines 74–84. Search for:
- `I'm Kamalesh VS — a builder working where...` (first paragraph, line 75–76)
- `My work spans real-time road-anomaly...` (second paragraph, line 79–83)

Stats (public repos, years building, stars) are **auto-pulled from GitHub** — no manual entry needed.

---

## Skills Section (`src/components/Skills.jsx`)

**Skill categories and items** — Edit the `categories` array (line 6). Each entry has a `label` and `skills` array:
```js
const categories = [
  {
    label: 'Languages & Web',
    skills: ['Python', 'C++', 'JavaScript', 'HTML / CSS'],
    dir: 'normal',
  },
  {
    label: 'AI & Computer Vision',
    skills: ['YOLOv8', 'OpenCV', 'PyTorch', ...],
    dir: 'reverse',  // alternate direction for visual flow
  },
  // ... more categories
]
```

Add, remove, or reorder categories and skills as needed. The `dir: 'normal'` or `'reverse'` controls marquee scroll direction.

---

## Contact Links (`src/components/Contact.jsx`)

**Social media** — Edit the `socials` array (line 6). Each entry is a social link with `name`, `handle`, `url`, and an SVG `icon`:
```js
const socials = [
  {
    name: 'GitHub',
    handle: '@kkjjkamal123',
    url: 'https://github.com/kkjjkamal123',
    icon: <svg>...</svg>,
  },
  // ... more socials
]
```

Update the `name`, `handle`, `url` for your accounts. You can also add new social links following the same pattern (find an SVG icon and paste it in).

---

## Footer (`src/components/Footer.jsx`)

**Multilingual marquee** — Edit the `PHRASES` array (line 4) to customize the bottom scrolling tagline:
```js
const PHRASES = [
  "LET'S CREATE SOMETHING AWESOME",  // English
  "让我们创造伟大的事物",             // Chinese
  "CONSTRUISONS QUELQUE CHOSE DE GRAND", // French
  // ... add or replace phrases
]
```

Each phrase scrolls in an infinite loop. Keep them short (one line) for best layout.

---

## GitHub Integration (`src/lib/github.js`)

**GitHub username** — Line 3: `export const GH_USER = 'kkjjkamal123'`

Change this to pull your repos, stats, and profile live from GitHub.

**Fallback data** — Lines 23–32 (FALLBACK_PROFILE) and 34+ (FALLBACK_REPOS) store snapshot data in case GitHub API is unreachable. Update these if you want a custom offline fallback (most users keep them as-is).

**Language colors** — Lines 7–19 (LANG_COLORS) map programming languages to brand colors. Edit if you want custom repo badge colors.

---

## Design Tokens (`src/index.css`)

**Accent color tokens** — In the `:root` block (lines 10–39), the portfolio is themed around electric cobalt blue. To change accents:
- `--accent: #4d84ff` — primary accent color
- `--accent-fill: #2e6bff` — button/highlight fill
- `--accent-glow: rgba(46, 107, 255, 0.22)` — glow/shadow color
- `--accent-dim: rgba(77, 132, 255, 0.1)` — dimmed overlay
- `--grid-line: rgba(77, 132, 255, 0.07)` — blueprint grid
- `--watermark-stroke: rgba(122, 158, 255, 0.13)` — section numerals + watermarks

Update these six values to match your brand. Then **repeat them in the `[data-theme="light"]` block** (lines 41–65) with light-theme versions.

**Font families** — Line 26–27:
- `--display: 'Anton', 'Arial Narrow', sans-serif` — giant headings (Google Fonts, already loaded)
- `--body: 'General Sans', 'Inter', system-ui, sans-serif` — body text (Fontshare, already loaded)
- `--mono: ui-monospace, 'SF Mono', ...` — system monospace (no change needed)

Font files are loaded from `<link>` tags in `index.html`. Swap the @import URLs there if you want different fonts.

---

## Page Meta (`index.html`)

**Page title** — Inside `<head>`, change the `<title>` tag.

**Meta description** — Change the `content` attribute of `<meta name="description">`.

**Open Graph tags** — Update `og:title`, `og:description`, `og:image`, `og:url` for social sharing.

**Theme color** — Change `<meta name="theme-color">` to match your accent color (mobile browser bar).

---

## Quick Reference

| What | File | Const/Location |
|------|------|---|
| Hero marquee words | `Hero.jsx` | `ROLES` (line 8) |
| Hero stats strip | `Hero.jsx` | `DATA_STRIP` (line 10) |
| Timeline milestones | `Trajectory.jsx` | `LOG` (line 7) |
| Rocket project details | `FeaturedRocket.jsx` | `PROJECT` (line 8) |
| Bio paragraphs | `About.jsx` | Lines 75–83 |
| Skill categories | `Skills.jsx` | `categories` (line 6) |
| Social links | `Contact.jsx` | `socials` (line 6) |
| Footer taglines | `Footer.jsx` | `PHRASES` (line 4) |
| GitHub username | `github.js` | `GH_USER` (line 3) |
| Accent color | `index.css` | `:root` & `[data-theme="light"]` |

---

## Workflow

1. **Edit** one of the above files in your code editor.
2. **Preview** locally: `npm run dev` → http://localhost:5173
3. **Check** for typos, formatting, and visual alignment.
4. **Lint & build**: `npm run lint && npm run build`
5. **Push** to GitHub — the site auto-deploys via Actions.

If anything looks broken, open the browser DevTools (F12) and check the Console for errors.
