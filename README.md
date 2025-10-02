# Search Templates Starter

This project is a starter template for building search interfaces using [`@nosto/search-js`](https://www.npmjs.com/package/@nosto/search-js) and [`preact`](https://preactjs.com/). It provides a foundation to kickstart development with pre-configured components, styles, and utilities for creating search experiences.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v22 or higher)
- npm

### Installation

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

### Development

If you would like to see the entire app in action in a mostly representative environment, you can use the Vite dev server:
```sh
VITE_MERCHANT_ID=shopify-99999999 npm run dev
```

Alternatively, you may supply the merchant ID with a .env file.

This will launch the application at http://localhost:8000.

### Storybook

If you are working on a scoped component, would like to test something or want to see the list of components available,
you can use Storybook:
```sh
npm run storybook
```

No merchant ID is required as the components in Storybook are sandboxed.

### Build

To build the project for production:
```sh
npm run build
```

### Resources
- [Search-js docs](https://docs.nosto.com/techdocs/apis/frontend/oss/search-js)
- [Nosto-js docs](https://docs.nosto.com/techdocs/apis/frontend/oss/nosto-js)