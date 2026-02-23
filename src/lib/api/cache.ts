/**
 * In-memory + localStorage cache for API responses.
 * Reduces API calls and respects rate limits (Nominatim 1 req/s).
 */

const MEMORY_CAP = 100;
const STORAGE_PREFIX = 'ghm_cache_';
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry<T> {
  data: T;
  ts: number;
}

const memory = new Map<string, CacheEntry<unknown>>();

function pruneMemory() {
  if (memory.size <= MEMORY_CAP) return;
  const entries = [...memory.entries()].sort((a, b) => a[1].ts - b[1].ts);
  const toDelete = entries.slice(0, memory.size - MEMORY_CAP);
  toDelete.forEach(([k]) => memory.delete(k));
}

export function getCached<T>(key: string): T | null {
  const mem = memory.get(key) as CacheEntry<T> | undefined;
  if (mem && Date.now() - mem.ts < TTL_MS) return mem.data;

  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - parsed.ts > TTL_MS) {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return null;
    }
    memory.set(key, parsed);
    return parsed.data;
  } catch {
    return null;
  }
}

export function setCache<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = { data, ts: Date.now() };
  memory.set(key, entry);
  pruneMemory();
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // quota exceeded, ignore
  }
}
