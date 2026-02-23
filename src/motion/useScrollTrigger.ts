import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './MotionContext';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollTriggerConfig {
  /** Element to pin (default: ref) */
  pin?: boolean;
  /** Start position: "top center" etc */
  start?: string;
  /** End position */
  end?: string;
  /** Scrub: true = scroll-linked, number = smoothness */
  scrub?: boolean | number;
  /** Callback when entering */
  onEnter?: () => void;
  /** Callback when leaving */
  onLeave?: () => void;
}

/**
 * Hook for GSAP ScrollTrigger — pinned sections, scrub timelines.
 * Respects reduced motion.
 */
export function useScrollTrigger<T extends HTMLElement>(config: ScrollTriggerConfig = {}) {
  const ref = useRef<T>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !ref.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: config.start ?? 'top 80%',
        end: config.end,
        scrub: config.scrub,
        pin: config.pin,
        onEnter: config.onEnter,
        onLeaveBack: config.onLeave as () => void,
      });
    }, ref);

    return () => ctx.revert();
  }, [reduceMotion, config.start, config.end, config.scrub, config.pin]);

  return ref;
}
