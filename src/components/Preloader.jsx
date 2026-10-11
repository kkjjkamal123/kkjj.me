import { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'

// Shown once per browser session. The page underneath is held at
// opacity 0 until this reports done, so `onDone` must fire on every
// path out of here — including the ones where the exit animation never
// runs (reduced motion, a backgrounded tab, an interrupted transition).
const SESSION_KEY = 'preloader_shown'

export default function Preloader({ onDone }) {
  const alreadyShown = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1'

  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(alreadyShown)

  // onDone is an inline arrow at the call site, so it changes identity
  // every render. Hold the latest one instead of depending on it.
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const firedRef = useRef(false)
  const finish = () => {
    if (firedRef.current) return
    firedRef.current = true
    try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* private mode */ }
    onDoneRef.current?.()
  }

  useEffect(() => {
    if (alreadyShown) {
      finish()
      return
    }

    let raf
    let timeoutId
    const start = performance.now()
    const duration = 700
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setPct(Math.round(t * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        timeoutId = setTimeout(() => setDone(true), 120)
      }
    }
    raf = requestAnimationFrame(tick)

    // Watchdog. rAF is throttled to zero in a background tab, and an
    // exit transition that never completes would leave the page blank
    // forever. Reveal the site regardless well before that is visible.
    const watchdog = setTimeout(finish, 4000)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeoutId)
      clearTimeout(watchdog)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (alreadyShown) return null

  return (
    <AnimatePresence onExitComplete={finish}>
      {!done && (
        <m.div
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
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mega"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 6rem)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}
          >
            {pct}<span style={{ color: 'var(--accent)', fontSize: '0.45em' }}>%</span>
          </m.div>

          <div style={{ width: 'min(300px, 62vw)', height: '1px', background: 'var(--border)', position: 'relative', overflow: 'hidden' }}>
            <m.div
              style={{ position: 'absolute', inset: 0, background: 'var(--accent-fill)', transformOrigin: '0% 50%' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: pct / 100 }}
              transition={{ ease: 'linear', duration: 0.05 }}
            />
          </div>

          <m.div
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
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
