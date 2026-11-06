# Deployment Guide

This site is a static single page. `npm run build` produces a `dist/` folder you can host anywhere.
GitHub Pages is the primary target for the `kkjj.me` domain, and Vercel still works as a fallback.

> To publish a new version, push `main` (see `PUSH.txt`). Nothing is deployed automatically from this
> machine.

---

## Option A: GitHub Pages + Namecheap DNS (primary)

1. The repo is `github.com/kkjjkamal123/kkjj.me` (already the `origin` remote).
2. In the repo settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
3. In Namecheap DNS:
   - `A` `@` → `185.199.108.153`
   - `A` `@` → `185.199.109.153`
   - `A` `@` → `185.199.110.153`
   - `A` `@` → `185.199.111.153`
   - `CNAME` `www` → `kkjjkamal123.github.io`
4. Keep `public/CNAME` set to `kkjj.me`. Vite only copies files from `public/` into `dist/`, so the copy
   at the repo root isn't the one that gets deployed.
5. Push to `main`. `.github/workflows/deploy.yml` runs `npm ci`, `npm run lint`, `npm test` and
   `npm run build`, then publishes `dist/`. A lint error or a failing test stops the deploy.

GitHub Pages serves the site from `/` because `kkjj.me` is a custom domain, so `VITE_BASE` stays `/`.

**Security headers on GitHub Pages.** Pages can't send custom response headers. The important part, the
Content-Security-Policy, is injected into `index.html` as a `<meta>` tag at build time, so it applies
there too. Header-only protections (`frame-ancestors`, `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`) only take effect on Vercel. Pages enforces HTTPS itself: tick
**Enforce HTTPS** in the Pages settings.

**404s.** Unknown paths get `public/404.html` on both hosts.

---

## Option B: Vercel

1. [vercel.com/new](https://vercel.com/new) → import the repo.
2. Leave the build command as `npm run build` and the output directory as `dist`. Both are already set
   in `vercel.json`.
3. Deploy. Vercel serves from `/`, so no base-path change is needed.

`vercel.json` adds security headers on every response, plus long-lived `immutable` caching for the
content-hashed files in `/assets/` and 30-day caching for `/fonts/`. There's no SPA rewrite: the site has
no client-side routes, and a catch-all rewrite would answer every mistyped URL with a 200 copy of the home
page.

---

## Local production check

Before you push, run the same gate CI runs, then look at the real build:

```bash
npm run check        # lint + tests + production build
npm run preview      # serves dist/ at http://localhost:5173
```

`preview` serves the build with its CSP, so if something is blocked you'll see it in the browser console
here even though `npm run dev` looks fine. (The `preview` server falls back to `index.html` for unknown
paths. Production serves `404.html` instead.)

---

## Notes

- If a GitHub Pages run fails at the deploy step, check the Namecheap DNS records above first.
- The `www` record is optional, but it's recommended so `www.kkjj.me` can be redirected later if you
  want.
- The site calls the GitHub API **client-side** and unauthenticated (60 requests/hour per IP). Results are
  cached for the session. If the API is rate-limited or down, the site falls back to the snapshot baked
  into `src/lib/github.js`, so it still looks complete. The "LIVE" badge only appears for live data.
- The contribution heatmap comes from `github-contributions-api.jogruber.de`. If that service is down,
  the panel hides itself.
- Any new third-party origin must be added to `CSP_DIRECTIVES` in `vite.config.js`, or production will
  block it.
