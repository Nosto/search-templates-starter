import type { Meta, StoryObj } from "@storybook/preact"

// Simplified component that mimics NoResults behavior with minimal markup
function NoResults({ query = "sample search query" }: { query?: string }) {
  return (
    <div style={{ margin: "var(--ns-space-5, 1rem) 0", fontSize: "var(--ns-font-size-4, 1rem)" }}>
      <div>No results found for &apos;{query}&apos;</div>
    </div>
  )
}

const meta: Meta<typeof NoResults> = {
  title: "Components/NoResults",
  component: NoResults,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    query: {
      control: "text",
      description: "Search query that returned no results"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    query: "sample search query"
  }
}

export const LongQuery: Story = {
  args: {
    query: "this is a very long search query that might wrap to multiple lines"
  }
}

export const EmptyQuery: Story = {
  args: {
    query: ""
  }
}
