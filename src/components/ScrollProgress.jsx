import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { damping: 30, stiffness: 200, mass: 0.2 })

  return (
    <motion.div
      style={{
        scaleX: progress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
        transformOrigin: '0% 50%',
        zIndex: 200,
      }}
    />
  )
}
