import { test, expect } from '@playwright/test';
import { InvisibleSuccessPage } from '../../../../page_objects/InvisibleSuccessPage';

test.describe('Invisible Success', () => {
  test('Verify Valid Email Writes Success Message To Hidden Result', async ({ page }) => {
    const invisibleSuccessPage = new InvisibleSuccessPage(page);

    // 1. Open the playground in a fresh page and locate challenge 16 by its heading.
    await invisibleSuccessPage.navigateToPlayground();
    await expect(invisibleSuccessPage.resultParagraph).toHaveText('');

    // 2. Enter tester@example.com and click the card-scoped Submit button.
    await invisibleSuccessPage.setEmail('tester@example.com');
    await invisibleSuccessPage.clickSubmitButton();
    await expect(invisibleSuccessPage.validationError).toBeHidden();

    // 3. Wait for the result text with retrying assertions rather than a fixed sleep.
    await expect(invisibleSuccessPage.resultParagraph).toHaveText(
      'Form submitted successfully. Confirmation sent to tester@example.com.',
    );
    await expect(invisibleSuccessPage.resultParagraph).toBeHidden();
    await expect(invisibleSuccessPage.submitButton).toHaveText('Submit');
  });
});
