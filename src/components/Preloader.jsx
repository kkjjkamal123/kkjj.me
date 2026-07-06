import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf
    const start = performance.now()
    const duration = 1100
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setPct(Math.round(t * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}
          >
            VSK<span style={{ color: 'var(--accent)' }}>.</span>
          </motion.div>
          <div style={{ width: 'min(280px, 60vw)', height: '1px', background: 'var(--border)', position: 'relative', overflow: 'hidden' }}>
            <motion.div
              style={{ position: 'absolute', inset: 0, background: 'var(--accent)', transformOrigin: '0% 50%' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: pct / 100 }}
              transition={{ ease: 'linear', duration: 0.05 }}
            />
          </div>
          <motion.div
            style={{ marginTop: '1rem', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--text-dim)', fontVariantNumeric: 'tabular-nums' }}
          >
            {pct}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
