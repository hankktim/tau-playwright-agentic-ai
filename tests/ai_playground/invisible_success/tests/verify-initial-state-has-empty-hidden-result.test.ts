import { test, expect } from '@playwright/test';
import { InvisibleSuccessPage } from '../../../../page_objects/InvisibleSuccessPage';

test.describe('Invisible Success', () => {
  test('Verify Initial State Has Empty Hidden Result', async ({ page }) => {
    const invisibleSuccessPage = new InvisibleSuccessPage(page);

    // 1. Open the playground in a fresh page and locate the card by its heading.
    await invisibleSuccessPage.navigateToPlayground();
    await expect(invisibleSuccessPage.emailField).toBeVisible();
    await expect(invisibleSuccessPage.emailField).toBeEnabled();
    await expect(invisibleSuccessPage.emailField).toHaveValue('');
    await expect(invisibleSuccessPage.submitButton).toBeVisible();
    await expect(invisibleSuccessPage.submitButton).toBeEnabled();
    await expect(invisibleSuccessPage.submitButton).toHaveText('Submit');
    await expect(invisibleSuccessPage.validationError).toBeHidden();

    // 2. Inspect the result paragraph without submitting anything.
    await expect(invisibleSuccessPage.resultParagraph).toBeAttached();
    await expect(invisibleSuccessPage.resultParagraph).toBeHidden();
    await expect(invisibleSuccessPage.resultParagraph).toHaveText('');
  });
});
