import { useState } from 'react'

// A real artifact: photo, screenshot, CAD render, oscilloscope capture.
//
// If `src` is missing or fails to load, this renders a build-note in dev
// telling you exactly which file to drop in — and renders nothing at all
// in production, so an unfinished slot never ships as a broken frame.
export default function Figure({ src, alt, caption, note, aspect = '4 / 3', priority = false }) {
  const [failed, setFailed] = useState(false)
  const missing = !src || failed

  if (missing && !import.meta.env.DEV) return null

  return (
    <figure style={{ margin: 0, width: '100%' }}>
      <div
        className="glass"
        style={{
          aspectRatio: aspect,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: missing ? '1.5rem' : 0,
        }}
      >
        {missing ? (
          <div style={{ textAlign: 'center', maxWidth: '32ch' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.6rem' }}>
              Add artifact
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {note || alt}
            </div>
            {src && (
              <code style={{ display: 'block', marginTop: '0.7rem', fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-dim)', wordBreak: 'break-all' }}>
                {src}
              </code>
            )}
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>

      {caption && (
        <figcaption style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '0.7rem' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
