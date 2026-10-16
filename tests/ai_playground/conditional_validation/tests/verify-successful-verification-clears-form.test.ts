// spec: tests/ai_playground/conditional_validation/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ConditionalValidationPage } from '../POM/ConditionalValidationPage';

test.describe('Conditional Validation', () => {
  test('Verify Successful Verification Clears The Form', async ({ page }) => {
    const conditionalValidationPage = new ConditionalValidationPage(page);

    // 1. Open the playground in a fresh page, enter “qa@example.com” in Email, and activate Submit once.
    await conditionalValidationPage.navigateToChallenge();
    await conditionalValidationPage.setEmail('qa@example.com');
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.verificationCodeField).toBeVisible();

    // 2. Enter the six-digit code “123456” and activate Submit.
    await conditionalValidationPage.setVerificationCode('123456');
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.successMessage).toBeVisible();
    await expect(conditionalValidationPage.verificationCodeField).toBeHidden();
    await expect(conditionalValidationPage.emailField).toHaveValue('');
    await expect(conditionalValidationPage.verificationCodeField).toHaveValue('');
  });
});
