import type { Meta, StoryObj } from "@storybook/preact"
import Keyword from "./Keyword"

export default {
  title: "Autocomplete/Keyword",
  component: Keyword,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Keyword>

type Story = StoryObj<typeof Keyword>

const mockKeyword = {
  keyword: "running shoes",
  _highlight: {
    keyword: "<b>running</b> shoes"
  },
  facets: [],
  priority: 1,
  total: 1
}

const mockKeywordNoHighlight = {
  keyword: "sneakers",
  facets: [],
  priority: 1,
  total: 1
}

export const Default: Story = {
  args: {
    keyword: mockKeyword,
    onSubmit: (query: string) => console.info("Search submitted:", query)
  }
}

export const WithoutHighlight: Story = {
  args: {
    keyword: mockKeywordNoHighlight,
    onSubmit: (query: string) => console.info("Search submitted:", query)
  },
  parameters: {
    docs: {
      description: {
        story: "Keyword without highlighting, displays plain text."
      }
    }
  }
}
