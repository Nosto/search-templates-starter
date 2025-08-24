import type { Meta, StoryObj } from "@storybook/preact"
import Sidebar from "./Sidebar"

// Since Sidebar requires Nosto search context, we show what it looks like when integrated
function SidebarMockedView() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        <strong>Note:</strong> This component requires Nosto search context to function properly. The MockedView below
        shows how it appears when integrated.
      </p>
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "1rem",
          maxWidth: "300px",
          backgroundColor: "white"
        }}
      >
        <h3 style={{ margin: "0 0 1rem", fontSize: "1.125rem", fontWeight: "600" }}>Filters</h3>

        {/* Category Facet */}
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 0",
              borderBottom: "1px solid #e2e8f0",
              cursor: "pointer"
            }}
          >
            <span style={{ fontWeight: "500" }}>Category</span>
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
          </div>
        </div>

        {/* Price Range Facet */}
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 0",
              borderBottom: "1px solid #e2e8f0",
              cursor: "pointer"
            }}
          >
            <span style={{ fontWeight: "500" }}>Price</span>
            <span>↓</span>
          </div>
        </div>

        {/* Brand Facet */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 0",
              cursor: "pointer"
            }}
          >
            <span style={{ fontWeight: "500" }}>Brand</span>
            <span>↓</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
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
  render: () => <SidebarMockedView />
}
