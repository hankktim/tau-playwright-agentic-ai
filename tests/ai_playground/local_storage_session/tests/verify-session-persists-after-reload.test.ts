import { test, expect } from '@playwright/test';
import { LocalStorageSessionPage } from '../../../../page_objects/LocalStorageSessionPage';

test.describe('localStorage Session', () => {
  test('Verify Session Persists After Reload', async ({ page }) => {
    const sessionPage = new LocalStorageSessionPage(page);

    // 1. Open the playground fresh, log in to challenge 20 with testuser / pass123, and capture the stored `wdu-session` value.
    await sessionPage.navigateToPlayground();
    await sessionPage.setUsername('testuser');
    await sessionPage.setPassword('pass123');
    await sessionPage.clickLoginButton();
    await expect(sessionPage.welcomeMessage).toHaveText('Welcome, testuser');
    await expect.poll(() => sessionPage.getSessionStorageValue()).not.toBeNull();
    const sessionBeforeReload = await sessionPage.getSessionStorageValue();
    if (sessionBeforeReload === null) {
      throw new Error('Expected wdu-session to be stored before reload.');
    }

    // 2. Reload the page and locate challenge 20 again.
    await sessionPage.reloadPage();
    await expect(sessionPage.heading).toBeVisible();
    await expect(sessionPage.welcomeMessage).toHaveText('Welcome, testuser');
    await expect(sessionPage.logoutButton).toBeVisible();
    await expect(sessionPage.usernameField).toBeHidden();
    await expect(sessionPage.passwordField).toBeHidden();
    await expect(sessionPage.loginButton).toBeHidden();
    await expect.poll(() => sessionPage.getSessionStorageValue()).toBe(sessionBeforeReload);
  });
});
