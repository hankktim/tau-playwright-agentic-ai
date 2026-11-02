import { test, expect } from '@playwright/test';
import { MutationObserverPage } from '../POM/MutationObserverPage';

test.describe('Stop, Resume And Reset Controls', () => {
  test('Verify Reset Clears Items After Completion', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);

    // 1. Open the playground in a fresh page, locate challenge 22, click Start and wait for 10 items.
    await mutationObserverPage.navigateToChallenge();
    await mutationObserverPage.clickStartButton();
    await expect(mutationObserverPage.items).toHaveCount(10, { timeout: 15_000 });
    await expect(mutationObserverPage.counter).toHaveText('Items: 10 / 10');

    // 2. Click Reset.
    await mutationObserverPage.clickResetButton();
    await expect(mutationObserverPage.items).toHaveCount(0);
    await expect(mutationObserverPage.counter).toHaveText('Items: 0 / 10');

    // 3. Click Start again and wait for the first item.
    await mutationObserverPage.clickStartButton();
    await expect(mutationObserverPage.items.first()).toHaveText('Set up CI pipeline');
  });
});
