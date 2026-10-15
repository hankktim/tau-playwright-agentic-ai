// spec: tests/ai_playground/dynamic_selectors/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { DynamicSelectorsPage } from '../POM/DynamicSelectorsPage';

test.describe('Dynamic Selectors', () => {
  test('Verify Successful Login Clears Previous Error', async ({ page }) => {
    const dynamicSelectorsPage = new DynamicSelectorsPage(page);

    // 1. Open the challenge in a fresh page and submit with both fields empty.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await dynamicSelectorsPage.clickLoginButton();
    await expect(dynamicSelectorsPage.invalidCredentialsMessage).toBeVisible();

    // 2. Fill both fields with nonblank values and submit using the card-scoped Login button.
    await dynamicSelectorsPage.setUsername('automation-user');
    await dynamicSelectorsPage.setPassword('challenge-pass');
    await dynamicSelectorsPage.clickLoginButton();
    await expect(dynamicSelectorsPage.loginSuccessMessage).toBeVisible();
    await expect(dynamicSelectorsPage.invalidCredentialsMessage).toBeHidden();
  });
});
