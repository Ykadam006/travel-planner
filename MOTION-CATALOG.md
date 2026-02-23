# Motion Catalog — All Animation Types

A full catalog of animation types with **purpose** and **implementation status** in Ghumakkad.

> Use this as a checklist: each type should be added **intentionally** where it serves UX.  
> See `MOTION.md` for tokens; `PAGE-BLUEPRINT.md` for per-page checklist.

---

## 1. Navigation / Continuity

| Type | Purpose | Status | Location |
|------|---------|--------|----------|
| **Route transitions (View Transition)** | Smooth page switches; avoid jarring cuts | ✅ Implemented | `app.config.ts` (`withViewTransitions`), `view-transitions.css` |
| **Shared element morph (card → detail header)** | Element continuity; card “becomes” page header | ✅ Implemented | Home → Travel Suggestions: `view-transition-name: dest-{{ name }}` |
| **Directional transitions (forward/back)** | Direction-aware slide; feels like nav stack | ✅ Implemented | Itinerary: `dayContent` with `dir` (left/right slide) |
| **Tab indicator glide** | Tab underline slides to active tab | 🔲 TODO | Add to Itinerary day tabs or any tabbed UI |

---

## 2. UI State Changes

| Type | Purpose | Status | Location |
|------|---------|--------|----------|
| **Expand/collapse (accordion, panels)** | Smooth height + opacity; no layout jump | ✅ Implemented | Itinerary `timeline-body` (max-height + opacity) |
| **Modal scale + backdrop fade** | Modal feels like it emerges; backdrop dims | ✅ Implemented | `recipe-modal-scale-in`, `modalScaleIn` trigger; FeedbackToast |
| **Tray/drawer slide + body dim** | Slide from right; main content dims | ✅ Implemented | Itinerary map panel; `recipe-drawer-slide` |
| **Toast slide-in + auto-dismiss** | Success/error feedback; non-blocking | ✅ Implemented | `FeedbackToastComponent`, `FeedbackService` |
| **Tooltip fade/scale** | Hover hints; subtle enter | 🔲 TODO | Add `ghmTooltip` directive with fade + scale |
| **Form validation shake (micro)** | Invalid field wobble; gentle error cue | 🔲 TODO | Add `.recipe-shake` or Angular trigger for form errors |

---

## 3. List & Layout Motion

| Type | Purpose | Status | Location |
|------|---------|--------|----------|
| **Staggered list entrance** | Items cascade in; reduces perceived load | ✅ Implemented | Packing `listStagger`; Scroll narrative cards/chart; `staggerListIn` |
| **Reorder animation (FLIP)** | Items move to new position; no instant jump | ✅ Implemented | Itinerary drag-drop placeholders; packing filter |
| **Filter transitions (items move)** | Filtered list animates; not disappear instantly | ✅ Implemented | Packing `filteredItems` + stagger; Travel Suggestions filter |
| **Pagination transitions** | Page flip / fade; avoid hard cut | 🔲 TODO | Add when pagination exists (e.g. search results) |

---

## 4. Scroll Experiences

| Type | Purpose | Status | Location |
|------|---------|--------|----------|
| **Section reveals on approach** | Content fades in as you scroll | ✅ Implemented | `ghmSectionReveal` directive |
| **Pinned storytelling scenes (ScrollTrigger)** | Section pins; content animates while scrolling | ✅ Implemented | Home `ScrollNarrativeComponent` |
| **Parallax layers (slow)** | Background moves slower; depth cue | ✅ Implemented | Hero `parallaxStyle` (cursor-based) |
| **Scroll-scrub image sequence** | Frame tied to scroll; “product rotates” feel | ✅ Implemented | `ImageSequenceComponent` (canvas scrub) |
| **Scroll-snap “beats”** | Sections snap to viewport | 🔲 TODO | Add `scroll-snap-type: y mandatory` to scroll narrative |

---

## 5. Interaction Motion (not scroll)

| Type | Purpose | Status | Location |
|------|---------|--------|----------|
| **Hover lift + shadow (subtle)** | Card lifts; feels touchable | ✅ Implemented | `blueprint-card-hover`, `recipe-lift-on-hover` |
| **Cursor parallax** | Hero elements offset with mouse | ✅ Implemented | Hero `parallaxStyle` |
| **Magnetic buttons** | Button follows cursor within bounds | ✅ Implemented | Hero CTA |
| **Press feedback (scale down + spring back)** | Button “presses” on click | ✅ Implemented | `blueprint-cta`, `motion-press` |
| **Drag lift + drop settle** | Dragged item lifts; bounces on drop | ✅ Implemented | Itinerary `activity-card` (GSAP settle) |

---

## 6. Data / Feedback Motion

| Type | Purpose | Status | Location |
|------|---------|--------|----------|
| **Count-up numbers** | Numbers animate to target; feels alive | ✅ Implemented | Budget `counterUp`; `countUp` trigger |
| **Chart draw / morph** | Chart draws in; scenario switch morphs | ✅ Implemented | Budget Chart.js; Scroll narrative chart segments |
| **Skeleton → content crossfade** | Loading to loaded; no spinner | ✅ Implemented | Weather `contentCrossfade` + `ghm-skeleton` |
| **Success “check” animation (Lottie)** | Checkmark or celebration on success | 🔲 TODO | Add Lottie to `EmptyStateComponent` or success feedback |
| **Error highlight pulse (gentle)** | Invalid field pulses; not harsh | 🔲 TODO | Add `.recipe-error-pulse` for form validation |

---

## 7. Ambient Motion (premium polish)

| Type | Purpose | Status | Location |
|------|---------|--------|----------|
| **Background gradient drift** | Subtle “breathing” gradient | ✅ Implemented | Hero `hero-breathe` keyframes |
| **Tiny floating particles/noise** | Very subtle texture; depth | ✅ Implemented | Hero `hero-noise` (SVG noise overlay) |
| **Slow icon loop (non-distracting)** | Optional icon loop; minimal | 🔲 TODO | Consider for empty state or hero accent |

---

## Quick Implementation Reference

### When to use what

- **Micro (150ms)** — Hover, tap, checkbox, press
- **UI (280ms)** — Modals, drawers, toggles, accordions
- **Page (450ms)** — Route transitions, major layout changes
- **Narrative (500ms+)** — Scroll scenes, fly-in moments

### Where to add missing types

| Missing type | Suggested place |
|--------------|-----------------|
| Tab indicator glide | Itinerary day tabs; any new tabbed UI |
| Tooltip fade/scale | Shared directive `ghmTooltip` |
| Form validation shake | Shared `.recipe-shake` in recipes.css |
| Pagination transitions | When list pagination is added |
| Scroll-snap beats | `scroll-narrative` container |
| Success Lottie | `FeedbackToastComponent` or `EmptyStateComponent` |
| Error highlight pulse | Form validation styling |

---

## File Index

| File | Purpose |
|------|---------|
| `src/theme/tokens.css` | Duration, easing, movement tokens |
| `src/theme/blueprint.css` | Hero, card hover, CTA base styles |
| `src/theme/recipes.css` | Reusable motion recipes |
| `src/theme/view-transitions.css` | Route transition keyframes |
| `src/theme/reduced-motion.css` | `prefers-reduced-motion` overrides |
| `src/app/core/animations/animations.ts` | Angular animation triggers |
| `src/app/core/gsap/scroll-trigger.directive.ts` | GSAP ScrollTrigger wrapper |
| `src/app/shared/section-reveal/` | Intersection-based section reveal |
