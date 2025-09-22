import type { Meta, StoryObj } from "@storybook/preact"
import ClearFiltersButton from "./ClearFiltersButton"

export default {
  title: "Components/ClearFiltersButton",
  component: ClearFiltersButton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof ClearFiltersButton>

type Story = StoryObj<typeof ClearFiltersButton>

export const Default: Story = {
  render: () => (
    <div style={{ padding: "20px" }}>
      <p style={{ marginBottom: "16px", color: "#666" }}>
        This component requires Nosto search context to function properly.
        <br />
        In a real application, it only renders when filters are applied.
      </p>
      <button
        type="button"
        style={{
          fontFamily: "inherit",
          fontWeight: "400",
          color: "#000",
          cursor: "pointer",
          backgroundColor: "transparent",
          border: "1px solid transparent",
          padding: "8px",
          fontSize: "14px",
          borderRadius: "4px",
          transition: "all 0.15s ease-in-out"
        }}
        onClick={() => alert("Clear Filters clicked!")}
      >
        Clear Filters
      </button>
    </div>
  )
}

export const MockedView: Story = {
  render: () => (
    <div style={{ padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
      <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Clear Filters Button</h3>
      <p style={{ marginBottom: "16px", color: "#666", fontSize: "14px" }}>
        This button appears at the bottom of the sidebar when filters are applied.
        It uses the same styling as other buttons in the design system.
      </p>
      <button
        type="button"
        aria-label="Clear all filters"
        style={{
          fontFamily: "inherit",
          fontWeight: "400",
          lineHeight: "1.2",
          color: "#000",
          textDecoration: "none",
          verticalAlign: "middle",
          cursor: "pointer",
          userSelect: "none",
          backgroundColor: "transparent",
          border: "1px solid transparent",
          padding: "8px",
          fontSize: "14px",
          borderRadius: "4px",
          transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
        }}
        onClick={() => alert("All filters would be cleared!")}
      >
        Clear Filters
      </button>
    </div>
  )
}