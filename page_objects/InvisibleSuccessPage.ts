import { type Locator, type Page } from '@playwright/test';

export class InvisibleSuccessPage {
  readonly page: Page;
  readonly card: Locator;
  readonly emailField: Locator;
  readonly submitButton: Locator;
  readonly submitButtonState: Locator;
  readonly validationError: Locator;
  readonly resultParagraph: Locator;

  constructor(page: Page) {
    this.page = page;
    this.card = page
      .getByRole('heading', { name: '16. Invisible Success', exact: true })
      .locator('..');
    this.emailField = this.card.getByPlaceholder('you@example.com');
    this.submitButton = this.card.getByRole('button', { name: 'Submit', exact: true });
    this.submitButtonState = this.card.getByRole('button');
    this.validationError = this.card.getByText('Valid email required', { exact: true });
    // The result has no role or text; its documented ID is the only reliable locator.
    this.resultParagraph = this.card.locator('#ghost-result');
  }

  public async navigateToPlayground(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async setEmail(value: string): Promise<void> {
    await this.emailField.fill(value);
  }

  public async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }
}
