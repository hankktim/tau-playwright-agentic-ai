import { type Locator, type Page } from '@playwright/test';

export class MutationObserverPage {
  readonly page: Page;
  readonly card: Locator;
  readonly challengeHeading: Locator;
  readonly subtitle: Locator;
  readonly startButton: Locator;
  readonly stopButton: Locator;
  readonly resetButton: Locator;
  readonly counter: Locator;
  readonly list: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', {
      name: '22. Mutation Observer',
      exact: true,
    });
    this.card = this.challengeHeading.locator('..');
    this.subtitle = this.card.getByText(
      'Items are added asynchronously. Fixed waits will fail — wait for the state, not the clock.',
      { exact: true },
    );
    this.startButton = this.card.getByRole('button', { name: 'Start', exact: true });
    this.stopButton = this.card.getByRole('button', { name: 'Stop', exact: true });
    this.resetButton = this.card.getByRole('button', { name: 'Reset', exact: true });
    this.counter = this.card.getByText(/^Items:\s*\d+\s*\/\s*10$/);
    this.list = this.card.getByRole('list');
    this.items = this.list.getByRole('listitem');
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async clickStartButton(): Promise<void> {
    await this.startButton.click();
  }

  public async clickStopButton(): Promise<void> {
    await this.stopButton.click();
  }

  public async clickResetButton(): Promise<void> {
    await this.resetButton.click();
  }
}
