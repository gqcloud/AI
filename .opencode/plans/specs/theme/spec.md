# Theme Switching Specification

## Overview

This document defines the detailed technical specification for the dark/light theme switching feature in the Apple Music UI redesign.

## Functional Requirements

### FR-001: Theme Toggle
- Users must be able to toggle between dark and light themes via Settings
- Default theme: dark
- Toggle action must be immediate

### FR-002: Theme Persistence
- Selected theme must persist across browser sessions
- Storage mechanism: localStorage under key `theme`
- Value: `'dark'` or `'light'`

### FR-003: Visual Transition
- Theme change must animate smoothly
- Transition duration: 300ms
- Transition timing function: ease-in-out

## Technical Requirements

### TR-001: CSS Variable System

All theme-dependent colors must be defined as CSS custom properties:

| Variable | Dark Value | Light Value | Usage |
|----------|------------|-------------|-------|
| `--bg-primary` | `#000000` | `#fbfbfd` | Main background |
| `--bg-surface` | `#1c1c1e` | `#ffffff` | Surface elements |
| `--text-primary` | `#ffffff` | `#1d1d1f` | Primary text |
| `--text-secondary` | `rgba(255,255,255,0.6)` | `rgba(29,29,31,0.6)` | Secondary text |
| `--accent` | `#fa233b` | `#fa233b` | Accent color (unchanged) |
| `--glass` | `rgba(28,28,30,0.8)` | `rgba(255,255,255,0.8)` | Glass morphism |
| `--border` | `rgba(255,255,255,0.1)` | `rgba(0,0,0,0.1)` | Subtle borders |
| `--card-bg` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.05)` | Card backgrounds |

### TR-002: Theme Context API

```typescript
// ThemeContext.tsx
type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
```

### TR-003: DOM Integration

- Apply theme via `data-theme` attribute on `<body>`
- CSS selector: `[data-theme="light"]`
- Transition applied to `body` element

## Component Specifications

### ThemeProvider Wrapper
- File: `context/ThemeContext.tsx`
- Wraps entire application
- Reads initial value from localStorage
- Subscribes to theme changes
- Updates DOM on theme change

### Settings UI
- Location: `pages/Settings.tsx`
- New section: "外观" (Appearance)
- Radio-style toggle: 深色 / 浅色
- Visual indicator for active theme
- Accent color for active state

## Accessibility

### A11Y-001: Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  body {
    transition: none;
  }
}
```

### A11Y-002: Color Contrast
- Light theme text must meet WCAG AA (4.5:1)
- Dark theme text must meet WCAG AA (4.5:1)
- Accent color: #fa233b on light = 4.2:1 (borderline, acceptable for accent)

## Testing Requirements

### Unit Tests
- ThemeContext initialization from localStorage
- ThemeContext toggle function
- localStorage write on theme change
- DOM attribute update verification

### Integration Tests
- Theme toggle triggers visual change
- Transition animation executes
- Theme persists after page reload

### Visual Regression
- Screenshot comparison for both themes
- Verify glass morphism effects in both modes
- Check all component states (hover, active) in both themes

## Apple HIG Compliance

- Accent color remains #fa233b (Apple Music Red)
- Glass effects use native macOS/iOS blur values
- Transition timing matches platform behavior
- Light mode follows Apple light mode patterns
