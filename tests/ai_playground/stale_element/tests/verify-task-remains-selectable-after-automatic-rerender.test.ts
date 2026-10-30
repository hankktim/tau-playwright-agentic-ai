// spec: tests/ai_playground/stale_element/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { StaleElementPage } from '../POM/StaleElementPage';

test.describe('Stale Element', () => {
  test('Verify Task Remains Selectable After Automatic Re-render', async ({ page }) => {
    const staleElementPage = new StaleElementPage(page);

    // 1. Open challenge 15 in a fresh page and observe the rendered task list. Wait for one scheduled automatic rebuild, using evidence that an existing task node was replaced rather than a fixed sleep.
    await staleElementPage.navigateToChallenge();
    await expect(staleElementPage.taskItems).toHaveText([
      'Review PR #42',
      'Fix build error',
      'Update changelog',
      'Deploy to staging',
      'Write test report',
    ]);
    await staleElementPage.waitForAutomaticRerender();
    await expect(staleElementPage.taskItems).toHaveText([
      'Review PR #42',
      'Fix build error',
      'Update changelog',
      'Deploy to staging',
      'Write test report',
    ]);

    // 2. After the rebuild, locate and click “Fix build error” using its current visible text.
    await staleElementPage.clickTask('Fix build error');
    await expect(staleElementPage.feedback).toBeVisible();
    await expect(staleElementPage.feedback).toHaveText(
      /^Clicked: Fix build error\s+—\s+\d{1,2}:\d{2}:\d{2}(?:\s+[AP]M)?$/,
    );
  });
});
