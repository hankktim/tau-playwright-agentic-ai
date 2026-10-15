// spec: tests/ai_playground/auto_dismiss_toast/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { AutoDismissToastPage } from '../POM/AutoDismissToastPage';

test.describe('Auto-Dismiss Toast', () => {
  test('Verify Toast Can Be Triggered Again After Dismissal', async ({ page }) => {
    const autoDismissToastPage = new AutoDismissToastPage(page);

    // 1. Open the playground fresh and inspect the initial Auto-Dismiss Toast state for the repeat-trigger scenario.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await expect(autoDismissToastPage.triggerToastButton).toBeVisible();
    await expect(autoDismissToastPage.triggerToastButton).toBeEnabled();
    await expect(autoDismissToastPage.initialToastMessage).toHaveCSS('opacity', '0');

    // 2. Click Trigger Toast and wait until “Action completed” reaches computed opacity 0.
    await autoDismissToastPage.clickTriggerToastButton();
    await expect(autoDismissToastPage.actionCompletedToast).toHaveText('Action completed');
    await expect(autoDismissToastPage.actionCompletedToast).toHaveCSS('opacity', '1');
    await expect(autoDismissToastPage.actionCompletedToast).toHaveCSS('opacity', '0');

    // 3. Click Trigger Toast again and wait for the toast to return to computed opacity 1, then wait for opacity to return to 0.
    await autoDismissToastPage.clickTriggerToastButton();
    await expect(autoDismissToastPage.actionCompletedToast).toHaveText('Action completed');
    await expect(autoDismissToastPage.actionCompletedToast).toHaveCSS('opacity', '1');
    await expect(autoDismissToastPage.actionCompletedToast).toHaveCSS('opacity', '0');
  });
});
