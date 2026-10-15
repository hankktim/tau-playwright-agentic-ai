// spec: tests/ai_playground/dynamic_selectors/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { DynamicSelectorsPage } from '../POM/DynamicSelectorsPage';

test.describe('Dynamic Selectors', () => {
  test('Verify Login Remains Usable After Generated Classes Change', async ({ page }) => {
    const dynamicSelectorsPage = new DynamicSelectorsPage(page);

    // 1. Open the challenge in a fresh page and locate the Dynamic Selectors login card.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await expect(dynamicSelectorsPage.loginCard).toBeVisible();
    await expect(dynamicSelectorsPage.usernameField).toHaveValue('');
    await expect(dynamicSelectorsPage.passwordField).toHaveValue('');
    await expect(dynamicSelectorsPage.loginButton).toBeVisible();

    // 2. Reload the page to generate a fresh set of classes and locate the controls by stable accessible names.
    await dynamicSelectorsPage.reloadPage();
    await expect(dynamicSelectorsPage.usernameField).toHaveValue('');
    await expect(dynamicSelectorsPage.passwordField).toHaveValue('');
    await expect(dynamicSelectorsPage.loginButton).toBeVisible();

    // 3. Fill both fields with nonblank values and submit the form.
    await dynamicSelectorsPage.setUsername('automation-user');
    await dynamicSelectorsPage.setPassword('challenge-pass');
    await dynamicSelectorsPage.clickLoginButton();
    await expect(dynamicSelectorsPage.loginSuccessMessage).toBeVisible();
    await expect(dynamicSelectorsPage.invalidCredentialsMessage).toBeHidden();
  });
});
