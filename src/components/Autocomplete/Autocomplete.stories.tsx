import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified Autocomplete demo
function AutocompleteDemo({
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
    <div style={{ position: "relative", width: "400px", padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden"
        }}
      >
        <input
          type="text"
          placeholder="Start typing to see suggestions..."
          defaultValue={query}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            border: "none",
            outline: "none",
            fontSize: "1rem"
          }}
        />
        <button
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          Search
        </button>
      </div>

      {showSuggestions && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "1rem",
            right: "1rem",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 1000
          }}
        >
          {loading ? (
            <div style={{ padding: "1rem", textAlign: "center", color: "#666" }}>Loading suggestions...</div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {suggestions.map(suggestion => (
                <li key={suggestion}>
                  <button
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "1rem"
                    }}
                    onMouseEnter={e => {
                      ;(e.target as HTMLElement).style.backgroundColor = "#f5f5f5"
                    }}
                    onMouseLeave={e => {
                      ;(e.target as HTMLElement).style.backgroundColor = "transparent"
                    }}
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

const meta: Meta<typeof AutocompleteDemo> = {
  title: "Components/Autocomplete",
  component: AutocompleteDemo,
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
      "laptop stands and cooling pads",
      "laptop batteries and chargers"
    ],
    showSuggestions: true,
    loading: false
  }
}
