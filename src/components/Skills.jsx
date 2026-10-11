import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import Marquee from './Marquee'
import SplitReveal from './SplitReveal'
import Orbs from './Orbs'

const categories = [
  {
    label: 'Languages & Web',
    skills: ['Python', 'C++', 'JavaScript', 'HTML / CSS'],
    dir: 'normal',
  },
  {
    label: 'AI & Computer Vision',
    skills: ['YOLOv8', 'OpenCV', 'PyTorch', 'INT8 Quantization', 'Supervision', 'Semantic Search'],
    dir: 'reverse',
  },
  {
    label: 'Embedded & Hardware',
    skills: ['Raspberry Pi Series', 'Arduino Series', 'Jetson Series', 'KiCad', 'Flightcontrollers'],
    dir: 'normal',
  },
  {
    label: 'Aerospace & Tools',
    skills: ['Aerodynamics', 'Telemetry', 'Flight Dynamics', 'Git', 'Linux', 'OpenRocket', 'Solidworks', 'Ansys Fluent'],
    dir: 'reverse',
  },
]

function SkillRow({ cat, index, inView }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '1.6rem 0',
        borderBottom: '1px solid var(--border)',
      }}
      className="skill-row"
    >
      <h3 style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.68rem',
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-dim)',
      }}>
        <span style={{ color: 'var(--accent)' }}>{String(index + 1).padStart(2, '0')}</span> — {cat.label}
      </h3>
      <Marquee duration={cat.skills.length * 4} direction={cat.dir}>
        {cat.skills.map((skill) => (
          <span
            key={skill}
            data-cursor="loading"
            className="mega"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {skill}
          </span>
        ))}
      </Marquee>
    </m.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="skills" ref={ref} className="cv-auto" style={{
      padding: 'clamp(5rem, 10vw, 10rem) clamp(1.25rem, 5vw, 6rem)',
      background: 'var(--bg-2)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Orbs
        items={[
          { bottom: '-18%', left: '-10%', size: '46vw', color: 'var(--orb-1)', speed: 0.22 },
          { top: '0%', right: '-8%', size: '32vw', color: 'var(--orb-2)', speed: 0.32 },
        ]}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>Tools</p>

        <h2 className="mega" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', marginBottom: '3rem' }}>
          <SplitReveal text="TOOLKIT" inView={inView} delay={0.05} />
        </h2>

        <div style={{ borderTop: '1px solid var(--border)' }}>
          {categories.map((cat, i) => (
            <SkillRow key={cat.label} cat={cat} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .skill-row { grid-template-columns: 1fr !important; gap: 0.75rem !important; }
        }
      `}</style>
    </section>
  )
}
