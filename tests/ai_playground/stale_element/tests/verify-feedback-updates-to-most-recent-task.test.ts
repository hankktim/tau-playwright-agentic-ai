// spec: tests/ai_playground/stale_element/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { StaleElementPage } from '../POM/StaleElementPage';

test.describe('Stale Element', () => {
  test('Verify Feedback Updates To Most Recent Task', async ({ page }) => {
    const staleElementPage = new StaleElementPage(page);

    // 1. Open challenge 15 in a fresh page, click “Review PR #42”, and then click “Write test report”.
    await staleElementPage.navigateToChallenge();
    await staleElementPage.clickTask('Review PR #42');
    await expect(staleElementPage.feedback).toHaveText(
      /^Clicked: Review PR #42\s+—\s+\d{1,2}:\d{2}:\d{2}(?:\s+[AP]M)?$/,
    );

    await staleElementPage.clickTask('Write test report');
    await expect(staleElementPage.feedback).toBeVisible();
    await expect(staleElementPage.feedback).toHaveText(
      /^Clicked: Write test report\s+—\s+\d{1,2}:\d{2}:\d{2}(?:\s+[AP]M)?$/,
    );
  });
});
