# Proposal: Add Theme Switching (Dark/Light Mode)

## Summary

Add manual dark/light theme switching capability to the Apple Music UI redesign, with smooth transitions and localStorage persistence, while maintaining Apple HIG compliance.

## Problem Statement

Currently the application only supports a single dark theme. Users should be able to switch between dark and light appearances with:
- Smooth animated transitions
- Preference persistence across sessions
- Consistent Apple-style visual design

## Scope

### In Scope
- Dark/Light theme manual switching
- CSS variable-based theming system
- Smooth transition animations (0.3s)
- localStorage persistence
- Theme toggle UI in Settings page
- Updated glass morphism effects for both themes

### Out of Scope
- Auto-follow system theme (manual only for now)
- Custom accent color selection
- Multiple named themes beyond dark/light

## User Experience

### Before
- Single dark theme only
- No user preference for appearance

### After
- Toggle between dark/light in Settings > Appearance
- Smooth animated transition between themes
- Preference remembered across sessions
- Consistent Apple Music aesthetic in both themes

## Technical Approach

Use CSS custom properties (variables) for theme colors:
- Define CSS variables for all theme-dependent colors
- Use `[data-theme="light"]` attribute selector on body
- React Context for state management and persistence
- CSS transitions on body for smooth theme switching

## Files Affected

### New Files
- `context/ThemeContext.tsx` - Theme state management

### Modified Files
- `index.html` - CSS variables and theme styles
- `App.tsx` - Wrap with ThemeProvider
- `pages/Settings.tsx` - Add theme toggle UI
- `components/Layout.tsx` - Theme-aware styling
- `components/MiniPlayer.tsx` - Theme-aware glass effects

## Success Criteria

- [ ] Users can toggle between dark and light themes
- [ ] Theme preference persists after page refresh
- [ ] Smooth animated transition between themes (< 0.5s)
- [ ] Both themes meet Apple HIG visual standards
- [ ] No visual regressions in existing components

## Timeline

Estimated: 1-2 implementation sessions
