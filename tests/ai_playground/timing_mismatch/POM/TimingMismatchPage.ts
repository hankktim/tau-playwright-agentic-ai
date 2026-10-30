import { type Locator, type Page } from '@playwright/test';

export class TimingMismatchPage {
  readonly page: Page;
  readonly challengeHeading: Locator;
  readonly challengeCard: Locator;
  readonly counterValue: Locator;
  readonly captureButton: Locator;
  readonly verifyButton: Locator;
  readonly capturedValue: Locator;
  readonly verificationResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', {
      name: '17. Timing Mismatch',
      exact: true,
    });
    // The challenge has no semantic container role, so scope locators to its card by the heading.
    this.challengeCard = page.locator('.card').filter({ has: this.challengeHeading });
    this.counterValue = this.challengeCard.getByText(/^Counter:/).locator('strong');
    this.captureButton = this.challengeCard.getByRole('button', {
      name: 'Capture',
      exact: true,
    });
    this.verifyButton = this.challengeCard.getByRole('button', {
      name: 'Verify',
      exact: true,
    });
    this.capturedValue = this.challengeCard.getByText(/^Captured:/);
    // The empty result paragraph has no accessible name or text before verification.
    this.verificationResult = this.challengeCard.locator('[id="timing-verify-result"]');
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async clickCaptureButton(): Promise<void> {
    await this.captureButton.click();
  }

  public async clickVerifyButton(): Promise<void> {
    await this.verifyButton.click();
  }

  public async getCounterValue(): Promise<number> {
    const text = await this.counterValue.textContent();
    const normalizedText = text?.trim();

    if (!normalizedText || !/^\d+$/.test(normalizedText)) {
      throw new Error(`Expected the counter to contain an integer, received "${text}".`);
    }

    return Number(normalizedText);
  }

  public async getCapturedValue(): Promise<number> {
    const text = await this.capturedValue.textContent();
    const match = text?.match(/^Captured: (\d+)$/);

    if (!match) {
      throw new Error(`Expected a numeric captured value, received "${text}".`);
    }

    return Number(match[1]);
  }

  public async getVerificationResultText(): Promise<string> {
    const text = await this.verificationResult.textContent();

    if (text === null) {
      throw new Error('Expected the verification result paragraph to be attached to the page.');
    }

    return text.trim();
  }
}
