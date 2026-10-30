# AI Testing Playground - Timing Mismatch Test Plan

## Application Overview

Test challenge 17, Timing Mismatch, on https://webdriveruniversity.com/AI-Playground/index.html. The counter starts at 0 and increments every 300 ms. Capture saves the current counter value and displays it after “Captured:”. Verify compares the saved value with the live counter and displays “Nothing captured yet.” if no value was captured, “Match! (got lucky)” if both values happen to match, or “Mismatch — captured <value>, current <value>” otherwise. Each scenario starts in a fresh page. Because the counter changes asynchronously, do not assert a hard-coded count or use fixed sleeps. To reliably test a mismatch, use retrying assertions to wait until the live counter differs from the captured value before activating Verify.

## Test Scenarios

### 1. Timing Mismatch

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Verify Button Reports Missing Capture

**File:** `tests/ai_playground/timing_mismatch/tests/verify-verify-button-reports-missing-capture.test.ts`

**Steps:**
  1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and locate challenge 17, Timing Mismatch, by its heading.
    - expect: The counter displays a numeric value, without requiring a specific count.
    - expect: The Capture and Verify buttons are visible and enabled.
    - expect: The captured value displays “Captured: —” and the verification result is empty.
  2. Click Verify without first clicking Capture.
    - expect: The result displays “Nothing captured yet.”
    - expect: No captured counter value is introduced by verification.

#### 1.2. Verify Stale Capture Reports A Mismatch After Counter Advances

**File:** `tests/ai_playground/timing_mismatch/tests/verify-stale-capture-reports-mismatch-after-counter-advances.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 17, and click Capture once.
    - expect: The captured value displays a number; do not assume a specific value.
  2. Use a retrying assertion to wait until the live counter differs from the captured value, then click Verify.
    - expect: The result matches “Mismatch — captured <number>, current <number>”.
    - expect: The captured and current numbers in the result are different.
    - expect: The test uses no fixed sleep and does not rely on the narrow, nondeterministic “Match! (got lucky)” timing window.

#### 1.3. Verify A New Capture Replaces The Previous Snapshot

**File:** `tests/ai_playground/timing_mismatch/tests/verify-new-capture-replaces-previous-snapshot.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 17, and click Capture.
    - expect: The captured value displays a number.
  2. Wait with a retrying assertion until the live counter has advanced beyond the captured value, then click Capture again.
    - expect: The captured value updates to a greater number than the previous snapshot.
  3. Wait with a retrying assertion until the live counter differs from the new captured value, then click Verify.
    - expect: The result reports a mismatch between the new captured value and the current counter.
    - expect: The result does not report the first captured value as the active snapshot.
    - expect: The test uses no fixed sleeps or hard-coded counter values.
