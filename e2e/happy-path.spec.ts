import { test, expect } from '@playwright/test';

test.describe('Happy path', () => {
  test('navigates through main flows', async ({ page }) => {
    await page.goto('/');

    // Home loads
    await expect(page.getByRole('heading', { name: /explore the world/i })).toBeVisible();

    // Navigate to Itinerary
    await page.getByRole('link', { name: /plan trip/i }).click();
    await expect(page.getByRole('heading', { name: /plan your itinerary/i })).toBeVisible();
    await expect(page.getByTestId('add-activity-btn')).toBeVisible();

    // Navigate to Packing
    await page.getByRole('link', { name: /packing/i }).click();
    await expect(page.getByRole('heading', { name: /packing list planner/i })).toBeVisible();
    await expect(page.getByTestId('generate-list-btn')).toBeVisible();

    // Navigate to Budget
    await page.getByRole('link', { name: /budget tool/i }).click();
    await expect(page.getByRole('heading', { name: /budget estimator/i })).toBeVisible();

    // Navigate to Weather
    await page.getByRole('link', { name: /weather/i }).click();
    await expect(page.getByRole('heading', { name: /weather forecast/i })).toBeVisible();
    await expect(page.getByTestId('weather-search-btn')).toBeVisible();

    // Navigate to Travel Suggestions
    await page.getByRole('link', { name: /explore ideas/i }).click();
    await expect(page.getByRole('heading', { name: /travel suggestions/i })).toBeVisible();
    await expect(page.getByTestId('destination-search')).toBeVisible();
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const toggle = page.getByTestId('nav-toggle');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.getByText('Menu')).toBeVisible();

    await toggle.click();
    await expect(page.getByText('Menu')).not.toBeVisible();
  });
});
