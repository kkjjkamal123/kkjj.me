import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'
import {
  DESCRIPTION_OVERRIDES,
  FALLBACK_PROFILE,
  FALLBACK_REPOS,
  HIDDEN_REPOS,
  PINNED_REPOS,
  rankRepos,
  totalStars,
} from '../src/lib/github'
import { getItem, setItem } from '../src/lib/storage'
import { API as CONTRIB_API } from '../src/components/ContributionGraph'
import { CSP_DIRECTIVES, cspMeta } from '../vite.config.js'

const repo = (name, extra = {}) => ({
  name,
  description: '',
  stargazers_count: 0,
  updated_at: '2026-01-01T00:00:00Z',
  fork: false,
  ...extra,
})

describe('rankRepos', () => {
  it('drops forks and hidden repos', () => {
    const hidden = [...HIDDEN_REPOS][0]
    const names = rankRepos([repo('a'), repo('b', { fork: true }), repo(hidden)]).map((r) => r.name)
    expect(names).toEqual(['a'])
  })

  it('puts pinned repos first, in pin order, ahead of starred ones', () => {
    const [p0, p1] = PINNED_REPOS
    const ranked = rankRepos([repo('starred', { stargazers_count: 99, description: 'x' }), repo(p1), repo(p0)])
    expect(ranked.map((r) => r.name)).toEqual([p0, p1, 'starred'])
  })

  it('orders described > stars > recency', () => {
    const ranked = rankRepos([
      repo('old-bare', { updated_at: '2020-01-01T00:00:00Z' }),
      repo('new-bare', { updated_at: '2026-06-01T00:00:00Z' }),
      repo('described', { description: 'd' }),
      repo('starred-described', { description: 'd', stargazers_count: 3 }),
    ])
    expect(ranked.map((r) => r.name)).toEqual(['starred-described', 'described', 'new-bare', 'old-bare'])
  })

  it('applies description overrides without mutating the input', () => {
    const [name, text] = Object.entries(DESCRIPTION_OVERRIDES)[0]
    const input = [repo(name, { description: 'stale' })]
    expect(rankRepos(input)[0].description).toBe(text)
    expect(input[0].description).toBe('stale')
  })
})

describe('fallback data', () => {
  it('has no forks and no duplicates', () => {
    expect(FALLBACK_REPOS.some((r) => r.fork)).toBe(false)
    expect(new Set(FALLBACK_REPOS.map((r) => r.name)).size).toBe(FALLBACK_REPOS.length)
  })

  it('carries the fields the UI reads', () => {
    for (const r of FALLBACK_REPOS) {
      expect(typeof r.name).toBe('string')
      expect(r.html_url).toBe(`https://github.com/kkjjkamal123/${r.name}`)
      expect(Number.isNaN(Date.parse(r.updated_at))).toBe(false)
    }
    expect(FALLBACK_PROFILE.public_repos).toBeGreaterThan(0)
  })

  it('totals stars over visible repos only', () => {
    expect(totalStars([repo('a', { stargazers_count: 2 }), repo('b', { stargazers_count: 5, fork: true })])).toBe(2)
  })
})

describe('storage', () => {
  afterEach(() => { delete globalThis.window })

  it('returns null and swallows errors when storage access throws', () => {
    globalThis.window = {}
    Object.defineProperty(globalThis.window, 'localStorage', { get() { throw new Error('SecurityError') } })
    expect(getItem('localStorage', 'k')).toBeNull()
    expect(() => setItem('localStorage', 'k', 'v')).not.toThrow()
  })

  it('round-trips when storage works', () => {
    const map = new Map()
    globalThis.window = { sessionStorage: { getItem: (k) => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) } }
    setItem('sessionStorage', 'k', 'v')
    expect(getItem('sessionStorage', 'k')).toBe('v')
  })
})

describe('content security policy', () => {
  it('allows every origin the page fetches from', () => {
    const connect = CSP_DIRECTIVES['connect-src']
    for (const url of ['https://api.github.com/users/x', CONTRIB_API]) {
      expect(connect).toContain(new URL(url).origin)
    }
  })

  it('hashes the inline theme script in index.html and ignores JSON-LD', () => {
    const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
    const out = cspMeta().transformIndexHtml.handler(html)
    const policy = out.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1]
    const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])
    expect(inline.length).toBe(1)
    const hash = createHash('sha256').update(inline[0]).digest('base64')
    expect(policy).toContain(`'sha256-${hash}'`)
    expect(policy.match(/sha256-/g).length).toBe(1)
    expect(policy).not.toMatch(/unsafe-eval|script-src[^;]*unsafe-inline/)
  })
})
