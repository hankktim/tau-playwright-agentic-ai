import { expect, test } from '@playwright/test';
import { ShopCheckoutFlowPage } from '../POM/ShopCheckoutFlowPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Single-Item Add Updates Quantity And Total', async ({ page }) => {
    const shopPage = new ShopCheckoutFlowPage(page);

    // 1. Open the challenge fresh and inspect the Wireless Headphones product card.
    await shopPage.navigateToChallenge();
    await expect(shopPage.challengeHeading).toBeVisible();
    await expect(shopPage.productQuantityInput('Wireless Headphones')).toHaveValue('1');
    await expect(shopPage.addProductButton('Wireless Headphones')).toBeVisible();
    await expect(shopPage.cartHeading).toHaveText('Cart 0');
    await expect(shopPage.emptyCartMessage).toBeVisible();
    await expect(shopPage.cartTotal('£0.00')).toBeVisible();

    // 2. Add Wireless Headphones once.
    await shopPage.addProductToCart('Wireless Headphones');
    await expect(shopPage.cartHeading).toHaveText('Cart 1');
    await expect(shopPage.cartItem('Wireless Headphones', 1)).toBeVisible();
    await expect(shopPage.cartTotal('£89.99')).toBeVisible();
    await expect(shopPage.emptyCartMessage).toBeHidden();
  });
});
