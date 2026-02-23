import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ViewTransitionLink } from '@/motion';
import {
  enrichDestination,
  getDestinationById,
  type Destination,
  type EnrichedDestination,
} from '@/lib/api';

interface StaticDest {
  name: string;
  image: string;
  description: string;
}

const DESTINATIONS: Record<string, StaticDest> = {
  tokyo: {
    name: 'Tokyo',
    image:
      'https://images.unsplash.com/photo-1715837484239-9e9b191a6bb6?q=80&w=3135&auto=format&fit=crop',
    description: 'Explore vibrant culture and cuisine. Immerse yourself in the heart of Japan!',
  },
  bali: {
    image:
      'https://images.unsplash.com/photo-1536152470836-b943b246224c?q=80&w=3000&auto=format&fit=crop',
    name: 'Bali',
    description:
      'A tropical paradise waiting for you. Unwind on stunning beaches and explore lush landscapes!',
  },
  dubai: {
    name: 'Dubai',
    image:
      'https://images.unsplash.com/photo-1509821361533-422c91a204f0?q=80&w=3087&auto=format&fit=crop',
    description:
      'Luxury, adventure, and unforgettable experiences. Discover the magic of the desert!',
  },
  paris: {
    name: 'Paris',
    image:
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=3087&auto=format&fit=crop',
    description:
      'The city of love and lights! Stroll along the Seine, enjoy fine dining, and see the Eiffel Tower!',
  },
  'eiffel-tower': {
    name: 'Eiffel Tower',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2973&auto=format&fit=crop',
    description:
      'Iconic iron lattice tower on the Champ de Mars. A symbol of Paris and French culture.',
  },
  'great-wall': {
    name: 'Great Wall of China',
    image:
      'https://images.unsplash.com/photo-1558981012-236ee58eb5c9?q=80&w=2884&auto=format&fit=crop',
    description: 'Ancient fortification spanning thousands of miles. A UNESCO World Heritage site.',
  },
  'machu-picchu': {
    name: 'Machu Picchu',
    image:
      'https://plus.unsplash.com/premium_photo-1694475501155-2f344cea9eb3?q=80&w=2969&auto=format&fit=crop',
    description: 'Inca citadel high in the Andes. One of the New Seven Wonders of the World.',
  },
  'taj-mahal': {
    name: 'Taj Mahal',
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2976&auto=format&fit=crop',
    description: 'White marble mausoleum in Agra. A masterpiece of Mughal architecture.',
  },
  'sydney-opera': {
    name: 'Sydney Opera House',
    image:
      'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?q=80&w=2932&auto=format&fit=crop',
    description: 'Iconic performing arts venue on Bennelong Point. A UNESCO World Heritage site.',
  },
};

interface StateDestination {
  id: string;
  name: string;
  category: string;
  address: string;
  image: string;
  description?: string;
  lat?: number;
  lon?: number;
}

export function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const stateDest = (location.state as { destination?: StateDestination })?.destination;

  const [enriched, setEnriched] = useState<EnrichedDestination | null>(null);
  const [fetchedDest, setFetchedDest] = useState<Destination | null | 'loading'>('loading');

  // Resolve destination: state (from API) > static DESTINATIONS > fetch by ID
  const staticDest = id ? DESTINATIONS[id.toLowerCase()] : null;
  const fromState = stateDest && stateDest.id === id;

  const dest = fromState
    ? {
        name: stateDest.name,
        image:
          stateDest.image ||
          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2973&auto=format&fit=crop',
        description: stateDest.description || `Discover ${stateDest.name}.`,
      }
    : staticDest
      ? staticDest
      : fetchedDest && fetchedDest !== 'loading'
        ? {
            name: fetchedDest.name,
            image: fetchedDest.image,
            description: fetchedDest.description,
          }
        : null;

  const hasCoords = fromState
    ? stateDest?.lat != null && stateDest?.lon != null
    : fetchedDest && fetchedDest !== 'loading';

  // Fetch by ID when no state and no static match (e.g. refresh on API destination)
  useEffect(() => {
    if (id && !fromState && !staticDest) {
      getDestinationById(id)
        .then((d) => setFetchedDest(d ?? null))
        .catch(() => setFetchedDest(null));
    } else {
      setFetchedDest(null);
    }
  }, [id, fromState, staticDest]);

  // Enrich with nearby POIs when we have coordinates
  useEffect(() => {
    if (!hasCoords) return;
    const d = fromState
      ? ({
          id: stateDest!.id,
          name: stateDest!.name,
          displayName: stateDest!.address,
          category: stateDest!.category,
          address: stateDest!.address,
          image: stateDest!.image,
          description: stateDest!.description || '',
          lat: stateDest!.lat!,
          lon: stateDest!.lon!,
          placeId: 0,
        } as Destination)
      : fetchedDest && fetchedDest !== 'loading'
        ? fetchedDest
        : null;
    if (d) enrichDestination(d).then(setEnriched);
  }, [fromState, stateDest, fetchedDest, hasCoords]);

  const isLoading = !fromState && !staticDest && fetchedDest === 'loading';
  const notFound = !dest && !isLoading;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ViewTransitionLink to="/travel-suggestions">Back to suggestions</ViewTransitionLink>
        <p className="mt-4 text-theme-text-muted">Loading destination…</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ViewTransitionLink to="/travel-suggestions">Back to suggestions</ViewTransitionLink>
        <p className="mt-4 text-theme-text-muted">
          Destination not found. Try searching from Travel Suggestions.
        </p>
      </div>
    );
  }

  const displayDest = dest!;
  const imageTransitionName = `dest-image-${id}`;
  const titleTransitionName = `dest-title-${id}`;
  const nearbyPlaces = enriched?.nearbyPlaces ?? [];

  return (
    <div className="min-h-screen">
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={displayDest.image}
          alt={displayDest.name}
          className="h-full w-full object-cover"
          style={{ viewTransitionName: imageTransitionName }}
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-black/50 p-8 md:p-12">
          <h1
            className="text-4xl font-bold text-white md:text-6xl"
            style={{ viewTransitionName: titleTransitionName }}
          >
            {displayDest.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">{displayDest.description}</p>
          <ViewTransitionLink
            to="/travel-suggestions"
            className="recipe-lift-press mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-theme-surface px-8 py-3.5 font-medium text-theme-text-main"
          >
            Explore more
            <span aria-hidden>→</span>
          </ViewTransitionLink>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl font-semibold text-theme-text-main">About {displayDest.name}</h2>
          <p className="mt-4 text-theme-text-muted">
            Plan your trip with our itinerary builder, packing list, and budget estimator. Get
            weather forecasts and discover activities tailored to {displayDest.name}.
          </p>
        </motion.div>

        {nearbyPlaces.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold text-theme-text-main">Top things to do nearby</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {nearbyPlaces.map((place, i) => (
                <li
                  key={`${place.name}-${i}`}
                  className="flex items-center gap-3 rounded-lg border border-theme-border bg-theme-surface p-4 shadow-sm"
                >
                  <span className="text-lg" aria-hidden>
                    📍
                  </span>
                  <div>
                    <span className="font-medium text-theme-text-main">{place.name}</span>
                    {place.kinds && (
                      <span className="ml-2 text-sm text-theme-text-muted">
                        ({place.kinds.split(',').slice(0, 2).join(', ')})
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-theme-text-muted">
              POI data from{' '}
              <a
                href="https://opentripmap.io"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                OpenTripMap
              </a>
            </p>
          </motion.div>
        )}
      </section>

      <footer className="border-t border-theme-border py-6">
        <p className="text-center text-xs text-theme-text-muted">
          © {new Date().getFullYear()} OpenStreetMap contributors ·{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            ODbL
          </a>
          {' · '}
          <a
            href="https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_API_Usage_Guidelines"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Wikimedia
          </a>
        </p>
      </footer>
    </div>
  );
}
