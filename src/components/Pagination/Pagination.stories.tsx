import type { Meta, StoryObj } from "@storybook/preact"
import Pagination from "./Pagination"

// Since Pagination requires Nosto search context, we show what it looks like when integrated
function PaginationMockedView() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        <strong>Note:</strong> This component requires Nosto search context to function properly. The MockedView below
        shows how it appears when integrated.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
        <a href="#" style={{ padding: "0.5rem", textDecoration: "none", color: "#007bff" }}>
          ‹
        </a>
        <a href="#" style={{ padding: "0.5rem", textDecoration: "none", color: "#007bff" }}>
          1
        </a>
        <a href="#" style={{ padding: "0.5rem", textDecoration: "none", color: "#007bff" }}>
          2
        </a>
        <span style={{ padding: "0.5rem", backgroundColor: "#007bff", color: "white", borderRadius: "4px" }}>3</span>
        <a href="#" style={{ padding: "0.5rem", textDecoration: "none", color: "#007bff" }}>
          4
        </a>
        <a href="#" style={{ padding: "0.5rem", textDecoration: "none", color: "#007bff" }}>
          5
        </a>
        <a href="#" style={{ padding: "0.5rem", textDecoration: "none", color: "#007bff" }}>
          ›
        </a>
      </div>
    </div>
  )
}

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
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
  render: () => <PaginationMockedView />
}
