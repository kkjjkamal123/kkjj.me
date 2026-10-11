import { useRef, useCallback, useEffect } from 'react'
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Perspective tilt that tracks the cursor position within the element.
//
// Two costs to avoid: getBoundingClientRect() inside the move handler
// forces a synchronous layout on every event, and mousemove fires faster
// than the display refreshes. So the rect is measured once on enter, and
// updates are coalesced to one per frame.
//
// The one thing that invalidates a cached rect is scrolling, which under
// smooth scroll keeps happening while the pointer hovers. Rather than
// re-measure, the scroll position at measure time is kept and the delta
// subtracted from the cached top.
export default function Tilt({ children, max = 10, scale = 1.02, style, ...rest }) {
  const ref = useRef(null)
  const rectRef = useRef(null)
  const scrollRef = useRef(0)
  const rafRef = useRef(0)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spx = useSpring(px, { damping: 20, stiffness: 200 })
  const spy = useSpring(py, { damping: 20, stiffness: 200 })

  const rotateX = useTransform(spy, [0, 1], [max, -max])
  const rotateY = useTransform(spx, [0, 1], [-max, max])

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
        px.set((clientX - rect.left) / rect.width)
        py.set((clientY - (rect.top - drift)) / rect.height)
      })
    },
    [px, py]
  )

  const onLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = 0
    px.set(0.5)
    py.set(0.5)
  }, [px, py])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <m.div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale }}
      style={{ rotateX, rotateY, transformPerspective: 800, ...style }}
      {...rest}
    >
      {children}
    </m.div>
  )
}
