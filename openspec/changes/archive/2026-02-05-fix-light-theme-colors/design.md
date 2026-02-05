# Design: Full Theme Color System

## Context

The previous theme implementation added CSS variables for base colors but components still use hardcoded Tailwind colors. This design addresses the gap between CSS variables and actual component styling.

### Current State
- CSS variables exist in `index.html` for base colors
- Components still use `bg-black`, `text-white`, `text-gray-400`, etc.
- Light theme only partially works - background changes but inner elements don't adapt

### Constraints
- Tailwind CDN doesn't support runtime config
- Must use CSS variables or inline styles for dynamic theming
- Keep Apple Music aesthetic consistent across themes
- Accent color (#fa233b) remains unchanged

## Goals / Non-Goals

**Goals:**
- Complete theme adaptation across all components
- Pure white (`#ffffff`) background for light theme
- All text, backgrounds, borders adapt to theme
- Smooth transitions work correctly

**Non-Goals:**
- Custom accent color selection (keep Apple Music Red)
- Auto-follow system theme (manual toggle only for now)
- Animated theme transitions beyond current 0.3s ease

## Decisions

### D1: CSS Variable Mapping Strategy

**Decision:** Extend CSS variables in `index.html` and use inline `style` props where Tailwind classes can't adapt.

**Rationale:** Tailwind's `dark:` modifier requires build-time configuration which isn't available with CDN. CSS variables work at runtime.

**Alternative Considered:** Add `dark:` classes to all elements
- Rejected: Would require changing every component and many elements lack dark variants

### D2: Theme-Aware Utility Classes

**Decision:** Add CSS classes for theme-dependent patterns.

```css
.bg-theme { background-color: var(--bg-primary); }
.text-theme-primary { color: var(--text-primary); }
.text-theme-secondary { color: var(--text-secondary); }
.bg-theme-surface { background-color: var(--bg-surface); }
.bg-theme-card { background-color: var(--card-bg); }
.border-theme { border-color: var(--border); }
.hover-bg-theme-card:hover { background-color: var(--card-bg); }
```

**Rationale:** Single-line class adoption per element vs. complex inline styles.

### D3: Light Theme Background

**Decision:** Use pure white `#ffffff` for light theme.

**Rationale:** Apple Music iOS/macOS light mode uses white, not off-white. Matches user requirement.

### D4: Border Handling

**Decision:** Borders use CSS variables that invert between themes.

**Dark:** `rgba(255,255,255,0.1)`
**Light:** `rgba(0,0,0,0.1)`

**Rationale:** Subtle borders needed in both themes for visual hierarchy.

## CSS Variable System

### Complete Variable Set

```css
:root {
  /* Base Colors - Dark Default */
  --bg-primary: #000000;
  --bg-surface: #1c1c1e;
  --bg-card: rgba(255,255,255,0.05);
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.6);
  --text-tertiary: rgba(255,255,255,0.4);
  --accent: #fa233b;
  --accent-hover: #d61a30;
  --glass: rgba(28,28,30,0.8);
  --border: rgba(255,255,255,0.1);
  --shadow: rgba(0,0,0,0.5);
  --divider: rgba(255,255,255,0.1);
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-surface: #ffffff;
  --bg-card: rgba(0,0,0,0.05);
  --text-primary: #1d1d1f;
  --text-secondary: rgba(29,29,31,0.6);
  --text-tertiary: rgba(29,29,31,0.4);
  --accent: #fa233b;
  --accent-hover: #d61a30;
  --glass: rgba(255,255,255,0.85);
  --border: rgba(0,0,0,0.1);
  --shadow: rgba(0,0,0,0.15);
  --divider: rgba(0,0,0,0.1);
}
```

### Utility Classes to Add

```css
.bg-primary { background-color: var(--bg-primary); }
.bg-surface { background-color: var(--bg-surface); }
.bg-card { background-color: var(--bg-card); }
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-tertiary { color: var(--text-tertiary); }
.border-theme { border-color: var(--border); }
.shadow-theme { box-shadow: 0 4px 20px var(--shadow); }
.divider { background-color: var(--divider); }
.hover-card:hover { background-color: var(--bg-card); }
```

## Component Updates Required

### Layout.tsx
| Element | Current | Updated |
|---------|---------|---------|
| Container | `bg-black text-white` | `bg-primary text-primary` |
| Sidebar | `border-white/10` | `border-theme` |
| Nav items | `text-gray-400` | `text-secondary` |
| Nav hover | `hover:bg-white/5` | `hover:bg-card` |
| Active nav | `bg-rose-500 text-white` | Keep (accent unchanged) |

### Home.tsx
| Element | Current | Updated |
|---------|---------|---------|
| Section headers | `text-white` | `text-primary` |
| Subtitle | `text-gray-400` | `text-secondary` |
| Hero overlay | `from-black/80` | Gradient needs review |
| Hero text | `text-white/60` | `text-secondary` |
| Playlist cards hover | `bg-white/5` | `hover:bg-card` |
| Song list hover | `hover:bg-white/5` | `hover:bg-card` |
| Song title hover | `hover:text-rose-500` | Keep (accent) |

### Settings.tsx
| Element | Current | Updated |
|---------|---------|---------|
| Card containers | `bg-white/5` | `bg-card` |
| Dividers | `divide-white/5` | `divide-theme` |
| Section headers | `text-white/40` | `text-tertiary` |
| Button values | `text-white/40` | `text-tertiary` |
| Chevron | `text-white/20` | `text-tertiary` |

### MiniPlayer.tsx
| Element | Current | Updated |
|---------|---------|---------|
| Container | `glass border-white/10` | `glass border-theme` |
| Progress | `bg-rose-500` | Keep (accent) |
| Song title | `text-white` | `text-primary` |
| Artist | `text-white/50` | `text-secondary` |

### PlayerOverlay.tsx (needs review)

### Search.tsx, Library.tsx, Community.tsx (similar patterns)

## Implementation Strategy

### Phase 1: CSS Foundation
1. Update `index.html` with complete variable set
2. Add utility classes for theme-aware styling

### Phase 2: Layout Updates
1. Update `Layout.tsx` primary container
2. Update sidebar and navigation

### Phase 3: Page Components
1. Update `Home.tsx`
2. Update `Search.tsx`
3. Update `Library.tsx`
4. Update `Community.tsx`
5. Update `Settings.tsx`

### Phase 4: Player Components
1. Update `MiniPlayer.tsx`
2. Update `PlayerOverlay.tsx`

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Gradient backgrounds don't adapt | Use semi-transparent overlays with theme-aware colors |
| Shadows look wrong in light mode | Use CSS variable for shadow color |
| Text contrast issues in light mode | Verify all text colors meet WCAG AA |
| Incomplete component coverage | Systematic review of all components |
| Tailwind `gray-*` colors don't adapt | Replace with CSS variable equivalents |

## Open Questions

1. **Hero gradient**: The hero section uses `from-black/80` gradient. Should this adapt to light theme with `from-white/80` or remain dark for image contrast?
   - Recommendation: Keep hero overlay dark regardless of theme for better image visibility

2. **Icon colors**: Lucide icons inherit text color. Does this work correctly with our CSS variables?
   - Needs testing during implementation

3. **Image borders**: User avatar border uses `border-black`. Should this adapt?
   - Recommendation: Keep dark border for dark theme, white border for light
