// spec: tests/ai_playground/new_tab_popup/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import {
  AI_TESTING_PLAYGROUND_URL,
  NewTabPopupPage,
  PopupConfirmationPage,
} from '../POM/NewTabPopupPage';

test.describe('New Tab / Popup', () => {
  test('Verify Popup Can Be Closed And Reopened', async ({ page }) => {
    const newTabPopupPage = new NewTabPopupPage(page);

    // 1. Open the challenge in a fresh page, activate its popup control after registering a popup-event wait, and wait for the intended page to load.
    await newTabPopupPage.navigateToChallenge();
    await expect(newTabPopupPage.challengeHeading).toBeVisible();
    const firstPopupPromise = page.waitForEvent('popup');
    await newTabPopupPage.clickOpenConfirmationButton();
    const firstPopup = await firstPopupPromise;
    const firstConfirmationPage = new PopupConfirmationPage(firstPopup);
    await expect(firstPopup).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(firstConfirmationPage.heading).toBeVisible();
    await expect(firstConfirmationPage.orderReference).toBeVisible();

    // 2. Close the popup page and verify the original page remains open at the New Tab / Popup challenge.
    await firstConfirmationPage.closePopupPage();
    expect(firstPopup.isClosed()).toBe(true);
    await expect(page).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(newTabPopupPage.challengeHeading).toBeVisible();

    // 3. Activate the popup control again while waiting for a new popup event.
    const reopenedPopupPromise = page.waitForEvent('popup');
    await newTabPopupPage.clickOpenConfirmationButton();
    const reopenedPopup = await reopenedPopupPromise;
    const reopenedConfirmationPage = new PopupConfirmationPage(reopenedPopup);
    expect(reopenedPopup).not.toBe(firstPopup);
    await expect(reopenedPopup).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(reopenedConfirmationPage.heading).toBeVisible();
    await expect(reopenedConfirmationPage.orderReference).toBeVisible();
    await expect(page).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(newTabPopupPage.openConfirmationButton).toBeEnabled();
  });
});
