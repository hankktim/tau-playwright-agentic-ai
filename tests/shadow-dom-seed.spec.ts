import { test } from '@playwright/test';

   test('shadow DOM seed', async ({ page }) => {
     await page.goto('https://ui.rexjones2.com/shadow-dom');
   });