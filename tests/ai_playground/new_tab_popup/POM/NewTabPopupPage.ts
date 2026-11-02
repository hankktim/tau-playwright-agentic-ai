import { type Locator, type Page } from '@playwright/test';

export const AI_TESTING_PLAYGROUND_URL =
  'https://webdriveruniversity.com/AI-Playground/index.html';

export class NewTabPopupPage {
  readonly challengeHeading: Locator;
  readonly openConfirmationButton: Locator;

  constructor(private readonly page: Page) {
    this.challengeHeading = page.getByRole('heading', {
      name: '24. New Tab / Popup',
      exact: true,
    });
    this.openConfirmationButton = page.getByRole('button', {
      name: 'Open Confirmation',
      exact: true,
    });
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto(AI_TESTING_PLAYGROUND_URL);
  }

  public async clickOpenConfirmationButton(): Promise<void> {
    await this.openConfirmationButton.click();
  }
}

export class PopupConfirmationPage {
  readonly heading: Locator;
  readonly orderReference: Locator;
  readonly note: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', {
      name: 'Order Confirmation',
      exact: true,
    });
    this.orderReference = page.getByText('WDU-POPUP-001', { exact: true });
    this.note = page.getByText(
      'Assert this content from the new tab in your automated test.',
      { exact: true }
    );
  }

  public async closePopupPage(): Promise<void> {
    await this.page.close();
  }
}
