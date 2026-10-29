// spec: tests/ai_playground/shop_checkout_flow/test plan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect, type Locator } from '@playwright/test';
import {
  type AccessibilityControlDetails,
  ShopCheckoutPage,
} from '../../../../page_objects/ShopCheckoutPage';

type Rgb = readonly [number, number, number];

interface AccessibilityControlAudit extends AccessibilityControlDetails {
  control: string;
  expectedRole: string;
  expectedAccessibleName: string;
  keyboardReachable: boolean;
  findings: string[];
}

interface ContrastAudit {
  sample: string;
  foreground: string;
  background: string;
  ratio: number;
  minimumRatio: number;
  passes: boolean;
}

function linearize(channel: number): number {
  const normalized = channel / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance([red, green, blue]: Rgb): number {
  return 0.2126 * linearize(red) + 0.7152 * linearize(green) + 0.0722 * linearize(blue);
}

function contrastRatio(foreground: Rgb, background: Rgb): number {
  const luminances = [relativeLuminance(foreground), relativeLuminance(background)];
  const lighter = Math.max(...luminances);
  const darker = Math.min(...luminances);
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbFromCss(color: string): Rgb {
  const channels = color.match(/[\d.]+/g)?.map(Number);
  const [red, green, blue] = channels ?? [];
  if (red === undefined || green === undefined || blue === undefined) {
    throw new Error(`Unsupported computed color: ${color}`);
  }
  return [red, green, blue];
}

function auditControl(
  control: string,
  details: AccessibilityControlDetails,
  expectedRole: string,
  expectedAccessibleName: string,
  keyboardReachable: boolean,
): AccessibilityControlAudit {
  const actualName = details.accessibleName?.toLowerCase() ?? '';
  const expectedName = expectedAccessibleName.toLowerCase();
  const findings: string[] = [];

  if (details.role !== expectedRole) {
    findings.push(`Expected role "${expectedRole}", observed "${details.role ?? 'none'}".`);
  }
  if (!actualName.includes(expectedName)) {
    findings.push(
      `Expected an accessible name containing "${expectedAccessibleName}", observed "${details.accessibleName ?? 'none'}".`,
    );
  }
  if (!keyboardReachable) {
    findings.push('Control is not reachable in the keyboard tab order.');
  }

  return {
    ...details,
    control,
    expectedRole,
    expectedAccessibleName,
    keyboardReachable,
    findings,
  };
}

async function measureContrast(
  shopPage: ShopCheckoutPage,
  sample: string,
  locator: Locator,
  foregroundType: 'text' | 'border',
  minimumRatio: number,
): Promise<ContrastAudit> {
  const colors = await shopPage.contrastColors(locator, foregroundType);
  const ratio = contrastRatio(rgbFromCss(colors.foreground), rgbFromCss(colors.background));
  return {
    sample,
    foreground: colors.foreground,
    background: colors.background,
    ratio: Number(ratio.toFixed(2)),
    minimumRatio,
    passes: ratio >= minimumRatio,
  };
}

test.describe('Shop & Checkout Flow', () => {
  test('Audit Shop And Basket Accessibility Findings', async ({ page }) => {
    const shopPage = new ShopCheckoutPage(page);
    const productName = 'Wildflower Honey';
    const controlAudit: AccessibilityControlAudit[] = [];
    const contrastAudit: ContrastAudit[] = [];

    // 1. Check shop keyboard access and exercise the controls that are currently keyboard operable.
    await shopPage.navigateToShop();

    const categoryCounts = { All: 6, Honey: 4, Gifts: 2 } as const;
    for (const category of ['All', 'Honey', 'Gifts'] as const) {
      const filter = shopPage.categoryFilter(category);
      const details = await shopPage.accessibilityControlDetails(filter);
      const keyboardReachable = await shopPage.focusWithKeyboard(filter);
      if (keyboardReachable) {
        await shopPage.pressKeyboardKey('Enter');
        await expect(filter).toHaveClass(/active/);
        await expect(shopPage.productCards.filter({ visible: true })).toHaveCount(categoryCounts[category]);
      }
      controlAudit.push(
        auditControl(category, details, 'button', category, keyboardReachable),
      );
    }

    const allFilter = shopPage.categoryFilter('All');
    if (await shopPage.focusWithKeyboard(allFilter)) {
      await shopPage.pressKeyboardKey('Enter');
      await expect(allFilter).toHaveClass(/active/);
      await expect(shopPage.productCards.filter({ visible: true })).toHaveCount(6);
    }

    const quantityControl = shopPage.productQuantityControl(productName);
    const quantityReachable = await shopPage.focusWithKeyboard(quantityControl);
    expect(quantityReachable, 'Product quantity selector should be reachable with the keyboard').toBe(true);
    await expect(quantityControl).toBeFocused();
    controlAudit.push(
      auditControl(
        `${productName} quantity selector`,
        await shopPage.accessibilityControlDetails(quantityControl),
        'combobox',
        productName,
        quantityReachable,
      ),
    );

    await shopPage.pressKeyboardKey('ArrowDown');
    await expect(quantityControl).toHaveValue('2');

    const addButton = shopPage.addProductButton(productName);
    const addButtonReachable = await shopPage.focusWithKeyboard(addButton);
    expect(addButtonReachable, 'Add to basket should be reachable with the keyboard').toBe(true);
    await expect(addButton).toBeFocused();
    await expect(addButton).toHaveCSS('outline-style', 'solid');
    await expect(addButton).toHaveCSS('outline-width', '2px');
    controlAudit.push(
      auditControl(
        `${productName} add button`,
        await shopPage.accessibilityControlDetails(addButton),
        'button',
        productName,
        addButtonReachable,
      ),
    );

    await shopPage.pressKeyboardKey('Enter');
    await expect(shopPage.addConfirmationFor(productName)).toBeVisible();
    await expect(shopPage.basketLink).toHaveText('Basket (2)');
    const announcementAudit = [
      {
        action: 'Add item to basket',
        liveRegionCount: await shopPage.announcementRegion.count(),
      },
    ];
    contrastAudit.push(
      await measureContrast(
        shopPage,
        'Shop sold-out status text',
        shopPage.soldOutProductControl('Lime Blossom Honey'),
        'text',
        4.5,
      ),
      await measureContrast(
        shopPage,
        'Shop category filter border',
        shopPage.categoryFilter('Honey'),
        'border',
        3,
      ),
    );

    const basketReachable = await shopPage.focusWithKeyboard(shopPage.basketLink, 'backward');
    expect(basketReachable, 'Basket link should be reachable with the keyboard').toBe(true);
    await expect(shopPage.basketLink).toBeFocused();
    await shopPage.pressKeyboardKey('Enter');

    // 2. Inspect basket action names and announcements while confirming keyboard updates still work.
    await expect(shopPage.basketLineItem(productName)).toBeVisible();
    await expect(shopPage.basketQuantityValue(productName, 2)).toBeVisible();

    const decreaseButton = shopPage.basketDecrementButton(productName);
    const increaseButton = shopPage.basketIncrementButton(productName);
    const removeButton = shopPage.basketRemoveButton(productName);

    const decreaseReachable = await shopPage.focusWithKeyboard(decreaseButton);
    expect(decreaseReachable, 'Decrease quantity should be reachable with the keyboard').toBe(true);
    await expect(decreaseButton).toBeFocused();
    controlAudit.push(
      auditControl(
        `${productName} decrease quantity`,
        await shopPage.accessibilityControlDetails(decreaseButton),
        'button',
        'Decrease quantity',
        decreaseReachable,
      ),
    );

    const increaseReachable = await shopPage.focusWithKeyboard(increaseButton);
    expect(increaseReachable, 'Increase quantity should be reachable with the keyboard').toBe(true);
    await expect(increaseButton).toBeFocused();
    controlAudit.push(
      auditControl(
        `${productName} increase quantity`,
        await shopPage.accessibilityControlDetails(increaseButton),
        'button',
        'Increase quantity',
        increaseReachable,
      ),
    );

    const removeReachable = await shopPage.focusWithKeyboard(removeButton);
    expect(removeReachable, 'Remove item should be reachable with the keyboard').toBe(true);
    await expect(removeButton).toBeFocused();
    controlAudit.push(
      auditControl(
        `${productName} remove item`,
        await shopPage.accessibilityControlDetails(removeButton),
        'button',
        `Remove ${productName}`,
        removeReachable,
      ),
    );

    expect(await shopPage.focusWithKeyboard(decreaseButton, 'backward')).toBe(true);
    await shopPage.pressKeyboardKey('Enter');
    await expect(shopPage.basketQuantityValue(productName, 1)).toBeVisible();
    announcementAudit.push({
      action: 'Decrease basket quantity',
      liveRegionCount: await shopPage.announcementRegion.count(),
    });

    expect(await shopPage.focusWithKeyboard(increaseButton)).toBe(true);
    await shopPage.pressKeyboardKey('Enter');
    await expect(shopPage.basketQuantityValue(productName, 2)).toBeVisible();
    announcementAudit.push({
      action: 'Increase basket quantity',
      liveRegionCount: await shopPage.announcementRegion.count(),
    });

    contrastAudit.push(
      await measureContrast(
        shopPage,
        'Basket product description text',
        shopPage.basketProductDescription(productName),
        'text',
        4.5,
      ),
      await measureContrast(
        shopPage,
        'Basket quantity control icon',
        increaseButton,
        'text',
        3,
      ),
    );

    await shopPage.proceedToCheckout();
    await shopPage.enterCustomerDetails({
      fullName: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      streetAddress: '12 Example Street',
      townOrCity: 'London',
      postcode: 'SW1A 1AA',
    });
    await shopPage.clickDeliveryButton();
    await expect(shopPage.deliveryHeading).toBeVisible();

    for (const option of ['Standard', 'Express'] as const) {
      const deliveryOption = shopPage.deliveryOption(option);
      await expect(deliveryOption).toBeVisible();
      const details = await shopPage.accessibilityControlDetails(deliveryOption);
      const keyboardReachable = await shopPage.focusWithKeyboard(deliveryOption);
      if (keyboardReachable) {
        await shopPage.pressKeyboardKey('Enter');
        await expect(deliveryOption).toHaveClass(/selected/);
      }
      controlAudit.push(
        auditControl(option, details, 'radio', option, keyboardReachable),
      );
    }

    await shopPage.selectDeliveryOption('Standard');
    await expect(shopPage.deliveryOption('Standard')).toHaveClass(/selected/);
    contrastAudit.push(
      await measureContrast(
        shopPage,
        'Checkout delivery description text',
        shopPage.deliveryOptionDescription('Standard'),
        'text',
        4.5,
      ),
    );

    // 3. Record accessibility and contrast findings without turning the known challenge defects into flow failures.
    const findings = [
      ...controlAudit.flatMap((control) =>
        control.findings.map((finding) => `${control.control}: ${finding}`),
      ),
      ...announcementAudit
        .filter((announcement) => announcement.liveRegionCount === 0)
        .map((announcement) => `${announcement.action}: no live region announced the update.`),
      ...contrastAudit
        .filter((sample) => !sample.passes)
        .map(
          (sample) =>
            `${sample.sample}: ${sample.ratio}:1 is below the ${sample.minimumRatio}:1 threshold.`,
        ),
    ];

    expect(controlAudit).toHaveLength(10);
    expect(announcementAudit).toHaveLength(3);
    expect(contrastAudit).toHaveLength(5);
    expect(contrastAudit.every((sample) => Number.isFinite(sample.ratio) && sample.ratio > 0)).toBe(true);

    test.info().annotations.push({
      type: 'accessibility-audit',
      description: `${findings.length} accessibility finding(s) recorded in the attached report.`,
    });
    await test.info().attach('accessibility-audit-findings.json', {
      body: JSON.stringify(
        {
          controls: controlAudit,
          announcements: announcementAudit,
          contrast: contrastAudit,
          findings,
        },
        null,
        2,
      ),
      contentType: 'application/json',
    });
  });
});
