# AGENTS.md

This file provides instructions for AI agents working on the Search Templates Starter project, following the [agents.md](https://agents.md) standard.

## Project Overview

Search Templates Starter is a Preact-based search interface starter template for building ecommerce search experiences using `@nosto/search-js`.

**Tech Stack:**
- **Preact**: UI framework for building components
- **TypeScript**: Type-safe development
- **Vite**: Build tool and dev server
- **Vitest**: Unit testing framework
- **Playwright**: End-to-end testing
- **Storybook**: Component development and documentation

## Working Guidance

Reference this file first for project-wide instructions. Use search or shell commands when local files contradict these notes or when you need implementation details from the codebase.

## Validation Commands

Before committing code, ensure all validation checks pass:

```bash
npm run lint      # ESLint - must pass without errors
npm run test      # Vitest - must pass all tests
npm run test:e2e  # Playwright - must pass all end-to-end tests
npm run typecheck # TypeScript - must pass without errors
```

All four checks must pass before code can be merged.

## Commit Guidelines

**Use Conventional Commits format:**
```
<type>(<scope>): <subject>
```

Examples:
- `feat(search): add new filter component`
- `fix(ui): correct spacing in search results`
- `docs(readme): update installation steps`

**Important:** When committing code, **ALWAYS** use `git commit --no-verify` to avoid Husky hooks failing in automated pipelines.

## Storybook Usage

Storybook is used for component development and documentation.

**Running Storybook:**
```bash
npm run storybook
```

This starts Storybook at http://localhost:6060.

**Taking Screenshots:**
1. Navigate to the component story.
2. Close the controls section first using the "Hide addons [alt A]" button for cleaner screenshots.
3. Wait for `#storybook-root .storybook-wrapper` to be available before capturing.
4. Take the screenshot.

## Codex Skills

Project conventions and workflows are documented as project-local Codex skills in `.agents/skills/`:

- **TypeScript/JavaScript** (`**/*.ts`, `**/*.tsx`): `$search-templates-typescript`
- **Testing** (`test/**/*`): `$search-templates-testing`
- **Storybook Stories** (`**/*.stories.tsx`): `$search-templates-storybook`
- **Preact Components** (`**/*.tsx`): `$search-templates-preact`
- **Getting Started / Nosto CLI setup**: `$search-templates-getting-started`

Use the most specific matching skill first when modifying or creating files. For `*.stories.tsx`, use `$search-templates-storybook` as the primary skill; use `$search-templates-preact` for non-story TSX components. Apply `$search-templates-typescript` alongside the more specific skill when general TypeScript guidance is relevant.
