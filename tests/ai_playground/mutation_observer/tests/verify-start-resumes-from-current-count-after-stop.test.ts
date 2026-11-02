import { test, expect } from '@playwright/test';
import { MutationObserverPage } from '../POM/MutationObserverPage';

const expectedItems = [
  'Set up CI pipeline',
  'Fix XSS vulnerability',
  'Add input validation',
  'Migrate to TypeScript',
  'Write E2E test suite',
  'Refactor auth module',
  'Add API pagination',
  'Implement dark mode',
  'Update README docs',
  'Deploy to production',
];

test.describe('Stop, Resume And Reset Controls', () => {
  test('Verify Start Resumes From Current Count After Stop', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);

    // 1. Open the playground in a fresh page, locate challenge 22, click Start and wait until the list has at least 2 items, then click Stop.
    await mutationObserverPage.navigateToChallenge();
    await mutationObserverPage.clickStartButton();
    await expect(mutationObserverPage.items).toHaveCount(2);
    await mutationObserverPage.clickStopButton();
    await expect(mutationObserverPage.items).toHaveCount(2);
    await expect(mutationObserverPage.counter).toHaveText('Items: 2 / 10');

    // 2. Click Start again and wait for the list to reach 10 items using a retrying assertion (about 15 seconds; no fixed wait).
    await mutationObserverPage.clickStartButton();
    await expect(mutationObserverPage.items).toHaveCount(10, { timeout: 15_000 });
    await expect(mutationObserverPage.items).toHaveText(expectedItems, { timeout: 15_000 });
    await expect(mutationObserverPage.counter).toHaveText('Items: 10 / 10');
  });
});
