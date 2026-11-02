import { test, expect } from '@playwright/test';
import { MutationObserverPage } from '../POM/MutationObserverPage';

test.describe('Stop, Resume And Reset Controls', () => {
  test('Verify Reset While Running Stops And Clears The List', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);

    // 1. Install page.clock before navigating, open the playground, locate challenge 22, click Start and advance the clock by 1600 ms.
    await page.clock.install();
    await mutationObserverPage.navigateToChallenge();
    await mutationObserverPage.clickStartButton();
    await page.clock.runFor(1600);
    await expect(mutationObserverPage.items).toHaveCount(2);

    // 2. Click Reset without clicking Stop and advance the clock by 5000 ms.
    await mutationObserverPage.clickResetButton();
    await page.clock.runFor(5000);
    await expect(mutationObserverPage.items).toHaveCount(0);
    await expect(mutationObserverPage.counter).toHaveText('Items: 0 / 10');
  });
});
