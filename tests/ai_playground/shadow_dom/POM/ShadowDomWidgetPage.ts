import { type Locator, type Page } from '@playwright/test';

export class ShadowDomWidgetPage {
  readonly page: Page;
  readonly challengeHeading: Locator;
  readonly widget: Locator;
  readonly valueField: Locator;
  readonly submitButton: Locator;
  readonly resultMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', { name: '11. Shadow DOM Widget' });
    this.widget = page.locator('wdu-shadow-form');
    this.valueField = this.widget.getByRole('textbox', { name: 'Enter any value' });
    this.submitButton = this.widget.getByRole('button', { name: 'Submit', exact: true });
    this.resultMessage = this.widget.getByText(/^(?:Echo:|Please enter a value\.)/);
  }

  async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  async setValue(value: string): Promise<void> {
    await this.valueField.fill(value);
  }

  async clearValue(): Promise<void> {
    await this.valueField.fill('');
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }

  async pressEnter(): Promise<void> {
    await this.valueField.press('Enter');
  }
}