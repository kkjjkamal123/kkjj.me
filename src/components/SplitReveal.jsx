import { motion } from 'framer-motion'

// Character-level split animation inspired by landonorris.com
// Each character animates up from behind a mask with staggered timing.
// Resets when inView becomes false and replays when it becomes true again.
export default function SplitReveal({
  text,
  as = 'span',
  delay = 0,
  stagger = 0.025,
  style,
  charStyle,
  inView = true,
}) {
  const words = text.split(' ')
  const Tag = as

  let charIndex = 0

  return (
    <Tag style={{ display: 'block', ...style }}>
      <span style={{ display: 'inline-flex', flexWrap: 'wrap', columnGap: '0.25em' }}>
        {words.map((word, wIdx) => (
          <span key={wIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.split('').map((char, cIdx) => {
              const currentIdx = charIndex++
              return (
                <span
                  key={cIdx}
                  style={{
                    overflow: 'hidden',
                    display: 'inline-block',
                    paddingBottom: '0.06em',
                    marginBottom: '-0.06em',
                  }}
                >
                  <motion.span
                    style={{
                      display: 'inline-block',
                      willChange: 'transform, opacity',
                      ...charStyle,
                    }}
                    initial={{ y: '120%', opacity: 0 }}
                    animate={
                      inView
                        ? { y: '0%', opacity: 1 }
                        : { y: '120%', opacity: 0 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: delay + currentIdx * stagger,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              )
            })}
          </span>
        ))}
      </span>
    </Tag>
  )
}
