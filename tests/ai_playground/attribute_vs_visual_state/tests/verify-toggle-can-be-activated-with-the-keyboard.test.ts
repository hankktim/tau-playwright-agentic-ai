import { test, expect } from '@playwright/test';
import { AttributeVsVisualStatePage } from '../../../../page_objects/AttributeVsVisualStatePage';

test.describe('Initial And Synced Behavior', () => {
  test('Verify Toggle Can Be Activated With The Keyboard', async ({ page }) => {
    const challenge = new AttributeVsVisualStatePage(page);

    // 1. Open a fresh page with the synced branch configured and focus the toggle button.
    await challenge.navigateToPlayground();
    await challenge.setRandomValue(0.99);
    await challenge.focusToggleButton();
    await expect(challenge.toggleButton).toBeFocused();
    await expect(challenge.toggleButton).toHaveText('Inactive');

    // 2. Press Space.
    await challenge.pressToggleKey('Space');
    await expect(challenge.toggleButton).toHaveText('Active');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'true');

    // 3. Press Enter.
    await challenge.setRandomValue(0.99);
    await challenge.pressToggleKey('Enter');
    await expect(challenge.toggleButton).toHaveText('Inactive');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'false');
  });
});
