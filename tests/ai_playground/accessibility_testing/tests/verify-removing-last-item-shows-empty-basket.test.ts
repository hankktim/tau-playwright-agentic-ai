// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ShopCheckoutPage } from '../../../../page_objects/ShopCheckoutPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Removing The Last Basket Item Shows The Empty State', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);

    // 1. Open the shop in a fresh context, add one in-stock product, and open the basket.
    await shopPage.navigateToShop();
    await shopPage.addProductToBasket('Honey & Oat Soap');
    await shopPage.openBasket();
    await expect(shopPage.basketLineItem('Honey & Oat Soap')).toBeVisible();

    // 2. Remove the last item, either with its remove control or by decreasing its quantity at 1.
    await shopPage.removeBasketItem('Honey & Oat Soap');
    await expect.soft(shopPage.emptyBasketHeading).toBeVisible();
    await expect.soft(shopPage.emptyBasketGuidance).toBeVisible();
    await expect.soft(shopPage.backToShopLink).toBeVisible();
    await expect.soft(shopPage.checkoutLink).toHaveCount(0);
  });
});