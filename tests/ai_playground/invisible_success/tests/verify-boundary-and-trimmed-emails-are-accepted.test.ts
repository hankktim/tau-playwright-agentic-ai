import { test, expect } from '@playwright/test';
import { InvisibleSuccessPage } from '../../../../page_objects/InvisibleSuccessPage';

test.describe('Invisible Success', () => {
  test('Verify Minimal Valid Email And Trimmed Input Are Accepted', async ({ page, context }) => {
    const minimalEmailPage = new InvisibleSuccessPage(page);

    // 1. Submit the minimal valid email on a fresh page.
    await minimalEmailPage.navigateToPlayground();
    await minimalEmailPage.setEmail('a@b.c');
    await minimalEmailPage.clickSubmitButton();
    await expect(minimalEmailPage.validationError).toBeHidden();
    await expect(minimalEmailPage.resultParagraph).toHaveText(
      'Form submitted successfully. Confirmation sent to a@b.c.',
    );
    await expect(minimalEmailPage.resultParagraph).toBeHidden();

    // 2. Submit the whitespace-padded email from a separate fresh page.
    const trimmedEmailPage = new InvisibleSuccessPage(await context.newPage());
    try {
      await trimmedEmailPage.navigateToPlayground();
      await trimmedEmailPage.setEmail('  tester@example.com  ');
      await trimmedEmailPage.clickSubmitButton();
      await expect(trimmedEmailPage.validationError).toBeHidden();
      await expect(trimmedEmailPage.resultParagraph).toContainText(
        'Confirmation sent to tester@example.com.',
      );
      await expect(trimmedEmailPage.resultParagraph).toBeHidden();
    } finally {
      await trimmedEmailPage.page.close();
    }
  });
});
