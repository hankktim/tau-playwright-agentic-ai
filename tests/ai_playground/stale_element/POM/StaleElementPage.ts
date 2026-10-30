import { type Locator, type Page } from '@playwright/test';

export type StaleElementTask =
  | 'Review PR #42'
  | 'Fix build error'
  | 'Update changelog'
  | 'Deploy to staging'
  | 'Write test report';

export class StaleElementPage {
  readonly page: Page;
  readonly challengeHeading: Locator;
  readonly challengeCard: Locator;
  readonly taskItems: Locator;
  readonly forceRerenderButton: Locator;
  readonly feedback: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', {
      name: '15. Stale Element',
      exact: true,
    });

    // The challenge card has no semantic container role, so scope its controls by the card containing its heading.
    this.challengeCard = page.locator('.card').filter({ has: this.challengeHeading });
    this.taskItems = this.challengeCard.getByRole('listitem');
    this.forceRerenderButton = this.challengeCard.getByRole('button', {
      name: 'Force Re-render',
      exact: true,
    });
    this.feedback = this.challengeCard.getByText(/^Clicked:/);
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public async clickTask(task: StaleElementTask): Promise<void> {
    await this.challengeCard.getByText(task, { exact: true }).click();
  }

  public async clickForceRerenderButton(): Promise<void> {
    await this.forceRerenderButton.click();
  }

  public async waitForAutomaticRerender(): Promise<void> {
    await this.taskItems.first().evaluate(
      (initialTask) =>
        new Promise<void>((resolve, reject) => {
          const observer = new MutationObserver(() => {
            if (!initialTask.isConnected) {
              window.clearTimeout(timeoutId);
              observer.disconnect();
              resolve();
            }
          });
          const timeoutId = window.setTimeout(() => {
            observer.disconnect();
            reject(new Error('The task list did not replace its existing task node within 10 seconds.'));
          }, 10_000);

          observer.observe(document.body, { childList: true, subtree: true });
          if (!initialTask.isConnected) {
            window.clearTimeout(timeoutId);
            observer.disconnect();
            resolve();
          }
        }),
    );
  }
}
