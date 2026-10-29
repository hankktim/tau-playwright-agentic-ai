// spec: tests/ai_playground/file_upload_validator/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { FileUploadValidatorPage } from '../POM/FileUploadValidatorPage';

test.describe('File Upload Validator', () => {
  test('Verify File Over The Maximum Size Is Rejected', async ({ page }) => {
    const fileUploadPage = new FileUploadValidatorPage(page);

    // 1. Open the playground and submit a PNG fixture of 2,097,153 bytes.
    await fileUploadPage.navigateToChallenge();
    await expect(fileUploadPage.challengeHeading).toBeVisible();
    await fileUploadPage.selectFile('over-limit.png', 'image/png', 2_097_153);
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.fileTooLargeError).toBeVisible();
    await expect(fileUploadPage.acceptedMessage).not.toBeVisible();
  });
});