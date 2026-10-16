# Conditional Validation Test Plan

## Application Overview

Test challenge 7, Conditional Validation, on the WebDriver University AI Testing Playground. Each scenario starts from a fresh page with the verification-code field hidden. A blank or malformed email is rejected without revealing the code field. Submitting a valid email reveals a required six-digit verification code and the message “Verification required. Please enter the code.” A valid six-digit numeric code succeeds, displays “Submitted successfully.”, clears both fields, and hides the code field. Editing the email after verification is revealed clears the code and restarts the verification requirement. The observed challenge always reveals verification after the first valid-email submission; it does not condition the reveal on a particular email domain. Use accessible, user-facing locators, retrying assertions, and no fixed sleeps.

## Test Scenarios

### 1. Conditional Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Invalid Email Prevents Verification Prompt

**File:** `tests/ai_playground/conditional_validation/tests/verify-invalid-email-prevents-verification-prompt.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the Conditional Validation challenge. Leave the Email field empty and activate its Submit button.
    - expect: “Valid email required” is visible.
    - expect: The Verification code field remains hidden.
    - expect: No success or verification-required message is displayed.
  2. Enter a malformed email such as “not-an-email” and activate Submit again.
    - expect: “Valid email required” remains visible.
    - expect: The Verification code field remains hidden.
    - expect: The form does not display “Submitted successfully.”

#### 1.2. Verify Valid Email Reveals Required Verification Code

**File:** `tests/ai_playground/conditional_validation/tests/verify-valid-email-reveals-verification-code.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the Conditional Validation challenge.
    - expect: The Email field and Submit button are visible.
    - expect: The Verification code field is initially hidden.
  2. Enter “qa@example.com” as the email and activate Submit once.
    - expect: The Verification code field becomes visible.
    - expect: The form displays “Verification required. Please enter the code.”
    - expect: No success message is displayed.

#### 1.3. Verify Missing And Invalid Verification Codes Are Rejected

**File:** `tests/ai_playground/conditional_validation/tests/verify-invalid-verification-code-is-rejected.test.ts`

**Steps:**
  1. Open the playground in a fresh page, enter “qa@example.com” in Email, and activate Submit once to reveal verification.
    - expect: The Verification code field is visible.
    - expect: The form displays “Verification required. Please enter the code.”
  2. Leave Verification code empty and activate Submit.
    - expect: “Valid 6-digit code required” is visible.
    - expect: The Verification code field remains visible.
    - expect: The form does not display “Submitted successfully.”
  3. Enter a five-digit value such as “12345” and activate Submit.
    - expect: “Valid 6-digit code required” remains visible.
    - expect: The form remains in the verification-required state.
  4. Enter a six-character value containing a non-digit, such as “12a456”, and activate Submit.
    - expect: “Valid 6-digit code required” is visible.
    - expect: The form does not display “Submitted successfully.”

#### 1.4. Verify Successful Verification Clears The Form

**File:** `tests/ai_playground/conditional_validation/tests/verify-successful-verification-clears-form.test.ts`

**Steps:**
  1. Open the playground in a fresh page, enter “qa@example.com” in Email, and activate Submit once.
    - expect: The Verification code field is visible and required.
  2. Enter the six-digit code “123456” and activate Submit.
    - expect: The form displays “Submitted successfully.”
    - expect: The Verification code field is hidden.
    - expect: The Email and Verification code fields are empty.

#### 1.5. Verify Editing Email Resets Verification Requirement

**File:** `tests/ai_playground/conditional_validation/tests/verify-editing-email-resets-verification.test.ts`

**Steps:**
  1. Open the playground in a fresh page, enter “qa@example.com” in Email, and activate Submit once to reveal verification.
    - expect: The Verification code field is visible.
    - expect: The form displays “Verification required. Please enter the code.”
  2. Enter “12345” in Verification code, activate Submit to trigger code validation, then change Email to “new.qa@example.com”.
    - expect: The Verification code field becomes hidden.
    - expect: The Verification code field is cleared.
    - expect: The prior verification prompt and code validation error are cleared.
  3. Activate Submit using the changed valid email.
    - expect: The Verification code field becomes visible again.
    - expect: The form displays “Verification required. Please enter the code.”
    - expect: The form does not display “Submitted successfully.”
