import { test, expect } from '@playwright/test';
import { MutationObserverPage } from '../POM/MutationObserverPage';

test.describe('Edge Cases And Negative Scenarios', () => {
  test('Verify Repeated Start Clicks Do Not Speed Up Or Duplicate Items', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);

    // 1. Install page.clock before navigating, open the playground and locate challenge 22.
    await page.clock.install();
    await mutationObserverPage.navigateToChallenge();
    await expect(mutationObserverPage.counter).toHaveText('Items: 0 / 10');

    // 2. Click Start three times in quick succession, then advance the clock by 800 ms.
    await mutationObserverPage.clickStartButton();
    await mutationObserverPage.clickStartButton();
    await mutationObserverPage.clickStartButton();
    await page.clock.runFor(800);
    await expect(mutationObserverPage.items).toHaveCount(1);
    await expect(mutationObserverPage.counter).toHaveText('Items: 1 / 10');

    // 3. Advance the clock by another 1600 ms.
    await page.clock.runFor(1600);
    await expect(mutationObserverPage.items).toHaveCount(3);
    await expect(mutationObserverPage.items).toHaveText([
      'Set up CI pipeline',
      'Fix XSS vulnerability',
      'Add input validation',
    ]);
  });
});
