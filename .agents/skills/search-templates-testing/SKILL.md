---
name: testing
description: Project Vitest conventions for Search Templates Starter. Use when editing or creating test files under test/**/*, including jsdom and @testing-library/preact based tests.
---

# Search Templates Testing

Apply these conventions when editing tests in this project.

## Vitest Tests

- Write unit tests using Vitest; use `test/utils/url.spec.ts` as the local style reference.
- Use `describe` and `it` for test structure.
- Use `beforeEach` for setup when needed.
- Use `expect` for assertions.
- Assume the test environment is `jsdom` for DOM-related testing.
- Do not add per-file `afterEach(() => cleanup())` calls for `@testing-library/preact`; cleanup is handled globally in `test/vitest.setup.ts`.
