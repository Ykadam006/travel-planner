import { describe, it, expect } from 'vitest';
import { groupByDate, sortItinerary, validateItem, type ItineraryItem } from './itinerary';

describe('itinerary domain', () => {
  const items: ItineraryItem[] = [
    { id: '1', activity: 'Breakfast', date: '2024-12-02', time: '08:00' },
    { id: '2', activity: 'Lunch', date: '2024-12-02', time: '12:00' },
    { id: '3', activity: 'Dinner', date: '2024-12-01', time: '19:00' },
    { id: '4', activity: 'Museum', date: '2024-12-03' },
  ];

  describe('groupByDate', () => {
    it('groups items by date', () => {
      const grouped = groupByDate(items);
      expect(grouped.size).toBe(3);
      expect(grouped.get('2024-12-01')).toHaveLength(1);
      expect(grouped.get('2024-12-02')).toHaveLength(2);
      expect(grouped.get('2024-12-03')).toHaveLength(1);
    });

    it('sorts items within each day by time', () => {
      const grouped = groupByDate(items);
      const day2 = grouped.get('2024-12-02')!;
      expect(day2[0].activity).toBe('Breakfast');
      expect(day2[1].activity).toBe('Lunch');
    });

    it('returns empty map for empty input', () => {
      expect(groupByDate([]).size).toBe(0);
    });
  });

  describe('sortItinerary', () => {
    it('sorts by date then time', () => {
      const sorted = sortItinerary([...items].reverse());
      expect(sorted[0].date).toBe('2024-12-01');
      expect(sorted[1].date).toBe('2024-12-02');
      expect(sorted[1].activity).toBe('Breakfast');
      expect(sorted[2].activity).toBe('Lunch');
      expect(sorted[3].date).toBe('2024-12-03');
    });
  });

  describe('validateItem', () => {
    it('accepts valid activity and date', () => {
      expect(validateItem('Eiffel Tower', '2024-12-01')).toEqual({ valid: true });
    });

    it('rejects empty activity', () => {
      expect(validateItem('', '2024-12-01')).toEqual({
        valid: false,
        error: 'Activity is required',
      });
      expect(validateItem('   ', '2024-12-01')).toEqual({
        valid: false,
        error: 'Activity is required',
      });
    });

    it('rejects empty date', () => {
      expect(validateItem('Lunch', '')).toEqual({ valid: false, error: 'Date is required' });
    });

    it('rejects invalid date', () => {
      expect(validateItem('Lunch', 'invalid')).toEqual({ valid: false, error: 'Invalid date' });
    });
  });
});
