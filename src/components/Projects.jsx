import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GH_URL, GH_USER, LANG_COLORS, totalStars } from '../lib/github'
import SplitReveal from './SplitReveal'
import Counter from './Counter'
import SectionNum from './SectionNum'

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.869 1.401-8.168L.132 9.21l8.2-1.192z" />
    </svg>
  )
}

function prettyName(name) {
  return name.replace(/[-_]/g, ' ')
}

function RepoRow({ repo, index, inView }) {
  const color = LANG_COLORS[repo.language] || 'var(--accent)'
  const demo = repo.homepage && repo.homepage.startsWith('http') ? repo.homepage : null
  return (
    <motion.a
      href={demo || repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor={demo ? 'Demo' : 'Code'}
      className="proj-row"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.06 }}
    >
      <span className="proj-muted" style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <span style={{ minWidth: 0 }}>
        <span className="mega" style={{ display: 'block', fontSize: 'clamp(1.5rem, 4.5vw, 3rem)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {prettyName(repo.name)}
        </span>
        <span className="proj-muted" style={{ display: 'block', fontSize: '0.83rem', color: 'var(--text-muted)', marginTop: '0.35rem', maxWidth: '620px', lineHeight: 1.55 }}>
          {repo.description || 'No description provided.'}
        </span>
      </span>

      <span style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 2vw, 1.75rem)', flexShrink: 0 }}>
        {repo.stargazers_count > 0 && (
          <span className="proj-muted proj-stars" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>
            <StarIcon />{repo.stargazers_count}
          </span>
        )}
        <span className="proj-muted proj-lang" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
          {repo.language || 'Code'}
        </span>
        <svg className="proj-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </span>
    </motion.a>
  )
}

function Stat({ value, label, inView }) {
  return (
    <div style={{ flex: '1 1 120px', padding: 'clamp(1.1rem, 2.5vw, 1.75rem) clamp(1rem, 2.5vw, 2rem)', borderRight: '1px solid var(--border)' }} className="gh-stat-cell">
      <div className="mega" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', color: 'var(--accent)' }}>
        <Counter value={value} inView={inView} />
      </div>
      <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.3rem', fontFamily: 'var(--mono)' }}>{label}</div>
    </div>
  )
}

export default function Projects({ profile, repos, live }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? repos : repos.slice(0, 6)
  const stars = totalStars(repos)

  return (
    <section id="projects" ref={ref} className="cv-auto" style={{ padding: 'clamp(5rem, 10vw, 10rem) clamp(1.25rem, 5vw, 6rem)', position: 'relative', overflow: 'hidden' }}>
      <SectionNum n="03" />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <p className="eyebrow">03 / The work</p>
          {live && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.15em', fontFamily: 'var(--mono)', color: '#22c55e' }}>
              <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.3 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              LIVE FROM GITHUB
            </span>
          )}
        </div>

        <h2 className="mega" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', marginBottom: '1rem' }}>
          <SplitReveal text="SELECTED" inView={inView} delay={0.05} />
          <SplitReveal text="WORK" inView={inView} delay={0.18} charStyle={{ color: 'var(--accent)' }} />
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '520px' }}
        >
          Pulled live from <a href={GH_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>@{GH_USER}</a> — embedded systems, computer vision &amp; AI that survive contact with reality.
        </motion.p>

        {/* GitHub stats band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ display: 'flex', flexWrap: 'wrap', border: '1px solid var(--border)', marginBottom: '3.5rem' }}
        >
          <Stat value={profile.public_repos} label="Repositories" inView={inView} />
          <Stat value={stars} label="Stars Earned" inView={inView} />
          <Stat value={profile.followers} label="Followers" inView={inView} />
          <Stat value={new Date().getFullYear() - new Date(profile.created_at).getFullYear()} label="Years on GitHub" inView={inView} />
        </motion.div>

        {/* Project index */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {visible.map((repo, i) => (
            <RepoRow key={repo.name} repo={repo} index={i} inView={inView} />
          ))}
        </div>

        {repos.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              data-cursor="More"
              onClick={() => setShowAll((v) => !v)}
              style={{
                padding: '0.85rem 2.2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--text-muted)', transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {showAll ? 'Show less' : `All ${repos.length} projects`}
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: '4.5rem' }}
        >
          <h3 className="eyebrow" style={{ color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
            Contribution activity
          </h3>
          <div style={{ border: '1px solid var(--border)', padding: 'clamp(1rem, 3vw, 2rem)', overflowX: 'auto' }}>
            <img
              src={`https://ghchart.rshah.org/2e6bff/${GH_USER}`}
              alt={`${GH_USER}'s GitHub contribution graph`}
              style={{ width: '100%', minWidth: 600, display: 'block' }}
              loading="lazy"
              onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .proj-row { grid-template-columns: 2rem minmax(0,1fr) auto; }
          .proj-row .proj-lang, .proj-row .proj-stars { display: none !important; }
          .gh-stat-cell:nth-child(even) { border-right: none !important; }
        }
      `}</style>
    </section>
  )
}
