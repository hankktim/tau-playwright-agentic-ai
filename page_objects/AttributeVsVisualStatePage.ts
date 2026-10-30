import { type Locator, type Page } from '@playwright/test';

export class AttributeVsVisualStatePage {
  readonly page: Page;
  readonly card: Locator;
  readonly heading: Locator;
  readonly explanation: Locator;
  readonly toggleButton: Locator;
  readonly statusParagraph: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', {
      name: '21. Attribute vs Visual State',
      exact: true,
    });
    this.card = this.heading.locator('..');
    this.explanation = this.card.getByText('The button text always updates correctly');
    this.toggleButton = this.card.getByRole('button', { name: /^(Active|Inactive)$/ });
    // The empty status paragraph has no accessible name; its documented ID is the reliable locator.
    this.statusParagraph = this.card.locator('#attr-result');
  }

  public async navigateToPlayground(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async setRandomValue(value: number): Promise<void> {
    await this.page.evaluate((randomValue: number) => {
      Math.random = () => randomValue;
    }, value);
  }

  public async clickToggleButton(): Promise<void> {
    await this.toggleButton.click();
  }

  public async focusToggleButton(): Promise<void> {
    await this.toggleButton.focus();
  }

  public async pressToggleKey(key: 'Space' | 'Enter'): Promise<void> {
    await this.page.keyboard.press(key);
  }
}
