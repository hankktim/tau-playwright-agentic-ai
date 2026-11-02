import { test, expect } from '@playwright/test';
import { MutationObserverPage } from '../POM/MutationObserverPage';

test.describe('Initial State And Happy Path', () => {
  test('Verify Start Adds First Item Asynchronously', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);

    // 1. Open the playground in a fresh page and locate challenge 22.
    await mutationObserverPage.navigateToChallenge();
    await expect(mutationObserverPage.counter).toHaveText('Items: 0 / 10');
    await expect(mutationObserverPage.items).toHaveCount(0);

    // 2. Click the Start button and wait for state using a retrying assertion (no fixed wait).
    await mutationObserverPage.clickStartButton();
    await expect(mutationObserverPage.items.first()).toHaveText('Set up CI pipeline');
    await expect(mutationObserverPage.counter).toHaveText(/Items: [1-9]\d* \/ 10/);
  });
});
