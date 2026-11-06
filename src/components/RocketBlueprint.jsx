import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import { usePauseOffscreen } from '../lib/scroll'
import { useAnimations } from './AnimationContext'

// Side-elevation drawing of Model Rocket V1 in the hero's blueprint
// language. Every stroke draws itself on (pathLength) when the panel
// scrolls in, then labels fade up. Deliberately carries no dimensions:
// the figures live in the repo, and a drawing should not invent them.
//
// Ambient motion — a slow hover-float and the exhaust flicker — is CSS,
// so it runs on the compositor and pauses while off-screen.

const EASE = [0.65, 0, 0.35, 1]

// Outline first, then internals, then annotation — the order a drafter
// would put them down.
const OUTLINE = [
  // Ogive nose cone
  'M122 150 C122 96 139 62 150 38 C161 62 178 96 178 150',
  // Body tube
  'M122 150 L122 470 M178 150 L178 470',
  // Fins (side pair) + the edge-on third fin
  'M122 392 L80 452 L80 488 L122 470',
  'M178 392 L220 452 L220 488 L178 470',
  'M150 404 L150 492',
  // Nozzle
  'M136 470 L131 492 L169 492 L164 470 Z',
]

const JOINTS = ['M122 150 L178 150', 'M122 236 L178 236', 'M122 330 L178 330', 'M122 470 L178 470']

const INTERNALS = [
  // Recovery bay: folded chute
  'M134 166 Q150 178 166 166 Q150 190 134 182 Q150 202 166 194 Q150 218 134 210',
  // Avionics sled
  'M132 252 L168 252 L168 314 L132 314 Z',
  // Motor mount tube
  'M139 344 L139 470 M161 344 L161 470',
]

// Small components on the avionics sled (IMU, baro, storage)
const CHIPS = [
  { x: 137, y: 260, w: 12, h: 10 },
  { x: 152, y: 260, w: 11, h: 10 },
  { x: 137, y: 278, w: 26, h: 7 },
  { x: 137, y: 292, w: 9, h: 14 },
]

const CALLOUTS = [
  { y: 92, label: 'NOSE CONE', x1: 135, side: 'left' },
  { y: 192, label: 'RECOVERY', x1: 128, side: 'left' },
  { y: 283, label: 'AVIONICS', x1: 128, side: 'left' },
  { y: 410, label: 'MOTOR MOUNT', x1: 139, side: 'left' },
  { y: 470, label: 'FINS ×3', x1: 205, side: 'right' },
]

function Draw({ d, inView, delay, dur = 1.1, dashed, width = 1.4, color = 'var(--accent)', opacity = 1 }) {
  return (
    <m.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? '3 4' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity } : { pathLength: 0, opacity: 0 }}
      transition={{ pathLength: { duration: dur, delay, ease: EASE }, opacity: { duration: 0.2, delay } }}
    />
  )
}

function Fade({ children, inView, delay, y = 6 }) {
  return (
    <m.g
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.g>
  )
}

const label = {
  fontFamily: 'var(--mono)',
  fontSize: 8.5,
  letterSpacing: '0.14em',
  fill: 'var(--text-dim)',
}

export default function RocketBlueprint() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const { animationsEnabled } = useAnimations()
  usePauseOffscreen(ref)

  return (
    <figure
      ref={ref}
      className="glass blueprint-panel"
      style={{ margin: 0, padding: 'clamp(1rem, 2vw, 1.5rem)', position: 'relative' }}
    >
      <figcaption
        style={{
          display: 'flex', justifyContent: 'space-between', gap: '1rem',
          fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--text-dim)',
          paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)',
          position: 'relative', zIndex: 2,
        }}
      >
        <span><span style={{ color: 'var(--accent)' }}>FIG. 01</span> — Side elevation</span>
        <span>Not to scale</span>
      </figcaption>

      <div className="blueprint-grid" aria-hidden="true" />

      <svg
        viewBox="0 0 300 540"
        role="img"
        aria-label="Line drawing of Model Rocket V1: nose cone, recovery bay, avionics bay, motor mount and three fins, with centre of gravity marked above centre of pressure."
        style={{ display: 'block', width: '100%', height: 'auto', maxHeight: 'min(60vh, 560px)', margin: '0.5rem auto', position: 'relative', zIndex: 1, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="bp-flame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="45%" stopColor="var(--accent-fill)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--accent-fill)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Centre line */}
        <Draw d="M150 22 L150 528" inView={inView} delay={0} dur={1.4} dashed width={0.8} color="var(--text-faint)" opacity={0.7} />

        <g className={animationsEnabled ? 'bp-float' : undefined}>
          {/* Exhaust — only once the drawing is complete */}
          {animationsEnabled && (
            <Fade inView={inView} delay={2.3} y={-4}>
              <path className="bp-flame" d="M137 494 Q150 560 163 494 Z" fill="url(#bp-flame)" />
              <path className="bp-flame bp-flame-2" d="M143 494 Q150 530 157 494 Z" fill="var(--accent)" opacity="0.55" />
            </Fade>
          )}

          {/* Pane fill behind the outline so the grid doesn't show through the body */}
          <Fade inView={inView} delay={0.9} y={0}>
            <path
              d="M122 470 L122 150 C122 96 139 62 150 38 C161 62 178 96 178 150 L178 470 Z"
              fill="var(--accent-dim)"
            />
          </Fade>

          {OUTLINE.map((d, i) => (
            <Draw key={d} d={d} inView={inView} delay={0.15 + i * 0.12} />
          ))}
          {JOINTS.map((d, i) => (
            <Draw key={d} d={d} inView={inView} delay={0.9 + i * 0.06} width={1} opacity={0.6} dur={0.5} />
          ))}
          {INTERNALS.map((d, i) => (
            <Draw key={d} d={d} inView={inView} delay={1.1 + i * 0.15} width={1} dashed={i === 2} color="var(--text-muted)" opacity={0.8} />
          ))}
          <Fade inView={inView} delay={1.5} y={0}>
            {CHIPS.map((c) => (
              <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={c.w} height={c.h} rx="1" fill="none" stroke="var(--accent)" strokeWidth="0.9" opacity="0.85" />
            ))}
            <circle className={animationsEnabled ? 'bp-led' : undefined} cx="160" cy="300" r="2.2" fill="var(--accent)" />
          </Fade>

          {/* CG (quartered disc) and CP (ringed dot) */}
          <Fade inView={inView} delay={1.75}>
            <g transform="translate(150 318)">
              <circle r="7" fill="var(--bg)" stroke="var(--text)" strokeWidth="1.1" />
              <path d="M0 0 L0 -7 A7 7 0 0 1 7 0 Z M0 0 L0 7 A7 7 0 0 1 -7 0 Z" fill="var(--text)" />
            </g>
            <g transform="translate(150 418)">
              <circle r="7" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.3" />
              <circle r="2.4" fill="var(--accent)" />
            </g>
            <path d="M158 318 L236 318 M158 418 L236 418" stroke="var(--text-faint)" strokeWidth="0.8" strokeDasharray="2 3" />
            <text x="240" y="321" style={{ ...label, fill: 'var(--text)' }}>CG</text>
            <text x="240" y="421" style={{ ...label, fill: 'var(--accent)' }}>CP</text>
          </Fade>
          {/* Stability margin bracket: CP must sit aft of CG */}
          <Draw d="M262 322 L268 322 L268 414 L262 414" inView={inView} delay={2} width={1} dur={0.6} color="var(--accent)" />
          <Fade inView={inView} delay={2.2}>
            <text x="276" y="372" style={{ ...label, fontSize: 7.5 }} transform="rotate(90 276 372)" textAnchor="middle">MARGIN</text>
          </Fade>

          {/* Callouts */}
          {CALLOUTS.map((c, i) => {
            const left = c.side === 'left'
            const x2 = left ? 64 : 236
            return (
              <g key={c.label}>
                <Draw d={`M${c.x1} ${c.y} L${x2} ${c.y}`} inView={inView} delay={1.6 + i * 0.08} width={0.8} dur={0.5} color="var(--text-faint)" />
                <Fade inView={inView} delay={1.8 + i * 0.08}>
                  <circle cx={c.x1} cy={c.y} r="1.6" fill="var(--accent)" />
                  <text x={left ? 60 : 240} y={c.y + 3} textAnchor={left ? 'end' : 'start'} style={label}>{c.label}</text>
                </Fade>
              </g>
            )
          })}
        </g>
      </svg>

      <div
        style={{
          display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap',
          fontFamily: 'var(--mono)', fontSize: '0.58rem', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--text-dim)',
          paddingTop: '0.75rem', borderTop: '1px solid var(--border)',
          position: 'relative', zIndex: 2,
        }}
      >
        <span>OpenRocket</span>
        <span style={{ color: 'var(--accent)' }} aria-hidden="true">→</span>
        <span>CFD</span>
        <span style={{ color: 'var(--accent)' }} aria-hidden="true">→</span>
        <span>Print</span>
        <span style={{ color: 'var(--accent)' }} aria-hidden="true">→</span>
        <span>Fly</span>
      </div>
    </figure>
  )
}
