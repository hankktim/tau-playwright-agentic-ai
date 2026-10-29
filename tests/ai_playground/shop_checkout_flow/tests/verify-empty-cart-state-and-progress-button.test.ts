import { expect, test } from '@playwright/test';
import { ShopCheckoutFlowPage } from '../POM/ShopCheckoutFlowPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Empty Cart State And Progress Button', async ({ page }) => {
    const shopPage = new ShopCheckoutFlowPage(page);

    // 1. Open challenge 25 fresh without adding products.
    await shopPage.navigateToChallenge();
    await expect(shopPage.challengeHeading).toBeVisible();
    await expect(shopPage.productsStepIndicator).toBeVisible();
    await expect(shopPage.cartHeading).toHaveText('Cart 0');
    await expect(shopPage.emptyCartMessage).toBeVisible();
    await expect(shopPage.cartTotal('£0.00')).toBeVisible();
    await expect(shopPage.proceedToDeliveryButton).toBeVisible();
    await expect(shopPage.emptyCartValidationMessage).toBeHidden();

    // 2. Try to proceed while the cart is empty.
    await shopPage.proceedToDelivery();
    await expect(shopPage.emptyCartValidationMessage).toBeVisible();
    await expect(shopPage.challengeHeading).toBeVisible();
    await expect(shopPage.productsStepIndicator).toBeVisible();
    await expect(shopPage.cartHeading).toHaveText('Cart 0');
    await expect(shopPage.emptyCartMessage).toBeVisible();
    await expect(shopPage.cartTotal('£0.00')).toBeVisible();
  });
});
