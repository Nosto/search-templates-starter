import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified Pagination demo
function PaginationDemo({
  currentPage = 3,
  totalPages = 10,
  showFirst = false,
  showLast = false
}: {
  currentPage?: number
  totalPages?: number
  showFirst?: boolean
  showLast?: boolean
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
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
          >
            ←
          </button>
        </li>
      )}

      {showFirst && currentPage > 3 && (
        <>
          <li>
            <button
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid #ccc",
                backgroundColor: "white",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              1
            </button>
          </li>
          <li>
            <span style={{ padding: "0.5rem" }}>...</span>
          </li>
        </>
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

      {showLast && currentPage < totalPages - 2 && (
        <>
          <li>
            <span style={{ padding: "0.5rem" }}>...</span>
          </li>
          <li>
            <button
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid #ccc",
                backgroundColor: "white",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {totalPages}
            </button>
          </li>
        </>
      )}

      {hasNext && (
        <li>
          <button
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              backgroundColor: "white",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
          >
            →
          </button>
        </li>
      )}
    </ul>
  )
}

const meta: Meta<typeof PaginationDemo> = {
  title: "Components/Pagination",
  component: PaginationDemo,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1, max: 20 },
      description: "Current active page"
    },
    totalPages: {
      control: { type: "number", min: 1, max: 50 },
      description: "Total number of pages"
    },
    showFirst: {
      control: "boolean",
      description: "Show first page and ellipsis"
    },
    showLast: {
      control: "boolean",
      description: "Show last page and ellipsis"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    showFirst: false,
    showLast: false
  }
}

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    showFirst: false,
    showLast: false
  }
}

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    showFirst: false,
    showLast: false
  }
}

export const WithEllipsis: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    showFirst: true,
    showLast: true
  }
}

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    showFirst: false,
    showLast: false
  }
}
