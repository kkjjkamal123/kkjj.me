import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { GH_USER } from '../lib/github'
import { getItem, setItem } from '../lib/storage'

// GitHub contribution calendar, drawn natively in the site's palette
// instead of a third-party PNG (whose light-grey empty cells glared on
// the dark theme and could not follow the light one).
//
// Data comes from a public proxy of GitHub's contribution calendar. It
// is fetched only once the section is close to the viewport, cached for
// the session, and the whole block hides itself if the request fails —
// a missing chart is better than an empty frame.
export const API = `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`
const CACHE_KEY = 'gh_contrib_v1'
const CACHE_TTL = 6 * 60 * 60 * 1000
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function readCache() {
  try {
    const parsed = JSON.parse(getItem('sessionStorage', CACHE_KEY) || 'null')
    if (!parsed || Date.now() - parsed.t > CACHE_TTL || !Array.isArray(parsed.days)) return null
    return parsed
  } catch {
    return null
  }
}

function useContributions(enabled) {
  const [state, setState] = useState(readCache)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!enabled || state) return
    const controller = new AbortController()
    fetch(API, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status))
        return res.json()
      })
      .then((json) => {
        const days = Array.isArray(json?.contributions) ? json.contributions : null
        if (!days?.length) throw new Error('empty')
        const total = json.total?.lastYear ?? days.reduce((n, d) => n + d.count, 0)
        const next = { t: Date.now(), total, days }
        setItem('sessionStorage', CACHE_KEY, JSON.stringify(next))
        setState(next)
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') setFailed(true)
      })
    return () => controller.abort()
  }, [enabled, state])

  return { data: state, failed }
}

function fmtDate(iso) {
  const d = new Date(`${iso}T00:00:00Z`)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

export default function ContributionGraph() {
  const ref = useRef(null)
  const scrollRef = useRef(null)
  const near = useInView(ref, { once: true, margin: '600px 0px' })
  const shown = useInView(ref, { once: true, amount: 0.3 })
  const { data, failed } = useContributions(near)

  const layout = useMemo(() => {
    if (!data) return null
    const firstDow = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay()
    const cells = data.days.map((d, i) => {
      const slot = i + firstDow
      return { ...d, col: Math.floor(slot / 7), row: slot % 7 }
    })
    const cols = cells[cells.length - 1].col + 1

    // A month label sits over the first column that starts in that month,
    // skipped if it would crowd the previous label.
    const months = []
    cells.forEach((c) => {
      if (c.row !== 0 && c !== cells[0]) return
      const mo = new Date(`${c.date}T00:00:00Z`).getUTCMonth()
      const prev = months[months.length - 1]
      if (!prev || (prev.mo !== mo && c.col - prev.col >= 3)) months.push({ mo, col: c.col })
    })
    if (months.length > 1 && months[1].col - months[0].col < 3) months.shift()

    let best = cells[0]
    let streak = 0
    let longest = 0
    cells.forEach((c) => {
      if (c.count > best.count) best = c
      streak = c.count > 0 ? streak + 1 : 0
      longest = Math.max(longest, streak)
    })
    const active = cells.filter((c) => c.count > 0).length

    return { cells, cols, months, best, longest, active }
  }, [data])

  // On narrow screens the chart scrolls sideways; start at the most
  // recent weeks, which are the ones worth seeing.
  useEffect(() => {
    const el = scrollRef.current
    if (layout && el) el.scrollLeft = el.scrollWidth
  }, [layout])

  if (failed) return null

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <h3 className="eyebrow" style={{ color: 'var(--text-dim)' }}>Contribution activity</h3>
        {layout && (
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{data.total.toLocaleString()}</span> in the last year
          </span>
        )}
      </div>

      <div className="glass" style={{ padding: 'clamp(1rem, 3vw, 2rem)' }}>
        <div ref={scrollRef} className="heat-scroll">
          {layout ? (
            <div
              className={`heat${shown ? ' heat-on' : ''}`}
              role="img"
              aria-label={`${data.total} GitHub contributions in the last year, active on ${layout.active} days`}
              style={{ gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))` }}
            >
              {layout.months.map((mo) => (
                <span key={`${mo.mo}-${mo.col}`} className="heat-month" style={{ gridColumn: `${mo.col + 1} / span 3` }}>
                  {MONTHS[mo.mo]}
                </span>
              ))}
              {layout.cells.map((c) => (
                <span
                  key={c.date}
                  className="heat-cell"
                  data-level={c.level}
                  title={`${c.count || 'No'} contribution${c.count === 1 ? '' : 's'} on ${fmtDate(c.date)}`}
                  style={{ gridColumn: c.col + 1, gridRow: c.row + 2, '--d': `${c.col * 14 + c.row * 6}ms` }}
                />
              ))}
            </div>
          ) : (
            <div className="heat-skeleton" aria-hidden="true" />
          )}
        </div>

        {layout && (
          <div
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
              marginTop: '1.1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)',
              fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-dim)',
            }}
          >
            <span style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2rem)', flexWrap: 'wrap' }}>
              <span><span style={{ color: 'var(--text)' }}>{layout.active}</span> active days</span>
              <span><span style={{ color: 'var(--text)' }}>{layout.longest}</span>-day best streak</span>
              <span>Peak <span style={{ color: 'var(--text)' }}>{layout.best.count}</span> on {fmtDate(layout.best.date)}</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }} aria-hidden="true">
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className="heat-cell heat-legend" data-level={l} />
              ))}
              More
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
