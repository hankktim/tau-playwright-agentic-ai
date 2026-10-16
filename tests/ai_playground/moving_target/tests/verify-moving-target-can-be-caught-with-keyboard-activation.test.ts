import { test, expect } from '@playwright/test';
import { MovingTargetPage } from '../POM/MovingTargetPage';

test.describe('Moving Target', () => {
  test('Verify Moving Target Can Be Caught With Keyboard Activation', async ({ page }) => {
    // 1. Open a fresh page and locate the Moving Target button.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    const movingTargetPage = new MovingTargetPage(page);
    await expect(movingTargetPage.challengeHeading).toBeVisible();
    await expect(movingTargetPage.catchMeButton).toBeVisible();
    await expect(movingTargetPage.catchMeButton).toBeEnabled();

    // 2. Focus the current target and activate it without pointer approach.
    await movingTargetPage.focusCatchMeButton();
    await expect(movingTargetPage.catchMeButton).toBeFocused();
    await movingTargetPage.pressEnterOnCatchMeButton();

    // 3. Confirm the catch result in the global notification.
    await expect(movingTargetPage.caughtMessage).toBeVisible();
    await expect(movingTargetPage.caughtMessage).toHaveText('Got it!');
  });
});