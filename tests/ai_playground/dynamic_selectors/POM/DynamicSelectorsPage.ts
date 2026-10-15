import { type Locator, type Page } from '@playwright/test';

export class DynamicSelectorsPage {
  readonly loginCard: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly loginSuccessMessage: Locator;

  constructor(private readonly page: Page) {
    this.loginCard = page.getByTestId('dynamic-login-card');
    this.usernameField = this.loginCard.getByRole('textbox', { name: 'Username' });
    this.passwordField = this.loginCard.getByRole('textbox', { name: 'Password' });
    this.loginButton = this.loginCard.getByRole('button', { name: 'Login' });
    this.invalidCredentialsMessage = this.loginCard.getByText('Invalid credentials', { exact: true });
    this.loginSuccessMessage = this.loginCard.getByText('Login successful', { exact: true });
  }

  async setUsername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }

  async setPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
  }
}
