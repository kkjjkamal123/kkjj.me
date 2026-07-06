// Infinite horizontal scrolling band. Duplicates children once so the
// CSS animation (-50%) loops seamlessly.
export default function Marquee({ children, duration = 28, direction = 'normal', style, gap = '3rem' }) {
  return (
    <div style={{ overflow: 'hidden', width: '100%', ...style }}>
      <div
        className="marquee-track"
        style={{ '--marquee-duration': `${duration}s`, '--marquee-direction': direction, gap }}
      >
        <div style={{ display: 'flex', gap, flexShrink: 0 }}>{children}</div>
        <div style={{ display: 'flex', gap, flexShrink: 0 }} aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
