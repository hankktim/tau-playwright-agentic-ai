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

test.describe('Initial State And Happy Path', () => {
  test('Verify All Ten Items Are Added In Order', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);

    // 1. Open the playground in a fresh page, locate challenge 22 and click Start.
    await mutationObserverPage.navigateToChallenge();
    await mutationObserverPage.clickStartButton();
    await expect(mutationObserverPage.items.first()).toBeVisible();

    // 2. Wait for the list to reach 10 items using a retrying assertion (about 15 seconds; no fixed wait).
    await expect(mutationObserverPage.items).toHaveCount(10, { timeout: 15_000 });
    await expect(mutationObserverPage.items).toHaveText(expectedItems, { timeout: 15_000 });
    await expect(mutationObserverPage.counter).toHaveText('Items: 10 / 10');
  });
});
