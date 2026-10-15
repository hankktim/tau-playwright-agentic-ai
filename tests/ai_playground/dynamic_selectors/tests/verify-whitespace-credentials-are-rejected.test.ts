// spec: tests/ai_playground/dynamic_selectors/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { DynamicSelectorsPage } from '../POM/DynamicSelectorsPage';

test.describe('Dynamic Selectors', () => {
  test('Verify Whitespace-Only Credentials Are Rejected', async ({ page }) => {
    const dynamicSelectorsPage = new DynamicSelectorsPage(page);

    // 1. Open the challenge in a fresh page and fill both fields with whitespace only.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await dynamicSelectorsPage.setUsername('   ');
    await dynamicSelectorsPage.setPassword('   ');
    await expect(dynamicSelectorsPage.usernameField).toHaveValue('   ');
    await expect(dynamicSelectorsPage.passwordField).toHaveValue('   ');
    await expect(dynamicSelectorsPage.invalidCredentialsMessage).toBeHidden();
    await expect(dynamicSelectorsPage.loginSuccessMessage).toBeHidden();

    // 2. Click the Login button scoped to the Dynamic Selectors card.
    await dynamicSelectorsPage.clickLoginButton();
    await expect(dynamicSelectorsPage.invalidCredentialsMessage).toBeVisible();
    await expect(dynamicSelectorsPage.loginSuccessMessage).toBeHidden();
  });
});
