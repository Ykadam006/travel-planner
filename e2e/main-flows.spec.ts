import { test, expect } from '@playwright/test';

test.describe('Ghumakkad main flows', () => {
  test('home loads with hero and trending destinations', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Explore the world');
    await expect(page.getByText('Trending Destinations')).toBeVisible();
  });

  test('navigates to each major route', async ({ page }) => {
    await page.goto('/');
    const routes: Array<[string, string | RegExp]> = [
      ['Plan Trip', 'Plan Your Itinerary'],
      ['Packing', 'Packing List Planner'],
      ['Explore Ideas', 'Travel Suggestions'],
      ['Budget Tool', 'Budget Estimator'],
      ['Weather', 'Weather Forecast'],
    ];
    for (const [link, heading] of routes) {
      await page.getByRole('navigation').first().getByRole('link', { name: link }).click();
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    }
  });

  test('opens destination detail from a trending card', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Tokyo/ }).first().click();
    await expect(page).toHaveURL(/\/destination\/tokyo/);
    await expect(page.getByRole('heading', { name: 'Tokyo', level: 1 })).toBeVisible();
    await expect(page.getByText('Plan this trip')).toBeVisible();
  });

  test('adds a custom itinerary activity', async ({ page }) => {
    await page.goto('/itinerary-builder');
    await page.locator('input[type="date"]').fill('2026-08-01');
    await page.getByPlaceholder('Add custom activity').fill('Sunrise hike');
    await page.getByTestId('add-activity-btn').click();
    await expect(page.getByText('Sunrise hike')).toBeVisible();
  });

  test('packing template generates items and progress updates', async ({ page }) => {
    await page.goto('/packing-list');
    await page.getByTestId('generate-list-btn').click();
    await expect(page.getByText('Passport')).toBeVisible();
    // Toggle the first checkbox and expect packed count to move
    await page.getByRole('checkbox').first().click();
    await expect(page.getByText(/1 \/ \d+/)).toBeVisible();
  });

  test('budget sliders update the total', async ({ page }) => {
    await page.goto('/budget-estimator');
    await expect(page.getByText('Total budget')).toBeVisible();
    const slider = page.getByLabel('Transport budget');
    await slider.fill('1200');
    await expect(page.getByText('$1200').first()).toBeVisible();
  });

  test('weather search reaches an end state (data or clear error)', async ({ page }) => {
    await page.goto('/weather-forecast');
    await page.getByLabel('City name').fill('Paris');
    await page.getByTestId('weather-search-btn').click();
    // Without the Netlify proxy running locally, the clear error state is the success criterion
    await expect(page.getByText(/Feels like|Could not fetch weather/)).toBeVisible({
      timeout: 15_000,
    });
  });

  test('compare mode opens an accessible sheet and Escape closes it', async ({ page }) => {
    await page.goto('/travel-suggestions');
    await page.getByText('Compare destinations').click();
    await page.getByRole('button', { name: 'Add to compare' }).first().click();
    await page.getByRole('button', { name: 'Add to compare' }).first().click();
    await page.getByRole('button', { name: /Compare \(2\)/ }).click();
    const sheet = page.getByRole('dialog');
    await expect(sheet).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(sheet).not.toBeVisible();
  });

  test('keyboard navigation shows a visible focus ring', async ({ page }) => {
    await page.goto('/help');
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
    const outline = await focused.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe('none');
  });

  test('unknown routes fall back to home', async ({ page }) => {
    await page.goto('/definitely-not-a-page');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Explore the world');
  });
});
