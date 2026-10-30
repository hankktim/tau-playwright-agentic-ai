// spec: tests/ai_playground/priority_board/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { PriorityBoardPage } from '../POM/PriorityBoardPage';

test.describe('Priority Board', () => {
  test('Verify A Task Moves From Backlog To In Progress', async ({ page }) => {
    const priorityBoardPage = new PriorityBoardPage(page);

    // 1. Open the playground in a fresh browser context and locate Fix login bug in Backlog.
    await priorityBoardPage.navigateToChallenge();
    await expect(priorityBoardPage.challengeHeading).toBeVisible();
    await expect(priorityBoardPage.backlogTasks).toHaveText([
      'Fix login bug',
      'Write unit tests',
      'Update docs',
    ]);
    await expect(priorityBoardPage.inProgressTasks).toHaveCount(0);
    await expect(priorityBoardPage.resultMessage).toHaveText('');

    // 2. Drag Fix login bug from Backlog into In Progress.
    await priorityBoardPage.moveTaskToInProgress('Fix login bug');
    await expect(priorityBoardPage.backlogTasks).toHaveText(['Write unit tests', 'Update docs']);
    await expect(priorityBoardPage.inProgressTasks).toHaveText(['Fix login bug']);
    await expect(priorityBoardPage.resultMessage).toHaveText('"Fix login bug" moved to In Progress');

    // 3. Evaluate the completed move.
    await expect(priorityBoardPage.backlogTasks).toHaveCount(2);
    await expect(priorityBoardPage.inProgressTasks).toHaveCount(1);
  });
});
