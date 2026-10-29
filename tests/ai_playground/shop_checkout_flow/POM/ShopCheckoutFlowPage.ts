import { type Locator, type Page } from '@playwright/test';

export const shopProductNames = [
  'Wireless Headphones',
  'USB-C Hub 7-in-1',
  'Mechanical Keyboard TKL',
  'Laptop Stand Aluminium',
] as const;

export type ShopProductName = (typeof shopProductNames)[number];

const productDetails: Record<ShopProductName, { price: string; description: string }> = {
  'Wireless Headphones': {
    price: '£89.99',
    description: '30hr battery, active noise cancellation, over-ear.',
  },
  'USB-C Hub 7-in-1': {
    price: '£34.99',
    description: 'HDMI 4K, 3× USB-A, SD card, 100W PD charging.',
  },
  'Mechanical Keyboard TKL': {
    price: '£129.99',
    description: 'Cherry MX Red, per-key RGB, PBT double-shot keycaps.',
  },
  'Laptop Stand Aluminium': {
    price: '£49.99',
    description: 'Adjustable 15–25cm, folding, fits up to 17" laptops.',
  },
};

export class ShopCheckoutFlowPage {
  readonly page: Page;
  readonly challengeHeading: Locator;
  readonly challengeSection: Locator;
  readonly productsStepIndicator: Locator;
  readonly cartHeading: Locator;
  readonly emptyCartMessage: Locator;
  readonly emptyCartValidationMessage: Locator;
  readonly proceedToDeliveryButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.challengeHeading = page.getByRole('heading', {
      name: '25. Shop & Checkout Flow',
      exact: true,
    });
    // The challenge has no semantic container, so anchor its parent to the unique heading.
    this.challengeSection = this.challengeHeading.locator('xpath=..');
    this.productsStepIndicator = this.challengeSection.getByText('1 — Products', { exact: true });
    this.cartHeading = this.challengeSection.getByRole('heading', { name: /^Cart \d+$/ });
    this.emptyCartMessage = this.challengeSection.getByText('Cart is empty', { exact: true });
    this.emptyCartValidationMessage = this.challengeSection.getByText(
      'Add at least one item to continue.',
      { exact: true },
    );
    this.proceedToDeliveryButton = this.challengeSection.getByRole('button', {
      name: 'Proceed to Delivery →',
      exact: true,
    });
  }

  public async navigateToChallenge(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
  }

  public productCard(productName: ShopProductName): Locator {
    // Product cards have no semantic role; the product name's parent scopes their controls.
    return this.challengeSection.getByText(productName, { exact: true }).locator('xpath=..');
  }

  public productPrice(productName: ShopProductName): Locator {
    return this.productCard(productName).getByText(productDetails[productName].price, {
      exact: true,
    });
  }

  public productDescription(productName: ShopProductName): Locator {
    return this.productCard(productName).getByText(productDetails[productName].description, {
      exact: true,
    });
  }

  public productQuantityInput(productName: ShopProductName): Locator {
    return this.productCard(productName).getByRole('spinbutton');
  }

  public addProductButton(productName: ShopProductName): Locator {
    return this.productCard(productName).getByRole('button', { name: 'Add', exact: true });
  }

  public cartItem(productName: ShopProductName, quantity: number): Locator {
    return this.challengeSection.getByText(`${productName} ×${quantity}`, { exact: true });
  }

  public cartTotal(amount: string): Locator {
    return this.challengeSection.getByText(`Total: ${amount}`, { exact: true });
  }

  public async addProductToCart(productName: ShopProductName): Promise<void> {
    await this.addProductButton(productName).click();
  }

  public async proceedToDelivery(): Promise<void> {
    await this.proceedToDeliveryButton.click();
  }
}
