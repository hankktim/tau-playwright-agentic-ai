// spec: tests/ai_playground/multi_step_form/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { MultiStepFormPage } from '../POM/MultiStepFormPage';

test.describe('Multi-Step Form', () => {
  test('Verify Successful Completion Across All Three Steps', async ({ page }) => {
    const multiStepFormPage = new MultiStepFormPage(page);

    // 1. Open the playground fresh and inspect the Multi-Step Form's initial state.
    await multiStepFormPage.navigateToChallenge();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 1 of 3');
    await expect(multiStepFormPage.fullNameField).toBeVisible();
    await expect(multiStepFormPage.emailField).toBeVisible();
    await expect(multiStepFormPage.firstStepNextButton).toBeVisible();
    await expect(multiStepFormPage.successMessage).toBeHidden();

    // 2. Enter the valid full name and email, then advance to step 2.
    await multiStepFormPage.setFullName('Alex Rivera');
    await multiStepFormPage.setEmail('alex.rivera@example.com');
    await multiStepFormPage.clickFirstStepNextButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 2 of 3');
    await expect(multiStepFormPage.countryField).toBeVisible();
    await expect(multiStepFormPage.phoneField).toBeVisible();

    // 3. Select a country, enter the optional phone number, and advance to step 3.
    await multiStepFormPage.selectCountry('US');
    await multiStepFormPage.setPhone('+1 555 010 2020');
    await multiStepFormPage.clickSecondStepNextButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 3 of 3');
    await expect(multiStepFormPage.commentsField).toBeVisible();
    await expect(multiStepFormPage.termsCheckbox).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back', exact: true })).toBeVisible();
    await expect(multiStepFormPage.submitButton).toBeVisible();

    // 4. Enter comments, accept the terms, and submit the form.
    await multiStepFormPage.setComments('Please contact me by email.');
    await multiStepFormPage.checkTerms();
    await multiStepFormPage.clickSubmitButton();
    await expect(multiStepFormPage.successMessage).toBeVisible();
    await expect(multiStepFormPage.fullNameField).toBeHidden();
    await expect(multiStepFormPage.countryField).toBeHidden();
  });
});
