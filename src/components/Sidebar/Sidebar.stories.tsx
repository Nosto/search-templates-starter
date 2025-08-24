import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified Sidebar demo
function SidebarDemo({
  facets = [
    { name: "Category", type: "terms", options: ["Electronics", "Clothing", "Books"] },
    { name: "Brand", type: "terms", options: ["Apple", "Samsung", "Nike"] },
    { name: "Price", type: "range", min: 0, max: 1000 }
  ],
  isOpen = true,
  loading = false
}: {
  facets?: Array<{
    name: string
    type: "terms" | "range"
    options?: string[]
    min?: number
    max?: number
  }>
  isOpen?: boolean
  loading?: boolean
}) {
  return (
    <div style={{ position: "relative", height: "500px" }}>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "absolute",
          left: isOpen ? 0 : "-300px",
          top: 0,
          width: "300px",
          height: "100%",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
          transition: "left 0.3s",
          zIndex: 2,
          opacity: loading ? 0.3 : 1
        }}
      >
        <div style={{ padding: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
              borderBottom: "1px solid #eee",
              paddingBottom: "1rem"
            }}
          >
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Filters</span>
            <button
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer"
              }}
            >
              ×
            </button>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {facets.map(facet => (
              <li key={facet.name} style={{ marginBottom: "1rem" }}>
                {facet.type === "terms" ? (
                  <div
                    style={{
                      border: "1px solid #eee",
                      borderRadius: "4px"
                    }}
                  >
                    <div
                      style={{
                        padding: "0.75rem",
                        backgroundColor: "#f8f9fa",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer"
                      }}
                    >
                      {facet.name}
                      <span>↓</span>
                    </div>
                    <div style={{ padding: "0.5rem" }}>
                      {facet.options?.map(option => (
                        <label
                          key={option}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.25rem 0",
                            cursor: "pointer"
                          }}
                        >
                          {option}
                          <input type="checkbox" style={{ marginLeft: "auto" }} />
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      border: "1px solid #eee",
                      borderRadius: "4px"
                    }}
                  >
                    <div
                      style={{
                        padding: "0.75rem",
                        backgroundColor: "#f8f9fa",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer"
                      }}
                    >
                      {facet.name}
                      <span>↓</span>
                    </div>
                    <div style={{ padding: "0.5rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <input
                          type="number"
                          placeholder="Min"
                          style={{
                            padding: "0.25rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: "60px"
                          }}
                        />
                        <span>to</span>
                        <input
                          type="number"
                          placeholder="Max"
                          style={{
                            padding: "0.25rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: "60px"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof SidebarDemo> = {
  title: "Components/Sidebar",
  component: SidebarDemo,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    facets: {
      control: "object",
      description: "Array of facet configurations"
    },
    isOpen: {
      control: "boolean",
      description: "Whether the sidebar is open"
    },
    loading: {
      control: "boolean",
      description: "Loading state"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    facets: [
      { name: "Category", type: "terms", options: ["Electronics", "Clothing", "Books"] },
      { name: "Brand", type: "terms", options: ["Apple", "Samsung", "Nike"] },
      { name: "Price", type: "range", min: 0, max: 1000 }
    ],
    isOpen: true,
    loading: false
  }
}

export const Closed: Story = {
  args: {
    facets: [
      { name: "Category", type: "terms", options: ["Electronics", "Clothing", "Books"] },
      { name: "Brand", type: "terms", options: ["Apple", "Samsung", "Nike"] }
    ],
    isOpen: false,
    loading: false
  }
}

export const Loading: Story = {
  args: {
    facets: [
      { name: "Category", type: "terms", options: ["Electronics", "Clothing"] },
      { name: "Price", type: "range", min: 0, max: 1000 }
    ],
    isOpen: true,
    loading: true
  }
}

export const ManyFacets: Story = {
  args: {
    facets: [
      { name: "Category", type: "terms", options: ["Electronics", "Clothing", "Books", "Sports"] },
      { name: "Brand", type: "terms", options: ["Apple", "Samsung", "Nike", "Adidas", "Sony"] },
      { name: "Price", type: "range", min: 0, max: 2000 },
      { name: "Rating", type: "range", min: 1, max: 5 },
      { name: "Color", type: "terms", options: ["Red", "Blue", "Green", "Black"] }
    ],
    isOpen: true,
    loading: false
  }
}
