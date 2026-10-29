// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ShopCheckoutPage } from '../../../../page_objects/ShopCheckoutPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Selected Product Quantity And Basket Subtotal', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);

    // 1. Open the shop in a fresh context, select quantity 2 for Wildflower Honey, and add it to the basket.
    await shopPage.navigateToShop();
    await shopPage.selectProductQuantity('Wildflower Honey', 2);
    await shopPage.addProductToBasket('Wildflower Honey');
    await expect(shopPage.addConfirmationFor('Wildflower Honey')).toBeVisible();
    await expect(shopPage.basketLink).toHaveText('Basket (2)');

    // 2. Open the basket and inspect its item and totals.
    await shopPage.openBasket();
    await expect(shopPage.basketLineItem('Wildflower Honey')).toContainText('£15.00');
    await expect(shopPage.basketQuantityValue('Wildflower Honey', 2)).toBeVisible();
    await expect(shopPage.basketSummaryRow('Subtotal')).toContainText('£15.00');
    await expect(shopPage.basketSummaryRow('Standard delivery (change at checkout)')).toContainText('£3.50');
    await expect(shopPage.basketSummaryRow('Total')).toContainText('£18.50');
  });
});