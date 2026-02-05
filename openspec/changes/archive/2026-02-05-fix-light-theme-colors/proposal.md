# Fix Light Theme Colors

## Why

The current theme implementation only partially adapts to light/dark mode changes. Components like sidebar and navigation adapt, but many page elements (cards, buttons, backgrounds, text colors) remain hardcoded to dark theme values. This creates an inconsistent user experience where some UI elements correctly switch themes while others remain stuck in dark mode styling.

## What Changes

- Update all hardcoded dark theme colors to use CSS variables
- Ensure every page element (Home, Search, Library, Community, Settings, PlayerOverlay) responds to `[data-theme="light"]`
- Fix light theme background from `#fbfbfd` to pure white `#ffffff`
- Update text colors to adapt properly (dark text on light backgrounds)
- Adjust card backgrounds, borders, and interactive states for light mode
- Ensure glass morphism effects work correctly in both themes

## Capabilities

### New Capabilities
- `theme-system`: Complete theme color system that all UI elements inherit from

### Modified Capabilities
- (None - this is a new capability being established)

## Impact

- **Modified Files**: `index.html`, `pages/Home.tsx`, `pages/Search.tsx`, `pages/Library.tsx`, `pages/Community.tsx`, `pages/Settings.tsx`, `components/Layout.tsx`, `components/MiniPlayer.tsx`, `components/PlayerOverlay.tsx`
- **New Files**: `context/ThemeContext.tsx` (already exists from previous change, may need updates)
- **Design**: CSS variable system in `index.html` needs expansion and component-level adoption
