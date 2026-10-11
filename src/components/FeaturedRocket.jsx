import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import Magnetic from './Magnetic'
import { useAnimations } from './AnimationContext'
import Orbs from './Orbs'
import { usePauseOffscreen } from '../lib/scroll'

// ── Edit these to rename / re-describe your rocket project ──────────────
const PROJECT = {
  codename: 'Model Rocket V1',
  tagline: 'A 3D-printed rocket, and the avionics board that rides in it.',
  description:
    'Started this because I wanted to know if I could get a printed airframe stiff enough to survive the loads, and whether I could log a flight properly rather than just guess at the apogee. Fin geometry and stability margin get worked out in OpenRocket first, then checked against CFD. The avionics are an IMU and a barometer logging to onboard storage.',
  focus: [
    { title: 'Airframe', detail: 'Printed body sections, nose cone and recovery bay', icon: 'build' },
    { title: 'Aerodynamics', detail: 'Fin planform and CP/CG, simulated before printing', icon: 'aero' },
    { title: 'Avionics', detail: 'IMU + barometer, logged for post-flight analysis', icon: 'telem' },
  ],
  status: 'In progress',
  links: {
    demo: '',   // ← add a YouTube/build-log/demo URL when ready (shows a "Watch the build" button)
    repo: 'https://github.com/kkjjkamal123/Model-Rocket-V1',   // ← add the GitHub repo URL once the project is public (shows a "View code" button)
    follow: 'https://github.com/kkjjkamal123', // fallback CTA — always works
  },
}

const focusIcon = {
  build: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  aero: <path d="M3 12h18M3 6h18M3 18h12" />,
  telem: <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16M5 19a1 1 0 1 0 0 .01" />,
}

// Deterministic pseudo-random positions so the field is stable across renders.
const STARS = (() => {
  let seed = 7
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  return Array.from({ length: 12 }, (_, i) => ({
    top: `${rand() * 100}%`,
    left: `${rand() * 100}%`,
    size: rand() * 2 + 1,
    delay: rand() * 3,
    dur: rand() * 2 + 1.5,
    accent: i % 7 === 0,
  }))
})()

// Plain CSS keyframes rather than a motion component per star. Each motion
// element subscribes to the animation frame loop and writes styles from
// JS; a CSS opacity animation runs on the compositor and costs the main
// thread nothing once started.
function Stars() {
  const ref = useRef(null)
  usePauseOffscreen(ref)

  return (
    <div ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', contain: 'layout paint' }}>
      {STARS.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: s.accent ? 'var(--accent)' : '#ffffff',
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function FeaturedRocket() {
  const ref = useRef(null)
  const { animationsEnabled } = useAnimations()
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section
      ref={ref}
      id="featured"
      className="cv-auto"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 8rem)',
        background: 'var(--rocket-bg)',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {animationsEnabled && <Stars />}
      <Orbs
        items={[
          { top: '2%', left: '18%', size: '48vw', color: 'var(--orb-1)', speed: 0.16 },
          { bottom: '-10%', right: '-6%', size: '34vw', color: 'var(--orb-2)', speed: 0.26 },
        ]}
      />

      <div style={{ maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}
        >
          <span className="eyebrow">Currently building</span>
          <span className="glass glass-sm" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em',
            color: '#fbbf24', borderColor: 'rgba(251,191,36,0.3)',
            borderRadius: 100, padding: '0.3rem 0.85rem', boxShadow: 'var(--shadow-1)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} />
            {PROJECT.status}
          </span>
        </m.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'center' }} className="rocket-grid">
          {/* Left: copy */}
          <div style={{ maxWidth: '800px' }}>
            <m.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mega"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                marginBottom: '1.25rem',
              }}
            >
              {PROJECT.codename.split(' ')[0]}{' '}
              <span style={{ color: 'var(--accent)' }}>{PROJECT.codename.split(' ').slice(1).join(' ')}</span>
              <span style={{ display: 'block', fontFamily: 'var(--body)', fontSize: 'clamp(1rem, 2.2vw, 1.3rem)', fontWeight: 400, color: 'var(--text-muted)', marginTop: '1rem', letterSpacing: 0, lineHeight: 1.5, textTransform: 'none' }}>
                {PROJECT.tagline}
              </span>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 660 }}
            >
              {PROJECT.description}
            </m.p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))', gap: '1rem', maxWidth: 800 }}>
              {PROJECT.focus.map((f, i) => (
                <m.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                  className="glass glass-sm glass-hover"
                  style={{ padding: '1.2rem 1.3rem' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.6rem' }}>
                    {focusIcon[f.icon]}
                  </svg>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>{f.title}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.detail}</div>
                </m.div>
              ))}
            </div>

            {/* CTAs */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}
            >
              {(() => {
                const primary = PROJECT.links.demo
                  ? { label: 'Watch the build', href: PROJECT.links.demo }
                  : { label: 'Follow the build on GitHub', href: PROJECT.links.follow }
                return (
                  <Magnetic range={70} strength={0.35}>
                    <a
                      href={primary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Watch"
                      className="btn-primary"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.95rem 2.2rem',
                        fontWeight: 700, fontSize: '0.8rem', borderRadius: 100, letterSpacing: '0.08em', textTransform: 'uppercase',
                      }}
                    >
                      {primary.label}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </a>
                  </Magnetic>
                )
              })()}
              {PROJECT.links.repo && (
                <Magnetic range={70} strength={0.35}>
                  <a
                    href={PROJECT.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Code"
                    className="glass glass-hover"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.95rem 2.2rem', color: 'var(--text)',
                      fontWeight: 700, fontSize: '0.8rem', borderRadius: 100, letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}
                  >
                    View code
                  </a>
                </Magnetic>
              )}
            </m.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .rocket-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
