import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Any element can opt in with data-cursor="Label" (label optional) and
// data-cursor-invert to flip the dot to dark-on-light for contrast.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [hovering, setHovering] = useState(false)
  const [down, setDown] = useState(false)
  const targetRef = useRef(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { damping: 28, stiffness: 280, mass: 0.4 })
  const ringY = useSpring(y, { damping: 28, stiffness: 280, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.body.classList.add('has-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target.closest?.('[data-cursor]')
      if (el !== targetRef.current) {
        targetRef.current = el
        setHovering(!!el)
        setLabel(el?.getAttribute('data-cursor') || '')
      }
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)
    const onLeave = () => { x.set(-100); y.set(-100) }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        style={{ left: x, top: y }}
        animate={{ scale: down ? 0.6 : hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="cursor-dot"
      />
      <motion.div
        style={{ left: ringX, top: ringY }}
        animate={{
          width: hovering ? 92 : 36,
          height: hovering ? 92 : 36,
          opacity: hovering ? 1 : 0.7,
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="cursor-ring"
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="cursor-label"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      <style>{`
        .cursor-dot {
          position: fixed;
          width: 7px;
          height: 7px;
          margin-left: -3.5px;
          margin-top: -3.5px;
          border-radius: 50%;
          background: var(--accent);
          pointer-events: none;
          z-index: 10000;
        }
        .cursor-ring {
          position: fixed;
          margin-left: 0;
          margin-top: 0;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1.5px solid var(--accent);
          background: rgba(59,130,246,0.06);
          backdrop-filter: blur(1px);
          pointer-events: none;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          mix-blend-mode: plus-lighter;
        }
        .cursor-label {
          font-family: var(--body);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          white-space: nowrap;
          mix-blend-mode: plus-lighter;
        }
      `}</style>
    </>
  )
}
