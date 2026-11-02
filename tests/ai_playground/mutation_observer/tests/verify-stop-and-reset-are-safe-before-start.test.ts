import { test, expect } from '@playwright/test';
import { MutationObserverPage } from '../POM/MutationObserverPage';

test.describe('Edge Cases And Negative Scenarios', () => {
  test('Verify Stop And Reset Are Safe Before Start', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);
    const pageErrors: Error[] = [];
    page.on('pageerror', (error) => pageErrors.push(error));

    // 1. Open the playground in a fresh page and locate challenge 22. Click Stop, then Reset.
    await mutationObserverPage.navigateToChallenge();
    await mutationObserverPage.clickStopButton();
    await mutationObserverPage.clickResetButton();
    await expect(mutationObserverPage.items).toHaveCount(0);
    await expect(mutationObserverPage.counter).toHaveText('Items: 0 / 10');
    expect(pageErrors).toEqual([]);

    // 2. Click Start and wait for the first item.
    await mutationObserverPage.clickStartButton();
    await expect(mutationObserverPage.items.first()).toHaveText('Set up CI pipeline');
    await expect(mutationObserverPage.counter).toHaveText(/Items: [1-9]\d* \/ 10/);
  });
});
