# JS Dialog Traps Test Plan

## Application Overview

Test challenge 19, JS Dialog Traps, on https://webdriveruniversity.com/AI-Playground/index.html. Each scenario starts from a fresh page with the challenge result empty. The card provides Trigger alert(), Trigger confirm(), and Trigger prompt() buttons. The observed native dialog messages are “This is an alert dialog. Your test must handle it.”, “Do you want to proceed?”, and “Enter your name:”. Accepting confirm displays “Confirmed”; dismissing it displays “Cancelled”. Accepting the prompt with a name displays “Hello, <name>”; accepting an empty value displays “Hello,”; cancelling it displays “Prompt dismissed”. Accepting the alert leaves the result empty. Tests must register a dialog handler before each triggering click, assert dialog type/message, then accept or dismiss intentionally so execution does not hang. Do not select any browser option to suppress further dialogs. Use role/name-based button locators and retrying assertions for page results; each scenario is independent and uses a fresh page.

## Test Scenarios

### 1. JS Dialog Traps

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Alert Dialog Is Handled And Page Remains Usable

**File:** `tests/ai_playground/js_dialog_traps/tests/verify-alert-dialog-is-handled-and-page-remains-usable.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate the “19. JS Dialog Traps” card. Confirm the result area is empty and the Trigger alert() button is available.
    - expect: The JS Dialog Traps heading and Trigger alert(), Trigger confirm(), and Trigger prompt() buttons are visible.
    - expect: The result area is empty.
  2. Register a dialog handler that checks for an alert with the exact message “This is an alert dialog. Your test must handle it.” and accepts it; then activate Trigger alert().
    - expect: The handler receives a dialog of type alert with the expected message.
    - expect: The alert is accepted and closes; the result area remains empty.
  3. After the alert has closed, register a handler to accept a confirm dialog and activate Trigger confirm().
    - expect: The confirm dialog is handled without hanging the test.
    - expect: The page remains interactive and the result displays “Confirmed”.

#### 1.2. Verify Accepting Confirm Displays Confirmed Result

**File:** `tests/ai_playground/js_dialog_traps/tests/verify-confirm-acceptance-displays-confirmed-result.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate the JS Dialog Traps card.
    - expect: The result area is empty and Trigger confirm() is visible.
  2. Register a dialog handler that verifies a confirm dialog with the message “Do you want to proceed?” and accepts it; then activate Trigger confirm().
    - expect: The dialog type is confirm and its message is exactly “Do you want to proceed?”.
    - expect: The dialog closes and the result displays “Confirmed”.

#### 1.3. Verify Dismissing Confirm Displays Cancelled Result

**File:** `tests/ai_playground/js_dialog_traps/tests/verify-confirm-dismissal-displays-cancelled-result.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate the JS Dialog Traps card.
    - expect: The result area is empty and Trigger confirm() is visible.
  2. Register a dialog handler that verifies a confirm dialog with the message “Do you want to proceed?” and dismisses it; then activate Trigger confirm().
    - expect: The dialog type is confirm and its message is exactly “Do you want to proceed?”.
    - expect: The dialog closes and the result displays “Cancelled”, not “Confirmed”.

#### 1.4. Verify Accepted Prompt Name Is Greeted

**File:** `tests/ai_playground/js_dialog_traps/tests/verify-prompt-accepted-name-is-greeted.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate the JS Dialog Traps card.
    - expect: The result area is empty and Trigger prompt() is visible.
  2. Register a dialog handler that verifies a prompt dialog with the message “Enter your name:” and accepts it with the value “Taylor”; then activate Trigger prompt().
    - expect: The dialog type is prompt and its message is exactly “Enter your name:”.
    - expect: The dialog closes and the result displays “Hello, Taylor”.

#### 1.5. Verify Accepting An Empty Prompt Value Displays Greeting

**File:** `tests/ai_playground/js_dialog_traps/tests/verify-prompt-accepting-empty-value-displays-greeting.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate the JS Dialog Traps card.
    - expect: The result area is empty and Trigger prompt() is visible.
  2. Register a dialog handler that verifies a prompt dialog with the message “Enter your name:” and accepts it with an empty string; then activate Trigger prompt().
    - expect: The dialog type is prompt and its message is exactly “Enter your name:”.
    - expect: Accepting an empty value is distinguished from cancelling the prompt, and the result displays “Hello,”.

#### 1.6. Verify Cancelling Prompt Displays Dismissed Result

**File:** `tests/ai_playground/js_dialog_traps/tests/verify-prompt-cancellation-displays-dismissed-result.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate the JS Dialog Traps card.
    - expect: The result area is empty and Trigger prompt() is visible.
  2. Register a dialog handler that verifies a prompt dialog with the message “Enter your name:” and dismisses it; then activate Trigger prompt().
    - expect: The dialog type is prompt and its message is exactly “Enter your name:”.
    - expect: The dialog closes and the result displays “Prompt dismissed”, not “Hello,”.

#### 1.7. Verify New Dialog Result Replaces Previous Result

**File:** `tests/ai_playground/js_dialog_traps/tests/verify-new-dialog-result-replaces-previous-result.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate the JS Dialog Traps card.
    - expect: The result area is empty.
  2. Accept the confirm dialog, verifying its type and message, then activate Trigger confirm().
    - expect: The result displays “Confirmed”.
  3. Accept the prompt with the value “Jordan”, verifying its type and message, then activate Trigger prompt().
    - expect: The result changes to “Hello, Jordan”.
    - expect: The previous “Confirmed” result is no longer displayed.
