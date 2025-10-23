# Search Templates Starter

This project is a starter template for building Nosto search integrations using [`@nosto/search-js`](https://www.npmjs.com/package/@nosto/search-js) and [`preact`](https://preactjs.com/). It provides a foundation to kickstart development for the Nosto platform with pre-configured components, styles, and utilities for creating search experiences.

> **Note:**
> 
> Launched in Q4 2025, Search Templates Starter is currently in Beta.
> 
> We are actively listening for feedback and bug reports. Do expect bugs.

# About Nosto

If you are unfamiliar with Nosto as a company, you are welcome to visit our homepage at [https://nosto.com/](https://www.nosto.com/).

If you wish to know more about our tech stack, we publish extensive documentation known as the [Techdocs](https://docs.nosto.com/techdocs).

# Getting Started

Search Templates Starter is a template repository, meaning that you're expected to create your own clone or fork of the repository and update it to match your store and style. As the name suggests, it's a starter kit to kickstart your development. You are free to customize every aspect of this template to suit your needs.

> **Note:**
> 
> Nosto is not responsible for any issues introduced during development involving Search Templates Starter. In case you encounter problems, we kindly ask you to ensure the issue in question is reproducible in the default state of this repository, using the latest `main` branch, or with the minimal changes from your side.
> 
> For those cases, feel free to open an issue or contact Nosto support, including reproduction steps if possible.

## Prerequisites

To use the Starter, you must have a Nosto account with access to Search Templates feature enabled. In order to use the CLI, you should also have 2FA enabled on your account, or you should have a private API key for authentication.

Ensure you have the following installed:

- Node.js (v22 or higher)
- npm

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/nosto/search-templates-starter.git
   cd search-templates-starter
   ```
2. Install dependencies:

    ```sh
    npm install
    ```
3. If using VSCode, ensure you're using the workspace TS version. This helps prevent issues with CSS module type definitions:

    [Using the workspace version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)

4. (Optional) Install `@nosto/nosto-cli` globally to enable deployment of the template to your store.

    Read more about Nosto CLI at the [GitHub Page](https://github.com/Nosto/nosto-cli) or on our [TechDocs](https://docs.nosto.com/techdocs/implementing-nosto/implement-search/implement-search-using-code-editor/using-nosto-cli)

## Entry Points

Search Templates Starter may operate in three modes: Injected, Native and Mocked. For a typical store setup, you will be most likely using the Injected mode, as it is designed to integrate with any store page. Native mode is useful if you want to develop your store from the ground up using Search Templates Starter, and Mocked is primarily used for development and storybook.

### Native

In this mode, the Starter behaves like a standard React/Preact app. It creates the component tree and renders it normally into the document body.

> Native mode's entry point is `src/entries/native.tsx`

### Injected

In this mode, the components are rendered into the page using [React Portals](https://react.dev/reference/react-dom/createPortal), targeting the elements you define with CSS selectors in `src/config.tsx`. Note that without correct selectors, the components will not appear in the page at all. After the injection step, the rest of the application behaves nearly the same as it would in native mode.

> Injected mode's entry point is `src/entries/injected.tsx`

## Development

If you would like to see the entire app in action in a mostly representative environment, you can use the Vite dev server:
```sh
VITE_MERCHANT_ID=merchant-id npm run dev
```

This will launch the application at http://localhost:8000.

Alternatively, you may supply the merchant ID with a `.env` file:

```env
VITE_MERCHANT_ID=merchant-id
```

For best development experience, we recommend using the local Vite dev server for most of your development. If you wish to instead see the templates right in your store, see the **Developing Live** section below.

> Note:
> The merchant ID is your Nosto account ID that you can find in Nosto Admin. 
> 
> For example, most Shopify accounts will have an ID that looks like `shopify-12345678`.

### Useful commands

```sh
# Run the app in Native mode
npm run dev:native

# Run tests
npm run test
npm run test:e2e

# Open Playwright in interactive UI mode
npm run test:e2e:ui

# Check the TypeScript types
npm run typecheck

# Run linter
npm run lint
npm run style-lint

# ...with automatic fixing
npm run lint-fix
npm run style-lint-fix
```

### Storybook

If you are working on a scoped component, would like to test something or want to see the list of components available, you can use Storybook:
```sh
npm run storybook
```

No merchant ID is required as the components in Storybook are sandboxed.

## Developing live

Using the Nosto CLI, you may also deploy the template straight to your store in preview mode. Note that any changes you do through Nosto CLI will only be visible with the Debug Toolbar and preview mode enabled. Production deployments are done through the Nosto Admin system.

### Store side setup

Before building and running the template in your store, you need to ensure you have Nosto enabled and available. You may test it simply by adding `?nostodebug=true` query parameter to your site. You should see Nosto Debug Toolbar appear, indicating you are ready to proceed further.

### Preparing the template

At the minimum, you need to configure the CSS selectors in `src/config.tsx` to match your site. To find the correct selectors, you may use your browser's dev tools, or use the element picker from the Debug Toolbar.

> **Note:**
> Misconfigured selectors quietly prevent the components from appearing in the page. In case of issues, this is one of the first things to check. Is the element you are trying to inject into actually present on the page?

For a quick smoke test, you may also add a simple `console.log` statement into `injected.tsx`, as it should execute on your page if loaded successfully.

### Deployment

The CLI tool makes the preview deployments simple. To get started, you may use the following set of commands:

```bash
# Install the CLI tool:
npm i @nosto/nosto-cli -g

# Login to Nosto
# You will see the browser window open with further instructions.
nosto login

# Create a configuration file (assumes you are in the root of your fork of Starter)
nosto setup -m merchant-id

# Run the CLI in dev mode
nosto st dev
```

Now, while the CLI tool is running in the terminal, you should be able to make changes to your template and see the results immediately upon reloading your store page. Note that you need to have Debug Toolbar enabled and Preview mode toggled on to see those changes.

> **Path to production:**
> Production deployments are created from preview deployments in Nosto Admin. After you have uploaded your latest build through the Nosto CLI and validated that it works as expected in preview mode, you may navigate to the Search Templates page and create a new production deployment from there.

### Nosto CLI compatibility

Native compatibility with the Nosto CLI is achieved through the use of `nosto.config.ts` file containing a set of commands that the CLI will invoke as required. The full set of commands is already provided for you in this template and, in most cases, no modifications will be required.

If this file is not present, the CLI will not recognize your repository as a valid starter-based repository. The commands themselves are open for customization or extension as long as they adhere to the expected contract. You can refer to the `nosto.config.ts` file for more detailed description of what is expected.

## Resources
- [Search-js docs](https://docs.nosto.com/techdocs/apis/frontend/oss/search-js)
- [Nosto-js docs](https://docs.nosto.com/techdocs/apis/frontend/oss/nosto-js)

## Starter and the VSCode Web

If you have developed Nosto Search Templates in the past using the VSCode Web editor, you may be wondering about the relationship of those two products. Search Templates Starter will soon become our main recommended way to develop the templates, deprecating the VSCode Web extension.

We will continue to maintain the legacy templates as long as necessary, and we will provide detailed guidance and documentation about the migration and possible upgrade paths in the near future.
