// spec: tests/ai_playground/priority_board/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';
import { PriorityBoardPage } from '../POM/PriorityBoardPage';

const originalTasks = ['Fix login bug', 'Write unit tests', 'Update docs'] as const;

test.describe('Priority Board', () => {
  test('Verify Dropping Outside The Board Leaves Tasks Unchanged', async ({ page }) => {
    const priorityBoardPage = new PriorityBoardPage(page);

    // 1. Open a fresh playground page and confirm the initial Priority Board state.
    await priorityBoardPage.navigateToChallenge();
    await expect(priorityBoardPage.challengeHeading).toBeVisible();
    await expect(priorityBoardPage.backlogTasks).toHaveText([...originalTasks]);
    await expect(priorityBoardPage.inProgressTasks).toHaveCount(0);
    await expect(priorityBoardPage.resultMessage).toHaveText('');

    // 2. Drag Fix login bug to a neutral page area outside both board columns and release it.
    await priorityBoardPage.dropTaskOnHeading('Fix login bug');
    await expect(priorityBoardPage.backlogTasks).toHaveText([...originalTasks]);
    await expect(priorityBoardPage.inProgressTasks).toHaveCount(0);
    await expect(priorityBoardPage.resultMessage).toHaveText('');

    // 3. Evaluate the board after the unsupported drop.
    await expect(priorityBoardPage.boardColumns).toHaveCount(2);
    await expect(priorityBoardPage.backlogTasks).toHaveCount(originalTasks.length);
    await expect(priorityBoardPage.inProgressTasks).toHaveCount(0);
  });
});
