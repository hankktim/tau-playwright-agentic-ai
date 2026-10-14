# Dynamic Properties Page Test Plan

## Application Overview

Test the public Rex Jones II Dynamic Properties page at https://ui.rexjones2.com/dynamic-properties. No authentication is required; every test begins from a fresh browser page and navigates directly to the route. Coverage includes the random-ID text, the five-second enable/color/visibility transitions, reload behavior, and the page-level Previous/Next links. Live exploration confirmed Previous opens /select-menu and Next opens /progress-bar. It also exposed current mismatches against the advertised behavior: the enable button was enabled on the fresh-page check, Color Change was already rgb(255, 0, 0), Visible after 5 seconds was already visible, and the random-ID paragraph had no DOM id. The scenarios below use the page's labeled dynamic behavior as acceptance criteria so those defects are reproducible.

## Test Scenarios

### 1. Dynamic Properties Functional Coverage

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify initial page content and dynamic-property baseline

**File:** `tests/dynamic_properties/dynamic-properties-initial-state.test.ts`

**Steps:**
  1. Start with a fresh browser context and navigate directly to https://ui.rexjones2.com/dynamic-properties.
    - expect: The page loads without requiring login and the URL is /dynamic-properties.
  2. Within one second of the page becoming ready, verify the page heading, the text "This text has random Id", and the three buttons labeled "Will enable in 5 seconds", "Color Change", and "Visible after 5 seconds".
    - expect: Each expected page element is present exactly once.
  3. Before the five-second delay has elapsed, inspect each dynamic control's state.
    - expect: "Will enable in 5 seconds" is disabled.
    - expect: "Color Change" has not yet changed to red.
    - expect: "Visible after 5 seconds" is not visible.
  4. Verify the page-level Previous and Next links, distinguishing them from the similarly named sidebar links.
    - expect: Previous points to /select-menu and Next points to /progress-bar.
  5. Evaluate the scenario against its success criteria.
    - expect: Pass only if the route and all expected content are present and the three controls are still in their pre-delay states.
    - expect: Fail if a delayed state appears early, a control is missing or duplicated, or the page redirects to authentication.

#### 1.2. Verify the enable button changes state only after five seconds

**File:** `tests/dynamic_properties/dynamic-properties-enable-button.test.ts`

**Steps:**
  1. Start from a fresh browser context, navigate directly to /dynamic-properties, and start timing when the page becomes ready.
    - expect: The Dynamic Properties page is displayed.
  2. Check the "Will enable in 5 seconds" button within the first second; attempt mouse and keyboard activation while it is still in the pre-delay state.
    - expect: The button is disabled and cannot be activated by mouse or keyboard before the delay.
    - expect: The page does not navigate and no activation result appears.
  3. Wait until at least five seconds have elapsed since the page became ready, allowing a small scheduling tolerance.
    - expect: The same button becomes enabled without a page reload.
    - expect: Its label remains "Will enable in 5 seconds".
  4. Click the enabled button once.
    - expect: The button accepts the click and remains enabled.
    - expect: The page stays on /dynamic-properties and no error or unrelated content change occurs.
  5. Evaluate the scenario against its success criteria.
    - expect: Pass only if activation is blocked before the delay and allowed after it.
    - expect: Fail if it is clickable early, never becomes enabled, or requires a reload.

#### 1.3. Verify the Color Change button changes color after five seconds

**File:** `tests/dynamic_properties/dynamic-properties-color-change.test.ts`

**Steps:**
  1. Start from a fresh browser context, navigate directly to /dynamic-properties, and inspect the "Color Change" button before five seconds have elapsed.
    - expect: The button is visible with its original non-red text color.
  2. Wait until at least five seconds have elapsed since the page became ready.
    - expect: The button's text color changes to red (computed color rgb(255, 0, 0)).
  3. Verify the button label and page route after the color transition.
    - expect: The label remains "Color Change" and the URL remains /dynamic-properties.
  4. Evaluate the scenario against its success criteria.
    - expect: Pass only if the color changes from non-red to red after the delay.
    - expect: Fail if it is red before the delay, does not become red, or changes only after user interaction.

#### 1.4. Verify the delayed button is hidden until five seconds

**File:** `tests/dynamic_properties/dynamic-properties-delayed-visibility.test.ts`

**Steps:**
  1. Start from a fresh browser context, navigate directly to /dynamic-properties, and inspect "Visible after 5 seconds" within the first second.
    - expect: The control is absent from the visible interface or has a hidden state that prevents interaction.
  2. Wait until at least five seconds have elapsed since the page became ready.
    - expect: Exactly one "Visible after 5 seconds" button becomes visible and can receive focus.
    - expect: The page does not reload or navigate when the button appears.
  3. Wait an additional two seconds after the transition.
    - expect: The button remains visible and is not duplicated.
  4. Evaluate the scenario against its success criteria.
    - expect: Pass only if the button is unavailable before the delay and appears once afterward.
    - expect: Fail if it is visible or actionable early, never appears, or appears more than once.

#### 1.5. Verify the random ID is unique and changes after reload

**File:** `tests/dynamic_properties/dynamic-properties-random-id.test.ts`

**Steps:**
  1. Start from a fresh browser context and navigate directly to /dynamic-properties.
    - expect: The exact text "This text has random Id" is visible.
  2. Inspect the DOM id attribute of the element containing that exact text.
    - expect: The element has a non-empty generated id, and no other element on the page has the same id.
  3. Record the generated id, reload the page, and inspect the same text element again.
    - expect: The text remains visible and its new id is non-empty and unique within the page.
    - expect: The generated id differs from the value recorded before reload.
  4. Evaluate the scenario against its success criteria.
    - expect: Pass only if a usable unique id is present on each page load and changes after reload.
    - expect: Fail if the id is missing, duplicated, empty, or unchanged after the fresh load.

#### 1.6. Verify reload resets the timed properties

**File:** `tests/dynamic_properties/dynamic-properties-reload-reset.test.ts`

**Steps:**
  1. Start from a fresh browser context and navigate directly to /dynamic-properties.
    - expect: The page displays its pre-delay state.
  2. Wait until at least five seconds have elapsed and confirm the enable button is enabled, the color is red, and the delayed button is visible.
    - expect: All three post-delay states are present together.
  3. Reload the page and inspect it within the first second after it becomes ready.
    - expect: The timer starts over for the new page load.
    - expect: The enable button is disabled, the color is back to its original non-red state, and the delayed button is hidden.
  4. Wait through the five-second delay once more.
    - expect: The same three transitions occur again without stale state or duplicate controls.
  5. Evaluate the scenario against its success criteria.
    - expect: Pass only if reload restores the pre-delay state and each transition occurs again once.
    - expect: Fail if any post-delay state leaks across reload or a transition cannot be repeated.

#### 1.7. Verify Previous and Next page navigation

**File:** `tests/dynamic_properties/dynamic-properties-adjacent-navigation.test.ts`

**Steps:**
  1. Start from a fresh browser context and navigate directly to /dynamic-properties.
    - expect: The Dynamic Properties page is displayed.
  2. Click the page-level Previous link, not the sidebar link labeled Select Menu.
    - expect: The browser navigates to /select-menu and displays that page.
  3. Navigate directly to /dynamic-properties again to start the second half from a clean route.
    - expect: The Dynamic Properties page is displayed at /dynamic-properties.
  4. Click the page-level Next link, not the sidebar link labeled Progress Bar.
    - expect: The browser navigates to /progress-bar and displays that page.
  5. Evaluate the scenario against its success criteria.
    - expect: Pass only if both page-level links reach their corresponding adjacent pages.
    - expect: Fail if either link targets the wrong route or the page-level controls cannot be distinguished from the sidebar links.
