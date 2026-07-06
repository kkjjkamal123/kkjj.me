import { useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+='

// On hover, characters scramble through random glyphs before settling
// back into the real text — a staple hover trick on creative dev sites.
export default function ScrambleText({ text, style, as = 'span', ...rest }) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const raf = useRef(null)
  const Tag = as

  const scramble = () => {
    cancelAnimationFrame(raf.current)
    frame.current = 0
    const totalFrames = 14
    const step = () => {
      frame.current += 1
      const progress = frame.current / totalFrames
      const revealCount = Math.floor(progress * text.length)
      const next = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < revealCount) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')
      setDisplay(next)
      if (frame.current < totalFrames) raf.current = requestAnimationFrame(step)
      else setDisplay(text)
    }
    raf.current = requestAnimationFrame(step)
  }

  const reset = () => {
    cancelAnimationFrame(raf.current)
    setDisplay(text)
  }

  return (
    <Tag onMouseEnter={scramble} onMouseLeave={reset} style={{ fontVariantNumeric: 'tabular-nums', ...style }} {...rest}>
      {display}
    </Tag>
  )
}
