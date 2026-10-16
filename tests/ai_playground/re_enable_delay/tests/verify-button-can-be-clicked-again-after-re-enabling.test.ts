// spec: tests/ai_playground/re_enable_delay/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ReEnableDelayPage } from '../POM/ReEnableDelayPage';

test.describe('Re-Enable Delay', () => {
  test('Verify Button Can Be Clicked Again After Re-Enabling', async ({ page }) => {
    const reEnableDelayPage = new ReEnableDelayPage(page);

    // 1. Open the challenge in a fresh page and locate Click Me by its accessible button name.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await expect(reEnableDelayPage.challengeHeading).toBeVisible();
    await expect(reEnableDelayPage.clickMeButton).toBeEnabled();
    await expect(reEnableDelayPage.statusMessage).toHaveText('');

    // 2. Click Click Me once and wait until the button is enabled and the status is Ready again.
    await reEnableDelayPage.clickClickMeButton();
    await expect(reEnableDelayPage.clickMeButton).toBeEnabled();
    await expect(reEnableDelayPage.statusMessage).toHaveText('Ready');

    // 3. Click Click Me a second time and verify the new delay cycle completes without a page reload.
    await reEnableDelayPage.clickClickMeButton();
    await expect(reEnableDelayPage.clickMeButton).toBeDisabled();
    await expect(reEnableDelayPage.statusMessage).toHaveText(/^Re-enabling in \d+s…$/);
    await expect(reEnableDelayPage.clickMeButton).toBeEnabled();
    await expect(reEnableDelayPage.statusMessage).toHaveText('Ready');
  });
});
