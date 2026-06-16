export default function Footer() {
  return (
    <footer style={{
      padding: '2rem clamp(1.5rem, 6vw, 8rem)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
    }}>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>
        VSK<span style={{ color: 'var(--accent)' }}>.</span>
      </span>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
        © {new Date().getFullYear()} VS Kamalesh. Built with React + Vite.
      </span>
      <a
        href="https://github.com/kkjjkamal123"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: '0.8rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        github.com/kkjjkamal123
      </a>
    </footer>
  )
}
