import { test, expect } from '@playwright/test';
import { AttributeVsVisualStatePage } from '../../../../page_objects/AttributeVsVisualStatePage';

test.describe('Initial And Synced Behavior', () => {
  test('Verify Toggle Initial State Is Inactive And Not Pressed', async ({ page }) => {
    const challenge = new AttributeVsVisualStatePage(page);

    // 1. Open the playground in a fresh page and locate the challenge card by its heading.
    await challenge.navigateToPlayground();

    await expect.soft(challenge.heading).toBeVisible();
    await expect.soft(challenge.explanation).toBeVisible();
    await expect.soft(challenge.toggleButton).toBeVisible();
    await expect.soft(challenge.toggleButton).toBeEnabled();
    await expect.soft(challenge.toggleButton).toHaveText('Inactive');
    await expect.soft(challenge.toggleButton).toHaveAttribute('aria-pressed', 'false');
    await expect.soft(challenge.statusParagraph).toHaveText('');
  });
});
