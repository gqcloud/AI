# Theme System Specification

## Overview

This specification defines the complete theme color system for the Apple Music UI redesign, ensuring all UI elements adapt to dark and light themes with consistent styling.

## ADDED Requirements

### Requirement: Theme Variables Define All Colors

The system SHALL define CSS custom properties (variables) for all theme-dependent colors, enabling runtime theme switching without code changes.

#### Scenario: CSS variables defined for base colors
- **WHEN** the application loads
- **THEN** CSS variables MUST be available in `:root` for `--bg-primary`, `--bg-surface`, `--bg-card`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--accent`, `--glass`, `--border`, `--shadow`, and `--divider`

#### Scenario: CSS variables override for light theme
- **WHEN** the body has attribute `data-theme="light"`
- **THEN** the system MUST override base variables with light theme values

### Requirement: Dark Theme Colors

The system SHALL provide a complete dark theme color palette that matches Apple Music's visual design language.

#### Scenario: Dark background colors
- **WHEN** theme is set to dark
- **THEN** `--bg-primary` MUST be `#000000`, `--bg-surface` MUST be `#1c1c1e`, and `--bg-card` MUST be `rgba(255,255,255,0.05)`

#### Scenario: Dark text colors
- **WHEN** theme is set to dark
- **THEN** `--text-primary` MUST be `#ffffff`, `--text-secondary` MUST be `rgba(255,255,255,0.6)`, and `--text-tertiary` MUST be `rgba(255,255,255,0.4)`

#### Scenario: Dark accent and effect colors
- **WHEN** theme is set to dark
- **THEN** `--accent` MUST be `#fa233b`, `--glass` MUST be `rgba(28,28,30,0.8)`, `--border` MUST be `rgba(255,255,255,0.1)`, and `--shadow` MUST be `rgba(0,0,0,0.5)`

### Requirement: Light Theme Colors

The system SHALL provide a complete light theme color palette using pure white backgrounds as specified by the user.

#### Scenario: Light background colors
- **WHEN** theme is set to light
- **THEN** `--bg-primary` MUST be `#ffffff`, `--bg-surface` MUST be `#ffffff`, and `--bg-card` MUST be `rgba(0,0,0,0.05)`

#### Scenario: Light text colors
- **WHEN** theme is set to light
- **THEN** `--text-primary` MUST be `#1d1d1f`, `--text-secondary` MUST be `rgba(29,29,31,0.6)`, and `--text-tertiary` MUST be `rgba(29,29,31,0.4)`

#### Scenario: Light accent and effect colors
- **WHEN** theme is set to light
- **THEN** `--accent` MUST remain `#fa233b` (Apple Music Red unchanged), `--glass` MUST be `rgba(255,255,255,0.85)`, `--border` MUST be `rgba(0,0,0,0.1)`, and `--shadow` MUST be `rgba(0,0,0,0.15)`

### Requirement: Theme-Aware Utility Classes

The system SHALL provide CSS utility classes that map to theme variables, enabling consistent styling across all components.

#### Scenario: Background utility classes
- **WHEN** elements use `.bg-primary`, `.bg-surface`, or `.bg-card` classes
- **THEN** background color MUST inherit from corresponding `--bg-primary`, `--bg-surface`, or `--bg-card` variables

#### Scenario: Text utility classes
- **WHEN** elements use `.text-primary`, `.text-secondary`, or `.text-tertiary` classes
- **THEN** text color MUST inherit from corresponding `--text-primary`, `--text-secondary`, or `--text-tertiary` variables

#### Scenario: Border and divider classes
- **WHEN** elements use `.border-theme` or `.divider` classes
- **THEN** border-color and background-color MUST inherit from `--border` and `--divider` variables respectively

### Requirement: Layout Adapts to Theme

The Layout component SHALL use theme variables for all background, text, and border colors.

#### Scenario: Main container background
- **WHEN** the Layout component renders
- **THEN** the main container element MUST use `.bg-primary` for background

#### Scenario: Sidebar styling
- **WHEN** the Layout component renders on desktop
- **THEN** the sidebar MUST use `.glass` class and `.border-theme` for borders

#### Scenario: Navigation text colors
- **WHEN** navigation items render
- **THEN** inactive navigation items MUST use `.text-secondary` and MUST change to `.text-primary` with `.bg-card` background on hover

#### Scenario: Active navigation state
- **WHEN** a navigation item is active
- **THEN** it MUST use `.bg-rose-500` for background with white text (accent unchanged per Apple design)

### Requirement: Home Page Adapts to Theme

The Home page SHALL use theme variables for all section headers, subtitles, cards, and interactive elements.

#### Scenario: Section headers and subtitles
- **WHEN** Home page renders section headers
- **THEN** headers MUST use `.text-primary` and subtitles MUST use `.text-secondary`

#### Scenario: Playlist and song cards
- **WHEN** playlist or song cards render
- **THEN** card containers MUST use `.bg-card` and hover state MUST darken/lighten appropriately using theme variables

#### Scenario: Interactive text colors
- **WHEN** song titles or playlist names render
- **THEN** they MUST use `.text-primary` and hover state MUST use accent color

### Requirement: Settings Page Adapts to Theme

The Settings page SHALL use theme variables for all section containers, dividers, and text elements.

#### Scenario: Section containers
- **WHEN** Settings page renders section containers
- **THEN** containers MUST use `.bg-card` with `.divide-theme` for internal dividers

#### Scenario: Section headers
- **WHEN** Settings page renders section headers
- **THEN** headers MUST use `.text-tertiary` for subtle labels

#### Scenario: Theme toggle UI
- **WHEN** the appearance toggle section renders
- **THEN** it MUST use `.bg-card` background and active theme button MUST use accent color

### Requirement: Mini Player Adapts to Theme

The MiniPlayer component SHALL use theme variables for text colors and borders while preserving accent color for progress bar.

#### Scenario: Container styling
- **WHEN** MiniPlayer renders
- **THEN** container MUST use `.glass` class and `.border-theme` for border

#### Scenario: Text colors
- **WHEN** MiniPlayer renders song title and artist
- **THEN** song title MUST use `.text-primary` and artist MUST use `.text-secondary`

#### Scenario: Progress bar
- **WHEN** MiniPlayer shows progress
- **THEN** progress bar MUST use accent color (`#fa233b`) unchanged per Apple design

### Requirement: Smooth Theme Transitions

The system SHALL provide smooth animated transitions when switching between themes.

#### Scenario: Transition animation
- **WHEN** theme changes via toggle
- **THEN** all color transitions MUST animate over 300ms with ease-in-out timing

#### Scenario: Reduced motion preference
- **WHEN** user has `prefers-reduced-motion` set
- **THEN** color transitions MUST be instant (no animation)

### Requirement: Theme Persistence

The system SHALL persist the user's theme preference across browser sessions.

#### Scenario: Save theme preference
- **WHEN** user toggles theme
- **THEN** the selected theme MUST be saved to localStorage under key `'theme'`

#### Scenario: Load theme preference
- **WHEN** application loads
- **THEN** theme MUST be initialized from localStorage value or default to dark

#### Scenario: Apply persisted theme
- **WHEN** theme loads from localStorage
- **THEN** the body MUST have correct `data-theme` attribute applied

### Requirement: All Components Use Theme Variables

All remaining components (Search, Library, Community, PlayerOverlay) SHALL use theme variables for consistent styling.

#### Scenario: Search page adapts
- **WHEN** Search page renders
- **THEN** all backgrounds, text, and borders MUST use corresponding theme variables

#### Scenario: Library page adapts
- **WHEN** Library page renders
- **THEN** all backgrounds, text, and borders MUST use corresponding theme variables

#### Scenario: Community page adapts
- **WHEN** Community page renders
- **THEN** all backgrounds, text, and borders MUST use corresponding theme variables

#### Scenario: PlayerOverlay adapts
- **WHEN** PlayerOverlay renders
- **THEN** all backgrounds, text, borders, and overlays MUST use corresponding theme variables
