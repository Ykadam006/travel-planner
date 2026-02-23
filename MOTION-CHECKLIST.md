# Motion Everywhere Checklist

Apply this checklist to every route for a premium feel.

## ✅ Checklist Items

| Item | Implementation |
|------|----------------|
| **Route transition** | View Transitions via `ViewTransitionLink` (baseline) |
| **Hero entrance** | `PageHero` — headline + subcopy + CTA choreography |
| **Card hover** | `recipe-lift-hover` — lift + subtle shadow |
| **Primary CTA** | `recipe-press-tap` + `recipe-lift-hover` on Button |
| **List add/remove** | `AnimatePresence` + `listItemAddRemove` |
| **List reorder** | `layout` on motion items |
| **Loading** | Skeleton → content crossfade (no spinners) |
| **Empty state** | `EmptyState` with fade-up + optional Lottie |
| **Feedback** | `FeedbackMessage` — success pop, error shake |
| **Reduced motion** | OS + navbar toggle via MotionProvider |

## Per-Route Status

| Route | Hero | Cards | List | Loading | Empty | Feedback |
|-------|------|-------|------|---------|-------|----------|
| Home | ✅ | ✅ | — | — | — | — |
| Itinerary | ✅ | ✅ | ✅ | — | ✅ | — |
| Packing | ✅ | ✅ | ✅ | — | ✅ | — |
| Budget | ✅ | — | ✅ | — | ✅ | — |
| Weather | ✅ | — | — | ✅ | — | ✅ |
| Suggestions | ✅ | ✅ | — | — | ✅ | — |
