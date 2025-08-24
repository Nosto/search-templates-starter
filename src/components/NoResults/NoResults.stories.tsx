import type { Meta, StoryObj } from "@storybook/preact"

// Create a simplified version for storybook
function NoResultsDemo({ query = "sample search query" }: { query?: string }) {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div>No results found for &apos;{query}&apos;</div>
    </div>
  )
}

const meta: Meta<typeof NoResultsDemo> = {
  title: "Components/NoResults",
  component: NoResultsDemo,
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

export default meta;
type Story = StoryObj<typeof NoResultsDemo>;

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
