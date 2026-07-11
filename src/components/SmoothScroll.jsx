import { useEffect } from 'react'
import Lenis from 'lenis'
import { useAnimations } from './AnimationContext'

export default function SmoothScroll({ children }) {
  const { animationsEnabled } = useAnimations()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !animationsEnabled) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let frameId = 0
    function raf(time) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [animationsEnabled])

  return children
}
