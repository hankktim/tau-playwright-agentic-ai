// spec: specs/dynamic-properties.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Dynamic Properties Functional Coverage', () => {
  test('Verify the delayed button is hidden until five seconds', async ({ page }) => {
    // 1. Start from a fresh browser context and inspect the button before five seconds have elapsed.
    await page.goto('https://ui.rexjones2.com/dynamic-properties');
    const delayedButton = page.getByRole('button', { name: 'Visible after 5 seconds', exact: true });
    await expect(delayedButton).toHaveCount(0, { timeout: 1000 });

    // 2. Wait for the button to appear, then verify it is unique and can receive focus.
    await expect(delayedButton).toBeVisible({ timeout: 7000 });
    await expect(delayedButton).toHaveCount(1);
    await delayedButton.focus();
    await expect(delayedButton).toBeFocused();
    await expect(page).toHaveURL(/\/dynamic-properties$/);

    // 3. Wait two additional seconds and verify the button remains visible without duplication.
    const appearedAt = Date.now();
    await expect.poll(
      async () => Date.now() - appearedAt >= 2000 && await delayedButton.count() === 1 && await delayedButton.isVisible(),
      { timeout: 3000, intervals: [2100] },
    ).toBe(true);

    // 4. Evaluate the scenario against its success criteria.
    await expect(delayedButton).toHaveCount(1);
    await expect(delayedButton).toBeVisible();
    await expect(page).toHaveURL(/\/dynamic-properties$/);
  });
});
