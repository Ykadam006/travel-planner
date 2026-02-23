import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './MotionContext';

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Sticky + pinned section — holds while content animates through.
 */
export function PinnedSection({ children, className }: PinnedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !ref.current) return;

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reduceMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
