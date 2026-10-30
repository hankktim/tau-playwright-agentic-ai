import { test, expect } from '@playwright/test';
import { LocalStorageSessionPage } from '../../../../page_objects/LocalStorageSessionPage';

test.describe('localStorage Session', () => {
  test('Verify Successful Login Clears Previous Error', async ({ page }) => {
    const sessionPage = new LocalStorageSessionPage(page);

    // 1. Open the playground fresh, locate challenge 20, submit Username "testuser" / Password "bad".
    await sessionPage.navigateToPlayground();
    await sessionPage.setUsername('testuser');
    await sessionPage.setPassword('bad');
    await sessionPage.clickLoginButton();
    await expect(sessionPage.invalidCredentialsMessage).toBeVisible();
    await expect.poll(() => sessionPage.getSessionStorageValue()).toBeNull();

    // 2. Replace the Password with "pass123" and click "Login".
    await sessionPage.setPassword('pass123');
    await sessionPage.clickLoginButton();
    await expect(sessionPage.welcomeMessage).toHaveText('Welcome, testuser');
    await expect(sessionPage.invalidCredentialsMessage).toBeHidden();
    await expect.poll(() => sessionPage.getSessionStorageValue()).toContain('"user":"testuser"');
  });
});
