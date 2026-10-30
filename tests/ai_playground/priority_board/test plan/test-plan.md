# Priority Board Test Plan

## Application Overview

Test challenge 14, Priority Board, on https://webdriveruniversity.com/AI-Playground/index.html. Each scenario runs independently in a fresh browser context with the original board state: Backlog contains Fix login bug, Write unit tests, and Update docs; In Progress is empty; the result message is blank. The board supports dragging tasks between those two columns and displays a message naming the moved task and destination. There is no authentication or additional setup. Verify exact task membership in each column, no lost or duplicated tasks, and accurate feedback; dropping outside the columns should not change the board.

## Test Scenarios

### 1. Priority Board

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Initial Board Columns And Task State

**File:** `tests/ai_playground/priority_board/tests/verify-board-initial-state.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh browser context and locate challenge 14, Priority Board.
    - expect: The page loads without authentication and the Priority Board heading is visible.
  2. Inspect both board columns, their task cards, and the result message.
    - expect: The board has exactly the Backlog and In Progress columns.
    - expect: Backlog contains Fix login bug, Write unit tests, and Update docs, each exactly once.
    - expect: In Progress contains no tasks.
    - expect: The result message is blank.
  3. Evaluate the initial board state.
    - expect: Pass only if both columns and the exact baseline task membership are present with no result message; fail if a task is missing, duplicated, misplaced, or an unexpected column appears.

#### 1.2. Verify A Task Moves From Backlog To In Progress

**File:** `tests/ai_playground/priority_board/tests/verify-task-moves-to-in-progress.test.ts`

**Steps:**
  1. Open the playground in a fresh browser context and locate Fix login bug in Backlog.
    - expect: All three tasks are in Backlog, In Progress is empty, and the result message is blank.
  2. Drag Fix login bug from Backlog into In Progress.
    - expect: Fix login bug appears exactly once in In Progress and is absent from Backlog.
    - expect: Write unit tests and Update docs remain in Backlog.
    - expect: The result message reads exactly: "Fix login bug" moved to In Progress.
  3. Evaluate the completed move.
    - expect: Pass only if the task is in the destination column exactly once, the remaining task locations are correct, and the feedback names the task and destination; fail on a lost, duplicated, or incorrectly placed task or inaccurate feedback.

#### 1.3. Verify A Task Moves Back From In Progress To Backlog

**File:** `tests/ai_playground/priority_board/tests/verify-task-returns-to-backlog.test.ts`

**Steps:**
  1. Open the playground in a fresh browser context and drag Fix login bug from Backlog into In Progress.
    - expect: Fix login bug is in In Progress and the other two tasks remain in Backlog.
  2. Drag Fix login bug from In Progress back into Backlog.
    - expect: Fix login bug appears exactly once in Backlog and In Progress is empty.
    - expect: Write unit tests and Update docs remain in Backlog exactly once each.
    - expect: The result message reads exactly: "Fix login bug" moved to Backlog.
  3. Evaluate the return move.
    - expect: Pass only if all three tasks are present exactly once in Backlog, none remain in In Progress, and the feedback names Backlog as the destination; fail on missing, duplicate, or misplaced tasks or inaccurate feedback.

#### 1.4. Verify Multiple Tasks Move To In Progress

**File:** `tests/ai_playground/priority_board/tests/verify-all-tasks-move-to-in-progress.test.ts`

**Steps:**
  1. Open the playground in a fresh browser context and confirm the baseline board state.
    - expect: Backlog contains Fix login bug, Write unit tests, and Update docs; In Progress is empty; the result message is blank.
  2. Drag Fix login bug, Write unit tests, and Update docs from Backlog to In Progress, one at a time.
    - expect: After each drop, the moved task appears in In Progress and is removed from Backlog.
    - expect: The result message updates to name the task moved most recently and In Progress as its destination.
  3. Inspect both columns and the final result message.
    - expect: In Progress contains all three original tasks exactly once and Backlog is empty.
    - expect: The final result message reads exactly: "Update docs" moved to In Progress.
    - expect: Pass only if no task is lost or duplicated and each move updates the feedback correctly; fail otherwise.

#### 1.5. Verify Dropping Outside The Board Leaves Tasks Unchanged

**File:** `tests/ai_playground/priority_board/tests/verify-drop-outside-board-does-not-change-state.test.ts`

**Steps:**
  1. Open the playground in a fresh browser context and confirm the baseline board state.
    - expect: All three tasks are in Backlog, In Progress is empty, and the result message is blank.
  2. Drag Fix login bug to a neutral page area outside both board columns and release it.
    - expect: Fix login bug remains in Backlog exactly once.
    - expect: In Progress remains empty; Write unit tests and Update docs remain in Backlog.
    - expect: The result message remains blank.
  3. Evaluate the board after the unsupported drop.
    - expect: Pass only if the drop outside both columns leaves all task locations and feedback unchanged; fail if a task moves, disappears, duplicates, or a move-success message appears.
