/**
 * Motion Recipes — Framer Motion variants (MOTION-SPEC)
 * Reusable animation patterns for motion components.
 */

/* Token values (match tokens.css) */
const DURATION_MICRO = 0.15;
const DURATION_UI = 0.28;
const DURATION_PAGE = 0.5;
const MOVE_SM = 8;
const MOVE_MD = 16;
const MOVE_LG = 24;
const SCALE_HOVER = 1.02;
const SCALE_PRESS = 0.98;
const EASE_STANDARD = [0.45, 0, 0.55, 1] as const;
const EASE_EMPHASIZED = [0.16, 1, 0.3, 1] as const;
const EASE_EXIT = [0.4, 0, 1, 1] as const;

export const motionTokens = {
  duration: { micro: DURATION_MICRO, ui: DURATION_UI, page: DURATION_PAGE },
  move: { sm: MOVE_SM, md: MOVE_MD, lg: MOVE_LG },
  scale: { hover: SCALE_HOVER, press: SCALE_PRESS },
  ease: { standard: EASE_STANDARD, emphasized: EASE_EMPHASIZED, exit: EASE_EXIT },
} as const;

/* ─── Entry ─── */
export const fadeUp = {
  initial: { opacity: 0, y: MOVE_MD },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION_UI, ease: EASE_EMPHASIZED },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION_UI, ease: EASE_STANDARD },
};

export const staggerIn = (delayChildren = 0.06) => ({
  initial: {},
  animate: {
    transition: { staggerChildren: delayChildren, delayChildren: 0 },
  },
});

export const staggerItem = {
  initial: { opacity: 0, y: MOVE_MD },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION_UI, ease: EASE_EMPHASIZED },
};

/* ─── Interaction ─── */
export const liftHover = {
  whileHover: { y: -MOVE_SM, transition: { duration: DURATION_MICRO, ease: EASE_STANDARD } },
  whileTap: { scale: SCALE_PRESS, transition: { duration: DURATION_MICRO } },
};

export const pressTap = {
  whileTap: { scale: SCALE_PRESS, transition: { duration: DURATION_MICRO } },
};

export const scaleHover = {
  whileHover: { scale: SCALE_HOVER, transition: { duration: DURATION_MICRO } },
  whileTap: { scale: SCALE_PRESS, transition: { duration: DURATION_MICRO } },
};

/* ─── Layout ─── */
export const layoutMorph = {
  layout: true,
  transition: { duration: DURATION_UI, ease: EASE_STANDARD },
};

export const listReorder = {
  layout: true,
  transition: { duration: DURATION_UI, ease: EASE_STANDARD },
};

/* List item add/remove (use with AnimatePresence) */
export const listItemAddRemove = {
  initial: { opacity: 0, y: -MOVE_SM },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: DURATION_UI, ease: EASE_STANDARD },
  layout: true,
};

/* ─── Overlays ─── */
export const modalIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: DURATION_UI, ease: EASE_EMPHASIZED },
};

export const drawerSlide = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { duration: DURATION_UI, ease: EASE_EMPHASIZED },
};

export const backdropFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: DURATION_UI, ease: EASE_STANDARD },
};

/* ─── Feedback ─── */
export const successPop = {
  animate: {
    scale: [1, 1.08, 1],
    transition: { duration: DURATION_MICRO, ease: EASE_EMPHASIZED },
  },
};

export const errorShake = {
  animate: {
    x: [0, -6, 6, -4, 4, 0],
    transition: { duration: DURATION_UI, ease: EASE_STANDARD },
  },
};

export const toastSlide = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '100%' },
  transition: { duration: DURATION_UI, ease: EASE_EMPHASIZED },
};

export const toastSlideTop = {
  initial: { opacity: 0, y: '-100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-100%' },
  transition: { duration: DURATION_UI, ease: EASE_EMPHASIZED },
};

/* ─── Viewport (scroll-triggered) ─── */
export const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: MOVE_MD },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-24px' },
  transition: { duration: DURATION_UI, ease: EASE_EMPHASIZED, delay },
});
