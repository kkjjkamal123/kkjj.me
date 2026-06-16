import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
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
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleLink('#hero') }}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}
        >
          VSK<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="nav-links">
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => handleLink(l.href)}
              style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.05em', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              {l.label}
            </button>
          ))}
          <a
            href="https://github.com/kkjjkamal123"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.45rem 1.1rem',
              border: '1px solid var(--accent)',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--accent)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
          >
            GitHub
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '2px',
              background: menuOpen && i === 1 ? 'transparent' : '#fff',
              transition: 'all 0.3s',
              transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(5px,5px)' : i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : '') : '',
            }} />
          ))}
        </button>
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
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 99,
              background: 'rgba(8,8,8,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {links.map(l => (
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
