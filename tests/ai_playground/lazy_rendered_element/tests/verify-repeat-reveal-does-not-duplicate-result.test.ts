// spec: tests/ai_playground/lazy_rendered_element/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { LazyRenderedElementPage } from '../POM/LazyRenderedElementPage';

test.describe('Lazy-Rendered Element', () => {
  test('Verify Repeat Reveal Does Not Duplicate Result', async ({ page }) => {
    const lazyRenderedElementPage = new LazyRenderedElementPage(page);

    // 1. Open the AI Testing Playground in a fresh page, locate challenge 9, click “Reveal Element,” and wait until the result is visible.
    await lazyRenderedElementPage.navigateToChallenge();
    await expect(lazyRenderedElementPage.challengeHeading).toBeVisible();
    await expect(lazyRenderedElementPage.revealButton).toBeVisible();
    await expect(lazyRenderedElementPage.resultMessage).not.toBeVisible();
    await lazyRenderedElementPage.clickRevealButton();
    await expect(lazyRenderedElementPage.resultMessage).toBeVisible();
    await expect(lazyRenderedElementPage.resultMessage).toContainText('I just appeared!');
    await expect(lazyRenderedElementPage.generatedSelector).toHaveText(/^#lazy-\d+$/);
    await expect(lazyRenderedElementPage.resultMessage).toHaveCount(1);

    // 2. Click “Reveal Element” again and wait for the result to remain visible.
    await lazyRenderedElementPage.clickRevealButton();
    await expect(lazyRenderedElementPage.resultMessage).toBeVisible();
    await expect(lazyRenderedElementPage.generatedSelector).toHaveText(/^#lazy-\d+$/);
    await expect(lazyRenderedElementPage.resultMessage).toHaveCount(1);
  });
});