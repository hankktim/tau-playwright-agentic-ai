// spec: tests/ai_playground/file_upload_validator/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { FileUploadValidatorPage } from '../POM/FileUploadValidatorPage';

test.describe('File Upload Validator', () => {
  test('Verify Zero-Byte File Behavior', async ({ page }) => {
    const fileUploadPage = new FileUploadValidatorPage(page);

    // 1. Open the playground and submit a zero-byte empty.png with MIME type image/png.
    await fileUploadPage.navigateToChallenge();
    await expect(fileUploadPage.challengeHeading).toBeVisible();
    await fileUploadPage.selectFile('empty.png', 'image/png', 0);
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.acceptedMessage).toBeVisible();
    await expect(fileUploadPage.acceptedDetails).toContainText('Name: empty.png');
    await expect(fileUploadPage.acceptedDetails).toContainText('Size: 0.0 KB');
    await expect(fileUploadPage.acceptedDetails).toContainText('Type: image/png');
    await expect(fileUploadPage.noFileError).not.toBeVisible();
    await expect(fileUploadPage.invalidTypeError).not.toBeVisible();
    await expect(fileUploadPage.fileTooLargeError).not.toBeVisible();
  });
});