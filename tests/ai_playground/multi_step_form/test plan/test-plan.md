# Multi-Step Form Test Plan

## Application Overview

Test the Multi-Step Form challenge on https://webdriveruniversity.com/AI-Playground/index.html. Each scenario starts from a fresh page with the form at Step 1 of 3. The observed flow requires a full name containing first and last name plus a valid email on step 1, a country on step 2, and acceptance of the terms on step 3. Phone and comments are optional. Each step displays inline validation and blocks progression when required values are missing or invalid. Back navigation preserves the name, email, and selected country. A successful submission displays “Form submitted successfully.” Tests should use accessible labels, roles, and visible text, wait for state with retrying assertions, and avoid fixed sleeps.

## Test Scenarios

### 1. Multi-Step Form

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Successful Completion Across All Three Steps

**File:** `tests/ai_playground/multi_step_form/tests/verify-successful-three-step-form-submission.test.ts`

**Steps:**
  1. Open https://webdriveruniversity.com/AI-Playground/index.html in a fresh page and locate the Multi-Step Form at Step 1 of 3.
    - expect: The Full name and Email fields and the first Next button are visible.
    - expect: No completion message is visible.
  2. Enter “Alex Rivera” as the full name and “alex.rivera@example.com” as the email, then activate the step 1 Next button.
    - expect: The form advances to Step 2 of 3.
    - expect: The Country selector and optional Phone field are visible.
  3. Select United States, enter a phone number, and activate the step 2 Next button.
    - expect: The form advances to Step 3 of 3.
    - expect: The Comments field, terms checkbox, Back button, and Submit button are visible.
  4. Enter optional comments, accept the terms and conditions, and activate Submit.
    - expect: The form displays “Form submitted successfully.”
    - expect: The completion state is visible and the prior step controls are no longer shown.

#### 1.2. Verify Step 1 Rejects Missing Required Values

**File:** `tests/ai_playground/multi_step_form/tests/verify-step-one-required-field-validation.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the Multi-Step Form at Step 1 of 3.
    - expect: The Full name and Email fields and the first Next button are visible.
  2. Leave both fields empty and activate the step 1 Next button.
    - expect: “Full name required (first and last)” is visible.
    - expect: “Valid email required” is visible.
    - expect: The form remains on Step 1 of 3 and does not show completion.

#### 1.3. Verify Step 1 Rejects A Single-Word Name And Invalid Email

**File:** `tests/ai_playground/multi_step_form/tests/verify-step-one-rejects-invalid-name-and-email.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the Multi-Step Form.
    - expect: The form starts at Step 1 of 3.
  2. Enter “Jane” as the full name and “not-an-email” as the email, then activate the step 1 Next button.
    - expect: “Full name required (first and last)” is visible.
    - expect: “Valid email required” is visible.
    - expect: The form remains on Step 1 of 3.
  3. Replace the values with “Jane Doe” and “jane@example.com”, then activate the step 1 Next button.
    - expect: The form advances to Step 2 of 3.
    - expect: The step 1 validation errors are no longer shown on the active step.

#### 1.4. Verify Country Is Required And Phone Is Optional

**File:** `tests/ai_playground/multi_step_form/tests/verify-step-two-country-required-phone-optional.test.ts`

**Steps:**
  1. Open the playground in a fresh page, enter a valid full name and email, and advance to Step 2 of 3.
    - expect: The Country selector and optional Phone field are visible.
  2. Leave Country unselected and Phone blank, then activate the step 2 Next button.
    - expect: “Country is required” is visible.
    - expect: The form remains on Step 2 of 3.
  3. Select a country, leave Phone blank, and activate the step 2 Next button.
    - expect: The form advances to Step 3 of 3.
    - expect: The blank optional Phone field does not prevent progression.

#### 1.5. Verify Terms Acceptance Is Required Before Submission

**File:** `tests/ai_playground/multi_step_form/tests/verify-step-three-requires-terms-acceptance.test.ts`

**Steps:**
  1. Open the playground in a fresh page and complete steps 1 and 2 with valid required values, stopping at Step 3 of 3.
    - expect: The terms checkbox and Submit button are visible.
  2. Leave the terms checkbox unchecked and activate Submit.
    - expect: “You must accept the terms” is visible.
    - expect: The form does not display “Form submitted successfully.” and remains on Step 3 of 3.
  3. Check the terms checkbox and activate Submit.
    - expect: The form displays “Form submitted successfully.”

#### 1.6. Verify Back Navigation Preserves Earlier Step Values

**File:** `tests/ai_playground/multi_step_form/tests/verify-back-navigation-preserves-form-values.test.ts`

**Steps:**
  1. Open the playground in a fresh page, enter a valid full name and email, and advance to Step 2 of 3.
    - expect: The Country selector and optional Phone field are visible.
  2. Select a country, enter a phone number, advance to Step 3 of 3, then activate the step 3 Back button.
    - expect: The form returns to Step 2 of 3.
    - expect: The selected country and phone number remain populated.
  3. Activate the step 2 Back button.
    - expect: The form returns to Step 1 of 3.
    - expect: The previously entered full name and email remain populated.
