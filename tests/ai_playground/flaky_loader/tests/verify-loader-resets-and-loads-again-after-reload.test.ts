// spec: tests/ai_playground/flaky_loader/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { FlakyLoaderPage } from '../POM/FlakyLoaderPage';

test.describe('Flaky Loader', () => {
  test('Verify Loader Resets And Loads Again After Reload', async ({ page }) => {
    const flakyLoaderPage = new FlakyLoaderPage(page);

    // 1. Open a fresh challenge page, load the content, and wait for success.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await flakyLoaderPage.clickLoadContentButton();
    await expect(flakyLoaderPage.loadedMessage).toBeVisible();
    await expect(flakyLoaderPage.loadedMessage).toHaveText('Content loaded successfully!');

    // 2. Reload the playground and verify the Flaky Loader returns to its initial state.
    await flakyLoaderPage.reloadPage();
    await expect(flakyLoaderPage.loadContentButton).toBeVisible();
    await expect(flakyLoaderPage.loadContentButton).toBeEnabled();
    await expect(flakyLoaderPage.loadedMessage).toBeHidden();

    // 3. Trigger the loader again and wait for the success content to reappear.
    await flakyLoaderPage.clickLoadContentButton();
    await expect(flakyLoaderPage.loadedMessage).toBeVisible();
    await expect(flakyLoaderPage.loadedMessage).toHaveText('Content loaded successfully!');
  });
});