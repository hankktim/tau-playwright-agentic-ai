# Shop & Checkout Flow Test Plan

## Application Overview

Test challenge 27 - Shop & Checkout Flow, entered from the AI Testing Playground at https://webdriveruniversity.com/AI-Playground/index.html and opened via “Open the honey shop” at https://webdriveruniversity.com/Accessibility-Suite/index.html. The Bramblewick Honey shop has six products, All/Honey/Gifts filters, quantity selectors (1–5), an out-of-stock Lime Blossom Honey item, a basket, discount code BEES10 (10% off item subtotal), and a four-step checkout (customer details, delivery, payment, order review). Standard delivery costs £3.50 and Express costs £5.95; payment uses test data only and no charge is made. A successful order displays a generated BW-… reference and clears the basket. Assume each test starts with a fresh browser context and empty basket/discount state; do not depend on another scenario. Verify visible user-facing results and exact item/discount/delivery totals. The challenge description calls out deliberate accessibility flaws (including unlabeled controls, mouse-only interactions, low contrast, and silent updates); the final scenario is intended to surface and document those failures rather than assume the current page already passes accessibility checks. Use role, label, and text locators where available; use test IDs only when needed to inspect controls that lack accessible names, and avoid fixed waits.

## Test Scenarios

### 1. Shop & Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Product Category Filters Show The Matching Catalog

**File:** `tests/ai_playground/accessibility_testing/tests/verify-product-category-filters.test.ts`

**Steps:**
  1. Open the shop in a fresh context and inspect the default All category.
    - expect: The six shop products are visible, including Wildflower Honey, Heather Honey, Lime Blossom Honey, Cut Honeycomb, Honey & Oat Soap, and Beeswax Candles.
    - expect: The basket is empty.
  2. Select the Honey category.
    - expect: The visible products are Wildflower Honey, Heather Honey, Lime Blossom Honey, and Cut Honeycomb.
    - expect: Gift products are not shown.
  3. Select Gifts, then return to All.
    - expect: Gifts shows Honey & Oat Soap and Beeswax Candles only.
    - expect: All restores all six products.

#### 1.2. Verify Sold-Out Product Cannot Be Added To The Basket

**File:** `tests/ai_playground/accessibility_testing/tests/verify-sold-out-product-cannot-be-added.test.ts`

**Steps:**
  1. Open the shop in a fresh context and locate Lime Blossom Honey.
    - expect: Lime Blossom Honey is identified as sold out.
    - expect: The basket count is zero.
  2. Attempt to activate the sold-out product control.
    - expect: The product is not added to the basket.
    - expect: The basket remains empty and no successful add confirmation is shown.

#### 1.3. Verify Selected Product Quantity And Basket Subtotal

**File:** `tests/ai_playground/accessibility_testing/tests/verify-selected-quantity-is-added-to-basket.test.ts`

**Steps:**
  1. Open the shop in a fresh context, select quantity 2 for Wildflower Honey, and add it to the basket.
    - expect: An add-to-basket confirmation is shown.
    - expect: The basket link displays a count of 2.
  2. Open the basket and inspect its item and totals.
    - expect: Wildflower Honey is listed with quantity 2 and line total £15.00.
    - expect: Subtotal is £15.00, standard delivery is £3.50, and total is £18.50.

#### 1.4. Verify Basket Quantity Controls Update Totals And Persist

**File:** `tests/ai_playground/accessibility_testing/tests/verify-basket-quantity-update-and-persistence.test.ts`

**Steps:**
  1. From a fresh shop, add one Honey & Oat Soap and open the basket.
    - expect: The basket shows one Honey & Oat Soap at £4.50.
  2. Increase the basket quantity once.
    - expect: The quantity becomes 2, the line total and subtotal become £9.00, and the basket count becomes 2.
  3. Reload the basket page.
    - expect: The item and quantity 2 remain in the basket and the totals remain correct.
  4. Decrease the quantity once.
    - expect: The quantity returns to 1 and the line total returns to £4.50.

#### 1.5. Verify Removing The Last Basket Item Shows The Empty State

**File:** `tests/ai_playground/accessibility_testing/tests/verify-removing-last-item-shows-empty-basket.test.ts`

**Steps:**
  1. Open the shop in a fresh context, add one in-stock product, and open the basket.
    - expect: The selected product is listed in the basket.
  2. Remove the last item, either with its remove control or by decreasing its quantity at 1.
    - expect: The basket displays “Your basket is empty” and the empty-state guidance.
    - expect: A Back to the shop link is available and no checkout link is presented.

#### 1.6. Verify Invalid And Valid Discount Codes Update The Total

**File:** `tests/ai_playground/accessibility_testing/tests/verify-discount-code-validation-and-removal.test.ts`

**Steps:**
  1. From a fresh shop, add one Honey & Oat Soap and open the basket.
    - expect: Subtotal is £4.50 and total is £8.00 including £3.50 standard delivery.
  2. Apply the invalid code NOTACODE.
    - expect: “That code is not recognised” is shown.
    - expect: No discount row is applied and the total remains £8.00.
  3. Apply BEES10.
    - expect: The page confirms BEES10 is applied for 10% off.
    - expect: A £0.45 discount is shown against the £4.50 item subtotal; delivery remains £3.50 and total becomes £7.55.
  4. Remove the applied discount.
    - expect: The discount row is removed and the total returns to £8.00.

#### 1.7. Verify Checkout Requires Valid Customer Details

**File:** `tests/ai_playground/accessibility_testing/tests/verify-checkout-details-validation.test.ts`

**Steps:**
  1. From a fresh shop, add an in-stock product and proceed from the basket to Checkout.
    - expect: Checkout starts at Your details and shows Full name, Email, Street address, Town or city, and Postcode fields.
  2. Leave all required fields blank and activate Delivery.
    - expect: Inline validation is shown for full name, email, street address, town/city, and postcode.
    - expect: Checkout remains on Your details and does not advance.
  3. Enter a single-word name, malformed email, non-letter town, and invalid UK postcode, then activate Delivery.
    - expect: The affected fields show validation errors and checkout remains on Your details.
  4. Correct the values to Alex Rivera, alex.rivera@example.com, 12 Example Street, London, and SW1A 1AA, then activate Delivery.
    - expect: Checkout advances to the Delivery step.

#### 1.8. Verify Delivery Selection Is Required And Express Pricing Is Applied

**File:** `tests/ai_playground/accessibility_testing/tests/verify-delivery-selection-and-navigation.test.ts`

**Steps:**
  1. From a fresh shop, add an in-stock product, enter valid customer details, and advance to Delivery.
    - expect: Standard delivery (£3.50) and Express delivery (£5.95) options are displayed.
  2. Activate Payment without choosing a delivery option.
    - expect: “Choose a delivery option to continue” is shown and checkout remains on Delivery.
  3. Choose Express and continue to Payment.
    - expect: Checkout advances to Payment and the delivery amount is £5.95 in the order summary.
  4. Navigate back to the previous step.
    - expect: Checkout returns to Delivery and the selected Express option remains selected.

#### 1.9. Verify Payment Validation And Test Card Population

**File:** `tests/ai_playground/accessibility_testing/tests/verify-payment-validation-and-test-card.test.ts`

**Steps:**
  1. From a fresh shop, add an in-stock product, complete valid customer details, choose Standard delivery, and advance to Payment.
    - expect: The test-payment notice explains that no charge is made and displays the test card number 4242 4242 4242 4242.
    - expect: Card number, Name on card, Expiry, CVV, Use test card, and Review controls are visible.
  2. Leave all payment fields blank and activate Review.
    - expect: Validation is shown for the 16-digit card number, full cardholder name, future MM/YY expiry, and 3-digit CVV.
    - expect: Checkout remains on Payment.
  3. Use the test-card shortcut and enter Alex Rivera as the cardholder name, then activate Review.
    - expect: The test card number, future expiry, and 3-digit CVV are populated.
    - expect: Checkout advances to Review and no payment error is shown.

#### 1.10. Verify Review And Successful Order Placement

**File:** `tests/ai_playground/accessibility_testing/tests/verify-successful-order-placement.test.ts`

**Steps:**
  1. From a fresh shop, add two Wildflower Honey jars, apply BEES10, enter valid customer details, choose Standard delivery, and populate valid test payment details.
    - expect: The checkout review shows the correct item and quantity, delivery address/postcode, Standard delivery, applied discount, and matching total.
  2. Place the order.
    - expect: An order confirmation with a generated BW- reference and confirmation-email message is displayed.
    - expect: The confirmation page offers Continue shopping.
    - expect: The basket and applied discount are cleared after returning to the shop.
    - expect: No real payment is charged.

#### 1.11. Verify Shop And Basket Controls Are Accessible

**File:** `tests/ai_playground/accessibility_testing/tests/verify-shop-controls-accessibility.test.ts`

**Steps:**
  1. Using keyboard navigation only from a fresh shop page, move through category filters, product quantity selectors, Add to basket controls, and the basket link; activate the relevant controls without a mouse.
    - expect: Every interactive control can receive keyboard focus and be activated with the keyboard.
    - expect: Focus is visibly indicated and the selected category and product updates can be determined.
  2. Add an item and inspect the basket quantity increase/decrease and remove controls, then inspect delivery choices during checkout.
    - expect: Each control has a meaningful accessible name, and the delivery choices are keyboard operable.
    - expect: Basket additions and quantity changes are announced to assistive technology rather than only changing visually.
  3. Review text and control contrast in the shop, basket, and checkout against WCAG 2.2 AA contrast thresholds.
    - expect: Normal text meets a contrast ratio of at least 4.5:1 and large text or user-interface components meet applicable 3:1 thresholds.
    - expect: Record any failures as challenge findings; the described accessibility defects are not expected to pass without remediation.
