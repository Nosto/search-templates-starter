import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified Toolbar demo
function ToolbarDemo({
  totalResults = 142,
  selectedFiltersCount = 2,
  loading = false,
  sortOptions = ["Most relevant", "Price: Low to High", "Price: High to Low"],
  selectedSort = "Most relevant"
}: {
  totalResults?: number
  selectedFiltersCount?: number
  loading?: boolean
  sortOptions?: string[]
  selectedSort?: string
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: "1px solid #eee",
        backgroundColor: "white",
        opacity: loading ? 0.6 : 1
      }}
    >
      {!loading && <span style={{ fontSize: "1rem", fontWeight: "bold" }}>{totalResults} products</span>}

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Mobile filter button */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            border: "1px solid #ccc",
            backgroundColor: "white",
            borderRadius: "4px",
            cursor: "pointer",
            position: "relative"
          }}
        >
          🔍 Filter
          {selectedFiltersCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {selectedFiltersCount}
            </span>
          )}
        </button>

        {/* Sort dropdown */}
        <div style={{ position: "relative" }}>
          <select
            value={selectedSort}
            style={{
              padding: "0.5rem 2rem 0.5rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "1rem",
              appearance: "none"
            }}
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none"
            }}
          >
            ▼
          </span>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof ToolbarDemo> = {
  title: "Components/Toolbar",
  component: ToolbarDemo,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"],
  argTypes: {
    totalResults: {
      control: "number",
      description: "Total number of search results"
    },
    selectedFiltersCount: {
      control: "number",
      description: "Number of active filters"
    },
    loading: {
      control: "boolean",
      description: "Loading state"
    },
    sortOptions: {
      control: "object",
      description: "Available sort options"
    },
    selectedSort: {
      control: "text",
      description: "Currently selected sort option"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    totalResults: 142,
    selectedFiltersCount: 0,
    loading: false,
    sortOptions: ["Most relevant", "Price: Low to High", "Price: High to Low"],
    selectedSort: "Most relevant"
  }
}

export const WithFilters: Story = {
  args: {
    totalResults: 87,
    selectedFiltersCount: 3,
    loading: false,
    sortOptions: ["Most relevant", "Price: Low to High", "Price: High to Low"],
    selectedSort: "Price: Low to High"
  }
}

export const Loading: Story = {
  args: {
    totalResults: 0,
    selectedFiltersCount: 0,
    loading: true,
    sortOptions: ["Most relevant", "Price: Low to High", "Price: High to Low"],
    selectedSort: "Most relevant"
  }
}

export const ManyResults: Story = {
  args: {
    totalResults: 1247,
    selectedFiltersCount: 1,
    loading: false,
    sortOptions: ["Most relevant", "Price: Low to High", "Price: High to Low", "Customer Rating", "Newest"],
    selectedSort: "Customer Rating"
  }
}
