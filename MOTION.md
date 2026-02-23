# Motion Design System

> See **PAGE-BLUEPRINT.md** for the per-page checklist.  
> See **MOTION-CATALOG.md** for the full catalog of animation types and implementation status.

**The "secret sauce"** — define tokens before animating anything. Every page is composed from recipes.

---

## A) Motion timing tiers

| Tier       | Duration   | Use case                       |
| ---------- | ---------- | ------------------------------ |
| **Micro**  | 120–180ms  | Hover, tap, instant feedback   |
| **UI**     | 220–320ms  | Open menus, modals, toggles    |
| **Page**   | 350–600ms  | Route transitions              |
| **Narrative** | 400–800ms | Scroll scenes, per-beat transitions |

**Tokens:** `--duration-micro`, `--duration-ui`, `--duration-page`, `--duration-narrative`

---

## B) Easing families (2–3, reuse everywhere)

| Family        | Curve                   | Use case                          |
| ------------- | ----------------------- | --------------------------------- |
| **Standard**  | smooth ease-in-out      | Most UI, lists, cards              |
| **Emphasized**| slower start, crisp end | Hero moments, page transitions    |
| **Exit**      | fast-out                | Closing, dismiss, leave            |

**Tokens:** `--ease-standard`, `--ease-emphasized`, `--ease-exit`

---

## C) Movement rules

- **Distances:** 8px (sm), 16px (md), 24px (lg) — `--move-sm`, `--move-md`, `--move-lg`
- **Scale:** Subtle only — `1.00 → 1.02` (hover) / `0.98` (press) — `--scale-hover`, `--scale-press`
- **Prefer:** opacity + transform (cheap, smooth) over layout-shifting

---

## D) Motion recipes library

### CSS classes (`src/theme/recipes.css`)

| Recipe               | Use case                    |
| -------------------- | --------------------------- |
| `.recipe-fade-up`    | Content enters from below   |
| `.recipe-fade-down`  | Content enters from above   |
| `.recipe-lift-on-hover` | Cards lift on hover      |
| `.recipe-stagger-list-in` | Staggered list children |
| `.recipe-drawer-slide`   | Drawer from right        |
| `.recipe-modal-scale-in` | Modal scale in           |
| `.recipe-parallax-float` | Parallax (GSAP hook)    |

### Angular triggers (`src/app/core/animations`)

| Trigger          | Use case                         |
| ---------------- | -------------------------------- |
| `fadeUp`         | Opacity + translateY(16px)       |
| `fadeDown`       | Opacity + translateY(-16px)      |
| `liftOnHover`    | State: idle ↔ lifted             |
| `staggerListIn`  | Staggered children on :enter      |
| `drawerSlide`    | Slide in/out from right           |
| `modalScaleIn`   | Scale 0.96 → 1 + opacity         |
| `parallaxFloat`  | Fade in; pair with GSAP           |
| `countUp`        | For number counters              |
| `chartDrawIn`    | For charts                        |

### GSAP recipes (Layer C)

- **scrollPinReveal** — pin + scrub via `ghmScrollTrigger` directive
- **imageSequenceScrub** — scroll-driven sequence
- **parallaxFloat** — use `ScrollTrigger` with parallax math

### View Transitions (sharedElementMorph)

Use `view-transition-name` in CSS for element continuity between routes.

---

## Layer stack (reference)

1. **Layer A** — View Transitions API (router)
2. **Layer B** — Angular Animations (recipes above)
3. **Layer C** — GSAP + ScrollTrigger (scroll scenes)
4. **Layer D** — Lottie (vector/illustration)
