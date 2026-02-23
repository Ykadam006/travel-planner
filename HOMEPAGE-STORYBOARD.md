# HomePage Motion Storyboard

The HomePage is the **motion showroom** — every technique in one place.

## Above-the-Fold (No Scroll Required)

| Element | Implementation |
|---------|----------------|
| **Background drift** | Gradient animation (25s) on hero background |
| **Noise layer** | `NoiseLayer` — SVG fractal noise overlay |
| **Hero text reveal** | Staggered fade-up (headline → subcopy → CTA) |
| **Floating travel tags** | `FloatingTags` — Tokyo, Bali, Paris, etc. with gentle loop |
| **Magnetic CTA** | `MagneticCTA` — button follows cursor when nearby |
| **Press feedback** | `recipe-lift-press` on CTA |
| **Preview cards** | `CursorParallaxCard` — subtle 3D tilt on hover |

## Scroll Narrative (Apple Style)

6 pinned scenes via `ScrollNarrative` + GSAP ScrollTrigger:

| Scene | Content | Animation |
|-------|---------|-----------|
| **1. Discover** | Destination cards | Cards assemble (stagger fade-up) |
| **2. Itinerary** | Timeline bars | Timeline forms (scaleX 0→1) |
| **3. Budget** | Bar chart | Bars draw up (height 0→value) |
| **4. Packing** | List items | List auto-generates (stagger slide-in) |
| **5. Weather** | Forecast cards | Cards scale in |
| **6. CTA** | Plan your trip button | Calm final frame |

Each scene pins while in view; content animates on enter.

## Signature Moment

**Image-sequence scrub** — Scroll progress scrubs through hero images. One "hero transformation" section between above-fold and scroll narrative.

## Layout Order

1. Hero (full viewport) — drift, noise, text, tags, magnetic CTA
2. Preview cards (overlapping hero) — cursor parallax
3. Image-sequence scrub
4. Scroll narrative (6 scenes)
5. Services grid
