# AI Testing Playground - New Tab / Popup Test Plan

## Application Overview

Test challenge 24, New Tab / Popup, on the WebDriver University AI Testing Playground. Scenarios start from a fresh page at the challenge and verify that activating its popup control opens the challenge-configured destination in a separate page, that the original page remains available, and that closing and reopening the popup works. Resolve the expected popup URL and content from the challenge control when implementing; do not assume a destination that has not been confirmed. A missing popup, blank page, unexpected destination, or navigation of the original page is a failure.

The challenge handler calls `window.open('', '_blank')`, which resolves to the current playground URL, then writes an Order Confirmation document into the new page. The popup has an empty title; identify its intended content by the “Order Confirmation” heading and “WDU-POPUP-001” reference. An empty document is a failure, even though the document is populated through `document.write`.

## Test Scenarios

### 1. New Tab / Popup

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Popup Opens In A Separate Page

**File:** `tests/ai_playground/new_tab_popup/tests/verify-popup-opens-in-separate-page.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate the “24. New Tab / Popup” challenge. Confirm the challenge popup control is available.
    - expect: The New Tab / Popup challenge and its popup control are visible.
    - expect: The current page is the original AI Testing Playground page and is ready for the action.
  2. Wait for the popup event before activating the challenge popup control.
    - expect: The action opens a separate popup page; the test does not time out waiting for it.
    - expect: The original page remains open.
  3. Wait for the popup page to finish navigating, then inspect its URL and visible page content.
    - expect: The popup URL matches the AI Testing Playground URL resolved by the challenge control.
    - expect: The popup visibly contains the “Order Confirmation” heading and “WDU-POPUP-001” reference, and is not an empty document or error page.
    - expect: The popup is distinct from the original page.

#### 1.2. Verify Popup Leaves The Original Page Unchanged And Usable

**File:** `tests/ai_playground/new_tab_popup/tests/verify-popup-does-not-navigate-original-page.test.ts`

**Steps:**
  1. Open the challenge from a fresh page and record the original page URL and challenge heading.
    - expect: The original page is at the AI Testing Playground and shows the New Tab / Popup challenge.
  2. Wait for a popup event and activate the popup control; retain references to both pages.
    - expect: A separate popup page opens at the AI Testing Playground URL resolved by the challenge control.
    - expect: The popup displays the intended confirmation heading and reference.
    - expect: The original page URL and challenge heading remain unchanged.
  3. Return focus to the original page and activate the popup control again while waiting for the resulting popup behavior.
    - expect: The original page remains interactive and does not navigate to the popup destination.
    - expect: The popup behavior matches the challenge design and does not produce an empty or unintended page.

#### 1.3. Verify Popup Can Be Closed And Reopened

**File:** `tests/ai_playground/new_tab_popup/tests/verify-popup-can-be-closed-and-reopened.test.ts`

**Steps:**
  1. Open the challenge in a fresh page, activate its popup control after registering a popup-event wait, and wait for the intended page to load.
    - expect: A separate popup page opens at the AI Testing Playground URL with the intended confirmation content.
  2. Close the popup page and verify the original page remains open at the New Tab / Popup challenge.
    - expect: The popup page closes.
    - expect: The original page remains available and at its prior URL.
  3. Activate the popup control again while waiting for a new popup event.
    - expect: A popup opens again at the same intended URL with the same confirmation content.
    - expect: The original page remains open and usable.

#### 1.4. Verify Popup Is Not Blank Or Routed To An Unexpected Destination

**File:** `tests/ai_playground/new_tab_popup/tests/verify-popup-does-not-open-as-blank-or-unexpected-destination.test.ts`

**Steps:**
  1. Open the challenge from a fresh page and register a popup-event wait before activating the popup control.
    - expect: The popup event is observed without relying on fixed delays.
  2. Wait for popup navigation to settle and inspect the popup's final URL, title, and visible content.
    - expect: The final URL matches the AI Testing Playground URL resolved for challenge 24.
    - expect: Although the popup title is empty, the visible heading and reference identify the intended confirmation page.
    - expect: An empty document, unrelated content, browser error page, or navigation of the original page is a failure.
