import { useEffect, useRef } from 'react'
import { useAnimations } from './AnimationContext'

// Custom cursor with zero scheduler latency: the transform is written
// directly to the DOM inside the pointermove handler (no React renders,
// no animation-library rAF queue), so it tracks the pointer same-frame.
export default function Cursor() {
  const { animationsEnabled } = useAnimations()
  const elRef = useRef(null)

  useEffect(() => {
    if (!animationsEnabled) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    const el = elRef.current
    if (!el) return
    document.body.classList.add('has-cursor')

    let scale = 1
    let x = -200
    let y = -200
    const apply = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      apply()
    }
    const onDown = () => { scale = 0.82; apply() }
    const onUp = () => { scale = 1; apply() }
    const onLeave = () => { x = -200; y = -200; apply() }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [animationsEnabled])

  if (!animationsEnabled) return null

  return (
    <div
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999999 }}
      aria-hidden="true"
    >
      <div
        ref={elRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'translate3d(-200px, -200px, 0)',
          willChange: 'transform',
        }}
      >
        <svg
          width="24" height="24" viewBox="0 0 20 20"
          style={{ display: 'block' }}
        >
          <path
            d="M3 2 L3 16 L7 12 L10.5 18.5 L12.5 17.5 L9 11 L14 11 Z"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
