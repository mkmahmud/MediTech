import { useEffect } from 'react'
import { useThemeStore } from '../stores/themeStore'

export function ThemeInitializer() {
  const setDarkMode = useThemeStore((state) => state.setDarkMode)
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      setDarkMode(true)
    } else if (savedTheme === 'light') {
      setDarkMode(false)
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true)
      } else {
        setDarkMode(false)
      }
    }
  }, [setDarkMode])

  return null
}
