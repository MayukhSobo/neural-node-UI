// Theme system for modular theme support
export type Theme = 'light' | 'dark'

export interface ThemeConfig {
  name: string
  displayName: string
  description: string
}

// Available themes configuration
export const themes: Record<Theme, ThemeConfig> = {
  light: {
    name: 'light',
    displayName: 'Light',
    description: 'Clean light theme with bright backgrounds'
  },
  dark: {
    name: 'dark',
    displayName: 'Dark',
    description: 'Modern dark theme with dark backgrounds'
  }
}

// Future theme examples that could be added:
// 'sepia', 'high-contrast', 'blue', 'green', etc.

export const defaultTheme: Theme = 'light'

export class ThemeManager {
  private static readonly STORAGE_KEY = 'theme'
  
  static getStoredTheme(): Theme | null {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(this.STORAGE_KEY)
    return this.isValidTheme(stored) ? stored as Theme : null
  }
  
  static setStoredTheme(theme: Theme): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.STORAGE_KEY, theme)
  }
  
  static getSystemTheme(): Theme {
    if (typeof window === 'undefined') return defaultTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  
  static getInitialTheme(): Theme {
    const stored = this.getStoredTheme()
    return stored || this.getSystemTheme()
  }
  
  static applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return
    
    // Remove all theme classes
    Object.keys(themes).forEach(themeName => {
      document.documentElement.classList.remove(themeName)
    })
    
    // Apply the new theme class (light theme has no class, others do)
    if (theme !== 'light') {
      document.documentElement.classList.add(theme)
    }
  }
  
  static isValidTheme(theme: string | null): boolean {
    return theme !== null && theme in themes
  }
  
  static getAvailableThemes(): ThemeConfig[] {
    return Object.values(themes)
  }
  
  static getThemeConfig(theme: Theme): ThemeConfig {
    return themes[theme]
  }
} 