import { motion, AnimatePresence } from 'framer-motion'
import { useAnimations } from './AnimationContext'

export default function AnimationToggle() {
  const { animationsEnabled, toggleAnimations } = useAnimations()

  return (
    <button
      onClick={toggleAnimations}
      data-cursor={animationsEnabled ? "Pause" : "Play"}
      aria-label={animationsEnabled ? "Disable animations" : "Enable animations"}
      style={{
        position: 'relative',
        width: 38,
        height: 38,
        borderRadius: '50%',
        border: '1px solid var(--border)',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        marginLeft: '0.25rem',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {animationsEnabled ? (
          <motion.svg
            key="pause"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ y: 14, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -14, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </motion.svg>
        ) : (
          <motion.svg
            key="play"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ y: 14, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -14, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )
}
