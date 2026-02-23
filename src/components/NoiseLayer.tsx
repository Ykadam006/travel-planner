import { useReducedMotion } from '@/motion';

/**
 * Subtle noise texture overlay — adds film-grain depth.
 * Respects reduced motion.
 */
export function NoiseLayer() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
