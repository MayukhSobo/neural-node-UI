"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Theme, ThemeManager, defaultTheme } from '@/lib/theme'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize theme from storage or system preference
    const initialTheme = ThemeManager.getInitialTheme()
    setThemeState(initialTheme)
    ThemeManager.applyTheme(initialTheme)
    setIsLoading(false)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    ThemeManager.setStoredTheme(newTheme)
    ThemeManager.applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    isLoading
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Hook for theme-aware components
export function useThemeClass(baseClass: string): string {
  const { theme } = useTheme()
  return theme === 'light' ? baseClass : `${baseClass} ${baseClass}--${theme}`
} 