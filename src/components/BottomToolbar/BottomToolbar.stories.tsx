import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified BottomToolbar demo
function BottomToolbarDemo({
  from = 1,
  to = 24,
  total = 142,
  itemsPerPageOptions = [24, 48, 72],
  selectedItemsPerPage = 24,
  currentPage = 1,
  totalPages = 6
}: {
  from?: number
  to?: number
  total?: number
  itemsPerPageOptions?: number[]
  selectedItemsPerPage?: number
  currentPage?: number
  totalPages?: number
}) {
  const generatePages = () => {
    const pages = []
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, currentPage + 2)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  const pages = generatePages()
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        borderTop: "1px solid #eee",
        backgroundColor: "white",
        flexWrap: "wrap",
        gap: "1rem"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div>
          {from} - {total < to ? total : to} of {total} items
        </div>

        {itemsPerPageOptions.length > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>Items per page:</span>
            <select
              value={selectedItemsPerPage}
              style={{
                padding: "0.25rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white"
              }}
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Pagination */}
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          padding: 0,
          margin: 0,
          gap: "0.25rem",
          alignItems: "center"
        }}
      >
        {hasPrev && (
          <li>
            <button
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                backgroundColor: "white",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              ←
            </button>
          </li>
        )}

        {pages.map(page => (
          <li key={page}>
            <button
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid #ccc",
                backgroundColor: page === currentPage ? "#007bff" : "white",
                color: page === currentPage ? "white" : "black",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: page === currentPage ? "bold" : "normal"
              }}
            >
              {page}
            </button>
          </li>
        ))}

        {hasNext && (
          <li>
            <button
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                backgroundColor: "white",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              →
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

const meta: Meta<typeof BottomToolbarDemo> = {
  title: "Components/BottomToolbar",
  component: BottomToolbarDemo,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"],
  argTypes: {
    from: {
      control: "number",
      description: "Starting item number"
    },
    to: {
      control: "number",
      description: "Ending item number"
    },
    total: {
      control: "number",
      description: "Total number of items"
    },
    itemsPerPageOptions: {
      control: "object",
      description: "Available items per page options"
    },
    selectedItemsPerPage: {
      control: "number",
      description: "Currently selected items per page"
    },
    currentPage: {
      control: "number",
      description: "Current active page"
    },
    totalPages: {
      control: "number",
      description: "Total number of pages"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    from: 1,
    to: 24,
    total: 142,
    itemsPerPageOptions: [24, 48, 72],
    selectedItemsPerPage: 24,
    currentPage: 1,
    totalPages: 6
  }
}

export const MiddlePage: Story = {
  args: {
    from: 49,
    to: 72,
    total: 142,
    itemsPerPageOptions: [24, 48, 72],
    selectedItemsPerPage: 24,
    currentPage: 3,
    totalPages: 6
  }
}

export const LastPage: Story = {
  args: {
    from: 133,
    to: 142,
    total: 142,
    itemsPerPageOptions: [24, 48, 72],
    selectedItemsPerPage: 24,
    currentPage: 6,
    totalPages: 6
  }
}

export const LargePageSize: Story = {
  args: {
    from: 1,
    to: 72,
    total: 142,
    itemsPerPageOptions: [24, 48, 72],
    selectedItemsPerPage: 72,
    currentPage: 1,
    totalPages: 2
  }
}
