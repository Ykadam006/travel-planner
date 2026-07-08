import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supportsViewTransitions } from './viewTransition';
import { useReducedMotion } from './MotionContext';

/**
 * Route enter animation for browsers without the View Transitions API
 * (Firefox, older Safari). Enter-only — exit animations would fight
 * Suspense-based lazy routes. Where the VT API exists, view-transitions.css
 * owns route continuity and this renders children untouched.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();

  if (supportsViewTransitions() || reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
