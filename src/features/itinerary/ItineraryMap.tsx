import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { searchPlaces } from '@/lib/api';

// Fix default marker icons in react-leaflet (webpack/vite)
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/* Selected marker — brand-colored pin, slightly larger */
const selectedIcon = L.divIcon({
  className: '',
  html: `<svg viewBox="0 0 24 24" width="34" height="34" style="filter: drop-shadow(0 2px 4px rgb(0 0 0 / 0.4))"><path fill="#0b5fff" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
  iconSize: [34, 34],
  iconAnchor: [17, 32],
});

export interface MapItem {
  id: string;
  activity: string;
  date: string;
  time?: string;
  /** When present, skip geocoding and use directly */
  lat?: number;
  lon?: number;
}

interface GeocodedItem extends MapItem {
  lat: number;
  lon: number;
}

const DEFAULT_CENTER: [number, number] = [48.8566, 2.3522]; // Paris
const DEFAULT_ZOOM = 4;

function extractPlaceQuery(activity: string): string {
  // Strip common suffixes like "Visit", "Tour", "Viewing" for better geocoding
  const cleaned = activity
    .replace(/\s+(Visit|Tour|Viewing|Sunrise|Sunset|Break|Stroll)$/i, '')
    .trim();
  return cleaned || activity;
}

async function geocodeItems(items: MapItem[]): Promise<GeocodedItem[]> {
  const results: GeocodedItem[] = [];
  for (const item of items) {
    if (item.lat != null && item.lon != null) {
      results.push({ ...item, lat: item.lat, lon: item.lon });
      continue;
    }
    const query = extractPlaceQuery(item.activity);
    if (!query || query.length < 3) continue;
    try {
      const places = await searchPlaces(query, 1);
      const first = places[0];
      if (first) {
        results.push({
          ...item,
          lat: parseFloat(first.lat),
          lon: parseFloat(first.lon),
        });
      }
    } catch {
      // Skip failed geocodes
    }
  }
  return results;
}

function FitBounds({ items }: { items: GeocodedItem[] }) {
  const map = useMap();
  useEffect(() => {
    if (items.length === 0) return;
    const first = items[0];
    if (first && items.length === 1) {
      map.setView([first.lat, first.lon], 14);
      return;
    }
    const bounds = L.latLngBounds(items.map((i) => [i.lat, i.lon] as [number, number]));
    map.fitBounds(bounds, { padding: [24, 24], maxZoom: 12 });
  }, [map, items]);
  return null;
}

/** Flies to the selected activity's marker when selection changes */
function FlyToSelected({ items, selectedId }: { items: GeocodedItem[]; selectedId?: string }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const item = items.find((i) => i.id === selectedId);
    if (!item) return;
    const reduceMotion = document.documentElement.classList.contains('reduce-motion');
    if (reduceMotion) {
      map.setView([item.lat, item.lon], Math.max(map.getZoom(), 13));
    } else {
      map.flyTo([item.lat, item.lon], Math.max(map.getZoom(), 13), { duration: 0.8 });
    }
  }, [map, items, selectedId]);
  return null;
}

interface ItineraryMapProps {
  items: MapItem[];
  /** Currently selected activity — its marker is highlighted and flown to */
  selectedId?: string;
  /** Marker click → select the matching activity card */
  onSelect?: (id: string) => void;
}

export function ItineraryMap({ items, selectedId, onSelect }: ItineraryMapProps) {
  const [geocoded, setGeocoded] = useState<GeocodedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const markerRefs = useRef(new Map<string, L.Marker>());

  const itemsKey = items.map((i) => `${i.id}:${i.activity}`).join(',');
  useEffect(() => {
    if (items.length === 0) {
      queueMicrotask(() => {
        setGeocoded([]);
        setLoading(false);
      });
      return;
    }
    queueMicrotask(() => setLoading(true));
    geocodeItems(items)
      .then(setGeocoded)
      .finally(() => setLoading(false));
  }, [itemsKey, items]);

  // Open the selected marker's popup
  useEffect(() => {
    if (!selectedId) return;
    const marker = markerRefs.current.get(selectedId);
    marker?.openPopup();
  }, [selectedId, geocoded]);

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-theme-surface-subtle/90">
          <span className="text-sm text-theme-text-muted">Geocoding activities…</span>
        </div>
      )}
      <MapContainer
        center={
          geocoded.length > 0 && geocoded[0] ? [geocoded[0].lat, geocoded[0].lon] : DEFAULT_CENTER
        }
        zoom={geocoded.length > 0 ? 12 : DEFAULT_ZOOM}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geocoded.length > 0 && <FitBounds items={geocoded} />}
        <FlyToSelected items={geocoded} selectedId={selectedId} />
        {geocoded.map((item) => (
          <Marker
            key={item.id}
            position={[item.lat, item.lon]}
            icon={item.id === selectedId ? selectedIcon : icon}
            ref={(m) => {
              if (m) markerRefs.current.set(item.id, m);
              else markerRefs.current.delete(item.id);
            }}
            eventHandlers={{ click: () => onSelect?.(item.id) }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{item.activity}</p>
                <p className="text-theme-text-muted">{item.date}</p>
                {item.time && <p className="text-theme-text-muted">{item.time}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
