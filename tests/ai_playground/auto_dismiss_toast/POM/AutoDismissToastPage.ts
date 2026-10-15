import { type Locator, type Page } from '@playwright/test';

export class AutoDismissToastPage {
  readonly triggerToastButton: Locator;
  readonly initialToastMessage: Locator;
  readonly actionCompletedToast: Locator;

  constructor(page: Page) {
    this.triggerToastButton = page.getByRole('button', { name: 'Trigger Toast' });
    this.initialToastMessage = page.getByText('Notification triggered', { exact: true });
    this.actionCompletedToast = page.getByText('Action completed', { exact: true });
  }

  async clickTriggerToastButton(): Promise<void> {
    await this.triggerToastButton.click();
  }
}