// spec: tests/ai_playground/flaky_loader/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { FlakyLoaderPage } from '../POM/FlakyLoaderPage';

test.describe('Flaky Loader', () => {
  test('Verify Content Loads Eventually Without Fixed Waits', async ({ page }) => {
    const flakyLoaderPage = new FlakyLoaderPage(page);

    // 1. Open the playground fresh and inspect the initial Flaky Loader state.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await expect(flakyLoaderPage.loadContentButton).toBeVisible();
    await expect(flakyLoaderPage.loadContentButton).toBeEnabled();
    await expect(flakyLoaderPage.loadedMessage).toBeHidden();

    // 2. Activate the loader once and wait for its content without a fixed delay.
    await flakyLoaderPage.clickLoadContentButton();
    await expect(flakyLoaderPage.loadedMessage).toBeVisible({ timeout: 15_000 });
    await expect(flakyLoaderPage.loadedMessage).toHaveText('Content loaded successfully!');
  });
});