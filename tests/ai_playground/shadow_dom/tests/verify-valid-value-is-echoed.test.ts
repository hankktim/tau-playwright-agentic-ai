// spec: tests/ai_playground/shadow_dom/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ShadowDomWidgetPage } from '../POM/ShadowDomWidgetPage';

test.describe('Shadow DOM Widget', () => {
  test('Verify Valid Value Is Echoed Exactly', async ({ page }) => {
    const shadowDomWidgetPage = new ShadowDomWidgetPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate challenge 11, Shadow DOM Widget.
    await shadowDomWidgetPage.navigateToChallenge();
    await expect(shadowDomWidgetPage.challengeHeading).toBeVisible();
    await expect(shadowDomWidgetPage.valueField).toBeVisible();
    await expect(shadowDomWidgetPage.submitButton).toBeVisible();
    await expect(shadowDomWidgetPage.resultMessage).toHaveCount(0);

    // 2. Enter `Playwright probe 123` in the textbox and activate the widget's Submit button.
    await shadowDomWidgetPage.setValue('Playwright probe 123');
    await expect(shadowDomWidgetPage.valueField).toHaveValue('Playwright probe 123');
    await shadowDomWidgetPage.clickSubmitButton();
    await expect(shadowDomWidgetPage.resultMessage).toHaveText('Echo: Playwright probe 123');
  });
});
