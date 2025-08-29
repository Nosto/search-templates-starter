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

## Integration Modes

This starter template supports two distinct integration modes, allowing you to choose the approach that best fits your project needs.

### Native Mode

Native mode creates a complete, standalone Preact application that takes full control of the page content. This is ideal for building dedicated search pages or when you want the search interface to be the primary content.

**Characteristics:**
- Replaces the entire page content with a Preact application
- Uses `SearchPageProvider` to manage search state
- Provides a complete search experience with integrated components
- Self-contained with all search logic within the Preact app

**Usage:**
```sh
# Development
npm run dev

# Build for production
npm run build
```

**Entry Point:** `src/entries/native.tsx`

### Injected Mode

Injected mode allows you to enhance existing HTML pages by injecting search functionality into specific elements. This is perfect for adding search capabilities to existing websites without rebuilding the entire page structure.

**Characteristics:**
- Works with existing HTML structure and elements
- Injects search components into predefined CSS selectors
- Provides autocomplete and search results without replacing page content
- Minimal integration footprint for existing websites

**Usage:**
```sh
# Development
npm run dev:injected

# Build for production
npm run build:injected
```

**Entry Point:** `src/entries/injected.tsx`

**Target Elements:**
- `#search` - Search input field
- `#search-form` - Search form container
- `#dropdown` - Autocomplete dropdown container
- `#serp` - Search results container

### Choosing the Right Mode

- **Choose Native Mode** when:
  - Building a dedicated search page
  - You want complete control over the page layout
  - Starting a new search interface from scratch
  - You need a fully integrated search experience

- **Choose Injected Mode** when:
  - Adding search to an existing website
  - You want to preserve existing page structure
  - Implementing search as an enhancement to current pages
  - You need minimal integration impact

### Resources
- [Search-js docs](https://docs.nosto.com/techdocs/apis/frontend/oss/search-js)
- [Nosto-js docs](https://docs.nosto.com/techdocs/apis/frontend/oss/nosto-js)