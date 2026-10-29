// spec: tests/ai_playground/lazy_rendered_element/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { LazyRenderedElementPage } from '../POM/LazyRenderedElementPage';

test.describe('Lazy-Rendered Element', () => {
  test('Verify Result Is Hidden Before Activation', async ({ page }) => {
    const lazyRenderedElementPage = new LazyRenderedElementPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate challenge 9, Lazy-Rendered Element.
    await lazyRenderedElementPage.navigateToChallenge();
    await expect(lazyRenderedElementPage.challengeHeading).toBeVisible();
    await expect(lazyRenderedElementPage.revealButton).toBeVisible();

    // 2. Check the challenge result before clicking “Reveal Element.”
    await expect(lazyRenderedElementPage.resultMessage).not.toBeVisible();
    await expect(lazyRenderedElementPage.generatedSelector).not.toBeVisible();
  });
});