import { useRef, useEffect } from 'react'
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion'
import RevealText from './RevealText'
import Magnetic from './Magnetic'
import Marquee from './Marquee'
import Orbs from './Orbs'
import { useParallax, usePauseOffscreen, scrollToId } from '../lib/scroll'
import { useAnimations } from './AnimationContext'

const ROLES = ['EMBEDDED SYSTEMS', 'COMPUTER VISION', 'ARTIFICIAL INTELLIGENCE', 'AEROSPACE', 'ROBOTICS']

const DATA_STRIP = [
  { value: 'ECE', label: 'Undergrad · Chennai, India' },
  { value: '05+', label: 'Disciplines · One builder' },
  { value: '2006', label: 'Taking things apart since' },
  { value: '2020', label: 'First commit' },
]

const BRACKETS = [
  { top: 0, left: 0, borderWidth: '1px 0 0 1px' },
  { top: 0, right: 0, borderWidth: '1px 1px 0 0' },
  { bottom: 0, left: 0, borderWidth: '0 0 1px 1px' },
  { bottom: 0, right: 0, borderWidth: '0 1px 1px 0' },
]

const GLOW_SIZE = 760

// `ready` goes true when the preloader has finished wiping away. The
// timed entrance below is held until then — otherwise the whole
// choreography plays out behind an opaque curtain and the hero is
// simply already there when the curtain lifts.
export default function Hero({ ready = true }) {
  const sectionRef = useRef(null)
  const rectRef = useRef(null)
  const rafRef = useRef(0)
  const { animationsEnabled } = useAnimations()

  // Normalised 0–1 position, used for the watermark drift.
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const glowX = useSpring(mx, { damping: 30, stiffness: 60 })
  const glowY = useSpring(my, { damping: 30, stiffness: 60 })
  // Easter egg: the outlined BUILD watermark drifts gently against the cursor
  const parX = useTransform(glowX, [0, 1], [22, -22])
  const parY = useTransform(glowY, [0, 1], [14, -14])

  // Pixel position for the glow. Animating a radial-gradient's `at`
  // stop repaints the whole layer each frame; translating a fixed-size
  // pre-painted layer stays on the compositor instead.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spx = useSpring(px, { damping: 30, stiffness: 60 })
  const spy = useSpring(py, { damping: 30, stiffness: 60 })
  const glowTX = useTransform(spx, (v) => v - GLOW_SIZE / 2)
  const glowTY = useTransform(spy, (v) => v - GLOW_SIZE / 2)

  // Scroll parallax runs on a wrapper so it composes with the cursor
  // drift above instead of fighting it for the same transform.
  const watermarkScroll = useParallax(0.32, { enabled: animationsEnabled })
  const gridScroll = useParallax(0.12, { enabled: animationsEnabled })
  usePauseOffscreen(sectionRef)

  // The rect is measured on pointer entry and on resize — never on
  // scroll, which would cost a layout flush on every scrolled frame for
  // an effect that only matters while the pointer is inside the hero.
  const measure = () => {
    if (sectionRef.current) rectRef.current = sectionRef.current.getBoundingClientRect()
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure, { passive: true })
    return () => {
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const onMove = (e) => {
    if (!animationsEnabled) return
    const { clientX, clientY } = e
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      const rect = rectRef.current
      if (!rect) return
      const x = clientX - rect.left
      const y = clientY - rect.top
      mx.set(x / rect.width)
      my.set(y / rect.height)
      px.set(x)
      py.set(y)
    })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseEnter={measure}
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
      <Orbs
        items={[
          { top: '-8%', left: '-6%', size: '46vw', color: 'var(--orb-1)', speed: 0.14 },
          { bottom: '-12%', right: '-8%', size: '40vw', color: 'var(--orb-2)', speed: 0.24 },
        ]}
      />

      <div ref={gridScroll} className="hero-blueprint" aria-hidden="true" />

      {/* Cursor-reactive glow — a pre-painted layer that only translates */}
      <m.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          x: glowTX,
          y: glowTY,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(circle closest-side, var(--accent-glow), transparent 100%)',
          willChange: 'transform',
        }}
      />

      {/* Metadata row — in flow, so it can never sit on the name */}
      <m.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hero-meta-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem clamp(1.25rem, 5vw, 6rem)',
          borderBottom: '1px solid var(--border)',
          fontFamily: 'var(--mono)',
          fontSize: '0.66rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span className="hero-meta-right">Chennai, India</span>
        <span
          className="glass glass-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.9rem',
            borderRadius: 100,
            color: 'var(--accent)',
            boxShadow: 'var(--shadow-1)',
          }}
        >
          <span
            className="pulse-dot"
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}
          />
          Looking for internships
        </span>
        <span className="hero-meta-right">ECE undergrad</span>
      </m.div>

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
            <m.span
              key={i}
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 0.55 } : { opacity: 0 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
              style={{ position: 'absolute', width: 22, height: 22, borderStyle: 'solid', borderColor: 'var(--text-faint)', ...b }}
            />
          ))}
        </div>

        {/* Easter egg: outlined BUILD watermark, parallax-drifting behind the name */}
        <div
          ref={watermarkScroll}
          aria-hidden="true"
          style={{ position: 'absolute', top: '50%', left: '50%', translate: '-50% -50%', zIndex: 0, pointerEvents: 'none' }}
        >
          <m.span
            className="mega"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.6, delay: 0.1 }}
            style={{
              display: 'block',
              x: parX,
              y: parY,
              fontSize: 'clamp(8rem, 26vw, 22rem)',
              color: 'transparent',
              WebkitTextStroke: '1px var(--watermark-stroke)',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            BUILD
          </m.span>
        </div>

        <h1 className="mega" style={{ fontSize: 'clamp(3.4rem, 10vw, 8.5rem)', position: 'relative', zIndex: 1, width: 'fit-content', textAlign: 'left', margin: 0 }}>
          <RevealText as="span" text="KAMALESH" delay={0.05} inView={ready} />
          <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.4em' }}>
            <RevealText as="span" text="VS" delay={0.18} inView={ready} wordStyle={{ color: 'var(--accent)' }} />
          </span>
        </h1>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.3 }}
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
          I build things that have to work outside the lab: an on-device LLM runtime that generates tokens
          <span style={{ color: 'var(--text)', fontWeight: 600 }}> 47% faster than Arm&apos;s own reference app</span>,
          thermal management for a CubeSat, and a model rocket with the avionics that ride in it.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="hero-ctas"
          style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}
        >
          <Magnetic range={70} strength={0.35} data-cursor="View">
            <button onClick={() => scrollToId('#projects')} className="btn btn-primary">
              View the work
            </button>
          </Magnetic>
          <Magnetic range={70} strength={0.35} data-cursor="CV">
            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn glass glass-hover"
              style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
            >
              Download CV
            </a>
          </Magnetic>
          <Magnetic range={70} strength={0.35} data-cursor="Say hi">
            <button onClick={() => scrollToId('#contact')} className="btn glass glass-hover" style={{ color: 'var(--text)' }}>
              Get in touch
            </button>
          </Magnetic>
        </m.div>
      </div>

      {/* Data strip — glass tiles over the ambient field */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'clamp(0.5rem, 1vw, 0.75rem)',
          padding: '0 clamp(1.25rem, 5vw, 6rem) clamp(1rem, 2vw, 1.5rem)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {DATA_STRIP.map((d) => (
          <div
            key={d.label}
            className="glass glass-sm glass-hover"
            style={{ padding: 'clamp(1rem, 2.2vw, 1.4rem) clamp(1rem, 2vw, 1.5rem)' }}
          >
            <div className="mega" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: 'var(--accent)' }}>
              {d.value}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              {d.label}
            </div>
          </div>
        ))}
      </m.div>

      {/* Marquee ticker */}
      <m.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.58, duration: 0.6 }}
        style={{ borderTop: '1px solid var(--border)', padding: '0.9rem 0', position: 'relative', zIndex: 1 }}
      >
        <Marquee duration={24}>
          {ROLES.map((r) => (
            <span key={r} className="mega" style={{ display: 'flex', alignItems: 'center', gap: '3rem', fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
              {r}
              <span style={{ color: 'var(--accent)', fontSize: '0.7em' }}>&#9670;</span>
            </span>
          ))}
        </Marquee>
      </m.div>

      <style>{`
        @media (max-width: 640px) {
          .hero-meta-right { display: none; }
          #hero .hero-meta-row { justify-content: center !important; }
        }
        @media (max-width: 520px) {
          .hero-ctas { flex-direction: column; align-items: stretch; width: 100%; max-width: 340px; }
          .hero-ctas > div, .hero-ctas > div > div, .hero-ctas .btn { width: 100%; }
        }
      `}</style>
    </section>
  )
}
