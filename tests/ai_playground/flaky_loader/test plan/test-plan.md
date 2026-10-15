# AI Testing Playground - Flaky Loader Test Plan

## Application Overview

Test the WebDriver University AI Testing Playground Flaky Loader challenge at https://webdriveruniversity.com/AI-Playground/index.html. Start each scenario in a fresh page. The challenge exposes a Load Content button, may show a transient Loading... state, and eventually renders the exact message Content loaded successfully! The load delay varies, so tests should wait on user-visible terminal content with Playwright's retrying assertions rather than fixed sleeps. A fresh navigation resets the challenge to its initial state. No separate loader error state was observed.

## Test Scenarios

### 1. Flaky Loader

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Content Loads Eventually Without Fixed Waits

**File:** `tests/ai_playground/flaky_loader/tests/verify-content-loads-eventually.test.ts`

**Steps:**
  1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and inspect the Flaky Loader challenge.
    - expect: The Load Content button is visible and enabled.
    - expect: Content loaded successfully! is not visible before the button is activated.
  2. Click the Load Content button once, then wait for the exact success message using a retrying visibility assertion; do not use a fixed sleep or require the transient Loading... text to be observed.
    - expect: Content loaded successfully! becomes visible within the configured assertion timeout.
    - expect: The flow fails if the success message never appears or if the test only passes by relying on an arbitrary delay.

#### 1.2. Verify Loader Resets And Loads Again After Reload

**File:** `tests/ai_playground/flaky_loader/tests/verify-loader-resets-and-loads-again-after-reload.test.ts`

**Steps:**
  1. Open the challenge in a fresh page, click Load Content, and wait for Content loaded successfully! to become visible.
    - expect: The initial load completes and the success message is visible.
  2. Reload the page and inspect the Flaky Loader challenge before activating it again.
    - expect: The Load Content button is visible and enabled.
    - expect: Content loaded successfully! is no longer visible after reload.
  3. Click Load Content again and wait for the exact success message using a retrying visibility assertion rather than a fixed sleep.
    - expect: Content loaded successfully! becomes visible again within the configured assertion timeout.
    - expect: The scenario passes independently and does not rely on state from another test.
