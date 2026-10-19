// spec: tests/ai_playground/race_condition/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { RaceConditionPage } from '../POM/RaceConditionPage';

test.describe('Race Condition', () => {
  test('Verify Concurrent Operations Produce A Single Winner', async ({ page }) => {
    const raceConditionPage = new RaceConditionPage(page);

    // 1. Open the challenge in a fresh page and inspect the Race Condition controls.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await expect(raceConditionPage.raceAButton).toBeVisible();
    await expect(raceConditionPage.raceBButton).toBeVisible();
    await expect(raceConditionPage.raceResult).toBeHidden();

    // 2. Start Race A and Race B concurrently.
    await raceConditionPage.startBothRaces();
    await expect(raceConditionPage.raceResult).toHaveText(/^Race [AB] won!$/);
  });
});