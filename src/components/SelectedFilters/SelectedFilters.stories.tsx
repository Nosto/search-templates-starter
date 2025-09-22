import type { Meta, StoryObj } from "@storybook/preact"
import SelectedFilters from "./SelectedFilters"
import { withContainer, withSearchContext } from ".storybook/decorators"

export default {
  title: "Components/SelectedFilters",
  component: SelectedFilters,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The SelectedFilters component displays active filter pills with smart formatting:

- **Range filters** show filter name prefix (e.g., "Price: 10–50", "Rating: 1–5")
- **Term filters** show only the value (e.g., "Nike", "shoes")
- **Clear Filters button** has been moved to the Sidebar component bottom for better UX
        `
      }
    }
  },
  decorators: [withSearchContext, withContainer],
  tags: ["autodocs"]
} as Meta<typeof SelectedFilters>

type Story = StoryObj<typeof SelectedFilters>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Shows the SelectedFilters component with mock data from the search context."
      }
    }
  }
}

export const FilterTypesDemo: Story = {
  render: () => (
    <div style={{ width: "400px", padding: "16px" }}>
      <h4>Filter Display Examples:</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
        <span
          style={{
            backgroundColor: "#f0f0f0",
            padding: "6px 12px",
            borderRadius: "16px",
            fontSize: "14px",
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          Price: 10–50 ✕
        </span>
        <span
          style={{
            backgroundColor: "#f0f0f0",
            padding: "6px 12px",
            borderRadius: "16px",
            fontSize: "14px",
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          Customer Rating: 4–5 ✕
        </span>
        <span
          style={{
            backgroundColor: "#f0f0f0",
            padding: "6px 12px",
            borderRadius: "16px",
            fontSize: "14px",
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          Nike ✕
        </span>
        <span
          style={{
            backgroundColor: "#f0f0f0",
            padding: "6px 12px",
            borderRadius: "16px",
            fontSize: "14px",
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          shoes ✕
        </span>
      </div>
      <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
        Range filters (Price, Rating) include filter name prefix, while term filters (Nike, shoes) show only the value.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how different filter types are displayed: range filters include the filter name prefix while term filters show only the value."
      }
    }
  }
}
