import { expect, test } from '@playwright/test';
import {
  ShopCheckoutFlowPage,
  shopProductNames,
} from '../POM/ShopCheckoutFlowPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Product Catalog Renders Correctly', async ({ page }) => {
    const shopPage = new ShopCheckoutFlowPage(page);

    // 1. Open the AI Testing Playground fresh and inspect challenge 25, Shop & Checkout Flow.
    await shopPage.navigateToChallenge();
    await expect(shopPage.challengeHeading).toBeVisible();
    await expect(shopPage.productsStepIndicator).toBeVisible();

    for (const productName of shopProductNames) {
      await expect.soft(shopPage.productCard(productName)).toBeVisible();
      await expect.soft(shopPage.productPrice(productName)).toBeVisible();
      await expect.soft(shopPage.productDescription(productName)).toBeVisible();
      await expect.soft(shopPage.productQuantityInput(productName)).toHaveValue('1');
      await expect.soft(shopPage.addProductButton(productName)).toBeVisible();
    }

    await expect.soft(shopPage.cartHeading).toHaveText('Cart 0');
    await expect.soft(shopPage.emptyCartMessage).toBeVisible();
    await expect.soft(shopPage.cartTotal('£0.00')).toBeVisible();
    await expect.soft(shopPage.proceedToDeliveryButton).toBeVisible();
  });
});
