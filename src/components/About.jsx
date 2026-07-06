import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GH_URL, totalStars } from '../lib/github'
import RevealText from './RevealText'
import Counter from './Counter'
import Magnetic from './Magnetic'

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
    <section id="about" ref={ref} style={{ padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 8rem)', position: 'relative', overflow: 'hidden' }}>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', top: '-2rem', left: 'clamp(1rem, 4vw, 4rem)',
          fontFamily: 'var(--display)', fontSize: 'clamp(6rem, 16vw, 13rem)', fontWeight: 700,
          color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.05)', lineHeight: 1, zIndex: 0,
        }}
      >
        01
      </span>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'var(--accent)' }} />
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase' }}
          >
            About
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'clamp(2rem, 6vw, 6rem)', alignItems: 'start' }} className="about-grid">
          <div>
            <h2 style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '2rem',
            }}>
              <RevealText text="I build things that" inView={inView} delay={0.1} />
              <RevealText text="sense, move and fly." inView={inView} delay={0.25} wordStyle={{ color: 'var(--accent)' }} />
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ height: '1px', background: 'var(--border)', transformOrigin: '0% 50%', marginBottom: '2.5rem' }}
            />

            <div style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap' }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                >
                  <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: 'var(--accent)' }}>
                    <Counter value={s.value} inView={inView} />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', letterSpacing: '0.05em' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              borderLeft: '2px solid var(--accent)',
              paddingLeft: '1.75rem',
              position: 'relative',
            }}
          >
            <p style={{ fontSize: '1.08rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              I'm <strong style={{ color: '#fff' }}>Kamalesh VS</strong> — a builder working at the intersection of
              hardware and software. I design embedded systems, train computer vision models and ship Products
              that solve real problems.
            </p>
            <p style={{ fontSize: '1.08rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              My work spans real-time road-anomaly detection on a Raspberry Pi 5
              (<span style={{ color: '#fff', fontWeight: 600 }}>43.6 FPS, mAP50 0.982</span>), battery-management circuits for CubeSats,
              smart home systems and AIpowered semantic search. Lately, I'm channeling that into
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}> aerospace</span> — building a rocket from airframe to telemetry.
            </p>
            <p style={{ fontSize: '1.08rem', color: 'var(--text-muted)', lineHeight: 1.85 }}>
              I like problems that touch the physical world — where code has to survive contact with reality.
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
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
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
