import { useEffect, useRef, useState } from 'react'

// On hover, characters scramble through random glyphs before settling
// back into the real text — a staple hover trick on creative dev sites.
export default function ScrambleText({ text, style, as = 'span', active, duration = 450, intervalsBetween = 30, delay = 0, ...rest }) {
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const prevActive = useRef(Boolean(active))
  const Tag = as

  const normalizedDuration = duration <= 10 ? duration * 1000 : duration
  const normalizedDelay = delay <= 10 ? delay * 1000 : delay

  const scrambledText = (linkText) =>
    linkText
      .split('')
      .map((char) =>
        char === ' '
          ? ' '
          : String.fromCharCode(Math.floor(Math.random() * (126 - 91)) + 91)
      )
      .join('')

  const restoreText = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setDisplay(text)
  }

  const handleScramble = () => {
    if (intervalRef.current || timeoutRef.current) return
    let i = 0
    const maxTicks = Math.max(1, Math.floor(normalizedDuration / intervalsBetween))
    const start = () => {
      intervalRef.current = setInterval(() => {
        setDisplay(scrambledText(text))
        if (i++ >= maxTicks) {
          restoreText()
        }
      }, intervalsBetween)
    }
    if (normalizedDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
        start()
      }, normalizedDelay)
      return
    }
    start()
  }

  useEffect(() => {
    restoreText()
    setDisplay(text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    if (typeof active !== 'boolean') return
    if (active && !prevActive.current) handleScramble()
    if (!active && prevActive.current) restoreText()
    prevActive.current = active
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, text])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => restoreText(), [])

  const handlers = typeof active === 'boolean' ? {} : { onMouseEnter: handleScramble, onMouseLeave: restoreText }

  return (
    <Tag {...handlers} style={{ fontVariantNumeric: 'tabular-nums', ...style }} {...rest}>
      {display}
    </Tag>
  )
}
