// spec: tests/ai_playground/re_enable_delay/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ReEnableDelayPage } from '../POM/ReEnableDelayPage';

test.describe('Re-Enable Delay', () => {
  test('Verify Button Cannot Be Activated During Re-Enable Delay', async ({ page }) => {
    const reEnableDelayPage = new ReEnableDelayPage(page);

    // 1. Open the playground in a fresh page and locate challenge 5.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await expect(reEnableDelayPage.challengeHeading).toBeVisible();
    await expect(reEnableDelayPage.clickMeButton).toBeEnabled();
    await expect(reEnableDelayPage.statusMessage).toHaveText('');

    // 2. Click once, then assert the button is disabled and the countdown is visible without attempting another click.
    await reEnableDelayPage.clickClickMeButton();
    await expect(reEnableDelayPage.clickMeButton).toBeDisabled();
    await expect(reEnableDelayPage.statusMessage).toHaveText(/^Re-enabling in \d+s…$/);

    // 3. Wait for the delayed re-enable to restore the button and Ready status using state-based assertions.
    await expect(reEnableDelayPage.clickMeButton).toBeEnabled();
    await expect(reEnableDelayPage.statusMessage).toHaveText('Ready');
  });
});
