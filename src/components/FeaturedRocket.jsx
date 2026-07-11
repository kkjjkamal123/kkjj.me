import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Magnetic from './Magnetic'
import Tilt from './Tilt'
import { useAnimations } from './AnimationContext'
import SectionNum from './SectionNum'

// ── Edit these to rename / re-describe your rocket project ──────────────
const PROJECT = {
  codename: 'Project Apex',
  tagline: 'Designing, building, and instrumenting a rocket from the ground up.',
  description:
    'A hands-on aerospace build focused on airframe construction, aerodynamic stability, and a custom telemetry stack. From fin geometry and center-of-pressure tuning to onboard sensors streaming altitude, velocity and attitude in real time — every part is engineered, tested, and iterated.',
  focus: [
    { title: 'Rocket Building', detail: 'Airframe, nose cone, fins & recovery systems', icon: 'build' },
    { title: 'Aerodynamics', detail: 'Stability margin, drag profiling & CP/CG tuning', icon: 'aero' },
    { title: 'Telemetry', detail: 'Onboard IMU + barometer, live downlink & logging', icon: 'telem' },
  ],
  status: 'In Development',
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

function Stars({ count = 40 }) {
  // Deterministic pseudo-random positions so the field is stable across renders.
  const stars = []
  let seed = 7
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let i = 0; i < count; i++) {
    stars.push({
      top: `${rand() * 100}%`,
      left: `${rand() * 100}%`,
      size: rand() * 2 + 1,
      delay: rand() * 3,
      dur: rand() * 2 + 1.5,
    })
  }
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {stars.map((s, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ repeat: Infinity, duration: s.dur, delay: s.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: i % 7 === 0 ? 'var(--accent)' : '#ffffff',
          }}
        />
      ))}
    </div>
  )
}

function Rocket({ ignited }) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      style={{ position: 'relative', width: '160px', display: 'flex', justifyContent: 'center' }}
    >
      <svg width="120" height="300" viewBox="0 0 120 300" fill="none" style={{ overflow: 'visible' }}>
        {/* Fins */}
        <path d="M40 175 L18 225 L40 215 Z" fill="#2456d6" />
        <path d="M80 175 L102 225 L80 215 Z" fill="#2456d6" />
        {/* Body */}
        <path d="M40 70 Q40 50 60 30 Q80 50 80 70 L80 215 L40 215 Z" fill="#e8eef7" />
        <path d="M60 30 Q80 50 80 70 L80 215 L60 215 Z" fill="#b9c4d6" />
        {/* Nose tip */}
        <path d="M60 30 Q52 42 53 60 L60 60 Z" fill="#4d84ff" />
        {/* Window */}
        <circle cx="60" cy="100" r="13" fill="#0b1220" stroke="#4d84ff" strokeWidth="3" />
        <circle cx="56" cy="96" r="4" fill="rgba(77,132,255,0.6)" />
        {/* Body band */}
        <rect x="40" y="150" width="40" height="6" fill="#4d84ff" opacity="0.85" />
        {/* Nozzle */}
        <path d="M48 215 L72 215 L66 230 L54 230 Z" fill="#7c8aa0" />

        {/* Plasma flame */}
        {ignited && (
          <g>
            <motion.path
              d="M52 230 Q60 290 68 230 Z"
              fill="#4d84ff"
              animate={{ scaleY: [1, 1.5, 0.85, 1.35, 1], opacity: [0.85, 1, 0.7, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 0.45, ease: 'easeInOut' }}
              style={{ transformOrigin: '60px 230px' }}
            />
            <motion.path
              d="M55 230 Q60 270 65 230 Z"
              fill="#bcd4ff"
              animate={{ scaleY: [1, 1.4, 0.9, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 0.32, ease: 'easeInOut' }}
              style={{ transformOrigin: '60px 230px' }}
            />
            <motion.path
              d="M57 230 Q60 252 63 230 Z"
              fill="#ffffff"
              animate={{ scaleY: [1, 1.3, 1, 1.2, 1], opacity: [0.9, 1, 0.85, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.25, ease: 'easeInOut' }}
              style={{ transformOrigin: '60px 230px' }}
            />
          </g>
        )}
      </svg>

      {/* Exhaust glow */}
      {ignited && (
        <motion.div
          animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '-20px',
            width: '90px',
            height: '90px',
            background: 'radial-gradient(circle, rgba(77,132,255,0.45) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  )
}

function TelemetryPanel({ active }) {
  const [t, setT] = useState({ alt: 0, vel: 0, pitch: 0, roll: 0, g: 1 })

  useEffect(() => {
    if (!active) return
    let frame = 0
    const id = setInterval(() => {
      frame += 1
      // Illustrative looping values — a concept readout, not real flight data.
      const phase = (frame % 120) / 120
      setT({
        alt: Math.round(1200 * Math.sin(phase * Math.PI) + Math.random() * 8),
        vel: Math.round(180 * Math.sin(phase * Math.PI) + Math.random() * 4),
        pitch: (88 + Math.sin(frame / 6) * 2).toFixed(1),
        roll: (Math.sin(frame / 9) * 12).toFixed(1),
        g: (1 + Math.abs(Math.sin(phase * Math.PI)) * 6).toFixed(1),
      })
    }, 120)
    return () => clearInterval(id)
  }, [active])

  const rows = [
    { label: 'ALTITUDE', value: `${t.alt} m` },
    { label: 'VELOCITY', value: `${t.vel} m/s` },
    { label: 'PITCH', value: `${t.pitch}°` },
    { label: 'ROLL', value: `${t.roll}°` },
    { label: 'ACCEL', value: `${t.g} g` },
  ]

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '340px',
        background: 'var(--telem-bg)',
        border: '1px solid var(--telem-border)',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        backdropFilter: 'blur(8px)',
        fontFamily: 'var(--mono)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }}
          />
          TELEMETRY
        </span>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--text-dim)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px' }}>
          PREVIEW
        </span>
      </div>
      {rows.map((r) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.4rem 0', borderBottom: '1px solid var(--row-border)' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>{r.label}</span>
          <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{r.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function FeaturedRocket() {
  const ref = useRef(null)
  const { animationsEnabled } = useAnimations()
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const animate = inView && animationsEnabled

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
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '70vw', height: '70vw', maxWidth: 900, maxHeight: 900,
        background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 60%)', pointerEvents: 'none',
      }} />
      <SectionNum n="00" />

      <div style={{ maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}
        >
          <span className="eyebrow">00 / Featured build</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em',
            color: '#fbbf24', background: 'rgba(251,191,36,0.1)',
            border: '1px solid rgba(251,191,36,0.3)', borderRadius: 100, padding: '0.25rem 0.8rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} />
            {PROJECT.status}
          </span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'center' }} className="rocket-grid">
          {/* Left: copy */}
          <div>
            <motion.h2
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
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 560 }}
            >
              {PROJECT.description}
            </motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {PROJECT.focus.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                  style={{ padding: '1.1rem 1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.6rem' }}>
                    {focusIcon[f.icon]}
                  </svg>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>{f.title}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.detail}</div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
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
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.95rem 2.2rem', background: 'var(--accent-fill)', color: 'var(--accent-ink)',
                        fontWeight: 700, fontSize: '0.8rem', borderRadius: 'var(--radius)', letterSpacing: '0.08em', textTransform: 'uppercase',
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
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.95rem 2.2rem', background: 'transparent', color: 'var(--text)',
                      fontWeight: 700, fontSize: '0.8rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}
                  >
                    View code
                  </a>
                </Magnetic>
              )}
            </motion.div>
          </div>

          {/* Right: rocket + telemetry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
          >
            <Rocket ignited={animate} />
            <Tilt max={5} scale={1.01} style={{ width: '100%', maxWidth: 340 }}>
              <TelemetryPanel active={animate} />
            </Tilt>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .rocket-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
