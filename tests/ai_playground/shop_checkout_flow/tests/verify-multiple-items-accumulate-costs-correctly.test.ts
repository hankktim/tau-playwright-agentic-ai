import { expect, test } from '@playwright/test';
import { ShopCheckoutFlowPage } from '../POM/ShopCheckoutFlowPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Multiple Items Accumulate Costs Correctly', async ({ page }) => {
    const shopPage = new ShopCheckoutFlowPage(page);

    // 1. Open the challenge fresh and add one Wireless Headphones product.
    await shopPage.navigateToChallenge();
    await expect(shopPage.challengeHeading).toBeVisible();
    await shopPage.addProductToCart('Wireless Headphones');
    await expect(shopPage.cartHeading).toHaveText('Cart 1');
    await expect(shopPage.cartItem('Wireless Headphones', 1)).toBeVisible();
    await expect(shopPage.cartTotal('£89.99')).toBeVisible();

    // 2. Add one USB-C Hub 7-in-1 product.
    await shopPage.addProductToCart('USB-C Hub 7-in-1');
    await expect(shopPage.cartHeading).toHaveText('Cart 2');
    await expect(shopPage.cartItem('Wireless Headphones', 1)).toBeVisible();
    await expect(shopPage.cartItem('USB-C Hub 7-in-1', 1)).toBeVisible();
    await expect(shopPage.cartTotal('£124.98')).toBeVisible();

    // 3. Add one Laptop Stand Aluminium product.
    await shopPage.addProductToCart('Laptop Stand Aluminium');
    await expect(shopPage.cartHeading).toHaveText('Cart 3');
    await expect(shopPage.cartItem('Wireless Headphones', 1)).toBeVisible();
    await expect(shopPage.cartItem('USB-C Hub 7-in-1', 1)).toBeVisible();
    await expect(shopPage.cartItem('Laptop Stand Aluminium', 1)).toBeVisible();
    await expect(shopPage.cartTotal('£174.97')).toBeVisible();
  });
});
