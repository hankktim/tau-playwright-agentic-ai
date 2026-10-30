import { test, expect } from '@playwright/test';
import { InvisibleSuccessPage } from '../../../../page_objects/InvisibleSuccessPage';

test.describe('Invisible Success', () => {
  test('Verify New Valid Submission Replaces Previous Result', async ({ page }) => {
    const invisibleSuccessPage = new InvisibleSuccessPage(page);

    // 1. Submit first@example.com and wait for its hidden result.
    await invisibleSuccessPage.navigateToPlayground();
    await invisibleSuccessPage.setEmail('first@example.com');
    await invisibleSuccessPage.clickSubmitButton();
    await expect(invisibleSuccessPage.resultParagraph).toContainText(
      'Confirmation sent to first@example.com.',
    );
    await expect(invisibleSuccessPage.resultParagraph).toBeHidden();

    // 2. Submit second@example.com and verify that it replaces the previous result.
    await invisibleSuccessPage.setEmail('second@example.com');
    await invisibleSuccessPage.clickSubmitButton();
    await expect(invisibleSuccessPage.resultParagraph).toHaveText(
      'Form submitted successfully. Confirmation sent to second@example.com.',
    );
    await expect(invisibleSuccessPage.resultParagraph).not.toContainText('first@example.com');
    await expect(invisibleSuccessPage.resultParagraph).toBeHidden();
  });
});
