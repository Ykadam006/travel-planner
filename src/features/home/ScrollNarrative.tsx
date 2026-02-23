import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/motion';
import { ViewTransitionLink } from '@/motion';

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    id: 'discover',
    title: 'Discover',
    subtitle: 'Explore destinations that inspire',
    content: 'cards',
  },
  {
    id: 'itinerary',
    title: 'Itinerary',
    subtitle: 'Plan day by day',
    content: 'timeline',
  },
  {
    id: 'budget',
    title: 'Budget',
    subtitle: 'Track every expense',
    content: 'chart',
  },
  {
    id: 'packing',
    title: 'Packing',
    subtitle: 'Never forget essentials',
    content: 'list',
  },
  {
    id: 'weather',
    title: 'Weather',
    subtitle: 'Stay prepared',
    content: 'forecast',
  },
  {
    id: 'cta',
    title: 'Ready to explore?',
    subtitle: 'Start planning your next adventure',
    content: 'cta',
  },
];

export function ScrollNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const sections = containerRef.current!.querySelectorAll('[data-scene]');
      sections.forEach((section) => {
        // Animate scene content on enter (no pinning — natural scroll flow)
        const cards = section.querySelectorAll('[data-animate="card"]');
        const timeline = section.querySelectorAll('[data-animate="timeline"]');
        const bars = section.querySelectorAll('[data-animate="bar"]');
        const listItems = section.querySelectorAll('[data-animate="list-item"]');
        const weather = section.querySelectorAll('[data-animate="weather"]');

        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: { trigger: section, start: 'top 60%' },
            }
          );
        }
        if (timeline.length) {
          gsap.set(timeline, { transformOrigin: 'left center' });
          gsap.fromTo(
            timeline,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: { trigger: section, start: 'top 60%' },
            }
          );
        }
        if (bars.length) {
          bars.forEach((bar, idx) => {
            const h = (bar as HTMLElement).dataset.height ?? '50';
            gsap.fromTo(
              bar,
              { height: 0 },
              {
                height: `${h}%`,
                duration: 0.5,
                delay: idx * 0.1,
                ease: 'power2.out',
                scrollTrigger: { trigger: section, start: 'top 60%' },
              }
            );
          });
        }
        if (listItems.length) {
          gsap.fromTo(
            listItems,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: { trigger: section, start: 'top 60%' },
            }
          );
        }
        if (weather.length) {
          gsap.fromTo(
            weather,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: { trigger: section, start: 'top 60%' },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={containerRef}>
      {SCENES.map((scene) => (
        <section
          key={scene.id}
          data-scene
          className="flex min-h-[60vh] flex-col items-center justify-center bg-theme-surface-subtle px-4 py-16"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-theme-text-main md:text-4xl">
              {scene.title}
            </h2>
            <p className="mt-2 text-theme-text-muted">{scene.subtitle}</p>

            {scene.content === 'cards' && (
              <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
                {['Tokyo', 'Bali', 'Paris', 'Dubai'].map((name) => (
                  <div
                    key={name}
                    className="rounded-xl border border-theme-border bg-theme-surface p-4 shadow-sm"
                    data-animate="card"
                  >
                    <div className="h-20 rounded-lg bg-theme-surface-subtle" />
                    <p className="mt-2 font-medium">{name}</p>
                  </div>
                ))}
              </div>
            )}

            {scene.content === 'timeline' && (
              <div className="mt-12 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((day, _d) => (
                  <div
                    key={day}
                    className="h-2 flex-1 max-w-12 rounded-full bg-primary-200"
                    data-animate="timeline"
                  />
                ))}
              </div>
            )}

            {scene.content === 'chart' && (
              <div className="mt-12 flex items-end justify-center gap-2 h-32">
                {[60, 80, 45, 90, 70].map((h, idx) => (
                  <div
                    key={idx}
                    className="w-8 rounded-t bg-primary-500"
                    style={{ height: 0 }}
                    data-animate="bar"
                    data-height={h}
                  />
                ))}
              </div>
            )}

            {scene.content === 'list' && (
              <div className="mt-12 space-y-2 text-left">
                {['Sunscreen', 'Passport', 'Camera', 'Chargers'].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-theme-border bg-theme-surface px-4 py-2"
                    data-animate="list-item"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            {scene.content === 'forecast' && (
              <div className="mt-12 flex gap-4 justify-center">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                  <div
                    key={day}
                    className="rounded-xl border border-theme-border bg-theme-surface p-4 text-center"
                    data-animate="weather"
                  >
                    <p className="text-sm font-medium">{day}</p>
                    <p className="text-2xl">☀️</p>
                    <p className="text-sm text-theme-text-muted">24°</p>
                  </div>
                ))}
              </div>
            )}

            {scene.content === 'cta' && (
              <div className="mt-12">
                <ViewTransitionLink
                  to="/itinerary-builder"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-3.5 font-medium text-white recipe-lift-press"
                >
                  Plan your trip
                  <span aria-hidden>→</span>
                </ViewTransitionLink>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
