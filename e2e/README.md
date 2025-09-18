# End-to-End Tests

This directory contains Playwright end-to-end tests for the search templates starter application.

## Test Setup

The tests are configured to run against the `dev:mocked` server, which provides consistent mock data for testing.

### Prerequisites

- Node.js v22+ (or v20+)
- Playwright browsers installed (handled automatically on first run)

### Running Tests

```bash
# Run all e2e tests
npm run test:e2e

# Run tests with UI mode for debugging
npm run test:e2e:ui

# Run a specific test file
npx playwright test e2e/autocomplete.spec.ts

# Run tests in headed mode (show browser)
npx playwright test --headed
```

## Test Coverage

### Working Tests ✅

**Autocomplete Functionality** (`autocomplete.spec.ts`):
- Search input accepts text and maintains focus
- Form submission navigates to search results with correct URL parameters
- Special characters are handled properly in search queries

**Search Results** (`results.spec.ts`):
- Page renders search results when navigating with `q` parameter
- Products display with proper information (prices, names)
- Different query lengths work correctly
- 24 mock products are rendered as expected

### Known Limitations ⚠️

**Autocomplete Dropdown** (Tests skipped with documentation):
- The autocomplete dropdown UI is not rendering despite valid mock data
- The `useDebouncedSearch` hook triggers searches, but `useResponse()` doesn't populate the Results component
- This appears to be an integration issue between the AutocompletePageProvider context and the Results component

**Search Input Population** (Tests skipped with documentation):
- Search input field is not populated from URL `q` parameter
- The SearchQueryHandler correctly reads URL parameters and triggers searches
- But the Autocomplete component doesn't sync with the app state query value

**Pagination** (Tests skipped with documentation):
- Pagination controls are not appearing despite mock data returning 240 total results (10x page size)
- The BottomToolbar and Pagination components may not be rendering in the current setup

## Test Architecture

- **Configuration**: `playwright.config.ts` - Runs against `http://localhost:8000` with dev:mocked server
- **Browser**: Uses system Chrome (`channel: 'chrome'`) to avoid browser download issues
- **Timeouts**: Conservative timeouts to account for application initialization
- **Mock Data**: Tests rely on consistent mock data from `mocks/search.ts`

## Debugging

Use the UI mode for interactive debugging:

```bash
npm run test:e2e:ui
```

Or run with traces enabled:

```bash
npx playwright test --trace on
```

## Future Improvements

1. **Fix Autocomplete Integration**: Investigate the AutocompletePageProvider context and useResponse hook to enable dropdown functionality
2. **Implement Input Population**: Add proper sync between URL parameters and search input field
3. **Enable Pagination**: Debug why pagination controls aren't appearing with mock data
4. **Add Visual Testing**: Consider screenshot comparison tests for UI consistency
5. **Performance Testing**: Add tests for search response times and loading states