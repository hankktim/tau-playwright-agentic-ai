// spec: tests/ai_playground/iframe_login/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { IframeLoginPage } from '../POM/IframeLoginPage';

test.describe('iFrame Login', () => {
  test('Verify Login Succeeds With Valid Credentials', async ({ page }) => {
    const iframeLoginPage = new IframeLoginPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate challenge 10, iFrame Login. Locate the embedded frame and its Username textbox, Password textbox, and Login button through frame-scoped role locators.
    await iframeLoginPage.navigateToChallenge();
    await expect(iframeLoginPage.challengeHeading).toBeVisible();
    await expect(iframeLoginPage.iframe).toBeVisible();
    await expect(iframeLoginPage.usernameField).toBeVisible();
    await expect(iframeLoginPage.passwordField).toBeVisible();
    await expect(iframeLoginPage.loginButton).toBeVisible();
    await expect(iframeLoginPage.feedbackMessage).toHaveCount(0);

    // 2. Enter username admin and password secret123 inside the iframe, then activate its Login button.
    await iframeLoginPage.setUsername('admin');
    await iframeLoginPage.setPassword('secret123');
    await iframeLoginPage.clickLoginButton();
    await expect(iframeLoginPage.feedbackMessage).toHaveText('Login successful');
  });
});
