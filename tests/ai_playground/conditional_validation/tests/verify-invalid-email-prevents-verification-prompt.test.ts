// spec: tests/ai_playground/conditional_validation/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ConditionalValidationPage } from '../POM/ConditionalValidationPage';

test.describe('Conditional Validation', () => {
  test('Verify Invalid Email Prevents Verification Prompt', async ({ page }) => {
    const conditionalValidationPage = new ConditionalValidationPage(page);

    // 1. Open the playground in a fresh page and locate the Conditional Validation challenge. Leave the Email field empty and activate its Submit button.
    await conditionalValidationPage.navigateToChallenge();
    await expect(conditionalValidationPage.challengeHeading).toBeVisible();
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.emailError).toBeVisible();
    await expect(conditionalValidationPage.verificationCodeField).toBeHidden();
    await expect(conditionalValidationPage.verificationPrompt).not.toBeVisible();
    await expect(conditionalValidationPage.successMessage).not.toBeVisible();

    // 2. Enter a malformed email such as “not-an-email” and activate Submit again.
    await conditionalValidationPage.setEmail('not-an-email');
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.emailError).toBeVisible();
    await expect(conditionalValidationPage.verificationCodeField).toBeHidden();
    await expect(conditionalValidationPage.successMessage).not.toBeVisible();
  });
});
