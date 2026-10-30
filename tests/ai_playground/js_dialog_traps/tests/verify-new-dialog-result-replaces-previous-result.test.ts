// spec: tests/ai_playground/js_dialog_traps/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { JsDialogTrapsPage } from '../POM/JsDialogTrapsPage';

test.describe('JS Dialog Traps', () => {
  test('Verify New Dialog Result Replaces Previous Result', async ({ page }) => {
    const jsDialogTrapsPage = new JsDialogTrapsPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate the JS Dialog Traps card.
    await jsDialogTrapsPage.navigateToChallenge();
    await expect(jsDialogTrapsPage.challengeHeading).toBeVisible();
    await expect(jsDialogTrapsPage.resultMessage).toHaveCount(0);

    // 2. Accept the confirm dialog, verifying its type and message, then activate Trigger confirm().
    const confirmDialogPromise = jsDialogTrapsPage.waitForDialog('accept');
    await jsDialogTrapsPage.clickTriggerConfirm();
    const confirmDialog = await confirmDialogPromise;
    expect(confirmDialog).toEqual({ type: 'confirm', message: 'Do you want to proceed?' });
    await expect(jsDialogTrapsPage.resultMessage).toHaveText('Confirmed');

    // 3. Accept the prompt with the value “Jordan”, verifying its type and message, then activate Trigger prompt().
    const promptDialogPromise = jsDialogTrapsPage.waitForDialog('accept', 'Jordan');
    await jsDialogTrapsPage.clickTriggerPrompt();
    const promptDialog = await promptDialogPromise;
    expect(promptDialog).toEqual({ type: 'prompt', message: 'Enter your name:' });
    await expect(jsDialogTrapsPage.resultMessage).toHaveText('Hello, Jordan');
    await expect(jsDialogTrapsPage.resultMessage).not.toHaveText('Confirmed');
  });
});