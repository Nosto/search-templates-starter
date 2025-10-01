# E2E Test Stabilization

This document outlines the improvements made to stabilize the flaky end-to-end tests.

## Issues Addressed

### 1. Timing and Race Conditions
- **Problem**: Tests were using short timeouts (1000ms) and not waiting for async operations
- **Solution**: 
  - Increased timeouts to 5-10 seconds for critical operations
  - Added proper `waitForLoadState('networkidle')` calls
  - Implemented debounce-aware input typing

### 2. Weak Selectors and Element Stability
- **Problem**: Tests used brittle selectors and didn't wait for elements to be stable
- **Solution**:
  - Added `waitForStableElement()` helper to ensure elements are visible and not moving
  - Improved pagination selector to be more robust
  - Added visibility and enable checks before clicking elements

### 3. Network and DOM Stability
- **Problem**: Tests didn't wait for network requests or DOM to stabilize
- **Solution**:
  - Added `waitForPageReady()` helper that waits for both DOM and network
  - Implemented `waitForSearchResults()` for consistent result loading
  - Added small stabilization delays after content loads

### 4. Configuration Issues
- **Problem**: Playwright config had insufficient timeouts and retry settings
- **Solution**:
  - Increased action timeout to 10s and navigation timeout to 30s
  - Added retries even for local development (1 retry)
  - Enabled screenshots and videos on failure for debugging
  - Increased web server startup timeout to 2 minutes

## Test Utilities

The `helpers/testUtils.ts` file provides reusable functions for common patterns:

- `waitForPageReady(page)` - Wait for full page load including network
- `waitForStableElement(locator)` - Wait for element to be visible and stable
- `typeWithDebounce(locator, text, debounceMs)` - Type with debounce consideration
- `waitForSearchResults(page, selector, expectedContent)` - Wait for search results
- `navigateAndWait(page, url)` - Navigate and wait for page readiness

## Best Practices

1. **Always wait for page readiness** after navigation
2. **Use longer timeouts** for network-dependent operations (5-10s)
3. **Wait for element stability** before interactions
4. **Consider debounce delays** when testing search inputs
5. **Use robust selectors** that are less likely to break
6. **Add small stabilization delays** after major DOM changes

## Running Tests

The improved tests should now run more reliably:

```bash
npm run test:e2e        # Run all e2e tests
npm run test:e2e:ui     # Run with Playwright UI for debugging
```

## Debugging

If tests still fail:
1. Check the HTML report in `playwright-report/`
2. Review screenshots in `test-results/`
3. Watch video recordings of failures
4. Use trace files with `npx playwright show-trace <trace-file>`