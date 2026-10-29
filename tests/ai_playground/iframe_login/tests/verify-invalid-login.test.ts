// spec: tests/ai_playground/iframe_login/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { IframeLoginPage } from '../POM/IframeLoginPage';

test.describe('iFrame Login', () => {
  test('Verify Login Rejects Incorrect Credentials', async ({ page }) => {
    const iframeLoginPage = new IframeLoginPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate challenge 10. Enter username admin and an incorrect password, then activate Login inside the iframe.
    await iframeLoginPage.navigateToChallenge();
    await expect(iframeLoginPage.challengeHeading).toBeVisible();
    await expect(iframeLoginPage.iframe).toBeVisible();
    await iframeLoginPage.setUsername('admin');
    await iframeLoginPage.setPassword('incorrect-password');
    await iframeLoginPage.clickLoginButton();
    await expect(iframeLoginPage.feedbackMessage).toHaveText('Invalid credentials');

    // 2. Replace the username with an incorrect value, enter password secret123, and activate Login inside the iframe.
    await iframeLoginPage.setUsername('invalid-user');
    await iframeLoginPage.setPassword('secret123');
    await iframeLoginPage.clickLoginButton();
    await expect(iframeLoginPage.usernameField).toHaveValue('invalid-user');
    await expect(iframeLoginPage.passwordField).toHaveValue('secret123');
    await expect(iframeLoginPage.feedbackMessage).toHaveText('Invalid credentials');
  });
});
