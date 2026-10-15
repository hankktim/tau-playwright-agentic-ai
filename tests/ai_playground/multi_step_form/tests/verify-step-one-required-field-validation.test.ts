// spec: tests/ai_playground/multi_step_form/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { MultiStepFormPage } from '../POM/MultiStepFormPage';

test.describe('Multi-Step Form', () => {
  test('Verify Step 1 Rejects Missing Required Values', async ({ page }) => {
    const multiStepFormPage = new MultiStepFormPage(page);

    // 1. Open the playground in a fresh page and inspect the initial form state.
    await multiStepFormPage.navigateToChallenge();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 1 of 3');
    await expect(multiStepFormPage.fullNameField).toBeVisible();
    await expect(multiStepFormPage.emailField).toBeVisible();
    await expect(multiStepFormPage.firstStepNextButton).toBeVisible();

    // 2. Submit step 1 with both required fields empty.
    await multiStepFormPage.clickFirstStepNextButton();
    await expect(multiStepFormPage.fullNameError).toBeVisible();
    await expect(multiStepFormPage.emailError).toBeVisible();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 1 of 3');
    await expect(multiStepFormPage.successMessage).toBeHidden();
  });
});
