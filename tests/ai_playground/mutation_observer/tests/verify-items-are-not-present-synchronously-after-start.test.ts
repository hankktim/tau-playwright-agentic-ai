import { test, expect } from '@playwright/test';
import { MutationObserverPage } from '../POM/MutationObserverPage';

test.describe('Edge Cases And Negative Scenarios', () => {
  test('Verify Items Are Not Present Synchronously After Start', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);
    const startTime = new Date('2024-01-01T01:00:00.000Z');

    // 1. Install page.clock before navigating, open the playground, locate challenge 22 and click Start without advancing the clock.
    await page.clock.install({ time: new Date('2024-01-01T00:00:00.000Z') });
    await mutationObserverPage.navigateToChallenge();
    await page.clock.pauseAt(startTime);
    await mutationObserverPage.clickStartButton();
    await expect(mutationObserverPage.items).toHaveCount(0);
    await expect(mutationObserverPage.counter).toHaveText('Items: 0 / 10');

    // 2. Advance the clock by 799 ms.
    await page.clock.pauseAt(new Date(startTime.getTime() + 799));
    await expect(mutationObserverPage.items).toHaveCount(0);

    // 3. Advance the clock by 1 ms more (800 ms total).
    await page.clock.pauseAt(new Date(startTime.getTime() + 800));
    await expect(mutationObserverPage.items).toHaveCount(1);
    await expect(mutationObserverPage.items.first()).toHaveText('Set up CI pipeline');
    await expect(mutationObserverPage.counter).toHaveText('Items: 1 / 10');
  });
});
