// spec: tests/ai_playground/timing_mismatch/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { TimingMismatchPage } from '../POM/TimingMismatchPage';

test.describe('Timing Mismatch', () => {
  test('Verify A New Capture Replaces The Previous Snapshot', async ({ page }) => {
    const timingMismatchPage = new TimingMismatchPage(page);

    // 1. Open the playground in a fresh page, locate challenge 17, and click Capture.
    await timingMismatchPage.navigateToChallenge();
    await expect(timingMismatchPage.challengeHeading).toBeVisible();
    await timingMismatchPage.clickCaptureButton();
    await expect(timingMismatchPage.capturedValue).toHaveText(/^Captured: \d+$/);
    const firstCapturedValue = await timingMismatchPage.getCapturedValue();

    // 2. Wait with a retrying assertion until the live counter has advanced beyond the captured value, then click Capture again.
    await expect.poll(() => timingMismatchPage.getCounterValue()).toBeGreaterThan(firstCapturedValue);
    await timingMismatchPage.clickCaptureButton();
    await expect(timingMismatchPage.capturedValue).toHaveText(/^Captured: \d+$/);
    const replacementValue = await timingMismatchPage.getCapturedValue();
    expect(replacementValue).toBeGreaterThan(firstCapturedValue);

    // 3. Wait with a retrying assertion until the live counter differs from the new captured value, then click Verify.
    await expect.poll(() => timingMismatchPage.getCounterValue()).not.toBe(replacementValue);
    await timingMismatchPage.clickVerifyButton();
    await expect(timingMismatchPage.verificationResult).toHaveText(
      new RegExp(`^Mismatch — captured ${replacementValue}, current \\d+$`),
    );
    const resultMatch = (await timingMismatchPage.getVerificationResultText()).match(
      /^Mismatch — captured (\d+), current (\d+)$/,
    );
    expect(resultMatch).not.toBeNull();
    if (!resultMatch) {
      throw new Error('Expected the verification result to report captured and current counter values.');
    }
    expect(Number(resultMatch[1])).toBe(replacementValue);
    expect(Number(resultMatch[1])).not.toBe(firstCapturedValue);
    expect(Number(resultMatch[2])).not.toBe(replacementValue);
  });
});