import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ViewTransitionLink, SharedElementLink, staggerIn, staggerItem } from '@/motion';

const heroImages = [
  'https://images.unsplash.com/photo-1493988577905-2fa4018652be?q=80&w=2971&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495819001850-6c67d73d1b1e?q=80&w=2967&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1499561385668-5ebdb06a79bc?q=80&w=2969&auto=format&fit=crop',
];

const recommendations = [
  {
    image:
      'https://images.unsplash.com/photo-1715837484239-9e9b191a6bb6?q=80&w=3135&auto=format&fit=crop',
    name: 'Tokyo',
    description: 'Explore vibrant culture and cuisine. Immerse yourself in the heart of Japan!',
  },
  {
    image:
      'https://images.unsplash.com/photo-1536152470836-b943b246224c?q=80&w=3000&auto=format&fit=crop',
    name: 'Bali',
    description:
      'A tropical paradise waiting for you. Unwind on stunning beaches and explore lush landscapes!',
  },
  {
    image:
      'https://images.unsplash.com/photo-1509821361533-422c91a204f0?q=80&w=3087&auto=format&fit=crop',
    name: 'Dubai',
    description:
      'Luxury, adventure, and unforgettable experiences. Discover the magic of the desert!',
  },
  {
    image:
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=3087&auto=format&fit=crop',
    name: 'Paris',
    description:
      'The city of love and lights! Stroll along the Seine, enjoy fine dining, and see the Eiffel Tower!',
  },
];

const services = [
  {
    icon: '🗺️',
    title: 'Itinerary Builder',
    description: 'Plan your trip day by day with ease.',
    path: '/itinerary-builder',
  },
  {
    icon: '🧳',
    title: 'Packing List',
    description: 'Get a customized packing list for your destination.',
    path: '/packing-list',
  },
  {
    icon: '🌟',
    title: 'Travel Suggestions',
    description: 'Discover exciting destinations and activities.',
    path: '/travel-suggestions',
  },
  {
    icon: '💰',
    title: 'Budget Estimator',
    description: 'Plan your trip within your budget efficiently.',
    path: '/budget-estimator',
  },
  {
    icon: '☀️',
    title: 'Weather Forecast',
    description: 'Stay updated with destination weather forecasts.',
    path: '/weather-forecast',
  },
];

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ═══ ABOVE FOLD: Hero ═══ */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-ink-950" />
        <img
          src={heroImages[currentSlide]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-700"
        />

        <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
          <motion.div
            className="text-center max-w-2xl"
            variants={staggerIn(0.12)}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              variants={staggerItem}
              className="font-display text-4xl font-bold text-white drop-shadow-lg md:text-6xl"
            >
              Explore the World with Ghumakkad
            </motion.h1>
            <motion.p variants={staggerItem} className="mt-4 text-lg text-white/90">
              Itineraries, packing lists, budgets — all in one place.
            </motion.p>
            <motion.div variants={staggerItem} className="mt-8">
              <ViewTransitionLink
                to="/travel-suggestions"
                className="inline-flex items-center gap-2 rounded-full bg-theme-surface px-8 py-3.5 font-medium text-theme-text-main transition-transform hover:scale-105"
              >
                Explore destinations
                <span aria-hidden>→</span>
              </ViewTransitionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="relative -mt-32 z-20 mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-white drop-shadow-lg md:text-3xl">
          Trending Destinations
        </h2>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerIn(0.06)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
        >
          {recommendations.map((rec) => (
            <motion.div key={rec.name} variants={staggerItem}>
              <SharedElementLink
                to={`/destination/${rec.name.toLowerCase()}`}
                imageTransitionName={`dest-image-${rec.name.toLowerCase()}`}
                titleTransitionName={`dest-title-${rec.name.toLowerCase()}`}
                className="block overflow-hidden rounded-xl border border-theme-border bg-theme-surface/95 shadow-xl backdrop-blur transition-shadow hover:shadow-2xl"
              >
                <img
                  data-shared-image
                  src={rec.image}
                  alt={rec.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 data-shared-title className="text-lg font-semibold">
                    {rec.name}
                  </h3>
                  <p className="mt-1 text-sm text-theme-text-muted">{rec.description}</p>
                </div>
              </SharedElementLink>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services */}
      <section className="bg-theme-surface-subtle py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-8 text-3xl font-bold text-theme-text-main">Our Services</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((service) => (
              <ViewTransitionLink
                key={service.title}
                to={service.path}
                className="group block rounded-xl border border-theme-border bg-theme-surface p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
              >
                <div className="mb-3 text-3xl">{service.icon}</div>
                <h3 className="font-semibold text-theme-text-main group-hover:text-primary-600">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm text-theme-text-muted">{service.description}</p>
              </ViewTransitionLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
