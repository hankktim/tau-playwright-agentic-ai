import { test, expect } from '@playwright/test';
import { InvisibleSuccessPage } from '../../../../page_objects/InvisibleSuccessPage';

const invalidEmails = [
  '',
  '   ',
  'plainaddress',
  'user@',
  '@example.com',
  'user@example',
  'user name@example.com',
];

test.describe('Invisible Success', () => {
  test('Verify Invalid Emails Show Validation Error And No Success', async ({ context }) => {
    for (const invalidEmail of invalidEmails) {
      const page = await context.newPage();
      try {
        const invisibleSuccessPage = new InvisibleSuccessPage(page);

        // 1. Open a fresh page for this invalid-email data case.
        await invisibleSuccessPage.navigateToPlayground();

        // 2. Enter the invalid value and submit the card-scoped form.
        await invisibleSuccessPage.setEmail(invalidEmail);
        await invisibleSuccessPage.clickSubmitButton();
        await expect(invisibleSuccessPage.validationError).toBeVisible();
        await expect(invisibleSuccessPage.submitButton).toHaveText('Submit');
        await expect(invisibleSuccessPage.resultParagraph).toHaveText('', { timeout: 2000 });
      } finally {
        await page.close();
      }
    }
  });
});
