import { test, expect } from '@playwright/test';
import { LocalStorageSessionPage } from '../../../../page_objects/LocalStorageSessionPage';

test.describe('localStorage Session', () => {
  test('Verify Valid Login Stores Session In localStorage', async ({ page }) => {
    const sessionPage = new LocalStorageSessionPage(page);

    // 1. Open the playground fresh, locate challenge 20, fill Username "testuser" and Password "pass123", and click "Login".
    await sessionPage.navigateToPlayground();
    const loginStartedAt = Date.now();
    await sessionPage.setUsername('testuser');
    await sessionPage.setPassword('pass123');
    await sessionPage.clickLoginButton();
    await expect(sessionPage.welcomeMessage).toHaveText('Welcome, testuser');
    await expect(sessionPage.logoutButton).toBeVisible();
    await expect(sessionPage.usernameField).toBeHidden();
    await expect(sessionPage.passwordField).toBeHidden();
    await expect(sessionPage.loginButton).toBeHidden();

    // 2. Read and JSON-parse localStorage `wdu-session` (poll until non-null).
    await expect.poll(() => sessionPage.getSessionStorageValue()).not.toBeNull();
    const sessionValue = await sessionPage.getSessionStorageValue();
    if (sessionValue === null) {
      throw new Error('Expected wdu-session to be stored after a successful login.');
    }

    const parsedSession: unknown = JSON.parse(sessionValue);
    expect(parsedSession).toMatchObject({ token: 'abc123', user: 'testuser' });
    if (typeof parsedSession !== 'object' || parsedSession === null || !('expires' in parsedSession)) {
      throw new Error('Expected wdu-session to contain an expires value.');
    }
    const expires = parsedSession.expires;
    if (typeof expires !== 'number') {
      throw new Error('Expected wdu-session expires to be a number.');
    }
    expect(expires).toBeGreaterThan(Date.now());
    expect(Math.abs(expires - (loginStartedAt + 3_600_000))).toBeLessThanOrEqual(5_000);
  });
});
