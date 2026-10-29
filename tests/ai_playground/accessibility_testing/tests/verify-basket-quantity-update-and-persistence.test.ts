// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ShopCheckoutPage } from '../../../../page_objects/ShopCheckoutPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Basket Quantity Controls Update Totals And Persist', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);

    // 1. From a fresh shop, add one Honey & Oat Soap and open the basket.
    await shopPage.navigateToShop();
    await shopPage.addProductToBasket('Honey & Oat Soap');
    await shopPage.openBasket();
    await expect(shopPage.basketLineItem('Honey & Oat Soap')).toContainText('£4.50');
    await expect(shopPage.basketQuantityValue('Honey & Oat Soap', 1)).toBeVisible();

    // 2. Increase the basket quantity once.
    await shopPage.increaseBasketQuantity('Honey & Oat Soap');
    await expect.soft(shopPage.basketQuantityValue('Honey & Oat Soap', 2)).toBeVisible();
    await expect.soft(shopPage.basketLineItem('Honey & Oat Soap')).toContainText('£9.00');
    await expect.soft(shopPage.basketSummaryRow('Subtotal')).toContainText('£9.00');
    await shopPage.continueShopping();
    await expect(shopPage.basketLink).toHaveText('Basket (2)');
    await shopPage.openBasket();

    // 3. Reload the basket page.
    await shopPage.reloadBasket();
    await expect.soft(shopPage.basketLineItem('Honey & Oat Soap')).toBeVisible();
    await expect.soft(shopPage.basketQuantityValue('Honey & Oat Soap', 2)).toBeVisible();
    await expect.soft(shopPage.basketLineItem('Honey & Oat Soap')).toContainText('£9.00');
    await expect.soft(shopPage.basketSummaryRow('Subtotal')).toContainText('£9.00');

    // 4. Decrease the quantity once.
    await shopPage.decreaseBasketQuantity('Honey & Oat Soap');
    await expect.soft(shopPage.basketQuantityValue('Honey & Oat Soap', 1)).toBeVisible();
    await expect.soft(shopPage.basketLineItem('Honey & Oat Soap')).toContainText('£4.50');
  });
});