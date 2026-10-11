import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import { GH_URL, totalStars } from '../lib/github'
import SplitReveal from './SplitReveal'
import Counter from './Counter'
import Magnetic from './Magnetic'
import Tilt from './Tilt'
import Orbs from './Orbs'

function Tile({ children, span, spanMd, rowSpan, delay = 0, inView, tilt = true, className = '', style }) {
  const inner = (
    <div
      className={`glass glass-hover ${className}`}
      style={{ padding: 'clamp(1.4rem, 2.5vw, 2rem)', height: '100%', display: 'flex', flexDirection: 'column', ...style }}
    >
      {children}
    </div>
  )

  return (
    <m.div
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ '--span': span, '--span-md': spanMd ?? Math.min(span, 6), '--row-span': rowSpan ?? 1 }}
    >
      {tilt ? <Tilt max={4} scale={1} style={{ height: '100%' }}>{inner}</Tilt> : inner}
    </m.div>
  )
}

function StatTile({ value, label, sub, delay, inView, span, spanMd }) {
  return (
    <Tile span={span} spanMd={spanMd} delay={delay} inView={inView}>
      <div className="mega" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', color: 'var(--accent)', lineHeight: 1 }}>
        <Counter value={value} inView={inView} />
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '0.66rem', color: 'var(--text-muted)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '0.6rem' }}>
        {label}
      </div>
      {sub && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: 'auto', paddingTop: '0.9rem' }}>
          {sub}
        </div>
      )}
    </Tile>
  )
}

export default function About({ profile, repos }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const years = new Date().getFullYear() - new Date(profile.created_at).getFullYear()

  return (
    <section id="about" ref={ref} className="cv-auto" style={{ padding: 'clamp(5rem, 10vw, 10rem) clamp(1.25rem, 5vw, 6rem)', position: 'relative', overflow: 'hidden' }}>
      <Orbs
        items={[
          { top: '10%', right: '-10%', size: '42vw', color: 'var(--orb-1)', speed: 0.2 },
          { bottom: '-5%', left: '-12%', size: '36vw', color: 'var(--orb-2)', speed: 0.3 },
        ]}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>About</p>

        <h2 className="mega" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <SplitReveal text={"HARDWARE THAT HAS\u00A0TO"} inView={inView} delay={0.1} />
          <SplitReveal text="ACTUALLY WORK" inView={inView} delay={0.25} charStyle={{ color: 'var(--accent)' }} />
        </h2>

        <div className="bento">
          {/* Bio — the anchor tile */}
          <Tile span={7} spanMd={6} rowSpan={2} delay={0.15} inView={inView} tilt={false}>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: 'var(--text)', lineHeight: 1.7, marginBottom: '1.25rem', fontWeight: 500 }}>
              I&apos;m Kamalesh. Most of what I build starts because something annoyed me, or because I
              wanted to know whether it was possible.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85 }}>
              The one I&apos;m proudest of is <span style={{ color: 'var(--text)', fontWeight: 600 }}>ENTITY</span>,
              an adaptive LLM runtime for Arm phones built for Arm&apos;s Create AI Optimization Challenge.
              Same silicon, same model file, same session as Arm&apos;s own reference app &mdash; and it generates
              tokens <span style={{ color: 'var(--text)', fontWeight: 600 }}>47% faster</span>, reaches the first
              token <span style={{ color: 'var(--text)', fontWeight: 600 }}>3.4&times;</span> sooner, and spends
              <span style={{ color: 'var(--text)', fontWeight: 600 }}> 42% less battery</span> on the same reply.
              The fix underneath it is merged into llama.cpp, reviewed by Arm&apos;s KleidiAI maintainer.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginTop: '1rem' }}>
              Before that: a moisture sensor built without a moisture sensor, semantic search over
              government occupation codes, and some battery-management circuitry.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginTop: '1rem' }}>
              I thrive in high-pressure environments, securing <span style={{ color: 'var(--text)', fontWeight: 600 }}>1st place</span> in 24Hr Hackathons (AIcon24, Camri CIT), reaching the <span style={{ color: 'var(--text)', fontWeight: 600 }}>Top 40</span> nationally in the Lam Research Challenge 2025, and <span style={{ color: 'var(--text)', fontWeight: 600 }}>Top 8</span> regionally for AMD Slingshot Hackathon.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginTop: '1rem' }}>
              Right now most of my free time goes into a <span style={{ color: 'var(--accent)', fontWeight: 600 }}>model
              rocket</span> — which has taught me more about tolerances and epoxy than about software.
            </p>
            <div
              style={{
                marginTop: 'auto',
                paddingTop: '1.75rem',
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              {['Embedded', 'Computer Vision', 'Aerospace', 'AI'].map((t) => (
                <span
                  key={t}
                  style={{
                    padding: '0.35rem 0.8rem',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                    borderRadius: 100,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Tile>

          <StatTile span={5} spanMd={3} value={profile.public_repos} label="Public repos" sub="Shipped in the open" delay={0.22} inView={inView} />
          <StatTile span={5} spanMd={3} value={`${years}+`} label="Years building" sub="First commit in 2020" delay={0.29} inView={inView} />
          <StatTile span={4} spanMd={6} value={totalStars(repos)} label="Stars earned" delay={0.36} inView={inView} />

          {/* GitHub CTA */}
          <Tile span={8} spanMd={6} delay={0.43} inView={inView} style={{ justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <div className="mega" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '0.35rem' }}>
                  The full archive
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Including the abandoned ones.
                </div>
              </div>
              <Magnetic range={50} strength={0.3}>
                <a
                  href={GH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Open"
                  className="btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 1.8rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: 100,
                    whiteSpace: 'nowrap',
                  }}
                >
                  GitHub profile
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </a>
              </Magnetic>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  )
}
