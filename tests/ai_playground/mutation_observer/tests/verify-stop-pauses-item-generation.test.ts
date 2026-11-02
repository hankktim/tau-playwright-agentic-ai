import { test, expect } from '@playwright/test';
import { MutationObserverPage } from '../POM/MutationObserverPage';

test.describe('Stop, Resume And Reset Controls', () => {
  test('Verify Stop Pauses Item Generation', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);

    // 1. Install page.clock before navigating, open the playground in a fresh page and locate challenge 22.
    await page.clock.install();
    await mutationObserverPage.navigateToChallenge();
    await expect(mutationObserverPage.counter).toHaveText('Items: 0 / 10');

    // 2. Click Start and advance the clock by 2400 ms (three ticks).
    await mutationObserverPage.clickStartButton();
    await page.clock.runFor(2400);
    await expect(mutationObserverPage.items).toHaveCount(3);
    await expect(mutationObserverPage.counter).toHaveText('Items: 3 / 10');

    // 3. Click Stop and advance the clock by a further 5000 ms.
    await mutationObserverPage.clickStopButton();
    await page.clock.runFor(5000);
    await expect(mutationObserverPage.items).toHaveCount(3);
    await expect(mutationObserverPage.counter).toHaveText('Items: 3 / 10');
  });
});
