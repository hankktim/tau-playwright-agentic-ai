// spec: tests/ai_playground/auto_dismiss_toast/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { AutoDismissToastPage } from '../POM/AutoDismissToastPage';

test.describe('Auto-Dismiss Toast', () => {
  test('Verify Toast Appears And Auto-Dismisses', async ({ page }) => {
    const autoDismissToastPage = new AutoDismissToastPage(page);

    // 1. Open the playground fresh and inspect the initial Auto-Dismiss Toast state.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await expect(autoDismissToastPage.triggerToastButton).toBeVisible();
    await expect(autoDismissToastPage.triggerToastButton).toBeEnabled();
    await expect(autoDismissToastPage.initialToastMessage).toHaveCSS('opacity', '0');

    // 2. Click Trigger Toast once, then locate the exact “Action completed” message.
    await autoDismissToastPage.clickTriggerToastButton();
    await expect(autoDismissToastPage.actionCompletedToast).toHaveText('Action completed');
    await expect(autoDismissToastPage.actionCompletedToast).toHaveCSS('opacity', '1');

    // 3. Wait for the toast's computed opacity to return to 0 using a retrying assertion.
    await expect(autoDismissToastPage.actionCompletedToast).toHaveCSS('opacity', '0');
  });
});
