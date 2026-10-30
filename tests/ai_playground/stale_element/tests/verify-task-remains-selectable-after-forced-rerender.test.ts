// spec: tests/ai_playground/stale_element/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { StaleElementPage } from '../POM/StaleElementPage';

test.describe('Stale Element', () => {
  test('Verify Task Remains Selectable After Forced Re-render', async ({ page }) => {
    const staleElementPage = new StaleElementPage(page);

    // 1. Open challenge 15 in a fresh page and click “Force Re-render”.
    await staleElementPage.navigateToChallenge();
    await staleElementPage.clickForceRerenderButton();
    await expect(staleElementPage.taskItems).toHaveText([
      'Review PR #42',
      'Fix build error',
      'Update changelog',
      'Deploy to staging',
      'Write test report',
    ]);

    // 2. After the re-render, locate and click “Deploy to staging” using its current visible text, not a previously captured element handle.
    await staleElementPage.clickTask('Deploy to staging');
    await expect(staleElementPage.feedback).toBeVisible();
    await expect(staleElementPage.feedback).toHaveText(
      /^Clicked: Deploy to staging\s+—\s+\d{1,2}:\d{2}:\d{2}(?:\s+[AP]M)?$/,
    );
  });
});
