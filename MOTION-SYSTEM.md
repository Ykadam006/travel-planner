# Ghumakkad Motion System

Apple-style motion: **continuity**, **hierarchy**, **precision**, **restraint**.

See `ARCHITECTURE.md` for motion layer separation and MotionProvider blueprint.
See `MOTION-CHECKLIST.md` for the per-route checklist.

## Stack

| Layer | Tool | Use Case |
|-------|------|----------|
| **A) Page continuity** | View Transitions API + `ViewTransitionLink` | Route changes: crossfade + subtle slide |
| **B) Component + micro-interactions** | Framer Motion | Hover/tap, modals, list reorders, layout transitions |
| **C) Scroll storytelling** | GSAP + ScrollTrigger | Pinned sections, scrub timelines, snap beats |
| **D) Smooth scroll** | Lenis | Buttery scroll feel (respects reduced motion) |
| **E) Illustration motion** | Lottie | Empty states, success states, mini icon animations |

## Usage

### View Transitions (Page continuity)

```tsx
import { ViewTransitionLink, ViewTransitionNavLink } from '@/motion';

<ViewTransitionLink to="/about">About</ViewTransitionLink>
<ViewTransitionNavLink to="/">Home</ViewTransitionNavLink>
```

### Motion (Framer Motion)

```tsx
import { motion, AnimatePresence } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
>
  ...
</motion.div>
```

### GSAP ScrollTrigger

```tsx
import { useScrollTrigger } from '@/motion';

const ref = useScrollTrigger<HTMLDivElement>({
  pin: true,
  start: 'top top',
  scrub: 1,
});
```

### Lottie

```tsx
import { LottieAnimation } from '@/motion';

<LottieAnimation
  src="https://lottie.host/xxx.json"
  loop
  ariaLabel="Loading"
/>
```

### Reduced Motion

- `useReducedMotion()` — returns `true` when user prefers reduced motion
- `useReducedMotionToggle()` — manual toggle (navbar button)
- Lenis, Lottie, and scroll animations respect this automatically

## Design Tokens & Spec

See `MOTION-SPEC.md` and `src/theme/tokens.css`:

- **Micro** 150ms — hover, tap
- **UI** 280ms — menus, modals
- **Page** 500ms — route transitions
- **Easing** — standard, emphasized, exit

## Motion Recipes

**CSS:** `src/theme/recipes.css` — class-based (e.g. `recipe-fade-up`, `recipe-lift-hover`)

**Framer Motion:** `src/motion/recipes.ts` — variants (e.g. `fadeUp`, `staggerIn`, `modalIn`)

| Category | CSS Class | Motion Variant |
|----------|-----------|----------------|
| Entry | `recipe-fade-up`, `recipe-stagger-in` | `fadeUp`, `staggerIn` |
| Interaction | `recipe-lift-hover`, `recipe-press-tap` | `liftHover`, `pressTap` |
| Overlays | `recipe-modal-in`, `recipe-drawer-slide` | `modalIn`, `drawerSlide` |
| Feedback | `recipe-success-pop`, `recipe-error-shake` | `successPop`, `errorShake` |
