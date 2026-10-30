// spec: tests/ai_playground/priority_board/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { PriorityBoardPage } from '../POM/PriorityBoardPage';

test.describe('Priority Board', () => {
  test('Verify Initial Board Columns And Task State', async ({ page }) => {
    const priorityBoardPage = new PriorityBoardPage(page);

    // 1. Open the AI Testing Playground in a fresh browser context and locate challenge 14, Priority Board.
    await priorityBoardPage.navigateToChallenge();
    await expect(priorityBoardPage.challengeHeading).toBeVisible();

    // 2. Inspect both board columns, their task cards, and the result message.
    await expect(priorityBoardPage.boardColumns).toHaveCount(2);
    await expect(priorityBoardPage.backlogTasks).toHaveText([
      'Fix login bug',
      'Write unit tests',
      'Update docs',
    ]);
    await expect(priorityBoardPage.inProgressTasks).toHaveCount(0);
    await expect(priorityBoardPage.resultMessage).toHaveText('');

    // 3. Evaluate the initial board state.
    await expect(priorityBoardPage.backlogTasks).toHaveCount(3);
    await expect(priorityBoardPage.inProgressTasks).toHaveCount(0);
  });
});
