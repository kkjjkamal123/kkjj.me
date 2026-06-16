import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedRocket from './components/FeaturedRocket'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useGitHub } from './lib/github'

export default function App() {
  const { profile, repos, live } = useGitHub()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedRocket />
        <About profile={profile} repos={repos} />
        <Projects profile={profile} repos={repos} live={live} />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
