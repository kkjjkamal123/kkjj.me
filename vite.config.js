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
})
