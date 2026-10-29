// spec: tests/ai_playground/file_upload_validator/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { FileUploadValidatorPage } from '../POM/FileUploadValidatorPage';

test.describe('File Upload Validator', () => {
  test('Verify MIME Type Rather Than Extension Controls Validation', async ({ page }) => {
    const fileUploadPage = new FileUploadValidatorPage(page);

    // 1. Open the playground and submit mislabeled.jpg with MIME type text/plain.
    await fileUploadPage.navigateToChallenge();
    await expect(fileUploadPage.challengeHeading).toBeVisible();
    await fileUploadPage.selectFile('mislabeled.jpg', 'text/plain', 10);
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.invalidTypeError).toBeVisible();
    await expect(fileUploadPage.acceptedMessage).not.toBeVisible();

    // 2. Replace it with image-as-text.txt using MIME type image/png, then submit.
    await fileUploadPage.selectFile('image-as-text.txt', 'image/png', 8);
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.acceptedMessage).toBeVisible();
    await expect(fileUploadPage.acceptedDetails).toContainText('Name: image-as-text.txt');
    await expect(fileUploadPage.acceptedDetails).toContainText('Type: image/png');
    await expect(fileUploadPage.invalidTypeError).not.toBeVisible();
  });
});