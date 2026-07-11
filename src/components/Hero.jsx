import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import RevealText from './RevealText'
import ScrambleText from './ScrambleText'
import Magnetic from './Magnetic'
import Marquee from './Marquee'

const ROLES = ['EMBEDDED SYSTEMS', 'COMPUTER VISION', 'ARTIFICIAL INTELLIGENCE', 'AEROSPACE', 'ROBOTICS']

const DATA_STRIP = [
  { value: '43.6', label: 'FPS · Edge CV on RPi 5' },
  { value: '0.982', label: 'mAP50 · YOLOv8n-OBB' },
  { value: '05+', label: 'Disciplines · One builder' },
  { value: '2020', label: 'Building since' },
]

const BRACKETS = [
  { top: 0, left: 0, borderWidth: '1px 0 0 1px' },
  { top: 0, right: 0, borderWidth: '1px 1px 0 0' },
  { bottom: 0, left: 0, borderWidth: '0 0 1px 1px' },
  { bottom: 0, right: 0, borderWidth: '0 1px 1px 0' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const glowX = useSpring(mx, { damping: 30, stiffness: 60 })
  const glowY = useSpring(my, { damping: 30, stiffness: 60 })
  // Easter egg: the outlined BUILD watermark drifts gently against the cursor
  const parX = useTransform(glowX, [0, 1], [22, -22])
  const parY = useTransform(glowY, [0, 1], [14, -14])

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
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '64px',
      }}
    >
      <div className="hero-blueprint" aria-hidden="true" />

      {/* Cursor-reactive glow */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(640px circle at ${gx * 100}% ${gy * 100}%, var(--accent-glow), transparent 70%)`,
          ),
        }}
      />

      {/* Metadata row — in flow, so it can never sit on the name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="hero-meta-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1rem clamp(1.25rem, 5vw, 6rem)',
          borderBottom: '1px solid var(--border)',
          fontFamily: 'var(--mono)',
          fontSize: '0.66rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span className="hero-meta-right">Portfolio / 2026</span>
        <span style={{ color: 'var(--accent)' }}>● Available for collaboration</span>
        <span className="hero-meta-right">IND · Earth · LEO-curious</span>
      </motion.div>

      {/* Center stage */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(3rem, 6vh, 5rem) clamp(1.25rem, 5vw, 6rem)',
          zIndex: 1,
        }}
      >
        {/* HUD corner brackets */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 'clamp(1rem, 3vw, 2rem)', pointerEvents: 'none' }}>
          {BRACKETS.map((b, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ delay: 1.2 + i * 0.08, duration: 0.5 }}
              style={{ position: 'absolute', width: 22, height: 22, borderStyle: 'solid', borderColor: 'var(--text-dim)', ...b }}
            />
          ))}
        </div>

        {/* Easter egg: outlined BUILD watermark, parallax-drifting behind the name */}
        <motion.span
          aria-hidden="true"
          className="mega"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.6 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            translateX: '-50%',
            translateY: '-50%',
            x: parX,
            y: parY,
            fontSize: 'clamp(8rem, 26vw, 22rem)',
            color: 'transparent',
            WebkitTextStroke: '1px var(--watermark-stroke)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          BUILD
        </motion.span>

        <h1 className="mega" style={{ fontSize: 'clamp(3.4rem, 10vw, 8.5rem)', position: 'relative', zIndex: 1, width: 'fit-content', textAlign: 'left', margin: 0 }}>
          <RevealText as="span" text="KAMALESH" delay={0.25} />
          <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.4em' }}>
            <RevealText as="span" text="VS" delay={0.4} wordStyle={{ color: 'var(--accent)' }} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(0.7rem, 1.4vw, 0.9rem)', letterSpacing: '0.3em', color: 'var(--text-dim)' }}
            >
              EST. 2006
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-muted)',
            maxWidth: '560px',
            lineHeight: 1.7,
            margin: 'clamp(1.5rem, 3.5vh, 2.5rem) auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          I build things that <ScrambleText as="span" text="sense" style={{ color: 'var(--text)', fontWeight: 600 }} />,{' '}
          <ScrambleText as="span" text="move" style={{ color: 'var(--text)', fontWeight: 600 }} /> and{' '}
          <ScrambleText as="span" text="fly" style={{ color: 'var(--accent)', fontWeight: 600 }} /> — embedded systems,
          computer vision &amp; AI, currently engineering a rocket from airframe to telemetry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}
        >
          <Magnetic range={70} strength={0.35} data-cursor="View">
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '1rem 2.4rem',
                background: 'var(--accent-fill)',
                color: 'var(--accent-ink)',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: 'var(--radius)',
              }}
            >
              View the work
            </button>
          </Magnetic>
          <Magnetic range={70} strength={0.35} data-cursor="Say hi">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '1rem 2.4rem',
                background: 'transparent',
                color: 'var(--text)',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
              }}
            >
              Get in touch
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Data strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        style={{
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {DATA_STRIP.map((d, i) => (
          <div
            key={d.label}
            style={{
              padding: 'clamp(1rem, 2.5vw, 1.6rem) clamp(1.25rem, 3vw, 2.5rem)',
              borderRight: i < DATA_STRIP.length - 1 ? '1px solid var(--border)' : 'none',
            }}
            className="hero-stat-cell"
          >
            <div className="mega" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: 'var(--accent)' }}>
              {d.value}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              {d.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Marquee ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{ borderTop: '1px solid var(--border)', padding: '0.9rem 0', position: 'relative', zIndex: 1 }}
      >
        <Marquee duration={24}>
          {ROLES.map((r) => (
            <span key={r} className="mega" style={{ display: 'flex', alignItems: 'center', gap: '3rem', fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
              {r}
              <span style={{ color: 'var(--accent)', fontSize: '0.7em' }}>&#9670;</span>
            </span>
          ))}
        </Marquee>
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .hero-meta-right { display: none; }
          #hero .hero-meta-row { justify-content: center; }
          .hero-stat-cell { border-right: none !important; border-bottom: 1px solid var(--border); }
          .hero-stat-cell:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  )
}
