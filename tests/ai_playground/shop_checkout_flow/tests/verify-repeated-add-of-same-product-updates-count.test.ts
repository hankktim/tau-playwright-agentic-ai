import { expect, test } from '@playwright/test';
import { ShopCheckoutFlowPage } from '../POM/ShopCheckoutFlowPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Repeated Add Of Same Product Updates Count', async ({ page }) => {
    const shopPage = new ShopCheckoutFlowPage(page);

    // 1. Open the challenge fresh and add Wireless Headphones once with its default quantity of 1.
    await shopPage.navigateToChallenge();
    await expect(shopPage.challengeHeading).toBeVisible();
    await expect(shopPage.productQuantityInput('Wireless Headphones')).toHaveValue('1');
    await shopPage.addProductToCart('Wireless Headphones');
    await expect(shopPage.cartHeading).toHaveText('Cart 1');
    await expect(shopPage.cartItem('Wireless Headphones', 1)).toBeVisible();
    await expect(shopPage.cartTotal('£89.99')).toBeVisible();

    // 2. Add Wireless Headphones again without changing its quantity control.
    await shopPage.addProductToCart('Wireless Headphones');
    await expect(shopPage.cartHeading).toHaveText('Cart 2');
    await expect(shopPage.cartItem('Wireless Headphones', 2)).toBeVisible();
    await expect(shopPage.cartTotal('£179.98')).toBeVisible();
    await expect(shopPage.productsStepIndicator).toBeVisible();
  });
});
