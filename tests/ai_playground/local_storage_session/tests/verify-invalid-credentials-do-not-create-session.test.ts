import { test, expect } from '@playwright/test';
import { LocalStorageSessionPage } from '../../../../page_objects/LocalStorageSessionPage';

test.describe('localStorage Session', () => {
  test('Verify Invalid Credentials Do Not Create Session', async ({ page }) => {
    const sessionPage = new LocalStorageSessionPage(page);

    // 1. Open the playground fresh, locate challenge 20, fill Username "testuser" and Password "wrongpass", and click "Login".
    await sessionPage.navigateToPlayground();
    await sessionPage.setUsername('testuser');
    await sessionPage.setPassword('wrongpass');
    await sessionPage.clickLoginButton();
    await expect(sessionPage.invalidCredentialsMessage).toBeVisible();
    await expect(sessionPage.usernameField).toBeVisible();
    await expect(sessionPage.passwordField).toBeVisible();
    await expect(sessionPage.loginButton).toBeVisible();
    await expect(sessionPage.welcomeMessage).toBeHidden();
    await expect(sessionPage.logoutButton).toBeHidden();
    await expect.poll(() => sessionPage.getSessionStorageValue()).toBeNull();
  });
});
