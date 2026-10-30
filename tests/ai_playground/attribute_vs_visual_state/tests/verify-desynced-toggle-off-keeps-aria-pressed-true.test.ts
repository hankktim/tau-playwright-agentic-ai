import { test, expect } from '@playwright/test';
import { AttributeVsVisualStatePage } from '../../../../page_objects/AttributeVsVisualStatePage';

test.describe('Desynced Attribute Detection', () => {
  test('Verify Desynced Toggle Off Keeps Aria Pressed True Despite Inactive Label', async ({ page }) => {
    const challenge = new AttributeVsVisualStatePage(page);

    // 1. Open a fresh page, configure a synced click, and locate challenge 21.
    await challenge.navigateToPlayground();
    await challenge.setRandomValue(0.99);
    await challenge.clickToggleButton();
    await expect(challenge.toggleButton).toHaveText('Active');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'true');

    // 2. Configure a desynced click and click the toggle a second time.
    await challenge.setRandomValue(0.0);
    await challenge.clickToggleButton();
    await expect(challenge.toggleButton).toHaveText('Inactive');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'true');
    await expect(challenge.statusParagraph).toHaveText('aria-pressed: true ⚠️ attribute desynced');
  });
});
