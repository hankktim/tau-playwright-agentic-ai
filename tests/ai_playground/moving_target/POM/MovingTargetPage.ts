import { type Locator, type Page } from '@playwright/test';

export class MovingTargetPage {
  readonly page: Page;
  readonly challengeHeading: Locator;
  readonly challengeSection: Locator;
  readonly catchMeButton: Locator;
  readonly caughtMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', { name: '6. Moving Target' });
    this.challengeSection = this.challengeHeading.locator('..');
    this.catchMeButton = this.challengeSection.getByRole('button', { name: 'Catch Me' });
    this.caughtMessage = page.getByText('Got it!', { exact: true });
  }

  public async hoverCatchMeButton(): Promise<void> {
    await this.catchMeButton.hover();
  }

  public async getCatchMeButtonPosition(): Promise<{ x: number; y: number }> {
    const boundingBox = await this.catchMeButton.boundingBox();
    if (!boundingBox) {
      throw new Error('The Catch Me button does not have a visible bounding box.');
    }

    return { x: boundingBox.x, y: boundingBox.y };
  }

  public async focusCatchMeButton(): Promise<void> {
    await this.catchMeButton.focus();
  }

  public async pressEnterOnCatchMeButton(): Promise<void> {
    await this.catchMeButton.press('Enter');
  }
}