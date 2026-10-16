import { test, expect } from '@playwright/test';
import { MovingTargetPage } from '../POM/MovingTargetPage';

test.describe('Moving Target', () => {
  test('Verify Moving Target Repositions And Remains Accessible', async ({ page }) => {
    // 1. Open the playground and locate the target in challenge 6.
    await page.goto('https://webdriveruniversity.com/AI-Playground/index.html');
    const movingTargetPage = new MovingTargetPage(page);
    await expect(movingTargetPage.challengeHeading).toBeVisible();
    await expect(movingTargetPage.catchMeButton).toBeVisible();
    await expect(movingTargetPage.catchMeButton).toBeEnabled();

    // 2. Hover the target and re-locate it by its accessible role and name.
    const initialPosition = await movingTargetPage.getCatchMeButtonPosition();
    await movingTargetPage.hoverCatchMeButton();
    await expect.poll(
      () => movingTargetPage.getCatchMeButtonPosition(),
      { message: 'The target should move when approached.' },
    ).not.toEqual(initialPosition);
    await expect(movingTargetPage.catchMeButton).toHaveAccessibleName('Catch Me');

    // 3. Repeat the approach and confirm the target remains available.
    const firstRepositionedPosition = await movingTargetPage.getCatchMeButtonPosition();
    await movingTargetPage.hoverCatchMeButton();
    await expect.poll(
      () => movingTargetPage.getCatchMeButtonPosition(),
      { message: 'The target should move again when approached.' },
    ).not.toEqual(firstRepositionedPosition);
    await expect(movingTargetPage.catchMeButton).toBeVisible();
    await expect(movingTargetPage.catchMeButton).toBeEnabled();
  });
});