// spec: specs/shadow-dom.plan.md
// seed: tests/shadow-dom-seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Book Search', () => {
  test('search-no-such-book', async ({ page }) => {
    // 1. Start from the Shadow DOM page with no search term entered.
    await page.goto('https://ui.rexjones2.com/shadow-dom');
    await expect(page.getByRole('textbox', { name: 'Search books...' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();

    // 2. Type `no-such-book-xyz` into the search field.
    await page.getByRole('textbox', { name: 'Search books...' }).fill('no-such-book-xyz');
    await expect(page.getByRole('textbox', { name: 'Search books...' })).toHaveValue('no-such-book-xyz');

    // 3. Activate the `Search` button.
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Total books: 0', { exact: true })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Author: Rex Jones II', { exact: true })).toHaveCount(0);
  });
});
