// spec: tests/ai_playground/network_states/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { NetworkStatesPage } from '../POM/NetworkStatesPage';

test.describe('18. Network States', () => {
  test('Verify Error Response Displays Service Unavailable', async ({ page }) => {
    const networkStatesPage = new NetworkStatesPage(page);

    // 1. Open the playground in a fresh page and locate challenge 18 by its heading. Confirm all three state controls are available and no result is displayed.
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

    // 2. Click Error and wait for the response result using a retrying, state-based assertion.
    await networkStatesPage.clickErrorButton();
    await expect(networkStatesPage.errorResult).toBeVisible();
    await expect(networkStatesPage.errorResult).toContainText('503');
    await expect(networkStatesPage.errorResult).toContainText('Service Unavailable. Retry after 30s.');
    await expect(networkStatesPage.successResult).toBeHidden();
    await expect(networkStatesPage.pendingMessage).toBeHidden();
  });
});
