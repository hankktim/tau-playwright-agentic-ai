import { test, expect } from '@playwright/test';
import { LocalStorageSessionPage } from '../../../../page_objects/LocalStorageSessionPage';

test.describe('localStorage Session', () => {
  test('Verify Credential Variants Are Rejected', async ({ page }) => {
    const sessionPage = new LocalStorageSessionPage(page);
    const variants = [
      { username: '', password: '', description: 'both fields empty' },
      { username: 'testuser', password: '', description: 'empty password' },
      { username: '', password: 'pass123', description: 'empty username' },
      { username: 'TestUser', password: 'pass123', description: 'wrong username case' },
      { username: ' testuser ', password: 'pass123', description: 'username with surrounding spaces' },
      { username: 'testuser', password: 'PASS123', description: 'wrong password case' },
    ];

    // 1. Open the playground fresh and locate challenge 20. Submit each credential variant.
    await sessionPage.navigateToPlayground();
    for (const variant of variants) {
      await sessionPage.setUsername(variant.username);
      await sessionPage.setPassword(variant.password);
      await sessionPage.clickLoginButton();
      await expect.soft(sessionPage.invalidCredentialsMessage, variant.description).toBeVisible();
      await expect.soft(sessionPage.usernameField, variant.description).toBeVisible();
      await expect.soft(sessionPage.passwordField, variant.description).toBeVisible();
      await expect.soft(sessionPage.loginButton, variant.description).toBeVisible();
      await expect.soft(sessionPage.welcomeMessage, variant.description).toBeHidden();
      await expect.soft(sessionPage.logoutButton, variant.description).toBeHidden();
      await expect.soft
        .poll(() => sessionPage.getSessionStorageValue(), { message: variant.description })
        .toBeNull();
    }
  });
});
