/**
 * OpenTripMap — nearby points of interest.
 * Free API key at https://dev.opentripmap.org/
 * Set VITE_OPENTRIPMAP_API_KEY in .env
 */

import { getCached, setCache } from './cache';

const BASE = 'https://api.opentripmap.com/0.1/en/places';
const API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY as string | undefined;

export interface OpenTripMapPlace {
  xid: string;
  name: string;
  rate?: number;
  kinds?: string;
  dist?: number;
}

export async function getNearbyPlaces(
  lat: number,
  lon: number,
  radius = 5000,
  limit = 10
): Promise<OpenTripMapPlace[]> {
  if (!API_KEY) return [];

  const cacheKey = `otm:${lat.toFixed(4)}:${lon.toFixed(4)}`;
  const cached = getCached<OpenTripMapPlace[]>(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    apikey: API_KEY,
    radius: String(radius),
    lon: String(lon),
    lat: String(lat),
    limit: String(limit),
    rate: '2', // minimum rating
  });

  const res = await fetch(`${BASE}/radius?${params}`);

  if (!res.ok) return [];

  const data = (await res.json()) as OpenTripMapPlace[];
  setCache(cacheKey, data);
  return data;
}

export function hasOpenTripMapKey(): boolean {
  return !!API_KEY;
}
