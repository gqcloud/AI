# Design: Theme Switching Implementation

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     index.html                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  <style>                                           │    │
│  │    :root { ...CSS variables... }                   │    │
│  │    [data-theme="light"] { ...override values... }  │    │
│  │    body { transition: all 0.3s ease; }            │    │
│  │  </style>                                          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   ThemeContext.tsx                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  • theme: 'dark' | 'light'                         │    │
│  │  • toggleTheme(): void                             │    │
│  │  • useEffect: sync to localStorage & DOM            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Settings.tsx                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Appearance section with toggle UI                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## CSS Variable System

### Base Variables (Dark Mode Default)

```css
:root {
  --bg-primary:   #000000;
  --bg-surface:   #1c1c1e;
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.6);
  --accent:       #fa233b;
  --glass:        rgba(28,28,30,0.8);
  --border:       rgba(255,255,255,0.1);
  --card-bg:      rgba(255,255,255,0.05);
}
```

### Light Mode Overrides

```css
[data-theme="light"] {
  --bg-primary:   #fbfbfd;
  --bg-surface:   #ffffff;
  --text-primary: #1d1d1f;
  --text-secondary: rgba(29,29,31,0.6);
  --glass:        rgba(255,255,255,0.8);
  --border:       rgba(0,0,0,0.1);
  --card-bg:      rgba(0,0,0,0.05);
}
```

### Transition Animation

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## Component Updates

### ThemeContext.tsx

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'dark';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
```

### Settings.tsx UI Design

```
┌─────────────────────────────────────────────────────────────┐
│  外观                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                               │
│    深色  ◉    ○  浅色                                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

Toggle component using radio buttons or segmented control with:
- Left option: 深色 (Dark)
- Right option: 浅色 (Light)
- Active state uses accent color

## Glass Morphism Adaptations

### Dark Theme (Current)
```css
.glass {
  background: rgba(28,28,30,0.8);
  backdrop-filter: blur(20px);
}
```

### Light Theme
```css
[data-theme="light"] .glass {
  background: rgba(255,255,255,0.8);
}
```

## Implementation Order

1. Add CSS variables to index.html
2. Create ThemeContext.tsx
3. Update App.tsx to wrap with ThemeProvider
4. Add theme toggle UI to Settings.tsx
5. Test theme switching and persistence
6. Verify visual consistency across all components

## Trade-offs and Decisions

### Why CSS Variables Over Tailwind Config
- Tailwind CDN doesn't support runtime config updates
- CSS variables provide instant theme switching
- No build step required for theme changes

### Why Manual Toggle Only
- Simpler initial implementation
- User explicitly requested manual control
- Can add auto-follow later if needed

### Transition on body
- Smooths all color transitions simultaneously
- Avoids component-level flickering
- Matches Apple platform behavior
