# Re-Enable Delay Test Plan

## Application Overview

Test challenge 5, Re-Enable Delay, on https://webdriveruniversity.com/AI-Playground/index.html. Each scenario starts on a fresh page with the Click Me button enabled and its adjacent status paragraph blank. Clicking the button immediately disables it and changes the status to a countdown beginning with “Re-enabling in 3s…”; after about three seconds the button becomes enabled and the status changes to Ready. Use the accessible button name for interaction, retrying enabled/disabled assertions and exact or pattern-matched status text for state transitions. Keep all interactions in a challenge page object, use no fixed sleeps or forced clicks, and do not depend on the precise duration or intermediate countdown values.

## Test Scenarios

### 1. Re-Enable Delay

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Button Disables And Re-Enables Automatically

**File:** `tests/ai_playground/re_enable_delay/tests/verify-button-disables-and-re-enables-automatically.test.ts`

**Steps:**
  1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and locate challenge 5, Re-Enable Delay, using its heading. Verify the challenge page object can locate the Click Me button and the adjacent status text.
    - expect: The Click Me button is enabled before interaction.
    - expect: The adjacent status paragraph is blank before the first interaction.
  2. Click Click Me once, then inspect the button and status immediately.
    - expect: The button becomes disabled immediately after the click.
    - expect: The status changes from blank to a countdown matching “Re-enabling in <number>s…”; do not assert an exact countdown value.
  3. Wait for the Click Me button to become enabled and the status to return to Ready using retrying assertions; do not use a fixed sleep.
    - expect: The button automatically becomes enabled again within the configured assertion timeout.
    - expect: The status returns to Ready.
    - expect: The test does not rely on observing every intermediate countdown value or on a guessed delay.

#### 1.2. Verify Button Cannot Be Activated During Re-Enable Delay

**File:** `tests/ai_playground/re_enable_delay/tests/verify-button-is-disabled-during-re-enable-delay.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate challenge 5. Confirm the Click Me button is enabled and the adjacent status paragraph is blank.
    - expect: The challenge starts with an enabled button and blank status.
  2. Click Click Me once. While the button is disabled, assert its disabled state and check that the status matches the re-enabling countdown. Do not force a click or wait for a normal click action to time out.
    - expect: The button is disabled during the delay, so it is not available for normal user activation.
    - expect: The countdown status is visible while the button remains disabled.
    - expect: The test makes no assumption about the exact delay or countdown value.
  3. Wait for the button to become enabled and the status to return to Ready using state-based assertions.
    - expect: The button recovers automatically and the challenge can be used again.
    - expect: The test completes without fixed sleeps or forced interactions.

#### 1.3. Verify Button Can Be Clicked Again After Re-Enabling

**File:** `tests/ai_playground/re_enable_delay/tests/verify-button-can-be-clicked-again-after-re-enabling.test.ts`

**Steps:**
  1. Open the challenge in a fresh page and locate Click Me by its accessible button name.
    - expect: The button is enabled and the adjacent status paragraph is blank.
  2. Click Click Me once and wait until the button is enabled and the status is Ready again using retrying assertions.
    - expect: The first disable-and-re-enable cycle completes automatically.
  3. Click Click Me a second time, assert that the button becomes disabled and the countdown status appears, then wait for it to become enabled and Ready again.
    - expect: The second click starts a new delay cycle after the first cycle has completed.
    - expect: The button disables and re-enables again without reloading the page.
    - expect: The scenario passes independently and uses no fixed sleeps or forced clicks.
