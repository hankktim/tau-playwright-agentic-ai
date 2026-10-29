// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ShopCheckoutPage } from '../../../../page_objects/ShopCheckoutPage';

test.describe('Shop & Checkout Flow', () => {
  test('Verify Checkout Requires Valid Customer Details', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);

    // 1. From a fresh shop, add an in-stock product and proceed from the basket to Checkout.
    await shopPage.navigateToShop();
    await shopPage.addProductToBasket('Honey & Oat Soap');
    await shopPage.openBasket();
    await shopPage.proceedToCheckout();
    await expect(shopPage.yourDetailsHeading).toBeVisible();
    await expect.soft(shopPage.fullNameField).toBeVisible();
    await expect.soft(shopPage.emailField).toBeVisible();
    await expect.soft(shopPage.streetAddressField).toBeVisible();
    await expect.soft(shopPage.townOrCityField).toBeVisible();
    await expect.soft(shopPage.postcodeField).toBeVisible();

    // 2. Leave all required fields blank and activate Delivery.
    await shopPage.clickDeliveryButton();
    await expect.soft(shopPage.fullNameError).toBeVisible();
    await expect.soft(shopPage.emailError).toBeVisible();
    await expect.soft(shopPage.streetAddressError).toBeVisible();
    await expect.soft(shopPage.townOrCityError).toBeVisible();
    await expect.soft(shopPage.postcodeError).toBeVisible();
    await expect.soft(shopPage.yourDetailsHeading).toBeVisible();
    await expect.soft(shopPage.deliveryHeading).toHaveCount(0);

    // 3. Enter a single-word name, malformed email, non-letter town, and invalid UK postcode, then activate Delivery.
    await shopPage.setFullName('Alex');
    await shopPage.setEmail('alex@');
    await shopPage.setTownOrCity('1234');
    await shopPage.setPostcode('123');
    await shopPage.clickDeliveryButton();
    await expect.soft(shopPage.fullNameError).toBeVisible();
    await expect.soft(shopPage.emailError).toBeVisible();
    await expect.soft(shopPage.streetAddressError).toBeVisible();
    await expect.soft(shopPage.townOrCityError).toBeVisible();
    await expect.soft(shopPage.postcodeError).toBeVisible();
    await expect.soft(shopPage.yourDetailsHeading).toBeVisible();
    await expect.soft(shopPage.deliveryHeading).toHaveCount(0);

    // 4. Correct the values to Alex Rivera, alex.rivera@example.com, 12 Example Street, London, and SW1A 1AA, then activate Delivery.
    await shopPage.enterCustomerDetails({
      fullName: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      streetAddress: '12 Example Street',
      townOrCity: 'London',
      postcode: 'SW1A 1AA',
    });
    await shopPage.clickDeliveryButton();
    await expect(shopPage.deliveryHeading).toBeVisible();
  });
});