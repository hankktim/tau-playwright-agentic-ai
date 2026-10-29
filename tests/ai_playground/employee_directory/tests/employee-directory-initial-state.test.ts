import { expect, test } from '@playwright/test';
import { EmployeeDirectoryPage } from '../POM/EmployeeDirectoryPage';

test.describe('Employee Directory', () => {
  test('Verify Initial Directory Data And Employee Values', async ({ page }) => {
    const employeeDirectoryPage = new EmployeeDirectoryPage(page);

    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');

    await expect(employeeDirectoryPage.employeeDirectoryHeading).toBeVisible();
    await expect(employeeDirectoryPage.employeeTable).toBeVisible();
    await expect(employeeDirectoryPage.employeeColumnHeaders).toHaveText([
      'Name',
      'Department',
      'Salary',
      'Status',
      'Start Date',
    ]);
    await expect(employeeDirectoryPage.employeeRows).toHaveCount(15);
    await expect(page).toHaveURL('https://webdriveruniversity.com/AI-Playground/index.html');

    const sarahMitchell = (await employeeDirectoryPage.getEmployeeRecords()).find(
      ([name]) => name === 'Sarah Mitchell',
    );
    expect(sarahMitchell).toEqual([
      'Sarah Mitchell',
      'Engineering',
      '£45,000',
      'active',
      '2019-03-15',
    ]);
  });
});
