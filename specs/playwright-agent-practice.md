# Playwright Agent Practice

These exercises let you try the planner, generator, and healer agents included in this repository. They use the public practice form and this repo's Playwright Test MCP server; SpiraPlan is not required.

## Before You Start

1. Open this repository as your VS Code workspace and open Copilot Chat.
2. Install the project dependencies and Chromium if you have not already:

   ```powershell
   npm install
   npx playwright install chromium
   ```

3. In the Copilot Chat agent picker, select one of the repository's `playwright-test-*` agents. If VS Code asks to start the `playwright-test` MCP server from `.vscode/mcp.json`, allow it.
4. The exercises use the demo login already used by the repo tests: username `Success`, password `Success3400`. If those credentials stop working, update the prompts to match the test application's current demo account.

## Exercise 1: Plan Form Validation

**Agent:** `playwright-test-planner`

Ask the planner to explore the live practice form and save a plan containing a scenario for required-field validation. Try this prompt:

> Explore the test application starting at https://ui.rexjones2.com/login. Sign in with the demo credentials Success / Success3400, open Practice Form, and inspect its required-field validation. Create an independent test plan for submitting valid first and last names without selecting Gender or Programming Language. Include the exact validation messages, detailed steps, expected outcomes, and use test-artifacts/RQ-790-practice-form.feature as supporting context. Save the plan to specs/agent-practice-form.md.

**Check your result:** The plan should describe the behavior it actually observed, not assume what the form does. Confirm it names both expected messages and starts each scenario from a fresh form.

## Exercise 2: Generate a Test

**Agent:** `playwright-test-generator`

Use the plan from Exercise 1 and generate a test for its required-field scenario. The seed file is the repo's existing `tests/seed.spec.ts`.

> Generate the required-field validation scenario from specs/agent-practice-form.md. Use tests/seed.spec.ts as the seed. Save one test as tests/agent-practice-form.test.ts. Follow the plan's steps and expected results, use the existing LoginPage and RegistrationPage page objects where they fit, and keep the test limited to this scenario.

When the agent finishes, run the generated test:

```powershell
npx playwright test tests/agent-practice-form.test.ts
```

Review the generated code and compare its assertions with the plan. The form is at `/automation-practice-form`; the existing page object exposes locators for the first and last name fields and their validation errors.

## Exercise 3: Heal a Deliberate Failure

**Agent:** `playwright-test-healer`

First, make a small intentional mistake in the generated test: change one expected validation message to a clearly incorrect value, such as `Gender is not a required field`. Run the test once and confirm that it fails. This keeps the practice failure isolated from the existing test suite.

Then select the healer and ask:

> Run the tests and diagnose the failure in tests/agent-practice-form.test.ts. The failure was deliberately introduced in an expected validation message. Use the live page and test output to identify the actual message, correct only this practice test, and rerun it to verify the fix. Do not mark the test as fixme or change unrelated tests.

**Check your result:** The healer should use the failure output and current page behavior to repair the assertion, then confirm the practice test passes. Keep the resulting test as additional coverage, or delete it and `specs/agent-practice-form.md` when you are done.

## What You Practiced

- The planner explores the application and turns observed behavior into a reusable test plan.
- The generator follows a plan, exercises the browser, and writes a Playwright test using the repo's conventions.
- The healer reproduces a failure, investigates its cause, changes the test, and verifies the repair.

None of these exercises reads or writes ALM data. The optional SpiraPlan integration is separate from the test-agent workflow.