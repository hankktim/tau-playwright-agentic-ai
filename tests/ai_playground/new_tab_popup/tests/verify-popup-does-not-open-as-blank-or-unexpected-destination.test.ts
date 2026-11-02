// spec: tests/ai_playground/new_tab_popup/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import {
  AI_TESTING_PLAYGROUND_URL,
  NewTabPopupPage,
  PopupConfirmationPage,
} from '../POM/NewTabPopupPage';

test.describe('New Tab / Popup', () => {
  test('Verify Popup Is Not Blank Or Routed To An Unexpected Destination', async ({ page }) => {
    const newTabPopupPage = new NewTabPopupPage(page);

    // 1. Open the challenge from a fresh page and register a popup-event wait before activating the popup control.
    await newTabPopupPage.navigateToChallenge();
    await expect(newTabPopupPage.challengeHeading).toBeVisible();
    await expect(newTabPopupPage.openConfirmationButton).toBeVisible();

    const popupPromise = page.waitForEvent('popup');
    await newTabPopupPage.clickOpenConfirmationButton();
    const popup = await popupPromise;

    // 2. Wait for the popup to be populated and inspect its final URL, title, and visible content.
    const confirmationPage = new PopupConfirmationPage(popup);
    await expect(popup).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(popup).toHaveTitle('');
    await expect(confirmationPage.heading).toBeVisible();
    await expect(confirmationPage.orderReference).toBeVisible();
    await expect(confirmationPage.note).toBeVisible();
    await expect(page).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(newTabPopupPage.challengeHeading).toBeVisible();
  });
});
