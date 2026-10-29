# Lazy-Rendered Element Test Plan

## Application Overview

Test challenge 9, Lazy-Rendered Element, on the WebDriver University AI Testing Playground (https://webdriveruniversity.com/AI-Playground/index.html). Each scenario starts from a fresh page with the challenge's Reveal Element button visible and its result hidden. Activating the button reveals “I just appeared! Selector:” followed by a generated selector in #lazy-<number> form. Tests should use retrying visibility assertions to wait for the result rather than fixed sleeps and must not hard-code the generated number. Pass when the expected hidden, revealed, and reset states are verified; fail if the result appears prematurely, does not become visible after activation, or contradicts the stated behavior.

## Test Scenarios

### 1. Lazy-Rendered Element

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Result Is Hidden Before Activation

**File:** `tests/ai_playground/lazy_rendered_element/tests/verify-result-is-hidden-before-activation.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 9, Lazy-Rendered Element.
    - expect: The “9. Lazy-Rendered Element” heading and “Reveal Element” button are visible.
  2. Check the challenge result before clicking “Reveal Element.”
    - expect: The “I just appeared!” result and generated selector are not visible.

#### 1.2. Verify Result Appears After Reveal

**File:** `tests/ai_playground/lazy_rendered_element/tests/verify-result-appears-after-reveal.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 9.
    - expect: The “Reveal Element” button is visible and the result is initially hidden.
  2. Click “Reveal Element,” then wait for the result to become visible using a retrying visibility assertion; do not use a fixed sleep.
    - expect: The result becomes visible and contains “I just appeared!” and “Selector:”.
    - expect: The displayed selector follows the #lazy-<number> pattern; its generated number is not assumed to be constant.

#### 1.3. Verify Repeat Reveal Does Not Duplicate Result

**File:** `tests/ai_playground/lazy_rendered_element/tests/verify-repeat-reveal-does-not-duplicate-result.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page, locate challenge 9, click “Reveal Element,” and wait until the result is visible.
    - expect: One visible result contains “I just appeared!” and a generated selector.
  2. Click “Reveal Element” again and wait for the result to remain visible.
    - expect: The result remains visible and contains a selector in #lazy-<number> form.
    - expect: Only one result is displayed; repeated activation does not create duplicate visible results.

#### 1.4. Verify Reload Resets Result To Hidden

**File:** `tests/ai_playground/lazy_rendered_element/tests/verify-reload-resets-result-to-hidden.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page, locate challenge 9, click “Reveal Element,” and wait until the result is visible.
    - expect: The revealed result is visible before reloading.
  2. Reload the page and locate challenge 9 again.
    - expect: The “Reveal Element” button is visible and the result is hidden again.
  3. Click “Reveal Element” after the reload and wait for the result to become visible.
    - expect: The result can be revealed again and contains “I just appeared!” with a generated selector.
