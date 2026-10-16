import { type Locator, type Page } from '@playwright/test';

export class ConditionalValidationPage {
  readonly page: Page;
  readonly challengeCard: Locator;
  readonly challengeHeading: Locator;
  readonly emailField: Locator;
  readonly verificationCodeField: Locator;
  readonly emailError: Locator;
  readonly verificationCodeError: Locator;
  readonly verificationPrompt: Locator;
  readonly successMessage: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', { name: '7. Conditional Validation' });
    this.challengeCard = this.challengeHeading.locator('..');
    this.emailField = this.challengeCard.getByPlaceholder('you@example.com');
    this.verificationCodeField = this.challengeCard.getByPlaceholder('6-digit code');
    this.emailError = this.challengeCard.getByText('Valid email required', { exact: true });
    this.verificationCodeError = this.challengeCard.getByText('Valid 6-digit code required', { exact: true });
    this.verificationPrompt = this.challengeCard.getByText('Verification required. Please enter the code.', { exact: true });
    this.successMessage = this.challengeCard.getByText('Submitted successfully.', { exact: true });
    this.submitButton = this.challengeCard.getByRole('button', { name: 'Submit', exact: true });
  }

  async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  async setEmail(value: string): Promise<void> {
    await this.emailField.fill(value);
  }

  async setVerificationCode(value: string): Promise<void> {
    await this.verificationCodeField.fill(value);
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }
}