import type { Meta, StoryObj } from "@storybook/preact"
import Product from "./Product"

// Since Product requires Nosto search context, we show what it looks like when integrated
function ProductMockedView() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        <strong>Note:</strong> This component requires a SearchProduct prop and Nosto search context. The MockedView
        below shows how it appears when integrated.
      </p>
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "280px"
        }}
      >
        <div
          style={{
            aspectRatio: "1",
            backgroundColor: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span style={{ color: "#6b7280" }}>Product Image</span>
        </div>
        <div style={{ padding: "1rem" }}>
          <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem", fontWeight: "600" }}>Sample Product Name</h3>
          <p style={{ margin: "0", color: "#6b7280", fontSize: "1.25rem", fontWeight: "700" }}>$29.99</p>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof Product> = {
  title: "Components/Product",
  component: Product,
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
        This component requires a SearchProduct prop and Nosto search context.
      </p>
    </div>
  )
}

export const MockedView: Story = {
  render: () => <ProductMockedView />
}
