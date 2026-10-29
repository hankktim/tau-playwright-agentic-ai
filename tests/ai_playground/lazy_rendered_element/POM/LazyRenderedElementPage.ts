import { type Locator, type Page } from '@playwright/test';

export class LazyRenderedElementPage {
  readonly challengeHeading: Locator;
  readonly revealButton: Locator;
  readonly resultMessage: Locator;
  readonly generatedSelector: Locator;

  constructor(private readonly page: Page) {
    this.challengeHeading = page.getByRole('heading', { name: '9. Lazy-Rendered Element' });
    this.revealButton = page.getByRole('button', { name: 'Reveal Element' });
    this.resultMessage = page.getByText(/I just appeared!/);
    this.generatedSelector = page.getByText(/#lazy-\d+/);
  }

  async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  async clickRevealButton(): Promise<void> {
    await this.revealButton.click();
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
  }
}
