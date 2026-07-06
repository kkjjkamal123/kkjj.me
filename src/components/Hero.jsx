import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import RevealText from './RevealText'
import ScrambleText from './ScrambleText'
import Magnetic from './Magnetic'
import Marquee from './Marquee'

const ROLES = ['EMBEDDED SYSTEMS', 'COMPUTER VISION', 'ARTIFICIAL INTELLIGENCE', 'AEROSPACE', 'ROBOTICS']

export default function Hero() {
  const sectionRef = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const glowX = useSpring(mx, { damping: 30, stiffness: 60 })
  const glowY = useSpring(my, { damping: 30, stiffness: 60 })
  const parX = useTransform(mx, [0, 1], [-18, 18])
  const parY = useTransform(my, [0, 1], [-18, 18])

  const onMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={onMove}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '64px',
      }}
    >
      {/* Cursor-reactive glow */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(560px circle at ${gx * 100}% ${gy * 100}%, rgba(59,130,246,0.14), transparent 70%)`
          ),
        }}
      />

      {/* Oversized watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -54%)',
          fontFamily: 'var(--display)',
          fontWeight: 700,
          fontSize: 'clamp(8rem, 32vw, 26rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        BUILD
      </motion.div>

      <div style={{ padding: '0 clamp(1.5rem, 6vw, 8rem)', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,280px)', gap: '2rem', alignItems: 'end' }} className="hero-grid">
        <div style={{ maxWidth: '980px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.4rem 0.9rem 0.4rem 0.5rem',
              border: '1px solid var(--border)',
              borderRadius: 100,
              marginBottom: '2rem',
            }}
          >
            <span style={{ position: 'relative', width: 8, height: 8 }}>
              <motion.span
                animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e' }}
              />
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e' }} />
            </span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Available for opportunities
            </span>
          </motion.div>

          <h1 style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(3.2rem, 9.5vw, 7.5rem)',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
          }}>
            <RevealText as="span" text="Kamalesh" delay={0.25} />
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.4em' }}>
              <RevealText as="span" text="VS." delay={0.4} wordStyle={{ color: 'var(--accent)' }} />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{ fontFamily: 'var(--body)', fontWeight: 500, fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--text-dim)', letterSpacing: 0 }}
              >
                / builder
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
              color: 'var(--text-muted)',
              maxWidth: '540px',
              lineHeight: 1.7,
              margin: '2rem 0 2.5rem',
            }}
          >
            I build things that <ScrambleText as="span" text="sense" style={{ color: '#fff', fontWeight: 600 }} />,{' '}
            <ScrambleText as="span" text="move" style={{ color: '#fff', fontWeight: 600 }} /> and{' '}
            <ScrambleText as="span" text="fly" style={{ color: 'var(--accent)', fontWeight: 600 }} />. Embedded systems, computer
            vision &amp; AI — currently engineering a rocket from airframe to telemetry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <Magnetic range={70} strength={0.35}>
              <button
                data-cursor="View"
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '0.95rem 2.2rem',
                  background: 'var(--accent)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  borderRadius: 100,
                  letterSpacing: '0.02em',
                }}
              >
                View my work
              </button>
            </Magnetic>
            <Magnetic range={70} strength={0.35}>
              <button
                data-cursor="Say hi"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '0.95rem 2.2rem',
                  background: 'transparent',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  borderRadius: 100,
                  border: '1px solid var(--border)',
                }}
              >
                Get in touch
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Floating parallax stat card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ x: parX, y: parY, marginBottom: '0.5rem' }}
          className="hero-float-card"
        >
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1.4rem',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(6px)',
          }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                05
              </motion.span>
              +
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', letterSpacing: '0.05em' }}>
              disciplines, one builder — see the rocket below
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{ marginTop: 'clamp(3rem, 8vw, 6rem)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1rem 0', position: 'relative', zIndex: 1 }}
      >
        <Marquee duration={24}>
          {ROLES.map((r) => (
            <span key={r} style={{ display: 'flex', alignItems: 'center', gap: '3rem', fontFamily: 'var(--display)', fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
              {r}
              <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>&#9670;</span>
            </span>
          ))}
        </Marquee>
      </motion.div>

      <style>{`
        @media (max-width: 760px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-float-card { display: none; }
        }
      `}</style>
    </section>
  )
}
