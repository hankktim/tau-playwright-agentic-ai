// spec: tests/ai_playground/file_upload_validator/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { FileUploadValidatorPage } from '../POM/FileUploadValidatorPage';

test.describe('File Upload Validator', () => {
  test('Verify Unsupported MIME Type Is Rejected', async ({ page }) => {
    const fileUploadPage = new FileUploadValidatorPage(page);

    // 1. Open the playground and submit notes.txt with MIME type text/plain.
    await fileUploadPage.navigateToChallenge();
    await expect(fileUploadPage.challengeHeading).toBeVisible();
    await fileUploadPage.selectFile('notes.txt', 'text/plain', 12);
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.invalidTypeError).toBeVisible();
    await expect(fileUploadPage.acceptedMessage).not.toBeVisible();
  });
});