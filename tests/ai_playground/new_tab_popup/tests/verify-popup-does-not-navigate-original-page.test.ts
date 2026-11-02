// spec: tests/ai_playground/new_tab_popup/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import {
  AI_TESTING_PLAYGROUND_URL,
  NewTabPopupPage,
  PopupConfirmationPage,
} from '../POM/NewTabPopupPage';

test.describe('New Tab / Popup', () => {
  test('Verify Popup Leaves The Original Page Unchanged And Usable', async ({ page }) => {
    const newTabPopupPage = new NewTabPopupPage(page);

    // 1. Open the challenge from a fresh page and record the original page URL and challenge heading.
    await newTabPopupPage.navigateToChallenge();
    await expect(page).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(newTabPopupPage.challengeHeading).toHaveText('24. New Tab / Popup');

    // 2. Wait for a popup event and activate the popup control; retain references to both pages.
    const firstPopupPromise = page.waitForEvent('popup');
    await newTabPopupPage.clickOpenConfirmationButton();
    const firstPopup = await firstPopupPromise;
    const firstConfirmationPage = new PopupConfirmationPage(firstPopup);
    await expect(firstPopup).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(firstConfirmationPage.heading).toBeVisible();
    await expect(firstConfirmationPage.orderReference).toBeVisible();
    await expect(page).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(newTabPopupPage.challengeHeading).toHaveText('24. New Tab / Popup');

    // 3. Return focus to the original page and activate the popup control again while waiting for the resulting popup behavior.
    await expect(newTabPopupPage.openConfirmationButton).toBeEnabled();
    const secondPopupPromise = page.waitForEvent('popup');
    await newTabPopupPage.clickOpenConfirmationButton();
    const secondPopup = await secondPopupPromise;
    const secondConfirmationPage = new PopupConfirmationPage(secondPopup);
    expect(secondPopup).not.toBe(page);
    expect(secondPopup).not.toBe(firstPopup);
    await expect(secondPopup).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(secondConfirmationPage.heading).toBeVisible();
    await expect(secondConfirmationPage.orderReference).toBeVisible();
    await expect(page).toHaveURL(AI_TESTING_PLAYGROUND_URL);
    await expect(newTabPopupPage.challengeHeading).toBeVisible();
  });
});
