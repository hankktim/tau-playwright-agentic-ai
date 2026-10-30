# AI Testing Playground - Attribute vs Visual State Test Plan

## Application Overview

Test challenge 21, Attribute vs Visual State, on https://webdriveruniversity.com/AI-Playground/index.html. The card contains a single toggle button that starts with the label "Inactive" and aria-pressed="false", plus an empty status paragraph below it. Each click flips an internal state; the visible label ALWAYS updates correctly ("Active" / "Inactive"), but on each click there is a 30% chance (Math.random() < 0.30) that aria-pressed is left at the previous value. On a synced click the status shows "aria-pressed: <true|false>" in green; on a desynced click it shows "aria-pressed: <stale value> ⚠️ attribute desynced" in red. The purpose of the challenge is that assertions must target the aria-pressed attribute (e.g. toHaveAttribute('aria-pressed', ...) or toBePressed()), not only the visible text.

Key testing notes:
- Each scenario starts in a fresh page; the toggle state is held in page memory and resets on reload.
- The button's accessible name changes with its label, so scope locators to the challenge card via the heading "21. Attribute vs Visual State" and locate the button by role within the card (name /^(Active|Inactive)$/) rather than a fixed name.
- To make scenarios deterministic, control Math.random before the click (e.g. page.addInitScript or page.evaluate to stub Math.random to return a fixed value such as 0.99 for synced or 0.0 for desynced). Do not rely on repeated clicking or fixed sleeps to hit the random branch.
- Only one unstubbed scenario (3.1) is planned; it is a defect-detection check and is expected to fail intermittently by design.

## Test Scenarios

### 1. Initial And Synced Behavior

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Toggle Initial State Is Inactive And Not Pressed

**File:** `tests/ai_playground/attribute_vs_visual_state/tests/verify-toggle-initial-state-is-inactive-and-not-pressed.test.ts`

**Steps:**
  1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and locate the challenge card by the heading "21. Attribute vs Visual State".
    - expect: The heading and the explanatory paragraph mentioning aria-pressed are visible.
    - expect: The toggle button is visible, enabled and labelled "Inactive".
    - expect: The toggle button has aria-pressed="false" (not pressed).
    - expect: The status paragraph is empty.

#### 1.2. Verify Synced Toggle On Updates Label And Aria Pressed

**File:** `tests/ai_playground/attribute_vs_visual_state/tests/verify-synced-toggle-on-updates-label-and-aria-pressed.test.ts`

**Steps:**
  1. Open the playground in a fresh page with Math.random stubbed to return 0.99 (synced branch) and locate challenge 21.
    - expect: The toggle button is labelled "Inactive" with aria-pressed="false".
  2. Click the toggle button once.
    - expect: The button label changes to "Active".
    - expect: The button has aria-pressed="true" (toBePressed passes).
    - expect: The status paragraph displays exactly "aria-pressed: true" with no desync warning.

#### 1.3. Verify Synced Toggle Off Returns To Inactive And Not Pressed

**File:** `tests/ai_playground/attribute_vs_visual_state/tests/verify-synced-toggle-off-returns-to-inactive-and-not-pressed.test.ts`

**Steps:**
  1. Open the playground in a fresh page with Math.random stubbed to return 0.99 and locate challenge 21.
    - expect: The toggle starts as "Inactive" with aria-pressed="false".
  2. Click the toggle button once.
    - expect: The label is "Active" and aria-pressed is "true".
  3. Click the toggle button a second time.
    - expect: The label returns to "Inactive".
    - expect: aria-pressed returns to "false" (not pressed).
    - expect: The status paragraph displays exactly "aria-pressed: false" with no desync warning.

#### 1.4. Verify Toggle Can Be Activated With The Keyboard

**File:** `tests/ai_playground/attribute_vs_visual_state/tests/verify-toggle-can-be-activated-with-the-keyboard.test.ts`

**Steps:**
  1. Open the playground in a fresh page with Math.random stubbed to return 0.99, locate challenge 21 and focus the toggle button.
    - expect: The toggle button is focused and labelled "Inactive".
  2. Press Space.
    - expect: The label changes to "Active" and aria-pressed is "true".
  3. Press Enter.
    - expect: The label changes back to "Inactive" and aria-pressed is "false".

### 2. Desynced Attribute Detection

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify Desynced Toggle On Keeps Aria Pressed False Despite Active Label

**File:** `tests/ai_playground/attribute_vs_visual_state/tests/verify-desynced-toggle-on-keeps-aria-pressed-false.test.ts`

**Steps:**
  1. Open the playground in a fresh page with Math.random stubbed to return 0.0 (desynced branch) and locate challenge 21.
    - expect: The toggle starts as "Inactive" with aria-pressed="false".
  2. Click the toggle button once.
    - expect: The visible label changes to "Active" — a text-only assertion would pass.
    - expect: aria-pressed remains "false", proving the attribute does not match the visual state.
    - expect: The status paragraph displays "aria-pressed: false ⚠️ attribute desynced".

#### 2.2. Verify Desynced Toggle Off Keeps Aria Pressed True Despite Inactive Label

**File:** `tests/ai_playground/attribute_vs_visual_state/tests/verify-desynced-toggle-off-keeps-aria-pressed-true.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate challenge 21. Stub Math.random to return 0.99, then click the toggle once.
    - expect: The label is "Active" and aria-pressed is "true".
  2. Stub Math.random to return 0.0, then click the toggle a second time.
    - expect: The visible label changes to "Inactive".
    - expect: aria-pressed remains "true" (button still reported as pressed).
    - expect: The status paragraph displays "aria-pressed: true ⚠️ attribute desynced".

#### 2.3. Verify Synced Click Recovers Attribute After A Desync

**File:** `tests/ai_playground/attribute_vs_visual_state/tests/verify-synced-click-recovers-attribute-after-desync.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 21, stub Math.random to return 0.0 and click the toggle once.
    - expect: Label is "Active" while aria-pressed is "false" and the desync warning is shown.
  2. Stub Math.random to return 0.99 and click the toggle again.
    - expect: Label is "Inactive" and aria-pressed is "false" — label and attribute agree again.
    - expect: The status paragraph displays exactly "aria-pressed: false" and the desync warning is gone.
  3. Click the toggle a third time (still synced).
    - expect: Label is "Active" and aria-pressed is "true".
    - expect: The status paragraph displays exactly "aria-pressed: true".

#### 2.4. Verify Desync Probability Boundary At Thirty Percent

**File:** `tests/ai_playground/attribute_vs_visual_state/tests/verify-desync-probability-boundary-at-thirty-percent.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 21, stub Math.random to return exactly 0.30 and click the toggle.
    - expect: The click is synced (the condition is strictly < 0.30): label "Active", aria-pressed "true", status "aria-pressed: true".
  2. Stub Math.random to return 0.2999 and click the toggle again.
    - expect: The click is desynced: label "Inactive" while aria-pressed stays "true".
    - expect: The status shows "aria-pressed: true ⚠️ attribute desynced".

### 3. Unstubbed Defect Detection

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify Aria Pressed Always Matches Visible Label Across Repeated Toggles

**File:** `tests/ai_playground/attribute_vs_visual_state/tests/verify-aria-pressed-always-matches-visible-label.test.ts`

**Steps:**
  1. Open the playground in a fresh page without stubbing Math.random and locate challenge 21.
    - expect: The toggle starts as "Inactive" with aria-pressed="false".
  2. Click the toggle 10 times. After each click, assert the label and then assert aria-pressed equals "true" when the label is "Active" and "false" when the label is "Inactive".
    - expect: The label alternates Active/Inactive correctly on every click.
    - expect: aria-pressed matches the label after every click (accessibility contract).
    - expect: Failure condition: with a 30% per-click desync rate this check is expected to fail in ~97% of runs, demonstrating that attribute assertions catch the defect text assertions miss. Tag as @edge and exclude from gating runs, or mark with test.fail() and a comment explaining the known defect.
