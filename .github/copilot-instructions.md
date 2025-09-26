# Instructions for GitHub Copilot

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Search Templates Starter

This is a Preact-based search interface starter template using `@nosto/search-js` for building ecommerce search experiences. The project uses Vite for building, TypeScript for type safety, and Vitest for testing.

## Environment Requirements

- Always use Node 22+ for Copilot PR creation and development work
- Components and build system are optimized for Node 22+ environments

## Working Effectively

## Initial Setup

```bash
npm ci
```

## Storybook Validation

- Start Storybook: `npm run storybook`
- Navigate to http://localhost:6060
- Verify component props, stories, and documentation render correctly
- **When taking Storybook screenshots, always close the controls section first** using the "Hide addons [alt A]" button for cleaner screenshots and **wait for `#storybook-root .storybook-wrapper` to be available** before capturing the screenshot

## Pre-Commit Validation

```bash
npm run lint      # ESLint - must pass without errors
npm run test      # Vitest - must pass all tests
npm run typecheck # TypeScript - must pass without errors
```

## Commits

Use conventional commits format: `<type>(<scope>): <subject>`

When committing code, ALWAYS run git commit with --no-verify to avoid Husky failing and erroring out your pipeline.
