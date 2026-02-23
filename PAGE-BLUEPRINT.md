# Page Motion Checklist

Apply to **every route** to meet "every inch moves" — controlled.

---

## ✅ Checklist (copy per page)

| # | Item | Implementation |
|---|------|----------------|
| 1 | **Route transition** | View Transitions API (`withViewTransitions()`) — automatic |
| 2 | **Hero/heading entrance** | Add `blueprint-hero` to main heading |
| 3 | **Primary CTA micro-interaction** | Add `blueprint-cta` (press, hover, focus ring) |
| 4 | **Section reveal** | Add `ghmSectionReveal` directive to sections |
| 5 | **Card hover states** | Add `blueprint-card-hover` to cards |
| 6 | **Loading motion** | Use `<ghm-skeleton>` (shimmer or pulse) |
| 7 | **Empty state** | Use `<ghm-empty-state>` with optional Lottie `lottieSrc` |
| 8 | **Success + error feedback** | Inject `FeedbackService`, call `.success()` / `.error()` |
| 9 | **Reduced motion** | Automatic via OS `prefers-reduced-motion` + navbar toggle |

---

## Quick reference

### CSS classes
- `blueprint-hero` — hero/heading entrance
- `blueprint-cta` — primary buttons, CTAs
- `blueprint-card-hover` — cards, list items

### Directives
- `ghmSectionReveal` — section reveal on scroll

### Components
- `ghm-skeleton` — loading (shimmer | pulse)
- `ghm-empty-state` — empty lists, add `lottieSrc` for Lottie
- `ghm-feedback-toast` — in app shell (already added)

### Service
- `FeedbackService.success('Done!')` — 2.5s toast
- `FeedbackService.error('Something went wrong')` — 4s toast

### Toggle
- Navbar: ⏸/▶ — reduce motion (persists to localStorage)
