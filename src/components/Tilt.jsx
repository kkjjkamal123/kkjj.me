import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Perspective tilt that tracks the cursor position within the element.
export default function Tilt({ children, max = 10, scale = 1.02, style, ...rest }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spx = useSpring(px, { damping: 20, stiffness: 200 })
  const spy = useSpring(py, { damping: 20, stiffness: 200 })

  const rotateX = useTransform(spy, [0, 1], [max, -max])
  const rotateY = useTransform(spx, [0, 1], [-max, max])

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale }}
      style={{ rotateX, rotateY, transformPerspective: 800, ...style }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
