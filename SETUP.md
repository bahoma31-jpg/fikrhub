# A5 Setup Guide

## Shadcn Components Installed
- button, card, dialog, input, badge, select, textarea, tabs, avatar, dropdown-menu, sheet, tooltip

## Tailwind Configuration
- RTL support via `tailwindcss-rtl`
- Arabic fonts: Cairo, Tajawal (configured via `next/font/google` in `app/layout.tsx`)
- Dark mode: Next-themes class strategy implemented with `ThemeProvider`

## Stores Architecture
- **session-store**: Manages current session state, active timer logic, and session actions.
- **ideas-store**: Manages ideas CRUD operations sequentially with optimistic UI updates.
- **ui-store**: Manages UI state (sidebar, modals, theme).

## Directory Structure
- `stores/`: Contains all Zustand stores.
- `hooks/`: Contains central data-fetching logic wrapped over hooks.
- `components/layout/`: Common layout elements (Sidebar, Navbar, MobileNav).
- `components/session/`: Focuses on brainstorming and real-time state for ideas.
