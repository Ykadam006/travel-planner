/**
 * Nominatim (OpenStreetMap) — search & geocoding.
 * Max 1 request/second. User-Agent required. Attribution required.
 * @see https://operations.osmfoundation.org/policies/nominatim/
 */

import { getCached, setCache } from './cache';

const BASE = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'Ghumakkad/1.0 (Travel planner; https://github.com/ghumakkad)';

export interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  type: string;
  class?: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
  extratags?: {
    wikipedia?: string;
    wikidata?: string;
  };
}

let lastRequest = 0;
const MIN_INTERVAL_MS = 1100; // 1 req/s + buffer

async function rateLimit(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequest;
  if (elapsed < MIN_INTERVAL_MS) {
    await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS - elapsed));
  }
  lastRequest = Date.now();
}

export async function searchPlaces(query: string, limit = 8): Promise<NominatimResult[]> {
  const q = query.trim();
  if (!q) return [];

  const cacheKey = `nominatim:${q.toLowerCase()}`;
  const cached = getCached<NominatimResult[]>(cacheKey);
  if (cached) return cached;

  await rateLimit();

  const params = new URLSearchParams({
    q,
    format: 'json',
    addressdetails: '1',
    extratags: '1',
    limit: String(limit),
  });

  const res = await fetch(`${BASE}?${params}`, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'application/json',
    },
  });

  if (!res.ok) return [];

  const data = (await res.json()) as NominatimResult[];
  setCache(cacheKey, data);
  return data;
}
