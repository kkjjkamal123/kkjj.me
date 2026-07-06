import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Marquee from './Marquee'
import RevealText from './RevealText'

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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '1.5rem 0',
        borderBottom: '1px solid var(--border)',
      }}
      className="skill-row"
    >
      <h3 style={{
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-dim)',
      }}>
        {String(index + 1).padStart(2, '0')} — {cat.label}
      </h3>
      <Marquee duration={cat.skills.length * 4} direction={cat.dir}>
        {cat.skills.map((skill) => (
          <span
            key={skill}
            data-cursor="Skill"
            style={{
              padding: '0.55rem 1.3rem',
              border: '1px solid var(--border)',
              borderRadius: 100,
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#ddd',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--display)',
            }}
          >
            {skill}
          </span>
        ))}
      </Marquee>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} style={{
      padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 8rem)',
      background: 'var(--bg-2)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'var(--accent)' }} />
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase' }}
          >
            Skills
          </motion.p>
        </div>

        <h2 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(2.2rem, 5.5vw, 3.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          marginBottom: '3rem',
        }}>
          <RevealText text="My toolkit" inView={inView} delay={0.05} />
        </h2>

        <div>
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
