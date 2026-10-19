// spec: tests/ai_playground/shadow_dom/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ShadowDomWidgetPage } from '../POM/ShadowDomWidgetPage';

test.describe('Shadow DOM Widget', () => {
  test('Verify Enter Key Does Not Submit Without Button Activation', async ({ page }) => {
    const shadowDomWidgetPage = new ShadowDomWidgetPage(page);

    // 1. Open the AI Testing Playground in a fresh page and enter `keyboard submit` in the widget textbox.
    await shadowDomWidgetPage.navigateToChallenge();
    await expect(shadowDomWidgetPage.challengeHeading).toBeVisible();
    await shadowDomWidgetPage.setValue('keyboard submit');
    await expect(shadowDomWidgetPage.valueField).toHaveValue('keyboard submit');
    await expect(shadowDomWidgetPage.resultMessage).toHaveCount(0);

    // 2. Press Enter while the textbox is focused.
    await shadowDomWidgetPage.pressEnter();
    await expect(shadowDomWidgetPage.resultMessage).toHaveCount(0);

    // 3. Activate the widget's Submit button.
    await shadowDomWidgetPage.clickSubmitButton();
    await expect(shadowDomWidgetPage.resultMessage).toHaveText('Echo: keyboard submit');
  });
});
