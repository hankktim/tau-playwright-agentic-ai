// spec: specs/dynamic-properties.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Dynamic Properties Functional Coverage', () => {
  test('Verify Previous and Next page navigation', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate directly to Dynamic Properties.
    await page.goto('https://ui.rexjones2.com/dynamic-properties');
    await expect(page).toHaveURL(/\/dynamic-properties$/);
    await expect(page.getByRole('heading', { name: 'Dynamic Properties', exact: true }).last()).toBeVisible();

    // 2. Click the page-level Previous link and verify it opens Select Menu.
    await page.getByRole('link', { name: 'Previous', exact: true }).click();
    await expect(page).toHaveURL(/\/select-menu$/);
    await expect(page.getByRole('heading', { name: 'Select Menu', exact: true }).last()).toBeVisible();

    // 3. Navigate directly to Dynamic Properties again for the Next-link check.
    await page.goto('https://ui.rexjones2.com/dynamic-properties');
    await expect(page).toHaveURL(/\/dynamic-properties$/);

    // 4. Click the page-level Next link and verify it opens Progress Bar.
    await page.getByRole('link', { name: 'Next', exact: true }).click();
    await expect(page).toHaveURL(/\/progress-bar$/);
    await expect(page.getByRole('heading', { name: 'Progress Bar', exact: true }).last()).toBeVisible();

    // 5. Evaluate the scenario against its success criteria.
    await expect(page).toHaveURL(/\/progress-bar$/);
    await expect(page.getByRole('heading', { name: 'Progress Bar', exact: true }).last()).toBeVisible();
  });
});
