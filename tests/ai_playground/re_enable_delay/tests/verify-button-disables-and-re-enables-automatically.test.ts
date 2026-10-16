// spec: tests/ai_playground/re_enable_delay/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ReEnableDelayPage } from '../POM/ReEnableDelayPage';

test.describe('Re-Enable Delay', () => {
  test('Verify Button Disables And Re-Enables Automatically', async ({ page }) => {
    const reEnableDelayPage = new ReEnableDelayPage(page);

    // 1. Open the playground in a fresh page and locate challenge 5, Re-Enable Delay.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await expect(reEnableDelayPage.challengeHeading).toBeVisible();
    await expect(reEnableDelayPage.clickMeButton).toBeVisible();
    await expect(reEnableDelayPage.clickMeButton).toBeEnabled();
    await expect(reEnableDelayPage.statusMessage).toHaveText('');

    // 2. Click Click Me once, then inspect the button and status immediately.
    await reEnableDelayPage.clickClickMeButton();
    await expect(reEnableDelayPage.clickMeButton).toBeDisabled();
    await expect(reEnableDelayPage.statusMessage).toHaveText(/^Re-enabling in \d+s…$/);

    // 3. Wait for the button to become enabled and the status to return to Ready using retrying assertions.
    await expect(reEnableDelayPage.clickMeButton).toBeEnabled();
    await expect(reEnableDelayPage.statusMessage).toHaveText('Ready');
  });
});
