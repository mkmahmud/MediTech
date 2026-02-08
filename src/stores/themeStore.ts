import { create } from 'zustand'

interface ThemeStore {
    isDarkMode: boolean
    toggleDarkMode: () => void
    setDarkMode: (isDark: boolean) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
    isDarkMode: false,
    toggleDarkMode: () => {
        set((state) => {
            const newIsDark = !state.isDarkMode
            // Update the HTML element's class
            if (newIsDark) {
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            }
            return { isDarkMode: newIsDark }
        })
    },
    setDarkMode: (isDark: boolean) => {
        // Update the HTML element's class
        if (isDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
        set({ isDarkMode: isDark })
    },
}))
