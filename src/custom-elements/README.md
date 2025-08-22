# Nosto Search Custom Elements

This directory contains custom element wrappers for Nosto Search Preact components, allowing them to be used as standard HTML custom elements.

## Available Custom Elements

### `<nosto-search-filters>`
Wraps the `SelectedFilters` component. Displays active search filters and allows users to remove them.

**Events:**
- `nosto-search-filters-changed` - Dispatched when filters are modified
- `nosto-search-filters-cleared` - Dispatched when all filters are cleared

### `<nosto-search-toolbar>`
Wraps the `Toolbar` component. Shows search results count, sort options, and mobile filter toggle.

**Events:**
- `nosto-search-sort-changed` - Dispatched when sort option is changed
- `nosto-search-filter-toggle` - Dispatched when mobile filter is toggled

### `<nosto-search-products>`
Wraps the `Products` component. Displays the grid of product search results.

**Events:**
- `nosto-search-product-clicked` - Dispatched when a product is clicked
- `nosto-search-products-loaded` - Dispatched when products are loaded

### `<nosto-search-bottom-toolbar>`
Wraps the `BottomToolbar` component. Provides pagination controls and items per page selector.

**Events:**
- `nosto-search-page-changed` - Dispatched when pagination changes
- `nosto-search-page-size-changed` - Dispatched when page size changes

## Usage

### Basic HTML Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>Search Page</title>
</head>
<body>
    <!-- Complete search interface -->
    <nosto-search-filters></nosto-search-filters>
    <nosto-search-toolbar></nosto-search-toolbar>
    <nosto-search-products></nosto-search-products>
    <nosto-search-bottom-toolbar></nosto-search-bottom-toolbar>

    <!-- Import custom elements -->
    <script type="module" src="path/to/custom-elements.js"></script>
</body>
</html>
```

### JavaScript Usage

```javascript
// Import to register all custom elements
import '@/custom-elements'

// Create elements programmatically
const filters = document.createElement('nosto-search-filters')
document.body.appendChild(filters)

// Listen for custom events
document.addEventListener('nosto-search-filters-changed', (event) => {
    console.log('Filters changed:', event.detail)
})

// Listen for all search events
const searchEvents = [
    'nosto-search-filters-changed',
    'nosto-search-filters-cleared',
    'nosto-search-sort-changed',
    'nosto-search-filter-toggle',
    'nosto-search-product-clicked',
    'nosto-search-products-loaded',
    'nosto-search-page-changed',
    'nosto-search-page-size-changed'
]

searchEvents.forEach(eventType => {
    document.addEventListener(eventType, (event) => {
        console.log(`Search event: ${eventType}`, event.detail)
    })
})
```

### TypeScript Support

```typescript
import { 
    NostoSearchFilters, 
    NostoSearchToolbar, 
    NostoSearchProducts, 
    NostoSearchBottomToolbar 
} from '@/custom-elements'

// TypeScript will recognize the custom element types
const filters: NostoSearchFilters = document.createElement('nosto-search-filters')
```

## Features

- **No Shadow DOM**: Components render directly into the light DOM for full CSS control
- **Event Communication**: Custom events allow components to communicate with each other and external code
- **SearchPageProvider Integration**: All components automatically receive the Nosto search context
- **TypeScript Support**: Full type definitions for all custom elements
- **Standard Web APIs**: Uses standard custom element lifecycle methods

## Architecture

All custom elements extend `BaseNostoElement`, which provides:

1. **Automatic Preact Rendering**: Components are wrapped with `SearchPageProvider` and rendered using Preact
2. **Lifecycle Management**: Proper mounting/unmounting when elements are added/removed from DOM
3. **Event System**: Built-in custom event dispatching and listening
4. **Context Integration**: Automatic access to Nosto search state and hooks

## Requirements

- Modern browser with custom element support
- Nosto search configuration properly set up
- SearchPageProvider context available (automatically provided by custom elements)

## Demo

See `demo-custom-elements.html` for a complete demonstration of all custom elements and their usage patterns.