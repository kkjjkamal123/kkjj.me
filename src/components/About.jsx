import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GH_URL, totalStars } from '../lib/github'
import SplitReveal from './SplitReveal'
import Counter from './Counter'
import Magnetic from './Magnetic'
import SectionNum from './SectionNum'

export default function About({ profile, repos }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const years = new Date().getFullYear() - new Date(profile.created_at).getFullYear()
  const stats = [
    { value: profile.public_repos, label: 'Public repos' },
    { value: `${years}+`, label: 'Years building' },
    { value: totalStars(repos), label: 'Stars earned' },
  ]

  return (
    <section id="about" ref={ref} className="cv-auto" style={{ padding: 'clamp(5rem, 10vw, 10rem) clamp(1.25rem, 5vw, 6rem)', position: 'relative', overflow: 'hidden' }}>
      {/* Oversized outline watermark */}
      <SectionNum n="01" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>01 / The driver seat</p>

        <h2 className="mega" style={{ fontSize: 'clamp(2.8rem, 8.5vw, 7rem)', marginBottom: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          <SplitReveal text="SENSE. MOVE." inView={inView} delay={0.1} />
          <SplitReveal text="FLY." inView={inView} delay={0.25} charStyle={{ color: 'var(--accent)' }} />
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(2rem, 6vw, 6rem)', alignItems: 'start' }} className="about-grid">
          <div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ height: '2px', background: 'var(--accent-fill)', transformOrigin: '0% 50%', marginBottom: '2rem', width: '64px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}
                >
                  <div className="mega" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: 'var(--accent)', minWidth: '1.6em' }}>
                    <Counter value={s.value} inView={inView} />
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--text)', lineHeight: 1.7, marginBottom: '1.5rem', fontWeight: 500 }}>
              I&apos;m Kamalesh VS — a builder working where hardware meets software, where code has to
              survive contact with reality.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              My work spans real-time road-anomaly detection on a Raspberry Pi 5
              (<span style={{ color: 'var(--text)', fontWeight: 600 }}>43.6 FPS, mAP50 0.982</span>), battery-management
              circuits for CubeSats, smart home systems and AI-powered semantic search. Lately I&apos;m channeling
              all of it into <span style={{ color: 'var(--accent)', fontWeight: 600 }}>aerospace</span> — building a
              rocket from airframe to telemetry.
            </p>

            <div style={{ marginTop: '2.5rem' }}>
              <Magnetic range={50} strength={0.3}>
                <a
                  href={GH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Open"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    borderBottom: '1px solid var(--accent)',
                    paddingBottom: '0.3rem',
                  }}
                >
                  View GitHub profile
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
