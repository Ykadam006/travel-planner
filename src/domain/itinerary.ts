/**
 * Itinerary domain logic — pure functions for testing.
 */

export interface ItineraryItem {
  id: string;
  activity: string;
  date: string;
  time?: string;
  notes?: string;
  image?: string;
}

export function groupByDate(items: ItineraryItem[]): Map<string, ItineraryItem[]> {
  const map = new Map<string, ItineraryItem[]>();
  items.forEach((item) => {
    const list = map.get(item.date) ?? [];
    list.push(item);
    map.set(item.date, list);
  });
  map.forEach((list) => list.sort((a, b) => (a.time ?? '').localeCompare(b.time ?? '')));
  return map;
}

export function sortItinerary(items: ItineraryItem[]): ItineraryItem[] {
  return [...items].sort(
    (a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? '')
  );
}

export function validateItem(activity: string, date: string): { valid: boolean; error?: string } {
  if (!activity?.trim()) return { valid: false, error: 'Activity is required' };
  if (!date?.trim()) return { valid: false, error: 'Date is required' };
  const d = new Date(date);
  if (isNaN(d.getTime())) return { valid: false, error: 'Invalid date' };
  return { valid: true };
}
