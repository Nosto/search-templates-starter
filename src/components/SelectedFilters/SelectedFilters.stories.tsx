import type { Meta, StoryObj } from "@storybook/preact"
import SelectedFilters from "./SelectedFilters"

// Since SelectedFilters requires Nosto search context, we show what it looks like when integrated
function SelectedFiltersMockedView() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        <strong>Note:</strong> This component requires Nosto search context to function properly. The MockedView below
        shows how it appears when integrated.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 0.75rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
            fontSize: "0.875rem"
          }}
        >
          <span>Category: Electronics</span>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0",
              fontSize: "1rem"
            }}
          >
            ×
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 0.75rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
            fontSize: "0.875rem"
          }}
        >
          <span>Brand: Apple</span>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0",
              fontSize: "1rem"
            }}
          >
            ×
          </button>
        </div>
        <button
          style={{
            padding: "0.5rem 0.75rem",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.875rem",
            cursor: "pointer"
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  )
}

const meta: Meta<typeof SelectedFilters> = {
  title: "Components/SelectedFilters",
  component: SelectedFilters,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ padding: "1rem" }}>
      <p style={{ color: "#666", marginBottom: "1rem" }}>
        This component requires Nosto search context to function properly.
      </p>
    </div>
  )
}

export const MockedView: Story = {
  render: () => <SelectedFiltersMockedView />
}
