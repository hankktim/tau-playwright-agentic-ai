import { type Locator, type Page } from '@playwright/test';

export class ReEnableDelayPage {
  readonly page: Page;
  readonly challengeHeading: Locator;
  readonly clickMeButton: Locator;
  readonly statusMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', { name: '5. Re-Enable Delay' });

    const challenge = this.challengeHeading.locator('..');
    this.clickMeButton = challenge.getByRole('button', { name: 'Click Me' });
    // The unnamed status paragraph is blank initially and directly follows the button.
    this.statusMessage = challenge.locator('button + p');
  }

  public async clickClickMeButton(): Promise<void> {
    await this.clickMeButton.click();
  }
}