import type { Meta, StoryObj } from "@storybook/preact"
import Keyword from "./Keyword"
import { mockKeyword, mockKeywordNoHighlight } from "@mocks/keywords"
import { withAutocompleteContext } from ".storybook/decorators"

export default {
  title: "Autocomplete/Keyword",
  component: Keyword,
  parameters: {
    layout: "centered"
  },
  decorators: [withAutocompleteContext],
  tags: ["autodocs"]
} as Meta<typeof Keyword>

type Story = StoryObj<typeof Keyword>

export const Default: Story = {
  args: {
    keyword: mockKeyword
  }
}

export const WithoutHighlight: Story = {
  args: {
    keyword: mockKeywordNoHighlight
  },
  parameters: {
    docs: {
      description: {
        story: "Keyword without highlighting, displays plain text."
      }
    }
  }
}
