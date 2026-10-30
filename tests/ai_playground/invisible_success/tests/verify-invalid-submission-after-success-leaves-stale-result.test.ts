import { test, expect } from '@playwright/test';
import { InvisibleSuccessPage } from '../../../../page_objects/InvisibleSuccessPage';

test.describe('Invisible Success', () => {
  test(
    'Verify Invalid Submission After Success Leaves Stale Result',
    { tag: '@edge' },
    async ({ page }) => {
      test.info().annotations.push({
        type: 'current-behavior',
        description: 'Invalid submission leaves the previous success text unchanged; this is a stale-state finding, not a requirement.',
      });
      const invisibleSuccessPage = new InvisibleSuccessPage(page);

      // 1. Submit tester@example.com and wait for its hidden success result.
      await invisibleSuccessPage.navigateToPlayground();
      await invisibleSuccessPage.setEmail('tester@example.com');
      await invisibleSuccessPage.clickSubmitButton();
      await expect(invisibleSuccessPage.resultParagraph).toContainText(
        'Confirmation sent to tester@example.com.',
      );
      await expect(invisibleSuccessPage.resultParagraph).toBeHidden();

      // 2. Submit not-an-email and document the observed stale-result behavior.
      await invisibleSuccessPage.setEmail('not-an-email');
      await invisibleSuccessPage.clickSubmitButton();
      await expect(invisibleSuccessPage.validationError).toBeVisible();
      await expect(invisibleSuccessPage.resultParagraph).toHaveText(
        'Form submitted successfully. Confirmation sent to tester@example.com.',
      );
      await expect(invisibleSuccessPage.resultParagraph).toBeHidden();
    },
  );
});
