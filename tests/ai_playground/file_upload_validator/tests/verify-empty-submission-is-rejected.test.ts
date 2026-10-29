// spec: tests/ai_playground/file_upload_validator/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { FileUploadValidatorPage } from '../POM/FileUploadValidatorPage';

test.describe('File Upload Validator', () => {
  test('Verify Empty Submission Is Rejected', async ({ page }) => {
    const fileUploadPage = new FileUploadValidatorPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate challenge 13, File Upload Validator. Do not select a file.
    await fileUploadPage.navigateToChallenge();
    await expect(fileUploadPage.challengeHeading).toBeVisible();
    await expect(fileUploadPage.fileChooser).toBeVisible();
    await expect(fileUploadPage.submitButton).toBeVisible();
    await expect(fileUploadPage.noFileError).not.toBeVisible();
    await expect(fileUploadPage.acceptedMessage).not.toBeVisible();

    // 2. Click “Validate & Upload” without selecting a file.
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.noFileError).toBeVisible();
    await expect(fileUploadPage.acceptedMessage).not.toBeVisible();
  });
});