import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import RevealText from './RevealText'
import ScrambleText from './ScrambleText'
import Magnetic from './Magnetic'

const socials = [
  {
    name: 'GitHub',
    handle: '@kkjjkamal123',
    url: 'https://github.com/kkjjkamal123',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    handle: 'kkjjwork123@gmail.com',
    url: 'mailto:kkjjwork123@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'VS Kamalesh',
    url: 'https://linkedin.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} style={{ padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 8rem)', position: 'relative', overflow: 'hidden' }}>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', top: '-2rem', left: 'clamp(1rem, 4vw, 4rem)',
          fontFamily: 'var(--display)', fontSize: 'clamp(6rem, 16vw, 13rem)', fontWeight: 700,
          color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.05)', lineHeight: 1, zIndex: 0,
        }}
      >
        03
      </span>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'var(--accent)' }} />
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase' }}
          >
            Contact
          </motion.p>
        </div>

        <h2 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(2.6rem, 8vw, 5.5rem)',
          fontWeight: 700,
          lineHeight: 0.98,
          letterSpacing: '-0.03em',
          marginBottom: '3rem',
        }}>
          <RevealText text="Let's build something" inView={inView} delay={0.1} />
          <RevealText text="together." inView={inView} delay={0.25} wordStyle={{ color: 'var(--accent)' }} />
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 6vw, 5rem)', alignItems: 'start' }} className="contact-grid">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '420px', marginBottom: '2.5rem' }}
            >
              Whether you have a project in mind, want to collaborate or just want to say hi
              — my inbox is always open.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Magnetic range={80} strength={0.3}>
                <a
                  href="mailto:vishnuvardhanks113@gmail.com"
                  data-cursor="Email"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '1.1rem 2.4rem',
                    background: 'var(--accent)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: 100,
                    letterSpacing: '0.02em',
                  }}
                >
                  <ScrambleText text="Send me an email" />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '1.5rem' }}
            >
              Find me online
            </motion.h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socials.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Open"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 6 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.1rem 1.5rem',
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <span style={{ color: 'var(--accent)' }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.05em', color: '#fff', marginBottom: '0.1rem' }}>{s.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.handle}</div>
                  </div>
                  <svg style={{ marginLeft: 'auto', opacity: 0.3 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
