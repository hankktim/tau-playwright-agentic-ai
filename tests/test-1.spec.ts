import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('test');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('test');
  await page.getByTestId('dynamic-login-card').getByRole('button', { name: 'Login' }).click();
 await expect(page.locator('#dynamic-success')).toContainText('Login successful');
});