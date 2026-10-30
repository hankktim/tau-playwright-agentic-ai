import { test, expect } from '@playwright/test';
import { LocalStorageSessionPage } from '../../../../page_objects/LocalStorageSessionPage';

test.describe('localStorage Session', () => {
  test('Verify Pre-Seeded Valid Session Restores Welcome State', async ({ browser }) => {
    const testuserPage = await browser.newPage();
    const testuserSessionPage = new LocalStorageSessionPage(testuserPage);

    try {
      // 1. In a fresh context, seed localStorage before the page scripts run with a valid testuser session.
      await testuserSessionPage.seedSessionBeforeNavigation(
        JSON.stringify({ token: 'abc123', user: 'testuser', expires: Date.now() + 3_600_000 }),
      );
      await testuserSessionPage.navigateToPlayground();
      await expect(testuserSessionPage.welcomeMessage).toHaveText('Welcome, testuser');
      await expect(testuserSessionPage.logoutButton).toBeVisible();
      await expect(testuserSessionPage.usernameField).toBeHidden();
      await expect(testuserSessionPage.passwordField).toBeHidden();
      await expect(testuserSessionPage.loginButton).toBeHidden();
    } finally {
      await testuserPage.close();
    }

    const seededuserPage = await browser.newPage();
    const seededuserSessionPage = new LocalStorageSessionPage(seededuserPage);

    try {
      // 2. Seed instead a session with user "seededuser" in a fresh context and load the page.
      await seededuserSessionPage.seedSessionBeforeNavigation(
        JSON.stringify({ token: 'abc123', user: 'seededuser', expires: Date.now() + 3_600_000 }),
      );
      await seededuserSessionPage.navigateToPlayground();
      await expect(seededuserSessionPage.welcomeMessage).toHaveText('Welcome, seededuser');
      await expect(seededuserSessionPage.logoutButton).toBeVisible();
      await expect(seededuserSessionPage.usernameField).toBeHidden();
    } finally {
      await seededuserPage.close();
    }
  });
});
