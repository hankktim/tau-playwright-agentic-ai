import { test, expect } from '@playwright/test';
import { MutationObserverPage } from '../POM/MutationObserverPage';

test.describe('Initial State And Happy Path', () => {
  test('Verify Mutation Observer Initial State Shows Zero Items', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);

    // 1. Open the playground in a fresh page and locate the challenge card by the heading "22. Mutation Observer".
    await mutationObserverPage.navigateToChallenge();
    await expect(mutationObserverPage.challengeHeading).toBeVisible();
    await expect(mutationObserverPage.subtitle).toBeVisible();
    await expect(mutationObserverPage.startButton).toBeVisible();
    await expect(mutationObserverPage.startButton).toBeEnabled();
    await expect(mutationObserverPage.stopButton).toBeVisible();
    await expect(mutationObserverPage.stopButton).toBeEnabled();
    await expect(mutationObserverPage.resetButton).toBeVisible();
    await expect(mutationObserverPage.resetButton).toBeEnabled();
    await expect(mutationObserverPage.counter).toHaveText('Items: 0 / 10');
    await expect(mutationObserverPage.items).toHaveCount(0);
  });
});
