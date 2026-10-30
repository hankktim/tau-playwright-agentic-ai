import { test, expect } from '@playwright/test';
import { LocalStorageSessionPage } from '../../../../page_objects/LocalStorageSessionPage';

test.describe('localStorage Session', () => {
  test('Verify Malformed Session Data Is Handled Gracefully', async ({ page }) => {
    const sessionPage = new LocalStorageSessionPage(page);

    // 1. In a fresh context, seed invalid JSON before load, then open the playground.
    await sessionPage.seedSessionBeforeNavigation('{bad json');
    await sessionPage.navigateToPlayground();
    await expect(sessionPage.usernameField).toBeVisible();
    await expect(sessionPage.passwordField).toBeVisible();
    await expect(sessionPage.loginButton).toBeVisible();
    await expect(sessionPage.welcomeMessage).toBeHidden();
    await expect(sessionPage.logoutButton).toBeHidden();
    await expect(page.getByRole('heading', { name: '21. Attribute vs Visual State', exact: true })).toBeVisible();
    await expect.poll(() => sessionPage.getSessionStorageValue()).toBe('{bad json');

    // 2. Log in with testuser / pass123.
    await sessionPage.setUsername('testuser');
    await sessionPage.setPassword('pass123');
    await sessionPage.clickLoginButton();
    await expect(sessionPage.welcomeMessage).toHaveText('Welcome, testuser');
    await expect.poll(() => sessionPage.getSessionStorageValue()).not.toBe('{bad json');

    const sessionValue = await sessionPage.getSessionStorageValue();
    if (sessionValue === null) {
      throw new Error('Expected wdu-session to contain valid JSON after login.');
    }
    const parsedSession: unknown = JSON.parse(sessionValue);
    expect(parsedSession).toMatchObject({ token: 'abc123', user: 'testuser' });
  });
});
