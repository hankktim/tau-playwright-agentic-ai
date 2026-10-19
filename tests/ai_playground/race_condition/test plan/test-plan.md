# AI Testing Playground - Race Condition Test Plan

## Application Overview

Test the Race Condition challenge at https://webdriveruniversity.com/AI-Playground/index.html. Race A and Race B run asynchronously and write their winner to one shared result. Their completion order is nondeterministic, so tests must accept either winner and must not rely on fixed delays or a predetermined result.

## Test Scenarios

### 1. Race Condition

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Concurrent Operations Produce A Single Winner

**File:** `tests/ai_playground/race_condition/tests/verify-concurrent-operations-produce-a-single-winner.test.ts`

**Steps:**
  1. Open the challenge in a fresh page and inspect the Race Condition controls.
    - expect: The Start Race A and Start Race B buttons are available.
    - expect: No winner message is visible before the race starts.
  2. Start Race A and Race B concurrently.
    - expect: The race completes and exactly one winner result is shown.
    - expect: The result is either 'Race A won!' or 'Race B won!'; do not require a predetermined winner.