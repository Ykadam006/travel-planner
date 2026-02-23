import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { SharedElementLink } from '@/motion';
import { CursorParallaxCard } from '@/components/CursorParallaxCard';
import { EmptyState } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { layoutMorph } from '@/motion';
import { useDebounce } from '@/hooks/useDebounce';
import { searchDestinations, type Destination } from '@/lib/api';

interface Suggestion {
  id: string;
  name: string;
  category: string;
  address: string;
  image: string;
  description?: string;
  lat?: number;
  lon?: number;
}

const predefinedSuggestions: Suggestion[] = [
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower',
    category: 'Landmark',
    address: 'Champ de Mars, 5 Avenue Anatole',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2973&auto=format&fit=crop',
  },
  {
    id: 'great-wall',
    name: 'Great Wall of China',
    category: 'Historical Site',
    address: 'Huairou District, Beijing',
    image:
      'https://images.unsplash.com/photo-1558981012-236ee58eb5c9?q=80&w=2884&auto=format&fit=crop',
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    category: 'Ancient City',
    address: 'Machu Picchu, Peru',
    image:
      'https://plus.unsplash.com/premium_photo-1694475501155-2f344cea9eb3?q=80&w=2969&auto=format&fit=crop',
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    category: 'Monument',
    address: 'Agra, India',
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2976&auto=format&fit=crop',
  },
  {
    id: 'sydney-opera',
    name: 'Sydney Opera House',
    category: 'Cultural Landmark',
    address: 'Bennelong Point, Sydney',
    image:
      'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?q=80&w=2932&auto=format&fit=crop',
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(predefinedSuggestions.map((s) => s.category)))];

function toSuggestion(d: Destination): Suggestion {
  return {
    id: d.id,
    name: d.name,
    category: d.category,
    address: d.address,
    image:
      d.image ||
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2973&auto=format&fit=crop',
    description: d.description,
    lat: d.lat,
    lon: d.lon,
  };
}

function MapPin({ animate }: { animate: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="absolute -top-2 left-1/2 h-8 w-8 -translate-x-1/2 text-primary-600 drop-shadow-md"
      initial={{ y: -24, opacity: 0 }}
      animate={animate ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      />
    </motion.svg>
  );
}

function DestinationCard({
  place,
  isSelected,
  onToggleCompare,
  compareMode,
}: {
  place: Suggestion;
  isSelected: boolean;
  onToggleCompare: () => void;
  compareMode: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MapPin animate={hovered} />
      <SharedElementLink
        to={`/destination/${place.id}`}
        imageTransitionName={`dest-image-${place.id}`}
        titleTransitionName={`dest-title-${place.id}`}
        className="block"
        state={{ destination: place }}
      >
        <CursorParallaxCard>
          <motion.article
            layout
            layoutId={isSelected ? `compare-${place.id}` : undefined}
            className={`relative overflow-hidden rounded-xl border bg-theme-surface shadow-lg transition-[box-shadow,border-color] duration-200 ${
              hovered
                ? 'border-primary-300 shadow-primary-200/30 ring-2 ring-primary-200'
                : 'border-theme-border'
            }`}
          >
            <div className="relative overflow-hidden">
              <img
                data-shared-image
                src={place.image}
                alt={place.name}
                className="h-48 w-full object-cover"
              />
              {compareMode && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleCompare();
                  }}
                  className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg shadow-md transition-all ${
                    isSelected
                      ? 'bg-primary-600 text-white ring-2 ring-white'
                      : 'bg-theme-surface/95 text-theme-text-muted hover:bg-theme-surface border border-theme-border'
                  }`}
                  aria-label={isSelected ? 'Remove from compare' : 'Add to compare'}
                >
                  {isSelected ? '✓' : '+'}
                </button>
              )}
            </div>
            <div className="relative overflow-hidden p-4">
              <h3 data-shared-title className="font-semibold text-theme-text-main">
                {place.name}
              </h3>
              <p className="text-sm text-theme-text-muted">{place.category}</p>
              <motion.div
                className="overflow-hidden"
                initial={false}
                animate={{
                  height: hovered ? 'auto' : 0,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.p
                  className="pt-2 text-sm text-theme-text-muted"
                  initial={{ y: 8 }}
                  animate={{ y: hovered ? 0 : 8 }}
                  transition={{ duration: 0.25 }}
                >
                  {place.address}
                </motion.p>
              </motion.div>
            </div>
          </motion.article>
        </CursorParallaxCard>
      </SharedElementLink>
    </motion.div>
  );
}

export function TravelSuggestions() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showCompareFrame, setShowCompareFrame] = useState(false);
  const [searchResults, setSearchResults] = useState<Suggestion[]>([]);
  const [searching, setSearching] = useState(false);

  const debouncedQuery = useDebounce(query, 450);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    searchDestinations(debouncedQuery)
      .then((dests) => setSearchResults(dests.map(toSuggestion)))
      .catch(() => setSearchResults([]))
      .finally(() => setSearching(false));
  }, [debouncedQuery]);

  const useSearchResults = debouncedQuery.trim().length > 0;
  const baseSuggestions = useSearchResults ? searchResults : predefinedSuggestions;

  const filteredSuggestions = baseSuggestions.filter((place) => {
    const matchesQuery = !query || place.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All' || place.category === category;
    const notInCompareFrame = !showCompareFrame || !selectedIds.has(place.id);
    return matchesQuery && matchesCategory && notInCompareFrame;
  });

  const selectedPlaces = baseSuggestions.filter((p) => selectedIds.has(p.id));

  const toggleCompare = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 3) next.add(id);
      return next;
    });
  };

  const openCompareFrame = () => {
    setShowCompareFrame(true);
  };

  const closeCompareFrame = () => {
    setShowCompareFrame(false);
    setSelectedIds(new Set());
  };

  return (
    <LayoutGroup>
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <PageHero
          title="Travel Suggestions"
          subtitle="Search destinations or browse curated picks. Data from OpenStreetMap & Wikipedia."
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for a city or place..."
              data-testid="destination-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-theme-border bg-theme-surface px-4 py-3.5 text-theme-text-main shadow-sm placeholder:text-theme-text-muted focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
            {searching && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-theme-text-muted">
                Searching…
              </span>
            )}
          </div>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-theme-border bg-theme-surface px-4 py-3 shadow-sm transition-colors hover:border-theme-border sm:shrink-0">
            <input
              type="checkbox"
              checked={compareMode}
              onChange={(e) => setCompareMode(e.target.checked)}
              className="h-4 w-4 rounded border-theme-border text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-theme-text-main">Compare destinations</span>
          </label>
          {compareMode && selectedIds.size >= 2 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={openCompareFrame}
              className="rounded-xl bg-primary-600 px-5 py-3 text-sm font-medium text-white shadow-md hover:bg-primary-700 hover:shadow-lg transition-all"
            >
              Compare ({selectedIds.size})
            </motion.button>
          )}
        </div>

        {/* Filter chips — only when not showing search results */}
        {!useSearchResults && (
          <motion.div layout className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                {...layoutMorph}
                onClick={() => setCategory(cat)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-accent-100 text-accent-700 ring-2 ring-accent-200'
                    : 'bg-theme-surface border border-theme-border text-theme-text-muted hover:bg-theme-surface-subtle'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        )}

        {useSearchResults && searchResults.length === 0 && !searching ? (
          <EmptyState
            icon="🔍"
            title="No results found"
            description="Try a different search term or browse curated destinations below."
          />
        ) : filteredSuggestions.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredSuggestions.map((place) => (
                <DestinationCard
                  key={place.id}
                  place={place}
                  isSelected={selectedIds.has(place.id)}
                  onToggleCompare={() => toggleCompare(place.id)}
                  compareMode={compareMode}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : !useSearchResults ? (
          <EmptyState
            icon="🔍"
            title="No suggestions found"
            description="Try a different filter or search for a destination."
          />
        ) : null}

        {/* Attribution */}
        <div className="mt-12 rounded-xl border border-theme-border bg-theme-surface-subtle/80 px-4 py-4 text-center">
          <p className="text-xs text-theme-text-muted">
            © {new Date().getFullYear()} OpenStreetMap contributors ·{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary-600"
            >
              ODbL
            </a>
            {' · '}
            <a
              href="https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_API_Usage_Guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary-600"
            >
              Wikimedia
            </a>
          </p>
        </div>

        {/* Compare frame modal */}
        <AnimatePresence>
          {showCompareFrame && selectedPlaces.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCompareFrame}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-theme-border bg-theme-surface shadow-2xl md:inset-8"
              >
                <div className="flex items-center justify-between border-b border-theme-border p-4">
                  <h3 className="text-lg font-semibold">Compare destinations</h3>
                  <button
                    type="button"
                    onClick={closeCompareFrame}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-theme-text-muted hover:bg-theme-surface-subtle"
                  >
                    Close
                  </button>
                </div>
                <motion.div layout className="flex flex-1 gap-6 overflow-x-auto p-6">
                  {selectedPlaces.map((place) => (
                    <motion.div
                      key={place.id}
                      layout
                      layoutId={`compare-${place.id}`}
                      className="min-w-[280px] shrink-0 overflow-hidden rounded-xl border border-theme-border bg-theme-surface shadow-lg"
                    >
                      <img
                        src={place.image}
                        alt={place.name}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold">{place.name}</h4>
                        <p className="text-sm text-theme-text-muted">{place.category}</p>
                        <p className="mt-1 text-sm text-theme-text-muted">{place.address}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
