import { test, expect } from '@playwright/test';
import { AttributeVsVisualStatePage } from '../../../../page_objects/AttributeVsVisualStatePage';

test.describe('Initial And Synced Behavior', () => {
  test('Verify Synced Toggle Off Returns To Inactive And Not Pressed', async ({ page }) => {
    const challenge = new AttributeVsVisualStatePage(page);

    // 1. Open a fresh page with the synced branch configured and locate challenge 21.
    await challenge.navigateToPlayground();
    await challenge.setRandomValue(0.99);
    await expect(challenge.toggleButton).toHaveText('Inactive');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'false');

    // 2. Click the toggle button once.
    await challenge.clickToggleButton();
    await expect(challenge.toggleButton).toHaveText('Active');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'true');

    // 3. Click the toggle button a second time.
    await challenge.setRandomValue(0.99);
    await challenge.clickToggleButton();
    await expect(challenge.toggleButton).toHaveText('Inactive');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'false');
    await expect(challenge.statusParagraph).toHaveText('aria-pressed: false');
  });
});
