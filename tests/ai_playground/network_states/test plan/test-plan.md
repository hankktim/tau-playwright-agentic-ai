# AI Playground - Network States Test Plan

## Application Overview

Plan for challenge 18, Network States, at https://webdriveruniversity.com/AI-Playground/index.html. Each scenario starts on a fresh page with the Success, Error, and Timeout controls available and no result displayed. Verify the asynchronous terminal status for successful and failed responses, and verify that the deliberately pending Timeout state can be cancelled. Prefer retrying state-based assertions; do not rely on fixed sleeps or a single generic wait strategy.

## Test Scenarios

### 1. 18. Network States

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Success Response Displays Loaded Data

**File:** `tests/ai_playground/network_states/tests/verify-success-response-displays-loaded-data.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate challenge 18, Network States, by its heading. Confirm Success, Error, and Timeout controls are visible and no result is displayed yet.
    - expect: The challenge heading identifies “18. Network States”.
    - expect: All three state controls are visible and available.
    - expect: No response result or loading message is present before an action.
  2. Click Success and wait for the response result using a retrying, state-based assertion.
    - expect: A success result is displayed with the loaded data: {"status":"ok","records":42,"page":1}.
    - expect: No error or pending/loading state remains.

#### 1.2. Verify Error Response Displays Service Unavailable

**File:** `tests/ai_playground/network_states/tests/verify-error-response-displays-service-unavailable.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate challenge 18 by its heading. Confirm all three state controls are available and no result is displayed.
    - expect: The initial challenge state has no response result or loading message.
  2. Click Error and wait for the response result using a retrying, state-based assertion.
    - expect: An error result is displayed with status 503 and the message “Service Unavailable. Retry after 30s.”
    - expect: No success data or pending/loading state remains.

#### 1.3. Verify Timeout Request Can Be Cancelled

**File:** `tests/ai_playground/network_states/tests/verify-timeout-request-can-be-cancelled.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate challenge 18 by its heading. Confirm all three state controls are available and no result is displayed.
    - expect: The initial challenge state has no response result or loading message.
  2. Click Timeout and wait for the pending request state using a retrying assertion; do not use a fixed sleep.
    - expect: The status “Waiting for server…” is displayed.
    - expect: The Cancel Request control is visible while the request is pending.
    - expect: No success or service-unavailable result is displayed.
  3. Click Cancel Request while the request is pending.
    - expect: The status “Request cancelled.” is displayed.
    - expect: The pending message and Cancel Request control are no longer displayed.
    - expect: No success or service-unavailable result replaces the cancellation result.
