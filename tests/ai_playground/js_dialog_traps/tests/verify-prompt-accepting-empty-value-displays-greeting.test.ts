// spec: tests/ai_playground/js_dialog_traps/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { JsDialogTrapsPage } from '../POM/JsDialogTrapsPage';

test.describe('JS Dialog Traps', () => {
  test('Verify Accepting An Empty Prompt Value Displays Greeting', async ({ page }) => {
    const jsDialogTrapsPage = new JsDialogTrapsPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate the JS Dialog Traps card.
    await jsDialogTrapsPage.navigateToChallenge();
    await expect(jsDialogTrapsPage.challengeHeading).toBeVisible();
    await expect(jsDialogTrapsPage.resultMessage).toHaveCount(0);
    await expect(jsDialogTrapsPage.promptButton).toBeVisible();

    // 2. Register a dialog handler that verifies a prompt dialog with the message “Enter your name:” and accepts it with an empty string; then activate Trigger prompt().
    const dialogPromise = jsDialogTrapsPage.waitForDialog('accept', '');
    await jsDialogTrapsPage.clickTriggerPrompt();
    const dialog = await dialogPromise;
    expect(dialog).toEqual({ type: 'prompt', message: 'Enter your name:' });
    await expect(jsDialogTrapsPage.resultMessage).toHaveText('Hello,');
  });
});