import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//
// `base` controls the public path the app is served from.
//  - '/'           → Vercel, Netlify, a custom domain, or a user/org Pages site
//                    (e.g. kkjjkamal123.github.io)
//  - '/portfolio/' → a GitHub Pages *project* site (kkjjkamal123.github.io/portfolio)
// The GitHub Pages workflow sets VITE_BASE for you; locally it stays '/'.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
