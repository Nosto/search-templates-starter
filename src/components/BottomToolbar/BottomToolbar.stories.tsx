import type { Meta, StoryObj } from "@storybook/preact"
import BottomToolbar from "./BottomToolbar"

const meta: Meta<typeof BottomToolbar> = {
  title: "Components/BottomToolbar",
  component: BottomToolbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The BottomToolbar component displays pagination controls and items per page selection. Note: This component requires Nosto search context to function properly."
      }
    }
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Since BottomToolbar depends on Nosto hooks and context that aren't available in Storybook,
// we'll show what the component structure looks like when properly integrated
export const MockedView: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          borderTop: "1px solid #e5e7eb",
          backgroundColor: "white",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div>1 - 24 of 142 items</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label>Items per page</label>
            <select
              style={{
                padding: "0.25rem 0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                backgroundColor: "white"
              }}
            >
              <option>24 items per page</option>
              <option>48 items per page</option>
              <option>72 items per page</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          <button
            style={{
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: "white"
            }}
          >
            ←
          </button>
          <button
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: "#3b82f6",
              color: "white"
            }}
          >
            1
          </button>
          <button
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: "white"
            }}
          >
            2
          </button>
          <button
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: "white"
            }}
          >
            3
          </button>
          <span style={{ padding: "0 0.5rem" }}>...</span>
          <button
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: "white"
            }}
          >
            6
          </button>
          <button
            style={{
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: "white"
            }}
          >
            →
          </button>
        </div>
      </div>
    )
  }
}
