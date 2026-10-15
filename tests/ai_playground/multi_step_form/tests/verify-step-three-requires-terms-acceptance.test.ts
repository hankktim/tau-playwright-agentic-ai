// spec: tests/ai_playground/multi_step_form/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { MultiStepFormPage } from '../POM/MultiStepFormPage';

test.describe('Multi-Step Form', () => {
  test('Verify Terms Acceptance Is Required Before Submission', async ({ page }) => {
    const multiStepFormPage = new MultiStepFormPage(page);

    // 1. Open a fresh page and complete steps 1 and 2 with valid required values.
    await multiStepFormPage.navigateToChallenge();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 1 of 3');
    await multiStepFormPage.setFullName('Taylor Kim');
    await multiStepFormPage.setEmail('taylor.kim@example.com');
    await multiStepFormPage.clickFirstStepNextButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 2 of 3');
    await multiStepFormPage.selectCountry('DE');
    await multiStepFormPage.clickSecondStepNextButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 3 of 3');
    await expect(multiStepFormPage.termsCheckbox).toBeVisible();
    await expect(multiStepFormPage.termsCheckbox).not.toBeChecked();
    await expect(multiStepFormPage.submitButton).toBeVisible();

    // 2. Submit without accepting the terms and verify the validation message.
    await multiStepFormPage.clickSubmitButton();
    await expect(multiStepFormPage.termsError).toBeVisible();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 3 of 3');
    await expect(multiStepFormPage.successMessage).toBeHidden();

    // 3. Accept the terms and submit the form.
    await multiStepFormPage.checkTerms();
    await multiStepFormPage.clickSubmitButton();
    await expect(multiStepFormPage.successMessage).toBeVisible();
  });
});
