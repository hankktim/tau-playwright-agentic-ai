import { expect, test } from '@playwright/test';
import { EmployeeDirectoryPage } from '../POM/EmployeeDirectoryPage';

test.describe('Employee Directory Filter Recovery', () => {
  test('Verify No-Match Filter And Directory Recovery', async ({ page }) => {
    const employeeDirectoryPage = new EmployeeDirectoryPage(page);

    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await expect(employeeDirectoryPage.employeeRows).toHaveCount(15);

    await employeeDirectoryPage.setFilter('No matching employee');
    await expect(employeeDirectoryPage.employeeRows).toHaveCount(0);

    await employeeDirectoryPage.setFilter('');
    await expect(employeeDirectoryPage.employeeFilter).toHaveValue('');
    await expect(employeeDirectoryPage.employeeRows).toHaveCount(15);
    await expect(page).toHaveURL('https://webdriveruniversity.com/AI-Playground/index.html');
  });
});
