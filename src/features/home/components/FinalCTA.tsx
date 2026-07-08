import { motion } from 'framer-motion';
import { MagneticCTA } from '@/components/MagneticCTA';
import { fadeUpInView } from '@/motion';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-ink-950 to-slate-900 py-24 md:py-32">
      {/* Dotted route motif */}
      <svg
        viewBox="0 0 1200 300"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path
          d="M -40 240 C 200 120, 420 260, 640 140 S 1000 60, 1260 120"
          fill="none"
          strokeWidth="2"
          strokeDasharray="1 12"
          strokeLinecap="round"
          className="stroke-white"
        />
      </svg>

      <motion.div className="relative mx-auto max-w-2xl px-4 text-center" {...fadeUpInView()}>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          Start planning your next trip
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/75">
          One place for the route, the bag, the budget, and the forecast.
        </p>
        <div className="mt-10">
          <MagneticCTA
            to="/itinerary-builder"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-ink-900 shadow-floating transition-shadow hover:shadow-glow"
          >
            Plan your trip
            <span aria-hidden>→</span>
          </MagneticCTA>
        </div>
      </motion.div>
    </section>
  );
}
