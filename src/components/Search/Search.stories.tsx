import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified Search demo
function SearchDemo({
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
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
          maxWidth: "500px"
        }}
      >
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={value}
          disabled={disabled}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            border: "none",
            outline: "none",
            fontSize: "1rem"
          }}
        />
        {showButton && (
          <button
            disabled={disabled}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: disabled ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              cursor: disabled ? "not-allowed" : "pointer",
              fontSize: "1rem"
            }}
          >
            Search
          </button>
        )}
      </div>
    </div>
  )
}

const meta: Meta<typeof SearchDemo> = {
  title: "Components/Search",
  component: SearchDemo,
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
    value: "",
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
    value: "",
    showButton: false,
    disabled: false
  }
}

export const Disabled: Story = {
  args: {
    placeholder: "Search is disabled...",
    value: "",
    showButton: true,
    disabled: true
  }
}
