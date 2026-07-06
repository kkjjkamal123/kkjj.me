import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'

const links = [
  { label: 'Rocket', href: '#featured' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleLink = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
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
          style={{
            width: '100%',
            maxWidth: scrolled ? '880px' : '100%',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0.6rem 0 1.4rem',
            background: scrolled ? 'rgba(10,10,12,0.75)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            border: scrolled ? '1px solid var(--border)' : '1px solid transparent',
            borderRadius: scrolled ? 100 : 0,
            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
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
          <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="nav-links">
            {links.map((l) => (
              <button
                key={l.href}
                data-cursor="Go"
                onClick={() => handleLink(l.href)}
                style={{
                  position: 'relative',
                  padding: '0.5rem 0.9rem',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: active === l.href ? '#fff' : 'var(--text-muted)',
                  letterSpacing: '0.02em',
                  transition: 'color 0.25s',
                }}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', damping: 22, stiffness: 260 }}
                    style={{ position: 'absolute', inset: 0, borderRadius: 100, background: 'rgba(255,255,255,0.06)', zIndex: -1 }}
                  />
                )}
                {l.label}
              </button>
            ))}
            <Magnetic range={50} strength={0.3} style={{ marginLeft: '0.5rem' }}>
              <a
                href="https://github.com/kkjjkamal123"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                style={{
                  display: 'inline-flex',
                  padding: '0.5rem 1.1rem',
                  border: '1px solid var(--accent)',
                  borderRadius: 100,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                }}
              >
                GitHub
              </a>
            </Magnetic>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '2px',
                background: menuOpen && i === 1 ? 'transparent' : '#fff',
                transition: 'all 0.3s',
                transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(5px,5px)' : i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : '') : '',
              }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '74px',
              left: '1.25rem',
              right: '1.25rem',
              zIndex: 99,
              background: 'rgba(10,10,12,0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
              borderRadius: 20,
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
                style={{ fontSize: '1.1rem', fontWeight: 500, color: '#fff', textAlign: 'left' }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
