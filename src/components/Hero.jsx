import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
})

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(1.5rem, 6vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
        <motion.p {...fadeUp(0.1)} style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--accent)' }} />
          Available for opportunities
        </motion.p>

        <motion.h1 {...fadeUp(0.2)} style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem',
        }}>
          VS<br />
          <span style={{ color: 'var(--accent)' }}>Kamalesh</span>
        </motion.h1>

        <motion.p {...fadeUp(0.35)} style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: 'var(--text-muted)',
          maxWidth: '560px',
          lineHeight: 1.7,
          marginBottom: '3rem',
          fontWeight: 400,
        }}>
          Embedded systems, computer vision & AI — and now rockets.
          I build things that sense, move, and fly.
        </motion.p>

        <motion.div {...fadeUp(0.5)} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '0.85rem 2rem',
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              borderRadius: '8px',
              transition: 'all 0.25s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            View my work
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '0.85rem 2rem',
              background: 'transparent',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              transition: 'all 0.25s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
