// spec: specs/dynamic-properties.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Dynamic Properties Functional Coverage', () => {
  test('Verify reload resets the timed properties', async ({ page }) => {
    // 1. Start from a fresh browser context and verify the pre-delay state.
    await page.goto('https://ui.rexjones2.com/dynamic-properties');
    const enableButton = page.getByRole('button', { name: 'Will enable in 5 seconds', exact: true });
    const colorButton = page.getByRole('button', { name: 'Color Change', exact: true });
    const delayedButton = page.getByRole('button', { name: 'Visible after 5 seconds', exact: true });

    await expect(enableButton).toBeDisabled({ timeout: 1000 });
    await expect(colorButton).not.toHaveCSS('color', 'rgb(255, 0, 0)', { timeout: 1000 });
    await expect(delayedButton).toHaveCount(0, { timeout: 1000 });

    // 2. Verify all three timed properties reach their post-delay states together.
    await expect(enableButton).toBeEnabled({ timeout: 7000 });
    await expect(colorButton).toHaveCSS('color', 'rgb(255, 0, 0)', { timeout: 1000 });
    await expect(delayedButton).toBeVisible({ timeout: 1000 });
    await expect(delayedButton).toHaveCount(1);

    // 3. Reload and verify all three controls return to their pre-delay states.
    await page.reload();
    await expect(enableButton).toBeDisabled({ timeout: 1000 });
    await expect(colorButton).not.toHaveCSS('color', 'rgb(255, 0, 0)', { timeout: 1000 });
    await expect(delayedButton).toHaveCount(0, { timeout: 1000 });

    // 4. Verify the same transitions occur again after reload without duplicates.
    await expect(enableButton).toBeEnabled({ timeout: 7000 });
    await expect(colorButton).toHaveCSS('color', 'rgb(255, 0, 0)', { timeout: 1000 });
    await expect(delayedButton).toBeVisible({ timeout: 1000 });
    await expect(delayedButton).toHaveCount(1);

    // 5. Evaluate the scenario against its success criteria.
    await expect(page).toHaveURL(/\/dynamic-properties$/);
    await expect(enableButton).toBeEnabled();
    await expect(colorButton).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(delayedButton).toHaveCount(1);
  });
});
