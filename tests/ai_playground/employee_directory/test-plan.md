# Employee Directory Test Plan

## Application Overview

Exercise challenge 12, Employee Directory, embedded on https://webdriveruniversity.com/AI-Playground/index.html. Each scenario assumes a fresh browser context and independently opens the playground. Verify the 15-row baseline and exact employee values, department filtering with case and whitespace handling, ascending/descending numeric salary sorting, and recovery from a no-match filter. No authentication or data setup is required.

## Test Scenarios

### 1. Employee Directory

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Initial Directory Data And Employee Values

**File:** `tests/ai_playground/employee_directory/tests/employee-directory-initial-state.test.ts`

**Steps:**
  1. Start in a fresh browser context and navigate directly to https://webdriveruniversity.com/AI-Playground/index.html.
    - expect: The AI Testing Playground loads successfully without authentication.
  2. Locate challenge 12, Employee Directory, and inspect the table headers and employee rows.
    - expect: The Employee Directory heading and Name, Department, Salary, Status, and Start Date columns are visible.
    - expect: Exactly 15 employee records are displayed.
  3. Check Sarah Mitchell's complete row.
    - expect: Her values are Sarah Mitchell, Engineering, £45,000, active, and 2019-03-15 in the corresponding columns.
  4. Evaluate the baseline scenario.
    - expect: Pass when all five columns and all 15 rows are present and Sarah's exact values match.
    - expect: Fail if the table is missing, any row is absent, or any verified field differs.

#### 1.2. Verify Department Filtering And Salary Sort Directions

**File:** `tests/ai_playground/employee_directory/tests/employee-directory-filter-and-sort.test.ts`

**Steps:**
  1. Start in a fresh browser context, open the playground, and locate the Employee Directory filter.
    - expect: The filter is initially empty and all 15 rows are displayed.
  2. Enter ` eNgInEeRiNg ` with mixed capitalization into the filter.
    - expect: Filtering is case-insensitive and trims surrounding whitespace.
    - expect: Exactly the five Engineering employees remain, in source order, with exact employee names, departments, salary, status, and start date values.
  3. Click the Salary column header once.
    - expect: The five Engineering employees are sorted numerically by salary ascending: Sarah Mitchell (£45,000), Raj Patel (£47,000), Priya Sharma (£51,000), Sofia Reyes (£53,000), Daniel Wright (£55,000).
    - expect: The Salary header indicates ascending order.
  4. Click the Salary column header a second time.
    - expect: The same five exact employee rows appear in reverse numeric salary order.
    - expect: The Salary header indicates descending order.
  5. Evaluate the scenario.
    - expect: Pass when filtering does not lose or add records and salary sorting is numeric and toggles direction.
    - expect: Fail if values are lexicographically sorted, rows do not match Engineering, or sort state/order is incorrect.

#### 1.3. Verify No-Match Filter And Directory Recovery

**File:** `tests/ai_playground/employee_directory/tests/employee-directory-empty-filter-recovery.test.ts`

**Steps:**
  1. Start in a fresh browser context and open the playground.
    - expect: The Employee Directory displays all 15 employees.
  2. Enter a search term that is not present in any employee record.
    - expect: No employee rows are displayed; no unrelated challenge content is mistaken for directory results.
  3. Clear the filter.
    - expect: All 15 employee rows return and the filter is empty.
    - expect: The directory remains on the playground without a navigation or runtime error.
  4. Evaluate the scenario.
    - expect: Pass when an unmatched query produces zero records and clearing it restores the full baseline.
    - expect: Fail if stale results remain, rows fail to recover, or the page navigates away.
