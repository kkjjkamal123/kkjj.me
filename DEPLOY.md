# Deployment Guide

This site is a static SPA — `npm run build` produces a `dist/` folder you can host anywhere.
Two paths are pre-configured: **Vercel** and **GitHub Pages**.

---

## Option A — Vercel (recommended, easiest)

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and **import** the repo.
3. Vercel auto-detects Vite. Settings (already covered by `vercel.json`):
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. You get a `*.vercel.app` URL; every push to `main` redeploys.

No base-path changes are needed — Vercel serves from `/`.

---

## Option B — GitHub Pages (free, via included CI)

A workflow is included at `.github/workflows/deploy.yml` that builds and publishes automatically.

### 1. Set the base path

GitHub Pages serves a **project** repo from `https://<user>.github.io/<repo>/`, so Vite needs to know
the sub-path. The workflow sets it via `VITE_BASE`:

```yaml
- run: npm run build
  env:
    VITE_BASE: /portfolio/      # 👈 change "portfolio" to your repo name
```

- Repo named `portfolio` → `VITE_BASE: /portfolio/`
- Repo named something else → match it, e.g. `/my-site/`
- **User site** (`<user>.github.io`) → set `VITE_BASE: /`

### 2. Enable Pages

In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

### 3. Push

```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

The **Actions** tab will show the build; when it finishes, your site is live at
`https://kkjjkamal123.github.io/<repo>/`. You can also re-run it manually from
**Actions → Deploy to GitHub Pages → Run workflow**.

---

## Option C — Netlify

1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
2. Build command `npm run build`, publish directory `dist`.
3. Deploy. (Add a `_redirects` file with `/* /index.html 200` if you later add client-side routing.)

---

## Custom domain

- **Vercel/Netlify:** add the domain in the dashboard and follow the DNS instructions.
- **GitHub Pages:** add a `CNAME` file to `public/` containing your domain (e.g. `kamalesh.dev`),
  set `VITE_BASE: /`, and configure DNS per GitHub's docs.

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
