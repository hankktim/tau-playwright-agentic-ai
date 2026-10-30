// spec: tests/ai_playground/network_states/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { NetworkStatesPage } from '../POM/NetworkStatesPage';

test.describe('18. Network States', () => {
  test('Verify Success Response Displays Loaded Data', async ({ page }) => {
    const networkStatesPage = new NetworkStatesPage(page);

    // 1. Open the playground in a fresh page and locate challenge 18, Network States, by its heading. Confirm Success, Error, and Timeout controls are visible and no result is displayed yet.
    await networkStatesPage.navigateToChallenge();
    await expect(networkStatesPage.challengeHeading).toHaveText('18. Network States');
    await expect(networkStatesPage.successButton).toBeVisible();
    await expect(networkStatesPage.successButton).toBeEnabled();
    await expect(networkStatesPage.errorButton).toBeVisible();
    await expect(networkStatesPage.errorButton).toBeEnabled();
    await expect(networkStatesPage.timeoutButton).toBeVisible();
    await expect(networkStatesPage.timeoutButton).toBeEnabled();
    await expect(networkStatesPage.successResult).toBeHidden();
    await expect(networkStatesPage.errorResult).toBeHidden();
    await expect(networkStatesPage.pendingMessage).toBeHidden();
    await expect(networkStatesPage.cancelledMessage).toBeHidden();

    // 2. Click Success and wait for the response result using a retrying, state-based assertion.
    await networkStatesPage.clickSuccessButton();
    await expect(networkStatesPage.successResult).toBeVisible();
    await expect(networkStatesPage.successResult).toContainText('{"status":"ok","records":42,"page":1}');
    await expect(networkStatesPage.errorResult).toBeHidden();
    await expect(networkStatesPage.pendingMessage).toBeHidden();
  });
});
