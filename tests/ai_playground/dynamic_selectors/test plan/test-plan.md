# AI Testing Playground - Dynamic Selectors Test Plan

## Application Overview

Test the WebDriver University AI Testing Playground's Dynamic Selectors challenge at https://webdriveruniversity.com/AI-Playground/index.html. The login form regenerates CSS classes on page loads. Use stable user-facing placeholders for inputs and scope the Login button by the challenge's data-testid and accessible role. A fresh state has blank username/password fields and no result message. Empty or whitespace-only values show 'Invalid credentials'; any nonblank username and password show 'Login successful'.

## Test Scenarios

### 1. Dynamic Selectors

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Login Remains Usable After Generated Classes Change

**File:** `tests/ai_playground/dynamic_selectors/verify-login-after-class-regeneration.test.ts`

**Steps:**
  1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and locate the Dynamic Selectors login card.
    - expect: The Username and Password fields are empty.
    - expect: The Dynamic Selectors card and its Login button are visible.
    - expect: Do not depend on or hardcode generated CSS class values.
  2. Reload the page to generate a fresh set of classes, then locate the Username and Password fields by their placeholders and the Login button by its accessible name scoped to the dynamic-login-card test id.
    - expect: The form is reset and its controls remain locatable even though generated class values have changed.
  3. Fill Username with 'automation-user' and Password with 'challenge-pass', then click the card-scoped Login button.
    - expect: The 'Login successful' message becomes visible.
    - expect: No selector depends on a generated class.

#### 1.2. Verify Empty Credentials Are Rejected

**File:** `tests/ai_playground/dynamic_selectors/verify-empty-credentials-are-rejected.test.ts`

**Steps:**
  1. Open the challenge in a fresh page and leave both fields blank.
    - expect: The Username and Password fields are empty and no login result message is visible.
  2. Click the Login button scoped to the Dynamic Selectors card.
    - expect: The 'Invalid credentials' message becomes visible.
    - expect: The 'Login successful' message remains hidden.

#### 1.3. Verify Whitespace-Only Credentials Are Rejected

**File:** `tests/ai_playground/dynamic_selectors/verify-whitespace-credentials-are-rejected.test.ts`

**Steps:**
  1. Open the challenge in a fresh page and fill both fields with whitespace characters only.
    - expect: Both fields contain whitespace only and no result message is visible before submission.
  2. Click the Login button scoped to the Dynamic Selectors card.
    - expect: The values are treated as empty after trimming and 'Invalid credentials' becomes visible.
    - expect: The 'Login successful' message remains hidden.

#### 1.4. Verify Nonblank Credentials Show Success

**File:** `tests/ai_playground/dynamic_selectors/verify-nonblank-credentials-show-success.test.ts`

**Steps:**
  1. Open the challenge in a fresh page and fill Username with 'automation-user' and Password with 'challenge-pass'.
    - expect: Both fields contain nonblank values and no result message is visible before submission.
  2. Click the Login button scoped to the Dynamic Selectors card.
    - expect: The 'Login successful' message becomes visible.
    - expect: The 'Invalid credentials' message remains hidden.

#### 1.5. Verify Successful Login Clears Previous Error

**File:** `tests/ai_playground/dynamic_selectors/verify-success-clears-previous-error.test.ts`

**Steps:**
  1. Open the challenge in a fresh page and submit with both fields empty.
    - expect: The 'Invalid credentials' message becomes visible.
  2. Fill Username with 'automation-user' and Password with 'challenge-pass', then submit using the card-scoped Login button.
    - expect: The 'Login successful' message becomes visible.
    - expect: The previous 'Invalid credentials' message is hidden.
