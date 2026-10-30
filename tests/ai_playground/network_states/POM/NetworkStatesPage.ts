import { type Locator, type Page } from '@playwright/test';

export class NetworkStatesPage {
  readonly challengeHeading: Locator;
  readonly successButton: Locator;
  readonly errorButton: Locator;
  readonly timeoutButton: Locator;
  readonly cancelRequestButton: Locator;
  readonly successResult: Locator;
  readonly errorResult: Locator;
  readonly pendingMessage: Locator;
  readonly cancelledMessage: Locator;

  constructor(private readonly page: Page) {
    this.challengeHeading = page.getByRole('heading', {
      name: '18. Network States',
      exact: true,
    });

    const challenge = this.challengeHeading.locator('..');
    this.successButton = challenge.getByRole('button', { name: 'Success', exact: true });
    this.errorButton = challenge.getByRole('button', { name: 'Error', exact: true });
    this.timeoutButton = challenge.getByRole('button', { name: 'Timeout', exact: true });
    this.cancelRequestButton = challenge.getByRole('button', { name: 'Cancel Request', exact: true });
    this.successResult = challenge.getByText('{"status":"ok","records":42,"page":1}', {
      exact: false,
    });
    this.errorResult = challenge.getByText('Service Unavailable. Retry after 30s.', {
      exact: false,
    });
    this.pendingMessage = challenge.getByText('Waiting for server…', { exact: true });
    this.cancelledMessage = challenge.getByText('Request cancelled.', { exact: true });
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async clickSuccessButton(): Promise<void> {
    await this.successButton.click();
  }

  public async clickErrorButton(): Promise<void> {
    await this.errorButton.click();
  }

  public async clickTimeoutButton(): Promise<void> {
    await this.timeoutButton.click();
  }

  public async clickCancelRequestButton(): Promise<void> {
    await this.cancelRequestButton.click();
  }
}
