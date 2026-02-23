import { describe, it, expect, beforeEach } from 'vitest';
import { getCached, setCache } from './cache';

describe('cache', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null for missing key', () => {
    expect(getCached('missing')).toBeNull();
  });

  it('stores and retrieves data', () => {
    setCache('key1', { foo: 'bar' });
    expect(getCached('key1')).toEqual({ foo: 'bar' });
  });

  it('persists to localStorage', () => {
    setCache('persist', 42);
    expect(localStorage.getItem('ghm_cache_persist')).toBeTruthy();
  });

  it('returns null after TTL expires', () => {
    // Set expired entry directly in localStorage (bypass memory cache)
    const expired = { data: 'value', ts: Date.now() - 25 * 60 * 60 * 1000 };
    localStorage.setItem('ghm_cache_ttl', JSON.stringify(expired));
    expect(getCached('ttl')).toBeNull();
  });
});
