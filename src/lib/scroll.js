import { useEffect, useRef } from 'react'
import { scroll } from 'framer-motion'

// Height of the fixed navbar. Anchor targets are offset by this much so
// a section heading does not land underneath it.
export const NAV_OFFSET = 84

// Scrolling is left to the browser: native scroll runs on its own thread,
// so it stays smooth even when the page's JS is throttled (Low Power
// Mode caps requestAnimationFrame at 30fps) and costs no main-thread
// work per frame.
export function scrollToId(href) {
  const el = typeof href === 'string' ? document.querySelector(href) : href
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
}

// Stops infinite CSS animations (marquees, starfield, pulse dots) while
// their container is off-screen. They are invisible then anyway, but
// the compositor would otherwise keep producing frames for them.
export function usePauseOffscreen(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => {
      el.toggleAttribute('data-offscreen', !entry.isIntersecting)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      el.removeAttribute('data-offscreen')
    }
  }, [ref])
}

// Scroll-linked parallax. `speed` is the fraction of the viewport height
// the element travels while it crosses the screen — 0.2 drifts gently,
// 0.6 is heavy. Returns a ref to attach to the moving element.
//
// Built on Framer Motion's scroll(), which the app already ships, rather
// than GSAP ScrollTrigger (~44 kB gzipped for this one job). All
// instances share a single passive scroll listener and are batched into
// one write per frame. The transform is written straight to the element,
// so no React render happens while scrolling.
export function useParallax(speed = 0.2, { enabled = true, axis = 'y' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Progress runs 0 → 1 from the element's top meeting the viewport
    // bottom to its bottom leaving the viewport top. Travel is read from
    // innerHeight on each update, so a resize needs no re-measure.
    const stop = scroll(
      (progress) => {
        const v = (progress - 0.5) * window.innerHeight * speed
        el.style.transform = axis === 'x' ? `translate3d(${v}px, 0, 0)` : `translate3d(0, ${v}px, 0)`
      },
      { target: el, offset: ['start end', 'end start'] }
    )

    return () => {
      stop()
      el.style.transform = ''
    }
  }, [speed, enabled, axis])

  return ref
}
