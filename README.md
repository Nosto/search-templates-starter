# Search Templates Starter

This project is a starter template for building search interfaces using [`@nosto/search-js`](https://www.npmjs.com/package/@nosto/search-js) and [`preact`](https://preactjs.com/). It provides a foundation to kickstart development with pre-configured components, styles, and utilities for creating search experiences.

## Features

- **Preact Integration**: Lightweight and fast rendering with Preact.
- **Search-js**: Leverage `@nosto/search-js` for search functionality and hooks
- **Modular Components**: Prebuilt components like `Search`, `Serp`, `Autocomplete`, and more.
- **CSS Modules**: Scoped and maintainable styles.

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
3. If using VSCode, ensure you're using the workspace TS version:

    This helps prevent issues with CSS module type definitions.
    [Using the workspace version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)

### Development

Start the development server:
```sh
npm run dev
```

This will launch the application at http://localhost:8000.

### Build
To build the project for production:
```sh
npm run build
```

### Resources
- [Search-js docs](https://docs.nosto.com/techdocs/apis/frontend/oss/search-js)
- [Nosto-js docs](https://docs.nosto.com/techdocs/apis/frontend/oss/nosto-js)