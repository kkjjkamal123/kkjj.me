import { useParallax } from '../lib/scroll'
import { useAnimations } from './AnimationContext'

// Ambient colour fields that sit behind glass panes. backdrop-filter has
// nothing to refract on a flat background, so panes read as grey boxes
// without these. Each orb drifts at its own rate for depth separation.
export default function Orbs({ items = [], parallax = true }) {
  const { animationsEnabled } = useAnimations()

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {items.map((o, i) => (
        <Orb key={i} {...o} parallax={parallax && animationsEnabled} />
      ))}
    </div>
  )
}

function Orb({ top, left, right, bottom, size = '38vw', color = 'var(--orb-1)', speed = 0.18, parallax }) {
  const ref = useParallax(speed, { enabled: parallax })

  return (
    <div
      ref={ref}
      className="orb"
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        maxWidth: 720,
        maxHeight: 720,
        // Multi-stop falloff replaces filter: blur() — same softness, no repaint cost.
        background: `radial-gradient(circle closest-side, ${color} 0%, ${color} 12%, transparent 72%)`,
      }}
    />
  )
}
