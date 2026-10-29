// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ShopCheckoutPage } from '../../../../page_objects/ShopCheckoutPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Payment Validation And Test Card Population', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);

    // 1. From a fresh shop, add an in-stock product, complete valid customer details, choose Standard delivery, and advance to Payment.
    await shopPage.navigateToShop();
    await shopPage.addProductToBasket('Honey & Oat Soap');
    await shopPage.openBasket();
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
    await expect(shopPage.paymentHeading).toBeVisible();
    await expect.soft(shopPage.testPaymentNotice).toBeVisible();
    await expect.soft(shopPage.testCardNumberText).toBeVisible();
    await expect.soft(shopPage.cardNumberField).toBeVisible();
    await expect.soft(shopPage.cardholderNameField).toBeVisible();
    await expect.soft(shopPage.expiryField).toBeVisible();
    await expect.soft(shopPage.cvvField).toBeVisible();
    await expect.soft(shopPage.useTestCardButton).toBeVisible();
    await expect.soft(shopPage.reviewButton).toBeVisible();

    // 2. Leave all payment fields blank and activate Review.
    await shopPage.clickReviewButton();
    await expect.soft(shopPage.cardNumberError).toBeVisible();
    await expect.soft(shopPage.cardholderNameError).toBeVisible();
    await expect.soft(shopPage.expiryError).toBeVisible();
    await expect.soft(shopPage.cvvError).toBeVisible();
    await expect.soft(shopPage.paymentHeading).toBeVisible();
    await expect.soft(shopPage.reviewHeading).toHaveCount(0);

    // 3. Use the test-card shortcut and enter Alex Rivera as the cardholder name, then activate Review.
    await shopPage.clickUseTestCard();
    await shopPage.setCardholderName('Alex Rivera');
    await expect.soft(shopPage.cardNumberField).toHaveValue('4242 4242 4242 4242');
    await expect.soft(shopPage.expiryField).toHaveValue(/^\d{2}\/\d{2}$/);
    await expect.soft(shopPage.cvvField).toHaveValue(/^\d{3}$/);
    await shopPage.clickReviewButton();
    await expect(shopPage.reviewHeading).toBeVisible();
    await expect.soft(shopPage.cardNumberError).not.toBeVisible();
    await expect.soft(shopPage.cardholderNameError).not.toBeVisible();
    await expect.soft(shopPage.expiryError).not.toBeVisible();
    await expect.soft(shopPage.cvvError).not.toBeVisible();
  });
});