// spec: tests/ai_playground/iframe_login/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { IframeLoginPage } from '../POM/IframeLoginPage';

test.describe('iFrame Login', () => {
  test('Verify Login Feedback Updates After A Failed Attempt', async ({ page }) => {
    const iframeLoginPage = new IframeLoginPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate challenge 10. Enter an incorrect password for username admin and activate Login inside the iframe.
    await iframeLoginPage.navigateToChallenge();
    await expect(iframeLoginPage.challengeHeading).toBeVisible();
    await iframeLoginPage.setUsername('admin');
    await iframeLoginPage.setPassword('incorrect-password');
    await iframeLoginPage.clickLoginButton();
    await expect(iframeLoginPage.feedbackMessage).toHaveText('Invalid credentials');

    // 2. Replace the password with secret123 and activate Login again inside the iframe.
    await iframeLoginPage.setPassword('secret123');
    await iframeLoginPage.clickLoginButton();
    await expect(iframeLoginPage.feedbackMessage).toHaveText('Login successful');
    await expect(iframeLoginPage.feedbackMessage).not.toHaveText('Invalid credentials');
  });
});
