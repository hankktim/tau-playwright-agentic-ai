// spec: tests/ai_playground/multi_step_form/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { MultiStepFormPage } from '../POM/MultiStepFormPage';

test.describe('Multi-Step Form', () => {
  test('Verify Step 1 Rejects A Single-Word Name And Invalid Email', async ({ page }) => {
    const multiStepFormPage = new MultiStepFormPage(page);

    // 1. Open the playground in a fresh page and locate the form.
    await multiStepFormPage.navigateToChallenge();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 1 of 3');

    // 2. Submit a single-word name and malformed email, and verify validation.
    await multiStepFormPage.setFullName('Jane');
    await multiStepFormPage.setEmail('not-an-email');
    await multiStepFormPage.clickFirstStepNextButton();
    await expect(multiStepFormPage.fullNameError).toBeVisible();
    await expect(multiStepFormPage.emailError).toBeVisible();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 1 of 3');

    // 3. Correct both values and advance to step 2.
    await multiStepFormPage.setFullName('Jane Doe');
    await multiStepFormPage.setEmail('jane@example.com');
    await multiStepFormPage.clickFirstStepNextButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 2 of 3');
    await expect(multiStepFormPage.fullNameError).toBeHidden();
    await expect(multiStepFormPage.emailError).toBeHidden();
  });
});
