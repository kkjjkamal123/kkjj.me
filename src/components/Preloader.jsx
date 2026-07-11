import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf
    let timeoutId
    const start = performance.now()
    const duration = 1100
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setPct(Math.round(t * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        timeoutId = setTimeout(() => setDone(true), 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeoutId)
    }
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
            gap: '1.5rem',
            padding: '2rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mega"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 6rem)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}
          >
            {pct}<span style={{ color: 'var(--accent)', fontSize: '0.45em' }}>%</span>
          </motion.div>

          <div style={{ width: 'min(300px, 62vw)', height: '1px', background: 'var(--border)', position: 'relative', overflow: 'hidden' }}>
            <motion.div
              style={{ position: 'absolute', inset: 0, background: 'var(--accent-fill)', transformOrigin: '0% 50%' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: pct / 100 }}
              transition={{ ease: 'linear', duration: 0.05 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.66rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>●</span>&nbsp; Systems check in progress
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
