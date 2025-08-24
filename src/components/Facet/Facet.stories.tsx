import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified Facet demo
function FacetDemo({
  facetName = "Category",
  options = ["Electronics", "Clothing", "Books"],
  selectedCount = 0,
  isActive = false
}: {
  facetName?: string
  options?: string[]
  selectedCount?: number
  isActive?: boolean
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
        {selectedCount > 0 && (
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
            {selectedCount}
          </span>
        )}
        <span style={{ marginLeft: "auto" }}>{isActive ? "↑" : "↓"}</span>
      </span>
      {isActive && (
        <div style={{ padding: "1rem", borderTop: "1px solid #eee" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {options.map((option, index) => (
              <li key={option} style={{ padding: "0.25rem 0" }}>
                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  {option}
                  <input type="checkbox" defaultChecked={index < selectedCount} style={{ marginLeft: "auto" }} />
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      marginLeft: "0.5rem",
                      color: "#666",
                      fontSize: "0.8rem"
                    }}
                  >
                    ({Math.floor(Math.random() * 50) + 1})
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

const meta: Meta<typeof FacetDemo> = {
  title: "Components/Facet/Facet",
  component: FacetDemo,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    facetName: {
      control: "text",
      description: "Name of the facet"
    },
    options: {
      control: "object",
      description: "Array of facet options"
    },
    selectedCount: {
      control: "number",
      description: "Number of selected options"
    },
    isActive: {
      control: "boolean",
      description: "Whether the facet is expanded"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    facetName: "Category",
    options: ["Electronics", "Clothing", "Books", "Home & Garden"],
    selectedCount: 0,
    isActive: false
  }
}

export const Expanded: Story = {
  args: {
    facetName: "Category",
    options: ["Electronics", "Clothing", "Books", "Home & Garden"],
    selectedCount: 0,
    isActive: true
  }
}

export const WithSelections: Story = {
  args: {
    facetName: "Brand",
    options: ["Apple", "Samsung", "Sony", "Nike", "Adidas"],
    selectedCount: 2,
    isActive: true
  }
}

export const ManyOptions: Story = {
  args: {
    facetName: "Color",
    options: ["Red", "Blue", "Green", "Yellow", "Black", "White", "Purple", "Orange"],
    selectedCount: 1,
    isActive: true
  }
}
