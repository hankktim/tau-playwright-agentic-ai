// spec: specs/dynamic-properties.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Dynamic Properties Functional Coverage', () => {
  test('Verify initial page content and dynamic-property baseline', async ({ page }) => {
    // 1. Start with a fresh browser context and navigate directly to Dynamic Properties.
    await page.goto('https://ui.rexjones2.com/dynamic-properties');
    await expect(page).toHaveURL(/\/dynamic-properties$/);

    // 2. Verify the page heading, random-ID text, and dynamic controls.
    const pageHeading = page.getByRole('heading', { name: 'Dynamic Properties', exact: true }).last();
    const randomIdText = page.getByText('This text has random Id', { exact: true });
    const enableButton = page.getByRole('button', { name: 'Will enable in 5 seconds', exact: true });
    const colorButton = page.getByRole('button', { name: 'Color Change', exact: true });
    const delayedButton = page.getByRole('button', { name: 'Visible after 5 seconds', exact: true });

    await expect(pageHeading).toBeVisible();
    await expect(randomIdText).toBeVisible();
    await expect(enableButton).toHaveCount(1);
    await expect(colorButton).toHaveCount(1);

    // 3. Verify each dynamic control is still in its pre-delay state.
    await expect(enableButton).toBeDisabled();
    await expect(colorButton).not.toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(delayedButton).toBeHidden();

    // 4. Verify the page-level Previous and Next links.
    const previousLink = page.getByRole('link', { name: 'Previous', exact: true });
    const nextLink = page.getByRole('link', { name: 'Next', exact: true });
    await expect(previousLink).toHaveAttribute('href', '/select-menu');
    await expect(nextLink).toHaveAttribute('href', '/progress-bar');

    // 5. Evaluate the scenario against its success criteria.
    await expect(page).toHaveURL(/\/dynamic-properties$/);
    await expect(pageHeading).toBeVisible();
    await expect(randomIdText).toBeVisible();
    await expect(enableButton).toBeDisabled();
    await expect(colorButton).not.toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(delayedButton).toBeHidden();
  });
});
