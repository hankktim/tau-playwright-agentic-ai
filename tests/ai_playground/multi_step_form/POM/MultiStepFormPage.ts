import { type Locator, type Page } from '@playwright/test';

export class MultiStepFormPage {
  readonly page: Page;
  readonly challengeCard: Locator;
  readonly stepIndicator: Locator;
  readonly fullNameField: Locator;
  readonly emailField: Locator;
  readonly fullNameError: Locator;
  readonly emailError: Locator;
  readonly countryField: Locator;
  readonly countryError: Locator;
  readonly phoneField: Locator;
  readonly commentsField: Locator;
  readonly termsCheckbox: Locator;
  readonly termsError: Locator;
  readonly successMessage: Locator;
  readonly firstStepNextButton: Locator;
  readonly secondStepNextButton: Locator;
  readonly secondStepBackButton: Locator;
  readonly thirdStepBackButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeCard = page.getByRole('heading', { name: '3. Multi-Step Form' }).locator('..');
    this.stepIndicator = this.challengeCard.getByText(/^Step [1-3] of 3$/);
    this.fullNameField = this.challengeCard.getByPlaceholder('Jane Doe');
    this.emailField = this.challengeCard.getByPlaceholder('jane@example.com');
    this.fullNameError = this.challengeCard.getByText('Full name required (first and last)', { exact: true });
    this.emailError = this.challengeCard.getByText('Valid email required', { exact: true });
    this.countryField = this.challengeCard.getByRole('combobox');
    this.countryError = this.challengeCard.getByText('Country is required', { exact: true });
    this.phoneField = this.challengeCard.getByPlaceholder('+44 7700 000000');
    this.commentsField = this.challengeCard.getByPlaceholder('Optional');
    this.termsCheckbox = this.challengeCard.getByRole('checkbox', { name: 'I accept the terms and conditions' });
    this.termsError = this.challengeCard.getByText('You must accept the terms', { exact: true });
    this.successMessage = this.challengeCard.getByText('Form submitted successfully.', { exact: true });

    // The challenge keeps hidden-step buttons in the DOM and repeats their names.
    this.firstStepNextButton = this.challengeCard.locator('#ms-next-1');
    this.secondStepNextButton = this.challengeCard.locator('#ms-next-2');
    this.secondStepBackButton = this.challengeCard.locator('#ms-back-2');
    this.thirdStepBackButton = this.challengeCard.locator('#ms-back-3');
    this.submitButton = this.challengeCard.getByRole('button', { name: 'Submit', exact: true });
  }

  async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  async setFullName(value: string): Promise<void> {
    await this.fullNameField.fill(value);
  }

  async setEmail(value: string): Promise<void> {
    await this.emailField.fill(value);
  }

  async clickFirstStepNextButton(): Promise<void> {
    await this.firstStepNextButton.click();
  }

  async selectCountry(value: string): Promise<void> {
    await this.countryField.selectOption(value);
  }

  async setPhone(value: string): Promise<void> {
    await this.phoneField.fill(value);
  }

  async clickSecondStepNextButton(): Promise<void> {
    await this.secondStepNextButton.click();
  }

  async clickSecondStepBackButton(): Promise<void> {
    await this.secondStepBackButton.click();
  }

  async clickThirdStepBackButton(): Promise<void> {
    await this.thirdStepBackButton.click();
  }

  async setComments(value: string): Promise<void> {
    await this.commentsField.fill(value);
  }

  async checkTerms(): Promise<void> {
    await this.termsCheckbox.check();
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }
}