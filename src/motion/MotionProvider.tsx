import type { ReactNode } from 'react';
import { MotionProvider as MotionContextProvider } from './MotionContext';
import { LenisProvider } from './LenisProvider';

/**
 * Central Motion Provider — orchestrates all motion layers.
 *
 * Controls:
 * - Reduced motion (OS + in-app toggle)
 * - Route transition mode (subtle vs cinematic)
 * - Scroll engine on/off (Lenis disabled when reduced motion)
 *
 * Layer ownership:
 * - Navigation: View Transitions (route changes)
 * - UI: Motion/Framer (hover, open/close, lists)
 * - Story: GSAP (pinned, scrubbed sequences)
 *
 * Rule: Don't animate the same element in two engines.
 */
export function MotionProvider({
  children,
  defaultRouteMode = 'subtle',
}: {
  children: ReactNode;
  defaultRouteMode?: 'subtle' | 'cinematic';
}) {
  return (
    <MotionContextProvider defaultRouteMode={defaultRouteMode}>
      <LenisProvider>{children}</LenisProvider>
    </MotionContextProvider>
  );
}
