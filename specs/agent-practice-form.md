# Practice Form Required-Choice Validation Test Plan

## Application Overview

Test the Rex Jones II Practice Form at https://ui.rexjones2.com/practice-form. The plan targets the combined required-field validation when valid First name and Last name values are entered while Gender and Programming language remain unselected. Supporting context: test-artifacts/RQ-790-practice-form.feature, especially Scenario-004 (Gender required) and Scenario-005 (Programming Language required). Live exploration confirmed the exact messages appear together, the entered names remain in the form, and submission does not proceed.

## Test Scenarios

### 1. Practice Form Required-Choice Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Reject valid names when Gender and Programming language are both unselected

**File:** `tests/practice_form/agent-practice-form-required-choices.test.ts`

**Steps:**
  1. Start from a fresh browser session with no authenticated user and no previously populated form state.
    - expect: The application begins in a logged-out state.
  2. Navigate to https://ui.rexjones2.com/login. Enter username "Success" and password "Success3400", then click Login.
    - expect: Login succeeds and the application opens the signed-in homepage.
  3. Open the Practice Form link from the homepage.
    - expect: The Practice Form is displayed at /practice-form with blank fields.
  4. Verify the Gender radio options (Male, Female, Other) are all unselected and all Programming language checkboxes (Java, Python, JavaScript, TypeScript, C#) are unchecked. Leave these controls unchanged. Leave all optional fields empty.
    - expect: No Gender option is selected.
    - expect: No Programming language option is checked.
    - expect: The form has no pre-existing validation messages.
  5. Enter "Jane" in First name and "Doe" in Last name.
    - expect: First name contains "Jane" and Last name contains "Doe".
  6. Click Submit without selecting a Gender or checking a Programming language.
    - expect: The exact validation message "Gender is a required field" is displayed in the Gender section.
    - expect: The exact validation message "Programming Language is a required field" is displayed in the Programming language section.
    - expect: Both validation messages are visible in the same submission attempt.
    - expect: The First name and Last name values remain "Jane" and "Doe".
    - expect: No success confirmation or submission dialog is displayed, and the form remains available for correction.
  7. Evaluate the result against the success and failure criteria.
    - expect: Pass only if both exact messages appear together, the entered names are retained, and submission is blocked without a success confirmation.
    - expect: Fail if either message is missing, altered, or not visible; if the form submits or displays a success confirmation; or if either name value is lost.
