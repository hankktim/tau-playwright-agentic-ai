# AI Testing Playground - API Intercept Test Plan

## Application Overview

Plan for challenge 23, API Intercept, at https://webdriveruniversity.com/AI-Playground/index.html. The “Fetch User Data” control issues a GET request to `https://webdriveruniversity.com/api/user.json`, which returns a JSON array of users with `id`, `name`, `email`, and `role` fields. A successful response displays a loaded-user count and user cards. Scenarios cover the normal API response, an intercepted successful response with a distinctive mocked value, and an intercepted server failure. Start every scenario in a fresh page and use the observed endpoint and schema for request routing.

## Test Scenarios

### 1. 23. API Intercept

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify API Request Displays Successful Response

**File:** `tests/ai_playground/api_intercept/tests/verify-api-request-displays-successful-response.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate the challenge headed “23. API Intercept”. Identify its API-triggering control and the initial state before interacting.
    - expect: The challenge heading identifies “23. API Intercept”.
    - expect: The challenge’s request trigger is visible and usable.
    - expect: No result from a previous request is present.
  2. Activate the challenge's request trigger once and wait for its API request and user-visible terminal result; do not use a fixed sleep.
    - expect: The request completes successfully.
    - expect: The challenge displays the successful response or result provided by the API.
    - expect: No loading or pending state remains after completion.
  3. Evaluate the outcome against the success criteria.
    - expect: Pass if one request produces a visible successful result and the challenge leaves no pending state.
    - expect: Fail if no request is made, the successful result is not displayed, or the challenge remains pending.

#### 1.2. Verify Intercepted Response Is Rendered

**File:** `tests/ai_playground/api_intercept/tests/verify-intercepted-response-is-rendered.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 23, and identify its API request URL, method, and response schema from the challenge request. Choose a unique sentinel value in a valid response field.
    - expect: The request details and response shape are identified before interception is configured.
    - expect: The challenge has no result from an earlier request.
  2. Before activating the request trigger, install a Playwright route for the observed challenge API request that fulfills it with a schema-valid success response containing the unique sentinel value. Activate the trigger once.
    - expect: The challenge request is fulfilled by the configured route.
    - expect: The challenge displays the unique mocked sentinel value from the intercepted response.
    - expect: The challenge does not display a conflicting value from the unmocked response, and no pending state remains.
  3. Evaluate the outcome against the success criteria.
    - expect: Pass only if the intended request is intercepted and the UI renders the mocked response value.
    - expect: Fail if the real response wins, the mocked value is absent, or the request is not intercepted.

#### 1.3. Verify Intercepted Server Error Is Handled

**File:** `tests/ai_playground/api_intercept/tests/verify-intercepted-server-error-is-handled.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate challenge 23. Identify the API request URL and the user action that initiates it; confirm the initial state has no prior result.
    - expect: The challenge request trigger is available.
    - expect: No result from a previous request is displayed.
  2. Before activating the trigger, install a Playwright route for the challenge API request that returns an appropriate server-error status (for example, HTTP 500). Activate the trigger once and wait for the user-visible terminal state.
    - expect: The challenge presents visible failure feedback for the unsuccessful request.
    - expect: A successful response is not shown for the failed request.
    - expect: The challenge does not remain in a loading or pending state.
  3. Evaluate the outcome against the success criteria.
    - expect: Pass if the intercepted server failure is surfaced as a failure and no success result or indefinite pending state remains.
    - expect: Fail if the app presents the failed request as successful or provides no terminal user-visible state.
