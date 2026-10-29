// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ShopCheckoutPage } from '../../../../page_objects/ShopCheckoutPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Sold-Out Product Cannot Be Added To The Basket', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);

    // 1. Open the shop in a fresh context and locate Lime Blossom Honey.
    await shopPage.navigateToShop();
    await expect(shopPage.productCard('Lime Blossom Honey')).toBeVisible();
    await expect(shopPage.soldOutProductControl('Lime Blossom Honey')).toHaveText('Sold out');
    await expect(shopPage.basketLink).toHaveText('Basket (0)');

    // 2. Attempt to activate the sold-out product control.
    await shopPage.clickSoldOutProduct('Lime Blossom Honey');
    await expect.soft(shopPage.basketLink).toHaveText('Basket (0)');
    await expect.soft(shopPage.addConfirmationFor('Lime Blossom Honey')).toHaveCount(0);
  });
});