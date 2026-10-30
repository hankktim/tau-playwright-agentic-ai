import { type Locator, type Page } from '@playwright/test';

export type PriorityTask = 'Fix login bug' | 'Write unit tests' | 'Update docs';

export class PriorityBoardPage {
  readonly page: Page;
  readonly challengeHeading: Locator;
  readonly board: Locator;
  readonly boardColumns: Locator;
  readonly backlogColumn: Locator;
  readonly inProgressColumn: Locator;
  readonly backlogTasks: Locator;
  readonly inProgressTasks: Locator;
  readonly resultMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', {
      name: '14. Priority Board',
      exact: true,
    });

    // The board and draggable cards have no semantic roles or accessible names.
    const challenge = page.locator('.card').filter({ has: this.challengeHeading });
    this.board = challenge.locator('.board');
    this.boardColumns = this.board.locator('.board-column');
    this.backlogColumn = challenge.getByText('Backlog', { exact: true }).locator('..');
    this.inProgressColumn = challenge.getByText('In Progress', { exact: true }).locator('..');
    this.backlogTasks = this.backlogColumn.locator('.task-card');
    this.inProgressTasks = this.inProgressColumn.locator('.task-card');
    this.resultMessage = challenge.locator('#board-result');
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async moveTaskToInProgress(taskName: PriorityTask): Promise<void> {
    await this.backlogColumn.getByText(taskName, { exact: true }).dragTo(this.inProgressColumn);
  }

  public async moveTaskToBacklog(taskName: PriorityTask): Promise<void> {
    await this.inProgressColumn.getByText(taskName, { exact: true }).dragTo(this.backlogColumn);
  }

  public async dropTaskOnHeading(taskName: PriorityTask): Promise<void> {
    await this.backlogColumn.getByText(taskName, { exact: true }).dragTo(this.challengeHeading);
  }
}
