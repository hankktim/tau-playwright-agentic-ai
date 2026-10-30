import { test, expect } from '@playwright/test';
import { LocalStorageSessionPage } from '../../../../page_objects/LocalStorageSessionPage';

test.describe('localStorage Session', () => {
  test('Verify Logout Removes Session And Resets Form', async ({ page }) => {
    const sessionPage = new LocalStorageSessionPage(page);

    // 1. Open the playground fresh, log in to challenge 20 with testuser / pass123.
    await sessionPage.navigateToPlayground();
    await sessionPage.setUsername('testuser');
    await sessionPage.setPassword('pass123');
    await sessionPage.clickLoginButton();
    await expect(sessionPage.welcomeMessage).toHaveText('Welcome, testuser');
    await expect.poll(() => sessionPage.getSessionStorageValue()).not.toBeNull();

    // 2. Click "Logout".
    await sessionPage.clickLogoutButton();
    await expect(sessionPage.usernameField).toBeVisible();
    await expect(sessionPage.passwordField).toBeVisible();
    await expect(sessionPage.loginButton).toBeVisible();
    await expect(sessionPage.welcomeMessage).toBeHidden();
    await expect(sessionPage.logoutButton).toBeHidden();
    await expect(sessionPage.usernameField).toHaveValue('');
    await expect(sessionPage.passwordField).toHaveValue('');
    await expect(sessionPage.invalidCredentialsMessage).toBeHidden();
    await expect.poll(() => sessionPage.getSessionStorageValue()).toBeNull();

    // 3. Reload the page.
    await sessionPage.reloadPage();
    await expect(sessionPage.usernameField).toBeVisible();
    await expect(sessionPage.loginButton).toBeVisible();
    await expect(sessionPage.welcomeMessage).toBeHidden();
    await expect(sessionPage.logoutButton).toBeHidden();
    await expect.poll(() => sessionPage.getSessionStorageValue()).toBeNull();
  });
});
