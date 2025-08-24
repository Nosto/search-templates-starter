import type { Meta, StoryObj } from "@storybook/preact"

// Minimal toolbar component
function Toolbar({
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
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem",
      borderBottom: "1px solid #e2e8f0",
      backgroundColor: "white",
      opacity: loading ? 0.6 : 1
    }}>
      <span style={{ fontSize: "16px", fontWeight: "500" }}>
        {loading ? "Loading..." : `${totalResults} products`}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "8px 16px",
          border: "1px solid #d1d5db",
          backgroundColor: "white",
          borderRadius: "6px",
          cursor: "pointer",
          position: "relative",
          fontSize: "14px"
        }}>
          Filter
          {selectedFiltersCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: "#ef4444",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {selectedFiltersCount}
            </span>
          )}
        </button>

        <select 
          value={selectedSort}
          style={{
            padding: "8px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            backgroundColor: "white",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          {sortOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

const meta: Meta<typeof Toolbar> = {
  title: "Components/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    totalResults: {
      control: { type: "number", min: 0, max: 10000 },
      description: "Total number of search results"
    },
    selectedFiltersCount: {
      control: { type: "number", min: 0, max: 10 },
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
      control: "select",
      options: ["Most relevant", "Price: Low to High", "Price: High to Low"],
      description: "Currently selected sort option"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    totalResults: 142,
    selectedFiltersCount: 2,
    loading: false,
    sortOptions: ["Most relevant", "Price: Low to High", "Price: High to Low"],
    selectedSort: "Most relevant"
  }
}

export const Loading: Story = {
  args: {
    totalResults: 142,
    selectedFiltersCount: 0,
    loading: true,
    sortOptions: ["Most relevant", "Price: Low to High", "Price: High to Low"],
    selectedSort: "Most relevant"
  }
}

export const NoFilters: Story = {
  args: {
    totalResults: 89,
    selectedFiltersCount: 0,
    loading: false,
    sortOptions: ["Most relevant", "Price: Low to High", "Price: High to Low"],
    selectedSort: "Most relevant"
  }
}

export const ManyFilters: Story = {
  args: {
    totalResults: 23,
    selectedFiltersCount: 7,
    loading: false,
    sortOptions: ["Most relevant", "Price: Low to High", "Price: High to Low"],
    selectedSort: "Price: Low to High"
  }
}

export const FewResults: Story = {
  args: {
    totalResults: 3,
    selectedFiltersCount: 4,
    loading: false,
    sortOptions: ["Most relevant", "Price: Low to High", "Price: High to Low"],
    selectedSort: "Most relevant"
  }
}