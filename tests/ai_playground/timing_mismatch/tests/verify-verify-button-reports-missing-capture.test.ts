// spec: tests/ai_playground/timing_mismatch/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { TimingMismatchPage } from '../POM/TimingMismatchPage';

test.describe('Timing Mismatch', () => {
  test('Verify Verify Button Reports Missing Capture', async ({ page }) => {
    const timingMismatchPage = new TimingMismatchPage(page);

    // 1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and locate challenge 17, Timing Mismatch, by its heading.
    await timingMismatchPage.navigateToChallenge();
    await expect(timingMismatchPage.challengeHeading).toBeVisible();
    await expect(timingMismatchPage.counterValue).toHaveText(/^\d+$/);
    await expect(timingMismatchPage.captureButton).toBeVisible();
    await expect(timingMismatchPage.captureButton).toBeEnabled();
    await expect(timingMismatchPage.verifyButton).toBeVisible();
    await expect(timingMismatchPage.verifyButton).toBeEnabled();
    await expect(timingMismatchPage.capturedValue).toHaveText('Captured: —');
    await expect(timingMismatchPage.verificationResult).toHaveText('');

    // 2. Click Verify without first clicking Capture.
    await timingMismatchPage.clickVerifyButton();
    await expect(timingMismatchPage.verificationResult).toHaveText('Nothing captured yet.');
    await expect(timingMismatchPage.capturedValue).toHaveText('Captured: —');
  });
});