import { test, expect } from '@playwright/test';
import { AttributeVsVisualStatePage } from '../../../../page_objects/AttributeVsVisualStatePage';

test.describe('Desynced Attribute Detection', () => {
  test('Verify Desync Probability Boundary At Thirty Percent', async ({ page }) => {
    const challenge = new AttributeVsVisualStatePage(page);

    // 1. Open a fresh page, configure the exact boundary value, and locate challenge 21.
    await challenge.navigateToPlayground();
    await challenge.setRandomValue(0.3);
    await challenge.clickToggleButton();
    await expect(challenge.toggleButton).toHaveText('Active');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'true');
    await expect(challenge.statusParagraph).toHaveText('aria-pressed: true');

    // 2. Configure a value below the boundary and click the toggle again.
    await challenge.setRandomValue(0.2999);
    await challenge.clickToggleButton();
    await expect(challenge.toggleButton).toHaveText('Inactive');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'true');
    await expect(challenge.statusParagraph).toHaveText('aria-pressed: true ⚠️ attribute desynced');
  });
});
