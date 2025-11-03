# Agent Integration Guide

This guide provides comprehensive documentation for working with GitHub Copilot and other AI coding agents on the Search Templates Starter project. It covers patterns, workflows, and best practices specific to this Preact + `@nosto/search-js` ecommerce search template.

## Table of Contents

- [Overview](#overview)
- [Understanding the Architecture](#understanding-the-architecture)
- [Component Generation Patterns](#component-generation-patterns)
- [Search Interface Customization](#search-interface-customization)
- [Testing Strategies with Agents](#testing-strategies-with-agents)
- [Storybook Integration](#storybook-integration)
- [Common Agent Prompts](#common-agent-prompts)
- [Agent Configuration](#agent-configuration)

## Overview

Search Templates Starter is a Preact-based template for building Nosto search integrations. When working with AI agents on this codebase:

- **Always reference** `.github/copilot-instructions.md` first for project-specific conventions
- **Follow** existing patterns in `src/components/` and `src/elements/`
- **Use** TypeScript for all new code with proper type safety
- **Test** changes using Vitest for unit tests and Playwright for E2E tests
- **Document** components using Storybook stories

### Quick Start for Agents

Before making any changes:

```bash
npm install                 # Install dependencies
npm run lint                # Check code style
npm run test                # Run unit tests
npm run typecheck           # Validate TypeScript
```

## Understanding the Architecture

### Project Structure

```
src/
├── components/           # Complex UI components (Autocomplete, Products, etc.)
├── elements/            # Atomic UI elements (Button, Checkbox, Icon, etc.)
├── contexts/            # React contexts (SidebarContext)
├── entries/             # Entry points (injected.tsx, native.tsx)
├── hooks/               # Custom hooks
├── mapping/             # URL and data mapping utilities
├── plugins/             # Nosto search plugins
├── utils/               # Utility functions
└── config.ts            # Main configuration file
```

### Key Concepts

1. **Three Operating Modes**:
   - **Injected**: Components rendered via React Portals into existing pages (most common)
   - **Native**: Standard React/Preact app behavior
   - **Mocked**: Development/Storybook mode

2. **Configuration-Driven**:
   - `src/config.ts` contains all search configuration
   - CSS selectors for injection targets
   - Hit decorators for result transformation
   - Sort options and page sizes

3. **Nosto Integration**:
   - Uses `@nosto/search-js` for search functionality
   - Hooks like `useAutocomplete()`, `useSerp()`, `useCategory()`
   - Decorators transform raw search results into typed products

## Component Generation Patterns

### Creating a New Element

Elements are atomic UI components. When asking an agent to create a new element:

**Example Prompt:**
```
Create a new Badge element component in src/elements/Badge/ that:
- Accepts variant prop ("primary" | "secondary" | "success" | "warning")
- Has proper TypeScript types
- Includes CSS modules for styling
- Follows existing element patterns (see src/elements/Pill)
```

**Key Requirements:**
- Use functional components with TypeScript
- Extract props interfaces when > 2 props
- Include CSS modules (Badge.module.css)
- Export as named export, not default
- Follow conventions from `.github/instructions/preact.instructions.md`

### Creating a New Component

Components are more complex, often using hooks and contexts. When creating components:

**Example Prompt:**
```
Create a SearchHistory component in src/components/SearchHistory/ that:
- Uses the autocomplete history from @nosto/search-js
- Displays recent search terms as clickable pills
- Includes clear history functionality
- Follows the pattern in src/components/SelectedFilters
```

**Key Requirements:**
- Use Nosto hooks appropriately
- Handle loading and error states
- Include proper TypeScript types
- Add CSS modules for styling
- Create accompanying Storybook stories

### TypeScript Conventions

When generating TypeScript code, agents should:

```typescript
// ✅ DO: Use closures over classes
export function createUtility() {
  return { /* ... */ }
}

// ✅ DO: Infer return types
export function getValue(x: number) {
  return x * 2  // Return type inferred
}

// ✅ DO: Named exports over default
export { Component, useHook }

// ❌ DON'T: Use 'any'
// Use specific types or 'unknown'

// ✅ DO: Use utility types
type Props = Pick<ComponentProps, 'id' | 'name'>
```

See `.github/instructions/typescript.instructions.md` for complete guidelines.

## Search Interface Customization

### Modifying Search Configuration

The main configuration file is `src/config.ts`. When customizing search behavior:

**Example Prompts:**

1. **Add a new sort option:**
   ```
   Add a "Name A-Z" sort option to the sortOptions array in src/config.ts
   using the createSortOption utility. Sort by 'name' field ascending.
   ```

2. **Modify hit decorators:**
   ```
   Add a new decorator to the hitDecorators array that adds a 'badge' field
   to products when they're on sale. Follow the pattern of handleDecorator.
   ```

3. **Update autocomplete settings:**
   ```
   Modify autocompleteConfig in src/config.ts to:
   - Show 8 products instead of 5
   - Enable popular searches (uncomment and configure)
   - Add category suggestions with size 3
   ```

### CSS Selectors for Injection

When working with injected mode, update `selectors` in `config.ts`:

```typescript
export const selectors = {
  dropdown: "#your-dropdown-selector",
  searchInput: "#your-search-input",
  searchForm: "#your-search-form",
  results: "#your-results-container"
}
```

**Tip for Agents:** Use browser DevTools or Nosto Debug Toolbar's element picker to find correct selectors.

## Testing Strategies with Agents

### Unit Testing with Vitest

When creating or modifying components, always include unit tests:

**Example Prompt:**
```
Create unit tests for the Badge component in test/elements/Badge/Badge.spec.tsx.
Test:
- Rendering with different variants
- Custom className application
- Children content rendering
Follow the pattern in test/elements/Pill/Pill.spec.tsx
```

**Testing Patterns:**

```typescript
import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/preact"
import { Badge } from "@/elements/Badge/Badge"

describe("Badge", () => {
  it("renders with primary variant", () => {
    render(<Badge variant="primary">Test</Badge>)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
})
```

**Key Points:**
- No manual cleanup needed (handled globally via `test/vitest.setup.ts`)
- Use `@testing-library/preact` for component testing
- Test environment is jsdom for DOM-related tests
- See `.github/instructions/testing.instructions.md`

### E2E Testing with Playwright

For user flow testing:

**Example Prompt:**
```
Add a Playwright E2E test for the search autocomplete flow:
1. User types in search box
2. Autocomplete dropdown appears
3. User clicks a suggestion
4. Results page loads with correct query
```

Run E2E tests:
```bash
npm run test:e2e          # Run all E2E tests
npm run test:e2e:ui       # Interactive UI mode
```

### Pre-Commit Validation

Before committing, agents should verify:

```bash
npm run lint              # ESLint - must pass
npm run test              # Vitest - must pass
npm run test:e2e          # Playwright - must pass
npm run typecheck         # TypeScript - must pass
```

## Storybook Integration

### Creating Stories

All components should have Storybook stories for documentation and testing.

**Example Prompt:**
```
Create a Storybook story for the Badge component at src/elements/Badge/Badge.stories.tsx.
Include:
- Stories for all variants (primary, secondary, success, warning)
- Auto-generated documentation using autodocs tag
- Follow the pattern in src/components/Toolbar/Toolbar.stories.tsx
```

**Story Structure:**

```typescript
import type { Meta, StoryObj } from "@storybook/preact"
import { Badge } from "./Badge"

export default {
  title: "Elements/Badge",
  component: Badge,
  tags: ["autodocs"]  // Always include for auto documentation
} as Meta<typeof Badge>

type Story = StoryObj<typeof Badge>

// Prefer args over render functions
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Badge Text"
  }
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Badge Text"
  }
}
```

**Key Storybook Conventions:**
- Use actual components, not demo components
- Include `tags: ["autodocs"]` for auto-documentation
- Prefer `args` over `render` functions
- Skip `argTypes` when TypeScript types are sufficient
- Each story should demonstrate a unique state/variant

See `.github/instructions/storybook.instructions.md` for complete guidelines.

### Working with Storybook

Start Storybook:
```bash
npm run storybook
# Navigate to http://localhost:6060
```

**Taking Screenshots:**
When documenting UI changes in Storybook:
1. Close the controls section using "Hide addons [alt A]"
2. Wait for `#storybook-root .storybook-wrapper` to be available
3. Capture clean screenshots without addon panels

### Handling Context-Dependent Components

Some components require Nosto search context. For these:

```typescript
export const MockedView: Story = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <p>This component requires Nosto search context to function.</p>
      {/* Show component structure with mocked data */}
      <SearchResults results={mockResults} />
    </div>
  )
}
```

**Note:** Include documentation explaining context requirements.

## Common Agent Prompts

### Component Development

1. **Create a new filter component:**
   ```
   Create a ColorFilter component in src/components/FilterSidebar/ColorFilter/
   that displays color swatches for filtering. Use the TermsFacet component
   as reference. Include CSS modules, TypeScript types, and Storybook stories.
   ```

2. **Add loading states:**
   ```
   Add loading state handling to the Products component. Show skeleton loaders
   when isLoading is true. Follow accessibility best practices.
   ```

3. **Implement accessibility improvements:**
   ```
   Improve accessibility of the Pagination component by:
   - Adding proper ARIA labels
   - Ensuring keyboard navigation works
   - Adding screen reader announcements
   Follow WCAG 2.1 AA guidelines.
   ```

### Search Functionality

1. **Add faceted search:**
   ```
   Extend FilterSidebar to support a new "Material" facet. Add it to the
   filter configuration and ensure it integrates with existing filter logic.
   ```

2. **Customize product cards:**
   ```
   Modify the Product component to display:
   - Product badges (new, sale, low stock)
   - Star ratings
   - Quick view button
   Maintain existing functionality and add appropriate CSS.
   ```

3. **Implement infinite scroll:**
   ```
   Replace Pagination component with infinite scroll in the Products component.
   Use Intersection Observer API. Maintain URL state updates.
   ```

### Configuration and Optimization

1. **Add multi-currency support:**
   ```
   Configure multi-currency support in src/config.ts by:
   - Uncommenting currency configuration in withBaseConfig
   - Using tagging.variation() for currency detection
   - Testing with different currency codes
   ```

2. **Optimize performance:**
   ```
   Review the Products component for performance optimizations:
   - Add useMemo for expensive calculations
   - Use useCallback for event handlers
   - Implement virtualization for long product lists
   ```

### Testing and Quality

1. **Add test coverage:**
   ```
   Create comprehensive unit tests for src/utils/sorting.ts covering:
   - All exported functions
   - Edge cases (empty arrays, invalid input)
   - Type safety
   ```

2. **Fix accessibility issues:**
   ```
   Run accessibility audit on FilterSidebar component and fix any issues:
   - Color contrast
   - Keyboard navigation
   - Screen reader compatibility
   ```

## Agent Configuration

### GitHub Copilot Setup

The project includes agent instructions at:
- `.github/copilot-instructions.md` - Main Copilot instructions
- `.github/instructions/*.instructions.md` - Pattern-specific rules

These files are automatically read by GitHub Copilot and provide context for:
- TypeScript conventions
- Preact patterns
- Testing strategies
- Storybook guidelines

### Environment Variables

When developing with agents, you may need:

```bash
# .env file
VITE_MERCHANT_ID=your-merchant-id  # For local development
```

Without a merchant ID, the dev server will show a warning but components will still work in mocked mode.

### Conventional Commits

All commits must follow conventional commit format:

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore
Examples:
  feat(search): add color filter component
  fix(autocomplete): resolve dropdown positioning issue
  docs(readme): update installation instructions
  test(filters): add unit tests for range facet
```

**Important:** When committing via git, use `--no-verify` flag to skip Husky hooks that may fail in automated environments.

### VSCode Integration

For best experience with agents:

1. Use workspace TypeScript version (helps with CSS module types)
2. Install recommended extensions (ESLint, Prettier)
3. Enable Copilot inline suggestions
4. Use Copilot Chat for complex refactoring

### Agent Limitations

Be aware that agents:
- Cannot directly modify `.env` files (create `.env.example` instead)
- Should not modify `node_modules/` or build artifacts
- Must follow existing patterns rather than introducing new paradigms
- Should ask for clarification when requirements are ambiguous

## Best Practices Summary

When working with agents on Search Templates Starter:

✅ **DO:**
- Reference existing components as examples
- Follow TypeScript strict mode conventions
- Write tests alongside component code
- Create Storybook stories for visual documentation
- Use CSS modules for component styling
- Run linters and tests before committing
- Use conventional commit messages
- Keep changes minimal and focused

❌ **DON'T:**
- Create components without TypeScript types
- Skip test coverage for new features
- Use inline styles instead of CSS modules
- Ignore accessibility requirements
- Add dependencies without security scanning
- Commit without running validation scripts
- Use default exports (prefer named exports)
- Add unnecessary comments (code should be self-documenting)

## Resources

- [Nosto Search JS Documentation](https://docs.nosto.com/techdocs/apis/frontend/oss/search-js)
- [Nosto CLI Documentation](https://docs.nosto.com/techdocs/implementing-nosto/implement-search/implement-search-using-code-editor/using-nosto-cli)
- [Preact Documentation](https://preactjs.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Storybook Documentation](https://storybook.js.org/)

## Contributing

For more detailed information about contributing to this project, see `README.md`. For agent-specific instructions, always check the instruction files in `.github/instructions/` before making changes.
