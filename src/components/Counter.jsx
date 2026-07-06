import { useEffect, useRef, useState } from 'react'

// Counts up from 0 to a numeric target once it scrolls into view.
// Non-numeric targets (e.g. "4+") render as-is after a short delay.
export default function Counter({ value, inView, duration = 1.2, style }) {
  const numeric = typeof value === 'number' ? value : parseInt(value, 10)
  const suffix = typeof value === 'string' ? value.replace(/^[0-9]+/, '') : ''
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current || Number.isNaN(numeric)) return
    started.current = true
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * numeric))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, numeric, duration])

  if (Number.isNaN(numeric)) return <span style={style}>{value}</span>
  return <span style={style}>{display}{suffix}</span>
}
