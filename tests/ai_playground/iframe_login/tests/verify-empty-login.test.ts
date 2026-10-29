// spec: tests/ai_playground/iframe_login/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { IframeLoginPage } from '../POM/IframeLoginPage';

test.describe('iFrame Login', () => {
  test('Verify Login Rejects Empty Submission', async ({ page }) => {
    const iframeLoginPage = new IframeLoginPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate challenge 10. Leave both fields empty and activate Login inside the iframe.
    await iframeLoginPage.navigateToChallenge();
    await expect(iframeLoginPage.challengeHeading).toBeVisible();
    await expect(iframeLoginPage.usernameField).toHaveValue('');
    await expect(iframeLoginPage.passwordField).toHaveValue('');
    await expect(iframeLoginPage.feedbackMessage).toHaveCount(0);
    await iframeLoginPage.clickLoginButton();
    await expect(iframeLoginPage.feedbackMessage).toHaveText('Invalid credentials');
  });
});
