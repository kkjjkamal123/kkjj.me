import { createContext, useContext, useState, useEffect } from 'react'

const AnimationContext = createContext({
  animationsEnabled: true,
  toggleAnimations: () => {},
})

export function AnimationProvider({ children }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('animations_enabled')
      if (saved !== null) {
        return saved === 'true'
      }
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return true
  })

  useEffect(() => {
    localStorage.setItem('animations_enabled', String(animationsEnabled))
    if (!animationsEnabled) {
      document.body.classList.add('reduce-motion')
    } else {
      document.body.classList.remove('reduce-motion')
    }
  }, [animationsEnabled])

  const toggleAnimations = () => setAnimationsEnabled((prev) => !prev)

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimations() {
  return useContext(AnimationContext)
}
