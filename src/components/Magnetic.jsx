import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Magnetic({ children, range = 60, strength = 0.4, as = 'div', style, 'data-cursor': dataCursor, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 18, stiffness: 220, mass: 0.5 })
  const sy = useSpring(y, { damping: 18, stiffness: 220, mass: 0.5 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist < range) {
      x.set(dx * strength)
      y.set(dy * strength)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = motion[as] || motion.div

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-block' }}
      data-cursor={dataCursor}
    >
      <Comp
        style={{ x: sx, y: sy, display: 'inline-block', ...style }}
        {...rest}
      >
        {children}
      </Comp>
    </div>
  )
}
