# Editing Guide

Where to change every piece of content on the site. Each section names the file and the `const` (or the
text to search for). Line numbers are left out on purpose because they drift. Search for the name instead.

---

## Hero (`src/components/Hero.jsx`)

**Marquee role words**: the `ROLES` array.
```js
const ROLES = ['EMBEDDED SYSTEMS', 'COMPUTER VISION', 'ARTIFICIAL INTELLIGENCE', 'AEROSPACE', 'ROBOTICS']
```

**Stats strip**: the `DATA_STRIP` array. Each entry has a `value` and a `label`:
```js
const DATA_STRIP = [
  { value: 'ECE', label: 'Undergrad · Chennai, India' },
  { value: '05+', label: 'Disciplines · One builder' },
  { value: '2006', label: 'Taking things apart since' },
  { value: '2020', label: 'First commit' },
]
```

**Metadata row** (the three small labels above the name): search for `Chennai, India`,
`Looking for internships` and `ECE undergrad`.

**Tagline**: search for `I build things that have to work outside the lab`.

---

## Timeline (`src/components/Trajectory.jsx`)

The `LOG` array. Add, remove or update `{ year, title, detail }` entries. The newest goes at the bottom,
and a `year` of `'NOW'` gets the highlighted node.

---

## Rocket spotlight (`src/components/FeaturedRocket.jsx`)

The `PROJECT` object at the top:
```js
const PROJECT = {
  codename: 'Model Rocket V1',  // first word plain, the rest in the accent colour
  tagline: '…',
  description: '…',
  focus: [ { title, detail, icon: 'build' | 'aero' | 'telem' }, … ],
  status: 'In progress',
  links: {
    demo: '',     // YouTube / build-log URL: adds a "Watch the build" button
    repo: 'https://github.com/kkjjkamal123/Model-Rocket-V1',
    follow: 'https://github.com/kkjjkamal123',  // fallback CTA
  },
}
```

The line drawing beside it is `src/components/RocketBlueprint.jsx`. The callout labels are in
`CALLOUTS`, and the drawing deliberately carries no dimensions.

---

## About (`src/components/About.jsx`)

Bio paragraphs: search for `I&apos;m Kamalesh`. Public repos, years building and stars come from
GitHub automatically.

---

## Skills (`src/components/Skills.jsx`)

The `categories` array. Each entry has a `label`, a `skills` list, and `dir: 'normal' | 'reverse'` for
the marquee direction.

---

## Contact (`src/components/Contact.jsx`)

The `socials` array: `{ name, handle, url, icon }`. The email button uses the entry named `Email`.
The navbar has its own GitHub/LinkedIn icons in `SOCIALS` in `src/components/Navbar.jsx`, and the mobile
menu repeats the links further down that file.

---

## Footer (`src/components/Footer.jsx`)

The `PHRASES` array drives the multilingual marquee. Keep each phrase to one line.

---

## GitHub data (`src/lib/github.js`)

| Const | What it does |
|---|---|
| `GH_USER` | Whose profile and repos are shown |
| `PINNED_REPOS` | Repos that always lead the list, in this order |
| `HIDDEN_REPOS` | Repos never shown, whatever the API returns |
| `DESCRIPTION_OVERRIDES` | Text shown instead of a repo's GitHub description. Use it when the description on GitHub is out of date, and delete the entry once GitHub is fixed |
| `FALLBACK_PROFILE`, `FALLBACK_REPOS` | Snapshot used when the API is unreachable or rate-limited |
| `LANG_COLORS` | Language dot colours |

To refresh the snapshot, save `https://api.github.com/users/kkjjkamal123/repos?per_page=100` and copy
the non-fork entries across. Keep the same fields.

---

## Design tokens (`src/index.css`)

The `:root` block (dark) and the `[data-theme="light"]` block hold every colour. Change both:
- `--accent`, `--accent-fill`, `--accent-glow`, `--accent-dim`: the cobalt accent
- `--grid-line`, `--watermark-stroke`: blueprint grid and outlined watermark
- `--live`, `--warn`: the "LIVE" badge and the rocket's status chip (darker in light mode for contrast)
- `--heat-0` … `--heat-4`: contribution heatmap levels

Fonts are self-hosted: the `@font-face` rules at the top of `index.css` point at `public/fonts/`. The
two faces needed above the fold are preloaded in `index.html`. To swap a font, replace the `.woff2` files
and update both places.

---

## Page meta (`index.html`)

Title, description, Open Graph/Twitter tags, canonical URL, the JSON-LD `Person` block and the theme
colour. If you edit the small inline theme script, nothing else needs to change: the build recomputes
its CSP hash.

---

## Adding a third-party request

The production page has a Content-Security-Policy. If you fetch from or load images from a new origin,
add it to `CSP_DIRECTIVES` in `vite.config.js` (`connect-src` for `fetch`, `img-src` for images).
Otherwise the browser blocks it in production only, because the dev server runs without the policy.
`npm test` checks that the GitHub and contribution APIs are listed.

---

## Quick reference

| What | File | Const / search |
|------|------|---|
| Hero marquee words | `Hero.jsx` | `ROLES` |
| Hero stats strip | `Hero.jsx` | `DATA_STRIP` |
| Timeline | `Trajectory.jsx` | `LOG` |
| Rocket details | `FeaturedRocket.jsx` | `PROJECT` |
| Bio | `About.jsx` | `I&apos;m Kamalesh` |
| Skills | `Skills.jsx` | `categories` |
| Social links | `Contact.jsx`, `Navbar.jsx` | `socials`, `SOCIALS` |
| Footer phrases | `Footer.jsx` | `PHRASES` |
| GitHub user, pins, overrides | `github.js` | `GH_USER`, `PINNED_REPOS`, `DESCRIPTION_OVERRIDES` |
| Colours | `index.css` | `:root`, `[data-theme="light"]` |
| Allowed origins | `vite.config.js` | `CSP_DIRECTIVES` |

---

## Workflow

1. **Edit** one of the files above.
2. **Preview**: `npm run dev` → http://localhost:5173
3. **Check**: `npm run check` (lint, tests, production build).
4. **Look at the production build**: `npm run preview`. This runs with the real CSP, so blocked requests
   show up in the browser console here and not in `dev`.
5. **Push** to `main` (see `PUSH.txt`). GitHub Actions lints, tests, builds and deploys.
