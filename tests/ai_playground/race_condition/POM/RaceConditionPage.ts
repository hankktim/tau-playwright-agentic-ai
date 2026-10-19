import { type Locator, type Page } from '@playwright/test';

export class RaceConditionPage {
  readonly challengeCard: Locator;
  readonly raceAButton: Locator;
  readonly raceBButton: Locator;
  readonly raceResult: Locator;

  constructor(page: Page) {
    this.challengeCard = page.getByRole('heading', { name: '8. Race Condition' }).locator('..');
    this.raceAButton = this.challengeCard.getByRole('button', { name: 'Start Race A' });
    this.raceBButton = this.challengeCard.getByRole('button', { name: 'Start Race B' });
    this.raceResult = this.challengeCard.getByText(/^Race [AB] won!$/);
  }

  async startBothRaces(): Promise<void> {
    await Promise.all([this.raceAButton.click(), this.raceBButton.click()]);
  }
}