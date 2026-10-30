import { test, expect } from '@playwright/test';
import { AttributeVsVisualStatePage } from '../../../../page_objects/AttributeVsVisualStatePage';

test.describe('Unstubbed Defect Detection', () => {
  test('Verify Aria Pressed Always Matches Visible Label Across Repeated Toggles', { tag: '@edge' }, async ({ page }) => {
    test.fail(true, 'The playground intentionally desynchronizes aria-pressed on approximately 30% of clicks.');
    const challenge = new AttributeVsVisualStatePage(page);

    // 1. Open a fresh page without stubbing Math.random and locate challenge 21.
    await challenge.navigateToPlayground();
    await expect(challenge.toggleButton).toHaveText('Inactive');
    await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', 'false');

    // 2. Click the toggle 10 times and verify the label and aria-pressed after every click.
    for (let clickNumber = 1; clickNumber <= 10; clickNumber += 1) {
      await challenge.clickToggleButton();
      const expectedLabel = clickNumber % 2 === 1 ? 'Active' : 'Inactive';
      const expectedPressed = clickNumber % 2 === 1 ? 'true' : 'false';
      await expect(challenge.toggleButton).toHaveText(expectedLabel);
      await expect(challenge.toggleButton).toHaveAttribute('aria-pressed', expectedPressed);
    }
  });
});
