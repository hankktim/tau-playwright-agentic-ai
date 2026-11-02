import { type Locator, type Page } from '@playwright/test';

export class ApiInterceptPage {
  readonly challengeHeading: Locator;
  readonly fetchUserDataButton: Locator;
  readonly successStatus: Locator;
  readonly pendingMessage: Locator;
  readonly errorFeedback: Locator;
  private readonly challenge: Locator;
  private readonly challengeSection: Locator;

  constructor(private readonly page: Page) {
    this.challengeHeading = page.getByRole('heading', {
      name: '23. API Intercept',
      exact: true,
    });

    this.challenge = this.challengeHeading.locator('..');
    this.challengeSection = this.challengeHeading.locator('../..');
    this.fetchUserDataButton = this.challenge.getByRole('button', {
      name: 'Fetch User Data',
      exact: true,
    });
    this.successStatus = this.challenge.getByText(/users loaded$/, { exact: false });
    this.pendingMessage = this.challenge.getByText(/loading|fetching|pending/i);
    this.errorFeedback = this.challenge.getByText(
      /error|request failed|failed to fetch|failed to load|unable to|unavailable|500/i
    );
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async clickFetchUserDataButton(): Promise<void> {
    await this.fetchUserDataButton.click();
  }

  public userName(name: string): Locator {
    return this.challengeSection.getByText(name);
  }
}
