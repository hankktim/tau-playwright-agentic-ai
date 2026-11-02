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
  test('Verify Counter Stays In Sync With List Item Count', async ({ page }) => {
    const mutationObserverPage = new MutationObserverPage(page);

    // 1. Open the playground in a fresh page, locate challenge 22 and click Start.
    await mutationObserverPage.navigateToChallenge();
    await mutationObserverPage.clickStartButton();
    await expect(mutationObserverPage.items.first()).toBeVisible();

    // 2. For each n from 1 through 10, wait with retrying assertions for the list to have n items and the counter to read "Items: n / 10".
    for (let count = 1; count <= expectedItems.length; count += 1) {
      await expect(mutationObserverPage.items).toHaveCount(count, { timeout: 15_000 });
      await expect(mutationObserverPage.counter).toHaveText(`Items: ${count} / 10`);
      await expect(mutationObserverPage.items.nth(count - 1)).toHaveText(expectedItems[count - 1]);
    }
  });
});
