import { describe, it, expect } from 'vitest';
import {
  generateListWithoutDuplicates,
  calculateProgress,
  DEFAULT_GENERATED_ITEMS,
  type PackingItem,
} from './packing';

describe('packing domain', () => {
  const idFn = (i: number) => `id-${i}`;

  describe('generateListWithoutDuplicates', () => {
    it('adds items that do not exist', () => {
      const existing: PackingItem[] = [];
      const result = generateListWithoutDuplicates(existing, DEFAULT_GENERATED_ITEMS, idFn);
      expect(result).toHaveLength(7);
      expect(result.map((i) => i.name)).toContain('Passport');
    });

    it('skips duplicates (case-insensitive)', () => {
      const existing: PackingItem[] = [
        { id: 'x', name: 'Passport', packed: false, category: 'Documents' },
      ];
      const result = generateListWithoutDuplicates(existing, DEFAULT_GENERATED_ITEMS, idFn);
      expect(result).toHaveLength(7); // 6 new + 1 existing
      expect(result.filter((i) => i.name.toLowerCase() === 'passport')).toHaveLength(1);
    });

    it('sorts by category order', () => {
      const existing: PackingItem[] = [];
      const result = generateListWithoutDuplicates(existing, DEFAULT_GENERATED_ITEMS, idFn);
      const categories = result.map((i) => i.category);
      expect(categories).toEqual([
        'Clothing',
        'Clothing',
        'Toiletries',
        'Toiletries',
        'Electronics',
        'Documents',
        'Accessories',
      ]);
    });
  });

  describe('calculateProgress', () => {
    it('returns 0 for empty list', () => {
      expect(calculateProgress([])).toBe(0);
    });

    it('returns 1 when all packed', () => {
      const items: PackingItem[] = [
        { id: '1', name: 'A', packed: true, category: 'Clothing' },
        { id: '2', name: 'B', packed: true, category: 'Clothing' },
      ];
      expect(calculateProgress(items)).toBe(1);
    });

    it('returns 0.5 when half packed', () => {
      const items: PackingItem[] = [
        { id: '1', name: 'A', packed: true, category: 'Clothing' },
        { id: '2', name: 'B', packed: false, category: 'Clothing' },
      ];
      expect(calculateProgress(items)).toBe(0.5);
    });
  });
});
