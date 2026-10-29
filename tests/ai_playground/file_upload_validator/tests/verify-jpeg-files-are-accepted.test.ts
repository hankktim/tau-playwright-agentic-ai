// spec: tests/ai_playground/file_upload_validator/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { FileUploadValidatorPage } from '../POM/FileUploadValidatorPage';

test.describe('File Upload Validator', () => {
  test('Verify JPG And JPEG Files Are Accepted', async ({ page }) => {
    const fileUploadPage = new FileUploadValidatorPage(page);

    // 1. Open the playground in a fresh page and submit a small JPEG named sample.jpg.
    await fileUploadPage.navigateToChallenge();
    await expect(fileUploadPage.challengeHeading).toBeVisible();
    await fileUploadPage.selectFile('sample.jpg', 'image/jpeg', 10);
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.acceptedMessage).toBeVisible();
    await expect(fileUploadPage.acceptedDetails).toContainText('Name: sample.jpg');
    await expect(fileUploadPage.acceptedDetails).toContainText('Size: 0.0 KB');
    await expect(fileUploadPage.acceptedDetails).toContainText('Type: image/jpeg');
    await expect(fileUploadPage.noFileError).not.toBeVisible();
    await expect(fileUploadPage.invalidTypeError).not.toBeVisible();
    await expect(fileUploadPage.fileTooLargeError).not.toBeVisible();

    // 2. Replace the file with sample.jpeg and submit again.
    await fileUploadPage.selectFile('sample.jpeg', 'image/jpeg', 10);
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.acceptedMessage).toBeVisible();
    await expect(fileUploadPage.acceptedDetails).toContainText('Name: sample.jpeg');
    await expect(fileUploadPage.acceptedDetails).toContainText('Type: image/jpeg');
    await expect(fileUploadPage.noFileError).not.toBeVisible();
    await expect(fileUploadPage.invalidTypeError).not.toBeVisible();
    await expect(fileUploadPage.fileTooLargeError).not.toBeVisible();
  });
});