import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GH_URL, GH_USER, LANG_COLORS, totalStars } from '../lib/github'

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.869 1.401-8.168L.132 9.21l8.2-1.192z" />
    </svg>
  )
}

function prettyName(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function RepoCard({ repo, index, inView }) {
  const color = LANG_COLORS[repo.language] || 'var(--accent)'
  const demo = repo.homepage && repo.homepage.startsWith('http') ? repo.homepage : null
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      style={{
        display: 'flex', flexDirection: 'column',
        padding: '1.6rem 1.8rem', background: 'var(--card)',
        border: '1px solid var(--border)', borderRadius: 12,
        transition: 'all 0.3s ease', position: 'relative',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = '#141414' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'var(--card)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--text-dim)">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        {repo.stargazers_count > 0 && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span style={{ color: '#fbbf24' }}><StarIcon /></span>{repo.stargazers_count}
          </span>
        )}
      </div>

      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
        {prettyName(repo.name)}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem', flexGrow: 1 }}>
        {repo.description || 'No description provided.'}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {repo.language && <span style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />}
          {repo.language || 'Code'}
        </span>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent)' }}>
              Demo
            </a>
          )}
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            Code
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function Stat({ value, label }) {
  return (
    <div style={{ flex: '1 1 120px', textAlign: 'center', padding: '1.25rem 0.5rem' }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', fontWeight: 700, color: 'var(--accent)' }}>{value}</div>
      <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.25rem' }}>{label}</div>
    </div>
  )
}

export default function Projects({ profile, repos, live }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? repos : repos.slice(0, 6)
  const stars = totalStars(repos)

  return (
    <section id="projects" ref={ref} style={{ padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 8rem)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}
        >
          Open Source
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}
        >
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>
            Built on GitHub
          </h2>
          {live && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.08)', borderRadius: 100, padding: '0.2rem 0.7rem' }}>
              <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.3 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              LIVE
            </span>
          )}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}
        >
          Pulled live from <a href={GH_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>@{GH_USER}</a> — spanning embedded systems, computer vision & AI.
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ display: 'flex', flexWrap: 'wrap', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 14, marginBottom: '2.5rem' }}
        >
          <Stat value={profile.public_repos} label="Repositories" />
          <Stat value={stars} label="Stars Earned" />
          <Stat value={profile.followers} label="Followers" />
          <Stat value={new Date().getFullYear() - new Date(profile.created_at).getFullYear()} label="Years on GitHub" />
        </motion.div>

        {/* Repo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {visible.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} index={i} inView={inView} />
          ))}
        </div>

        {repos.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => setShowAll((v) => !v)}
              style={{ padding: '0.7rem 1.8rem', border: '1px solid var(--border)', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', transition: 'all 0.25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {showAll ? 'Show less' : `Show all ${repos.length} projects`}
            </button>
          </div>
        )}

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: '4rem' }}
        >
          <h3 style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '1.25rem', textAlign: 'center' }}>
            Contribution Activity
          </h3>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 14, padding: 'clamp(1rem, 3vw, 2rem)', overflowX: 'auto' }}>
            <img
              src={`https://ghchart.rshah.org/3B82F6/${GH_USER}`}
              alt={`${GH_USER}'s GitHub contribution graph`}
              style={{ width: '100%', minWidth: 600, display: 'block' }}
              loading="lazy"
              onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
