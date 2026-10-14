# Shadow DOM Book Search Test Plan

## Application Overview

The Shadow DOM page provides a book-search experience. Users can enter a search term, submit it, and see the matching book count and book cards update on the page. These scenarios cover a matching search and a no-match search so that both the result content and empty-result count are verified.

## Test Scenarios

Run each scenario independently from a fresh execution of the seed test.

### 1. Book Search

**Seed:** `tests/shadow-dom-seed.spec.ts`

#### 1.1. search-python-book

**File:** `tests/shadow_dom/search-python-book.spec.ts`

**Steps:**
  1. Start from the Shadow DOM page with no search term entered.
    - expect: The page shows a search field labeled `Search books...` and a `Search` button.
  2. Type `Python` into the search field.
    - expect: The search field visibly contains `Python`.
  3. Activate the `Search` button.
    - expect: The page displays `Total books: 1`.
    - expect: Exactly one book result is displayed.
    - expect: That result is titled `Python Programming For Beginners`.

#### 1.2. search-no-such-book

**File:** `tests/shadow_dom/search-no-match.spec.ts`

**Steps:**
  1. Start from the Shadow DOM page with no search term entered.
    - expect: The page shows a search field labeled `Search books...` and a `Search` button.
  2. Type `no-such-book-xyz` into the search field.
    - expect: The search field visibly contains `no-such-book-xyz`.
  3. Activate the `Search` button.
    - expect: The page displays `Total books: 0`.
    - expect: No book result card is displayed.
