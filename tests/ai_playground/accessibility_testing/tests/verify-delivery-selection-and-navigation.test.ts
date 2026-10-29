// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ShopCheckoutPage } from '../../../../page_objects/ShopCheckoutPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Delivery Selection Is Required And Express Pricing Is Applied', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);

    // 1. From a fresh shop, add an in-stock product, enter valid customer details, and advance to Delivery.
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
    await expect.soft(shopPage.deliveryOption('Standard')).toContainText('£3.50');
    await expect.soft(shopPage.deliveryOption('Express')).toContainText('£5.95');

    // 2. Activate Payment without choosing a delivery option.
    await shopPage.clickPaymentButton();
    await expect.soft(shopPage.deliveryValidationMessage).toBeVisible();
    await expect.soft(shopPage.deliveryHeading).toBeVisible();

    // 3. Choose Express and continue to Payment.
    await shopPage.selectDeliveryOption('Express');
    await shopPage.clickPaymentButton();
    await expect(shopPage.paymentHeading).toBeVisible();
    await expect(shopPage.checkoutSummaryRow('Delivery')).toContainText('£5.95');

    // 4. Navigate back to the previous step.
    await shopPage.returnToDeliveryFromPayment();
    await expect(shopPage.deliveryHeading).toBeVisible();
    await expect(shopPage.deliveryOption('Express')).toHaveClass(/selected/);
  });
});