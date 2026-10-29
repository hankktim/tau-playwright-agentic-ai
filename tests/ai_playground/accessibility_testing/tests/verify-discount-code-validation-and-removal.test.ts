// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ShopCheckoutPage } from '../../../../page_objects/ShopCheckoutPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Invalid And Valid Discount Codes Update The Total', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);

    // 1. From a fresh shop, add one Honey & Oat Soap and open the basket.
    await shopPage.navigateToShop();
    await shopPage.addProductToBasket('Honey & Oat Soap');
    await shopPage.openBasket();
    await expect.soft(shopPage.basketSummaryRow('Subtotal')).toContainText('£4.50');
    await expect.soft(shopPage.basketSummaryRow('Standard delivery (change at checkout)')).toContainText('£3.50');
    await expect.soft(shopPage.basketSummaryRow('Total')).toContainText('£8.00');

    // 2. Apply the invalid code NOTACODE.
    await shopPage.applyDiscountCode('NOTACODE');
    await expect.soft(shopPage.invalidDiscountMessage).toBeVisible();
    await expect.soft(shopPage.basketSummaryRow('Discount')).toHaveCount(0);
    await expect.soft(shopPage.basketSummaryRow('Total')).toContainText('£8.00');

    // 3. Apply BEES10.
    await shopPage.applyDiscountCode('BEES10');
    await expect.soft(shopPage.appliedDiscountMessage).toBeVisible();
    await expect.soft(shopPage.basketSummaryRow('Subtotal')).toContainText('£4.50');
    await expect.soft(shopPage.basketSummaryRow('Discount')).toContainText('-£0.45');
    await expect.soft(shopPage.basketSummaryRow('Standard delivery (change at checkout)')).toContainText('£3.50');
    await expect.soft(shopPage.basketSummaryRow('Total')).toContainText('£7.55');

    // 4. Remove the applied discount.
    await shopPage.removeAppliedDiscount();
    await expect.soft(shopPage.basketSummaryRow('Discount')).toHaveCount(0);
    await expect.soft(shopPage.basketSummaryRow('Total')).toContainText('£8.00');
  });
});