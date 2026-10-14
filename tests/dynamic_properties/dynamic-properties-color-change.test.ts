// spec: specs/dynamic-properties.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Dynamic Properties Functional Coverage', () => {
  test('Verify the Color Change button changes color after five seconds', async ({ page }) => {
    // 1. Start from a fresh browser context and inspect the button before five seconds have elapsed.
    await page.goto('https://ui.rexjones2.com/dynamic-properties');
    const colorButton = page.getByRole('button', { name: 'Color Change', exact: true });
    await expect(colorButton).toBeVisible();
    await expect(colorButton).not.toHaveCSS('color', 'rgb(255, 0, 0)', { timeout: 1000 });

    // 2. Wait for the button's text color to change to red.
    await expect(colorButton).toHaveCSS('color', 'rgb(255, 0, 0)', { timeout: 7000 });

    // 3. Verify the label and route after the color transition.
    await expect(colorButton).toHaveText('Color Change');
    await expect(page).toHaveURL(/\/dynamic-properties$/);

    // 4. Evaluate the scenario against its success criteria.
    await expect(colorButton).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(colorButton).toHaveText('Color Change');
    await expect(page).toHaveURL(/\/dynamic-properties$/);
  });
});
