import { test, expect } from '@playwright/test';
import { LocalStorageSessionPage } from '../../../../page_objects/LocalStorageSessionPage';

test.describe('localStorage Session', () => {
  test('Verify Expired Session Shows Login Form', async ({ page }) => {
    const sessionPage = new LocalStorageSessionPage(page);
    const expiredSession = JSON.stringify({
      token: 'abc123',
      user: 'testuser',
      expires: Date.now() - 1_000,
    });

    // 1. In a fresh context, seed an expired session before load, then open the playground.
    await sessionPage.seedSessionBeforeNavigation(expiredSession);
    await sessionPage.navigateToPlayground();
    await expect(sessionPage.usernameField).toBeVisible();
    await expect(sessionPage.passwordField).toBeVisible();
    await expect(sessionPage.loginButton).toBeVisible();
    await expect(sessionPage.welcomeMessage).toBeHidden();
    await expect(sessionPage.logoutButton).toBeHidden();
    await expect.poll(() => sessionPage.getSessionStorageValue()).toBe(expiredSession);

    // 2. Log in with testuser / pass123.
    await sessionPage.setUsername('testuser');
    await sessionPage.setPassword('pass123');
    await sessionPage.clickLoginButton();
    await expect(sessionPage.welcomeMessage).toHaveText('Welcome, testuser');
    await expect.poll(() => sessionPage.getSessionStorageValue()).not.toBe(expiredSession);

    const sessionValue = await sessionPage.getSessionStorageValue();
    if (sessionValue === null) {
      throw new Error('Expected wdu-session to be overwritten after a successful login.');
    }
    const parsedSession: unknown = JSON.parse(sessionValue);
    expect(parsedSession).toMatchObject({ token: 'abc123', user: 'testuser' });
    if (typeof parsedSession !== 'object' || parsedSession === null || !('expires' in parsedSession)) {
      throw new Error('Expected the refreshed wdu-session to contain an expires value.');
    }
    const expires = parsedSession.expires;
    if (typeof expires !== 'number') {
      throw new Error('Expected the refreshed wdu-session expires value to be a number.');
    }
    expect(expires).toBeGreaterThan(Date.now());
  });
});
