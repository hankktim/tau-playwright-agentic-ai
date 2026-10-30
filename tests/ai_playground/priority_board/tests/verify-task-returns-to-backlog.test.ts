// spec: tests/ai_playground/priority_board/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { PriorityBoardPage } from '../POM/PriorityBoardPage';

const originalTasks = ['Fix login bug', 'Write unit tests', 'Update docs'] as const;

test.describe('Priority Board', () => {
  test('Verify A Task Moves Back From In Progress To Backlog', async ({ page }) => {
    const priorityBoardPage = new PriorityBoardPage(page);

    // 1. Open a fresh playground page and move Fix login bug from Backlog into In Progress.
    await priorityBoardPage.navigateToChallenge();
    await expect(priorityBoardPage.challengeHeading).toBeVisible();
    await expect(priorityBoardPage.backlogTasks).toHaveText([...originalTasks]);
    await priorityBoardPage.moveTaskToInProgress('Fix login bug');
    await expect(priorityBoardPage.backlogTasks).toHaveText(['Write unit tests', 'Update docs']);
    await expect(priorityBoardPage.inProgressTasks).toHaveText(['Fix login bug']);

    // 2. Drag Fix login bug from In Progress back into Backlog.
    await priorityBoardPage.moveTaskToBacklog('Fix login bug');
    await expect(priorityBoardPage.backlogTasks).toHaveCount(3);
    for (const taskName of originalTasks) {
      await expect(priorityBoardPage.backlogColumn.getByText(taskName, { exact: true })).toHaveCount(1);
    }
    await expect(priorityBoardPage.inProgressTasks).toHaveCount(0);
    await expect(priorityBoardPage.resultMessage).toHaveText('"Fix login bug" moved to Backlog');

    // 3. Evaluate the return move.
    await expect(priorityBoardPage.boardColumns).toHaveCount(2);
    await expect(priorityBoardPage.backlogTasks).toHaveCount(originalTasks.length);
  });
});
