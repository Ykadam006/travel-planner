# Ghumakkad — Travel Planner

A cinematic, motion-led travel planning app built with **React 18** and **Vite**: itineraries with a live synced map, packing lists, budget estimation, weather forecasts, and a destination discovery engine — wrapped in a single token-driven design system with full dark mode and serious reduced-motion support.

**Live**: https://travelwithghumakkad.netlify.app/

## Highlights

- **Cinematic home** — LCP-friendly hero, GSAP ScrollTrigger pinned scroll story (a flight route draws itself while product steps crossfade), shared-element transitions into destination pages
- **Route continuity** — View Transitions API with `flushSync`-correct snapshots, Motion fallback for browsers without it, scroll restoration, animated navbar active pill
- **Itinerary Builder** — split planner + persistent map panel with two-way selection (card ⇄ marker), dnd-kit drag-and-drop with a lifted drag overlay, keyboard reordering
- **Discovery** — debounced cached destination search (OpenStreetMap + Wikipedia), compare mode in an accessible Radix bottom sheet
- **Data layer** — TanStack Query on top of a rate-limited (1 req/s Nominatim), localStorage-backed API cache
- **Accessibility** — OS + in-app reduced-motion, focus-visible rings everywhere, focus-trapped dialogs, keyboard drag-and-drop; see the live `/accessibility` page
- **No secrets in the bundle** — WeatherAPI key lives in a Netlify Function proxy (`/api/weather`)

## Tech Stack

- **Framework**: React 18 + Vite · React Router v6
- **Styling**: Tailwind CSS + CSS-variable design tokens (light/dark)
- **Motion**: Framer Motion (UI) · GSAP ScrollTrigger (scroll story) · View Transitions API (routes) · Lenis (smooth scroll)
- **Data**: TanStack Query · Netlify Functions · WeatherAPI, Nominatim/OSM, Wikipedia/Wikimedia, OpenTripMap
- **UI correctness**: Radix Dialog · dnd-kit · Chart.js · Leaflet
- **Quality**: Vitest + Testing Library + MSW · Playwright E2E · Storybook · ESLint/Prettier/Husky

## Getting Started

```bash
npm install
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

- `WEATHERAPI_KEY` — **server-side secret**, set it in Netlify (Site settings → Environment variables). Used by the `netlify/functions/weather.mts` proxy so the key never ships to the browser.
- `VITE_OPENTRIPMAP_API_KEY` — public free-tier key for "things to do nearby".
- `VITE_WEATHERAPI_KEY` — optional, **local dev only**: lets plain `vite dev` call WeatherAPI directly without running `netlify dev`. Anything prefixed `VITE_` is bundled into public JS — never put a production secret here.

### Development

```bash
npm run dev          # Vite dev server → http://localhost:3000
netlify dev          # optional: also serves the weather proxy at /api/weather
```

### Quality gates

```bash
npm run build        # typecheck + production build
npm run lint         # ESLint
npm run test:run     # Vitest unit/component tests
npm run test:e2e     # Playwright main-flow E2E (builds on npm run preview)
npm run storybook    # component workshop → http://localhost:6006
```

## Project Structure

```
netlify/functions/    # weather.mts — WeatherAPI proxy (key stays server-side)
e2e/                  # Playwright specs
src/
├── components/
│   ├── ui/           # Button, Card, Chip, Dialog, Input, Skeleton, Progress… (+ stories)
│   └── layout/       # PageSection
├── features/
│   ├── home/         # CinematicHero, DestinationRail, ScrollStory, FinalCTA
│   ├── itinerary/    # split planner + synced Leaflet map
│   ├── packing/      # templates, weather chips, progress ring (localStorage-persisted)
│   ├── suggestions/  # cached search, compare sheet
│   ├── budget/       # dashboard layout, Chart.js
│   ├── weather/      # TanStack Query + proxy client
│   ├── destination/  # editorial detail page, shared-element hero
│   └── pages/        # editorial static pages (StaticPage shell)
├── motion/           # MotionProvider, view transitions, recipes, GSAP hooks
├── lib/api/          # rate-limited cached clients (Nominatim, Wikimedia, OpenTripMap, weather)
├── theme/            # tokens.css, motion.css, view-transitions.css, reduced-motion.css
└── contexts/         # ThemeContext
```

## Motion architecture

One engine per layer, never two on the same element:

| Layer | Engine |
| --- | --- |
| Route navigation | View Transitions API (+ Motion enter fallback) |
| UI state (hover, lists, modals, layout) | Framer Motion |
| Scroll storytelling (home only) | GSAP ScrollTrigger + MotionPath |
| Smooth scroll | Lenis (disabled under reduced motion) |

Reduced motion (OS setting or the in-app toggle) disables parallax, pinning, autoplay, and view-transition animation globally — content stays fully usable.
