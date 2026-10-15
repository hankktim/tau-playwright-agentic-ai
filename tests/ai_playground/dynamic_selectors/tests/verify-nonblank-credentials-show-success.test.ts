// spec: tests/ai_playground/dynamic_selectors/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { DynamicSelectorsPage } from '../POM/DynamicSelectorsPage';

test.describe('Dynamic Selectors', () => {
  test('Verify Nonblank Credentials Show Success', async ({ page }) => {
    const dynamicSelectorsPage = new DynamicSelectorsPage(page);

    // 1. Open the challenge in a fresh page and fill both fields with nonblank values.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await dynamicSelectorsPage.setUsername('automation-user');
    await dynamicSelectorsPage.setPassword('challenge-pass');
    await expect(dynamicSelectorsPage.invalidCredentialsMessage).toBeHidden();
    await expect(dynamicSelectorsPage.loginSuccessMessage).toBeHidden();

    // 2. Click the Login button scoped to the Dynamic Selectors card.
    await dynamicSelectorsPage.clickLoginButton();
    await expect(dynamicSelectorsPage.loginSuccessMessage).toBeVisible();
    await expect(dynamicSelectorsPage.invalidCredentialsMessage).toBeHidden();
  });
});
