// spec: tests/ai_playground/js_dialog_traps/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { JsDialogTrapsPage } from '../POM/JsDialogTrapsPage';

test.describe('JS Dialog Traps', () => {
  test('Verify Alert Dialog Is Handled And Page Remains Usable', async ({ page }) => {
    const jsDialogTrapsPage = new JsDialogTrapsPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate the “19. JS Dialog Traps” card. Confirm the result area is empty and the Trigger alert() button is available.
    await jsDialogTrapsPage.navigateToChallenge();
    await expect(jsDialogTrapsPage.challengeHeading).toBeVisible();
    await expect(jsDialogTrapsPage.alertButton).toBeVisible();
    await expect(jsDialogTrapsPage.confirmButton).toBeVisible();
    await expect(jsDialogTrapsPage.promptButton).toBeVisible();
    await expect(jsDialogTrapsPage.resultMessage).toHaveCount(0);

    // 2. Register a dialog handler that checks for an alert with the exact message “This is an alert dialog. Your test must handle it.” and accepts it; then activate Trigger alert().
    const alertDialogPromise = jsDialogTrapsPage.waitForDialog('accept');
    await jsDialogTrapsPage.clickTriggerAlert();
    const alertDialog = await alertDialogPromise;
    expect(alertDialog).toEqual({
      type: 'alert',
      message: 'This is an alert dialog. Your test must handle it.',
    });
    await expect(jsDialogTrapsPage.resultMessage).toHaveCount(0);

    // 3. After the alert has closed, register a handler to accept a confirm dialog and activate Trigger confirm().
    const confirmDialogPromise = jsDialogTrapsPage.waitForDialog('accept');
    await jsDialogTrapsPage.clickTriggerConfirm();
    const confirmDialog = await confirmDialogPromise;
    expect(confirmDialog).toEqual({ type: 'confirm', message: 'Do you want to proceed?' });
    await expect(jsDialogTrapsPage.resultMessage).toHaveText('Confirmed');
  });
});