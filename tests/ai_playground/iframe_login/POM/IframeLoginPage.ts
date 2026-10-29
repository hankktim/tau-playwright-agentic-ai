import { type FrameLocator, type Locator, type Page } from '@playwright/test';

export class IframeLoginPage {
  readonly page: Page;
  readonly challengeHeading: Locator;
  readonly iframe: Locator;
  readonly frame: FrameLocator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly feedbackMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', { name: '10. iFrame Login' });
    // The challenge's only iframe has no accessible name, so target the frame element directly.
    this.iframe = page.locator('iframe');
    this.frame = page.frameLocator('iframe');
    this.usernameField = this.frame.getByPlaceholder('admin');
    this.passwordField = this.frame.getByPlaceholder('secret123');
    this.loginButton = this.frame.getByRole('button', { name: 'Login' });
    this.feedbackMessage = this.frame.getByText(/^(?:Login successful|Invalid credentials)$/);
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async setUsername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }

  public async setPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  public async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
}