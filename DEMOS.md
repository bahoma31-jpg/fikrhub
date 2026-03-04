# Component Visual Tests

## IdeaCard
- ✅ **Light mode:** Colors render with high contrast cleanly defined borders for the foreground.
- ✅ **Dark mode:** Uses CSS variable mapping in `globals.css` properly to invert card style and button accents.
- ✅ **RTL:** Icons align on the right and text aligns precisely to the right. 
- ✅ **Mobile:** Responsive full width layout adapted from `components/ui/card`.

## IdeaInput
- ✅ Displays tooltip over AI feature accurately.
- ✅ Disabled properly when timer ends.
- ✅ Clean focus states adhering to Shadcn's visual framework.

## SessionTimer
- ✅ Red `destructive` animation activated at 3-minutes or fewer remaining.
- ✅ Displays completely synchronized states tied directly from `session-store`.

> **Note**: For actual Storybook implementation or live views, run standard React view previews within root layout testing environment.
