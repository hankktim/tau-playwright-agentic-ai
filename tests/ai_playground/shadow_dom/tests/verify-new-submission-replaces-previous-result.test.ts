// spec: tests/ai_playground/shadow_dom/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ShadowDomWidgetPage } from '../POM/ShadowDomWidgetPage';

test.describe('Shadow DOM Widget', () => {
  test('Verify New Submission Replaces Previous Result', async ({ page }) => {
    const shadowDomWidgetPage = new ShadowDomWidgetPage(page);

    // 1. Open the AI Testing Playground in a fresh page. Enter `first value` and activate Submit.
    await shadowDomWidgetPage.navigateToChallenge();
    await expect(shadowDomWidgetPage.challengeHeading).toBeVisible();
    await shadowDomWidgetPage.setValue('first value');
    await shadowDomWidgetPage.clickSubmitButton();
    await expect(shadowDomWidgetPage.resultMessage).toHaveText('Echo: first value');

    // 2. Replace the textbox value with `second value` and activate Submit.
    await shadowDomWidgetPage.setValue('second value');
    await shadowDomWidgetPage.clickSubmitButton();
    await expect(shadowDomWidgetPage.resultMessage).toHaveText('Echo: second value');
    await expect(shadowDomWidgetPage.resultMessage).not.toHaveText('Echo: first value');

    // 3. Clear the textbox and activate Submit once more.
    await shadowDomWidgetPage.clearValue();
    await shadowDomWidgetPage.clickSubmitButton();
    await expect(shadowDomWidgetPage.resultMessage).toHaveText('Please enter a value.');
    await expect(shadowDomWidgetPage.resultMessage).not.toHaveText('Echo: second value');
  });
});
