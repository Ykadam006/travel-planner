import { motion } from 'framer-motion';
import { ViewTransitionLink, staggerIn, staggerItem } from '@/motion';
import { CinematicHero } from './components/CinematicHero';
import { DestinationRail } from './components/DestinationRail';
import { ScrollStory } from './components/ScrollStory';
import { FinalCTA } from './components/FinalCTA';
import { SERVICES } from './data';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <CinematicHero />
      <DestinationRail />
      <ScrollStory />

      {/* Quick access to every tool — clarity after the story */}
      <section className="bg-theme-surface-subtle py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-8 font-display text-3xl font-bold text-theme-text-main">
            Our Services
          </h2>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            variants={staggerIn(0.05)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
          >
            {SERVICES.map((service) => (
              <motion.div key={service.title} variants={staggerItem}>
                <ViewTransitionLink
                  to={service.path}
                  className="group block h-full rounded-xl border border-theme-border bg-theme-surface p-6 shadow-sm transition-all duration-ui hover:-translate-y-1 hover:border-primary-300 hover:shadow-md"
                >
                  <div className="mb-3 text-3xl">{service.icon}</div>
                  <h3 className="font-semibold text-theme-text-main group-hover:text-primary-600">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-theme-text-muted">{service.description}</p>
                </ViewTransitionLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
