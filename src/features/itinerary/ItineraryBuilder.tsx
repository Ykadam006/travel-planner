import { useState, useRef, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';
import { Card, EmptyState } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { listItemAddRemove } from '@/motion';
import { ItineraryMap } from './ItineraryMap';
import { useDebounce } from '@/hooks/useDebounce';
import { searchPlaces, type NominatimResult } from '@/lib/api';

interface ItineraryItem {
  id: string;
  activity: string;
  date: string;
  time?: string;
  notes?: string;
  image?: string;
  address?: string;
  lat?: number;
  lon?: number;
}

const predefinedItineraries: ItineraryItem[] = [
  {
    id: 'eiffel',
    activity: 'Eiffel Tower Visit',
    date: '2024-12-01',
    time: '09:00',
    image:
      'https://images.unsplash.com/photo-1492136344046-866c85e0bf04?q=80&w=2964&auto=format&fit=crop',
    address: 'Champ de Mars, Paris, France',
    lat: 48.8584,
    lon: 2.2945,
  },
  {
    id: 'louvre',
    activity: 'Louvre Museum Tour',
    date: '2024-12-02',
    time: '14:00',
    image:
      'https://images.unsplash.com/photo-1639756152470-23cc9e7598b3?q=80&w=2970&auto=format&fit=crop',
    address: 'Rue de Rivoli, Paris, France',
    lat: 48.8606,
    lon: 2.3376,
  },
  {
    id: 'taj',
    activity: 'Taj Mahal Sunrise',
    date: '2024-12-05',
    time: '06:00',
    image:
      'https://images.unsplash.com/photo-1684235423897-4e630a4f1e52?q=80&w=2970&auto=format&fit=crop',
    address: 'Agra, Uttar Pradesh, India',
    lat: 27.1751,
    lon: 78.0421,
  },
  {
    id: 'santorini',
    activity: 'Santorini Sunset',
    date: '2024-12-10',
    time: '17:00',
    image:
      'https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?q=80&w=2970&auto=format&fit=crop',
    address: 'Santorini, Greece',
    lat: 36.3932,
    lon: 25.4615,
  },
  {
    id: 'lights',
    activity: 'Northern Lights Viewing',
    date: '2024-12-15',
    time: '22:00',
    image:
      'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?q=80&w=2970&auto=format&fit=crop',
    address: 'Tromsø, Norway',
    lat: 69.6492,
    lon: 18.9553,
  },
];

function groupByDate(items: ItineraryItem[]): Map<string, ItineraryItem[]> {
  const map = new Map<string, ItineraryItem[]>();
  items.forEach((item) => {
    const list = map.get(item.date) ?? [];
    list.push(item);
    map.set(item.date, list);
  });
  map.forEach((list) => list.sort((a, b) => (a.time ?? '').localeCompare(b.time ?? '')));
  return map;
}

function SortableActivityItem({
  item,
  onRemove,
  onEdit,
}: {
  item: ItineraryItem;
  onRemove: () => void;
  onEdit: (activity: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.activity);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(editValue.trim());
      setEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 400);
    }
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      {...listItemAddRemove}
      layout
      className={`flex flex-col overflow-hidden rounded-lg border border-theme-border bg-theme-surface shadow-sm ${
        isDragging ? 'z-50 shadow-xl ring-2 ring-primary-300' : ''
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none rounded p-1 text-theme-text-muted hover:bg-theme-surface-subtle active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <span className="text-lg">⋮⋮</span>
          </button>
          {editing ? (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
              className="rounded border border-primary-300 px-2 py-1 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          ) : (
            <motion.span
              onClick={() => setEditing(true)}
              animate={saveSuccess ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.2 }}
              className={`cursor-text rounded px-1 py-0.5 hover:bg-theme-surface-subtle ${saveSuccess ? 'ring-2 ring-emerald-400 ring-offset-1' : ''}`}
            >
              {item.activity}
            </motion.span>
          )}
          {editing && (
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {item.time && <span className="text-sm text-theme-text-muted">{item.time}</span>}
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded p-1 text-theme-text-muted hover:bg-theme-surface-subtle"
            aria-expanded={expanded}
          >
            {expanded ? '−' : '+'}
          </button>
          <Button variant="destructive" size="sm" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-theme-border"
          >
            <div className="space-y-2 p-4">
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="text-sm text-theme-text-muted"
              >
                Date: {item.date}
                {item.time && ` • ${item.time}`}
              </motion.p>
              {item.address && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 }}
                  className="flex items-start gap-1.5 text-sm text-theme-text-muted"
                >
                  <span className="mt-0.5 shrink-0 text-theme-text-muted" aria-hidden>
                    📍
                  </span>
                  {item.address}
                </motion.p>
              )}
              {item.notes && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm text-theme-text-muted"
                >
                  {item.notes}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function getPlaceName(r: NominatimResult): string {
  return (
    (r as NominatimResult & { name?: string }).name ??
    r.display_name.split(',')[0]?.trim() ??
    r.display_name
  );
}

let activityIdCounter = 0;
function nextActivityId() {
  return `act-${++activityIdCounter}`;
}

export function ItineraryBuilder() {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [activity, setActivity] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [, setTimelineBuilt] = useState(false);
  const prevDayRef = useRef<string | null>(null);
  const [dayDirection, setDayDirection] = useState(0); // -1 left, 1 right
  const [showPlanMyDay, setShowPlanMyDay] = useState(true);

  const debouncedSearch = useDebounce(searchQuery.trim(), 400);

  const days = Array.from(new Set(itinerary.map((i) => i.date))).sort();
  const grouped = groupByDate(itinerary);
  const currentDayItems = selectedDay ? (grouped.get(selectedDay) ?? []) : itinerary;

  useEffect(() => {
    if (!debouncedSearch || debouncedSearch.length < 2) {
      queueMicrotask(() => setSearchResults([]));
      return;
    }
    queueMicrotask(() => setSearching(true));
    searchPlaces(debouncedSearch, 6)
      .then(setSearchResults)
      .catch(() => setSearchResults([]))
      .finally(() => setSearching(false));
  }, [debouncedSearch]);

  const handleSelectResult = (r: NominatimResult) => {
    const name = getPlaceName(r);
    const newItem: ItineraryItem = {
      id: nextActivityId(),
      activity: name,
      date: date || new Date().toISOString().slice(0, 10),
      time: time || undefined,
      address: r.display_name,
      lat: parseFloat(r.lat),
      lon: parseFloat(r.lon),
    };
    setItinerary(
      [...itinerary, newItem].sort(
        (a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? '')
      )
    );
    setSearchQuery('');
    setSearchResults([]);
    setActivity('');
    if (!date) setDate(newItem.date);
    if (!selectedDay) setSelectedDay(newItem.date);
  };

  const handleAdd = () => {
    if (activity && date) {
      const newItem: ItineraryItem = {
        id: nextActivityId(),
        activity,
        date,
        time: time || undefined,
      };
      setItinerary(
        [...itinerary, newItem].sort(
          (a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? '')
        )
      );
      setActivity('');
      setDate('');
      setTime('');
      if (!selectedDay) setSelectedDay(date);
    }
  };

  const handleRemove = (id: string) => {
    setItinerary(itinerary.filter((i) => i.id !== id));
  };

  const handleEdit = (id: string, activity: string) => {
    setItinerary(itinerary.map((i) => (i.id === id ? { ...i, activity } : i)));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const ids = currentDayItems.map((i) => i.id);
    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(currentDayItems, oldIndex, newIndex);
    const otherDays = itinerary.filter((i) => !selectedDay || i.date !== selectedDay);
    setItinerary([...otherDays, ...reordered].sort((a, b) => a.date.localeCompare(b.date)));
  };

  const handleAddPredefined = (item: ItineraryItem) => {
    if (!itinerary.some((i) => i.id === item.id)) {
      setItinerary([...itinerary, { ...item }].sort((a, b) => a.date.localeCompare(b.date)));
    }
  };

  const handlePlanMyDay = () => {
    setShowPlanMyDay(false);
    setTimelineBuilt(true);
    const today = new Date().toISOString().slice(0, 10);
    setSelectedDay(today);
    const sample: ItineraryItem[] = [
      { id: 's1', activity: 'Morning coffee', date: today, time: '08:00' },
      { id: 's2', activity: 'Museum visit', date: today, time: '10:00' },
      { id: 's3', activity: 'Lunch break', date: today, time: '13:00' },
      { id: 's4', activity: 'Evening stroll', date: today, time: '18:00' },
    ];
    // Timeline builds in 4 beats: 350ms, 550ms, 750ms, 950ms
    sample.forEach((item, i) => {
      setTimeout(
        () =>
          setItinerary((prev) =>
            [...prev, item].sort((a, b) =>
              (a.date + (a.time ?? '')).localeCompare(b.date + (b.time ?? ''))
            )
          ),
        350 + i * 200
      );
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <PageHero
        title="Plan Your Itinerary"
        subtitle="Add activities and dates, or pick from popular itineraries."
      />

      {/* Plan my day — signature moment */}
      {showPlanMyDay && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Button onClick={handlePlanMyDay} className="recipe-lift-press">
            Plan my day
          </Button>
        </motion.div>
      )}

      {/* Form — Search destination + manual add */}
      <Card variant="outlined" className="mb-8">
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search destination (city, landmark, address…)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
              className="w-full rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-theme-text-main shadow-sm placeholder:text-theme-text-muted focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
            {searching && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-theme-text-muted">
                Searching…
              </span>
            )}
            {searchFocused && searchResults.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-auto rounded-xl border border-theme-border bg-theme-surface py-2 shadow-lg">
                {searchResults.map((r) => (
                  <li key={r.place_id}>
                    <button
                      type="button"
                      onClick={() => handleSelectResult(r)}
                      className="flex w-full flex-col gap-0.5 px-4 py-2.5 text-left hover:bg-primary-50"
                    >
                      <span className="font-medium text-theme-text-main">{getPlaceName(r)}</span>
                      <span className="truncate text-xs text-theme-text-muted">
                        {r.display_name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-theme-border bg-theme-surface px-4 py-2.5 text-theme-text-main focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-200"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded-lg border border-theme-border bg-theme-surface px-4 py-2.5 text-theme-text-main focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-200"
            />
            <span className="hidden text-theme-text-muted sm:inline">or</span>
            <input
              type="text"
              placeholder="Add custom activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="flex-1 min-w-[160px] rounded-lg border border-theme-border bg-theme-surface px-4 py-2.5 text-theme-text-main focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-200"
            />
            <Button onClick={handleAdd} data-testid="add-activity-btn">
              Add Activity
            </Button>
          </div>
        </div>
      </Card>

      {/* Day tabs */}
      {days.length > 0 && (
        <div className="mb-6 flex gap-2 overflow-x-auto">
          <button
            onClick={() => {
              if (selectedDay) {
                const idx = days.indexOf(selectedDay);
                setDayDirection(idx >= 0 ? -1 : 0);
              }
              prevDayRef.current = null;
              setSelectedDay(null);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              !selectedDay
                ? 'bg-accent-100 text-accent-700'
                : 'bg-theme-surface-subtle text-theme-text-muted hover:bg-theme-surface'
            }`}
          >
            All
          </button>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => {
                const oldIdx = prevDayRef.current ? days.indexOf(prevDayRef.current) : -1;
                const newIdx = days.indexOf(day);
                setDayDirection(newIdx > oldIdx ? 1 : newIdx < oldIdx ? -1 : 0);
                prevDayRef.current = day;
                setSelectedDay(day);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedDay === day
                  ? 'bg-accent-100 text-accent-700'
                  : 'bg-theme-surface-subtle text-theme-text-muted hover:bg-theme-surface'
              }`}
            >
              {day}
            </button>
          ))}
          <Button size="sm" variant="outline" onClick={() => setMapOpen(true)}>
            Map
          </Button>
        </div>
      )}

      {/* Custom itinerary */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-theme-text-main">Your Itinerary</h2>
        {itinerary.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No activities yet"
            description="Add activities manually, use Plan my day, or pick from popular itineraries below."
          />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currentDayItems.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence mode="wait">
                <motion.ul
                  key={selectedDay ?? 'all'}
                  initial={{ opacity: 0.6, x: dayDirection * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0.6, x: -dayDirection * 40 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="space-y-2"
                >
                  <AnimatePresence mode="popLayout">
                    {currentDayItems.map((item) => (
                      <SortableActivityItem
                        key={item.id}
                        item={item}
                        onRemove={() => handleRemove(item.id)}
                        onEdit={(act) => handleEdit(item.id, act)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </AnimatePresence>
            </SortableContext>
          </DndContext>
        )}
      </section>

      {/* Map panel */}
      <AnimatePresence>
        {mapOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMapOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-theme-border bg-theme-surface shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-theme-border p-4">
                <h3 className="font-semibold text-theme-text-main">Map</h3>
                <Button variant="outline" size="sm" onClick={() => setMapOpen(false)}>
                  Close
                </Button>
              </div>
              <div className="h-[calc(100%-60px)]">
                <ItineraryMap
                  items={currentDayItems.map((i) => ({
                    id: i.id,
                    activity: i.activity,
                    date: i.date,
                    time: i.time,
                    lat: i.lat,
                    lon: i.lon,
                  }))}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Popular Itineraries */}
      <section className="mt-16">
        <h2 className="mb-2 text-2xl font-semibold text-theme-text-main">Popular Itineraries</h2>
        <p className="mb-8 text-theme-text-muted">One tap to add iconic experiences to your trip</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {predefinedItineraries.map((item, idx) => {
            const isSelected = itinerary.some((i) => i.id === item.id);
            return (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.3 }}
                onClick={() => handleAddPredefined(item)}
                className={`group relative overflow-hidden rounded-2xl border-2 text-left shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  isSelected
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-theme-border hover:border-primary-300'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.activity}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-semibold text-white drop-shadow-sm">
                      {item.activity}
                    </h3>
                    {item.address && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-white/90">
                        <span aria-hidden>📍</span>
                        {item.address}
                      </p>
                    )}
                  </div>
                  {isSelected && (
                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg">
                      ✓
                    </div>
                  )}
                </div>
                <div className="bg-theme-surface px-5 py-4">
                  <p className="text-sm font-medium text-theme-text-muted">
                    {item.date}
                    {item.time && ` · ${item.time}`}
                  </p>
                  <p className="mt-1 text-xs text-theme-text-muted">
                    {isSelected ? 'Added to itinerary' : 'Click to add'}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Attribution — Map data sources */}
      <p className="mt-10 text-center text-xs text-theme-text-muted">
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
  );
}
