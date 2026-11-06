import { createContext, useContext, useState, useEffect } from 'react'
import { getItem, setItem } from '../lib/storage'

const STORAGE_KEY = 'animations_enabled'

const AnimationContext = createContext({
  animationsEnabled: true,
  toggleAnimations: () => {},
})

function initialPreference() {
  if (typeof window === 'undefined') return true
  const saved = getItem('localStorage', STORAGE_KEY)
  if (saved === 'true' || saved === 'false') return saved === 'true'
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function AnimationProvider({ children }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(initialPreference)

  useEffect(() => {
    document.body.classList.toggle('reduce-motion', !animationsEnabled)
  }, [animationsEnabled])

  // Only an explicit choice is stored. Persisting the derived default
  // on first load would pin it, so a visitor who later turns on
  // "Reduce motion" in their OS would still get the full animation.
  const toggleAnimations = () =>
    setAnimationsEnabled((prev) => {
      setItem('localStorage', STORAGE_KEY, String(!prev))
      return !prev
    })

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimations() {
  return useContext(AnimationContext)
}
