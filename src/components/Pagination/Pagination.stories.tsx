import type { Meta, StoryObj } from "@storybook/preact"

// Minimal pagination component
function Pagination({
  currentPage = 3,
  totalPages = 10
}: {
  currentPage?: number
  totalPages?: number
}) {
  const pages = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <div style={{ 
      display: "flex", 
      gap: "0.5rem", 
      alignItems: "center" 
    }}>
      <button 
        disabled={currentPage === 1}
        style={{ 
          padding: "8px 12px", 
          border: "1px solid #d1d5db", 
          borderRadius: "6px",
          backgroundColor: currentPage === 1 ? "#f9fafb" : "white",
          cursor: currentPage === 1 ? "not-allowed" : "pointer"
        }}
      >
        Previous
      </button>
      
      {start > 1 && (
        <>
          <button style={{ 
            padding: "8px 12px", 
            border: "1px solid #d1d5db", 
            borderRadius: "6px",
            backgroundColor: "white"
          }}>1</button>
          {start > 2 && <span>...</span>}
        </>
      )}
      
      {pages.map(page => (
        <button 
          key={page}
          style={{ 
            padding: "8px 12px", 
            border: "1px solid #d1d5db", 
            borderRadius: "6px",
            backgroundColor: page === currentPage ? "#3b82f6" : "white",
            color: page === currentPage ? "white" : "black",
            fontWeight: page === currentPage ? "600" : "normal"
          }}
        >
          {page}
        </button>
      ))}
      
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span>...</span>}
          <button style={{ 
            padding: "8px 12px", 
            border: "1px solid #d1d5db", 
            borderRadius: "6px",
            backgroundColor: "white"
          }}>{totalPages}</button>
        </>
      )}
      
      <button 
        disabled={currentPage === totalPages}
        style={{ 
          padding: "8px 12px", 
          border: "1px solid #d1d5db", 
          borderRadius: "6px",
          backgroundColor: currentPage === totalPages ? "#f9fafb" : "white",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer"
        }}
      >
        Next
      </button>
    </div>
  )
}

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
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
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 3,
    totalPages: 10
  }
}

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10
  }
}

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10
  }
}

export const WithEllipsis: Story = {
  args: {
    currentPage: 15,
    totalPages: 50
  }
}

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3
  }
}