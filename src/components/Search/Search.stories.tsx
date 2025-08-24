import type { Meta, StoryObj } from "@storybook/preact"

// Minimal search component for demonstration
function Search({
  placeholder = "Search products...",
  value = "",
  showButton = true,
  disabled = false
}: {
  placeholder?: string
  value?: string
  showButton?: boolean
  disabled?: boolean
}) {
  return (
    <div style={{ 
      display: "flex", 
      border: "1px solid #d1d5db", 
      borderRadius: "6px", 
      overflow: "hidden",
      maxWidth: "400px"
    }}>
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        style={{
          flex: 1,
          padding: "12px 16px",
          border: "none",
          outline: "none",
          fontSize: "16px",
          backgroundColor: disabled ? "#f9fafb" : "white"
        }}
      />
      {showButton && (
        <button
          disabled={disabled}
          style={{
            padding: "12px 20px",
            backgroundColor: disabled ? "#d1d5db" : "#3b82f6",
            color: "white",
            border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "500"
          }}
        >
          Search
        </button>
      )}
    </div>
  )
}

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input"
    },
    value: {
      control: "text",
      description: "Current search value"
    },
    showButton: {
      control: "boolean",
      description: "Whether to show the search button"
    },
    disabled: {
      control: "boolean",
      description: "Whether the search is disabled"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Search products...",
    showButton: true,
    disabled: false
  }
}

export const WithValue: Story = {
  args: {
    placeholder: "Search products...",
    value: "running shoes",
    showButton: true,
    disabled: false
  }
}

export const NoButton: Story = {
  args: {
    placeholder: "Type to search...",
    showButton: false,
    disabled: false
  }
}

export const Disabled: Story = {
  args: {
    placeholder: "Search is disabled...",
    showButton: true,
    disabled: true
  }
}
