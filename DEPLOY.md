# Deployment Guide

This site is a static SPA — `npm run build` produces a `dist/` folder you can host anywhere.
GitHub Pages is the primary deployment target for the `kkjj.me` domain. Vercel still works as an
optional fallback.

---

## Option A — GitHub Pages + Namecheap DNS

1. Push this project to the `kkjj.me` GitHub repo.
2. In GitHub repo settings, set **Pages** to **GitHub Actions**.
3. In Namecheap DNS, add these records:
   - `A` `@` → `185.199.108.153`
   - `A` `@` → `185.199.109.153`
   - `A` `@` → `185.199.110.153`
   - `A` `@` → `185.199.111.153`
   - `CNAME` `www` → `kkjjkamal123.github.io`
4. Keep the `public/CNAME` file set to `kkjj.me`.
5. Commit and push. GitHub Actions will build and deploy the site.

GitHub Pages serves the site from `/` because `kkjj.me` is a custom domain, so no base-path prefix
is needed.

---

## Option B — Vercel

1. [vercel.com/new](https://vercel.com/new) → import the repo.
2. Leave the build command as `npm run build` and the output directory as `dist`.
3. Deploy. Vercel serves from `/`, so the existing config works as-is.

## Notes

- If GitHub Pages shows a failed run, first verify the Namecheap DNS records above.
- The `www` record is optional, but recommended so `www.kkjj.me` can be redirected later if you want.
- The `CNAME` file must stay in `public/` because Vite only publishes files from that folder into `dist/`.

---

## Local production check

Before deploying, verify the production bundle locally:

```bash
npm run build
npm run preview      # serves dist/ at http://localhost:4173
```

---

## Notes

- The site fetches the GitHub API **client-side** and unauthenticated. If a visitor refreshes many times
  they could hit GitHub's 60 req/hr/IP limit — the site then falls back to the baked-in real data, so it
  still looks complete.
- The contribution graph is an external image from `ghchart.rshah.org`; if that service is down the panel
  hides itself automatically.
