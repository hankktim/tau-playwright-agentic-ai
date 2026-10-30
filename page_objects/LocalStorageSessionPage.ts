import { type Locator, type Page } from '@playwright/test';

export class LocalStorageSessionPage {
  readonly page: Page;
  readonly card: Locator;
  readonly heading: Locator;
  readonly subtitle: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly welcomeMessage: Locator;
  readonly invalidCredentialsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: '20. localStorage Session', exact: true });
    this.card = this.heading.locator('..');
    this.subtitle = this.card.getByText('Assert localStorage directly — the UI can lie.', { exact: true });
    this.usernameField = this.card.getByPlaceholder('testuser');
    this.passwordField = this.card.getByPlaceholder('pass123');
    this.loginButton = this.card.getByRole('button', { name: 'Login', exact: true });
    this.logoutButton = this.card.getByRole('button', { name: 'Logout', exact: true });
    this.welcomeMessage = this.card.getByText(/^Welcome, .+$/, { exact: true });
    this.invalidCredentialsMessage = this.card.getByText('Invalid credentials', { exact: true });
  }

  public async navigateToPlayground(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async seedSessionBeforeNavigation(value: string): Promise<void> {
    await this.page.addInitScript(
      (sessionValue: string) => localStorage.setItem('wdu-session', sessionValue),
      value,
    );
  }

  public async setUsername(value: string): Promise<void> {
    await this.usernameField.fill(value);
  }

  public async setPassword(value: string): Promise<void> {
    await this.passwordField.fill(value);
  }

  public async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  public async clickLogoutButton(): Promise<void> {
    await this.logoutButton.click();
  }

  public async reloadPage(): Promise<void> {
    await this.page.reload();
  }

  public async getSessionStorageValue(): Promise<string | null> {
    return this.page.evaluate(() => localStorage.getItem('wdu-session'));
  }
}
