import { test, expect } from '@playwright/test';
import { AttributeVsVisualStatePage } from '../../../../page_objects/AttributeVsVisualStatePage';

test.describe('Desynced Attribute Detection', () => {
  test('Verify Desynced Toggle On Keeps Aria Pressed False Despite Active Label', async ({ page }) => {
    const challenge = new AttributeVsVisualStatePage(page);

    // 1. Open a fresh page with the desync branch configured and locate challenge 21.
    await challenge.navigateToPlayground();
    await challenge.setRandomValue(0.0);
    await expect(challenge.toggleButton).toHaveText('Inactive');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'false');

    // 2. Click the toggle button once.
    await challenge.clickToggleButton();
    await expect(challenge.toggleButton).toHaveText('Active');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'false');
    await expect(challenge.statusParagraph).toHaveText('aria-pressed: false ⚠️ attribute desynced');
  });
});
