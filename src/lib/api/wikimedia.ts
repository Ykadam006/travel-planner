/**
 * Wikimedia REST API — Wikipedia page summary (description + image).
 * Set User-Agent per https://foundation.wikimedia.org/wiki/Policy:User-Agent_policy
 */

import { getCached, setCache } from './cache';

const USER_AGENT = 'Ghumakkad/1.0 (Travel planner; https://github.com/ghumakkad)';

export interface WikipediaSummary {
  title: string;
  extract: string;
  description?: string;
  thumbnail?: { source: string; width: number; height: number };
  coordinates?: { lat: number; lon: number };
}

/**
 * Get Wikipedia page summary by title.
 * @param title - Page title (e.g. "Paris" from extratags wikipedia "en:Paris")
 */
export async function getWikipediaSummary(title: string): Promise<WikipediaSummary | null> {
  const key = title.trim();
  if (!key) return null;

  const cacheKey = `wiki:${key.toLowerCase()}`;
  const cached = getCached<WikipediaSummary>(cacheKey);
  if (cached) return cached;

  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'application/json',
    },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    title?: string;
    extract?: string;
    description?: string;
    thumbnail?: { source: string; width: number; height: number };
    coordinates?: { lat: number; lon: number };
  };

  if (!data.extract && !data.description) return null;

  const summary: WikipediaSummary = {
    title: data.title ?? key,
    extract: data.extract ?? data.description ?? '',
    description: data.description,
    thumbnail: data.thumbnail,
    coordinates: data.coordinates,
  };

  setCache(cacheKey, summary);
  return summary;
}

/**
 * Extract Wikipedia title from Nominatim extratags (e.g. "en:Paris" -> "Paris").
 */
export function parseWikipediaTag(tag: string | undefined): string | null {
  if (!tag) return null;
  const parts = tag.split(':');
  return parts.length >= 2 ? parts.slice(1).join(':') : tag;
}
