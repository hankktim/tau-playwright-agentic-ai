# iFrame Login Test Plan

## Application Overview

Test challenge 10, iFrame Login, on https://webdriveruniversity.com/AI-Playground/index.html. The login controls and feedback paragraph live inside an iframe. Each test starts from a fresh page with blank fields and no result. All form interactions and result assertions must use locators scoped to the iframe, not the top-level page. The observed valid credentials are username admin and password secret123, which display Login successful inside the iframe. Empty input and an incorrect password display Invalid credentials inside the iframe. Use a page object such as tests/ai_playground/iframe_login/POM/IframeLoginPage.ts and role-based locators through the frame locator; keep assertions in the tests and avoid fixed waits.

## Test Scenarios

### 1. iFrame Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Login Succeeds With Valid Credentials

**File:** `tests/ai_playground/iframe_login/tests/verify-valid-login.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 10, iFrame Login. Locate the embedded frame and its Username textbox, Password textbox, and Login button through frame-scoped role locators.
    - expect: The challenge heading and iframe are visible.
    - expect: The Username and Password textboxes and Login button are visible within the iframe.
    - expect: The feedback paragraph is initially empty.
  2. Enter username admin and password secret123 inside the iframe, then activate its Login button.
    - expect: The feedback inside the iframe displays Login successful.
    - expect: No login result is asserted from the top-level document outside the iframe.

#### 1.2. Verify Login Rejects Incorrect Credentials

**File:** `tests/ai_playground/iframe_login/tests/verify-invalid-login.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 10. Enter username admin and an incorrect password, then activate Login inside the iframe.
    - expect: The feedback inside the iframe displays Invalid credentials.
    - expect: Login successful is not displayed.
  2. Replace the username with an incorrect value, enter password secret123, and activate Login inside the iframe.
    - expect: The feedback inside the iframe displays Invalid credentials.
    - expect: The response remains within the iframe.

#### 1.3. Verify Login Rejects Empty Submission

**File:** `tests/ai_playground/iframe_login/tests/verify-empty-login.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 10. Leave both fields empty and activate Login inside the iframe.
    - expect: The feedback inside the iframe displays Invalid credentials.
    - expect: Login successful is not displayed.

#### 1.4. Verify Login Feedback Updates After A Failed Attempt

**File:** `tests/ai_playground/iframe_login/tests/verify-login-feedback-updates.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 10. Enter an incorrect password for username admin and activate Login inside the iframe.
    - expect: The feedback inside the iframe displays Invalid credentials.
  2. Replace the password with secret123 and activate Login again inside the iframe.
    - expect: The feedback changes to Login successful.
    - expect: The previous Invalid credentials response is no longer displayed.
