import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//
// `base` controls the public path the app is served from.
//  - '/'     → Vercel, Netlify, or a custom domain like kkjj.me
//  - '/repo/' → a GitHub Pages project site
// The GitHub Pages workflow sets VITE_BASE for you; locally it stays '/'.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
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
