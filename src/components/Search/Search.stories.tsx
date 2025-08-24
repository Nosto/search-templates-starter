import type { Meta, StoryObj } from "@storybook/preact"
import { Search } from "./Search"

// Since Search requires Nosto search context, we show what it looks like when integrated
function SearchMockedView() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        <strong>Note:</strong> This component requires Nosto search context to function properly. The MockedView below
        shows how it appears when integrated.
      </p>
      <div style={{ display: "flex", gap: "0.5rem", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Search products..."
          style={{
            flex: 1,
            padding: "0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "6px"
          }}
        />
        <button
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>
    </div>
  )
}

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
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
  render: () => <SearchMockedView />
}
