import Marquee from './Marquee'
import Magnetic from './Magnetic'

const PHRASES = [
  "LET'S BUILD SOMETHING GREAT",
  "CONSTRUYAMOS ALGO GENIAL", // Spanish
  "让我们创造伟大的事物", // Chinese
  "CONSTRUISONS QUELQUE CHOSE DE GRAND", // French
  "சிறப்பான ஒன்றை உருவாக்குவோம்", // Tamil
  "素晴らしいものを一緒に作ろう", // Japanese
  "VAMOS CONSTRUIR ALGO INCRÍVEL", // Portuguese
  "LASS UNS ETWAS GROSSARTIGES BAUEN", // German
  "دعونا نبني شيئا عظيما", // Arabic
  "ДАВАЙТЕ СОЗДАДИМ ЧТО-ТО ВЕЛИКОЕ" // Russian
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <div style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
        <Marquee duration={25}>
          {PHRASES.map((phrase, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '3rem', fontFamily: 'var(--display)', fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '-0.01em', whiteSpace: 'nowrap', marginRight: '3rem' }}>
              {phrase}
              <span style={{ color: 'var(--accent)' }}>&#9670;</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div style={{
        padding: '2rem clamp(1.5rem, 6vw, 8rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          VSK<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} VS Kamalesh. Built with React + Vite + Framer Motion.
        </span>
        <Magnetic range={50} strength={0.3}>
          <a
            href="https://github.com/kkjjkamal123"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open"
            style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
          >
            github.com/kkjjkamal123
          </a>
        </Magnetic>
      </div>
    </footer>
  )
}
