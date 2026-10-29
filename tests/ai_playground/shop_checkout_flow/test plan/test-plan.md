# Shop & Checkout Flow Test Plan

## Application Overview

Test challenge 25, Shop & Checkout Flow, on https://webdriveruniversity.com/AI-Playground/index.html. Each scenario starts in a fresh page at the Products step, with four products, each quantity control set to 1, an empty cart, a total of £0.00, and a visible Proceed to Delivery button. Adding a product uses the quantity in its product card; the cart heading shows the total number of units and the cart consolidates repeated additions into one line per product. The total reflects the selected quantities. Attempting to proceed with an empty cart displays “Add at least one item to continue.” Coverage is intentionally limited to the products stage shown in the screenshot and excludes the separate Accessibility Suite challenge 27.

## Test Scenarios

### 1. Shop & Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Product Catalog Renders Correctly

**File:** `tests/ai_playground/shop_checkout_flow/tests/verify-product-catalog-renders-correctly.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 25, Shop & Checkout Flow.
    - expect: The challenge heading and “1 — Products” step indicator are visible.
    - expect: All four product cards show the correct product name, price, description, quantity control set to 1, and Add button.
    - expect: The cart displays “Cart 0”, “Cart is empty”, and “Total: £0.00”.
    - expect: The “Proceed to Delivery →” button is visible.

#### 1.2. Verify Empty Cart State And Progress Button

**File:** `tests/ai_playground/shop_checkout_flow/tests/verify-empty-cart-state-and-progress-button.test.ts`

**Steps:**
  1. Open the challenge in a fresh page without adding any products.
    - expect: The cart displays “Cart 0” and “Cart is empty”, and the total is “£0.00”.
    - expect: The “Proceed to Delivery →” button is visible.
  2. Click “Proceed to Delivery →” while the cart is empty.
    - expect: “Add at least one item to continue.” is visible.
    - expect: The challenge remains on the Products step with an empty cart and a total of “£0.00”.

#### 1.3. Verify Single-Item Add Updates Quantity And Total

**File:** `tests/ai_playground/shop_checkout_flow/tests/verify-single-item-add-updates-quantity-and-total.test.ts`

**Steps:**
  1. Open the challenge in a fresh page and locate the Wireless Headphones product card.
    - expect: Its quantity control is set to 1 and its Add button is visible.
    - expect: The cart starts empty with a total of “£0.00”.
  2. Click Add for Wireless Headphones once.
    - expect: The cart heading reads “Cart 1” and the cart contains “Wireless Headphones ×1”.
    - expect: The cart total is “£89.99” and the empty-cart message is no longer visible.

#### 1.4. Verify Multiple Items Accumulate Costs Correctly

**File:** `tests/ai_playground/shop_checkout_flow/tests/verify-multiple-items-accumulate-costs-correctly.test.ts`

**Steps:**
  1. Open the challenge in a fresh page and add one Wireless Headphones product.
    - expect: The cart contains “Wireless Headphones ×1”, reads “Cart 1”, and totals “£89.99”.
  2. Add one USB-C Hub 7-in-1 product.
    - expect: The cart contains both products, reads “Cart 2”, and totals “£124.98”.
  3. Add one Laptop Stand Aluminium product.
    - expect: The cart contains all three products, reads “Cart 3”, and totals “£174.97”.

#### 1.5. Verify Repeated Add Of Same Product Updates Count

**File:** `tests/ai_playground/shop_checkout_flow/tests/verify-repeated-add-of-same-product-updates-count.test.ts`

**Steps:**
  1. Open the challenge in a fresh page and add Wireless Headphones once using its default quantity of 1.
    - expect: The cart reads “Cart 1”, contains “Wireless Headphones ×1”, and totals “£89.99”.
  2. Click Add for Wireless Headphones a second time without changing its quantity control.
    - expect: The cart consolidates the additions as “Wireless Headphones ×2” and reads “Cart 2”.
    - expect: The total is “£179.98” and the Products step indicator remains visible.
