/**
 * Budget estimator domain logic — pure functions for testing.
 */

export const CATEGORIES = ['Transport', 'Accommodation', 'Food', 'Activities', 'Misc'] as const;

export type TripStyle = 'budget' | 'moderate' | 'luxury' | 'splurge';

export const TRIP_STYLE_BASES: Record<TripStyle, number[]> = {
  budget: [200, 400, 150, 100, 80],
  moderate: [400, 800, 300, 250, 150],
  luxury: [800, 1500, 600, 500, 300],
  splurge: [1500, 3000, 1200, 1000, 500],
};

export function calculateTotal(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

export function formatCurrency(value: number, decimals = 0): string {
  return `$${value.toFixed(decimals)}`;
}

export function getValuesFromAmounts(amounts: Record<string, number>, bases: number[]): number[] {
  return CATEGORIES.map((cat, i) => amounts[cat] ?? bases[i] ?? 0);
}
