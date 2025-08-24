import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified RangeFacet demo
function RangeFacetDemo({
  facetName = "Price",
  isActive = false,
  hasSelection = false
}: {
  facetName?: string
  isActive?: boolean
  hasSelection?: boolean
}) {
  return (
    <li
      style={{
        listStyle: "none",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "300px"
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1rem",
          cursor: "pointer",
          backgroundColor: isActive ? "#f5f5f5" : "white"
        }}
      >
        <span style={{ fontWeight: "bold" }}>{facetName}</span>
        {hasSelection && (
          <span
            style={{
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "12px",
              padding: "2px 8px",
              fontSize: "0.8rem",
              marginLeft: "0.5rem"
            }}
          >
            1
          </span>
        )}
        <span style={{ marginLeft: "auto" }}>{isActive ? "↑" : "↓"}</span>
      </span>
      {isActive && (
        <div style={{ padding: "1rem", borderTop: "1px solid #eee" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="number"
              placeholder="Min"
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "80px"
              }}
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "80px"
              }}
            />
            <button
              style={{
                padding: "0.5rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

const meta: Meta<typeof RangeFacetDemo> = {
  title: "Components/Facet/RangeFacet",
  component: RangeFacetDemo,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    facetName: {
      control: "text",
      description: "Name of the facet (e.g., Price, Rating)"
    },
    isActive: {
      control: "boolean",
      description: "Whether the facet is expanded"
    },
    hasSelection: {
      control: "boolean",
      description: "Whether a range is selected"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    facetName: "Price",
    isActive: false,
    hasSelection: false
  }
}

export const Expanded: Story = {
  args: {
    facetName: "Price",
    isActive: true,
    hasSelection: false
  }
}

export const WithSelection: Story = {
  args: {
    facetName: "Price",
    isActive: true,
    hasSelection: true
  }
}

export const RatingFacet: Story = {
  args: {
    facetName: "Customer Rating",
    isActive: false,
    hasSelection: false
  }
}
