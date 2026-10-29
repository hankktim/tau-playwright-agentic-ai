import { expect, test } from '@playwright/test';
import { EmployeeDirectoryPage } from '../POM/EmployeeDirectoryPage';

const engineeringEmployeesBySalaryAscending = [
  ['Sarah Mitchell', 'Engineering', '£45,000', 'active', '2019-03-15'],
  ['Raj Patel', 'Engineering', '£47,000', 'active', '2018-04-11'],
  ['Priya Sharma', 'Engineering', '£51,000', 'active', '2018-11-20'],
  ['Sofia Reyes', 'Engineering', '£53,000', 'active', '2016-10-14'],
  ['Daniel Wright', 'Engineering', '£55,000', 'active', '2017-06-30'],
];

test.describe('Employee Directory Filtering And Sorting', () => {
  test('Verify Department Filtering And Salary Sort Directions', async ({ page }) => {
    const employeeDirectoryPage = new EmployeeDirectoryPage(page);

    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await expect(employeeDirectoryPage.employeeRows).toHaveCount(15);
    await expect(employeeDirectoryPage.employeeFilter).toHaveValue('');

    await employeeDirectoryPage.setFilter(' eNgInEeRiNg ');
    await expect(employeeDirectoryPage.employeeRows).toHaveCount(5);
    expect(await employeeDirectoryPage.getEmployeeRecords()).toEqual([
      ['Sarah Mitchell', 'Engineering', '£45,000', 'active', '2019-03-15'],
      ['Priya Sharma', 'Engineering', '£51,000', 'active', '2018-11-20'],
      ['Daniel Wright', 'Engineering', '£55,000', 'active', '2017-06-30'],
      ['Raj Patel', 'Engineering', '£47,000', 'active', '2018-04-11'],
      ['Sofia Reyes', 'Engineering', '£53,000', 'active', '2016-10-14'],
    ]);

    await employeeDirectoryPage.clickSalaryColumnHeader();
    await expect(employeeDirectoryPage.salaryColumnHeader).toHaveAccessibleName('Salary ↑');
    expect(await employeeDirectoryPage.getEmployeeRecords()).toEqual(
      engineeringEmployeesBySalaryAscending,
    );

    await employeeDirectoryPage.clickSalaryColumnHeader();
    await expect(employeeDirectoryPage.salaryColumnHeader).toHaveAccessibleName('Salary ↓');
    expect(await employeeDirectoryPage.getEmployeeRecords()).toEqual(
      [...engineeringEmployeesBySalaryAscending].reverse(),
    );
  });
});
