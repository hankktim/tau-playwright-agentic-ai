// spec: tests/ai_playground/api_intercept/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ApiInterceptPage } from '../POM/ApiInterceptPage';

const API_URL = 'https://webdriveruniversity.com/api/user.json';

test.describe('23. API Intercept', () => {
  test('Verify Intercepted Server Error Is Handled', async ({ page }) => {
    const apiInterceptPage = new ApiInterceptPage(page);

    // 1. Open the playground in a fresh page and locate challenge 23. Identify the API request URL and the user action that initiates it; confirm the initial state has no prior result.
    await apiInterceptPage.navigateToChallenge();
    await expect(apiInterceptPage.challengeHeading).toHaveText('23. API Intercept');
    await expect(apiInterceptPage.fetchUserDataButton).toBeVisible();
    await expect(apiInterceptPage.fetchUserDataButton).toBeEnabled();
    await expect(apiInterceptPage.successStatus).toBeHidden();

    // 2. Before activating the trigger, install a Playwright route for the challenge API request that returns an appropriate server-error status (for example, HTTP 500). Activate the trigger once and wait for the user-visible terminal state.
    await page.route(API_URL, async (route) => {
      expect(route.request().method()).toBe('GET');
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Simulated server error' }),
      });
    });

    const responsePromise = page.waitForResponse((response) =>
      response.url() === API_URL && response.request().method() === 'GET'
    );
    await apiInterceptPage.clickFetchUserDataButton();
    const response = await responsePromise;

    // 3. Evaluate the outcome against the success criteria.
    expect(response.status()).toBe(500);
    await expect(apiInterceptPage.errorFeedback).toBeVisible();
    await expect(apiInterceptPage.successStatus).toBeHidden();
    await expect(apiInterceptPage.pendingMessage).toBeHidden();
  });
});
