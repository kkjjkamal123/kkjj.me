import { useRef } from 'react'
import { usePauseOffscreen } from '../lib/scroll'

// Infinite horizontal scrolling band. Duplicates children once and
// translates the track by exactly one copy's width, so the seam lands
// where the first copy started and the loop is invisible.
//
// The trailing gap lives inside each copy (padding-right) rather than
// between them: a gap on the track itself is not part of either copy,
// so -50% would land half a gap short and the band would visibly jump
// on every cycle.
export default function Marquee({ children, duration = 28, direction = 'normal', style, gap = '3rem' }) {
  const ref = useRef(null)
  usePauseOffscreen(ref)
  const group = { display: 'flex', gap, paddingRight: gap, flexShrink: 0 }

  return (
    <div ref={ref} className="marquee" style={style}>
      <div
        className="marquee-track"
        style={{ '--marquee-duration': `${duration}s`, '--marquee-direction': direction }}
      >
        <div style={group}>{children}</div>
        <div style={group} aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
