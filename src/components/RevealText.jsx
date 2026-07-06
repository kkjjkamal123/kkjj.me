import { motion } from 'framer-motion'

// Splits text into words, each masked and revealed with a staggered
// upward wipe. Pass `as` to control the wrapping tag (h1, p, span...).
export default function RevealText({ text, as = 'span', delay = 0, stagger = 0.05, style, wordStyle, inView = true }) {
  const words = text.split(' ')
  const Tag = as

  return (
    <Tag style={{ display: 'block', overflow: 'hidden', ...style }}>
      <span style={{ display: 'flex', flexWrap: 'wrap' }}>
        {words.map((word, i) => (
          <span key={i} style={{ overflow: 'hidden', display: 'inline-block', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
            <motion.span
              style={{ display: 'inline-block', ...wordStyle }}
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}{i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
