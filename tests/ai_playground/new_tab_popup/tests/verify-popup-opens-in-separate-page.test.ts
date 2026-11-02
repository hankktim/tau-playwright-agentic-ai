// spec: tests/ai_playground/new_tab_popup/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import {
  AI_TESTING_PLAYGROUND_URL,
  NewTabPopupPage,
  PopupConfirmationPage,
} from '../POM/NewTabPopupPage';

test.describe('New Tab / Popup', () => {
  test('Verify Popup Opens In A Separate Page', async ({ page }) => {
    const newTabPopupPage = new NewTabPopupPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate the “24. New Tab / Popup” challenge. Confirm the challenge popup control is available.
    await newTabPopupPage.navigateToChallenge();
    await expect(newTabPopupPage.challengeHeading).toBeVisible();
    await expect(newTabPopupPage.openConfirmationButton).toBeVisible();
    await expect(page).toHaveURL(AI_TESTING_PLAYGROUND_URL);

    // 2. Wait for the popup event before activating the challenge popup control.
    const popupPromise = page.waitForEvent('popup');
    await newTabPopupPage.clickOpenConfirmationButton();
    const popup = await popupPromise;
    await expect(page).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    expect(popup).not.toBe(page);

    // 3. Wait for the popup page to finish populating and inspect its URL and visible page content.
    const confirmationPage = new PopupConfirmationPage(popup);
    await expect(popup).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(confirmationPage.heading).toBeVisible();
    await expect(confirmationPage.orderReference).toBeVisible();
    await expect(confirmationPage.note).toBeVisible();
  });
});
