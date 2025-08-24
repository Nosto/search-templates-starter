import type { Meta, StoryObj } from "@storybook/preact"

// Minimal autocomplete component
function Autocomplete({
  query = "",
  suggestions = ["running shoes", "basketball shoes", "casual shoes"],
  showSuggestions = false,
  loading = false
}: {
  query?: string
  suggestions?: string[]
  showSuggestions?: boolean
  loading?: boolean
}) {
  return (
    <div style={{ position: "relative", width: "400px" }}>
      <div style={{
        display: "flex",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        overflow: "hidden"
      }}>
        <input
          type="text"
          placeholder="Start typing to see suggestions..."
          defaultValue={query}
          style={{
            flex: 1,
            padding: "12px 16px",
            border: "none",
            outline: "none",
            fontSize: "16px"
          }}
        />
        <button style={{
          padding: "12px 20px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "500"
        }}>
          Search
        </button>
      </div>

      {showSuggestions && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "white",
          border: "1px solid #d1d5db",
          borderTop: "none",
          borderRadius: "0 0 6px 6px",
          zIndex: 10
        }}>
          {loading ? (
            <div style={{ padding: "16px", color: "#6b7280" }}>Loading...</div>
          ) : (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  borderBottom: index < suggestions.length - 1 ? "1px solid #f3f4f6" : "none"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white"
                }}
              >
                {suggestion}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    query: {
      control: "text",
      description: "Current search query"
    },
    suggestions: {
      control: "object",
      description: "Array of suggestion strings"
    },
    showSuggestions: {
      control: "boolean",
      description: "Whether to show the suggestions dropdown"
    },
    loading: {
      control: "boolean",
      description: "Whether suggestions are loading"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    query: "",
    suggestions: ["running shoes", "basketball shoes", "casual shoes"],
    showSuggestions: false,
    loading: false
  }
}

export const WithSuggestions: Story = {
  args: {
    query: "shoes",
    suggestions: ["running shoes", "basketball shoes", "casual shoes", "dress shoes", "hiking boots"],
    showSuggestions: true,
    loading: false
  }
}

export const Loading: Story = {
  args: {
    query: "sho",
    suggestions: [],
    showSuggestions: true,
    loading: true
  }
}

export const LongSuggestions: Story = {
  args: {
    query: "laptop",
    suggestions: [
      "laptop computers for gaming",
      "laptop accessories and cases",
      "laptop stands and cooling pads"
    ],
    showSuggestions: true,
    loading: false
  }
}
