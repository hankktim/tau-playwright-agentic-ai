import { test, expect } from '@playwright/test';
import { AttributeVsVisualStatePage } from '../../../../page_objects/AttributeVsVisualStatePage';

test.describe('Desynced Attribute Detection', () => {
  test('Verify Synced Click Recovers Attribute After A Desync', async ({ page }) => {
    const challenge = new AttributeVsVisualStatePage(page);

    // 1. Open a fresh page, configure a desynced click, and locate challenge 21.
    await challenge.navigateToPlayground();
    await challenge.setRandomValue(0.0);
    await challenge.clickToggleButton();
    await expect(challenge.toggleButton).toHaveText('Active');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'false');
    await expect(challenge.statusParagraph).toHaveText('aria-pressed: false ⚠️ attribute desynced');

    // 2. Configure a synced click and click the toggle again.
    await challenge.setRandomValue(0.99);
    await challenge.clickToggleButton();
    await expect(challenge.toggleButton).toHaveText('Inactive');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'false');
    await expect(challenge.statusParagraph).toHaveText('aria-pressed: false');

    // 3. Click the toggle a third time, still on the synced branch.
    await challenge.setRandomValue(0.99);
    await challenge.clickToggleButton();
    await expect(challenge.toggleButton).toHaveText('Active');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'true');
    await expect(challenge.statusParagraph).toHaveText('aria-pressed: true');
  });
});
