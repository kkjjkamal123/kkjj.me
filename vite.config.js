import { createHash } from 'node:crypto'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Content-Security-Policy for the production page.
//
// Delivered as a <meta> tag so it also applies on GitHub Pages, which
// cannot send response headers (vercel.json adds the header-only
// directives, such as frame-ancestors, when the site is on Vercel).
//
// Build-only: the dev server injects inline scripts of its own (React
// Fast Refresh) that this policy would block.
//
// The inline theme script in index.html is allowed by its SHA-256,
// computed here from the built HTML, so editing that script can never
// silently leave it blocked in production.
//
// Every third-party origin the page talks to must be listed:
//   api.github.com                          profile + repos (lib/github.js)
//   github-contributions-api.jogruber.de    contribution calendar (ContributionGraph.jsx)
//   avatars.githubusercontent.com           profile avatar
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'"],
  // React style={{}} props and the components' <style> blocks.
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https://avatars.githubusercontent.com'],
  'font-src': ["'self'"],
  'connect-src': ["'self'", 'https://api.github.com', 'https://github-contributions-api.jogruber.de'],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'none'"],
}

const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g

export function cspMeta() {
  return {
    name: 'csp-meta',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const hashes = [...html.matchAll(INLINE_SCRIPT)].map(
          ([, body]) => `'sha256-${createHash('sha256').update(body).digest('base64')}'`
        )
        const directives = { ...CSP_DIRECTIVES, 'script-src': [...CSP_DIRECTIVES['script-src'], ...hashes] }
        const policy = Object.entries(directives).map(([k, v]) => `${k} ${v.join(' ')}`).join('; ')
        return html.replace(
          /<meta charset="UTF-8" \/>/,
          (m) => `${m}\n    <meta http-equiv="Content-Security-Policy" content="${policy}" />`
        )
      },
    },
  }
}

// https://vitejs.dev/config/
//
// `base` controls the public path the app is served from.
//  - '/'     → Vercel, Netlify, or a custom domain like kkjj.me
//  - '/repo/' → a GitHub Pages project site
// The GitHub Pages workflow sets VITE_BASE for you; locally it stays '/'.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), cspMeta()],
  build: {
    // Modern baseline — skips transpiling async/optional-chaining etc.
    // down to ES2015, which shrinks the bundle and speeds up parse.
    target: 'es2020',
    cssTarget: 'chrome87',
    rollupOptions: {
      output: {
        // Keep React in its own long-cached vendor chunk: it changes far
        // less often than the site, so a copy edit doesn't invalidate it.
        // Framer Motion is deliberately left to the bundler — forcing it
        // into one chunk would drag the lazily loaded animation features
        // (see lib/motion-features.js) back into the critical path.
        // Rolldown (Vite 8) only accepts the function form here.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react'
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
})
