import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = [
  {
    label: 'Languages & Web',
    skills: ['Python', 'C++', 'JavaScript', 'HTML / CSS', 'React'],
  },
  {
    label: 'AI & Computer Vision',
    skills: ['YOLOv8', 'OpenCV', 'PyTorch', 'INT8 Quantization', 'Supervision', 'Semantic Search', 'Embeddings'],
  },
  {
    label: 'Embedded & Hardware',
    skills: ['Raspberry Pi 5', 'Arduino', 'BMS Design', 'KiCad / Circuits', 'Sensors & IMU', 'Microcontrollers'],
  },
  {
    label: 'Aerospace & Tools',
    skills: ['Aerodynamics', 'Telemetry', 'Flight Dynamics', 'Git', 'Linux', 'Docker'],
  },
]

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
      {/* Background accent */}
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
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}
        >
          Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: '3.5rem',
          }}
        >
          My toolkit
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + ci * 0.15 }}
            >
              <h3 style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '1.25rem',
              }}>
                {cat.label}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + ci * 0.1 + si * 0.04 }}
                    style={{
                      padding: '0.45rem 1rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      fontSize: '0.83rem',
                      fontWeight: 500,
                      color: '#ccc',
                      transition: 'all 0.2s',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--accent-dim)'
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'
                      e.currentTarget.style.color = 'var(--accent)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = '#ccc'
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
