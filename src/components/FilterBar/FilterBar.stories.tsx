import type { Meta, StoryObj } from "@storybook/preact"
import FilterBar from "./FilterBar"

const meta: Meta<typeof FilterBar> = {
  title: "Components/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A horizontal filter bar component that displays facets as dropdown filters. Uses the `useFacets()` hook to access available filters and provides both terms and range filter types."
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof FilterBar>

export const Default: Story = {
  name: "Default",
  parameters: {
    docs: {
      description: {
        story: "Default FilterBar showing multiple facet types including terms and range filters."
      }
    }
  }
}

export const MockedView: Story = {
  name: "Mocked View",
  parameters: {
    docs: {
      description: {
        story:
          "Shows what the FilterBar would look like when integrated with Nosto search context. This component requires facet data from the search response to function properly."
      }
    }
  },
  render: () => (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "16px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center",
          paddingBottom: "16px",
          borderBottom: "1px solid #e0e0e0"
        }}
      >
        {/* Mock Terms Filter Dropdown */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              background: "white",
              border: "1px solid #d0d0d0",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              minWidth: "120px",
              justifyContent: "space-between"
            }}
          >
            <span style={{ fontWeight: "500" }}>Color</span>
            <span
              style={{
                background: "#0066cc",
                color: "white",
                borderRadius: "12px",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold"
              }}
            >
              2
            </span>
            <span>▼</span>
          </button>
        </div>

        {/* Mock Size Filter Dropdown */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              background: "white",
              border: "1px solid #d0d0d0",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              minWidth: "120px",
              justifyContent: "space-between"
            }}
          >
            <span style={{ fontWeight: "500" }}>Size</span>
            <span style={{ color: "#666", fontSize: "12px" }}>Any</span>
            <span>▼</span>
          </button>
        </div>

        {/* Mock Price Range Filter Dropdown */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              background: "white",
              border: "1px solid #d0d0d0",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              minWidth: "160px",
              justifyContent: "space-between"
            }}
          >
            <span style={{ fontWeight: "500" }}>Price</span>
            <span style={{ color: "#666", fontSize: "12px" }}>Any</span>
            <span>▼</span>
          </button>
        </div>
      </div>
      <p
        style={{
          marginTop: "16px",
          fontSize: "14px",
          color: "#666",
          fontStyle: "italic"
        }}
      >
        Note: This component requires Nosto search context with facet data to display actual filters.
      </p>
    </div>
  )
}
