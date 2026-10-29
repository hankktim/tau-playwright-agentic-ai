import { type Locator, type Page } from '@playwright/test';

export class FileUploadValidatorPage {
  readonly page: Page;
  readonly challengeHeading: Locator;
  readonly challengeCard: Locator;
  readonly fileChooser: Locator;
  readonly submitButton: Locator;
  readonly acceptedMessage: Locator;
  readonly acceptedDetails: Locator;
  readonly noFileError: Locator;
  readonly invalidTypeError: Locator;
  readonly fileTooLargeError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', { name: '13. File Upload Validator' });
    this.challengeCard = this.challengeHeading.locator('..');
    this.fileChooser = this.challengeCard.getByRole('button', { name: 'Choose File' });
    this.submitButton = this.challengeCard.getByRole('button', { name: 'Validate & Upload' });
    this.acceptedMessage = this.challengeCard.getByText('File accepted', { exact: true });
    this.acceptedDetails = this.acceptedMessage.locator('..');
    this.noFileError = this.challengeCard.getByText('No file selected.', { exact: true });
    this.invalidTypeError = this.challengeCard.getByText(
      'Invalid file type: "text/plain". Only .jpg, .png, .pdf allowed.',
      { exact: true },
    );
    this.fileTooLargeError = this.challengeCard.getByText(
      'File too large: 2.00 MB. Maximum 2 MB.',
      { exact: true },
    );
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async selectFile(fileName: string, mimeType: string, sizeInBytes: number): Promise<void> {
    await this.fileChooser.setInputFiles({
      name: fileName,
      mimeType,
      buffer: Buffer.alloc(sizeInBytes),
    });
  }

  public async clickValidateAndUpload(): Promise<void> {
    await this.submitButton.click();
  }
}
