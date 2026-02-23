# Performance + 60fps Blueprint

**Motion doesn't matter if it stutters.** Critical for premium feel.

---

## 1. Prefer transform + opacity

- **GPU-accelerated:** `transform` and `opacity` are composited, avoid layout/paint.
- **Avoid:** `width`, `height`, `margin`, `top`, `left` when animating.
- **Rule:** Use `translate`, `scale`, `rotate` instead of positional properties.

---

## 2. Avoid animating expensive properties continuously

- **Blur:** `backdrop-blur` is expensive. Use for static overlays only; don't animate blur values.
- **Shadow:** `box-shadow` triggers paint. Prefer CSS `transition` for hover (one-time change) over `motion.animate` or keyframes.
- **Filter:** `filter: blur()` — avoid animating continuously.

---

## 3. Lazy-load heavy routes

| Route | Heavy dependency | Status |
|-------|------------------|--------|
| `/` (Home) | GSAP, ScrollTrigger, ImageSequenceScrub | Lazy |
| `/budget-estimator` | Chart.js | Lazy |
| `/itinerary-builder` | @dnd-kit, images | Lazy |
| `/packing-list` | — | Lazy |
| `/travel-suggestions` | — | Lazy |
| `/weather-forecast` | — | Lazy |
| `/destination/:id` | — | Lazy |

All routes use `React.lazy` + `Suspense` with `RoutePageSkeleton` fallback.

---

## 4. Skeletons instead of spinners

- Route loading: `RoutePageSkeleton`
- Weather fetch: `WeatherSkeleton` (skeleton → crossfade)
- No `animate-spin` or loading spinners

---

## 5. Scroll scenes: few high-quality scenes

- `ScrollNarrative`: 6 pinned scenes (Discover, Itinerary, Budget, Packing, Weather, CTA).
- **Rule:** Few high-quality scenes > many noisy ones.
- GSAP ScrollTrigger disabled when reduced motion.

---

## 6. Reduced motion

### Respect OS

- `prefers-reduced-motion: reduce` — CSS reduces all animations to ~0ms.
- `reduced-motion.css` applies to `*`, `*::before`, `*::after`.

### In-app switch

- Navbar toggle (▶/⏸) — `useReducedMotionToggle()`.
- Sets `reduce-motion` class on `<html>`.
- Initial state from `window.matchMedia('(prefers-reduced-motion: reduce)')`.

### When reduced motion is on

- **Lenis:** Disabled (`LenisProvider` returns early).
- **GSAP ScrollTrigger:** Disabled (`ScrollNarrative` skips setup).
- **Lottie:** `LottieAnimation` returns `null`.
- **Ambient:** Float/shimmer still run (CSS) but `animation-duration: 0.01ms` makes them instant.

---

## 7. Checklist

- [x] Transform + opacity for animations
- [x] No continuous blur/shadow animation
- [x] Lazy-load Chart.js route (Budget)
- [x] Lazy-load GSAP route (Home)
- [x] Skeletons for loading states
- [x] Scroll scenes limited (6)
- [x] Reduced motion: OS + in-app toggle
- [x] Lenis disabled when reduced motion
- [x] GSAP disabled when reduced motion
