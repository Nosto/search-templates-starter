import type { Meta, StoryObj } from "@storybook/preact"

const IntroductionComponent = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
        lineHeight: "1.6"
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "1rem" }}>🚀 Search Templates Starter</h1>

      <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "2rem" }}>
        Welcome to the <strong>Search Templates Starter</strong> component library! This collection provides
        ready-to-use Preact components for building ecommerce search experiences using <code>@nosto/search-js</code>.
      </p>

      <h2 style={{ color: "#333", marginTop: "2rem", marginBottom: "1rem" }}>📖 Component Categories</h2>

      <p style={{ marginBottom: "1.5rem" }}>
        This Storybook showcases all available components organized into three main categories:
      </p>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#0066cc", marginBottom: "1rem" }}>🔍 Autocomplete Components</h3>
        <p style={{ marginBottom: "1rem", color: "#666" }}>
          Interactive search suggestions and autocomplete functionality:
        </p>
        <ul style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
          <li>
            <a href="/?path=/docs/autocomplete-autocomplete--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Autocomplete
            </a>{" "}
            - Main search input with suggestions
          </li>
          <li>
            <a href="/?path=/docs/autocomplete-keyword--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Keyword
            </a>{" "}
            - Individual search keyword suggestions
          </li>
          <li>
            <a href="/?path=/docs/autocomplete-product--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Product
            </a>{" "}
            - Product suggestions in autocomplete
          </li>
          <li>
            <a href="/?path=/docs/autocomplete-keywords--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Keywords
            </a>{" "}
            - Collection of keyword suggestions
          </li>
          <li>
            <a href="/?path=/docs/autocomplete-products--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Products
            </a>{" "}
            - Collection of product suggestions
          </li>
          <li>
            <a href="/?path=/docs/autocomplete-results--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Results
            </a>{" "}
            - Autocomplete results container
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#0066cc", marginBottom: "1rem" }}>🧩 Components</h3>
        <p style={{ marginBottom: "1rem", color: "#666" }}>Complete UI components for search interfaces:</p>
        <ul style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
          <li>
            <a href="/?path=/docs/components-bottomtoolbar--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              BottomToolbar
            </a>{" "}
            - Actions toolbar at bottom of results
          </li>
          <li>
            <a href="/?path=/docs/components-filtersidebar--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              FilterSidebar
            </a>{" "}
            - Side navigation for filters and facets
          </li>
          <li>
            <a href="/?path=/docs/components-filtertopbar--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              FilterTopbar
            </a>{" "}
            - Top bar with filter controls
          </li>
          <li>
            <a href="/?path=/docs/components-noresults--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              NoResults
            </a>{" "}
            - Empty state when no search results found
          </li>
          <li>
            <a href="/?path=/docs/components-pagination--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Pagination
            </a>{" "}
            - Navigate through search result pages
          </li>
          <li>
            <a href="/?path=/docs/components-product--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Product
            </a>{" "}
            - Individual product display card
          </li>
          <li>
            <a href="/?path=/docs/components-products--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Products
            </a>{" "}
            - Grid/list of product results
          </li>
          <li>
            <a href="/?path=/docs/components-search--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Search
            </a>{" "}
            - Main search input component
          </li>
          <li>
            <a
              href="/?path=/docs/components-selectedfilters--docs"
              style={{ color: "#0066cc", textDecoration: "none" }}
            >
              SelectedFilters
            </a>{" "}
            - Show active filters with remove options
          </li>
          <li>
            <a href="/?path=/docs/components-toolbar--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Toolbar
            </a>{" "}
            - Top toolbar with sorting and view controls
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#0066cc", marginBottom: "1rem" }}>🔧 Elements</h3>
        <p style={{ marginBottom: "1rem", color: "#666" }}>Basic UI elements and form controls:</p>
        <ul style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
          <li>
            <a href="/?path=/docs/elements-button--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Button
            </a>{" "}
            - Interactive button component
          </li>
          <li>
            <a href="/?path=/docs/elements-checkbox--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Checkbox
            </a>{" "}
            - Form checkbox input
          </li>
          <li>
            <a href="/?path=/docs/elements-dualrange--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              DualRange
            </a>{" "}
            - Two-handle range slider
          </li>
          <li>
            <a href="/?path=/docs/elements-heading--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Heading
            </a>{" "}
            - Text headings with different levels
          </li>
          <li>
            <a href="/?path=/docs/elements-icon--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Icon
            </a>{" "}
            - SVG icon component
          </li>
          <li>
            <a href="/?path=/docs/elements-pill--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Pill
            </a>{" "}
            - Tag/badge UI element
          </li>
          <li>
            <a href="/?path=/docs/elements-rangeinput--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              RangeInput
            </a>{" "}
            - Number input for ranges
          </li>
          <li>
            <a href="/?path=/docs/elements-select--docs" style={{ color: "#0066cc", textDecoration: "none" }}>
              Select
            </a>{" "}
            - Dropdown selection component
          </li>
        </ul>
      </div>

      <div style={{ background: "#f8f9fa", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
        <h3 style={{ color: "#333", marginTop: "0", marginBottom: "1rem" }}>📚 What You&apos;ll Find</h3>
        <p style={{ margin: "0 0 0.5rem 0" }}>Each component includes:</p>
        <ul style={{ marginLeft: "1rem", marginBottom: "0" }}>
          <li>
            🎮 <strong>Interactive examples</strong> you can play with
          </li>
          <li>
            📝 <strong>Property documentation</strong> with TypeScript types
          </li>
          <li>
            💻 <strong>Code snippets</strong> showing implementation
          </li>
          <li>
            🎭 <strong>Multiple story variations</strong> demonstrating different states
          </li>
        </ul>
      </div>

      <div style={{ background: "#e3f2fd", padding: "1.5rem", borderRadius: "8px" }}>
        <h3 style={{ color: "#333", marginTop: "0", marginBottom: "1rem" }}>🛠️ Built With</h3>
        <ul style={{ marginLeft: "1rem", marginBottom: "0" }}>
          <li>
            <strong>Preact</strong> - Lightweight React-like components
          </li>
          <li>
            <strong>TypeScript</strong> - Type safety and better development experience
          </li>
          <li>
            <strong>Vite</strong> - Fast development and building
          </li>
          <li>
            <strong>@nosto/search-js</strong> - Powerful search functionality
          </li>
          <li>
            <strong>Vitest</strong> - Modern testing framework
          </li>
        </ul>
      </div>

      <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.1rem" }}>
        Browse the sidebar navigation to explore individual components, or use the search bar above to quickly find what
        you need. 🎉
      </p>
    </div>
  )
}

export default {
  title: "Introduction",
  component: IntroductionComponent,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => <IntroductionComponent />
    }
  },
  tags: ["autodocs"]
} as Meta<typeof IntroductionComponent>

type Story = StoryObj<typeof IntroductionComponent>

export const Overview: Story = {}
