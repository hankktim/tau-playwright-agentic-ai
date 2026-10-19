// spec: tests/ai_playground/shadow_dom/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ShadowDomWidgetPage } from '../POM/ShadowDomWidgetPage';

test.describe('Shadow DOM Widget', () => {
  test('Verify Empty And Whitespace Values Are Rejected', async ({ page }) => {
    const shadowDomWidgetPage = new ShadowDomWidgetPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate challenge 11. Leave the textbox empty and activate Submit.
    await shadowDomWidgetPage.navigateToChallenge();
    await expect(shadowDomWidgetPage.challengeHeading).toBeVisible();
    await shadowDomWidgetPage.clickSubmitButton();
    await expect(shadowDomWidgetPage.resultMessage).toHaveText('Please enter a value.');
    await expect(shadowDomWidgetPage.resultMessage).not.toHaveText(/^Echo:/);

    // 2. Enter only spaces in the textbox and activate Submit again.
    await shadowDomWidgetPage.setValue('   ');
    await shadowDomWidgetPage.clickSubmitButton();
    await expect(shadowDomWidgetPage.resultMessage).toHaveText('Please enter a value.');
    await expect(shadowDomWidgetPage.resultMessage).not.toHaveText(/^Echo:/);
  });
});
