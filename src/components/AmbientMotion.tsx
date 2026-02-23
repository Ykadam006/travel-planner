'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { useReducedMotion } from '@/motion';

/** Gradient drift — slow, subtle background animation */
export function GradientDrift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className={`relative overflow-hidden ${className ?? ''}`}
      style={
        reduceMotion
          ? undefined
          : {
              background:
                'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-drift 20s ease-in-out infinite alternate',
            }
      }
    >
      {children}
    </div>
  );
}

/** Tiny float on chips/badges — not scroll-triggered */
export function FloatChip({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <span
      className={className}
      style={
        reduceMotion
          ? undefined
          : {
              animation: 'float-chip 4s ease-in-out infinite',
            }
      }
    >
      {children}
    </span>
  );
}

/** Soft parallax on pointer — subtle layer shift */
export function PointerParallax({
  children,
  depth = 0.03,
  className,
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !ref.current) return;

    const el = ref.current;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * depth * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * depth * 100;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [reduceMotion, depth]);

  return (
    <div ref={ref} className={`transition-transform duration-300 ${className ?? ''}`}>
      {children}
    </div>
  );
}
