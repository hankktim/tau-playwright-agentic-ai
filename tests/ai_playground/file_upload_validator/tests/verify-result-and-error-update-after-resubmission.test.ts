// spec: tests/ai_playground/file_upload_validator/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { FileUploadValidatorPage } from '../POM/FileUploadValidatorPage';

test.describe('File Upload Validator', () => {
  test('Verify Result And Error Update After Resubmission', async ({ page }) => {
    const fileUploadPage = new FileUploadValidatorPage(page);

    // 1. Open the playground and submit a small valid PNG.
    await fileUploadPage.navigateToChallenge();
    await expect(fileUploadPage.challengeHeading).toBeVisible();
    await fileUploadPage.selectFile('first.png', 'image/png', 8);
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.acceptedMessage).toBeVisible();
    await expect(fileUploadPage.noFileError).not.toBeVisible();
    await expect(fileUploadPage.invalidTypeError).not.toBeVisible();
    await expect(fileUploadPage.fileTooLargeError).not.toBeVisible();

    // 2. Replace it with an unsupported text/plain file and submit again.
    await fileUploadPage.selectFile('second.txt', 'text/plain', 12);
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.invalidTypeError).toBeVisible();
    await expect(fileUploadPage.acceptedMessage).not.toBeVisible();

    // 3. Replace it with a small valid PDF and submit again.
    await fileUploadPage.selectFile('final.pdf', 'application/pdf', 17);
    await fileUploadPage.clickValidateAndUpload();
    await expect(fileUploadPage.acceptedMessage).toBeVisible();
    await expect(fileUploadPage.acceptedDetails).toContainText('Name: final.pdf');
    await expect(fileUploadPage.acceptedDetails).toContainText('Type: application/pdf');
    await expect(fileUploadPage.invalidTypeError).not.toBeVisible();
  });
});