import type { Meta, StoryObj } from "@storybook/preact"
import Keyword from "./Keyword"
import { mockKeyword, mockKeywordNoHighlight } from "@mocks/keywords"

export default {
  title: "Autocomplete/Keyword",
  component: Keyword,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Keyword>

type Story = StoryObj<typeof Keyword>

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
