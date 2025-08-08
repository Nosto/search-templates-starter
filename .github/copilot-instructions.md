# Instructions for GitHub Copilot

## Coding standards

* Use closures over classes
* Utilize type inference in return types, except for functions with multiple return statements
* Use utility types to derive types from constants
* Use const (and let) over var
* Use async/await instead of Promise chaining
* Use individual named exports over bulk exports
* Favor named exports over default exports
* Provide code examples in Typescript.
* Avoid using `any` in TypeScript; prefer specific types or `unknown`.
* Use ES2020 level features and syntax conventions

## Preact conventions

* Favor functional style react components and use the function syntax instead of lambda syntax
* Extract props definitions with more than 2 members

## Testing

* Write unit tests using Vitest
* Use `describe` and `it` for test structure
* Use `beforeEach` for setup
* Use `afterEach` for cleanup
* Use `expect` for assertions