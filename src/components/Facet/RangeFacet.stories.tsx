import type { Meta, StoryObj } from "@storybook/preact"
import RangeFacet from "./RangeFacet"

// Since RangeFacet requires Nosto search context, we show what it looks like when integrated
function RangeFacetMockedView() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        <strong>Note:</strong> This component requires Nosto search context to function properly. The MockedView below
        shows how it appears when integrated.
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: "300px" }}>
        <li style={{ border: "1px solid #ddd", borderRadius: "4px", marginBottom: "0.5rem" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              cursor: "pointer"
            }}
          >
            <span style={{ fontWeight: "bold" }}>Price</span>
            <span>↓</span>
          </span>
          <div style={{ padding: "1rem", borderTop: "1px solid #eee" }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                type="number"
                placeholder="Min"
                style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px", width: "80px" }}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px", width: "80px" }}
              />
              <button
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px"
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

const meta: Meta<typeof RangeFacet> = {
  title: "Components/Facet/RangeFacet",
  component: RangeFacet,
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
        This component requires a SearchStatsFacet prop and Nosto search context.
      </p>
    </div>
  )
}

export const MockedView: Story = {
  render: () => <RangeFacetMockedView />
}
