# Ghumakkad App Architecture

## Motion Layer Separation

Think of motion as **3 separate engines**. Each owns a domain. Don't animate the same element in two engines.

| Engine | Tool | Owns |
|--------|------|------|
| **Navigation** | View Transitions API | Route changes, page-level continuity |
| **UI** | Framer Motion | Hover, open/close, list reorders, modals, toasts |
| **Story** | GSAP + ScrollTrigger | Pinned sections, scrub timelines, parallax |

**Rule:** Decide who owns an element. If it's in a route transition, Navigation owns it. If it's a card hover, UI owns it. If it's a scroll scene, Story owns it.

---

## Motion Provider (Central Control)

`MotionProvider` wraps the app and controls:

| Control | What it does |
|---------|--------------|
| **Reduced motion** | OS `prefers-reduced-motion` + in-app toggle (navbar) |
| **Route transition mode** | `subtle` (500ms) vs `cinematic` (650ms, bigger slide) |
| **Scroll engine** | Lenis on/off — disabled when reduced motion |
| **Tokens** | `useMotion().tokens` for programmatic duration/easing |

```tsx
import { useMotion } from '@/motion';

function MyComponent() {
  const { reducedMotion, routeTransitionMode, scrollEngineEnabled, tokens } = useMotion();
  // ...
}
```

Set route mode: `setRouteTransitionMode('cinematic')` (e.g. from settings).

---

## Performance-First Route Loading (Vite)

### Lazy-loaded routes

Heavy routes are code-split and loaded on demand:

- `BudgetEstimator` (Chart.js)
- `ItineraryBuilder` (images, cards)
- `PackingList` (Framer Motion)
- `TravelSuggestions`
- `WeatherForecast` (axios, API)

`HomePage` loads eagerly (above-the-fold).

### Motion placeholders

While a lazy route loads, `RoutePageSkeleton` shows:

- Skeleton blocks (title + card grid)
- Fade-in on mount
- Crossfade out when content loads (Suspense)

The UI stays responsive; no blank flash.

### Defer heavy widgets

For widgets inside a page (e.g. Chart, map):

1. Use `IntersectionObserver` or Framer Motion `whileInView`
2. Render a lightweight placeholder until visible
3. Lazy-load the heavy component when in view

---

## File Structure

```
src/
├── motion/                    # Motion layer
│   ├── MotionProvider.tsx     # Central orchestrator
│   ├── MotionContext.tsx      # reduced, route mode, tokens
│   ├── LenisProvider.tsx     # Scroll engine (conditional)
│   ├── ViewTransitionLink.tsx
│   ├── RoutePageSkeleton.tsx  # Loading placeholder
│   ├── recipes.ts            # Framer Motion variants
│   └── useScrollTrigger.ts   # GSAP hook
├── theme/
│   ├── tokens.css            # Duration, easing, distances
│   ├── recipes.css           # CSS motion recipes
│   └── view-transitions.css  # Route mode styles
└── App.tsx                   # MotionProvider + Suspense + lazy routes
```
