// spec: tests/ai_playground/conditional_validation/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ConditionalValidationPage } from '../POM/ConditionalValidationPage';

test.describe('Conditional Validation', () => {
  test('Verify Editing Email Resets Verification Requirement', async ({ page }) => {
    const conditionalValidationPage = new ConditionalValidationPage(page);

    // 1. Open the playground in a fresh page, enter “qa@example.com” in Email, and activate Submit once to reveal verification.
    await conditionalValidationPage.navigateToChallenge();
    await conditionalValidationPage.setEmail('qa@example.com');
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.verificationCodeField).toBeVisible();
    await expect(conditionalValidationPage.verificationPrompt).toBeVisible();

    // 2. Enter “12345” in Verification code, activate Submit to trigger code validation, then change Email to “new.qa@example.com”.
    await conditionalValidationPage.setVerificationCode('12345');
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.verificationCodeError).toBeVisible();
    await conditionalValidationPage.setEmail('new.qa@example.com');
    await expect(conditionalValidationPage.verificationCodeField).toBeHidden();
    await expect(conditionalValidationPage.verificationCodeField).toHaveValue('');
    await expect(conditionalValidationPage.verificationPrompt).not.toBeVisible();
    await expect(conditionalValidationPage.verificationCodeError).not.toBeVisible();

    // 3. Activate Submit using the changed valid email.
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.verificationCodeField).toBeVisible();
    await expect(conditionalValidationPage.verificationPrompt).toBeVisible();
    await expect(conditionalValidationPage.successMessage).not.toBeVisible();
  });
});
