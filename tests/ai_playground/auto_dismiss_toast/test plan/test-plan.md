# Auto-Dismiss Toast Test Plan

## Application Overview

Test section 4, Auto-Dismiss Toast, on https://webdriveruniversity.com/AI-Playground/index.html. Start each scenario in a fresh page. On initial load, a toast element contains “Notification triggered” but has computed opacity 0; it has no role or aria-live attribute. Clicking Trigger Toast changes the message to “Action completed”; in manual observation, it reached opacity 1, began fading about two seconds after the click, and completed the fade about 2.3 seconds after the click. The element remains in the DOM with display:block and visibility:visible after fading, so do not use DOM removal or Playwright toBeHidden() as the dismissal criterion. Locate the trigger by accessible button name and the message by exact visible text; use retrying CSS opacity assertions and avoid fixed sleeps.

## Test Scenarios

### 1. Auto-Dismiss Toast

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Toast Appears And Auto-Dismisses

**File:** `tests/ai_playground/auto_dismiss_toast/tests/verify-toast-appears-and-auto-dismisses.test.ts`

**Steps:**
  1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and locate section 4, Auto-Dismiss Toast.
    - expect: The Trigger Toast button is visible and enabled.
    - expect: The toast is initially transparent (computed opacity is 0); do not treat the initial “Notification triggered” text in the DOM as an active notification.
  2. Click Trigger Toast once, then locate the exact “Action completed” message.
    - expect: The toast message changes to “Action completed”.
    - expect: The toast reaches computed opacity 1, confirming it became visible; use a retrying assertion rather than checking visibility alone.
  3. Wait for the toast's computed opacity to return to 0 using a retrying assertion; do not use a fixed sleep.
    - expect: The toast fades to computed opacity 0 after its short display interval.
    - expect: The message may remain in the DOM and Playwright may still report it visible, so opacity 0 is the dismissal criterion.

#### 1.2. Verify Toast Can Be Triggered Again After Dismissal

**File:** `tests/ai_playground/auto_dismiss_toast/tests/verify-toast-can-be-triggered-again-after-dismissal.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the Auto-Dismiss Toast challenge.
    - expect: The Trigger Toast button is visible and enabled.
    - expect: The toast is initially transparent (computed opacity is 0).
  2. Click Trigger Toast and wait until “Action completed” reaches computed opacity 0.
    - expect: The first toast fades out without requiring a page reload.
    - expect: The first toast reaches computed opacity 1 before fading.
    - expect: The toast message may remain in the DOM after fading.
  3. Click Trigger Toast again and wait for the toast to return to computed opacity 1, then wait for opacity to return to 0.
    - expect: The second trigger shows “Action completed” again.
    - expect: The second notification also fades to opacity 0.
    - expect: The test passes independently from the first scenario and uses state-based waits, not fixed sleeps.
