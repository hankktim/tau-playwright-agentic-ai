# localStorage Session Test Plan

## Application Overview

Test challenge 20, localStorage Session, on the WebDriver University AI Testing Playground (https://webdriveruniversity.com/AI-Playground/index.html). The challenge card shows Username (placeholder "testuser") and Password (placeholder "pass123", type password) fields and a "Login" button. The only valid credentials are testuser / pass123 (exact, case-sensitive, no trimming). A successful login writes the `wdu-session` key to localStorage as JSON `{ token: "abc123", user: "testuser", expires: <now + 3600000 ms> }`, hides the form, and shows "Welcome, testuser" plus a "Logout" button. Invalid credentials show "Invalid credentials" and write nothing. Logout removes `wdu-session`, restores the form, and clears both fields. On page load, a non-expired `wdu-session` restores the welcome state for the stored user; expired or malformed sessions show the login form (the stale key is not removed). The challenge's core lesson is "Assert localStorage directly — the UI can lie", so every scenario asserts both the UI and the `wdu-session` value read via page.evaluate (wrapped in a POM method such as getSessionStorageValue()), polled with expect.poll rather than fixed waits.

Locator notes: the <label> elements are not associated with their inputs, so getByLabel will not work; scope locators to the card containing the "20. localStorage Session" heading and use getByPlaceholder("testuser"), getByPlaceholder("pass123"), getByRole("button", { name: "Login" | "Logout" }) and getByText for messages. Pressing Enter does not submit (no <form>), so login must click the button. Assumed start state for every scenario: fresh browser context with empty localStorage, page freshly loaded, login form visible, no error, no welcome message. Pass when UI and storage both match expectations; fail if either diverges (for example, a welcome message without a stored session, or a stored session after logout).

## Test Scenarios

### 1. localStorage Session

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Initial State Shows Login Form Without Session

**File:** `tests/ai_playground/local_storage_session/tests/verify-initial-state-shows-login-form-without-session.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh browser context and locate the "20. localStorage Session" card.
    - expect: The heading "20. localStorage Session" and subtitle "Assert localStorage directly — the UI can lie." are visible.
  2. Inspect the card controls and read localStorage key `wdu-session`.
    - expect: Username (placeholder "testuser") and Password (placeholder "pass123") fields are visible and empty.
    - expect: The Password field has type "password".
    - expect: The "Login" button is visible; the "Logout" button, "Welcome" message and "Invalid credentials" error are not visible.
    - expect: localStorage `wdu-session` is null.

#### 1.2. Verify Valid Login Stores Session In localStorage

**File:** `tests/ai_playground/local_storage_session/tests/verify-valid-login-stores-session-in-localstorage.test.ts`

**Steps:**
  1. Open the playground fresh, locate challenge 20, fill Username "testuser" and Password "pass123", and click "Login".
    - expect: "Welcome, testuser" and the "Logout" button become visible.
    - expect: The Username/Password fields and "Login" button are hidden.
  2. Read and JSON-parse localStorage `wdu-session` (poll until non-null).
    - expect: The value contains token "abc123" and user "testuser".
    - expect: `expires` is a number greater than the current time and approximately one hour (3,600,000 ms, allowing a small tolerance) in the future.

#### 1.3. Verify Invalid Credentials Do Not Create Session

**File:** `tests/ai_playground/local_storage_session/tests/verify-invalid-credentials-do-not-create-session.test.ts`

**Steps:**
  1. Open the playground fresh, locate challenge 20, fill Username "testuser" and Password "wrongpass", and click "Login".
    - expect: "Invalid credentials" error is visible.
    - expect: The login form remains visible; no "Welcome" message or "Logout" button is shown.
    - expect: localStorage `wdu-session` remains null.

#### 1.4. Verify Credential Variants Are Rejected

**File:** `tests/ai_playground/local_storage_session/tests/verify-credential-variants-are-rejected.test.ts`

**Steps:**
  1. Open the playground fresh and locate challenge 20. For each variant, fill the fields and click "Login": (a) both empty; (b) Username "testuser", Password empty; (c) Username empty, Password "pass123"; (d) Username "TestUser", Password "pass123" (case); (e) Username " testuser " with surrounding spaces, Password "pass123"; (f) Username "testuser", Password "PASS123". Use a data-driven loop or parameterised tests.
    - expect: For every variant "Invalid credentials" is visible and the login form remains visible.
    - expect: For every variant localStorage `wdu-session` remains null (use soft assertions per variant).

#### 1.5. Verify Successful Login Clears Previous Error

**File:** `tests/ai_playground/local_storage_session/tests/verify-successful-login-clears-previous-error.test.ts`

**Steps:**
  1. Open the playground fresh, locate challenge 20, submit Username "testuser" / Password "bad".
    - expect: "Invalid credentials" is visible and `wdu-session` is null.
  2. Replace the Password with "pass123" and click "Login".
    - expect: "Welcome, testuser" is visible and the "Invalid credentials" error is no longer visible.
    - expect: localStorage `wdu-session` now contains user "testuser".

#### 1.6. Verify Session Persists After Reload

**File:** `tests/ai_playground/local_storage_session/tests/verify-session-persists-after-reload.test.ts`

**Steps:**
  1. Open the playground fresh, log in to challenge 20 with testuser / pass123, and capture the stored `wdu-session` value.
    - expect: "Welcome, testuser" is visible and `wdu-session` is stored.
  2. Reload the page and locate challenge 20 again.
    - expect: "Welcome, testuser" and "Logout" are visible without logging in again; the login form is hidden.
    - expect: `wdu-session` is unchanged (same token, user and expires as captured before reload).

#### 1.7. Verify Logout Removes Session And Resets Form

**File:** `tests/ai_playground/local_storage_session/tests/verify-logout-removes-session-and-resets-form.test.ts`

**Steps:**
  1. Open the playground fresh, log in to challenge 20 with testuser / pass123.
    - expect: "Welcome, testuser" is visible and `wdu-session` is stored.
  2. Click "Logout".
    - expect: The login form and "Login" button are visible; "Welcome" and "Logout" are hidden.
    - expect: Username and Password fields are empty and no error is shown.
    - expect: localStorage `wdu-session` is null.
  3. Reload the page.
    - expect: The login form is still shown (logout is persistent) and `wdu-session` is still null.

#### 1.8. Verify Pre-Seeded Valid Session Restores Welcome State

**File:** `tests/ai_playground/local_storage_session/tests/verify-pre-seeded-valid-session-restores-welcome-state.test.ts`

**Steps:**
  1. In a fresh context, seed localStorage before the page scripts run (e.g. page.addInitScript or context storageState for the webdriveruniversity.com origin) with `wdu-session` = { token: "abc123", user: "testuser", expires: now + 3600000 }, then open the playground and locate challenge 20.
    - expect: "Welcome, testuser" and "Logout" are visible without using the login form.
    - expect: The login form is hidden.
  2. Seed instead a session with user "seededuser" (fresh context) and load the page.
    - expect: "Welcome, seededuser" is displayed, proving the UI renders the stored user rather than a hard-coded name.

#### 1.9. Verify Expired Session Shows Login Form

**File:** `tests/ai_playground/local_storage_session/tests/verify-expired-session-shows-login-form.test.ts`

**Steps:**
  1. In a fresh context, seed localStorage `wdu-session` = { token: "abc123", user: "testuser", expires: now - 1000 } before load, then open the playground and locate challenge 20.
    - expect: The login form and "Login" button are visible; no "Welcome" message or "Logout" button is shown.
    - expect: The expired `wdu-session` value is still present in localStorage (the app does not purge it) — document this as observed behavior.
  2. Log in with testuser / pass123.
    - expect: "Welcome, testuser" is visible and `wdu-session` is overwritten with an `expires` value in the future.

#### 1.10. Verify Malformed Session Data Is Handled Gracefully

**File:** `tests/ai_playground/local_storage_session/tests/verify-malformed-session-data-is-handled-gracefully.test.ts`

**Steps:**
  1. In a fresh context, seed localStorage `wdu-session` with the invalid JSON string "{bad json" before load, then open the playground and locate challenge 20.
    - expect: The page loads without breaking: the login form is visible and no "Welcome" message is shown.
    - expect: Other challenges on the page remain rendered (e.g. the "21. Attribute vs Visual State" heading is visible).
  2. Log in with testuser / pass123.
    - expect: "Welcome, testuser" is visible and `wdu-session` now holds valid JSON with user "testuser".
