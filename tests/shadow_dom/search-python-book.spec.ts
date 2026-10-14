// spec: specs/shadow-dom.plan.md
// seed: tests/shadow-dom-seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Book Search', () => {
  test('search-python-book', async ({ page }) => {
    // 1. Start from the Shadow DOM page with no search term entered.
    await page.goto('https://ui.rexjones2.com/shadow-dom');
    await expect(page.getByRole('textbox', { name: 'Search books...' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();

    // 2. Type `Python` into the search field.
    await page.getByRole('textbox', { name: 'Search books...' }).fill('Python');
    await expect(page.getByRole('textbox', { name: 'Search books...' })).toHaveValue('Python');

    // 3. Activate the `Search` button.
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Total books: 1', { exact: true })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Python Programming For Beginners', { exact: true })).toHaveCount(1);
  });
});
