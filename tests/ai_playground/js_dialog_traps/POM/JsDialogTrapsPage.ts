import { type Page, type Locator } from '@playwright/test';

type DialogAction = 'accept' | 'dismiss';

export class JsDialogTrapsPage {
  readonly page: Page;
  readonly challengeHeading: Locator;
  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly resultMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', { name: '19. JS Dialog Traps' });
    this.alertButton = page.getByRole('button', { name: 'Trigger alert()' });
    this.confirmButton = page.getByRole('button', { name: 'Trigger confirm()' });
    this.promptButton = page.getByRole('button', { name: 'Trigger prompt()' });
    this.resultMessage = page.getByText(/^(?:Confirmed|Cancelled|Prompt dismissed|Hello,.*)$/);
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async clickTriggerAlert(): Promise<void> {
    await this.alertButton.click();
  }

  public async clickTriggerConfirm(): Promise<void> {
    await this.confirmButton.click();
  }

  public async clickTriggerPrompt(): Promise<void> {
    await this.promptButton.click();
  }

  public waitForDialog(action: DialogAction, promptText?: string): Promise<{ type: string; message: string }> {
    return new Promise((resolve, reject) => {
      this.page.once('dialog', async (dialog) => {
        const details = { type: dialog.type(), message: dialog.message() };

        try {
          if (action === 'accept') {
            await dialog.accept(promptText);
          } else {
            await dialog.dismiss();
          }
          resolve(details);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
