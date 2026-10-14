# Playwright CLI Practice: Shadow DOM

This walkthrough practices the `playwright-cli` skill in `.claude/skills/playwright-cli/`, using the Shadow DOM demo page. It follows the skill's plan, generate, and heal workflow. It does not use the VS Code `playwright-test-*` agents, the Playwright MCP server, or SpiraPlan.

## Before You Start

1. Run this from Claude Code with this repository open, so the `playwright-cli` skill is available. Ensure the project dependencies and Chromium are installed:

   ```powershell
   npm install
   npx playwright install chromium
   ```

2. Create a dedicated seed at `tests/shadow-dom-seed.spec.ts`:

   ```ts
   import { test } from '@playwright/test';

   test('shadow DOM seed', async ({ page }) => {
     await page.goto('https://ui.rexjones2.com/shadow-dom');
   });
   ```

   The existing `tests/seed.spec.ts` is intentionally blank, so this seed gives the CLI session a reliable starting page. The generated tests must navigate to the page themselves; Playwright does not run the seed before each test.

3. Start the seed in a terminal:

   ```powershell
   $env:PLAYWRIGHT_HTML_OPEN = 'never'
   npx playwright test tests/shadow-dom-seed.spec.ts --debug=cli
   ```

   Wait for the `tw-...` session name in the debugging instructions. In another terminal, attach to it and resume the seed:

   ```powershell
   playwright-cli attach tw-XXXX
   playwright-cli resume
   ```

   Keep the seed test running while exploring. After each exercise, close the CLI browser session and stop the seed test with `Ctrl+C` in its terminal. Start a fresh seed session before the next exercise.

## Exercise 1: Explore the Shadow Roots

Use `playwright-cli` commands and refs from its snapshots to inspect the page:

```text
playwright-cli snapshot
playwright-cli find "Search books..."
```

Fill the search box with `Python`, click the Search button, and take another snapshot. The expected settled state is one result: `Python Programming For Beginners`. If the count says `Loading...`, take another snapshot while the request completes; avoid adding a fixed sleep.

Use `eval` to inspect the component boundary and result count:

```text
playwright-cli eval "document.querySelector('#book-container').shadowRoot.querySelector('p').textContent"
playwright-cli eval "document.querySelector('#book-container').shadowRoot.querySelector('#book-0').shadowRoot.querySelector('.book-title').textContent"
```

The first expression reads inside the container's open shadow root; the second traverses into a book card's own shadow root. Then search for `no-such-book-xyz` and confirm the settled result count is zero. Notice which useful information is visible in the accessibility snapshot and which details require `eval`.

## Exercise 2: Plan and Generate Tests

Ask Claude Code to use the `playwright-cli` skill to explore through the seed session and save a test plan at `specs/shadow-dom.plan.md`:

> Use the playwright-cli skill and the tests/shadow-dom-seed.spec.ts seed. Explore the Shadow DOM page through the paused seed test, attaching with playwright-cli as the skill describes; do not open the page in a separate browser session. Create independent scenarios for searching `Python` and finding exactly `Python Programming For Beginners` with a count of one, and for searching `no-such-book-xyz` and getting a count of zero. Include user-level steps and observable expected outcomes. Save the plan to specs/shadow-dom.plan.md.

Review the plan against what you observed in Exercise 1. For each scenario, ask Claude Code to generate one test at these paths:

- `tests/shadow_dom/search-python-book.spec.ts`
- `tests/shadow_dom/search-no-match.spec.ts`

Use the matching scenario from the plan and the seed file. Each generated test should be independently runnable, navigate to `https://ui.rexjones2.com/shadow-dom`, perform the search, and assert the settled result count and visible book title or zero-result state. The skill generates interaction code, but you still need to review it and make sure every planned expectation has an assertion. Run each test separately:

```powershell
$env:PLAYWRIGHT_HTML_OPEN = 'never'
npx playwright test tests/shadow_dom/search-python-book.spec.ts
npx playwright test tests/shadow_dom/search-no-match.spec.ts
```

## Exercise 3: Heal a Deliberate Assertion Failure

In `tests/shadow_dom/search-python-book.spec.ts`, deliberately change the expected title from `Python Programming For Beginners` to `Python Programming For Experts`. Run just that test and confirm it fails:

```powershell
npx playwright test tests/shadow_dom/search-python-book.spec.ts
```

Then ask Claude Code:

> Use the playwright-cli skill to heal the deliberate failure in tests/shadow_dom/search-python-book.spec.ts. Work only on this practice test and specs/shadow-dom.plan.md. Reproduce the failure with the test in --debug=cli mode, attach to the paused page, inspect the live result, and correct the assertion to match the observed book title. Stop the debug run and rerun only this test to verify the repair. Do not run the full suite, add a fixed sleep, mark the test fixme, or change unrelated files.

The healed test should pass with the observed title. Update the plan only if its user-visible expected behavior was inaccurate; a corrected assertion alone does not require changing the plan.

## Keep or Clean Up

Keep the generated passing tests as new coverage, or remove the practice plan, seed, and generated test files when finished. If you keep the tests, restore the deliberate assertion change before committing or sharing them.