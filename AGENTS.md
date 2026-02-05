# AGENTS.md

This document provides guidelines for AI agents working in this Apple Music redesign repository.

## Project Overview

React 19 + Vite + TypeScript project implementing an Apple Music UI redesign with:
- Player context for playback state management
- Mini player and full-screen player overlays
- Responsive layout (desktop sidebar + mobile bottom nav)
- Mock data for songs, playlists, and artists

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on port 3000
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
```

## Code Style Guidelines

### TypeScript
- Use explicit TypeScript types; avoid `any`
- Interface names: PascalCase (e.g., `PlayerContextType`)
- Type names: PascalCase (e.g., `Song`, `Playlist`)
- Use `type` for unions/primitives, `interface` for object shapes
- Nullable values: `null` type annotation, not `undefined`

### React Components
- Functional components with `React.FC<Props>` typing
- Props interfaces defined immediately above component
- Always type `children` as `React.ReactNode`
- Component files: one default export per file
- Import React: `import React from 'react'` (always include)

### Imports
- Group order: React → React Router → Context → Components → Types → Mock Data → Icons
- Sort alphabetically within groups
- Absolute imports via `@/` alias for root (configured in tsconfig.json)
- Example:
  ```tsx
  import React from 'react';
  import { Routes, Route } from 'react-router-dom';
  import { PlayerProvider } from './context/PlayerContext';
  import Layout from './components/Layout';
  import Home from './pages/Home';
  ```

### Naming Conventions
- Variables/functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Component files: PascalCase (e.g., `MiniPlayer.tsx`)
- Context providers: `XxxProvider` pattern
- Custom hooks: `useXxx` pattern

### Error Handling
- Throw errors for missing required DOM elements: `throw new Error("message")`
- Context must be used within provider: `throw new Error()` for missing context
- Guard clauses for null/undefined checks before operations

### State Management
- Use PlayerContext for global playback state
- Use `useState` for local component state
- Use `useRef` for mutable values that don't trigger re-renders
- Use `useEffect` for side effects; always return cleanup function

### CSS/Tailwind
- Tailwind via CDN in index.html
- Use consistent color palette: black backgrounds, white text, rose-500 accents
- Responsive prefixes: `md:`, `lg:` for breakpoints
- Hover states: `hover:bg-white/90`, `hover:scale-105`, `hover:text-rose-500`
- Transitions: `transition-colors`, `transition-transform`, `duration-200`/`duration-700`

### File Organization
```
/components    # Reusable UI components (Layout, MiniPlayer, PlayerOverlay)
/context       # React context providers (PlayerContext)
/pages         # Route page components (Home, Search, Library, Settings)
/types.ts      # TypeScript interfaces
/mockData.ts   # Mock song/playlist/artist data
vite.config.ts # Vite configuration
tsconfig.json  # TypeScript configuration
```

### Additional Patterns
- HashRouter for client-side routing (works with static hosting)
- Mock data in `SONGS`, `PLAYLISTS`, `ALBUMS`, `ARTISTS` constants
- Duration in seconds for song data
- Album/artist IDs linking related entities
