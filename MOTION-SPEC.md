# Ghumakkad Motion Spec

**Non-negotiable rules for premium, consistent motion across the product.**

---

## A) Motion Tokens (Global Rules)

### Duration Tiers

| Tier | Range | Value | Use |
|------|-------|-------|-----|
| **Micro** | 120–180ms | 150ms | Hover, tap, checkbox, toggles |
| **UI** | 220–320ms | 280ms | Modals, drawers, dropdowns, menus |
| **Page** | 420–650ms | 500ms | Route transitions, big layout changes |
| **Narrative** | 500–700ms | 600ms | Scroll scenes, story beats |

### Easing Families (Only 2–3)

| Name | Curve | Use |
|------|-------|-----|
| **Standard** | `cubic-bezier(0.45, 0, 0.55, 1)` | Most UI, lists, cards |
| **Emphasized** | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero moments, entrances, CTAs |
| **Exit** | `cubic-bezier(0.4, 0, 1, 1)` | Dismiss, close, faster out |

### Distances

| Token | Value | Use |
|-------|-------|-----|
| `--move-sm` | 8px | Subtle shifts |
| `--move-md` | 16px | Standard entrances |
| `--move-lg` | 24px | Hero / emphasis |

**Rule:** UI moves stay within 8–24px.

### Scale

| State | Value | Use |
|-------|-------|-----|
| Hover | max 1.02 | Buttons, cards |
| Tap/Press | 0.98 | Active feedback |

### Golden Rule

**Prefer `transform` + `opacity` first.** They’re GPU-accelerated, fast, and smooth. Avoid animating `width`, `height`, or `margin` when possible.

---

## B) Motion Recipes (Reusable Patterns)

Use these named patterns everywhere. No one-off animations.

### Entry
- `fadeUp` — opacity 0→1, translateY(md)→0
- `fadeIn` — opacity 0→1 only
- `staggerIn` — children animate in sequence (50–80ms delay)

### Interaction
- `liftHover` — translateY(-8px), shadow on hover
- `pressTap` — scale(0.98) on active
- `magneticButton` — subtle follow (optional, advanced)

### Layout
- `listReorder` — FLIP-style reorder animation
- `layoutMorph` — smooth layout changes

### Overlays
- `modalIn` — scale 0.96→1, opacity 0→1
- `drawerSlide` — translateX(100%)→0
- `backdropFade` — opacity 0→1

### Data
- `countUp` — number increment animation
- `chartDraw` — chart path/stroke draw-in
- `valueMorph` — value change transition

### Scroll (GSAP)
- `pinScene` — pin element during scroll
- `scrubTimeline` — scroll-linked timeline
- `parallax` — depth-based movement
- `imageSequenceScrub` — scrub through image sequence

### Feedback
- `successPop` — scale pulse on success
- `errorShakeLite` — subtle horizontal shake
- `toastSlide` — slide in from edge

---

## Implementation

- **CSS:** `src/theme/recipes.css` — class-based recipes
- **Framer Motion:** `src/motion/recipes.ts` — `motion` variants
- **GSAP:** `src/motion/useScrollTrigger.ts` — scroll recipes
