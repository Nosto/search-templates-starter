import type { Meta, StoryObj } from "@storybook/preact"

// Minimal sidebar component
function Sidebar({
  isOpen = true,
  loading = false
}: {
  isOpen?: boolean
  loading?: boolean
}) {
  return (
    <div style={{ 
      width: "280px", 
      border: "1px solid #e2e8f0", 
      borderRadius: "8px",
      backgroundColor: "white",
      opacity: loading ? 0.5 : 1,
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.3s ease"
    }}>
      <div style={{ padding: "1rem" }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          marginBottom: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #e2e8f0"
        }}>
          <span style={{ fontSize: "1.125rem", fontWeight: "600" }}>Filters</span>
          <button style={{ 
            background: "none", 
            border: "none", 
            fontSize: "1.25rem", 
            cursor: "pointer",
            color: "#64748b"
          }}>
            ×
          </button>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ 
            border: "1px solid #e2e8f0", 
            borderRadius: "6px"
          }}>
            <div style={{ 
              padding: "0.75rem", 
              backgroundColor: "#f8fafc", 
              fontWeight: "500",
              borderBottom: "1px solid #e2e8f0"
            }}>
              Category
            </div>
            <div style={{ padding: "0.75rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <input type="checkbox" />
                  <span>Electronics</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <input type="checkbox" />
                  <span>Clothing</span>
                </label>
              </div>
            </div>
          </div>
          
          <div style={{ 
            border: "1px solid #e2e8f0", 
            borderRadius: "6px"
          }}>
            <div style={{ 
              padding: "0.75rem", 
              backgroundColor: "#f8fafc", 
              fontWeight: "500",
              borderBottom: "1px solid #e2e8f0"
            }}>
              Price Range
            </div>
            <div style={{ padding: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input 
                  type="number" 
                  placeholder="Min"
                  style={{ 
                    padding: "0.5rem", 
                    border: "1px solid #d1d5db", 
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
                    border: "1px solid #d1d5db", 
                    borderRadius: "4px",
                    width: "80px"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
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
    isOpen: true,
    loading: false
  }
}

export const Closed: Story = {
  args: {
    isOpen: false,
    loading: false
  }
}

export const Loading: Story = {
  args: {
    isOpen: true,
    loading: true
  }
}
