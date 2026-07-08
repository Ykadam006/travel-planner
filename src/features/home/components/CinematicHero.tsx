import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticCTA } from '@/components/MagneticCTA';
import { PointerParallax } from '@/components/AmbientMotion';
import { FloatingTags } from '@/components/FloatingTags';
import { useReducedMotion } from '@/motion';
import { HERO_IMAGE } from '../data';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Word-level masked reveal — each word rises out of its own clip line */
function WordsReveal({
  text,
  baseDelay = 0,
  className,
}: {
  text: string;
  baseDelay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={reducedMotion ? { opacity: 0 } : { y: '110%', rotate: 4 }}
            animate={reducedMotion ? { opacity: 1 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: baseDelay + i * 0.07 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/**
 * Signature hero. Layers, back to front:
 *  1. gradient base (instant paint) → 2. parallax hero image (scroll + cursor)
 *  → 3. aurora light drift → 4. content with word-masked headline.
 * As you scroll away, the image sinks slower than the page while the content
 * lifts and fades — Apple-style depth. Everything is transform/opacity only,
 * and every layer collapses to simple fades under reduced motion.
 */
export function CinematicHero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Image sinks at half scroll speed and grows slightly — depth without jank
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  // Content lifts away faster and fades by 60% scroll
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-ink-950">
      {/* Instant-paint gradient behind the image */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-ink-950" />

      {/* Hero image — scroll parallax outside, cursor drift inside */}
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { y: imageY, scale: imageScale }}
      >
        <PointerParallax depth={0.015} className="h-full w-full">
          <motion.img
            src={`${HERO_IMAGE.base}?q=75&w=1600&auto=format&fit=crop`}
            srcSet={`${HERO_IMAGE.base}?q=75&w=960&auto=format&fit=crop 960w, ${HERO_IMAGE.base}?q=75&w=1600&auto=format&fit=crop 1600w, ${HERO_IMAGE.base}?q=70&w=2400&auto=format&fit=crop 2400w`}
            sizes="100vw"
            alt={HERO_IMAGE.alt}
            {...({ fetchpriority: 'high' } as Record<string, string>)}
            decoding="async"
            className="h-[110%] w-full scale-105 object-cover"
            initial={{ opacity: 0, scale: reducedMotion ? 1.05 : 1.12 }}
            animate={{ opacity: 0.65, scale: 1.05 }}
            transition={{ duration: reducedMotion ? 0.3 : 1.6, ease: EASE }}
          />
        </PointerParallax>
      </motion.div>

      {/* Aurora light drift — pre-blurred radial gradients, transform-only */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="ambient-aurora absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(20,184,166,0.5) 0%, rgba(20,184,166,0) 65%)',
          }}
        />
        <div
          className="ambient-aurora-slow absolute -right-32 top-8 h-[30rem] w-[30rem] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(11,95,255,0.55) 0%, rgba(11,95,255,0) 65%)',
          }}
        />
      </div>

      {/* Bottom scrim so the trending rail overlap reads cleanly */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-950/90 to-transparent" />

      <motion.div
        className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center"
        style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70"
            initial={{ opacity: 0, letterSpacing: reducedMotion ? '0.25em' : '0.45em' }}
            animate={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            Your trip, beautifully planned
          </motion.p>

          <h1 className="font-display text-5xl font-bold leading-[1.05] text-white drop-shadow-lg md:text-7xl">
            <WordsReveal text="Explore the world" baseDelay={0.25} className="block" />
            <WordsReveal text="with Ghumakkad" baseDelay={0.5} className="block" />
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-white/85"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
          >
            Itineraries, packing lists, budgets — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 14, scale: reducedMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1 }}
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

          {/* Drifting destination tags — hidden entirely under reduced motion */}
          <FloatingTags />
        </div>

        {/* Scroll cue — fades the moment you commit to scrolling */}
        {!reducedMotion && (
          <motion.div
            aria-hidden
            className="absolute bottom-40 left-1/2 -translate-x-1/2 text-white/60"
            style={{ opacity: cueOpacity }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{
                opacity: { delay: 1.6, duration: 0.6 },
                y: { delay: 1.6, duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
