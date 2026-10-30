// spec: tests/ai_playground/stale_element/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { StaleElementPage } from '../POM/StaleElementPage';

test.describe('Stale Element', () => {
  test('Verify Initial Task List And Empty Feedback', async ({ page }) => {
    const staleElementPage = new StaleElementPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate challenge 15, Stale Element.
    await staleElementPage.navigateToChallenge();
    await expect(staleElementPage.challengeHeading).toBeVisible();
    await expect(staleElementPage.taskItems).toHaveText([
      'Review PR #42',
      'Fix build error',
      'Update changelog',
      'Deploy to staging',
      'Write test report',
    ]);
    await expect(staleElementPage.forceRerenderButton).toBeVisible();

    // 2. Inspect the challenge feedback before selecting a task.
    await expect(staleElementPage.feedback).not.toBeVisible();
  });
});
