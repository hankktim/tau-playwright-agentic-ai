# Invisible Success Test Plan

## Application Overview

Test challenge 16, Invisible Success (Debug Trap), on https://webdriveruniversity.com/AI-Playground/index.html. The card contains an Email textbox (placeholder “you@example.com”), a Submit button, a hidden validation error “Valid email required”, and a result paragraph `#ghost-result` that is permanently styled `visibility:hidden`. Submitting a trimmed value matching `^[^\s@]+@[^\s@]+\.[^\s@]+$` hides the error, changes the button text to “Submitting…” for about 600 ms, then writes “Form submitted successfully. Confirmation sent to <email>.” into the hidden result paragraph. An invalid value shows the error and returns without touching the result, so a previous success message stays in the DOM. The trap: `toBeVisible()` or a visible-text search on the success message will never pass, and a weak assertion (e.g. element exists) passes even before submission — a false positive. Tests must assert the result’s text content with retrying `toHaveText`/`toContainText` and explicitly assert `toBeHidden()` to document the trap. Locator notes: the page has three buttons named Submit and two inputs with the “you@example.com” placeholder, and the Email label is not programmatically associated with its input, so every locator must be scoped to the card found by the heading “16. Invisible Success”. Use exact button-name matching (“Submit” is a substring of “Submitting…”). The result paragraph has no role or text before submit, so a documented `#ghost-result` CSS locator scoped to the card is the justified last-resort selector. Keep interactions in an `InvisibleSuccessPage` page object, use no fixed sleeps, and start each scenario on a fresh page.

## Test Scenarios

### 1. Invisible Success

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Initial State Has Empty Hidden Result

**File:** `tests/ai_playground/invisible_success/tests/verify-initial-state-has-empty-hidden-result.test.ts`

**Steps:**
  1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and locate the card by the heading “16. Invisible Success”.
    - expect: The Email textbox is visible, enabled and empty.
    - expect: The card-scoped Submit button is visible, enabled and has the exact text “Submit”.
    - expect: The “Valid email required” error is hidden.
  2. Inspect the card-scoped result paragraph without submitting anything.
    - expect: The result paragraph is attached to the DOM but hidden.
    - expect: The result paragraph has empty text, proving a later success assertion cannot pass on initial state (guards against the false-positive trap).

#### 1.2. Verify Valid Email Writes Success Message To Hidden Result

**File:** `tests/ai_playground/invisible_success/tests/verify-valid-email-writes-success-to-hidden-result.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate challenge 16 by its heading.
    - expect: The result paragraph is empty before submission.
  2. Enter “tester@example.com” in the Email textbox and click the card-scoped Submit button.
    - expect: The “Valid email required” error remains hidden.
  3. Using a retrying assertion (no fixed sleep), wait for the result paragraph text.
    - expect: The result paragraph text is exactly “Form submitted successfully. Confirmation sent to tester@example.com.”
    - expect: The result paragraph is still hidden (toBeHidden), documenting that the success is written to the DOM but not visibly rendered.
    - expect: The Submit button text returns to “Submit”.

#### 1.3. Verify Submit Button Shows Submitting State Before Result Is Written

**File:** `tests/ai_playground/invisible_success/tests/verify-submitting-state-before-result.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 16 and enter “tester@example.com” in the Email textbox.
    - expect: The Submit button shows “Submit”.
  2. Click Submit and immediately assert the button text with a retrying assertion.
    - expect: The button text changes to “Submitting…” (assert with exact text, not a substring match on “Submit”).
  3. Wait for the asynchronous submission to complete using retrying assertions.
    - expect: The button text returns to “Submit”.
    - expect: The hidden result paragraph contains “Confirmation sent to tester@example.com”.
    - expect: No fixed timeout equal to the ~600 ms delay is used.

#### 1.4. Verify Invalid Emails Show Validation Error And No Success

**File:** `tests/ai_playground/invisible_success/tests/verify-invalid-emails-are-rejected.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate challenge 16. Run as a data-driven test (one test per value) over: empty string, whitespace only “   ”, “plainaddress”, “user@”, “@example.com”, “user@example” (no dot in domain), “user name@example.com” (inner space).
    - expect: Each data case starts from a fresh page.
  2. Enter the invalid value in the Email textbox and click the card-scoped Submit button.
    - expect: The “Valid email required” error becomes visible.
    - expect: The Submit button text stays “Submit” (no “Submitting…” state).
    - expect: The hidden result paragraph remains empty (assert toHaveText('') with retrying timeout long enough to cover the ~600 ms async path).

#### 1.5. Verify Minimal Valid Email And Trimmed Input Are Accepted

**File:** `tests/ai_playground/invisible_success/tests/verify-boundary-and-trimmed-emails-are-accepted.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 16, enter the minimal valid email “a@b.c” and click Submit.
    - expect: The validation error stays hidden.
    - expect: The hidden result text is “Form submitted successfully. Confirmation sent to a@b.c.”
  2. In a separate fresh page, enter “  tester@example.com  ” (leading and trailing spaces) and click Submit.
    - expect: The input is trimmed before validation, so the error stays hidden.
    - expect: The hidden result text contains “Confirmation sent to tester@example.com.” without surrounding spaces.

#### 1.6. Verify Successful Submission Clears Previous Validation Error

**File:** `tests/ai_playground/invisible_success/tests/verify-success-clears-previous-error.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 16, enter “invalid-email” and click Submit.
    - expect: The “Valid email required” error is visible.
    - expect: The result paragraph is empty.
  2. Replace the value with “tester@example.com” and click Submit.
    - expect: The validation error becomes hidden.
    - expect: The hidden result text becomes “Form submitted successfully. Confirmation sent to tester@example.com.”

#### 1.7. Verify New Valid Submission Replaces Previous Result

**File:** `tests/ai_playground/invisible_success/tests/verify-new-submission-replaces-previous-result.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 16, submit “first@example.com” and wait for the hidden result.
    - expect: The hidden result contains “Confirmation sent to first@example.com.”
  2. Replace the value with “second@example.com”, click Submit and wait with a retrying assertion.
    - expect: The hidden result text is exactly “Form submitted successfully. Confirmation sent to second@example.com.”
    - expect: The previous email no longer appears in the result.

#### 1.8. Verify Invalid Submission After Success Leaves Stale Result

**File:** `tests/ai_playground/invisible_success/tests/verify-invalid-submission-after-success-leaves-stale-result.test.ts`

**Steps:**
  1. Open the playground in a fresh page, locate challenge 16, submit “tester@example.com” and wait for the hidden success result.
    - expect: The hidden result contains “Confirmation sent to tester@example.com.”
  2. Replace the value with “not-an-email” and click Submit.
    - expect: The “Valid email required” error becomes visible.
    - expect: Observed current behavior: the previous success text is NOT cleared and still reads “Confirmation sent to tester@example.com.” — document this as a stale-state finding (a test asserting only the success text after this step would produce a false positive). Tag @edge and annotate as current behavior rather than a requirement.
