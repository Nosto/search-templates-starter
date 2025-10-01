---
applyTo: "test/**/*"
---

# Testing with Vitest
- Write unit tests using Vitest (see `test/utils/url.spec.ts` as example)
- Use `describe` and `it` for test structure
- Use `beforeEach` for setup, custom cleanup not needed (handled by global setup)
- Use `expect` for assertions
- Test environment is jsdom for DOM-related testing
- **Cleanup is automatic**: `@testing-library/preact` cleanup is handled globally via `test/vitest.setup.ts` - no need for individual `afterEach(() => { cleanup() })` calls in test files
