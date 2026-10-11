// Framer Motion's feature bundle, split out so LazyMotion can fetch it
// in parallel with first render instead of it sitting in the main chunk.
// domMax (rather than domAnimation) because the navbar pill uses layoutId.
import { domMax } from 'framer-motion'

export default domMax
