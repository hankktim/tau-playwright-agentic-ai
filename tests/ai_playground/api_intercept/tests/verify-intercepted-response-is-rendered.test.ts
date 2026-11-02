// spec: tests/ai_playground/api_intercept/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { ApiInterceptPage } from '../POM/ApiInterceptPage';

const API_URL = 'https://webdriveruniversity.com/api/user.json';
const MOCKED_USER = {
  id: 987,
  name: 'INTERCEPT_SENTINEL_42',
  email: 'sentinel@example.test',
  role: 'Mocked SDET',
};

test.describe('23. API Intercept', () => {
  test('Verify Intercepted Response Is Rendered', async ({ page }) => {
    const apiInterceptPage = new ApiInterceptPage(page);

    // 1. Open the playground in a fresh page, locate challenge 23, and identify its API request URL, method, and response schema from the challenge request. Choose a unique sentinel value in a valid response field.
    await apiInterceptPage.navigateToChallenge();
    await expect(apiInterceptPage.challengeHeading).toHaveText('23. API Intercept');
    await expect(apiInterceptPage.fetchUserDataButton).toBeVisible();
    await expect(apiInterceptPage.successStatus).toBeHidden();
    await expect(apiInterceptPage.userName(MOCKED_USER.name)).toBeHidden();

    // 2. Before activating the request trigger, install a Playwright route for the observed challenge API request that fulfills it with a schema-valid success response containing the unique sentinel value. Activate the trigger once.
    let intercepted = false;
    await page.route(API_URL, async (route) => {
      expect(route.request().method()).toBe('GET');
      intercepted = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([MOCKED_USER]),
      });
    });

    await apiInterceptPage.clickFetchUserDataButton();

    // 3. Evaluate the outcome against the success criteria.
    expect(intercepted).toBe(true);
    await expect(apiInterceptPage.successStatus).toHaveText('✓ 1 users loaded');
    await expect(apiInterceptPage.userName(MOCKED_USER.name)).toBeVisible();
    await expect(apiInterceptPage.userName('Alex Johnson')).toBeHidden();
    await expect(apiInterceptPage.userName('Sarah Mitchell')).toBeHidden();
    await expect(apiInterceptPage.userName('James Carter')).toBeHidden();
    await expect(apiInterceptPage.pendingMessage).toBeHidden();
  });
});
