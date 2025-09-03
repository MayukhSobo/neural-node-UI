# Theme System Documentation

## Overview

This project uses a modular theme system that supports multiple themes with easy extensibility for future themes.

## Current Themes

- **Light Theme**: Clean, bright design with light backgrounds
- **Dark Theme**: Modern dark design with dark backgrounds and light text

## Architecture

### Theme Manager (`src/lib/theme.ts`)
- Handles theme storage, system preference detection, and theme application
- Designed to be framework-agnostic for easy testing and reuse
- Supports adding new themes easily

### Theme Context (`src/context/ThemeContext.tsx`)
- React context for theme state management
- Provides hooks for theme manipulation
- Handles initialization and persistence

### CSS Variables (`src/app/globals.css`)
- All colors use CSS custom properties for easy theme switching
- Variables are organized by category (backgrounds, text, borders, shadows)
- Each theme defines its own set of variable values

## Usage

### Using the Theme Hook

```tsx
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

### Using CSS Variables

```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}
```

### Using Theme-Aware Classes

```tsx
import { useThemeClass } from '@/context/ThemeContext'

function MyComponent() {
  const className = useThemeClass('my-component')
  return <div className={className}>Content</div>
}
```

## Adding New Themes

1. **Define the theme in `src/lib/theme.ts`**:
```typescript
export type Theme = 'light' | 'dark' | 'sepia' // Add new theme

export const themes: Record<Theme, ThemeConfig> = {
  // ... existing themes
  sepia: {
    name: 'sepia',
    displayName: 'Sepia',
    description: 'Warm sepia theme for comfortable reading'
  }
}
```

2. **Add CSS variables in `src/app/globals.css`**:
```css
:root.sepia {
  --bg-primary: #f4f1e8;
  --text-primary: #5d4e37;
  /* ... other variables */
}
```

3. **Update the theme toggle logic** if needed for multi-theme support

## CSS Variable Categories

### Backgrounds
- `--bg-primary`: Main background color
- `--bg-secondary`: Secondary background (cards, overlays)
- `--bg-tertiary`: Tertiary background (footer, etc.)
- `--bg-card`: Card backgrounds
- `--bg-header`: Header background
- etc.

### Text Colors
- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text color
- `--text-muted`: Muted text color
- `--text-hero`: Hero section text
- etc.

### Borders
- `--border-primary`: Primary border color
- `--border-card`: Card border color
- etc.

### Shadows
- `--shadow-card`: Card shadow
- `--shadow-header`: Header shadow
- etc.

## Features

- ✅ Automatic system preference detection
- ✅ Theme persistence in localStorage  
- ✅ Smooth transitions between themes
- ✅ Server-side rendering compatible
- ✅ Fully accessible with proper ARIA labels
- ✅ Extensible for future themes
- ✅ Type-safe theme management

## Browser Support

- All modern browsers with CSS custom properties support
 