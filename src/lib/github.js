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
}

// Real data (captured from the GitHub API) — used as a fallback so the site
// never looks empty if the live API is unreachable or rate-limited.
export const FALLBACK_PROFILE = {
  login: GH_USER,
  name: 'Kamalesh VS',
  avatar_url: 'https://avatars.githubusercontent.com/u/76260512?v=4',
  html_url: GH_URL,
  public_repos: 14,
  followers: 7,
  following: 13,
  created_at: '2020-12-19T17:19:37Z',
}

export const FALLBACK_REPOS = [
  {
    name: 'ARM-Bharath-Challenge-2026',
    description: 'Real-time road anomaly detection on RPi 5 | YOLOv8n-OBB INT8 | 43.6 FPS (single mode) | mAP50: 0.982 | Bharat AI-SoC Challenge 2026',
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    html_url: `${GH_URL}/ARM-Bharath-Challenge-2026`,
    homepage: '',
    updated_at: '2026-02-23T17:23:52Z',
    fork: false,
  },
  {
    name: 'NCO-2015-Occupation-Code-Search-AI',
    description: 'Extracts, cleans, and indexes NCO-2015 job descriptions from MoSPI PDFs and enables AI-powered semantic search of occupation codes.',
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    html_url: `${GH_URL}/NCO-2015-Occupation-Code-Search-AI`,
    homepage: '',
    updated_at: '2025-10-24T17:40:27Z',
    fork: false,
  },
  {
    name: 'EntityEnergy',
    description: 'An smart home innovation.',
    language: 'HTML',
    stargazers_count: 0,
    forks_count: 0,
    html_url: `${GH_URL}/EntityEnergy`,
    homepage: '',
    updated_at: '2026-03-20T07:55:07Z',
    fork: false,
  },
  {
    name: 'Lipo_Charger',
    description: 'BMS and circuit designs for a base station.',
    language: 'KiCad',
    stargazers_count: 0,
    forks_count: 0,
    html_url: `${GH_URL}/Lipo_Charger`,
    homepage: '',
    updated_at: '2026-03-03T05:52:39Z',
    fork: false,
  },
  {
    name: 'Moist-Reader',
    description: 'A moisture reader built without using a moisture sensor.',
    language: 'C++',
    stargazers_count: 0,
    forks_count: 0,
    html_url: `${GH_URL}/Moist-Reader`,
    homepage: '',
    updated_at: '2024-12-07T16:09:47Z',
    fork: false,
  },
  {
    name: 'Bus-Track',
    description: 'Live bus tracking interface.',
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 0,
    html_url: `${GH_URL}/Bus-Track`,
    homepage: '',
    updated_at: '2025-10-24T17:40:22Z',
    fork: false,
  },
]

// Sort heuristic for showcasing: described repos first, then by stars, then recency.
export function rankRepos(repos) {
  return [...repos]
    .filter((r) => !r.fork)
    .sort((a, b) => {
      const ad = a.description ? 1 : 0
      const bd = b.description ? 1 : 0
      if (bd !== ad) return bd - ad
      if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count
      return new Date(b.updated_at) - new Date(a.updated_at)
    })
}

export function totalStars(repos) {
  return repos.filter((r) => !r.fork).reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
}

// Fetch live profile + repos once, falling back to baked-in real data.
export function useGitHub() {
  const [profile, setProfile] = useState(FALLBACK_PROFILE)
  const [repos, setRepos] = useState(FALLBACK_REPOS)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [p, r] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`).then((res) => {
            if (!res.ok) throw new Error('profile')
            return res.json()
          }),
          fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100`).then((res) => {
            if (!res.ok) throw new Error('repos')
            return res.json()
          }),
        ])
        if (cancelled || !Array.isArray(r)) return
        setProfile(p)
        setRepos(rankRepos(r))
        setLive(true)
      } catch {
        /* keep the baked-in fallback data */
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { profile, repos, live }
}
