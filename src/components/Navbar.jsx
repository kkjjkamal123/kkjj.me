import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'
import ThemeToggle from './ThemeToggle'
import AnimationToggle from './AnimationToggle'
import { scrollToId } from '../lib/scroll'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Log', href: '#trajectory' },
  { label: 'Rocket', href: '#featured' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/kkjjkamal123',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kkjjkamal/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean)
    if (!sections.length) return

    // Sections use content-visibility:auto and are tall, so more than one
    // can straddle the band at once. Take the one nearest the viewport
    // centre instead of whichever entry happened to fire last.
    const visible = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        })
        if (!visible.size) return
        const mid = window.innerHeight / 2
        let best = null
        let bestDist = Infinity
        visible.forEach((el) => {
          const r = el.getBoundingClientRect()
          const d = Math.abs(r.top + r.height / 2 - mid)
          if (d < bestDist) { bestDist = d; best = el }
        })
        if (best) setActive(`#${best.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Escape closes the mobile menu, and so does scrolling away from it —
  // otherwise it stays pinned over content the user has moved past.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    const onScroll = () => setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [menuOpen])

  const handleLink = (href) => {
    setMenuOpen(false)
    scrollToId(href)
  }

  return (
    <>
      <m.nav
        aria-label="Primary"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: scrolled ? '14px' : 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 1.25rem',
          display: 'flex',
          justifyContent: 'center',
          transition: 'top 0.3s ease',
        }}
      >
        <div
          className={scrolled ? 'glass' : ''}
          style={{
            width: '100%',
            maxWidth: scrolled ? '960px' : '100%',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0.6rem 0 1.4rem',
            gap: '1rem',
            background: scrolled ? undefined : 'transparent',
            border: scrolled ? undefined : '1px solid transparent',
            borderRadius: scrolled ? 100 : 0,
            boxShadow: scrolled ? 'var(--shadow-2)' : 'none',
            transition: 'max-width 0.5s var(--ease-out), border-radius 0.5s var(--ease-out), box-shadow 0.4s var(--ease-out), background 0.4s var(--ease-out)',
          }}
        >
          <Magnetic range={50} strength={0.3}>
            <a
              href="#hero"
              data-cursor="Top"
              onClick={(e) => { e.preventDefault(); handleLink('#hero') }}
              style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: '1.05rem', letterSpacing: '-0.02em' }}
            >
              VSK<span style={{ color: 'var(--accent)' }}>.</span>
            </a>
          </Magnetic>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: '0.15rem', alignItems: 'center' }} className="nav-links">
            {links.map((l) => (
              <button
                key={l.href}
                data-cursor="Go"
                onClick={() => handleLink(l.href)}
                aria-current={active === l.href ? 'true' : undefined}
                style={{
                  position: 'relative',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  color: active === l.href ? 'var(--text)' : 'var(--text-muted)',
                  letterSpacing: '0.02em',
                  transition: 'color 0.25s',
                }}
              >
                {active === l.href && (
                  <m.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', damping: 22, stiffness: 260 }}
                    style={{ position: 'absolute', inset: 0, borderRadius: 100, background: 'var(--surface-glass)', zIndex: -1 }}
                  />
                )}
                {l.label}
              </button>
            ))}
          </div>

          {/* Actions — the toggles stay visible at every width */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ThemeToggle />
            <AnimationToggle />
            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor="Open"
                  className="nav-icon"
                >
                  {s.icon}
                </a>
              ))}
              <Magnetic range={50} strength={0.3} style={{ marginLeft: '0.2rem' }}>
                <a
                  href="/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Open CV"
                  className="btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: 38,
                    padding: '0 1.2rem',
                    borderRadius: 100,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  CV
                </a>
              </Magnetic>
            </div>

            {/* Hamburger */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              style={{ display: 'none', width: 38, height: 38, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '5px' }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: 'block', width: '20px', height: '2px', borderRadius: 2,
                  background: menuOpen && i === 1 ? 'transparent' : 'var(--text)',
                  transition: 'transform 0.3s var(--ease-out), background 0.2s',
                  transform: menuOpen ? (i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : '') : '',
                }} />
              ))}
            </button>
          </div>
        </div>
      </m.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass glass-strong"
            id="mobile-menu"
            style={{
              // Near-opaque: at glass translucency the hero CTAs read through the menu items.
              background: 'var(--menu-bg)',
              position: 'fixed',
              top: '74px',
              left: '1.25rem',
              right: '1.25rem',
              zIndex: 99,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text)', textAlign: 'left' }}
              >
                {l.label}
              </button>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--accent)', textAlign: 'left' }}
              >
                Resume / CV
              </a>
              <a
                href="https://www.linkedin.com/in/kkjjkamal/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text)', textAlign: 'left' }}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/kkjjkamal123"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text)', textAlign: 'left' }}
              >
                GitHub
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: color 0.25s, border-color 0.25s, background 0.25s;
        }
        @media (hover: hover) {
          .nav-icon:hover { color: var(--text); border-color: var(--accent); background: var(--accent-dim); }
        }
        @media (max-width: 960px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
