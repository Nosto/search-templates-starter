# Instructions for GitHub Copilot

**ALWAYS** reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Bootstrap and Setup

**Prerequisites**: Node.js v22 or higher must be installed.

## Pre-Commit Validation

```bash
npm run lint      # ESLint - must pass without errors
npm run test      # Vitest - must pass all tests
npm run typecheck # TypeScript - must pass without errors
```

## Committing Code

When committing code, ALWAYS run git commit with `--no-verify` to avoid Husky failing and erroring out your pipeline:
```bash
git commit --no-verify -m "your commit message"
```
- This prevents commitlint and other pre-commit hooks from blocking your commits
- When committing code, ALWAYS use valid conventional commit format.

