import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified SelectedFilters demo
function SelectedFiltersDemo({
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
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center"
        }}
      >
        <span style={{ fontWeight: "bold", marginRight: "0.5rem" }}>Filters:</span>
        {filters.map((filter, index) => (
          <span
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#e3f2fd",
              color: "#1565c0",
              padding: "0.25rem 0.5rem",
              borderRadius: "16px",
              fontSize: "0.9rem",
              gap: "0.5rem"
            }}
          >
            {filter}
            <button
              style={{
                background: "none",
                border: "none",
                color: "#1565c0",
                cursor: "pointer",
                fontSize: "1rem",
                lineHeight: 1,
                padding: 0,
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              title={`Remove ${filter} filter`}
            >
              ×
            </button>
          </span>
        ))}
        {showClearAll && filters.length > 1 && (
          <button
            style={{
              background: "none",
              border: "1px solid #666",
              color: "#666",
              padding: "0.25rem 0.75rem",
              borderRadius: "4px",
              fontSize: "0.9rem",
              cursor: "pointer",
              marginLeft: "0.5rem"
            }}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  )
}

const meta: Meta<typeof SelectedFiltersDemo> = {
  title: "Components/SelectedFilters",
  component: SelectedFiltersDemo,
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
      description: "Show clear all button when multiple filters"
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

export const SingleFilter: Story = {
  args: {
    filters: ["Price: $100 - $500"],
    showClearAll: true
  }
}

export const ManyFilters: Story = {
  args: {
    filters: ["Category: Electronics", "Brand: Apple", "Price: $100 - $500", "Color: Black", "Rating: 4+ stars"],
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
