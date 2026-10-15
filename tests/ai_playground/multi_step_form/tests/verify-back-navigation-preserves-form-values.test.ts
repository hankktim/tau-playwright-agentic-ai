// spec: tests/ai_playground/multi_step_form/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { MultiStepFormPage } from '../POM/MultiStepFormPage';

test.describe('Multi-Step Form', () => {
  test('Verify Back Navigation Preserves Earlier Step Values', async ({ page }) => {
    const multiStepFormPage = new MultiStepFormPage(page);

    // 1. Open a fresh page, enter valid name and email, and advance to step 2.
    await multiStepFormPage.navigateToChallenge();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 1 of 3');
    await multiStepFormPage.setFullName('Casey Morgan');
    await multiStepFormPage.setEmail('casey.morgan@example.com');
    await multiStepFormPage.clickFirstStepNextButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 2 of 3');
    await expect(multiStepFormPage.countryField).toBeVisible();
    await expect(multiStepFormPage.phoneField).toBeVisible();

    // 2. Enter country and phone, advance to step 3, then go Back to step 2.
    await multiStepFormPage.selectCountry('FR');
    await multiStepFormPage.setPhone('+33 6 12 34 56 78');
    await multiStepFormPage.clickSecondStepNextButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 3 of 3');
    await multiStepFormPage.clickThirdStepBackButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 2 of 3');
    await expect(multiStepFormPage.countryField).toHaveValue('FR');
    await expect(multiStepFormPage.phoneField).toHaveValue('+33 6 12 34 56 78');

    // 3. Go Back to step 1 and verify the name and email are preserved.
    await multiStepFormPage.clickSecondStepBackButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 1 of 3');
    await expect(multiStepFormPage.fullNameField).toHaveValue('Casey Morgan');
    await expect(multiStepFormPage.emailField).toHaveValue('casey.morgan@example.com');
  });
});
