import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GH_URL, totalStars } from '../lib/github'

export default function About({ profile, repos }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const years = new Date().getFullYear() - new Date(profile.created_at).getFullYear()
  const stats = [
    { value: profile.public_repos, label: 'Public repos' },
    { value: `${years}+`, label: 'Years building' },
    { value: totalStars(repos), label: 'Stars earned' },
  ]

  return (
    <section id="about" ref={ref} style={{ padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 8rem)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}
        >
          About
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '5rem', alignItems: 'start' }}>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '2rem',
              }}
            >
              I build things<br />that <span style={{ color: 'var(--accent)' }}>sense</span>,<br /><span style={{ color: 'var(--accent)' }}>move</span> and <span style={{ color: 'var(--accent)' }}>fly</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', flexWrap: 'wrap' }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>{s.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              I'm <strong style={{ color: '#fff' }}>Kamalesh VS</strong> — a builder working at the intersection of
              hardware and software. I design embedded systems, train computer-vision models, and ship AI tools
              that solve real problems.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              My work spans real-time road-anomaly detection on a Raspberry Pi 5
              (<span style={{ color: '#fff' }}>43.6 FPS, mAP50 0.982</span>), battery-management circuits for base stations,
              smart-home systems, and AI-powered semantic search. Lately, I'm channeling that into
              <span style={{ color: 'var(--accent)' }}> aerospace</span> — building a rocket from airframe to telemetry.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              I like problems that touch the physical world — where code has to survive contact with reality.
            </p>

            <div style={{ marginTop: '2.5rem' }}>
              <a
                href={GH_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  borderBottom: '1px solid transparent',
                  paddingBottom: '2px',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              >
                View GitHub profile →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
