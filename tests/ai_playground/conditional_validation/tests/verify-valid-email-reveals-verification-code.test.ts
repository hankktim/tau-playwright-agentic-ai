// spec: tests/ai_playground/conditional_validation/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ConditionalValidationPage } from '../POM/ConditionalValidationPage';

test.describe('Conditional Validation', () => {
  test('Verify Valid Email Reveals Required Verification Code', async ({ page }) => {
    const conditionalValidationPage = new ConditionalValidationPage(page);

    // 1. Open the playground in a fresh page and locate the Conditional Validation challenge.
    await conditionalValidationPage.navigateToChallenge();
    await expect(conditionalValidationPage.challengeHeading).toBeVisible();
    await expect(conditionalValidationPage.emailField).toBeVisible();
    await expect(conditionalValidationPage.submitButton).toBeVisible();
    await expect(conditionalValidationPage.verificationCodeField).toBeHidden();

    // 2. Enter “qa@example.com” as the email and activate Submit once.
    await conditionalValidationPage.setEmail('qa@example.com');
    await conditionalValidationPage.clickSubmitButton();
    await expect(conditionalValidationPage.verificationCodeField).toBeVisible();
    await expect(conditionalValidationPage.verificationPrompt).toBeVisible();
    await expect(conditionalValidationPage.successMessage).not.toBeVisible();
  });
});
