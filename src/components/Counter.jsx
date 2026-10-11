import { useEffect, useRef, useState } from 'react'

// Counts up from 0 to a numeric target once it scrolls into view.
// Values that are not purely numeric ("6+", "05+") keep whatever
// trails the digits, and any leading zeros are preserved so the
// count-up ends on exactly the string that was passed in.
export default function Counter({ value, inView, duration = 1.2, style }) {
  const text = String(value ?? '')
  const digits = text.match(/^\d+/)
  const numeric = digits ? Number(digits[0]) : NaN
  const pad = digits ? digits[0].length : 0
  const suffix = digits ? text.slice(digits[0].length) : ''

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

  if (Number.isNaN(numeric)) return <span style={style}>{text}</span>
  return <span style={style}>{String(display).padStart(pad, '0')}{suffix}</span>
}
