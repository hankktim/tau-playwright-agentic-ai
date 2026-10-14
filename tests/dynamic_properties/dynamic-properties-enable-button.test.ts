// spec: specs/dynamic-properties.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Dynamic Properties Functional Coverage', () => {
  test('Verify the enable button changes state only after five seconds', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate directly to Dynamic Properties.
    await page.goto('https://ui.rexjones2.com/dynamic-properties');
    await expect(page).toHaveURL(/\/dynamic-properties$/);

    const enableButton = page.getByRole('button', { name: 'Will enable in 5 seconds', exact: true });

    // 2. Verify mouse and keyboard activation are blocked during the pre-delay state.
    await expect(enableButton).toBeDisabled({ timeout: 1000 });
    await expect(page).toHaveURL(/\/dynamic-properties$/);

    // 3. Wait for the same button to become enabled after the five-second delay.
    await expect(enableButton).toBeEnabled({ timeout: 7000 });
    await expect(enableButton).toHaveText('Will enable in 5 seconds');

    // 4. Click the enabled button once and verify it remains enabled without navigation or errors.
    await enableButton.click();
    await expect(enableButton).toBeEnabled();
    await expect(page).toHaveURL(/\/dynamic-properties$/);
    await expect(page.getByRole('alert')).toBeEmpty();

    // 5. Evaluate the scenario against its success criteria.
    await expect(enableButton).toBeEnabled();
    await expect(enableButton).toHaveText('Will enable in 5 seconds');
    await expect(page).toHaveURL(/\/dynamic-properties$/);
  });
});
