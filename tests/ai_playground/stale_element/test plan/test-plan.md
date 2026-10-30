# Stale Element Test Plan

## Application Overview

Test challenge 15, Stale Element, on the WebDriver University AI Testing Playground (https://webdriveruniversity.com/AI-Playground/index.html). Each scenario starts from a fresh page. The challenge displays five clickable task items that automatically rebuild every 2.5 seconds, provides a Force Re-render button, and reports a selected task as “Clicked: <item> — <time>”. Use accessible, freshly-resolved locators rather than cached element handles or generated DOM identifiers. Verify automatic rebuilds through observable evidence of node replacement rather than fixed sleeps; do not assume an exact timestamp. Pass when task items remain selectable and feedback reflects the most recent selection before and after re-renders; fail if feedback is missing, stale, or reports the wrong item.

## Test Scenarios

### 1. Stale Element

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Initial Task List And Empty Feedback

**File:** `tests/ai_playground/stale_element/tests/verify-initial-list-and-empty-feedback.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 15, Stale Element.
    - expect: The “15. Stale Element” heading, five task items (“Review PR #42”, “Fix build error”, “Update changelog”, “Deploy to staging”, and “Write test report”), and “Force Re-render” button are visible.
  2. Inspect the challenge feedback before selecting a task.
    - expect: No “Clicked:” feedback is shown before the first selection.

#### 1.2. Verify Task Selection Shows Current Feedback

**File:** `tests/ai_playground/stale_element/tests/verify-task-selection-shows-current-feedback.test.ts`

**Steps:**
  1. Open challenge 15 in a fresh page and select “Update changelog” from the task list.
    - expect: The feedback shows “Clicked: Update changelog” followed by a generated time.
    - expect: The feedback corresponds to the selected task; do not assert an exact time.

#### 1.3. Verify Task Remains Selectable After Forced Re-render

**File:** `tests/ai_playground/stale_element/tests/verify-task-remains-selectable-after-forced-rerender.test.ts`

**Steps:**
  1. Open challenge 15 in a fresh page and click “Force Re-render”.
    - expect: The five task items remain visible after the list rebuilds.
  2. After the re-render, locate and click “Deploy to staging” using its current visible text, not a previously captured element handle.
    - expect: The feedback shows “Clicked: Deploy to staging” followed by a generated time.
    - expect: The selection succeeds after the re-render and the feedback does not show a previous task.

#### 1.4. Verify Task Remains Selectable After Automatic Re-render

**File:** `tests/ai_playground/stale_element/tests/verify-task-remains-selectable-after-automatic-rerender.test.ts`

**Steps:**
  1. Open challenge 15 in a fresh page and observe the rendered task list. Wait for one scheduled automatic rebuild (the challenge rebuilds every 2.5 seconds), using evidence that an existing task node was replaced rather than a fixed sleep.
    - expect: The same five task labels remain available after the automatic re-render.
  2. After the rebuild, locate and click “Fix build error” using its current visible text.
    - expect: The feedback shows “Clicked: Fix build error” followed by a generated time.
    - expect: The task remains clickable after the automatic rebuild and the feedback names the current selection.

#### 1.5. Verify Feedback Updates To Most Recent Task

**File:** `tests/ai_playground/stale_element/tests/verify-feedback-updates-to-most-recent-task.test.ts`

**Steps:**
  1. Open challenge 15 in a fresh page, click “Review PR #42”, and then click “Write test report”.
    - expect: After the second selection, the feedback shows “Clicked: Write test report” followed by a generated time.
    - expect: The feedback reflects the most recent task rather than retaining the earlier selection.
