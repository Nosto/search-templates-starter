import type { Meta, StoryObj } from "@storybook/preact"

// Minimal selected filters component
function SelectedFilters({
  filters = ["Category: Electronics", "Brand: Apple"],
  showClearAll = true
}: {
  filters?: string[]
  showClearAll?: boolean
}) {
  if (filters.length === 0) {
    return null
  }

  return (
    <div style={{ 
      display: "flex", 
      flexWrap: "wrap", 
      gap: "0.5rem", 
      alignItems: "center" 
    }}>
      {filters.map((filter, index) => (
        <span
          key={index}
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#eff6ff",
            color: "#1d4ed8",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            gap: "6px",
            border: "1px solid #dbeafe"
          }}
        >
          {filter}
          <button
            style={{
              background: "none",
              border: "none",
              color: "#1d4ed8",
              cursor: "pointer",
              fontSize: "16px",
              padding: 0,
              width: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ×
          </button>
        </span>
      ))}
      
      {showClearAll && filters.length > 0 && (
        <button
          style={{
            background: "none",
            border: "1px solid #d1d5db",
            color: "#6b7280",
            cursor: "pointer",
            fontSize: "14px",
            padding: "6px 12px",
            borderRadius: "6px"
          }}
        >
          Clear all
        </button>
      )}
    </div>
  )
}

const meta: Meta<typeof SelectedFilters> = {
  title: "Components/SelectedFilters",
  component: SelectedFilters,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    filters: {
      control: "object",
      description: "Array of selected filter strings"
    },
    showClearAll: {
      control: "boolean",
      description: "Whether to show clear all button"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    filters: ["Category: Electronics", "Brand: Apple"],
    showClearAll: true
  }
}

export const ManyFilters: Story = {
  args: {
    filters: [
      "Category: Electronics", 
      "Brand: Apple", 
      "Price: $100-$500", 
      "Rating: 4+ stars",
      "Color: Black"
    ],
    showClearAll: true
  }
}

export const SingleFilter: Story = {
  args: {
    filters: ["Category: Electronics"],
    showClearAll: true
  }
}

export const NoFilters: Story = {
  args: {
    filters: [],
    showClearAll: true
  }
}

export const NoClearAll: Story = {
  args: {
    filters: ["Category: Electronics", "Brand: Apple"],
    showClearAll: false
  }
}