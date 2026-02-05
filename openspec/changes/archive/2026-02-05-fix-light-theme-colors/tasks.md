# Tasks: Full Theme Color Implementation

## 1. Update CSS Variables in index.html

- [x] 1.1 Update `--bg-primary` light theme value from `#fbfbfd` to `#ffffff`
- [x] 1.2 Add `--text-tertiary` variable for both themes
- [x] 1.3 Add `--shadow` and `--divider` variables for both themes
- [x] 1.4 Add CSS utility classes: `.bg-primary`, `.bg-surface`, `.bg-card`, `.text-primary`, `.text-secondary`, `.text-tertiary`, `.border-theme`, `.shadow-theme`, `.divider`, `.hover-card:hover`
- [x] 1.5 Update `.glass` class opacity for light theme to `0.85`

## 2. Update Layout Component

- [x] 2.1 Replace main container `bg-black text-white` with theme utility classes
- [x] 2.2 Update sidebar container to use `.bg-surface` and `.border-theme`
- [x] 2.3 Change navigation text from `text-gray-400` to `.text-secondary`
- [x] 2.4 Update hover states from `hover:bg-white/5` to `hover:bg-card`
- [x] 2.5 Update inactive navigation chevron and icons to use `.text-secondary`
- [x] 2.6 Update bottom navigation similar patterns for mobile

## 3. Update Home Page

- [x] 3.1 Update section headers to use `.text-primary`
- [x] 3.2 Update subtitles from `text-gray-400` to `.text-secondary`
- [x] 3.3 Update playlist/song card hover backgrounds from `hover:bg-white/5` to `hover:bg-card`
- [x] 3.4 Update song list item containers to use `.bg-card`
- [x] 3.5 Update "查看全部" links to use `.text-secondary`
- [x] 3.6 Update hero section overlay gradient for light theme compatibility

## 4. Update Settings Page

- [x] 4.1 Update section container backgrounds from `bg-white/5` to `bg-card`
- [x] 4.2 Update dividers from `divide-white/5` to `divide-theme`
- [x] 4.3 Update section headers from `text-white/40` to `.text-tertiary`
- [x] 4.4 Update value text from `text-white/40` to `.text-tertiary`
- [x] 4.5 Update chevron icons to use `.text-tertiary`
- [x] 4.6 Update button hover states to `hover:bg-card`
- [x] 4.7 Update avatar border for light theme compatibility
- [x] 4.8 Update theme toggle buttons for proper light theme appearance

## 5. Update MiniPlayer Component

- [x] 5.1 Update container border from `border-white/10` to `.border-theme`
- [x] 5.2 Update song title from `text-white` to `.text-primary`
- [x] 5.3 Update artist text from `text-white/50` to `.text-secondary`
- [x] 5.4 Verify progress bar accent color remains unchanged

## 6. Update Remaining Pages

- [x] 6.1 Update Search page with theme utility classes
- [x] 6.2 Update Library page with theme utility classes
- [x] 6.3 Update Community page with theme utility classes

## 7. Update PlayerOverlay Component

- [x] 7.1 Update background and overlay colors with theme variables
- [x] 7.2 Update text colors to use theme utility classes
- [x] 7.3 Update borders and dividers to use `.border-theme`
- [x] 7.4 Verify all interactive elements work correctly in both themes

## 8. Testing and Verification

- [x] 8.1 Build project and verify no errors
- [ ] 8.2 Test theme toggle in Settings
- [ ] 8.3 Verify smooth 0.3s transition animation
- [ ] 8.4 Verify theme preference persists after refresh
- [ ] 8.5 Test all pages in dark theme
- [ ] 8.6 Test all pages in light theme
- [ ] 8.7 Verify reduced motion preference works
- [ ] 8.8 Verify mobile responsive layout in both themes

## File Summary

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Modify | Update CSS variables and add utility classes |
| `components/Layout.tsx` | Modify | Use theme utility classes |
| `pages/Home.tsx` | Modify | Use theme utility classes |
| `pages/Settings.tsx` | Modify | Use theme utility classes |
| `components/MiniPlayer.tsx` | Modify | Use theme utility classes |
| `pages/Search.tsx` | Modify | Use theme utility classes |
| `pages/Library.tsx` | Modify | Use theme utility classes |
| `pages/Community.tsx` | Modify | Use theme utility classes |
| `components/PlayerOverlay.tsx` | Modify | Use theme utility classes |
