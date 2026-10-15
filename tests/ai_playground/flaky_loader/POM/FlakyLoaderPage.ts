import { type Locator, type Page } from '@playwright/test';

export class FlakyLoaderPage {
  readonly loadContentButton: Locator;
  readonly loadedMessage: Locator;

  constructor(private readonly page: Page) {
    this.loadContentButton = page.getByRole('button', { name: 'Load Content' });
    this.loadedMessage = page.getByText('Content loaded successfully!', { exact: true });
  }

  async clickLoadContentButton(): Promise<void> {
    await this.loadContentButton.click();
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
  }
}