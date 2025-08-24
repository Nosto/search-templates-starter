import type { Meta, StoryObj } from "@storybook/preact"
import Facet from "./Facet"

// Since Facet requires Nosto search context, we show what it looks like when integrated
function FacetMockedView() {
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
            <span style={{ fontWeight: "bold" }}>Category</span>
            <span
              style={{
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "12px",
                padding: "2px 8px",
                fontSize: "0.75rem"
              }}
            >
              2
            </span>
            <span>↓</span>
          </span>
        </li>
      </ul>
    </div>
  )
}

const meta: Meta<typeof Facet> = {
  title: "Components/Facet/Facet",
  component: Facet,
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
        This component requires a SearchTermsFacet prop and Nosto search context.
      </p>
    </div>
  )
}

export const MockedView: Story = {
  render: () => <FacetMockedView />
}
