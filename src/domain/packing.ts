/**
 * Packing list domain logic — pure functions for testing.
 */

export const CATEGORIES = [
  'All',
  'Clothing',
  'Toiletries',
  'Electronics',
  'Documents',
  'Accessories',
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface PackingItem {
  id: string;
  name: string;
  packed: boolean;
  category: Category;
  isSuggestion?: boolean;
}

export const DEFAULT_GENERATED_ITEMS: Omit<PackingItem, 'id'>[] = [
  { name: 'T-Shirts', packed: false, category: 'Clothing' },
  { name: 'Underwear', packed: false, category: 'Clothing' },
  { name: 'Toothbrush', packed: false, category: 'Toiletries' },
  { name: 'Toothpaste', packed: false, category: 'Toiletries' },
  { name: 'Phone Charger', packed: false, category: 'Electronics' },
  { name: 'Passport', packed: false, category: 'Documents' },
  { name: 'Sunglasses', packed: false, category: 'Accessories' },
];

export function generateListWithoutDuplicates(
  existing: PackingItem[],
  toAdd: Omit<PackingItem, 'id'>[],
  idFn: (i: number) => string
): PackingItem[] {
  const existingNames = new Set(existing.map((i) => i.name.toLowerCase()));
  const toAddFiltered = toAdd.filter((s) => !existingNames.has(s.name.toLowerCase()));
  return [...existing, ...toAddFiltered.map((it, i) => ({ ...it, id: idFn(i) }))].sort(
    (a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category)
  );
}

export function calculateProgress(items: PackingItem[]): number {
  if (items.length === 0) return 0;
  return items.filter((i) => i.packed).length / items.length;
}
