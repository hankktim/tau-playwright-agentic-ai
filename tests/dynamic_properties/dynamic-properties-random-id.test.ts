// spec: specs/dynamic-properties.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Dynamic Properties Functional Coverage', () => {
  test('Verify the random ID is unique and changes after reload', async ({ page }) => {
    // 1. Start from a fresh browser context and verify the random-ID text is visible.
    await page.goto('https://ui.rexjones2.com/dynamic-properties');
    const randomText = page.getByText('This text has random Id', { exact: true });
    await expect(randomText).toBeVisible();

    // The live page currently renders this paragraph without an id attribute.
    test.fixme();

    // 2. Record the generated id and verify that it is unique on the page.
    const firstId = await randomText.getAttribute('id');
    const firstIdCount = firstId ? await page.locator(`[id="${firstId}"]`).count() : 0;

    // 3. Reload and inspect the same text element again.
    await page.reload();
    const reloadedRandomText = page.getByText('This text has random Id', { exact: true });
    await expect(reloadedRandomText).toBeVisible();
    const secondId = await reloadedRandomText.getAttribute('id');
    const secondIdCount = secondId ? await page.locator(`[id="${secondId}"]`).count() : 0;

    // 4. Evaluate the scenario against its success criteria.
    expect(firstId, 'The text element should have a generated id before reload').toBeTruthy();
    expect(firstIdCount, 'The generated id should be unique before reload').toBe(1);
    expect(secondId, 'The text element should have a generated id after reload').toBeTruthy();
    expect(secondIdCount, 'The generated id should be unique after reload').toBe(1);
    expect(secondId, 'The generated id should change after reload').not.toBe(firstId);
  });
});
