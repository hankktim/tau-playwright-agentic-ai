# AI Testing Playground - Mutation Observer Test Plan

## Application Overview

Test challenge 22, Mutation Observer, on https://webdriveruniversity.com/AI-Playground/index.html. The card (heading "22. Mutation Observer", subtitle "Items are added asynchronously. Fixed waits will fail — wait for the state, not the clock.") contains three buttons — Start, Stop, Reset — a counter paragraph "Items: <n> / 10" and an initially empty unordered list. Clicking Start begins a setInterval (800 ms) that appends one list item per tick, in this fixed order: "Set up CI pipeline", "Fix XSS vulnerability", "Add input validation", "Migrate to TypeScript", "Write E2E test suite", "Refactor auth module", "Add API pagination", "Implement dark mode", "Update README docs", "Deploy to production". The counter updates with each item; the interval stops itself when 10 items exist. Start is ignored while already running or once 10 items exist. Stop clears the interval but keeps the items and count (Start resumes from the current count). Reset clears the interval, empties the list and sets the counter to 0, even mid-run.

Key testing notes:
- Each scenario starts in a fresh page; state lives in page memory and resets on reload.
- Scope all locators to the challenge card via the heading "22. Mutation Observer" (e.g. a card locator filtered by that heading); use getByRole('button', { name: 'Start' | 'Stop' | 'Reset' }), getByRole('listitem') and getByText(/Items: \d+ \/ 10/) inside the card.
- The core lesson: never use fixed waits (waitForTimeout) to wait for items. Use retrying web-first assertions such as toHaveCount, toHaveText (array) and toContainText, with an explicit timeout comfortably above 10 × 800 ms (e.g. 15 s) for the full-list scenarios.
- For deterministic Stop/negative scenarios, prefer page.clock (install before navigation, then runFor/fastForward) to control the 800 ms interval instead of real-time sleeps. Where real time is used, assert a stable state with a retrying assertion rather than sleeping.

## Test Scenarios

### 1. 1. Initial State And Happy Path

**Seed:** `tests/seed.spec.ts`

#### 1.1. 1.1. Verify Mutation Observer Initial State Shows Zero Items

**File:** `tests/ai_playground/mutation_observer/tests/verify-mutation-observer-initial-state-shows-zero-items.test.ts`

**Steps:**
  1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and locate the challenge card by the heading "22. Mutation Observer".
    - expect: The heading and the subtitle "Items are added asynchronously. Fixed waits will fail — wait for the state, not the clock." are visible.
    - expect: The Start, Stop and Reset buttons are visible and enabled.
    - expect: The counter reads "Items: 0 / 10".
    - expect: The card contains zero list items.

#### 1.2. 1.2. Verify Start Adds First Item Asynchronously

**File:** `tests/ai_playground/mutation_observer/tests/verify-start-adds-first-item-asynchronously.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate challenge 22.
    - expect: The counter reads "Items: 0 / 10" and the list is empty.
  2. Click the Start button and wait for state using a retrying assertion (no fixed wait).
    - expect: Immediately after the click the list may still be empty — items are not added synchronously.
    - expect: A list item with text "Set up CI pipeline" becomes visible.
    - expect: The counter updates to at least "Items: 1 / 10".

#### 1.3. 1.3. Verify All Ten Items Are Added In Order

**File:** `tests/ai_playground/mutation_observer/tests/verify-all-ten-items-are-added-in-order.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 22 and click Start.
    - expect: Items begin appearing in the list.
  2. Wait for the list to reach 10 items using toHaveCount(10) with a timeout of about 15 s (no waitForTimeout).
    - expect: The list contains exactly 10 items.
    - expect: The items appear in order: "Set up CI pipeline", "Fix XSS vulnerability", "Add input validation", "Migrate to TypeScript", "Write E2E test suite", "Refactor auth module", "Add API pagination", "Implement dark mode", "Update README docs", "Deploy to production" (toHaveText with an array).
    - expect: The counter reads "Items: 10 / 10".

#### 1.4. 1.4. Verify Counter Stays In Sync With List Item Count

**File:** `tests/ai_playground/mutation_observer/tests/verify-counter-stays-in-sync-with-list-item-count.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 22 and click Start.
    - expect: Items begin appearing.
  2. For n = 1..10, wait with retrying assertions for the list to have n items and the counter to read "Items: n / 10".
    - expect: At each step the counter value equals the number of list items.
    - expect: The nth item text matches the nth expected todo.

### 2. 2. Stop, Resume And Reset Controls

**Seed:** `tests/seed.spec.ts`

#### 2.1. 2.1. Verify Stop Pauses Item Generation

**File:** `tests/ai_playground/mutation_observer/tests/verify-stop-pauses-item-generation.test.ts`

**Steps:**
  1. Install page.clock before navigating, open the playground in a fresh page and locate challenge 22.
    - expect: Counter reads "Items: 0 / 10".
  2. Click Start and advance the clock by 2400 ms (three ticks).
    - expect: The list contains 3 items and the counter reads "Items: 3 / 10".
  3. Click Stop and advance the clock by a further 5000 ms.
    - expect: The list still contains exactly 3 items.
    - expect: The counter still reads "Items: 3 / 10".

#### 2.2. 2.2. Verify Start Resumes From Current Count After Stop

**File:** `tests/ai_playground/mutation_observer/tests/verify-start-resumes-from-current-count-after-stop.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 22, click Start and wait until the list has at least 2 items, then click Stop.
    - expect: Item generation is paused at the current count N; the existing items remain.
  2. Click Start again and wait for the list to reach 10 items (retrying assertion, ~15 s timeout).
    - expect: Items continue from N+1 — no duplicates and no restart from item 1.
    - expect: The final list has exactly 10 items in the expected order and the counter reads "Items: 10 / 10".

#### 2.3. 2.3. Verify Reset Clears Items After Completion

**File:** `tests/ai_playground/mutation_observer/tests/verify-reset-clears-items-after-completion.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 22, click Start and wait for 10 items.
    - expect: Counter reads "Items: 10 / 10".
  2. Click Reset.
    - expect: The list contains zero items.
    - expect: The counter reads "Items: 0 / 10".
  3. Click Start again and wait for the first item.
    - expect: Generation restarts from the beginning: the first item is "Set up CI pipeline".

#### 2.4. 2.4. Verify Reset While Running Stops And Clears The List

**File:** `tests/ai_playground/mutation_observer/tests/verify-reset-while-running-stops-and-clears-the-list.test.ts`

**Steps:**
  1. Install page.clock before navigating, open the playground, locate challenge 22, click Start and advance the clock by 1600 ms.
    - expect: The list contains 2 items.
  2. Click Reset (without clicking Stop) and advance the clock by 5000 ms.
    - expect: The list stays empty — the interval was cleared by Reset.
    - expect: The counter remains "Items: 0 / 10".

### 3. 3. Edge Cases And Negative Scenarios

**Seed:** `tests/seed.spec.ts`

#### 3.1. 3.1. Verify Repeated Start Clicks Do Not Speed Up Or Duplicate Items

**File:** `tests/ai_playground/mutation_observer/tests/verify-repeated-start-clicks-do-not-duplicate-items.test.ts`

**Steps:**
  1. Install page.clock before navigating, open the playground and locate challenge 22.
    - expect: Counter reads "Items: 0 / 10".
  2. Click Start three times in quick succession, then advance the clock by 800 ms.
    - expect: Exactly 1 item is present (only one interval runs).
    - expect: The counter reads "Items: 1 / 10".
  3. Advance the clock by another 1600 ms.
    - expect: Exactly 3 items are present with no duplicate texts.

#### 3.2. 3.2. Verify Start Has No Effect Once Ten Items Exist

**File:** `tests/ai_playground/mutation_observer/tests/verify-start-has-no-effect-once-ten-items-exist.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 22, click Start and wait for 10 items.
    - expect: Counter reads "Items: 10 / 10".
  2. Click Start again and allow at least two interval periods to elapse (preferably via page.clock).
    - expect: The list still contains exactly 10 items — no 11th item.
    - expect: The counter still reads "Items: 10 / 10" and never exceeds the maximum.

#### 3.3. 3.3. Verify Stop And Reset Are Safe Before Start

**File:** `tests/ai_playground/mutation_observer/tests/verify-stop-and-reset-are-safe-before-start.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate challenge 22. Click Stop, then Reset.
    - expect: No error is thrown (no page errors in the console).
    - expect: The list remains empty and the counter reads "Items: 0 / 10".
  2. Click Start and wait for the first item.
    - expect: The first item "Set up CI pipeline" appears and the counter reads "Items: 1 / 10" or higher.

#### 3.4. 3.4. Verify Items Are Not Present Synchronously After Start

**File:** `tests/ai_playground/mutation_observer/tests/verify-items-are-not-present-synchronously-after-start.test.ts`

**Steps:**
  1. Install page.clock before navigating, open the playground and locate challenge 22. Click Start without advancing the clock.
    - expect: The list contains zero items and the counter reads "Items: 0 / 10" — demonstrates that a non-retrying/immediate check would fail.
  2. Advance the clock by 799 ms.
    - expect: The list still contains zero items (boundary just before the first tick).
  3. Advance the clock by 1 ms more (800 ms total).
    - expect: Exactly 1 item "Set up CI pipeline" is present and the counter reads "Items: 1 / 10".
