import type { Meta, StoryObj } from "@storybook/preact"
import Keywords from "./Keywords"

export default {
  title: "Components/Autocomplete/Keywords",
  component: Keywords,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Keywords>

type Story = StoryObj<typeof Keywords>

const mockKeywords = {
  hits: [
    {
      keyword: "running shoes",
      _highlight: {
        keyword: "<b>running</b> shoes"
      },
      facets: [],
      priority: 1,
      total: 3
    },
    {
      keyword: "running gear",
      _highlight: {
        keyword: "<b>running</b> gear"
      },
      facets: [],
      priority: 2,
      total: 3
    },
    {
      keyword: "marathon training",
      _highlight: {
        keyword: "marathon training"
      },
      facets: [],
      priority: 3,
      total: 3
    }
  ],
  total: 3
}

const emptyKeywords = {
  hits: [],
  total: 0
}

export const Default: Story = {
  render: () => (
    <Keywords keywords={mockKeywords} onSubmit={(query: string) => console.info("Search submitted:", query)} />
  )
}

export const EmptyKeywords: Story = {
  render: () => (
    <Keywords keywords={emptyKeywords} onSubmit={(query: string) => console.info("Search submitted:", query)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Keywords component with no suggestions (should render nothing)."
      }
    }
  }
}
