import { useEffect, useState } from 'react'
import { LazyMotion, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedRocket from './components/FeaturedRocket'
import About from './components/About'
import Trajectory from './components/Trajectory'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import { useGitHub } from './lib/github'
import { useAnimations } from './components/AnimationContext'
import { scrollToId } from './lib/scroll'

// Animation features arrive in their own chunk, fetched alongside the
// first render. `strict` makes any stray full `motion.*` import (which
// would pull every feature back into the main bundle) a hard error.
const loadMotionFeatures = () => import('./lib/motion-features.js').then((mod) => mod.default)

export default function App() {
  const { profile, repos, live } = useGitHub()
  const [loaded, setLoaded] = useState(false)
  const { animationsEnabled } = useAnimations()

  // A shared link like kkjj.me/#about: the browser tries to jump before
  // React has rendered the target, so do it once the page is revealed.
  useEffect(() => {
    if (loaded && location.hash.length > 1) scrollToId(location.hash)
  }, [loaded])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion={animationsEnabled ? 'never' : 'always'}>
        <a href="#main" className="skip-link">Skip to content</a>
        <Preloader onDone={() => setLoaded(true)} />
        {animationsEnabled && <Cursor />}
        {animationsEnabled && <ScrollProgress />}
        <Navbar />
        <main id="main" tabIndex={-1} style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <Hero ready={loaded} />
          <About profile={profile} repos={repos} />
          <Trajectory />
          <FeaturedRocket />
          <Projects profile={profile} repos={repos} live={live} />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
