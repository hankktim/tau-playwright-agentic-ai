// spec: tests/ai_playground/timing_mismatch/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { TimingMismatchPage } from '../POM/TimingMismatchPage';

test.describe('Timing Mismatch', () => {
  test('Verify Stale Capture Reports A Mismatch After Counter Advances', async ({ page }) => {
    const timingMismatchPage = new TimingMismatchPage(page);

    // 1. Open the playground in a fresh page, locate challenge 17, and click Capture once.
    await timingMismatchPage.navigateToChallenge();
    await expect(timingMismatchPage.challengeHeading).toBeVisible();
    await timingMismatchPage.clickCaptureButton();
    await expect(timingMismatchPage.capturedValue).toHaveText(/^Captured: \d+$/);
    const capturedValue = await timingMismatchPage.getCapturedValue();

    // 2. Use a retrying assertion to wait until the live counter differs from the captured value, then click Verify.
    await expect.poll(() => timingMismatchPage.getCounterValue()).not.toBe(capturedValue);
    await timingMismatchPage.clickVerifyButton();
    await expect(timingMismatchPage.verificationResult).toHaveText(
      new RegExp(`^Mismatch — captured ${capturedValue}, current \\d+$`),
    );
    const resultMatch = (await timingMismatchPage.getVerificationResultText()).match(
      /^Mismatch — captured (\d+), current (\d+)$/,
    );
    expect(resultMatch).not.toBeNull();
    if (!resultMatch) {
      throw new Error('Expected the verification result to report captured and current counter values.');
    }
    expect(Number(resultMatch[1])).toBe(capturedValue);
    expect(Number(resultMatch[2])).not.toBe(capturedValue);
  });
});