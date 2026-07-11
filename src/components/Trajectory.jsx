import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SplitReveal from './SplitReveal'
import SectionNum from './SectionNum'

// ── Edit this array to add/remove milestones — newest at the bottom ─────
// Each entry: { year, title, detail }. Keep details to one or two lines.
const LOG = [
  {
    year: '2006',
    title: 'Established',
    detail: 'Came online. Immediately started taking things apart to see how they worked.',
  },
  {
    year: '2020',
    title: 'First commit',
    detail: 'Joined GitHub and started shipping — web experiments, scripts and small tools.',
  },
  {
    year: '2024',
    title: 'Hardware era',
    detail: 'Moist-Reader: moisture sensing without a moisture sensor. C++, Arduino and a lot of solder.',
  },
  {
    year: '2025',
    title: 'AI in the field',
    detail: 'AI-powered semantic search over NCO-2015 occupation codes; a live bus-tracking interface.',
  },
  {
    year: '2026',
    title: 'Edge vision at speed',
    detail: 'ARM Bharath Challenge — YOLOv8n-OBB INT8 on a Raspberry Pi 5: 43.6 FPS at mAP50 0.982.',
  },
  {
    year: 'NOW',
    title: 'Project Apex',
    detail: 'A rocket, from airframe to telemetry. Fin geometry, CP/CG tuning and a live downlink.',
  },
]

function LogRow({ item, index, inView, last }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.25 + index * 0.12 }}
      className="traj-row"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(90px, 140px) 24px minmax(0, 1fr)',
        gap: 'clamp(1rem, 3vw, 2.5rem)',
        alignItems: 'start',
      }}
    >
      <div className="mega" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', color: item.year === 'NOW' ? 'var(--accent)' : 'var(--text-dim)', lineHeight: 1.1, textAlign: 'right' }}>
        {item.year}
      </div>

      {/* Rail node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch', paddingTop: '0.55em' }} aria-hidden="true">
        <span style={{
          width: 11, height: 11, borderRadius: '50%', flexShrink: 0,
          background: item.year === 'NOW' ? 'var(--accent-fill)' : 'transparent',
          border: '2px solid var(--accent)',
          boxShadow: item.year === 'NOW' ? '0 0 14px var(--accent-glow), 0 0 4px var(--accent-glow)' : 'none',
        }} />
        {!last && <span style={{ width: 1, flexGrow: 1, background: 'var(--border)', marginTop: 6 }} />}
      </div>

      <div style={{ paddingBottom: last ? 0 : 'clamp(2rem, 5vw, 3.25rem)' }}>
        <h3 className="mega" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: '0.5rem' }}>
          {item.title}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '560px' }}>
          {item.detail}
        </p>
      </div>
    </motion.div>
  )
}

export default function Trajectory() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="trajectory" ref={ref} className="cv-auto" style={{ padding: 'clamp(5rem, 10vw, 10rem) clamp(1.25rem, 5vw, 6rem)', position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
      <SectionNum n="02" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>02 / Flight log</p>

        <h2 className="mega" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', marginBottom: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          <SplitReveal text="TRAJECTORY" inView={inView} delay={0.05} />
        </h2>

        <div>
          {LOG.map((item, i) => (
            <LogRow key={item.year + item.title} item={item} index={i} inView={inView} last={i === LOG.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .traj-row { grid-template-columns: 58px 16px minmax(0, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
