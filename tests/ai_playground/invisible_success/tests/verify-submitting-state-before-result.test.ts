import { test, expect } from '@playwright/test';
import { InvisibleSuccessPage } from '../../../../page_objects/InvisibleSuccessPage';

test.describe('Invisible Success', () => {
  test('Verify Submit Button Shows Submitting State Before Result Is Written', async ({ page }) => {
    const invisibleSuccessPage = new InvisibleSuccessPage(page);

    // 1. Open a fresh playground page and enter tester@example.com.
    await invisibleSuccessPage.navigateToPlayground();
    await invisibleSuccessPage.setEmail('tester@example.com');
    await expect(invisibleSuccessPage.submitButton).toHaveText('Submit');

    // 2. Click Submit and assert its exact transient text with a retrying assertion.
    await invisibleSuccessPage.clickSubmitButton();
    await expect(invisibleSuccessPage.submitButtonState).toHaveText('Submitting…', { timeout: 2000 });
    await expect(invisibleSuccessPage.resultParagraph).toHaveText('');

    // 3. Wait for submission completion using retrying assertions, not a fixed timeout.
    await expect(invisibleSuccessPage.submitButton).toHaveText('Submit');
    await expect(invisibleSuccessPage.resultParagraph).toContainText(
      'Confirmation sent to tester@example.com',
    );
  });
});
