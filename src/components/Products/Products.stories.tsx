import type { Meta, StoryObj } from "@storybook/preact"
import Products from "./Products"

// Since Products requires Nosto search context, we show what it looks like when integrated
function ProductsMockedView() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        <strong>Note:</strong> This component requires Nosto search context to function properly. The MockedView below
        shows how it appears when integrated.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
          maxWidth: "800px"
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              overflow: "hidden"
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
              <span style={{ color: "#6b7280" }}>Product {i + 1}</span>
            </div>
            <div style={{ padding: "1rem" }}>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", fontWeight: "600" }}>Product {i + 1}</h3>
              <p style={{ margin: "0", color: "#6b7280", fontSize: "1rem", fontWeight: "700" }}>
                ${(29.99 + i * 10).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const meta: Meta<typeof Products> = {
  title: "Components/Products",
  component: Products,
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
  render: () => <ProductsMockedView />
}
