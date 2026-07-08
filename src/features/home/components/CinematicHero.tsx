import { motion } from 'framer-motion';
import { MagneticCTA } from '@/components/MagneticCTA';
import { useReducedMotion } from '@/motion';
import { HERO_IMAGE } from '../data';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Line reveal — text rises out of an overflow-hidden mask */
function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span
        className="block"
        initial={reducedMotion ? { opacity: 0 } : { y: '110%' }}
        animate={reducedMotion ? { opacity: 1 } : { y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * LCP-friendly cinematic hero: one eagerly-loaded responsive image
 * (no slideshow), one-time entrance choreography, no perpetual motion.
 */
export function CinematicHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink-950">
      {/* Instant-paint gradient behind the image */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-ink-950" />

      <motion.img
        src={`${HERO_IMAGE.base}?q=75&w=1600&auto=format&fit=crop`}
        srcSet={`${HERO_IMAGE.base}?q=75&w=960&auto=format&fit=crop 960w, ${HERO_IMAGE.base}?q=75&w=1600&auto=format&fit=crop 1600w, ${HERO_IMAGE.base}?q=70&w=2400&auto=format&fit=crop 2400w`}
        sizes="100vw"
        alt={HERO_IMAGE.alt}
        {...({ fetchpriority: 'high' } as Record<string, string>)}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 0.65, scale: 1 }}
        transition={{ duration: reducedMotion ? 0.3 : 1.4, ease: EASE }}
      />

      {/* Bottom scrim so the trending rail overlap reads cleanly */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-950/90 to-transparent" />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <motion.p
            className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Your trip, beautifully planned
          </motion.p>

          <h1 className="font-display text-5xl font-bold leading-[1.05] text-white drop-shadow-lg md:text-7xl">
            <LineReveal delay={0.2}>Explore the world</LineReveal>
            <LineReveal delay={0.32}>with Ghumakkad</LineReveal>
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-white/85"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
          >
            Itineraries, packing lists, budgets — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
            className="mt-10"
          >
            <MagneticCTA
              to="/travel-suggestions"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-ink-900 shadow-floating transition-shadow hover:shadow-glow"
            >
              Explore destinations
              <span aria-hidden>→</span>
            </MagneticCTA>
          </motion.div>
        </div>

        {/* Scroll cue */}
        {!reducedMotion && (
          <motion.div
            aria-hidden
            className="absolute bottom-40 left-1/2 -translate-x-1/2 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 1.4, duration: 0.6 },
              y: { delay: 1.4, duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}
