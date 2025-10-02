# useDOMElements Hook

A generic, reusable hook for lazily accessing DOM elements in Preact applications.

## Usage

### Basic Example

```typescript
import { useDOMElements } from "@/hooks/useDOMElements"

function MyComponent() {
  const { getElements } = useDOMElements({
    button: "#submit-btn",
    input: "#user-input",
    modal: ".modal"
  })

  const handleClick = () => {
    const elements = getElements()
    if (elements?.button && elements?.input) {
      elements.button.disabled = true
      elements.input.focus()
    }
  }

  return <div onClick={handleClick}>Click me</div>
}
```

### Optional Elements

```typescript
// Elements are optional - won't show warnings if missing
const { getElements } = useDOMElements({
  tooltip: ".tooltip",
  sidebar: "#sidebar"
}, { 
  required: false 
})
```

### Custom Warning Message

```typescript
const { getElements } = useDOMElements({
  form: "#contact-form"
}, {
  warningMessage: "Contact form not found on page"
})
```

### Caching and Performance

The hook automatically caches DOM elements after the first successful query:

```typescript
const { getElements, clearCache } = useDOMElements({
  header: "header",
  footer: "footer"
})

// Elements are cached after first call
const elements1 = getElements() // Queries DOM
const elements2 = getElements() // Uses cache

// Clear cache to force re-query (useful if DOM changes)
clearCache()
const elements3 = getElements() // Queries DOM again
```

## Migration from useAutocompleteDOMElements

The old autocomplete-specific hook is still available for backward compatibility:

```typescript
// Old way (still works)
import { useAutocompleteDOMElements } from "@/hooks/useDOMElements"
const { getElements } = useAutocompleteDOMElements()

// New way (recommended)
import { useDOMElements } from "@/hooks/useDOMElements"
const { getElements } = useDOMElements({
  dropdownElement: "#dropdown",
  searchInput: "#search", 
  searchForm: "#search-form"
})
```

## Benefits

- **Generic**: Works with any DOM elements, not just autocomplete
- **Type Safe**: Full TypeScript support with proper null handling
- **Performance**: Caches elements to avoid repeated DOM queries
- **Flexible**: Optional elements, custom warnings, configurable behavior
- **Backward Compatible**: Existing autocomplete usage continues to work
