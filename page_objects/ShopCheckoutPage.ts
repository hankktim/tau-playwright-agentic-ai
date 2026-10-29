import { type Locator, type Page } from '@playwright/test';

export type ProductCategory = 'All' | 'Honey' | 'Gifts';
export type ProductName =
  | 'Wildflower Honey'
  | 'Heather Honey'
  | 'Lime Blossom Honey'
  | 'Cut Honeycomb'
  | 'Honey & Oat Soap'
  | 'Beeswax Candles';

export interface CustomerDetails {
  fullName: string;
  email: string;
  streetAddress: string;
  townOrCity: string;
  postcode: string;
}

export interface AccessibilityControlDetails {
  tagName: string;
  role: string | null;
  accessibleName: string | null;
  tabIndex: number;
  ariaPressed: string | null;
  className: string | null;
  text: string;
}

export interface ContrastColors {
  foreground: string;
  background: string;
}

export class ShopCheckoutPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly basketLink: Locator;
  readonly continueShoppingLink: Locator;
  readonly emptyBasketHeading: Locator;
  readonly emptyBasketGuidance: Locator;
  readonly backToShopLink: Locator;
  readonly checkoutLink: Locator;
  readonly discountCodeField: Locator;
  readonly applyDiscountButton: Locator;
  readonly invalidDiscountMessage: Locator;
  readonly appliedDiscountMessage: Locator;
  readonly removeDiscountButton: Locator;
  readonly fullNameField: Locator;
  readonly emailField: Locator;
  readonly streetAddressField: Locator;
  readonly townOrCityField: Locator;
  readonly postcodeField: Locator;
  readonly fullNameError: Locator;
  readonly emailError: Locator;
  readonly streetAddressError: Locator;
  readonly townOrCityError: Locator;
  readonly postcodeError: Locator;
  readonly yourDetailsHeading: Locator;
  readonly deliveryHeading: Locator;
  readonly deliveryNextButton: Locator;
  readonly paymentHeading: Locator;
  readonly paymentNextButton: Locator;
  readonly paymentBackButton: Locator;
  readonly deliveryValidationMessage: Locator;
  readonly testPaymentNotice: Locator;
  readonly testCardNumberText: Locator;
  readonly cardNumberField: Locator;
  readonly cardholderNameField: Locator;
  readonly expiryField: Locator;
  readonly cvvField: Locator;
  readonly useTestCardButton: Locator;
  readonly reviewButton: Locator;
  readonly cardNumberError: Locator;
  readonly cardholderNameError: Locator;
  readonly expiryError: Locator;
  readonly cvvError: Locator;
  readonly reviewHeading: Locator;
  readonly placeOrderButton: Locator;
  readonly orderConfirmation: Locator;
  readonly confirmationEmailMessage: Locator;
  readonly orderContinueShoppingLink: Locator;
  readonly announcementRegion: Locator;

  private readonly categoryFilters: Record<ProductCategory, Locator>;
  private readonly productTestIds: Record<ProductName, string> = {
    'Wildflower Honey': 'wildflower',
    'Heather Honey': 'heather',
    'Lime Blossom Honey': 'lime',
    'Cut Honeycomb': 'honeycomb',
    'Honey & Oat Soap': 'soap',
    'Beeswax Candles': 'candles',
  };

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.getByRole('article');
    this.basketLink = page.getByRole('link', { name: /Basket \(\d+\)/ });
    this.continueShoppingLink = page.getByTestId('continue-shopping');
    this.emptyBasketHeading = page.getByRole('heading', { name: 'Your basket is empty' });
    this.emptyBasketGuidance = page.getByText(
      'Nothing in here yet. Everything in the shop ships from our own hives.',
      { exact: true },
    );
    this.backToShopLink = page.getByRole('link', { name: 'Back to the shop' });
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
    this.discountCodeField = page.getByRole('textbox', { name: 'Discount code' });
    this.applyDiscountButton = page.getByRole('button', { name: 'Apply' });
    this.invalidDiscountMessage = page.getByText('That code is not recognised', { exact: true });
    this.appliedDiscountMessage = page.getByText('BEES10 applied: 10% off');
    this.removeDiscountButton = page.getByRole('button', { name: 'Remove' });
    this.fullNameField = page.getByRole('textbox', { name: 'Full name' });
    this.emailField = page.getByRole('textbox', { name: 'Email' });
    this.streetAddressField = page.getByRole('textbox', { name: 'Street address' });
    this.townOrCityField = page.getByRole('textbox', { name: 'Town or city' });
    this.postcodeField = page.getByRole('textbox', { name: 'Postcode' });
    this.fullNameError = page.getByText('Enter your first and last name', { exact: true });
    this.emailError = page.getByText('Enter a valid email address, like name@example.com', { exact: true });
    this.streetAddressError = page.getByText('Enter your street address, like 12 Example Street', { exact: true });
    this.townOrCityError = page.getByText('Enter your town or city, letters only', { exact: true });
    this.postcodeError = page.getByText('Enter a UK postcode, like AB1 2CD', { exact: true });
    this.yourDetailsHeading = page.getByRole('heading', { name: 'Your details', exact: true });
    this.deliveryHeading = page.getByRole('heading', { name: 'Delivery', exact: true });
    this.deliveryNextButton = page.getByRole('button', { name: 'Delivery →' });
    this.paymentHeading = page.getByRole('heading', { name: 'Payment', exact: true });
    this.paymentNextButton = page.getByRole('button', { name: 'Payment →' });
    this.paymentBackButton = page.getByRole('button', { name: '← Back' });
    this.deliveryValidationMessage = page.getByText('Choose a delivery option to continue', { exact: true });
    this.testPaymentNotice = page.getByText('Nothing is charged and no card details are stored.');
    this.testCardNumberText = page.getByText('4242 4242 4242 4242', { exact: true });
    this.cardNumberField = page.getByRole('textbox', { name: 'Card number' });
    this.cardholderNameField = page.getByRole('textbox', { name: 'Name on card' });
    this.expiryField = page.getByRole('textbox', { name: 'Expiry' });
    this.cvvField = page.getByRole('textbox', { name: 'CVV' });
    this.useTestCardButton = page.getByRole('button', { name: 'Use test card' });
    this.reviewButton = page.getByRole('button', { name: 'Review →' });
    this.cardNumberError = page.getByText('Enter a valid 16-digit card number', { exact: true });
    this.cardholderNameError = page.getByText('Enter the full name printed on the card', { exact: true });
    this.expiryError = page.getByText('Enter a future expiry as MM/YY', { exact: true });
    this.cvvError = page.getByText('Enter the 3-digit code on the back', { exact: true });
    this.reviewHeading = page.getByRole('heading', { name: 'Review and place order', exact: true });
    this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
    this.orderConfirmation = page.getByText(/Order placed\. Ref BW-\d+/);
    this.confirmationEmailMessage = page.getByText('A confirmation email is on its way.');
    this.orderContinueShoppingLink = page.getByRole('link', { name: 'Continue shopping' });
    this.announcementRegion = page.getByRole('status');
    this.categoryFilters = {
      All: page.getByTestId('filter-all'),
      Honey: page.getByTestId('filter-honey'),
      Gifts: page.getByTestId('filter-gifts'),
    };
  }

  public async navigateToShop(): Promise<void> {
    await this.page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    await this.page.getByRole('link', { name: 'Open the honey shop →' }).click();
  }

  public async selectCategory(category: ProductCategory): Promise<void> {
    await this.categoryFilters[category].click();
  }

  public categoryFilter(category: ProductCategory): Locator {
    return this.categoryFilters[category];
  }

  // The filter chips lack a semantic container, so use their section for contrast checks.
  public categoryFilterCard(): Locator {
    return this.page.getByRole('heading', { name: 'Shop', exact: true }).locator('xpath=ancestor::section[1]');
  }

  public productQuantityControl(productName: ProductName): Locator {
    return this.productCard(productName).getByRole('combobox', { name: 'Quantity' });
  }

  public addProductButton(productName: ProductName): Locator {
    return this.productCard(productName).getByRole('button', { name: 'Add to basket' });
  }

  public async selectProductQuantity(productName: ProductName, quantity: number): Promise<void> {
    await this.productCard(productName)
      .getByRole('combobox', { name: 'Quantity' })
      .selectOption(String(quantity));
  }

  public async addProductToBasket(productName: ProductName): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Add to basket' }).click();
  }

  public addConfirmationFor(productName: ProductName): Locator {
    return this.productCard(productName).getByText('Added to your basket', { exact: true });
  }

  public async openBasket(): Promise<void> {
    await this.basketLink.click();
  }

  public async proceedToCheckout(): Promise<void> {
    await this.checkoutLink.click();
  }

  public async continueShopping(): Promise<void> {
    await this.continueShoppingLink.click();
  }

  public async reloadBasket(): Promise<void> {
    await this.page.reload();
  }

  public async increaseBasketQuantity(productName: ProductName): Promise<void> {
    await this.basketIncrementButton(productName).click();
  }

  public async decreaseBasketQuantity(productName: ProductName): Promise<void> {
    await this.basketDecrementButton(productName).click();
  }

  public async removeBasketItem(productName: ProductName): Promise<void> {
    await this.basketRemoveButton(productName).click();
  }

  public basketIncrementButton(productName: ProductName): Locator {
    return this.page.getByTestId(`inc-${this.productTestIds[productName]}`);
  }

  public basketDecrementButton(productName: ProductName): Locator {
    return this.page.getByTestId(`dec-${this.productTestIds[productName]}`);
  }

  public basketRemoveButton(productName: ProductName): Locator {
    return this.page.getByTestId(`remove-${this.productTestIds[productName]}`);
  }

  public async applyDiscountCode(code: string): Promise<void> {
    await this.discountCodeField.fill(code);
    await this.applyDiscountButton.click();
  }

  public async removeAppliedDiscount(): Promise<void> {
    await this.removeDiscountButton.click();
  }

  public async setFullName(value: string): Promise<void> {
    await this.fullNameField.fill(value);
  }

  public async setEmail(value: string): Promise<void> {
    await this.emailField.fill(value);
  }

  public async setStreetAddress(value: string): Promise<void> {
    await this.streetAddressField.fill(value);
  }

  public async setTownOrCity(value: string): Promise<void> {
    await this.townOrCityField.fill(value);
  }

  public async setPostcode(value: string): Promise<void> {
    await this.postcodeField.fill(value);
  }

  public async enterCustomerDetails(details: CustomerDetails): Promise<void> {
    await this.setFullName(details.fullName);
    await this.setEmail(details.email);
    await this.setStreetAddress(details.streetAddress);
    await this.setTownOrCity(details.townOrCity);
    await this.setPostcode(details.postcode);
  }

  public async clickDeliveryButton(): Promise<void> {
    await this.deliveryNextButton.click();
  }

  public deliveryOption(option: 'Standard' | 'Express'): Locator {
    return this.page.getByTestId(`delivery-${option.toLowerCase()}`);
  }

  public deliveryOptionDescription(option: 'Standard' | 'Express'): Locator {
    const descriptions = {
      Standard: '3 to 5 working days, tracked',
      Express: 'Next working day, order by 2pm',
    };
    return this.deliveryOption(option).getByText(descriptions[option], { exact: true });
  }

  public async selectDeliveryOption(option: 'Standard' | 'Express'): Promise<void> {
    await this.deliveryOption(option).click();
  }

  public async clickPaymentButton(): Promise<void> {
    await this.paymentNextButton.click();
  }

  public async returnToDeliveryFromPayment(): Promise<void> {
    await this.paymentBackButton.click();
  }

  public async clickUseTestCard(): Promise<void> {
    await this.useTestCardButton.click();
  }

  public async setCardholderName(value: string): Promise<void> {
    await this.cardholderNameField.fill(value);
  }

  public async clickReviewButton(): Promise<void> {
    await this.reviewButton.click();
  }

  public async pressKeyboardKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  public async focusWithKeyboard(
    locator: Locator,
    direction: 'forward' | 'backward' = 'forward',
    maxTabStops = 32,
  ): Promise<boolean> {
    const tabIndex = await locator.evaluate((element) =>
      element instanceof HTMLElement ? element.tabIndex : -1,
    );
    if (tabIndex < 0) {
      return false;
    }

    const key = direction === 'forward' ? 'Tab' : 'Shift+Tab';
    for (let index = 0; index < maxTabStops; index += 1) {
      await this.pressKeyboardKey(key);
      if (await locator.evaluate((element) => element === document.activeElement)) {
        return true;
      }
    }
    return false;
  }

  public async accessibilityControlDetails(locator: Locator): Promise<AccessibilityControlDetails> {
    return locator.evaluate((element) => {
      const explicitRole = element.getAttribute('role');
      const tagName = element.tagName.toLowerCase();
      const implicitRole = (() => {
        if (element instanceof HTMLButtonElement) {
          return 'button';
        }
        if (element instanceof HTMLAnchorElement && element.hasAttribute('href')) {
          return 'link';
        }
        if (element instanceof HTMLSelectElement) {
          return element.multiple ? 'listbox' : 'combobox';
        }
        if (element instanceof HTMLTextAreaElement) {
          return 'textbox';
        }
        if (element instanceof HTMLInputElement) {
          if (element.type === 'button' || element.type === 'submit' || element.type === 'reset') {
            return 'button';
          }
          if (element.type === 'checkbox') {
            return 'checkbox';
          }
          if (element.type === 'radio') {
            return 'radio';
          }
          return 'textbox';
        }
        return null;
      })();
      const labelledByText = (element.getAttribute('aria-labelledby') ?? '')
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent?.trim() ?? '')
        .filter(Boolean)
        .join(' ');
      const associatedLabels =
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
          ? Array.from(element.labels ?? [])
              .map((label) => label.textContent?.trim() ?? '')
              .filter(Boolean)
              .join(' ')
          : '';
      const text = element.textContent?.trim() ?? '';
      const accessibleName =
        element.getAttribute('aria-label')?.trim() ||
        labelledByText ||
        associatedLabels ||
        (implicitRole === 'button' || implicitRole === 'link' || explicitRole ? text : '') ||
        element.getAttribute('title')?.trim() ||
        null;

      return {
        tagName,
        role: explicitRole ?? implicitRole,
        accessibleName,
        tabIndex: element instanceof HTMLElement ? element.tabIndex : -1,
        ariaPressed: element.getAttribute('aria-pressed'),
        className: element.getAttribute('class'),
        text,
      };
    });
  }

  public async contrastColors(
    locator: Locator,
    foregroundType: 'text' | 'border' = 'text',
  ): Promise<ContrastColors> {
    return locator.evaluate((element, type) => {
      const parseColor = (color: string): [number, number, number, number] => {
        const channels = color.match(/[\d.]+/g)?.map(Number);
        const [red, green, blue, alpha = 1] = channels ?? [];
        if (red === undefined || green === undefined || blue === undefined) {
          throw new Error(`Unsupported computed color: ${color}`);
        }
        return [red, green, blue, alpha];
      };
      const ancestors: Element[] = [];
      for (let current: Element | null = element; current; current = current.parentElement) {
        ancestors.unshift(current);
      }

      let background: [number, number, number] = [255, 255, 255];
      for (const ancestor of ancestors) {
        const [red, green, blue, alpha] = parseColor(getComputedStyle(ancestor).backgroundColor);
        background = [
          red * alpha + background[0] * (1 - alpha),
          green * alpha + background[1] * (1 - alpha),
          blue * alpha + background[2] * (1 - alpha),
        ];
      }

      const style = getComputedStyle(element);
      return {
        foreground: type === 'border' ? style.borderTopColor : style.color,
        background: `rgb(${background.map(Math.round).join(', ')})`,
      };
    }, foregroundType);
  }

  public reviewLine(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }

  public async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  public async continueShoppingAfterOrder(): Promise<void> {
    await this.orderContinueShoppingLink.click();
  }

  public checkoutSummaryRow(label: string): Locator {
    return this.page.getByRole('listitem').filter({
      has: this.page.getByText(label, { exact: true }),
    });
  }

  public async clickSoldOutProduct(productName: ProductName): Promise<void> {
    await this.soldOutProductControl(productName).click();
  }

  public soldOutProductControl(productName: ProductName): Locator {
    return this.productCard(productName).getByRole('button', { name: 'Sold out' });
  }

  public productCard(productName: ProductName): Locator {
    return this.productCards.filter({
      has: this.page.getByRole('heading', { name: productName, exact: true }),
    });
  }

  public basketLineItem(productName: ProductName): Locator {
    return this.page.getByRole('listitem').filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }

  public basketProductDescription(productName: ProductName): Locator {
    return this.basketLineItem(productName).getByText(/\d+g (?:jar|box|bar)|Pair, \d+cm/);
  }

  // Basket rows lack a named card locator, so use the containing section for contrast checks.
  public basketLineItemCard(productName: ProductName): Locator {
    return this.basketLineItem(productName).locator('xpath=ancestor::section[1]');
  }

  public basketQuantityValue(productName: ProductName, quantity: number): Locator {
    return this.basketLineItem(productName).getByText(String(quantity), { exact: true });
  }

  public basketSummaryRow(label: string): Locator {
    return this.page.getByRole('listitem').filter({
      has: this.page.getByText(label, { exact: true }),
    });
  }
}
