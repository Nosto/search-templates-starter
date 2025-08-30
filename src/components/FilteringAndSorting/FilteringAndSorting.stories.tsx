import type { Meta, StoryObj } from "@storybook/preact"
import FilteringAndSorting from "./FilteringAndSorting"

export default {
  title: "Components/FilteringAndSorting",
  component: FilteringAndSorting,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof FilteringAndSorting>

type Story = StoryObj<typeof FilteringAndSorting>

export const MockedView: Story = {
  render: () => (
    <div style={{ width: "100%", minHeight: "200px", border: "1px dashed #ccc", padding: "20px" }}>
      <p>
        <strong>FilteringAndSorting Component</strong>
      </p>
      <p>This component combines filtering (sidebar) and sorting (toolbar) functionality.</p>
      <p>Note: Requires Nosto search context to function properly in a real application.</p>
      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f5f5f5" }}>
        <div>🔍 Toolbar: Sort controls and result counts would appear here</div>
        <div style={{ marginTop: "10px" }}>📋 Sidebar: Filter facets would appear here</div>
      </div>
    </div>
  )
}
