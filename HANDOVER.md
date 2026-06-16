# Portfolio — Status & Handover Report

**Date:** 16 June 2026
**Owner:** Kamalesh VS ([@kkjjkamal123](https://github.com/kkjjkamal123))
**Stack:** React 18 · Vite 4 · Framer Motion

---

## TL;DR

The site is **finished and builds cleanly**, and it is committed to git locally with a
clean author line (no co-author or third-party attribution). It has **not been pushed to
GitHub yet** — the build machine can only authenticate as `shakthisharavan`, not
`kkjjkamal123`. Everything needed to push it is in **`PUSH.txt`**.

---

## What was done this session

1. **Verified the production build.** `npm run build` succeeds — 440 modules,
   ~313 kB raw / ~99 kB gzipped JS + ~1 kB CSS. No errors or warnings.
2. **Initialised git and committed** on branch `main`:
   - Author: `Kamalesh VS <vishnuvardhanks113@gmail.com>` — sole author, no co-author
     or third-party attribution in the commit or in any source file (verified by
     scanning every `.jsx/.js/.html/.css/.md/.json/.svg/.yml`).
3. **Saved a full local copy** to `~/Desktop/portfolio` — includes `node_modules`
   (so it builds/runs offline) and the `.git` history (so it is push-ready).
4. **Added `PUSH.txt`** — step-by-step instructions to push to kkjjkamal123 and turn on Pages.
5. **Packaged a lean zip** (`~/Desktop/portfolio.zip`, without `node_modules`) for
   transferring to another machine.

---

## Why it wasn't pushed

A GitHub SSH key belongs to exactly one account. The build machine's key authenticates
as `shakthisharavan`. The kkjjkamal123 key
(`SHA256:scF1cidpof0oWhZWBD4q38MBUsrjp5W9RkNvbYN2gGI`, titled "ubuntu") is not present
on it, so pushing as kkjjkamal123 is not possible from there. → See `PUSH.txt`.

## How to finish (short version)

On a machine that has the kkjjkamal123 key, from inside the project folder:

```bash
git remote add origin git@github.com:kkjjkamal123/portfolio.git
git push -u origin main
```

Then enable Pages: **Settings → Pages → Source: GitHub Actions**. Full details and the
HTTPS/Vercel alternatives are in `PUSH.txt` and `DEPLOY.md`.

---

## Still open (optional personalisation — needs your input)

- **Rocket codename** is the placeholder **"Project Apex"**
  (`src/components/FeaturedRocket.jsx`, `PROJECT.codename`). Rename to the real name.
- **Rocket links** are empty (`PROJECT.links.demo` / `.repo`). Add a build-log/demo URL
  and the GitHub repo URL to light up the "Watch the build" / "View code" buttons.
- **Telemetry panel** shows clearly-labelled `PREVIEW` (illustrative) values, not real
  flight data — replace with a real feed if/when the rocket streams it.
- **Confirm the LinkedIn URL** in `src/components/Contact.jsx`.

## Files of interest

| File | What it is |
|------|-----------|
| `PUSH.txt` | How to push to GitHub + enable Pages (read first) |
| `DEPLOY.md` | Vercel / GitHub Pages / Netlify deployment options |
| `REPORT.md` | Full feature and design write-up |
| `README.md` | Local dev quickstart |
