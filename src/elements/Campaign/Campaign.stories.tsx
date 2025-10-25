import type { Meta, StoryObj } from "@storybook/preact"
import Campaign from "./Campaign"

export default {
  title: "Elements/Campaign",
  component: Campaign,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Campaign>

type Story = StoryObj<typeof Campaign>

export const Basic: Story = {
  args: {
    placement: "home-top"
  }
}

export const WithCustomTemplate: Story = {
  args: {
    placement: "home-top",
    children: (
      <div style={{ padding: "20px", background: "#f0f0f0", border: "1px dashed #999", textAlign: "center" }}>
        <h3>Custom Campaign Template</h3>
        <p>This is embedded content rendered inside the nosto-campaign element.</p>
        <button>Call to Action</button>
      </div>
    )
  }
}

export const WithTextContent: Story = {
  args: {
    placement: "product-page",
    children: "Simple text template content"
  }
}

export const MockedView: Story = {
  args: {
    placement: "home-top",
    children: (
      <div style={{ padding: "16px", background: "#fff", border: "1px solid #e1e5e9", borderRadius: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div style={{ width: "60px", height: "60px", background: "#f0f0f0", borderRadius: "4px" }}></div>
          <div>
            <h4 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>Featured Product</h4>
            <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>$29.99</p>
          </div>
        </div>
        <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          This shows how the Campaign component renders custom children content within the nosto-campaign element.
        </p>
        <button
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Add to Cart
        </button>
      </div>
    )
  }
}
