# Shadow DOM Widget Test Plan

## Application Overview

Test challenge 11, Shadow DOM Widget, on https://webdriveruniversity.com/AI-Playground/index.html. Each scenario starts from a fresh page with an empty widget. The custom element host is `wdu-shadow-form`; its shadow-root internals are reachable through user-facing locators: a textbox with placeholder `Enter any value`, a `Submit` button, and a result paragraph. Clicking Submit with an empty or whitespace-only value displays `Please enter a value.` A non-empty value displays `Echo: <submitted value>` and is echoed exactly. A later submission replaces the prior result. Pressing Enter in the textbox alone does not submit; the result remains empty until the Submit button is activated. Keep interactions in a page object such as `tests/ai_playground/shadow_dom/POM/ShadowDomWidgetPage.ts`, scope locators to the custom-element host to avoid other Submit buttons on the index page, and use retrying assertions without fixed sleeps.

## Test Scenarios

### 1. Shadow DOM Widget

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Valid Value Is Echoed Exactly

**File:** `tests/ai_playground/shadow_dom/tests/verify-valid-value-is-echoed.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 11, Shadow DOM Widget.
    - expect: The challenge heading is visible.
    - expect: The widget textbox and its Submit button are visible within the Shadow DOM widget.
    - expect: The result area is empty.
  2. Enter `Playwright probe 123` in the textbox and activate the widget's Submit button.
    - expect: The textbox contains `Playwright probe 123`.
    - expect: The result displays exactly `Echo: Playwright probe 123`.

#### 1.2. Verify Empty And Whitespace Values Are Rejected

**File:** `tests/ai_playground/shadow_dom/tests/verify-empty-and-whitespace-input-are-rejected.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 11. Leave the textbox empty and activate Submit.
    - expect: The result displays `Please enter a value.`.
    - expect: No Echo success result is displayed.
  2. Enter only spaces in the textbox and activate Submit again.
    - expect: The result displays `Please enter a value.`.
    - expect: The whitespace-only value is not echoed as a successful submission.

#### 1.3. Verify New Submission Replaces Previous Result

**File:** `tests/ai_playground/shadow_dom/tests/verify-new-submission-replaces-previous-result.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page. Enter `first value` and activate Submit.
    - expect: The result displays exactly `Echo: first value`.
  2. Replace the textbox value with `second value` and activate Submit.
    - expect: The result displays exactly `Echo: second value`.
    - expect: The previous `Echo: first value` result is no longer displayed.
  3. Clear the textbox and activate Submit once more.
    - expect: The result displays `Please enter a value.`.
    - expect: The prior success result is no longer displayed.

#### 1.4. Verify Enter Key Does Not Submit Without Button Activation

**File:** `tests/ai_playground/shadow_dom/tests/verify-enter-key-does-not-submit.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and enter `keyboard submit` in the widget textbox.
    - expect: The textbox contains `keyboard submit`.
    - expect: The result area is initially empty.
  2. Press Enter while the textbox is focused.
    - expect: The result area remains empty; pressing Enter alone does not submit the value.
  3. Activate the widget's Submit button.
    - expect: The result displays exactly `Echo: keyboard submit`.
