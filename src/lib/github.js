import { useEffect, useState } from 'react'

export const GH_USER = 'kkjjkamal123'
export const GH_URL = `https://github.com/${GH_USER}`

// GitHub language → brand color
export const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Shell: '#89e051',
  Rust: '#dea584',
  Go: '#00ADD8',
  Kotlin: '#A97BFF',
  Astro: '#ff5a03',
  'Jupyter Notebook': '#DA5B0B',
  Swift: '#F05138',
}

// Real data (snapshot of the GitHub API, Oct 2026) — used as a fallback so the site
// never looks empty if the live API is unreachable or rate-limited.
export const FALLBACK_PROFILE = {
  login: GH_USER,
  name: 'Kamalesh VS',
  avatar_url: 'https://avatars.githubusercontent.com/u/76260512?v=4',
  html_url: GH_URL,
  public_repos: 30,
  followers: 24,
  following: 21,
  created_at: '2020-12-19T17:19:37Z',
}

export const FALLBACK_REPOS = [
  {
    "name": "Agentic-OS",
    "description": "A macOS desktop OS for AI agents: describe a goal and Claude, GPT, Gemini, Ollama and CLI agents plan, build in parallel, cross-review, test and ship it. Electron + React, Obsidian Brain sync.",
    "language": "TypeScript",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Agentic-OS",
    "homepage": "",
    "updated_at": "2026-10-12T03:10:00Z",
    "fork": false
  },
  {
    "name": "Vox",
    "description": "Hands-free, on-device voice control for macOS: \"Hey Vox\" wake word, streaming commands, Spotify/YouTube/Music, messages, timers, and an on-device LLM fallback. Swift, macOS 26+.",
    "language": "Swift",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Vox",
    "homepage": "",
    "updated_at": "2026-10-11T21:04:47Z",
    "fork": false
  },
  {
    "name": "ENTITY-WEB",
    "description": "Project site for ENTITY - an optimized on-device LLM runtime for Arm Android phones. Animated explainers, live device leaderboard, evidence record.",
    "language": "Astro",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/ENTITY-WEB",
    "homepage": "https://kkjjkamal123.github.io/ENTITY-WEB/",
    "updated_at": "2026-10-10T09:51:26Z",
    "fork": false
  },
  {
    "name": "x-drifter",
    "description": "",
    "language": "C",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/x-drifter",
    "homepage": "",
    "updated_at": "2026-09-29T14:18:57Z",
    "fork": false
  },
  {
    "name": "MDView",
    "description": "A fast, offline desktop Markdown reader with full LaTeX, Mermaid and GitHub-flavoured rendering. Windows and Linux.",
    "language": null,
    "stargazers_count": 1,
    "html_url": "https://github.com/kkjjkamal123/MDView",
    "homepage": "",
    "updated_at": "2026-09-26T20:43:33Z",
    "fork": false
  },
  {
    "name": "Schneider-Electric---yuva-yodha-tech",
    "description": "",
    "language": "Python",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Schneider-Electric---yuva-yodha-tech",
    "homepage": "",
    "updated_at": "2026-09-09T19:59:12Z",
    "fork": false
  },
  {
    "name": "OcuNexa",
    "description": "Intelligent Retinal Analytics & Screening — a Flask website that runs a digital image-processing pipeline over a retinal/fundus photograph and returns an explainable screening report.",
    "language": "Python",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/OcuNexa",
    "homepage": "",
    "updated_at": "2026-08-25T17:25:49Z",
    "fork": false
  },
  {
    "name": "ENTITY---Arm-Create-AI-Optimization-Challenge",
    "description": "ENTITY runs large language models \"fully offline\" on a phone and \"Optimizes itself\" to the device's Arm CPU.",
    "language": "Kotlin",
    "stargazers_count": 1,
    "html_url": "https://github.com/kkjjkamal123/ENTITY---Arm-Create-AI-Optimization-Challenge",
    "homepage": "https://kkjjkamal123.github.io/ENTITY-WEB/",
    "updated_at": "2026-08-20T07:51:04Z",
    "fork": false
  },
  {
    "name": "Semicon_2026",
    "description": "Drift Sense — AI Powered Navigation Error Recovery for Wafer Inspection Tools",
    "language": "Python",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Semicon_2026",
    "homepage": "",
    "updated_at": "2026-08-19T11:25:42Z",
    "fork": false
  },
  {
    "name": "Dino-Game",
    "description": "",
    "language": "JavaScript",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Dino-Game",
    "homepage": "",
    "updated_at": "2026-08-18T14:01:24Z",
    "fork": false
  },
  {
    "name": "NCO-2015-Occupation-Code-Search-AI",
    "description": "This project extracts, cleans, and indexes NCO-2015 job descriptions from MoSPI PDF files and allows AI-powered semantic search of occupation codes.",
    "language": "Python",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/NCO-2015-Occupation-Code-Search-AI",
    "homepage": "",
    "updated_at": "2026-08-18T14:01:21Z",
    "fork": false
  },
  {
    "name": "Bus-Track",
    "description": "",
    "language": "JavaScript",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Bus-Track",
    "homepage": "",
    "updated_at": "2026-08-18T14:01:19Z",
    "fork": false
  },
  {
    "name": "ARM-Bharath-Challenge-2026",
    "description": "Real-time road anomaly detection on RPi 5 | YOLOv8n-OBB INT8 | 43.6 FPS  (single mode) | mAP50: 0.982 | Bharat AI-SoC Challenge 2026",
    "language": "Python",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/ARM-Bharath-Challenge-2026",
    "homepage": "",
    "updated_at": "2026-08-18T14:01:17Z",
    "fork": false
  },
  {
    "name": "kkjjkamal123",
    "description": "",
    "language": null,
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/kkjjkamal123",
    "homepage": "",
    "updated_at": "2026-07-30T04:11:42Z",
    "fork": false
  },
  {
    "name": "banner-studio",
    "description": "Dynamic promo banner engine — 1360x800 banners from product PNGs, an offer and a theme in ~30ms. BigBasket hackathon PS.",
    "language": "Python",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/banner-studio",
    "homepage": "",
    "updated_at": "2026-07-16T17:12:04Z",
    "fork": false
  },
  {
    "name": "Daily-Track",
    "description": "",
    "language": null,
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Daily-Track",
    "homepage": "",
    "updated_at": "2026-07-13T06:04:03Z",
    "fork": false
  },
  {
    "name": "kkjj.me",
    "description": "",
    "language": "JavaScript",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/kkjj.me",
    "homepage": "",
    "updated_at": "2026-07-11T08:31:36Z",
    "fork": false
  },
  {
    "name": "Lipo_Charger",
    "description": "BMS and Circuit Designs for Base Station",
    "language": null,
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Lipo_Charger",
    "homepage": "",
    "updated_at": "2026-06-22T16:37:41Z",
    "fork": false
  },
  {
    "name": "Model-Rocket-V1",
    "description": "Building Version 1 Of The Model Rocket",
    "language": null,
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Model-Rocket-V1",
    "homepage": "",
    "updated_at": "2026-06-20T09:15:24Z",
    "fork": false
  },
  {
    "name": "EntityEnergy",
    "description": "An Smart Home Innovation.",
    "language": "HTML",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/EntityEnergy",
    "homepage": "",
    "updated_at": "2026-03-20T07:55:07Z",
    "fork": false
  },
  {
    "name": "Moist-Reader",
    "description": "A moister reader without using moisture sensor",
    "language": "C++",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Moist-Reader",
    "homepage": "",
    "updated_at": "2024-12-07T16:09:47Z",
    "fork": false
  },
  {
    "name": "Snake-Game",
    "description": "",
    "language": "Python",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Snake-Game",
    "homepage": "",
    "updated_at": "2024-09-24T14:49:13Z",
    "fork": false
  },
  {
    "name": "Stone-Paper-Scissor",
    "description": "",
    "language": "Python",
    "stargazers_count": 0,
    "html_url": "https://github.com/kkjjkamal123/Stone-Paper-Scissor",
    "homepage": "",
    "updated_at": "2024-09-21T11:13:53Z",
    "fork": false
  }
]

// Repos that should never surface on the site, whatever the API returns.
// The list is pulled live, so dropping something from FALLBACK_REPOS alone
// does nothing — a public repo comes straight back on the next fetch.
export const HIDDEN_REPOS = new Set(['ARM-Bharath-Challenge-2026', 'kkjjkamal123'])

// Repos that lead the list regardless of stars or recency, in this order.
// The default heuristic ranks by activity, which buries the work that took
// the most doing under whatever was touched most recently.
export const PINNED_REPOS = [
  'ENTITY---Arm-Create-AI-Optimization-Challenge',
  'ENTITY-WEB',
]

const pinRank = (name) => {
  const i = PINNED_REPOS.indexOf(name)
  return i === -1 ? PINNED_REPOS.length : i
}

// Sort heuristic for showcasing: pinned first, then described repos,
// then by stars, then recency.
export function rankRepos(repos) {
  return [...repos]
    .filter((r) => !r.fork && !HIDDEN_REPOS.has(r.name))
    .sort((a, b) => {
      const ap = pinRank(a.name)
      const bp = pinRank(b.name)
      if (ap !== bp) return ap - bp
      const ad = a.description ? 1 : 0
      const bd = b.description ? 1 : 0
      if (bd !== ad) return bd - ad
      if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count
      return new Date(b.updated_at) - new Date(a.updated_at)
    })
}

export function totalStars(repos) {
  return repos
    .filter((r) => !r.fork && !HIDDEN_REPOS.has(r.name))
    .reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
}

// Fetch live profile + repos once, falling back to baked-in real data.
//
// The unauthenticated GitHub API allows 60 requests an hour per IP, and
// every reload of this page spends two of them. The result is cached for
// the session so a reload reuses it instead — which also means the repo
// list paints immediately on the second visit rather than after a
// round-trip.
const CACHE_KEY = 'gh_cache_v2'
const CACHE_TTL = 30 * 60 * 1000

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || Date.now() - parsed.t > CACHE_TTL) return null
    if (!parsed.profile || !Array.isArray(parsed.repos)) return null
    // Re-rank rather than trusting the stored order: HIDDEN_REPOS and
    // PINNED_REPOS may have changed since this entry was written.
    return { ...parsed, repos: rankRepos(parsed.repos) }
  } catch {
    return null
  }
}

export function useGitHub() {
  const cached = typeof sessionStorage !== 'undefined' ? readCache() : null

  const [profile, setProfile] = useState(cached ? cached.profile : FALLBACK_PROFILE)
  const [repos, setRepos] = useState(cached ? cached.repos : rankRepos(FALLBACK_REPOS))
  const [live, setLive] = useState(Boolean(cached))

  useEffect(() => {
    if (cached) return

    const controller = new AbortController()
    let cancelled = false

    async function load() {
      try {
        const opts = { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } }
        const [p, r] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`, opts).then((res) => {
            if (!res.ok) throw new Error('profile')
            return res.json()
          }),
          fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100`, opts).then((res) => {
            if (!res.ok) throw new Error('repos')
            return res.json()
          }),
        ])
        if (cancelled || !Array.isArray(r)) return
        const ranked = rankRepos(r)
        setProfile(p)
        setRepos(ranked)
        setLive(true)
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), profile: p, repos: ranked }))
        } catch { /* storage full or blocked — not worth failing over */ }
      } catch {
        /* keep the baked-in fallback data */
      }
    }
    load()

    return () => {
      cancelled = true
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { profile, repos, live }
}
