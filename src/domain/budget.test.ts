import { describe, it, expect } from 'vitest';
import {
  calculateTotal,
  formatCurrency,
  getValuesFromAmounts,
  TRIP_STYLE_BASES,
  CATEGORIES,
} from './budget';

describe('budget domain', () => {
  describe('calculateTotal', () => {
    it('sums values', () => {
      expect(calculateTotal([100, 200, 50])).toBe(350);
    });

    it('returns 0 for empty array', () => {
      expect(calculateTotal([])).toBe(0);
    });
  });

  describe('formatCurrency', () => {
    it('formats with default decimals', () => {
      expect(formatCurrency(1234)).toBe('$1234');
    });

    it('formats with decimals', () => {
      expect(formatCurrency(1234.56, 2)).toBe('$1234.56');
    });
  });

  describe('getValuesFromAmounts', () => {
    it('uses amounts when present', () => {
      const bases = TRIP_STYLE_BASES.moderate;
      const amounts = { Transport: 500, Accommodation: 1000 };
      const values = getValuesFromAmounts(amounts, bases);
      expect(values[0]).toBe(500);
      expect(values[1]).toBe(1000);
      expect(values[2]).toBe(300); // from base
    });

    it('falls back to bases for missing keys', () => {
      const bases = TRIP_STYLE_BASES.budget;
      const values = getValuesFromAmounts({}, bases);
      expect(values).toEqual([200, 400, 150, 100, 80]);
    });
  });

  describe('TRIP_STYLE_BASES', () => {
    it('has correct length for each style', () => {
      Object.values(TRIP_STYLE_BASES).forEach((bases) => {
        expect(bases).toHaveLength(CATEGORIES.length);
      });
    });
  });
});
