// spec: tests/ai_playground/lazy_rendered_element/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { LazyRenderedElementPage } from '../POM/LazyRenderedElementPage';

test.describe('Lazy-Rendered Element', () => {
  test('Verify Result Appears After Reveal', async ({ page }) => {
    const lazyRenderedElementPage = new LazyRenderedElementPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate challenge 9.
    await lazyRenderedElementPage.navigateToChallenge();
    await expect(lazyRenderedElementPage.challengeHeading).toBeVisible();
    await expect(lazyRenderedElementPage.revealButton).toBeVisible();
    await expect(lazyRenderedElementPage.resultMessage).not.toBeVisible();

    // 2. Click “Reveal Element,” then wait for the result to become visible using a retrying visibility assertion; do not use a fixed sleep.
    await lazyRenderedElementPage.clickRevealButton();
    await expect(lazyRenderedElementPage.resultMessage).toBeVisible();
    await expect(lazyRenderedElementPage.resultMessage).toContainText('I just appeared!');
    await expect(lazyRenderedElementPage.resultMessage).toContainText('Selector:');
    await expect(lazyRenderedElementPage.resultMessage).toHaveText(/^I just appeared!\s*Selector:\s*#lazy-\d+$/);
    await expect(lazyRenderedElementPage.generatedSelector).toHaveText(/^#lazy-\d+$/);
  });
});