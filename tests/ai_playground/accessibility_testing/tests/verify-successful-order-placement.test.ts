// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ShopCheckoutPage } from '../../../../page_objects/ShopCheckoutPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Review And Successful Order Placement', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);

    // 1. From a fresh shop, add two Wildflower Honey jars, apply BEES10, enter valid customer details, choose Standard delivery, and populate valid test payment details.
    await shopPage.navigateToShop();
    await shopPage.selectProductQuantity('Wildflower Honey', 2);
    await shopPage.addProductToBasket('Wildflower Honey');
    await shopPage.openBasket();
    await shopPage.applyDiscountCode('BEES10');
    await shopPage.proceedToCheckout();
    await shopPage.enterCustomerDetails({
      fullName: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      streetAddress: '12 Example Street',
      townOrCity: 'London',
      postcode: 'SW1A 1AA',
    });
    await shopPage.clickDeliveryButton();
    await shopPage.selectDeliveryOption('Standard');
    await shopPage.clickPaymentButton();
    await expect(shopPage.testPaymentNotice).toBeVisible();
    await shopPage.clickUseTestCard();
    await shopPage.setCardholderName('Alex Rivera');
    await shopPage.clickReviewButton();
    await expect(shopPage.reviewHeading).toBeVisible();
    await expect.soft(shopPage.checkoutSummaryRow('Wildflower Honey × 2')).toContainText('£15.00');
    await expect.soft(shopPage.checkoutSummaryRow('Subtotal')).toContainText('£15.00');
    await expect.soft(shopPage.checkoutSummaryRow('Discount')).toContainText('-£1.50');
    await expect.soft(shopPage.checkoutSummaryRow('Delivery')).toContainText('£3.50');
    await expect.soft(shopPage.checkoutSummaryRow('Total')).toContainText('£17.00');
    await expect.soft(shopPage.reviewLine('Deliver to: Alex Rivera, SW1A 1AA')).toBeVisible();
    await expect.soft(shopPage.reviewLine('Delivery: Standard, £3.50')).toBeVisible();
    await expect.soft(shopPage.reviewLine('Total: £17.00')).toBeVisible();

    // 2. Place the order.
    await shopPage.placeOrder();
    await expect(shopPage.orderConfirmation).toBeVisible();
    await expect.soft(shopPage.confirmationEmailMessage).toBeVisible();
    await expect.soft(shopPage.orderContinueShoppingLink).toBeVisible();

    // 3. Return to the shop after order confirmation and verify the basket and discount are cleared.
    await shopPage.continueShoppingAfterOrder();
    await expect(shopPage.basketLink).toHaveText('Basket (0)');
    await shopPage.openBasket();
    await expect.soft(shopPage.emptyBasketHeading).toBeVisible();
    await expect.soft(shopPage.basketLineItem('Wildflower Honey')).toHaveCount(0);
    await expect.soft(shopPage.basketSummaryRow('Discount')).toHaveCount(0);
    await expect.soft(shopPage.appliedDiscountMessage).not.toBeVisible();
  });
});