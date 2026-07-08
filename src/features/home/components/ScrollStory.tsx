import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { motion } from 'framer-motion';
import { ViewTransitionLink, useReducedMotion, fadeUpInView } from '@/motion';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface StoryStep {
  id: string;
  icon: string;
  title: string;
  copy: string;
  to: string;
  cta: string;
}

const STEPS: StoryStep[] = [
  {
    id: 'discover',
    icon: '🧭',
    title: 'Discover',
    copy: 'Find places that pull you in — curated picks and live destination search.',
    to: '/travel-suggestions',
    cta: 'Explore ideas',
  },
  {
    id: 'plan',
    icon: '🗺️',
    title: 'Plan',
    copy: 'Shape your days into a timeline — activities, times, and a live map.',
    to: '/itinerary-builder',
    cta: 'Build itinerary',
  },
  {
    id: 'pack',
    icon: '🧳',
    title: 'Pack',
    copy: 'Packing lists tuned to your trip and the weather waiting for you.',
    to: '/packing-list',
    cta: 'Pack smart',
  },
  {
    id: 'budget',
    icon: '💰',
    title: 'Budget',
    copy: 'Know what the trip costs before you go — by category, by style.',
    to: '/budget-estimator',
    cta: 'Estimate costs',
  },
  {
    id: 'go',
    icon: '✈️',
    title: 'Go',
    copy: 'Check the forecast, zip the bag, and take off.',
    to: '/weather-forecast',
    cta: 'Check weather',
  },
];

/** Curved flight route across the stage (viewBox 0 0 1200 600) */
const ROUTE_D = 'M 60 500 C 260 320, 380 560, 560 380 S 820 160, 960 220 S 1120 140, 1150 120';

function StepCard({ step }: { step: StoryStep }) {
  return (
    <div className="max-w-md rounded-2xl border border-theme-border bg-theme-surface/95 p-8 shadow-floating backdrop-blur">
      <span className="text-4xl" aria-hidden>
        {step.icon}
      </span>
      <h3 className="mt-4 font-display text-3xl font-bold text-theme-text-main">{step.title}</h3>
      <p className="mt-2 text-theme-text-muted">{step.copy}</p>
      <ViewTransitionLink
        to={step.to}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
      >
        {step.cta} <span aria-hidden>→</span>
      </ViewTransitionLink>
    </div>
  );
}

/** Static fallback — mobile and reduced motion: simple stacked steps. */
function StaticStory({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 px-4">
        {STEPS.map((step, i) => (
          <motion.div key={step.id} {...fadeUpInView(i * 0.04)} className="w-full">
            <StepCard step={step} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Signature scroll scene — pinned stage (desktop only): a dotted flight route
 * draws itself while a plane rides the path and the five product steps
 * crossfade through. Scrub-linked to scroll; GSAP owns this scene alone.
 */
export function ScrollStory() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !stageRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const stage = stageRef.current!;
      const drawPath = stage.querySelector<SVGPathElement>('[data-route-draw]');
      const plane = stage.querySelector('[data-route-plane]');
      const steps = gsap.utils.toArray<HTMLElement>(stage.querySelectorAll('[data-story-step]'));
      if (!drawPath || !plane || steps.length === 0) return;

      const pathLength = drawPath.getTotalLength();
      gsap.set(drawPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      gsap.set(steps, { autoAlpha: 0, y: 32 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=280%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      const total = STEPS.length;
      tl.to(drawPath, { strokeDashoffset: 0, duration: total }, 0);
      tl.to(
        plane,
        {
          motionPath: { path: drawPath, align: drawPath, alignOrigin: [0.5, 0.5], autoRotate: 45 },
          duration: total,
        },
        0
      );

      steps.forEach((el, i) => {
        tl.to(el, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, i + 0.05);
        if (i < steps.length - 1) {
          tl.to(el, { autoAlpha: 0, y: -24, duration: 0.25, ease: 'power2.in' }, i + 0.72);
        }
      });

      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section aria-label="How Ghumakkad works">
      <div className="pt-20 pb-4 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-theme-text-muted">
          How it works
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-theme-text-main md:text-5xl">
          From daydream to departure
        </h2>
      </div>

      {reducedMotion ? (
        <StaticStory className="py-16" />
      ) : (
        <>
          {/* Mobile: natural scroll, no pinning */}
          <StaticStory className="py-16 md:hidden" />

          {/* Desktop: pinned scrub stage */}
          <div ref={stageRef} className="relative hidden h-screen overflow-hidden md:block">
            <svg
              viewBox="0 0 1200 600"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              {/* Faint dotted guide of the full route */}
              <path
                d={ROUTE_D}
                fill="none"
                strokeWidth="2.5"
                strokeDasharray="1 12"
                strokeLinecap="round"
                className="stroke-theme-border"
              />
              {/* Accent route that draws with scroll */}
              <path
                data-route-draw
                d={ROUTE_D}
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="stroke-primary-500"
              />
              <g data-route-plane>
                <circle r="14" className="fill-primary-600" opacity="0.15" />
                <path
                  d="M -6 0 L 6 0 M 2 -4 L 6 0 L 2 4"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary-600"
                />
              </g>
            </svg>

            <div className="relative flex h-full items-center justify-center">
              {STEPS.map((step) => (
                <div key={step.id} data-story-step className="absolute">
                  <StepCard step={step} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
