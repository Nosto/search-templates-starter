import type { Meta, StoryObj } from "@storybook/preact"
import Toolbar from "./Toolbar"

// Since Toolbar requires Nosto search context, we show what it looks like when integrated
function ToolbarMockedView() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        <strong>Note:</strong> This component requires Nosto search context to function properly. The MockedView below
        shows how it appears when integrated.
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          backgroundColor: "white"
        }}
      >
        <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Showing 24 of 156 results</div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.875rem" }}>Sort by:</span>
            <select
              style={{
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                backgroundColor: "white"
              }}
            >
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer"
            }}
          >
            <span>Filter</span>
            <span
              style={{
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              2
            </span>
          </button>
        </div>
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
  render: () => <ToolbarMockedView />
}
