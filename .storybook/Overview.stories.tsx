import type { Meta, StoryObj } from "@storybook/preact-vite"

const OverviewComponent = () => {
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
          Interactive search suggestions and autocomplete functionality including main search input with suggestions,
          individual keyword suggestions, product suggestions, and autocomplete results containers.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#0066cc", marginBottom: "1rem" }}>🧩 Components</h3>
        <p style={{ marginBottom: "1rem", color: "#666" }}>
          Complete UI components for search interfaces including toolbars, filter sidebars, pagination, product
          displays, search inputs, and selected filters management.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#0066cc", marginBottom: "1rem" }}>🔧 Elements</h3>
        <p style={{ marginBottom: "1rem", color: "#666" }}>
          Basic UI elements and form controls including buttons, checkboxes, range sliders, headings, icons, pills, and
          selection components.
        </p>
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
  title: "Overview",
  component: OverviewComponent,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => <OverviewComponent />
    }
  }
} as Meta<typeof OverviewComponent>

type Story = StoryObj<typeof OverviewComponent>

export const Overview: Story = {}
