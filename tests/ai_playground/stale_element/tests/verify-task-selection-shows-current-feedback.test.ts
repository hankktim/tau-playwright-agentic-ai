// spec: tests/ai_playground/stale_element/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { StaleElementPage } from '../POM/StaleElementPage';

test.describe('Stale Element', () => {
  test('Verify Task Selection Shows Current Feedback', async ({ page }) => {
    const staleElementPage = new StaleElementPage(page);

    // 1. Open challenge 15 in a fresh page and select “Update changelog” from the task list.
    await staleElementPage.navigateToChallenge();
    await staleElementPage.clickTask('Update changelog');

    await expect(staleElementPage.feedback).toBeVisible();
    await expect(staleElementPage.feedback).toHaveText(
      /^Clicked: Update changelog\s+—\s+\d{1,2}:\d{2}:\d{2}(?:\s+[AP]M)?$/,
    );
  });
});
