import { test, expect } from '@playwright/test';
import { MutationObserverPage } from '../POM/MutationObserverPage';

test.describe('Edge Cases And Negative Scenarios', () => {
  test('Verify Start Has No Effect Once Ten Items Exist', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);

    // 1. Open the playground in a fresh page, locate challenge 22, click Start and wait for 10 items.
    await page.clock.install();
    await mutationObserverPage.navigateToChallenge();
    await mutationObserverPage.clickStartButton();
    await page.clock.runFor(8000);
    await expect(mutationObserverPage.items).toHaveCount(10);
    await expect(mutationObserverPage.counter).toHaveText('Items: 10 / 10');

    // 2. Click Start again and allow at least two interval periods to elapse (preferably via page.clock).
    await mutationObserverPage.clickStartButton();
    await page.clock.runFor(1600);
    await expect(mutationObserverPage.items).toHaveCount(10);
    await expect(mutationObserverPage.counter).toHaveText('Items: 10 / 10');
  });
});
