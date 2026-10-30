import { test, expect } from '@playwright/test';
import { InvisibleSuccessPage } from '../../../../page_objects/InvisibleSuccessPage';

test.describe('Invisible Success', () => {
  test('Verify Successful Submission Clears Previous Validation Error', async ({ page }) => {
    const invisibleSuccessPage = new InvisibleSuccessPage(page);

    // 1. Submit invalid-email to display the validation error.
    await invisibleSuccessPage.navigateToPlayground();
    await invisibleSuccessPage.setEmail('invalid-email');
    await invisibleSuccessPage.clickSubmitButton();
    await expect(invisibleSuccessPage.validationError).toBeVisible();
    await expect(invisibleSuccessPage.resultParagraph).toHaveText('');

    // 2. Replace the invalid value with tester@example.com and submit.
    await invisibleSuccessPage.setEmail('tester@example.com');
    await invisibleSuccessPage.clickSubmitButton();
    await expect(invisibleSuccessPage.validationError).toBeHidden();
    await expect(invisibleSuccessPage.resultParagraph).toHaveText(
      'Form submitted successfully. Confirmation sent to tester@example.com.',
    );
    await expect(invisibleSuccessPage.resultParagraph).toBeHidden();
  });
});
