import type { Meta, StoryObj } from "@storybook/preact"
import Swatches from "./Swatches"

export default {
  title: "Components/Swatches",
  component: Swatches,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Swatches>

type Story = StoryObj<typeof Swatches>

export const MockedView: Story = {
  args: {
    handle: "premium-cotton-t-shirt"
  },
  parameters: {
    docs: {
      description: {
        story:
          "This is a mocked view showing what the Swatches component would look like when properly integrated with Nosto search context. The component requires the useShopifyProduct hook to function, which fetches product data from Shopify's handle.js endpoint."
      }
    }
  },
  render: () => {
    // Mock the component to show what it would look like when integrated
    return (
      <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "400px" }}>
        <div style={{ display: "block", marginBottom: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ fontWeight: 500, color: "#333", fontSize: "0.9rem" }}>Color:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                style={{
                  background: "#007bff",
                  borderColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  border: "1px solid #e1e5e9",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
              >
                Red
              </button>
              <button
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e1e5e9",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
              >
                Blue
              </button>
              <button
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e1e5e9",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
              >
                Green
              </button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ fontWeight: 500, color: "#333", fontSize: "0.9rem" }}>Size:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                style={{
                  background: "#007bff",
                  borderColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  border: "1px solid #e1e5e9",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
              >
                Small
              </button>
              <button
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e1e5e9",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
              >
                Medium
              </button>
              <button
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e1e5e9",
                  opacity: "0.5",
                  cursor: "not-allowed",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
                disabled
              >
                Large
              </button>
            </div>
          </div>
        </div>
        <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "1rem" }}>
          Note: This component requires Nosto search context to function properly. The actual implementation uses the{" "}
          <code>useShopifyProduct</code> hook to fetch product data.
        </p>
      </div>
    )
  }
}

export const WithPreselect: Story = {
  args: {
    handle: "premium-cotton-t-shirt",
    preselect: true
  },
  parameters: {
    docs: {
      description: {
        story:
          "Component with preselect enabled, which automatically selects the first available option for each variant when the component loads."
      }
    }
  },
  render: MockedView.render
}

export const NoPreselect: Story = {
  args: {
    handle: "premium-cotton-t-shirt",
    preselect: false
  },
  parameters: {
    docs: {
      description: {
        story: "Component with preselect disabled, requiring users to manually select all options."
      }
    }
  },
  render: () => {
    // Mock without any preselected options
    return (
      <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "400px" }}>
        <div style={{ display: "block", marginBottom: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ fontWeight: 500, color: "#333", fontSize: "0.9rem" }}>Color:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e1e5e9",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
              >
                Red
              </button>
              <button
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e1e5e9",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
              >
                Blue
              </button>
              <button
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e1e5e9",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
              >
                Green
              </button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ fontWeight: 500, color: "#333", fontSize: "0.9rem" }}>Size:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e1e5e9",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
              >
                Small
              </button>
              <button
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e1e5e9",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
              >
                Medium
              </button>
              <button
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e1e5e9",
                  opacity: "0.5",
                  cursor: "not-allowed",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  minHeight: "2.5rem"
                }}
                disabled
              >
                Large
              </button>
            </div>
          </div>
        </div>
        <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "1rem" }}>
          No options preselected - user must select variants manually.
        </p>
      </div>
    )
  }
}
