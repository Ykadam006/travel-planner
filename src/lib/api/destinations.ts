/**
 * Destination pipeline: Nominatim → Wikimedia → OpenTripMap
 * Combines APIs for search, enrichment, and nearby POIs.
 */

import { searchPlaces, type NominatimResult } from './nominatim';
import { getWikipediaSummary, parseWikipediaTag } from './wikimedia';
import { getNearbyPlaces, hasOpenTripMapKey } from './opentripmap';

export interface Destination {
  id: string;
  name: string;
  displayName: string;
  category: string;
  address: string;
  image: string;
  description: string;
  lat: number;
  lon: number;
  placeId: number;
  wikidataId?: string;
}

export interface EnrichedDestination extends Destination {
  nearbyPlaces?: { name: string; kinds?: string }[];
}

function slugify(name: string, placeId: number): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50);
  return `${base}-${placeId}`.replace(/-+/g, '-');
}

function categoryFromType(type: string, address?: NominatimResult['address']): string {
  const t = type?.toLowerCase() ?? '';
  if (t.includes('city') || t.includes('town') || t.includes('village')) return 'City';
  if (t.includes('attraction') || t.includes('monument') || t.includes('historic'))
    return 'Landmark';
  if (t.includes('natural')) return 'Natural';
  if (t.includes('museum') || t.includes('theatre')) return 'Cultural Landmark';
  return address?.country ?? 'Place';
}

export async function searchDestinations(query: string): Promise<Destination[]> {
  const results = await searchPlaces(query, 8);
  const destinations: Destination[] = [];

  for (const r of results) {
    const wikiTitle = parseWikipediaTag(r.extratags?.wikipedia);
    const summary = wikiTitle ? await getWikipediaSummary(wikiTitle) : null;

    const name =
      (r as NominatimResult & { name?: string }).name ??
      r.display_name.split(',')[0]?.trim() ??
      r.display_name;
    const address = r.display_name;
    const image = summary?.thumbnail?.source ?? '';
    const ext = summary?.extract ?? '';
    const description = ext ? ext.slice(0, 200) + (ext.length > 200 ? '…' : '') : '';

    destinations.push({
      id: slugify(name, r.place_id),
      name,
      displayName: r.display_name,
      category: categoryFromType(r.type, r.address),
      address,
      image,
      description,
      lat: parseFloat(r.lat),
      lon: parseFloat(r.lon),
      placeId: r.place_id,
      wikidataId: r.extratags?.wikidata,
    });
  }

  return destinations;
}

export async function enrichDestination(dest: Destination): Promise<EnrichedDestination> {
  const nearby = hasOpenTripMapKey() ? await getNearbyPlaces(dest.lat, dest.lon, 5000, 8) : [];

  return {
    ...dest,
    nearbyPlaces: nearby.map((p) => ({ name: p.name, kinds: p.kinds })),
  };
}

/**
 * Parse slug like "paris-france-273628672" into { searchTerm, placeId }.
 * Returns null if the slug doesn't end with a numeric place_id.
 */
function parseSlug(slug: string): { searchTerm: string; placeId: number } | null {
  const parts = slug.split('-');
  const last = parts[parts.length - 1];
  const placeId = parseInt(last ?? '', 10);
  if (isNaN(placeId) || String(placeId) !== last) return null;
  const searchTerm = parts.slice(0, -1).join(' ');
  if (!searchTerm.trim()) return null;
  return { searchTerm, placeId };
}

/**
 * Fetch a destination by its slug ID when state is lost (e.g. refresh).
 * Re-searches Nominatim and finds the result with matching place_id.
 */
export async function getDestinationById(slugId: string): Promise<Destination | null> {
  const parsed = parseSlug(slugId);
  if (!parsed) return null;

  const results = await searchPlaces(parsed.searchTerm, 15);
  const r = results.find((x) => x.place_id === parsed.placeId);
  if (!r) return null;

  const wikiTitle = parseWikipediaTag(r.extratags?.wikipedia);
  const summary = wikiTitle ? await getWikipediaSummary(wikiTitle) : null;

  const name =
    (r as NominatimResult & { name?: string }).name ??
    r.display_name.split(',')[0]?.trim() ??
    r.display_name;
  const address = r.display_name;
  const image = summary?.thumbnail?.source ?? '';
  const ext = summary?.extract ?? '';
  const description = ext ? ext.slice(0, 200) + (ext.length > 200 ? '…' : '') : '';

  return {
    id: slugify(name, r.place_id),
    name,
    displayName: r.display_name,
    category: categoryFromType(r.type, r.address),
    address,
    image,
    description,
    lat: parseFloat(r.lat),
    lon: parseFloat(r.lon),
    placeId: r.place_id,
    wikidataId: r.extratags?.wikidata,
  };
}
