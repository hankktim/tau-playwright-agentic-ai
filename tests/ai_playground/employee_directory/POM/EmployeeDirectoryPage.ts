import { type Locator, type Page } from '@playwright/test';

export class EmployeeDirectoryPage {
  readonly page: Page;
  readonly employeeDirectoryHeading: Locator;
  readonly employeeFilter: Locator;
  readonly employeeTable: Locator;
  readonly employeeRows: Locator;
  readonly salaryColumnHeader: Locator;
  readonly employeeColumnHeaders: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeDirectoryHeading = page.getByRole('heading', {
      name: '12. Employee Directory',
      exact: true,
    });
    this.employeeFilter = page.getByRole('textbox', { name: 'Filter employees…' });
    this.employeeTable = page.getByRole('table').filter({
      has: page.getByRole('columnheader', { name: /^Salary/ }),
    });
    this.employeeRows = this.employeeTable.getByRole('row').filter({
      has: page.getByRole('cell'),
    });
    this.salaryColumnHeader = this.employeeTable.getByRole('columnheader', {
      name: /^Salary/,
    });
    this.employeeColumnHeaders = this.employeeTable.getByRole('columnheader');
  }

  public async setFilter(query: string): Promise<void> {
    await this.employeeFilter.fill(query);
  }

  public async clickSalaryColumnHeader(): Promise<void> {
    await this.salaryColumnHeader.click();
  }

  public async getEmployeeRecords(): Promise<string[][]> {
    const rows = await this.employeeRows.all();
    return Promise.all(rows.map((row) => row.getByRole('cell').allInnerTexts()));
  }
}
