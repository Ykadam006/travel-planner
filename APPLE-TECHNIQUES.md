# Apple-Style Techniques ("Wow" Set)

High-end frontend effects implemented across Ghumakkad.

## A) Shared-Element Continuity (Card → Page)

**When you click a destination card:** image + title morph into the destination hero.

- **SharedElementLink** — sets `view-transition-name` on click, navigates with View Transitions API
- **DestinationDetail** — hero uses matching `view-transition-name` for image and title
- **Route:** `/destination/:id` (e.g. `/destination/tokyo`)

Cards: Tokyo, Bali, Dubai, Paris on Home → `/destination/{name}`

## B) Mask & Reveal Transitions

| Component | Use |
|-----------|-----|
| **MaskReveal** | Clip-path reveal for sections (left→right) |
| **TextReveal** | Line-by-line text reveal |
| **ImageReveal** | Image with soft-edge gradient mask |

Used on Home: "Where to next?" section with MaskReveal + TextReveal.

## C) Sticky + Pinned Narrative

**PinnedSection** — GSAP ScrollTrigger pins a block while content stays in view.

- Testimonials section uses `PinnedSection`
- Section holds while user scrolls through

## D) Image-Sequence Scrub

**ImageSequenceScrub** — Scroll progress 0→1 scrubs through image frames.

- Uses hero images as sequence
- Sticky container, frame updates on scroll
- Apple product-page vibe

## E) Ambient Motion (Not Scroll-Triggered)

| Component | Effect |
|-----------|--------|
| **PointerParallax** | Soft layer shift on mouse move |
| **FloatChip** | Tiny vertical float (4s loop) |
| **GradientDrift** | Slow gradient background shift (20s) |

Used on Home hero: PointerParallax on content, FloatChip on CTA button.
