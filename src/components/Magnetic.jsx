import { useRef, useCallback, useEffect } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'

export default function Magnetic({ children, range = 60, strength = 0.4, as = 'div', style, 'data-cursor': dataCursor, ...rest }) {
  const ref = useRef(null)
  const rectRef = useRef(null)
  const scrollRef = useRef(0)
  const rafRef = useRef(0)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 18, stiffness: 220, mass: 0.5 })
  const sy = useSpring(y, { damping: 18, stiffness: 220, mass: 0.5 })

  // Measured once on enter rather than per move: it avoids a layout
  // flush on every event, and the outer wrapper never moves (only the
  // inner element translates) so the cached rect stays correct.
  //
  // Scrolling does move it, though, and smooth scroll means the page can
  // still be gliding while the pointer sits over the element — so the
  // scroll offset at measure time is kept and subtracted out below,
  // which costs nothing and needs no re-measure.
  const onEnter = useCallback(() => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect()
      scrollRef.current = window.scrollY
    }
  }, [])

  const onMove = useCallback(
    (e) => {
      const rect = rectRef.current
      if (!rect || rafRef.current) return
      const { clientX, clientY } = e
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const drift = window.scrollY - scrollRef.current
        const dx = clientX - (rect.left + rect.width / 2)
        const dy = clientY - (rect.top - drift + rect.height / 2)
        if (Math.hypot(dx, dy) < range) {
          x.set(dx * strength)
          y.set(dy * strength)
        } else {
          x.set(0)
          y.set(0)
        }
      })
    },
    [range, strength, x, y]
  )

  const onLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = 0
    x.set(0)
    y.set(0)
  }, [x, y])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const Comp = m[as] || m.div

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
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
