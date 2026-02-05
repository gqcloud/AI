# Tasks: Theme Switching Implementation

## Phase 1: Foundation

### Task 1.1: Add CSS Variables to index.html

**File**: `index.html`

**Steps**:
1. Add CSS custom properties for all theme colors
2. Add `[data-theme="light"]` overrides
3. Add transition animation to body
4. Add reduced motion media query

**Acceptance**:
- CSS variables defined for all theme colors
- Light theme overrides active when body has `data-theme="light"`
- Smooth transition when theme changes

```html
<style>
  :root {
    --bg-primary: #000000;
    --bg-surface: #1c1c1e;
    --text-primary: #ffffff;
    --text-secondary: rgba(255,255,255,0.6);
    --accent: #fa233b;
    --glass: rgba(28,28,30,0.8);
    --border: rgba(255,255,255,0.1);
    --card-bg: rgba(255,255,255,0.05);
  }
  [data-theme="light"] {
    --bg-primary: #fbfbfd;
    --bg-surface: #ffffff;
    --text-primary: #1d1d1f;
    --text-secondary: rgba(29,29,31,0.6);
    --glass: rgba(255,255,255,0.8);
    --border: rgba(0,0,0,0.1);
    --card-bg: rgba(0,0,0,0.05);
  }
  body {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  @media (prefers-reduced-motion: reduce) {
    body { transition: none; }
  }
</style>
```

---

### Task 1.2: Create ThemeContext

**File**: `context/ThemeContext.tsx`

**Steps**:
1. Create ThemeContext with theme state
2. Implement toggleTheme function
3. Add useEffect for localStorage sync
4. Add useEffect for DOM attribute sync
5. Export useTheme hook

**Acceptance**:
- ThemeContext provides theme value
- toggleTheme switches between dark/light
- localStorage persists theme preference
- DOM updates with data-theme attribute

---

## Phase 2: Integration

### Task 2.1: Wrap App with ThemeProvider

**File**: `App.tsx`

**Steps**:
1. Import ThemeProvider from ThemeContext
2. Wrap entire app with ThemeProvider (inside PlayerProvider or around everything)

**Acceptance**:
- ThemeContext available to all components
- No breaking changes to existing functionality

---

### Task 2.2: Add Theme Toggle to Settings

**File**: `pages/Settings.tsx`

**Steps**:
1. Import useTheme hook
2. Add new "外观" (Appearance) section
3. Create radio-style toggle UI
4. Visual indicator for active theme using accent color
5. Call toggleTheme on option click

**Acceptance**:
- Appearance section visible in Settings
- Toggle between dark/light works
- Current theme clearly indicated
- Matches Apple UI patterns

**UI Structure**:
```tsx
<section className="space-y-3">
  <h3 className="px-4 text-[10px] uppercase font-bold text-white/40 tracking-widest">
    外观
  </h3>
  <div className="bg-white/5 rounded-2xl p-2 flex gap-2">
    <button
      onClick={() => theme === 'dark' || toggleTheme()}
      className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
        theme === 'dark' ? 'bg-rose-500 text-white' : 'text-white/60 hover:bg-white/5'
      }`}
    >
      深色
    </button>
    <button
      onClick={() => theme === 'light' || toggleTheme()}
      className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
        theme === 'light' ? 'bg-rose-500 text-white' : 'text-white/60 hover:bg-white/5'
      }`}
    >
      浅色
    </button>
  </div>
</section>
```

---

## Phase 3: Verification

### Task 3.1: Manual Testing Checklist

- [ ] Open app in dark theme (default)
- [ ] Navigate to Settings
- [ ] Click 浅色 toggle
- [ ] Verify smooth color transition (0.3s)
- [ ] Verify all UI elements updated correctly
- [ ] Refresh page
- [ ] Verify light theme persists
- [ ] Toggle back to 深色
- [ ] Verify dark theme restores
- [ ] Test on mobile viewport (bottom nav)

### Task 3.2: Visual Verification

Check these components in both themes:

| Component | Dark | Light |
|-----------|------|-------|
| Layout sidebar | Verify glass effect | Verify glass effect |
| Home hero section | Verify gradient | Verify gradient |
| Playlist cards | Verify shadow | Verify shadow |
| MiniPlayer | Verify progress bar | Verify progress bar |
| Bottom nav (mobile) | Verify icons | Verify icons |

---

## Phase 4: Polish

### Task 4.1: Fine-tune Light Theme Colors

If any colors need adjustment after testing:
- Update CSS variables in index.html
- Ensure contrast ratios meet WCAG AA
- Match Apple light mode aesthetics

### Task 4.2: Component-specific Adjustments

Identify any components that need explicit theme-aware styling:

```css
/* Example: Card hover states */
.bg-white\/5:hover {
  background-color: var(--card-bg);
}
```

---

## File Summary

| File | Action | Lines (est.) |
|------|--------|--------------|
| index.html | Modify | +40 |
| context/ThemeContext.tsx | Create | +50 |
| App.tsx | Modify | +3 |
| pages/Settings.tsx | Modify | +25 |

**Total New Files**: 1
**Total Modified Files**: 3

## Dependencies

- None external required
- Uses standard React hooks
- Uses existing localStorage pattern
- Uses existing CSS/Tailwind setup

## Notes

- Accent color (#fa233b) remains unchanged in both themes
- Glass effects use same blur value, different opacity
- Borders invert color scheme (white→black at 10%)
- All transitions handled by single body rule
