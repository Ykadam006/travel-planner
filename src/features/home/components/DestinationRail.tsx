import { motion } from 'framer-motion';
import { SharedElementLink, staggerIn, staggerItem } from '@/motion';
import { TRENDING } from '../data';

/**
 * Trending destination cards — image-led, gradient scrim, shared-element
 * navigation into /destination/:id. Overlaps the hero's bottom edge.
 */
export function DestinationRail() {
  return (
    <section className="relative z-20 mx-auto -mt-36 max-w-7xl px-4 pb-20 md:px-6">
      <h2 className="mb-8 text-center font-display text-2xl font-bold text-white drop-shadow-lg md:text-3xl">
        Trending Destinations
      </h2>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerIn(0.06)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-50px' }}
      >
        {TRENDING.map((rec) => (
          <motion.div key={rec.id} variants={staggerItem}>
            <SharedElementLink
              to={`/destination/${rec.id}`}
              imageTransitionName={`dest-image-${rec.id}`}
              titleTransitionName={`dest-title-${rec.id}`}
              className="group block overflow-hidden rounded-xl border border-theme-border bg-theme-surface shadow-floating transition-shadow duration-ui hover:shadow-glow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  data-shared-image
                  src={rec.image}
                  alt={rec.name}
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                <h3
                  data-shared-title
                  className="absolute bottom-3 left-4 font-display text-xl font-semibold text-white drop-shadow"
                >
                  {rec.name}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-theme-text-muted">{rec.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-transform duration-ui group-hover:translate-x-1">
                  Discover <span aria-hidden>→</span>
                </span>
              </div>
            </SharedElementLink>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
