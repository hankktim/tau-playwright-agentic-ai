// spec: tests/ai_playground/api_intercept/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ApiInterceptPage } from '../POM/ApiInterceptPage';

const API_URL = 'https://webdriveruniversity.com/api/user.json';

test.describe('23. API Intercept', () => {
  test('Verify API Request Displays Successful Response', async ({ page }) => {
    const apiInterceptPage = new ApiInterceptPage(page);

    // 1. Open the AI Testing Playground in a fresh page and locate the challenge headed “23. API Intercept”. Identify its API-triggering control and the initial state before interacting.
    await apiInterceptPage.navigateToChallenge();
    await expect(apiInterceptPage.challengeHeading).toHaveText('23. API Intercept');
    await expect(apiInterceptPage.fetchUserDataButton).toBeVisible();
    await expect(apiInterceptPage.fetchUserDataButton).toBeEnabled();
    await expect(apiInterceptPage.successStatus).toBeHidden();

    // 2. Activate the challenge's request trigger once and wait for its API request and user-visible terminal result; do not use a fixed sleep.
    const responsePromise = page.waitForResponse((response) =>
      response.url() === API_URL && response.request().method() === 'GET'
    );
    await apiInterceptPage.clickFetchUserDataButton();
    const response = await responsePromise;

    // 3. Evaluate the outcome against the success criteria.
    expect(response.ok()).toBe(true);
    await expect(apiInterceptPage.successStatus).toHaveText('✓ 3 users loaded');
    await expect(apiInterceptPage.pendingMessage).toBeHidden();
  });
});
