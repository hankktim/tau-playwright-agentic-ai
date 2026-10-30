// spec: tests/ai_playground/priority_board/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { PriorityBoardPage } from '../POM/PriorityBoardPage';

const originalTasks = ['Fix login bug', 'Write unit tests', 'Update docs'] as const;

test.describe('Priority Board', () => {
  test('Verify Multiple Tasks Move To In Progress', async ({ page }) => {
    const priorityBoardPage = new PriorityBoardPage(page);

    // 1. Open a fresh playground page and confirm the baseline board state.
    await priorityBoardPage.navigateToChallenge();
    await expect(priorityBoardPage.challengeHeading).toBeVisible();
    await expect(priorityBoardPage.backlogTasks).toHaveText([...originalTasks]);
    await expect(priorityBoardPage.inProgressTasks).toHaveCount(0);
    await expect(priorityBoardPage.resultMessage).toHaveText('');

    // 2. Drag Fix login bug, Write unit tests, then Update docs to In Progress, one at a time.
    await priorityBoardPage.moveTaskToInProgress('Fix login bug');
    await expect(priorityBoardPage.backlogTasks).toHaveText(['Write unit tests', 'Update docs']);
    await expect(priorityBoardPage.inProgressTasks).toHaveText(['Fix login bug']);
    await expect(priorityBoardPage.resultMessage).toHaveText('"Fix login bug" moved to In Progress');

    await priorityBoardPage.moveTaskToInProgress('Write unit tests');
    await expect(priorityBoardPage.backlogTasks).toHaveText(['Update docs']);
    await expect(priorityBoardPage.inProgressTasks).toHaveText(['Fix login bug', 'Write unit tests']);
    await expect(priorityBoardPage.resultMessage).toHaveText('"Write unit tests" moved to In Progress');

    await priorityBoardPage.moveTaskToInProgress('Update docs');

    // 3. Inspect both columns and the final result message.
    await expect(priorityBoardPage.backlogTasks).toHaveCount(0);
    await expect(priorityBoardPage.inProgressTasks).toHaveText([...originalTasks]);
    await expect(priorityBoardPage.resultMessage).toHaveText('"Update docs" moved to In Progress');
    await expect(priorityBoardPage.backlogTasks).toHaveCount(0);
    await expect(priorityBoardPage.inProgressTasks).toHaveCount(originalTasks.length);
  });
});
