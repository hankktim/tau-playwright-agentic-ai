import { test, expect } from '@playwright/test';
import { LocalStorageSessionPage } from '../../../../page_objects/LocalStorageSessionPage';

test.describe('localStorage Session', () => {
  test('Verify Initial State Shows Login Form Without Session', async ({ page }) => {
    const sessionPage = new LocalStorageSessionPage(page);

    // 1. Open the AI Testing Playground in a fresh browser context and locate the "20. localStorage Session" card.
    await sessionPage.navigateToPlayground();
    await expect(sessionPage.heading).toBeVisible();
    await expect(sessionPage.subtitle).toBeVisible();

    // 2. Inspect the card controls and read localStorage key `wdu-session`.
    await expect(sessionPage.usernameField).toBeVisible();
    await expect(sessionPage.usernameField).toHaveValue('');
    await expect(sessionPage.passwordField).toBeVisible();
    await expect(sessionPage.passwordField).toHaveValue('');
    await expect(sessionPage.passwordField).toHaveAttribute('type', 'password');
    await expect(sessionPage.loginButton).toBeVisible();
    await expect(sessionPage.logoutButton).toBeHidden();
    await expect(sessionPage.welcomeMessage).toBeHidden();
    await expect(sessionPage.invalidCredentialsMessage).toBeHidden();
    await expect.poll(() => sessionPage.getSessionStorageValue()).toBeNull();
  });
});
