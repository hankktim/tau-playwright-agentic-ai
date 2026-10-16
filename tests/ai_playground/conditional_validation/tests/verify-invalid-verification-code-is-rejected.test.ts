// spec: tests/ai_playground/conditional_validation/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ConditionalValidationPage } from '../POM/ConditionalValidationPage';

test.describe('Conditional Validation', () => {
  test('Verify Missing And Invalid Verification Codes Are Rejected', async ({ page }) => {
    const conditionalValidationPage = new ConditionalValidationPage(page);

    // 1. Open the playground in a fresh page, enter “qa@example.com” in Email, and activate Submit once to reveal verification.
    await conditionalValidationPage.navigateToChallenge();
    await conditionalValidationPage.setEmail('qa@example.com');
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.verificationCodeField).toBeVisible();
    await expect(conditionalValidationPage.verificationPrompt).toBeVisible();

    // 2. Leave Verification code empty and activate Submit.
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.verificationCodeError).toBeVisible();
    await expect(conditionalValidationPage.verificationCodeField).toBeVisible();
    await expect(conditionalValidationPage.successMessage).not.toBeVisible();

    // 3. Enter a five-digit value such as “12345” and activate Submit.
    await conditionalValidationPage.setVerificationCode('12345');
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.verificationCodeError).toBeVisible();
    await expect(conditionalValidationPage.verificationPrompt).toBeVisible();

    // 4. Enter a six-character value containing a non-digit, such as “12a456”, and activate Submit.
    await conditionalValidationPage.setVerificationCode('12a456');
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.verificationCodeError).toBeVisible();
    await expect(conditionalValidationPage.successMessage).not.toBeVisible();
  });
});
