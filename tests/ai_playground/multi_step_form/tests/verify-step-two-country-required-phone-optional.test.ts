// spec: tests/ai_playground/multi_step_form/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { MultiStepFormPage } from '../POM/MultiStepFormPage';

test.describe('Multi-Step Form', () => {
  test('Verify Country Is Required And Phone Is Optional', async ({ page }) => {
    const multiStepFormPage = new MultiStepFormPage(page);

    // 1. Open the playground, enter valid step 1 values, and advance to step 2.
    await multiStepFormPage.navigateToChallenge();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 1 of 3');
    await multiStepFormPage.setFullName('Morgan Lee');
    await multiStepFormPage.setEmail('morgan.lee@example.com');
    await multiStepFormPage.clickFirstStepNextButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 2 of 3');
    await expect(multiStepFormPage.countryField).toBeVisible();
    await expect(multiStepFormPage.phoneField).toBeVisible();

    // 2. Leave Country and Phone blank and try to advance.
    await multiStepFormPage.clickSecondStepNextButton();
    await expect(multiStepFormPage.countryError).toBeVisible();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 2 of 3');

    // 3. Select a country, keep Phone blank, and advance to step 3.
    await multiStepFormPage.selectCountry('UK');
    await expect(multiStepFormPage.phoneField).toHaveValue('');
    await multiStepFormPage.clickSecondStepNextButton();
    await expect(multiStepFormPage.stepIndicator).toHaveText('Step 3 of 3');
    await expect(multiStepFormPage.countryError).toBeHidden();
  });
});
