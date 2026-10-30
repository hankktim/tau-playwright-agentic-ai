// spec: tests/ai_playground/js_dialog_traps/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { JsDialogTrapsPage } from '../POM/JsDialogTrapsPage';

test.describe('JS Dialog Traps', () => {
  test('Verify Accepting Confirm Displays Confirmed Result', async ({ page }) => {
    const jsDialogTrapsPage = new JsDialogTrapsPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate the JS Dialog Traps card.
    await jsDialogTrapsPage.navigateToChallenge();
    await expect(jsDialogTrapsPage.challengeHeading).toBeVisible();
    await expect(jsDialogTrapsPage.resultMessage).toHaveCount(0);
    await expect(jsDialogTrapsPage.confirmButton).toBeVisible();

    // 2. Register a dialog handler that verifies a confirm dialog with the message “Do you want to proceed?” and accepts it; then activate Trigger confirm().
    const dialogPromise = jsDialogTrapsPage.waitForDialog('accept');
    await jsDialogTrapsPage.clickTriggerConfirm();
    const dialog = await dialogPromise;
    expect(dialog).toEqual({ type: 'confirm', message: 'Do you want to proceed?' });
    await expect(jsDialogTrapsPage.resultMessage).toHaveText('Confirmed');
  });
});