---
name: search-templates-typescript
description: Project TypeScript and JavaScript conventions for Search Templates Starter. Use when editing or creating TypeScript or TSX files matching **/*.ts or **/*.tsx in this Preact, Vite, and @nosto/search-js codebase.
---

# Search Templates TypeScript

Apply these conventions when editing TypeScript or TSX files in this project.

## Conventions

- Use closures over classes.
- Use inferred return types, except for functions with multiple return statements.
- Use utility types to derive types from constants.
- Use `const` and `let`; do not use `var`.
- Prefer `async`/`await` over Promise chaining.
- Use individual named exports over bulk exports.
- Favor named exports over default exports.
- Avoid `any`; prefer specific types or `unknown`.
- Use ES2020 language features and syntax conventions.
- Favor functional array methods such as `map`, `filter`, and `reduce` when they keep the code readable.
- Avoid unnecessary comments; add comments only when explicitly requested or when complex logic needs explanation.
