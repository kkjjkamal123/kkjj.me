import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
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
import Noise from './components/Noise'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import SmoothScroll from './components/SmoothScroll'
import { useGitHub } from './lib/github'
import { useAnimations } from './components/AnimationContext'

export default function App() {
  const { profile, repos, live } = useGitHub()
  const [loaded, setLoaded] = useState(false)
  const { animationsEnabled } = useAnimations()

  return (
    <MotionConfig reducedMotion={animationsEnabled ? "never" : "always"}>
      <SmoothScroll>
        <Preloader onDone={() => setLoaded(true)} />
        {animationsEnabled && <Noise />}
        {animationsEnabled && <Cursor />}
        {animationsEnabled && <ScrollProgress />}
        <Navbar />
        <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <Hero />
          <FeaturedRocket />
          <About profile={profile} repos={repos} />
          <Trajectory />
          <Projects profile={profile} repos={repos} live={live} />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </MotionConfig>
  )
}
