# Moving Target Test Plan

## Application Overview

Test challenge 6, Moving Target, on https://webdriveruniversity.com/AI-Playground/index.html. Start every scenario in a fresh page. The challenge exposes an enabled button named “Catch Me” that repositions when approached by the pointer. Use its accessible role and name, not fixed screen coordinates. Pointer clicking can miss the moving target; focusing the live button locator and pressing Enter catches it and displays the global “Got it!” confirmation.

## Test Scenarios

### 1. Moving Target

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Moving Target Repositions And Remains Accessible

**File:** `tests/ai_playground/moving_target/tests/verify-moving-target-repositions-and-remains-accessible.test.ts`

**Steps:**
  1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and locate the “6. Moving Target” section and its “Catch Me” button by accessible role and name.
    - expect: The “Catch Me” button is visible and enabled.
    - expect: The button can be located without relying on its initial screen coordinates or generated styling classes.
  2. Hover the current “Catch Me” button, then re-locate it by role and name.
    - expect: The target's screen position changes when approached.
    - expect: After repositioning, the target remains a visible, enabled button named “Catch Me”.
  3. Repeat the approach and re-location once more, without retaining a prior coordinate or stale element handle.
    - expect: The target remains discoverable by the same accessible role and name after another movement.
    - expect: No neighboring challenge control is activated.

#### 1.2. Verify Moving Target Can Be Caught With Keyboard Activation

**File:** `tests/ai_playground/moving_target/tests/verify-moving-target-can-be-caught.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate “Catch Me” in challenge 6 by accessible role and name.
    - expect: The target is visible and enabled before interaction.
    - expect: The test does not assume a fixed target position.
  2. Focus the current “Catch Me” button through its role-based locator and press Enter, avoiding pointer approach.
    - expect: The current button receives keyboard focus without relying on its screen position.
    - expect: Keyboard activation catches the moving target.
  3. Confirm the catch result and inspect nearby challenge controls.
    - expect: The global “Got it!” confirmation appears after activation.
    - expect: The confirmation is asserted by exact text, even though it is outside the Moving Target card.
