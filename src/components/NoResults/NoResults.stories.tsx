import type { Meta, StoryObj } from "@storybook/preact"
import NoResults from "./NoResults"

// Since NoResults requires Nosto search context, we show what it looks like when integrated
function NoResultsMockedView() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        <strong>Note:</strong> This component requires Nosto search context to function properly. The MockedView below
        shows how it appears when integrated.
      </p>
      <div style={{ margin: "1rem 0", fontSize: "1rem" }}>
        <div>No results found for &apos;sample search query&apos;</div>
      </div>
    </div>
  )
}

const meta: Meta<typeof NoResults> = {
  title: "Components/NoResults",
  component: NoResults,
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
  render: () => <NoResultsMockedView />
}
