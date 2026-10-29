// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ShopCheckoutPage } from '../../../../page_objects/ShopCheckoutPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Product Category Filters Show The Matching Catalog', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);

    // 1. Open the shop in a fresh context and inspect the default All category.
    await shopPage.navigateToShop();
    await expect.soft(shopPage.productCards).toHaveCount(6);
    await expect.soft(shopPage.productCard('Wildflower Honey')).toBeVisible();
    await expect.soft(shopPage.productCard('Heather Honey')).toBeVisible();
    await expect.soft(shopPage.productCard('Lime Blossom Honey')).toBeVisible();
    await expect.soft(shopPage.productCard('Cut Honeycomb')).toBeVisible();
    await expect.soft(shopPage.productCard('Honey & Oat Soap')).toBeVisible();
    await expect.soft(shopPage.productCard('Beeswax Candles')).toBeVisible();
    await expect.soft(shopPage.basketLink).toHaveText('Basket (0)');

    // 2. Select the Honey category.
    await shopPage.selectCategory('Honey');
    await expect.soft(shopPage.productCards).toHaveCount(4);
    await expect.soft(shopPage.productCard('Wildflower Honey')).toBeVisible();
    await expect.soft(shopPage.productCard('Heather Honey')).toBeVisible();
    await expect.soft(shopPage.productCard('Lime Blossom Honey')).toBeVisible();
    await expect.soft(shopPage.productCard('Cut Honeycomb')).toBeVisible();
    await expect.soft(shopPage.productCard('Honey & Oat Soap')).toHaveCount(0);
    await expect.soft(shopPage.productCard('Beeswax Candles')).toHaveCount(0);

    // 3. Select Gifts, then return to All.
    await shopPage.selectCategory('Gifts');
    await expect.soft(shopPage.productCards).toHaveCount(2);
    await expect.soft(shopPage.productCard('Honey & Oat Soap')).toBeVisible();
    await expect.soft(shopPage.productCard('Beeswax Candles')).toBeVisible();
    await expect.soft(shopPage.productCard('Wildflower Honey')).toHaveCount(0);
    await expect.soft(shopPage.productCard('Heather Honey')).toHaveCount(0);
    await expect.soft(shopPage.productCard('Lime Blossom Honey')).toHaveCount(0);
    await expect.soft(shopPage.productCard('Cut Honeycomb')).toHaveCount(0);

    await shopPage.selectCategory('All');
    await expect.soft(shopPage.productCards).toHaveCount(6);
    await expect.soft(shopPage.productCard('Wildflower Honey')).toBeVisible();
    await expect.soft(shopPage.productCard('Heather Honey')).toBeVisible();
    await expect.soft(shopPage.productCard('Lime Blossom Honey')).toBeVisible();
    await expect.soft(shopPage.productCard('Cut Honeycomb')).toBeVisible();
    await expect.soft(shopPage.productCard('Honey & Oat Soap')).toBeVisible();
    await expect.soft(shopPage.productCard('Beeswax Candles')).toBeVisible();
  });
});